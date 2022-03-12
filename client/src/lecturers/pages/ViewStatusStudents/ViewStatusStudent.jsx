import React, {useState} from 'react';
import { makeStyles } from "@material-ui/styles";
import { createTheme } from "@mui/material/styles";
import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";
import { useSelector } from "react-redux";
import Loading from "./../../../utils/loading/Loading";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./ViewStatusStudent.css";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { sendMailStopAcademic } from "../../../../src/api/MailService";
import {toastError,toastSuccess} from "../../../shareAll/toastMassage/toastMassage.js";
export default function ViewStatusStudent() {
    // get lecturer account
    const lecturer = useSelector(
        (state) =>  state.LecturersAccount.LecturersAccountApi.data[0]
    );
    // get List student from class
    const data = useSelector((state) =>
    state.StudentsAccountApi.StudentsAccount.data.filter(
      (item) =>
        item.Class === lecturer?.Class_Advisor
    )
    );
    const subjectScoreClass = useSelector((state) => state.SubjectScoreClass.SubjectScoreClassApi.data);
    const columns = [
    { field: "Student_Id",
      headerName: "Mã Sinh Viên",
      width: 220 
    },
    { field: "FullName",
      headerName: "Họ Tên",
      width: 150 
    },
    {
      field: "Email",
      headerName: "Email",
      width: 280,
    },
    { field: "Address", headerName: "Địa chỉ", width: 145 },
    {
        field: "Class",
        headerName: "Lớp",
        width: 90,
      },
    {
      field: "Khoa",
      headerName: "Khoa",
      width: 80,
    },
    {
      field: "Phone",
      headerName: "Số điện thoại",
      width: 110,
    },
    {
        field: "Number_Of_Subjects_Studied",
        headerName: "Số môn đã học",
        width: 125,
    },
    {
      field: "Number_Of_Subjects_Debt",
      headerName: "Số môn mắc nợ",
      width: 135,
  },
    {
        field: "Number_Of_Registered_Credits",
        headerName: "Số tín chỉ đăng ký",
        width: 140,
    },
    {
        field: "Number_Of_Credits_Earned",
        headerName: "Số tín chỉ đạt được",
        width: 150,
    },
    {
        field: "Outstanding_Number_Of_Credits",
        headerName: "Số tín chỉ còn nợ",
        width: 140,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/HomeLecturer/MailService/" + params.id}>
              <button className="productListEdit">Gửi mail cảnh cáo</button>
            </Link>
          </>
        );
      },
    },
  ];
  const defaultTheme = createTheme();

  const useStyles = makeStyles(
    (theme) => {
      return {
        root: {
          "& .MuiButton-root": {
            color: "#1976d2",
            fontWeight: "700",
          },
          "& .MuiSvgIcon-root": {
            color: "#1976d2",
            fontWeight: "700",
          },
        },
      };
    },
    { defaultTheme }
  );
  const [warning, setWarning] = useState({
    Score : '',
    Semester : '',
    Student : []
  });
  // declare array and set default value
  var result = [];
  var array = [];
  var sumAVG = 0;
  var sumNOC = 0;
  var arrResult = [];
  function compareSubject(a,b){
    if(a.Email > b.Email)
    {
        return -1;
    }
    if(a.Email < b.Email)
    {
        return 1;
    }
    return 0;
  }
  const handleSendEmailStopAcademic = async (e) => {
    try {
      e.preventDefault();
      // get list student from Semester and Score
      if(warning.Semester === "2019-2020")
      {
        array = subjectScoreClass.filter(item => item.Semester  === "HK1" || item.Semester === "HK2");
        array.sort(compareSubject);
        for(let i = 0; i < array.length; i++)
        {
          if(array[i]?.Email === array[i+1]?.Email)
          {
            sumAVG += array[i]?.Final_Score * array[i]?.Number_Of_Credits;
            sumNOC += array[i]?.Number_Of_Credits;
          }
          else{
            sumAVG += array[i]?.Final_Score * array[i]?.Number_Of_Credits;
            sumNOC += array[i]?.Number_Of_Credits;
            result.push({
              Email : array[i].Email, 
              AVG : Math.round(sumAVG/sumNOC*100)/100,
              FullName : array[i].FullName,
              Class : array[i].Class,
              Education_Program : array[i].Education_Program,
            });
            sumAVG = 0;
            sumNOC = 0;
          }
        }
        arrResult = result.filter(item => item.AVG <= parseFloat(warning.Score));
        if (window.confirm("Bạn thực sự muốn gửi email không?")) {
          sendMailStopAcademic({...warning,Student : arrResult});
          setTimeout(() =>{
              window.location.href = "/HomeLecturer/ViewStatusStudent";
          },1000)
          toastSuccess("Gửi mail thành công!");
        } else {
            toastSuccess("Đã hủy gửi email");
        }
      }
      else if(warning.Semester === "2020-2021")
      {
        array = subjectScoreClass.filter(item => item.Semester  === "HK3" || item.Semester === "HK4" || item.Semester === "HK5");
        array.sort(compareSubject);
        for(let i = 0; i < array.length; i++)
        {
          if(array[i]?.Email === array[i+1]?.Email)
          {
            sumAVG += array[i]?.Final_Score * array[i]?.Number_Of_Credits;
            sumNOC += array[i]?.Number_Of_Credits;
          }
          else{
            sumAVG += array[i]?.Final_Score * array[i]?.Number_Of_Credits;
            sumNOC += array[i]?.Number_Of_Credits;
            result.push({
              Email : array[i].Email, 
              AVG : Math.round(sumAVG/sumNOC*100)/100,
              FullName : array[i].FullName,
              Class : array[i].Class,
              Education_Program : array[i].Education_Program,
            });
            sumAVG = 0;
            sumNOC = 0;
          }
        }
        arrResult = result.filter(item => item.AVG <= parseFloat(warning.Score));
        if (window.confirm("Bạn thực sự muốn gửi email không?")) {
          sendMailStopAcademic({...warning,Student : arrResult});
          setTimeout(() =>{
              window.location.href = "/HomeLecturer/ViewStatusStudent";
          },1000)
          toastSuccess("Gửi mail thành công!");
        } else {
            toastSuccess("Đã hủy gửi email");
        }
      }
      else if(warning.Semester === "2021-2022")
      {
        array = subjectScoreClass.filter(item => item.Semester  === "HK6" || item.Semester === "HK7" || item.Semester === "HK8");
        array.sort(compareSubject);
        for(let i = 0; i < array.length; i++)
        {
          if(array[i]?.Email === array[i+1]?.Email)
          {
            sumAVG += array[i]?.Final_Score * array[i]?.Number_Of_Credits;
            sumNOC += array[i]?.Number_Of_Credits;
          }
          else{
            sumAVG += array[i]?.Final_Score * array[i]?.Number_Of_Credits;
            sumNOC += array[i]?.Number_Of_Credits;
            result.push({
              Email : array[i].Email, 
              AVG : Math.round(sumAVG/sumNOC*100)/100,
              FullName : array[i].FullName,
              Class : array[i].Class,
              Education_Program : array[i].Education_Program,
            });
            sumAVG = 0;
            sumNOC = 0;
          }
        }
        arrResult = result.filter(item => item.AVG <= parseFloat(warning.Score));
        if (window.confirm("Bạn thực sự muốn gửi email không?")) {
          sendMailStopAcademic({...warning,Student : arrResult});
          setTimeout(() =>{
              window.location.href = "/HomeLecturer/ViewStatusStudent";
          },1000)
          toastSuccess("Gửi mail thành công!");
        } else {
            toastSuccess("Đã hủy gửi email");
        }
      }
      else
      {
        array = subjectScoreClass.filter(item => item.Semester  === "HK9" || item.Semester === "HK10");
        array.sort(compareSubject);
        for(let i = 0; i < array.length; i++)
        {
          if(array[i]?.Email === array[i+1]?.Email)
          {
            sumAVG += array[i]?.Final_Score * array[i]?.Number_Of_Credits;
            sumNOC += array[i]?.Number_Of_Credits;
          }
          else{
            sumAVG += array[i]?.Final_Score * array[i]?.Number_Of_Credits;
            sumNOC += array[i]?.Number_Of_Credits;
            result.push({
              Email : array[i].Email, 
              AVG : Math.round(sumAVG/sumNOC*100)/100,
              FullName : array[i].FullName,
              Class : array[i].Class,
              Education_Program : array[i].Education_Program,
            });
            sumAVG = 0;
            sumNOC = 0;
          }
        }
        arrResult = result.filter(item => item.AVG <= parseFloat(warning.Score));
        if (window.confirm("Bạn thực sự muốn gửi email không?")) {
          sendMailStopAcademic({...warning,Student : arrResult});
          setTimeout(() =>{
              window.location.href = "/HomeLecturer/ViewStatusStudent";
          },1000)
          toastSuccess("Gửi mail thành công!");
        } else {
            toastSuccess("Đã hủy gửi email");
        }
      }
    }
    catch(err) {
      toastError(err.response.data.msg)
    }
  }
  const classes = useStyles();
  if(!lecturer)
  {
    return (
      <div className="loading">
        {" "}
        <Loading />
      </div>
    );
  }
  return (
    <div className="productList">
      <div className="header-table">
        <h1 className="header-table-title">Gửi Mail Cảnh Báo Tình Trạng Học Tập</h1>
      </div>
      <span><h3><FaHome/> / ViewStatusStudent</h3></span>
      <div className="header-table">
        <div className="header-table-buttons">
          <TextField 
            id="outlined-basic" 
            label="Điểm Thôi Học" 
            variant="outlined" 
            name="Score"
            value={warning.Score}
            size="small"
            style={{marginRight: "10px"}}
            required
            onChange = {(e) => setWarning({...warning, Score: e.target.value})}
          />
          <FormControl style={{ marginRight: 10, width: 200 }} size="small">
            <InputLabel id="demo-simple-select-label">Chọn Năm Học</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="Semester"
              value={warning.Semester}
              label="Chọn năm học"
              required
              onChange={(e) => setWarning({...warning, Semester: e.target.value})}
            >
              <MenuItem value="2019-2020">2019-2020</MenuItem>
              <MenuItem value="2020-2021">2020-2021</MenuItem>
              <MenuItem value="2021-2022">2021-2022</MenuItem>
              <MenuItem value="2022-2023">2022-2023</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title="Gửi mail thông báo thôi học tất cả sinh viên" arrow>
            <Button
              variant="contained"
              size="medium"
              style={{ marginRight: 10 }}
              onClick={handleSendEmailStopAcademic}
            >
              Gửi mail thông báo tất cả
            </Button>
          </Tooltip>
          <p className="header-table-ps">P/s : Cố vấn học tập chọn năm học và nhập điểm thôi học.</p>
          <p className="header-table-ps">P/s : Khi cố vấn click gửi mail,
            thì tất cả những sinh viên có điểm trung bình học kỳ nhỏ hơn hoặc bằng điểm thôi học sẽ nhận được mail buộc thôi học.</p>
        </div>
      </div>
      <DataGridPro
        className={classes.root}
        getRowId={(row) => row._id}
        rows={data}
        disableSelectionOnClick
        columns={columns}
        initialState={{
          pinnedColumns: { left: ["Student_Id"], right: ["action"] },
        }}
        density="comfortable"
        scrollbarSize={10}
        localeText={{
          toolbarDensity: "Size",
          toolbarDensityLabel: "Size",
          toolbarDensityCompact: "Small",
          toolbarDensityStandard: "Medium",
          toolbarDensityComfortable: "Large",
        }}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
}