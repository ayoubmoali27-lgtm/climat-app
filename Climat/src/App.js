import logo from "./logo.svg";
import "./App.css";
import BasicButtons from "./test.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment.js";
import "moment/min/locales"

import { useSelector, useDispatch } from "react-redux";
import { changeResult } from "./weatherApiSlice.js";
import { fitchWeather } from "./weatherApiSlice.js";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
  palette: {
    primary: {
      main: "#ffffff", // your main color
    },
    secondary: {
      main: "#646464", // your secondary color
    },
  },
});

function App() {
 
  const [dateAndTime, setDateAndTime] = useState(null)

 

  // redux code 
  const dispatch = useDispatch()
  

  const isLoading = useSelector((state)=>{
  console.log("--------------------")
    console.log(state)

  return state.weather.isLoading;
})

  useEffect(() => {

    // trying redux
    console.log("dispatching weather")
    dispatch(fitchWeather())
    setDateAndTime(moment().format("MMM Do YY"));  
    
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BasicButtons  date={dateAndTime} loadingHH={isLoading} />
      </ThemeProvider>
    </div>
  );
}

export default App;
