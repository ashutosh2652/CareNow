import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";
import { toast } from "sonner";
import axios from "axios";
const initialState = {
  isLoading: false,
  user: null,
  isAuthenticated: false,
  error: null,
  isEmailVerifying: true,
};
export const RegisterUser = createAsyncThunk(
  "/auth/register",
  async ({ email, fullName, password }, thunkApi) => {
    try {
      const response = await api.post("/auth/register", {
        email,
        fullName,
        password,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const LoginUser = createAsyncThunk(
  "/auth/login",
  async ({ email, password }, thunkApi) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const LogoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/auth/logout");
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const getUser = createAsyncThunk(
  "/auth/getuser",
  async (_, thunkApi) => {
    try {
      const response = await api.get("/auth/user");
      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const resendverificationemail = createAsyncThunk(
  "/auth/resendemail",
  async (email, thunkApi) => {
    try {
      const response = await api.post("/auth/resend-verification-email-token", {
        email,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const VerifyEmailByToken = createAsyncThunk(
  "/auth/verifyemail",
  async ({ email, token }, thunkApi) => {
    try {
      const response = await api.post(`/auth/verify-email/${token}`, { email });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    ClearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        toast.loading("Creating your Account.", {
          id: "register-loading",
        });
      })
      .addCase(RegisterUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        toast.dismiss("register-loading");
        toast.success("Account created Successfully!");
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        console.log(action, "action");

        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload
          ? action.payload.message
          : action.error.message;
        toast.dismiss("register-loading");
      })
      .addCase(LoginUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
        toast.loading("Checking Authorization.", {
          id: "logging-loading",
        });
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.success ? action.payload.data : null;
        state.isAuthenticated = action.payload.success;

        toast.dismiss("logging-loading");
      })
      .addCase(LoginUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
        state.error = action.payload
          ? action.payload.message
          : action.error.message;
        toast.dismiss("logging-loading");
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        toast.loading("Checking Authorization.", {
          id: "checkauth-loading",
        });
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload, "payload");

        state.user = action.payload.success ? action.payload.data : null;
        state.isAuthenticated = action.payload.success;
        toast.dismiss("checkauth-loading");
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        toast.dismiss("checkauth-loading");
        state.user = null;
      })
      .addCase(VerifyEmailByToken.pending, (state) => {
        state.isEmailVerifying = true;
      })
      .addCase(VerifyEmailByToken.fulfilled, (state, action) => {
        state.user = action.payload.success ? action.payload.data : null;
      })
      .addCase(VerifyEmailByToken.rejected, (state, action) => {
        state.isEmailVerifying = false;
        state.error = action.payload
          ? action.payload.message
          : action.error.message;
      })
      .addCase(resendverificationemail.pending, () => {
        toast.loading("Sending Verification Email.", {
          id: "verification-email",
        });
      })
      .addCase(resendverificationemail.fulfilled, () => {
        toast.dismiss("verification-email");
        toast.success("Email with new verification link sent Successfully!");
      })
      .addCase(resendverificationemail.rejected, () => {
        toast.dismiss("verification-email");
        toast.error("Error occured while sending email");
      })
      .addCase(LogoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LogoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(LogoutUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        state.isLoading = false;
      });
  },
});
export const { ClearError } = AuthSlice.actions;
export default AuthSlice.reducer;
