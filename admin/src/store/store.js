import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth";
import DoctorSlice from "./doctor";
import PatientSlice from "./patient";
const store = configureStore({
  reducer: {
    auth: AuthSlice,
    doctor: DoctorSlice,
    patient: PatientSlice,
  },
});
export default store;
