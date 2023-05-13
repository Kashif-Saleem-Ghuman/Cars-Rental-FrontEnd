import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const BASE_URL = "http://localhost:3000/api/v1";

export const fetchCars = createAsyncThunk(
  "cars/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/cars`);
      return response.data;
    } catch (err) {
      return rejectWithValue(await err.response.data);
    }
  }
);

export const fetchCar = createAsyncThunk(
  "cars/fetchCar",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/cars/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(await err.response.data);
    }
  }
);

export const deleteCar = createAsyncThunk(
  "cars/deleteCar",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/cars/${id}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.mEV1tGfbNab0HJZatFjrXdDNgolA6mf4oUgC_im6TA8`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(await err.response.data);
    }
  }
);

export const createNewCar = createAsyncThunk(
  "cars/createNewCar",
  async (carData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/cars`, carData, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.mEV1tGfbNab0HJZatFjrXdDNgolA6mf4oUgC_im6TA8`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(await err.response.data);
    }
  }
);


export const createReservation = createAsyncThunk(
  "cars/createReservation",
  async (reservationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/reservations`, reservationData, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.mEV1tGfbNab0HJZatFjrXdDNgolA6mf4oUgC_im6TA8`,
        },
      });
      console.log(response.data)
      return response.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(await err.response.data);
    }
  }
);


const initialState = {
  cars: [],
  singleCar: {},
  reservations: [],
};

export const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    addCar: (state, action) => {
      state.cars.push(action.payload);
    },
    removeCar: (state, action) => {
      const filteredCars = state.cars.filter((car) => car.id != action.payload);
      state.cars = filteredCars;
    },
    addReservation: (state, action) => {
      state.reservations.push(action.payload);
    }
  },
  extraReducers: {
    [fetchCars.fulfilled]: (state, action) => {
      state.cars = action.payload;
    },
    [fetchCar.fulfilled]: (state, action) => {
      state.singleCar = action.payload;
    },
    [deleteCar.fulfilled]: (state, action) => {
      const deletedCarId = action.payload;
      state.cars = state.cars.filter((car) => car.id !== deletedCarId);
    },
    [createReservation.fulfilled]: (state, action) => {
      state.reservations.push(action.payload);
    }
  },
});

export const { removeCar, addCar, addReservation } = carSlice.actions;

export default carSlice.reducer;
