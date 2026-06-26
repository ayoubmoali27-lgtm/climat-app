import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let cancelAxios = null;
export const fitchWeather = createAsyncThunk("myThunkFunction", async () => {
  console.log("calling fetcher weather");
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=b76eac91fe03b939c7144718700fc48b",
    {
      cancelToken: new axios.CancelToken((c) => {
        cancelAxios = c;
      }),
    },
  );
    const temper= Math.round(response.data.main.temp - 272.15);
     const max = Math.round(response.data.main.temp_max - 272.15);
      const min= Math.round(response.data.main.temp_min - 272.15);

      const responseIcon =  response.data.weather[0].icon;
      console.log({responseIcon})

     const icon=`https://openweathermap.org/img/wn/${responseIcon}@2x.png`;

     return {temper, max, min, icon} 
});

const weatherapiSlice = createSlice({
  name: "weatherApi",
  initialState: {
    result: "empty",
    isLoading : false,
  },
  reducers: {
    changeResult: (state, action) => {
      state.result = "changed";
    },
  },

  extraReducers(builder) {
    builder.addCase(fitchWeather.pending, (state,action) => {
        console.log("received")
        state.isLoading = true

    }).addCase(fitchWeather.fulfilled,(state,action)=>{
        state.isLoading = false
        state.weather = action.payload
    })
  },
});

export const { changeResult } = weatherapiSlice.actions;

export default weatherapiSlice.reducer;
