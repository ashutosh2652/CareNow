import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth/index.js";
const store = configureStore({
  reducer: {
    auth: AuthSlice,
  },
});
export default store;
