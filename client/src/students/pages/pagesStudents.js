import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  // BrowserRouter as Router,
  Routes,
  useLocation
} from "react-router-dom";
import { getStudentsAccApiAsync } from "../../api/studentsAccountSlice";
import { getSubjectApiAsync } from "../../api/subjectApi";
import { getSubjectScoreApiAsync } from "../../api/subjectScoreApi";
import NotFound from "../../utils/not_found/NotFound";
import SideBarStudent from "./../components/SideBarStudents/SideBarStudents";
import TopBarStudent from "./../components/TopBarStudents/TopBarStudents";
import ProfileStudent from "./../pages/ProfileStudents/ProfileStudents";
import InputScore from "./InputScores/InputScore";
import ViewScore from "./ViewScores/ViewScore";
import SuggestSubject from "./SuggestSubjects/SuggestSubject"
function PagesStudents() {
  const [isLogged] = sessionStorage.getItem("StudentLogin") || "";
  const param = useLocation();

  const data = useSelector(
    (state) => state.StudentsAccount.StudentsAccountApi.data[0]
  );
  useEffect(() => {
    if (param.pathname.search("/HomeStudent") === 0) {
      document.querySelector(".containerAdmin-Secretarys")?.remove();
      document.querySelector(".topbarSecretary")?.remove();
    }
  }, [param]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (param.pathname.search("/HomeStudent") === 0) {
      dispatch(getStudentsAccApiAsync());
      dispatch(getSubjectApiAsync());
      dispatch(getSubjectScoreApiAsync());
    }
  }, [dispatch, param]);

  // kiểm tra giảng viên đã nhập mã Viên chức chưa ?
  useEffect(() => {
    if (data?.maKhoa === "" || data?.maVienChuc === "") {
      if (
        // eslint-disable-next-line no-restricted-globals
        confirm(
          "Bạn chưa cập nhật mã khoa và mã viên chức, vui lòng cập nhật để sử dụng"
        )
      ) {
        if (param.pathname.search("/HomeStudent/profileStudent") === 0) {
          return;
        } else {
          window.location.href = "/HomeStudent/profileStudent";
        }
      }
    }
  }, [data, param]);

  return (
    <Fragment>
      <TopBarStudent/>
      <div className="containerAdmin-Lecturers">
        <SideBarStudent/>
        <Routes>
          <Route
            exact
            path="/HomeStudent/profileStudent"
            element={isLogged ? <ProfileStudent /> : <NotFound />}
          />
          <Route
            exact
            path="/HomeStudent/inputScore"
            element={isLogged ? <InputScore /> : <NotFound />}
          />
          <Route
            exact
            path="/HomeStudent/viewScore"
            element={isLogged ? <ViewScore /> : <NotFound />}
          />
          <Route
            exact
            path="/HomeStudent/SuggestSubject"
            element={isLogged ? <SuggestSubject/> : <NotFound />}
          />
        </Routes>
      </div>
    </Fragment>
  );
}
export default PagesStudents;
