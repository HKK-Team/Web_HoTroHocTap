import {
    createAsyncThunk, createSlice, isRejectedWithValue
  } from "@reduxjs/toolkit";
  import axios from "axios";
  
  export const getSubjectsApiAsync = createAsyncThunk(
    "Subjects/getSubjectsApi",
    async () => {
      try {
        const res = await axios.get("http://10.0.2.2:5000/subject/getSubject");
        return res.data;
      } catch (err) {
        return isRejectedWithValue(err.response.data);
      }
    }
  );
  export const SubjectsSlice = createSlice({
    name: "Subjects", // lưu lại tên chỉ định để dễ dàng quản lý store
    initialState: { // thực hiện những action lưu lại trên store và trả về cho UI
      SubjectsApi: { data: [], loading: false, error: "" },
  },
    reducers: { // lưu lại những action
    },
    extraReducers: {
      [getSubjectsApiAsync.pending]: (state) => {
        state.SubjectsApi.loading = true;
      },
      [getSubjectsApiAsync.rejected]: (state, action) => {
        state.SubjectsApi.loading = false;
        state.SubjectsApi.error = action.error.massage;
      },
      [getSubjectsApiAsync.fulfilled]: (state, action) => {
        state.SubjectsApi.loading = false;
        state.SubjectsApi.data = [...action.payload];
      },
    },
  });
  export default SubjectsSlice;