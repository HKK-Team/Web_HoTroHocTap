import Sidebar from "./components/Sidebar/Sidebar";
import { Fragment, useEffect } from "react";
import Topbar from "./components/Topbar/Topbar";
import "./app.css";
import AccountLecturer from "./pages/AccoutLecturers/AccoutLecturer";
import ViewListStudent from "./pages/ViewListStudents/ViewListStudent";
import ProfileLecturer from "./pages/ProfileLecturers/ProfileLecturers";
import { Routes, Route, useLocation } from "react-router-dom";
import NotFound from "../utils/not_found/NotFound";
import { useDispatch } from "react-redux";
import { getLecturersAccApiAsync } from "../api/lecturersAccountSlice";
import { getSubjectScoreApiAsync} from "../api/subjectScoreApi";
import { getStudentsAccApiAsync } from "../api/lecturersAccountSlice";
import ViewStudentDetail from "./pages/ViewStudentDetails/ViewStudentDetail";
import {getSubjectScoreClassApiAsync} from "../api/subjectScoreClassApi";
import ViewStatusStudent from "./pages/ViewStatusStudents/ViewStatusStudent";
import StudentStatusStatistic from "./pages/StudentStatusStatistics/StudentStatusStatistics";
import MailService from "../lecturers/pages/MailService/MailService";
import NewSubjects from "./pages/NewSubject/NewSubject";
function PagesLecturers() {
  const isLogged = sessionStorage.getItem("LecturerLogin");
  const param = useLocation();
  useEffect(() => {
    if (param.pathname.search("/HomeLecturer") === 0) {
      document.querySelector(".containerAdmin-Lecturers")?.remove();
      document.querySelector(".topBarLecturers")?.remove();
    }
  }, [param]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (param.pathname.search("/HomeLecturer") === 0) {
      dispatch(getLecturersAccApiAsync());
      dispatch(getStudentsAccApiAsync());
      dispatch(getSubjectScoreApiAsync());
      dispatch(getSubjectScoreClassApiAsync());
    }
  }, [dispatch, param]);
  return (
    <Fragment>
      <Topbar />
      <div className="containerAdmin-Secretarys">
        {/* Menu nav */}
        <Sidebar />
        {/* Link url */}
        <Routes>
          <Route
            exact
            path="/HomeLecturer/ViewStatusStudent"
            element={isLogged ? <ViewStatusStudent /> : NotFound()}
          />
          <Route
            exact
            path="/HomeLecturer/ViewListStudent"
            element={isLogged ? <ViewListStudent /> : NotFound()}
          />
          <Route
            exact
            path="/HomeLecturer/ViewListStudent/:studentId"
            element={isLogged ? <ViewStudentDetail/> : NotFound()}
          />
          <Route
            exact
            path="/HomeLecturer/profileLecturer"
            element={isLogged ? <ProfileLecturer /> : NotFound()}
          />
          <Route
            exact
            path="/HomeLecturer/accountLecturer"
            element={isLogged ? <AccountLecturer /> : NotFound()}
          />
          <Route
            exact
            path="/HomeLecturer/StudentStatusStatistic"
            element={isLogged ? <StudentStatusStatistic /> : NotFound()}
          />
          <Route
            exact
            path="/HomeLecturer"
            element={isLogged ? <StudentStatusStatistic /> : NotFound()}
          />
          <Route
            exact
            path="HomeLecturer/Mailservice/:id"
            element={isLogged ? <MailService /> : NotFound()}
          />
          <Route
            exact
            path="HomeLecturer/NewSubject"
            element={isLogged ? <NewSubjects /> : NotFound()}
          />
        </Routes>

        {/* end of  Link url */}
      </div>
    </Fragment>
  );
}

export default PagesLecturers;
