import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

const initialState = {
  isLoading: false,
  AllDoctor: [],
  DoctorDetail: null,
};
export const getAllDoctor = createAsyncThunk(
  "/patient/doctor",
  async ({ specialization, search }, thunkApi) => {
    try {
      const response = await api.post(
        `/doctor/get?specialization=${specialization}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi(error.response.data.message);
    }
  }
);
export const getDoctorDetail = createAsyncThunk(
  "/doctor/getdoctordetail",
  async (id, thunkApi) => {
    try {
      const response = await api.get(`/doctor/get-doctor/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
const PatientSlice = createSlice({
  name: "patientslice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.AllDoctor = action.payload.data;
      })
      .addCase(getAllDoctor.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getDoctorDetail.pending, (state) => {
        state.isLoading = true;
        state.DoctorDetail = null;
      })
      .addCase(getDoctorDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.DoctorDetail = action.payload.data;
      })
      .addCase(getDoctorDetail.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export default PatientSlice.reducer;
