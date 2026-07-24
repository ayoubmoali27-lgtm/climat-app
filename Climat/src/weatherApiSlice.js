import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let cancelAxios = null;

export const fitchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async () => {
    console.log("calling fetcher weather");

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=b76eac91fe03b939c7144718700fc48b",
      {
        cancelToken: new axios.CancelToken((c) => {
          cancelAxios = c;
        }),
      }
    );

    const temper = Math.round(response.data.main.temp - 273.15);
    const max = Math.round(response.data.main.temp_max - 273.15);
    const min = Math.round(response.data.main.temp_min - 273.15);

    const responseIcon = response.data.weather[0].icon;
    const icon = `https://openweathermap.org/img/wn/${responseIcon}@2x.png`;

    return {
      temper,
      max,
      min,
      icon,
    };
  }
);

const weatherapiSlice = createSlice({
  name: "weatherApi",
  initialState: {
    result: "empty",
    isLoading: false,
    weather: {
      temper: 0,
      max: 0,
      min: 0,
      icon: "",
    },
  },
  reducers: {
    changeResult: (state) => {
      state.result = "changed";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fitchWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fitchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weather = action.payload;
      })
      .addCase(fitchWeather.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { changeResult } = weatherapiSlice.actions;

export default weatherapiSlice.reducer;