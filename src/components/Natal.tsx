import Chart from "@astrodraw/astrochart";
import { FormedAspect } from "@astrodraw/astrochart/dist/project/src/aspect";
import { AstroData } from "@astrodraw/astrochart/dist/project/src/radix";
import { Autocomplete, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Horoscope, Origin } from "circular-natal-horoscope-js";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Points } from "../http/natal";
import UA from './../utils/UA.json';

export const Natal = () => {
    const [horoscope, setHoroscope] = useState<Horoscope>()
    const [dataRadix, setDataRadix] = useState<AstroData>()
    const [date, setDate] = useState<dayjs.Dayjs>(dayjs('1981-04-17T15:30'))
    const [city, setCity] = useState<{label:string, id:number, coords:{lat:number, lng:number}}>({
        label:"Kyiv",
        id:0,
        coords:{
            lat:50.4500,
            lng:30.5233
        }
    })
    const [searchOptions, setSearchOptions] = useState<{label:string, id:number, coords:{lat:number, lng:number}}[]>([{
        label:"Kyiv",
        id:0,
        coords:{
            lat:50.4500,
            lng:30.5233
        }
    }])
    useEffect(() => {
        let arr:{label:string, id:number, coords:{lat:number, lng:number}}[] = []
        UA.map((city, index)=>{
            arr.push({label:city.city, id:index, coords:{lat:parseFloat(city.lat), lng:parseFloat(city.lng)}})
        })
        setSearchOptions(arr)
    }, [])
    useEffect(() => {

    }, [city])
    
    
    useEffect(() => {
        if(city && date){
            const horoscope = new Horoscope({
                origin:new Origin({date:date.day(), month:date.month(), year:date.year(),hour:date.hour(), minute:date.minute(), second:date.second(), latitude:city.coords.lat, longitude:city.coords.lng})
            })
            setHoroscope(horoscope)
            console.log(city)
            setDataRadix({
        planets: {
          Moon: [horoscope.Ephemeris.moon.position.apparentLongitude ],
          Venus: [horoscope.Ephemeris.venus.position.apparentLongitude],
          Jupiter: [horoscope.Ephemeris.jupiter.position.apparentLongitude],
        //   NNode: [174.6895307834239],
          Mars: [horoscope.Ephemeris.mars.position.apparentLongitude],
        //   Lilith: [horoscope.Ephemeris.lilth.position.geocentricDistance],
          Saturn: [horoscope.Ephemeris.saturn.position.apparentLongitude],
          Chiron: [horoscope.Ephemeris.chiron.position.apparentLongitude],
          Uranus: [horoscope.Ephemeris.uranus.position.apparentLongitude],
          Sun: [horoscope.Ephemeris.sun.position.apparentLongitude],
          Mercury: [horoscope.Ephemeris.mercury.position.apparentLongitude],
          Neptune: [horoscope.Ephemeris.neptune.position.apparentLongitude],
          Pluto: [horoscope.Ephemeris.pluto.position.apparentLongitude],
        },
        cusps: [
          348.20510089894015,
          38.108507808919654,
          65.20783751818992,
          84.96083001338991,
          103.77897207128007,
          127.1084408347092,
          168.20510089894015,
          218.10850780891965,
          245.20783751818993,
          264.9608300133899,
          283.77897207128007,
          307.1084408347092,
        ],
      })    
        }
    }, [city, date])
    
useEffect(() => {
    if(dataRadix){
    const chart = new Chart('paper', 500, 500, {
        MARGIN: 50,
        SYMBOL_SCALE: 0.8,
        COLOR_ARIES: 'red',
        COLOR_TAURUS: 'purple',
        COLOR_GEMINI: 'pink',
        COLOR_CANCER: 'green',
        COLOR_LEO: 'blue',
        COLOR_VIRGO: 'yellow',
        COLOR_LIBRA: 'brown',
        COLOR_SCORPIO: 'lightblue',
        COLOR_SAGITTARIUS: 'lightgreen',
        COLOR_CAPRICORN: '#999393',
        COLOR_AQUARIUS: 'silver',
        COLOR_PISCES: '#847193',
      });
    
    
      const dataTransit = {
        planets: {
          Moon: [60.739220451080115],
          Venus: [305.6996431634707],
          Jupiter: [198.6565699576221],
          NNode: [157.25592636170012],
          Mars: [324.84013049518734],
          Lilith: [232.88904207991555],
          Saturn: [259.1015412368795, -0.2],
          Chiron: [350.7285587924208],
          Uranus: [20.678747795787075],
          Sun: [260.94912160755536],
          Mercury: [281.5699804920016],
          Neptune: [339.3848859932604],
          Pluto: [286.29683069280685],
        },
        cusps: [296, 350, 30, 56, 75, 94, 116, 170, 210, 236, 255, 274],
      };
        const radix = chart.radix(dataRadix);
        radix.addPointsOfInterest({
            As: [dataRadix.cusps[0]],
            Ic: [dataRadix.cusps[3]],
            Ds: [dataRadix.cusps[6]],
            Mc: [dataRadix.cusps[9]],
        });
        radix.transit(dataTransit);
        radix.aspects(horoscope?.Aspects.all[0])
      }
}, [dataRadix])




    return(
        <>
            <div style={{margin:"30px 15px", display:"flex", gap:"20px"}}>
                <DateTimePicker
                    label="Date of Birth"
                    defaultValue={dayjs('1981-04-17T15:30')}
                    value={date}
                    onChange={(d) => {
                        if(d){
                            setDate(d)
                        }
                    }}
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={searchOptions}
                    getOptionLabel={(op)=>op.label}
                    value={city}
                    onChange={(e, val)=>{
                        if(val)
                            setCity(val)
                    }}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField  {...params} label="City" />}
                />
            </div>
            <div style={{margin:"30px 0"}} className="paper" id="chart"></div>
        </>
    );
}