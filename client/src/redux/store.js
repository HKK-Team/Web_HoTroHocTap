import { configureStore } from "@reduxjs/toolkit";
import studentsAccSlice from "../api/studentsAccountSlice";
import lecturersAccSlice from "../api/lecturersAccountSlice";
import subjects from "../api/subjectApi";
import subjectScore from "../api/subjectScoreApi";
import subjectScoreClass from "../api/subjectScoreClassApi";

const store = configureStore({
  reducer: {
    LecturersAccount: lecturersAccSlice.reducer,
    StudentsAccount: studentsAccSlice.reducer,
    Subject : subjects.reducer,
    SubjectScore : subjectScore.reducer,
    SubjectScoreClass : subjectScoreClass.reducer
  },
});
export default store;
