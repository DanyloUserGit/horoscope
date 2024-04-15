import { AxiosResponse } from "axios";
import { $api } from ".";

export interface Points{
    sun:Point,
    moon:Point,
    merk:Point,
    ven:Point,
    mar:Point,
    upi:Point,
    sat:Point,
    ura:Point,
    nep:Point,
    plu:Point,
}
export interface Point{
    deg:string,
    min:string
}

export class NatalHttp {
    static async GetPoints(payload:{
        day:string,
        month:string,
        year:string,
        hour:string,
        minute:string,
        coordinates:{
            lat:number,
            lng:number
        }
    }){
        const res:AxiosResponse<Points> = await $api.post("natal/points", payload)
        return res.data;
    }
}