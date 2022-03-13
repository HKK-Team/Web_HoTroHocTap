import React , {useState} from "react";
import axios from "axios";
import { toastError,toastSuccess } from "../../../shareAll/toastMassage/toastMassage";
import logo from "./../../../images/tdmu-elearning-banner.png";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./NewSubject.css";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { FaHome } from "react-icons/fa";
export default function NewSubjects() {
  // function formatter date time picker yyyy-MM-dd HH:mm:ss
  function getFormattedDate(date) {
    var data = date.toJSON();
    return data;
  }
  // declare state
  const [value, setValue] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [subject,setSubject] = useState({
    Subject_Id : '',
    Subject_Name : '',
    Number_Of_Credits : '',
    Khoa : '',
    Education_Program : '',
    Semester : '',
    Id_Next_Subject : '',
    Level : '',
    Start_Time : getFormattedDate(value),
    End_Time : getFormattedDate(date),
    Practice : '',
    Theory : '',
  });
  // handle change
  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setSubject({
      ...subject,
      [name]: value
    });
  }
  const handleSubmitCreateNewSubject = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/subject/NewSubject", { ...subject, Start_Time : getFormattedDate(value),End_Time : getFormattedDate(date) });
        setTimeout(() =>{
          window.location.href = "/HomeLecturer";
      });
      toastSuccess("Tạo môn học thành công!");
    } catch (err) {
      toastError(err.response.data.msg);
    }
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Thêm Môn Học</h1>
      <span><h3><FaHome/> / NewSubject</h3></span>
      <form className="addProductForm" onSubmit={handleSubmitCreateNewSubject}>
        <div className="addProductForm-warrper">
          <div className="addProductItem">
          <label>Mã học phần.</label>
            <TextField 
                id="outlined-basic" 
                label="Mã học phần" 
                variant="outlined" 
                name="Subject_Id"
                value={subject.Subject_Id}
                size="small"
                style={{marginRight: "10px",width: 250}}
                required
                onChange={onChangeInput}
            />
          </div>
          <div className="addProductItem">
            <label>Tên học phần.</label>
            <TextField 
                id="outlined-basic" 
                label="Tên học phần" 
                variant="outlined" 
                name="Subject_Name"
                value={subject.Subject_Name}
                size="small"
                style={{marginRight: "10px",width: 250}}
                required
                onChange={onChangeInput}
            />
          </div>
          <div className="addProductItem">
            <label>Số tín chỉ.</label>
            <TextField 
                id="outlined-basic" 
                label="Số tín chỉ" 
                variant="outlined" 
                name="Number_Of_Credits"
                value={subject.Number_Of_Credits}
                type="number"
                size="small"
                style={{marginRight: "10px",width: 250}}
                required
                onChange={onChangeInput}
            />
          </div>
          <div className="addProductItem">
            <label>Mã học phần kế tiếp.</label>
            <TextField 
                id="outlined-basic" 
                label="Mã học phần kế tiếp" 
                variant="outlined" 
                name="Id_Next_Subject"
                value={subject.Id_Next_Subject}
                size="small"
                style={{marginRight: "10px",width: 250}}
                required
                onChange={onChangeInput}
            />
          </div>
          <div className="addProductItem">
            <label>Cấp độ.</label>
            <FormControl style={{ marginRight: 10, width: 250 }} size="small">
                <InputLabel id="demo-simple-select-label">Cấp độ.</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="Level"
                value={subject.Level}
                label="Cấp độ"
                required
                onChange={(e) => setSubject({...subject, Level: e.target.value})}
                >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
                <MenuItem value="9">9</MenuItem>
                <MenuItem value="10">10</MenuItem>
                </Select>
          </FormControl>
          </div>
          <div className="addProductItem">
            <label>Khoa.</label>
            <FormControl style={{ marginRight: 10, width: 250 }} size="small">
                <InputLabel id="demo-simple-select-label">Khoa</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="Khoa"
                value={subject.Khoa}
                label="Khoa"
                required
                onChange={(e) => setSubject({...subject, Khoa: e.target.value})}
                >
                <MenuItem value="KT-CN">KT-CN</MenuItem>
                <MenuItem value="SP-KT">SP-KT</MenuItem>
                <MenuItem value="KT-NG">KT-NG</MenuItem>
                <MenuItem value="QT-KD">QT-KD</MenuItem>
                </Select>
          </FormControl>
          </div>
        </div>

        <div className="addProductForm-warrper">
          <div className="addProductItem">
            <label>Chương trình đào tạo.</label>
            <FormControl style={{ marginRight: 10, width: 250 }} size="small">
                <InputLabel id="demo-simple-select-label">Chương trình đào tạo.</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="Education_Program"
                value={subject.Education_Program}
                label="Chương trình đào tạo"
                required
                onChange={(e) => setSubject({...subject, Education_Program: e.target.value})}
                >
                <MenuItem value="KT-PM">KTPM</MenuItem>
                <MenuItem value="CN-TT">CNTT</MenuItem>
                <MenuItem value="HT-TT">HTTT</MenuItem>
                <MenuItem value="TT-NT">TTNT</MenuItem>
                </Select>
            </FormControl>
          </div>
          <div className="addProductItem">
            <label>Học kỳ.</label>
            <FormControl style={{ marginRight: 10, width: 250 }} size="small">
                <InputLabel id="demo-simple-select-label">Học kỳ.</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="Semester"
                value={subject.Semester}
                label="Học kỳ"
                required
                onChange={(e) => setSubject({...subject, Semester: e.target.value})}
                >
                <MenuItem value="HK1">HK1</MenuItem>
                <MenuItem value="HK2">HK2</MenuItem>
                <MenuItem value="HK3">HK3</MenuItem>
                <MenuItem value="HK4">HK4</MenuItem>
                <MenuItem value="HK5">HK5</MenuItem>
                <MenuItem value="HK6">HK6</MenuItem>
                <MenuItem value="HK7">HK7</MenuItem>
                <MenuItem value="HK8">HK8</MenuItem>
                <MenuItem value="HK9">HK9</MenuItem>
                <MenuItem value="HK10">HK10</MenuItem>
                </Select>
          </FormControl>
          </div>
          <div className="addProductItem">
            <label>Số buổi lý thuyết.</label>
            <TextField 
                id="outlined-basic" 
                label="Số buổi lý thuyết" 
                variant="outlined" 
                name="Theory"
                value={subject.Theory}
                type="number"
                size="small"
                style={{marginRight: "10px",width: 250}}
                required
                onChange={onChangeInput}
            />
          </div>
          <div className="addProductItem">
            <label>Số buổi thực hành.</label>
            <TextField 
                id="outlined-basic" 
                label="Số buổi thực hành" 
                variant="outlined" 
                name="Practice"
                value={subject.Practice}
                type="number"
                size="small"
                style={{marginRight: "10px",width: 250}}
                required
                onChange={onChangeInput}
            />
          </div>
          <div className="addProductItem">
            <label>Ngày bắt đầu.</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Ngày bắt đầu."
                    value={value}
                    onChange={(newValue) => {
                    setValue(newValue);
                    }}
                />
            </LocalizationProvider>
          </div>
          <div className="addProductItem">
            <label>Ngày kết thúc.</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                clearable
                value={date}
                onChange={(newValue) => setDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Ngày kết thúc" />
                )}
              />
            </LocalizationProvider>
          </div>

          <button
            className="addProductButton"
            style={{ background: "green", width: "100%", marginBottom: 10 }}
          >
            Tạo môn học
          </button>
        </div>
        <div className="addProductForm-warrper">
          <img
            src={logo}
            alt=""
            style={{ width: 600, height: 300, objectFit: "cover" }}
          />
        </div>
      </form>
    </div>
  );
}