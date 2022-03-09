import { configureStore } from "@reduxjs/toolkit";
import {subjectScoreSlice} from "./Api/SubjectScoreApi";
import { StudentsAccSlice } from "./Api/StudentsApi";
import subjectScoreClass from "./Api/SubjectScoreClassApi";

export const store = configureStore({
  reducer: {
    SubjectScore: subjectScoreSlice.reducer,
    StudentsAccount : StudentsAccSlice.reducer,
    SubjectScoreClass : subjectScoreClass.reducer
  },
});
