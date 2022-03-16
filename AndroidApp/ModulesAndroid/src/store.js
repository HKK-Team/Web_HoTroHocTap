import { configureStore } from "@reduxjs/toolkit";
import {subjectScoreSlice} from "./Api/SubjectScoreApi";
import { StudentsAccSlice } from "./Api/StudentsApi";
import subjectScoreClass from "./Api/SubjectScoreClassApi";
import {SubjectsSlice} from "./Api/SubjectApi";

export const store = configureStore({
  reducer: {
    SubjectScore: subjectScoreSlice.reducer,
    StudentsAccount : StudentsAccSlice.reducer,
    SubjectScoreClass : subjectScoreClass.reducer,
    Subjects : SubjectsSlice.reducer
  },
});
