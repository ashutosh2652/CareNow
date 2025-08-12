import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance.js";
const initialState = {
  isLoading: false,
  AllUser: [],
  PatientDetail: null,
};

export const SuspendUser = createAsyncThunk(
  "/admin/suspend",
  async (id, thunkApi) => {
    try {
      const response = await api.patch(`/admin/suspend-user/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const getAllUser = createAsyncThunk(
  "/admin/getalluser",
  async (_, thunkApi) => {
    try {
      const response = await api.get("/admin/user/get");
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const getPatientDetail = createAsyncThunk(
  "/admin/user-detail",
  async (id, thunkApi) => {
    try {
      const response = await api.get(`/admin/patient/get/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
const PatientSlice = createSlice({
  name: "PatientSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isLoading = false;

        state.AllUser = action.payload.data;
      })
      .addCase(getAllUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getPatientDetail.pending, (state) => {
        state.isLoading = true;
        state.PatientDetail = null;
      })
      .addCase(getPatientDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.PatientDetail = action.payload.data;
      })
      .addCase(getPatientDetail.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export default PatientSlice.reducer;
