import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PermIdentity from "@mui/icons-material/MailOutline";
import MailOutline from "@mui/icons-material/PermIdentity";
import ClassIcon from '@mui/icons-material/Class';
import axios from "axios";
import "./InputScore.css"
import React, { useState } from "react";
import { useSelector,useDispatch} from "react-redux";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import {subjectsSlice} from "../../../api/subjectApi.js"
export default function ProfileLecturers() {
  const data = useSelector(
    (state) => state.StudentsAccount.StudentsAccountApi.data[0]
  );
  const subjects = useSelector(
      (state) => state.Subject.SubjectApi
  )
  // filter and put to select tag
  const setSubjectName = useSelector(
    (state) =>
      new Set(
        state.Subject.SubjectApi.data.map((element) =>
          element.Subject_Name
        )
      )
  );
  const setClassId = useSelector(
    (state) =>
      new Set(
        state.Subject.SubjectApi.data.map((element) =>
          element.Class_Id
        )
      )
  );
  const keySubjectName = [...setSubjectName];
  const [key, setkey] = useState(keySubjectName[0]);
  const keyClass = [...setClassId];
  const [classid, setclassid] = useState(keyClass[0]);
  const dispatch = useDispatch();
  const [subjectScore, setsubjectScore] = useState({
    Student_Id: data?._id,
    Email : data?.Email,
    FullName: data?.FullName,
    Subject_Id: subjects.data[0].Subject_Id,
    Subject_Name: keySubjectName[0],
    Number_Of_Credits: subjects.data[0].Number_Of_Credits,
    Class : data?.Class,
    Class_Subject_Id : keyClass[0],
    Education_Program : data.Education_Program,
    Process_Score : '',
    Final_Exam_Score : '',
    Final_Score : ''
  });
  const handleChange = (event) => {
    setkey(event.target.value);
    const SubjectID = subjects.data.filter((item)=>{
      return item.Subject_Name === event.target.value;
    });
    const id = SubjectID.map((item)=>(item.Subject_Id));
    const NOC = SubjectID.map((item)=>(item.Number_Of_Credits));
    setsubjectScore({ ...subjectScore, Subject_Name : event.target.value ,Subject_Id : id[0],Number_Of_Credits : NOC[0]})
    dispatch(subjectsSlice.actions.FilterSubjectName(event.target.value));
  };
  const handleChangeee = (event) => {
    setclassid(event.target.value);
    setsubjectScore({ ...subjectScore, Class_Subject_Id : event.target.value })
    dispatch(subjectsSlice.actions.FilterclassId(event.target.value));
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setsubjectScore({ ...subjectScore, [name]: value });
  };
  const EditUserSubmit = async (e) => {
    e.preventDefault();
    
    axios.post("http://localhost:5000/subjectScore/inputSubjectScore", { ...subjectScore});
    alert("Input Score Successfully!");
    window.location.href = "/HomeStudent";
  };
  console.log(subjectScore)
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Thông Tin Sinh Viên</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={data.Image}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">Họ Tên : {data?.FullName}</span>
              <span className="userShowUserTitle">Khoa : {data?.Khoa}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Chi tiết liên hệ</span>

            <div className="userShowInfo">
              <PermIdentity
                className="userShowIcon"
                style={{ color: "#000000" }}
              />
              <span className="userShowInfoTitle">Email : {data?.Email}</span>
            </div>
            <div className="userShowInfo">
              <LocalPhoneIcon
                className="userShowIcon"
                style={{ color: "#000000" }}
              />
              <span className="userShowInfoTitle">Phone : {data?.Phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline
                className="userShowIcon"
                style={{ color: "#000000" }}
              />
              <span className="userShowInfoTitle">CTĐT :  {data?.Education_Program}</span>
            </div>
            <div className="userShowInfo">
              <ClassIcon
                className="userShowIcon"
                style={{ color: "#000000" }}
              />
              <span className="userShowInfoTitle">Class :  {data?.Class}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Nhập Điểm Môn Học</span>
          <form className="userUpdateForm" onSubmit={EditUserSubmit}>
            <div className="userUpdateLeft">
                <div className="box">
                    <div className="select">
                      <FormControl style={{ marginRight: 10, width: 230}} size="small">
                        <InputLabel id="demo-simple-select-label">Chọn Môn Học</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="demo-simple-select"
                          value={key}
                          label="Chọn Môn Học"
                          onChange={handleChange}
                        >
                        {
                        subjects.data.map((item) => (
                          <MenuItem value={item.Subject_Name}>{item.Subject_Name}</MenuItem>
                        ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="select">
                    <FormControl style={{ marginRight: 10, width: 230}} size="small">
                        <InputLabel id="demo-simple-select-label">Mã Lớp</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="demo-simple-select"
                          value={classid}
                          label="Mã Lớp"
                          onChange={handleChangeee}
                        >
                        <MenuItem value="cq.01">cq.01</MenuItem>
                        <MenuItem value="cq.02">cq.02</MenuItem>
                        <MenuItem value="cq.03">cq.03</MenuItem>
                        <MenuItem value="cq.04">cq.04</MenuItem>
                        <MenuItem value="cq.05">cq.05</MenuItem>
                        <MenuItem value="cq.06">cq.06</MenuItem>
                        <MenuItem value="cq.07">cq.07</MenuItem>
                        <MenuItem value="cq.08">cq.08</MenuItem>
                        <MenuItem value="cq.09">cq.09</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="row">
                        <span>
                            <input class="skinny" name="Process_Score" type="text" placeholder="10.0" value={subjectScore.Process_Score} onChange={onChangeInput}/><label>Process_Score</label>
                        </span>
                    </div>
                    <div className="row">
                        <span>
                            <input class="skinny" name="Final_Exam_Score" type="text" placeholder="10.0" value={subjectScore.Final_Exam_Score} onChange={onChangeInput}/><label >Final_Exam_Score</label>
                        </span>
                    </div>
                    <div className="row">
                        <span>
                            <input class="skinny" name="Final_Score" type="text" placeholder="10.0" value={subjectScore.Final_Score} onChange={onChangeInput}/><label>Final_Score</label>
                        </span>
                    </div>
                </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img className="userUpdateImg" src={data?.Image} alt="" />
              </div>
              <button className="userUpdateBtn">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}