import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth";
import PatientReducer from "./patient";
const store = configureStore({
  reducer: {
    auth: AuthReducer,
    patient: PatientReducer,
  },
});
export default store;
