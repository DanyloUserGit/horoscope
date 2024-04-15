import React from 'react';
import { Natal } from './components/Natal';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <><Natal /></>
    </LocalizationProvider>
  );
}

export default App;
