import { configureStore } from "@reduxjs/toolkit";
import studentsAccSlice from "../api/studentsAccountSlice";
import lecturersAccSlice from "../api/lecturersAccountSlice";
import lecturersSlice from "../lecturers/sliceApi/LecturersSlice/lecturersSlice";
import schedulesSlice from "../lecturers/sliceApi/SchedulesSlice/schedulesSlice";
import subjectsSlice from "../lecturers/sliceApi/SubjectsSlice/subjectsSlice";
import subjects from "../api/subjectApi";
import subjectScore from "../api/subjectScoreApi";
import subjectScoreClass from "../api/subjectScoreClassApi";

const store = configureStore({
  reducer: {
    Lecturers: lecturersSlice.reducer,
    Subjects: subjectsSlice.reducer,
    Schedules: schedulesSlice.reducer,
    LecturersAccount: lecturersAccSlice.reducer,
    StudentsAccount: studentsAccSlice.reducer,
    Subject : subjects.reducer,
    SubjectScore : subjectScore.reducer,
    SubjectScoreClass : subjectScoreClass.reducer
  },
});
export default store;
