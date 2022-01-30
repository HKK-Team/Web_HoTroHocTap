import {
    createAsyncThunk, createSlice, isRejectedWithValue
  } from "@reduxjs/toolkit";
  import axios from "axios";
  
  export const getSubjectScoreApiAsync = createAsyncThunk(
    "subjectScores/getSubjectScoresApi",
    async () => {
      try {
        const email = window.sessionStorage.getItem("StudentEmail");
        const res = await axios.get(`/subjectScore/getsubjectScore?Email[regex]=${email}`);
        return res.data;
      } catch (err) {
        return isRejectedWithValue(err.response.data);
      }
    }
  );
  export const subjectScoreSlice = createSlice({
    name: "SubjectScores", // lưu lại tên chỉ định để dễ dàng quản lý store
    initialState: { // thực hiện những action lưu lại trên store và trả về cho UI
      SubjectScoreApi: { data: [], loading: false, error: "" }
  },
    reducers: { },
    extraReducers: {
      [getSubjectScoreApiAsync.pending]: (state) => {
        state.SubjectScoreApi.loading = true;
      },
      [getSubjectScoreApiAsync.rejected]: (state, action) => {
        state.SubjectScoreApi.loading = false;
        state.SubjectScoreApi.error = action.error.massage;
      },
      [getSubjectScoreApiAsync.fulfilled]: (state, action) => {
        state.SubjectScoreApi.loading = false;
        state.SubjectScoreApi.data = [...action.payload];
      }
    },
  });
  export default subjectScoreSlice;