import { Button } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getSubjectScoreClassApiAsync } from "../../api/subjectScoreClassApi";

export default function FilterSearchHome() {
  useEffect(() => {
    const topbarSecretary = document.querySelector(".topbarSecretary");
    const containerAdminSecretarys = document.querySelector(
      ".containerAdmin-Secretarys"
    );
    const topBarLecturers = document.querySelector(".topBarLecturers");
    const containerAdminLecturers = document.querySelector(
      ".containerAdmin-Lecturers"
    );
    topbarSecretary.style.display = "none";
    containerAdminSecretarys.style.display = "none";
    topBarLecturers.style.display = "none";
    containerAdminLecturers.style.display = "none";
    document.body.style.overflowY = "auto";
  }, []);
  const param = useParams();
  // get subject score
  const data = useSelector((state) => state.SubjectScoreClass.SubjectScoreClassApi.data.filter(item => item.Email === param.id || item.Email.slice(0,13) === param.id));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubjectScoreClassApiAsync());
  }, [dispatch]);
  console.log(data)
  const columns = [
    { field: "Subject_Id", headerName: "Mã môn học", width: 130 },
    { field: "Class_Subject_Id", headerName: "Mã lớp học", width: 130 },
    { field: "Subject_Name", headerName: "Tên môn học", width: 370 },
    { field: "Education_Program", headerName: "Chương trình Đào Tạo", width: 175 },
    { field: "Number_Of_Credits", headerName: "Số tín chỉ", width: 180 },
    { field: "Semester", headerName: "Học kỳ", width: 120 },
    { field: "Process_Score", headerName: "Điểm quá trình", width: 130 },
    { field: "Final_Exam_Score", headerName: "Điểm thi", width: 130 },
    { field: "Final_Score", headerName: "Điểm tổng kết", width: 130 },
  ];
  return (
    <div>
      <Button variant="contained" size="small" style={{ margin: 10 }}>
        <Link to="/" style={{ color: "white" }}>
          {" "}
          Trở lại
        </Link>
      </Button>
      <h1 style={{ textAlign: "center" }}>Hệ Thống Tra Cứu Điểm Thi</h1>
      <h4 style={{ textAlign: "center" }}>Từ Khóa : {param.id}</h4>
      <div style={{ padding: 10, boxShadow: "rgb(0 0 0 / 35%) 0px 5px 15px" }}>
        <DataGridPro
          autoHeight
          getRowId={(row) => row._id}
          rows = {data}
          hideFooter
          disableSelectionOnClick
          columns={columns}
          localeText={{
            toolbarDensity: "Size",
            toolbarDensityLabel: "Size",
            toolbarDensityCompact: "Small",
            toolbarDensityStandard: "Medium",
            toolbarDensityComfortable: "Large",
          }}
        />
      </div>
    </div>
  );
}
