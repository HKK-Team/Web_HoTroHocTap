import { configureStore } from "@reduxjs/toolkit";
import studentsAccSlice from "../api/studentsAccountSlice";
import {LecturersAccSlice} from "../api/lecturersAccountSlice";
import subjects from "../api/subjectApi";
import subjectScore from "../api/subjectScoreApi";
import subjectScoreClass from "../api/subjectScoreClassApi";
import {StudentsAccSlice} from "../api/lecturersAccountSlice";

const store = configureStore({
  reducer: {
    LecturersAccount: LecturersAccSlice.reducer,
    StudentsAccount: studentsAccSlice.reducer,
    Subject : subjects.reducer,
    SubjectScore : subjectScore.reducer,
    SubjectScoreClass : subjectScoreClass.reducer,
    StudentsAccountApi: StudentsAccSlice.reducer,
  },
});
export default store;
