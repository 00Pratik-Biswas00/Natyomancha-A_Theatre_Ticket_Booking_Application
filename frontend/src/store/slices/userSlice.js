import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance.js";

const APIURL = import.meta.env.VITE_API_URL;

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${APIURL}/users/login`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${APIURL}/users`, payload);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    userInfo: getUserFromLocalStorage(),
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.userInfo = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.userInfo = null;
        state.error = action.payload || "An error occurred";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
