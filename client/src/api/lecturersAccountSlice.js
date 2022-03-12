
import {
  createAsyncThunk, createSlice, isRejectedWithValue
} from "@reduxjs/toolkit";
import axios from "axios";

export const getLecturersAccApiAsync = createAsyncThunk(
  "LecturersAccount/getLecturersAccApi",
  async () => {
    try {
      const users = window.sessionStorage.getItem("LecturerEmail");
      const res = await axios.get(`/lecturer/getuser?Email[regex]=${users}`);
      return res.data;
    } catch (err) {
      return isRejectedWithValue(err.response.data);
    }
  }
);
export const LecturersAccSlice = createSlice({
  name: "LecturersAccount",
  initialState: {
    LecturersAccountApi: { data: [], login: false, error: "" },
  },
  reducers: {},
  extraReducers: {
    // --- Xử lý trong reducer với case pending / fulfilled / rejected ---
    [getLecturersAccApiAsync.pending]: (state) => {
      state.LecturersAccountApi.login = false;
    },
    [getLecturersAccApiAsync.rejected]: (state, action) => {
      state.LecturersAccountApi.login = true;
      state.LecturersAccountApi.error = [...action.payload];
    },
    [getLecturersAccApiAsync.fulfilled]: (state, action) => {
      state.LecturersAccountApi.login = true;
      state.LecturersAccountApi.data = [...action.payload];
    },
  },
});

export const getStudentsAccApiAsync = createAsyncThunk(
  "StudentsAccount/getStudentsAccApi",
  async () => {
    try {
      const res = await axios.get(`/lecturer/getStudent`);
      return res.data;
    } catch (err) {
      return isRejectedWithValue(err.response.data);
    }
  }
);
export const StudentsAccSlice = createSlice({
  name: "StudentsAccount",
  initialState: {
    StudentsAccount: { data: [], loading: false, error: "" },
  },
  reducers: {},
  extraReducers: {
    // --- Xử lý trong reducer với case pending / fulfilled / rejected ---
    [getStudentsAccApiAsync.pending]: (state) => {
      state.StudentsAccount.loading = true;
    },
    [getStudentsAccApiAsync.rejected]: (state, action) => {
      state.StudentsAccount.loading = false;
      state.StudentsAccount.error = action.error.massage;
    },
    [getStudentsAccApiAsync.fulfilled]: (state, action) => {
      state.StudentsAccount.loading = false;
      state.StudentsAccount.data = [...action.payload];
    },
  },
});
export default LecturersAccSlice;
