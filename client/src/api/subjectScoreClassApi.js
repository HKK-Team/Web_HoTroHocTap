import {
    createAsyncThunk, createSlice, isRejectedWithValue
  } from "@reduxjs/toolkit";
  import axios from "axios";
  
  export const getSubjectScoreClassApiAsync = createAsyncThunk(
    "subjectScoreClass/getSubjectScoreClassApi",
    async () => {
      try {
        const res = await axios.get('/subjectScore/getsubjectScore');
        return res.data;
      } catch (err) {
        return isRejectedWithValue(err.response.data);
      }
    }
  );
  export const subjectScoreClassSlice = createSlice({
    name: "SubjectScoreClass", // lưu lại tên chỉ định để dễ dàng quản lý store
    initialState: { // thực hiện những action lưu lại trên store và trả về cho UI
      SubjectScoreClassApi: { data: [], loading: false, error: "" }
  },
    reducers: { },
    extraReducers: {
      [getSubjectScoreClassApiAsync.pending]: (state) => {
        state.SubjectScoreClassApi.loading = true;
      },
      [getSubjectScoreClassApiAsync.rejected]: (state, action) => {
        state.SubjectScoreClassApi.loading = false;
        state.SubjectScoreClassApi.error = action.error.massage;
      },
      [getSubjectScoreClassApiAsync.fulfilled]: (state, action) => {
        state.SubjectScoreClassApi.loading = false;
        state.SubjectScoreClassApi.data = [...action.payload];
      }
    },
  });
  export default subjectScoreClassSlice;