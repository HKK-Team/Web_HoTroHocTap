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
import {subjectsSlice} from "../../../api/subjectApi.js";
import {toastSuccess} from "../../../shareAll/toastMassage/toastMassage.js";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Loading from "./../../../utils/loading/Loading";
import { FaHome } from "react-icons/fa";
export default function InputScore() {
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
  const keySubjectName = [...setSubjectName];
  const [key, setkey] = useState(keySubjectName[0]);
  const dispatch = useDispatch();
  const [subjectScore, setsubjectScore] = useState({
    Student_Id: data?._id,
    Email : data?.Email,
    FullName: data?.FullName,
    Subject_Id: subjects.data[0]?.Subject_Id,
    Subject_Name: keySubjectName[0],
    Number_Of_Credits: subjects.data[0]?.Number_Of_Credits,
    Class : data?.Class,
    Class_Subject_Id : '',
    Education_Program : subjects.data[0]?.Education_Program,
    Id_Next_Subject : subjects.data[0]?.Id_Next_Subject,
    Process_Score : '',
    Semester : subjects.data[0]?.Semester,
    Final_Exam_Score : '',
    Final_Score : '',
    GPA : ''
  });
  const handleChange = (event) => {
    setkey(event.target.value);
    const SubjectID = subjects.data.filter((item)=>{
      return item.Subject_Name === event.target.value;
    });
    const id = SubjectID.map((item)=>(item.Subject_Id));
    const NOC = SubjectID.map((item)=>(item.Number_Of_Credits));
    const INS = SubjectID.map((item) =>(item.Id_Next_Subject));
    const EPG = SubjectID.map((item) =>(item.Education_Program));
    const HK = SubjectID.map(item => item.Semester)
    setsubjectScore({ ...subjectScore, Subject_Name : event.target.value ,Subject_Id : id[0],Number_Of_Credits : NOC[0],Id_Next_Subject : INS[0],Semester : HK[0],Education_Program : EPG[0]});
    dispatch(subjectsSlice.actions.FilterSubjectName(event.target.value));
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setsubjectScore({ ...subjectScore, [name]: value });
  };
  const EditUserSubmit = async (e) => {
    e.preventDefault();
    
    axios.post("http://localhost:5000/subjectScore/inputSubjectScore", { ...subjectScore});
    setTimeout(() =>{
      window.location.href = "/HomeStudent";
    },1000)
    toastSuccess("Input Score Successfully!");
  };
  // set GPA
  const score = useSelector((state) => state.SubjectScore.SubjectScoreApi);
  var avgFinalScore = 0;
  var avgNumberofCredis = 0;
  score.data.map(item =>(
      avgNumberofCredis +=item.Number_Of_Credits
  ));
  score.data.map(item =>(
      avgFinalScore += item.Final_Score*item.Number_Of_Credits
  ));
  var avgScore = Math.round((avgFinalScore + parseFloat(subjectScore.Final_Score * subjectScore.Number_Of_Credits)) / (avgNumberofCredis + parseInt(subjectScore.Number_Of_Credits)) * 100) / 100;
  const setScore = () =>{
    setsubjectScore({...subjectScore,GPA : avgScore})
  }
  if(!data){
    return (
      <div className="loading">
        {" "}
        <Loading />
      </div>
    );
  }
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Nh???p ??i???m M??n H???c</h1>
      </div>
      <span><h3><FaHome/> / InputScore</h3></span>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={data.Image}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">H??? T??n : {data?.FullName}</span>
              <span className="userShowUserTitle">Khoa : {data?.Khoa}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Chi ti???t li??n h???</span>

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
              <span className="userShowInfoTitle">CT??T :  {data?.Education_Program}</span>
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
          <span className="userUpdateTitle">Nh???p ??i???m M??n H???c </span>

          <form className="userUpdateForm" onSubmit={EditUserSubmit}>
            <div className="userUpdateLeft">
                <div className="box">
                    <div className="select">
                      <FormControl style={{ marginRight: 10, width: 230}} size="small">
                        <InputLabel id="demo-simple-select-label">Ch???n M??n H???c</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="demo-simple-select"
                          value={key}
                          label="Ch???n M??n H???c"
                          required
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
                        <InputLabel id="demo-simple-select-label">M?? L???p</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="Class_Subject_Id"
                          label="M?? L???p"
                          value={subjectScore.Class_Subject_Id}
                          required
                          onChange={(e) => setsubjectScore({ ...subjectScore, Class_Subject_Id: e.target.value })}
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
                            <input class="skinny" name="Process_Score" type="text" placeholder="10.0" value={subjectScore.Process_Score} onChange={onChangeInput} required/><label>Process_Score</label>
                        </span>
                    </div>
                    <div className="row">
                        <span>
                            <input class="skinny" name="Final_Exam_Score" type="text" placeholder="10.0" value={subjectScore.Final_Exam_Score} onChange={onChangeInput} required/><label >Final_Exam_Score</label>
                        </span>
                    </div>
                    <div className="row">
                        <span>
                            <input class="skinny" name="Final_Score" type="text" placeholder="10.0" value={subjectScore.Final_Score} onChange={onChangeInput} required/><label>Final_Score</label>
                        </span>
                    </div>
                    <button className = "btnNhapDiem" onClick = {setScore}><CreditScoreIcon/> Nh???p ??i???m</button>
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
