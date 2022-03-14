import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const getStudentsAccApiAsync = createAsyncThunk(
  "StudentsAccount/getStudentsAccApi",
  async () => {
    try {
      const users =  await AsyncStorage.getItem("UserEmail");
      const res = await axios.get(`http://10.0.2.2:5000/student/getuser?Email[regex]=${users}`);
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
