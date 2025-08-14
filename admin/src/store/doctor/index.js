import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";
const initialState = {
  isLoading: false,
  DoctorList: [],
  DoctorDetail: null,
};
export const addDoctor = createAsyncThunk(
  "/admin/add-doctor",
  async (
    { email, specializations, qualifications, experienceInYears, clinicInfo },
    thunkApi
  ) => {
    try {
      const response = await api.post("/admin/add-doctor", {
        email,
        specializations,
        qualifications,
        experienceInYears,
        clinicInfo,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const suspendDoctor = createAsyncThunk(
  "/admin/suspend-doctor",
  async (id, thunkApi) => {
    try {
      const response = await api.patch(`/admin/suspend-doctor/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const changeDoctorDetail = createAsyncThunk(
  "/admin/change-doctor-detail",
  async (
    {
      _id,
      specializations,
      qualifications,
      experienceInYears,
      clinicInfo,
      status,
    },
    thunkApi
  ) => {
    try {
      const response = await api.patch(`/admin/change-doctor-details/${_id}`, {
        specializations,
        qualifications,
        experienceInYears,
        clinicInfo,
        status,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const getDoctorDetails = createAsyncThunk(
  "/doctor/getdoctordetails",
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
export const getAllDoctor = createAsyncThunk(
  "/doctor/getAlldoctors",
  async ({ specialization, search }, thunkApi) => {
    try {
      const response = await api.post("/doctor/get", {
        specialization,
        search,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
const DoctorSlice = createSlice({
  name: "/admin/doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDoctorDetails.pending, (state) => {
        state.isLoading = true;
        state.DoctorDetail = null;
      })
      .addCase(getDoctorDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.DoctorDetail = action.payload.data;
      })
      .addCase(getDoctorDetails.rejected, (state) => {
        state.isLoading = false;
        state.DoctorDetail = null;
      })
      .addCase(getAllDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.DoctorList = action.payload.data;
      })
      .addCase(getAllDoctor.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export default DoctorSlice.reducer;
