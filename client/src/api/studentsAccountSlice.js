import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getStudentsAccApiAsync = createAsyncThunk(
  "StudentsAccount/getStudentsAccApi",
  async () => {
    try {
      const users = window.sessionStorage.getItem("LecturerEmail");
      const res = await axios.get(`/student/getuser?email[regex]=${users}`);
      return res.data;
    } catch (err) {
      return isRejectedWithValue(err.response.data);
    }
  }
);

export const StudentsAccSlice = createSlice({
  name: "StudentsAccount",
  initialState: { StudentsAccountApi: { data: [], login: false, error: "" } },
  reducers: {},
  extraReducers: {
    // --- Xử lý trong reducer với case pending / fulfilled / rejected ---
    [getStudentsAccApiAsync.pending]: (state) => {
      state.StudentsAccountApi.login = false;
    },
    [getStudentsAccApiAsync.rejected]: (state, action) => {
      state.StudentsAccountApi.login = true;
      state.StudentsAccountApi.error = [...action.payload];
    },
    [getStudentsAccApiAsync.fulfilled]: (state, action) => {
      state.StudentsAccountApi.login = true;
      state.StudentsAccountApi.data = [...action.payload];
    },
  },
});
export default StudentsAccSlice;
