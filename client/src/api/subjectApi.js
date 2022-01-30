import {
    createAsyncThunk, createSlice, isRejectedWithValue
  } from "@reduxjs/toolkit";
  import axios from "axios";
  
  export const getSubjectApiAsync = createAsyncThunk(
    "Subjects/getSubjectApi",
    async () => {
      try {
        const res = await axios.get('http://localhost:5000/subject/getSubject');
        return res.data;
      } catch (err) {
        return isRejectedWithValue(err.response.data);
      }
    }
  );
  export const subjectsSlice = createSlice({
    name: "Subjects", // lưu lại tên chỉ định để dễ dàng quản lý store
    initialState: { // thực hiện những action lưu lại trên store và trả về cho UI
      SubjectApi: { data: [], loading: false, error: "" },
      filters: { subjectname: "",subjectId : "",classId : ""}
  },
    reducers: { // lưu lại những action
      FilterSubjectName: (state, action) => {
        state.filters.subjectname = action.payload;
      },
      FilterSubjectId: (state, action) => {
        state.filters.subjectId = action.payload;
      },
      FilterclassId: (state, action) => {
        state.filters.classId = action.payload;
      },
    },
    extraReducers: {
      [getSubjectApiAsync.pending]: (state) => {
        state.SubjectApi.loading = true;
      },
      [getSubjectApiAsync.rejected]: (state, action) => {
        state.SubjectApi.loading = false;
        state.SubjectApi.error = action.error.massage;
      },
      [getSubjectApiAsync.fulfilled]: (state, action) => {
        state.SubjectApi.loading = false;
        state.SubjectApi.data = [...action.payload];
      },
    },
  });
  export default subjectsSlice;