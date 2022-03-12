import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getLecturersAccLogin } from "../../../redux/selectors";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";
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

// thêm sản phẩm mới
export default function NewSubjects() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const secretaryAccount = useSelector(getLecturersAccLogin);
  const maKhoa = secretaryAccount?.maKhoa;
  const chuongTrinhDaoTao = secretaryAccount?.chuongTrinhDaoTao;

  const onSubmit = (data) => {
    data.maKhoa = maKhoa;
    data.maChuongTrinh = chuongTrinhDaoTao;
    toastPromise(
      axios.post("http://localhost:5000/import/createMonThi", {
        ...data,
      }),
      () => {
        setTimeout(() => {
          navigate("/HomeSecretary/subjects");
        }, 1000);
        return "Thêm Thành Công";
      }
    );
  };
  function getFormattedDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear().toString()
    return year + '-' + month + '-' + day;
    }
  const [value, setValue] = React.useState(new Date());
  console.log(getFormattedDate(value));
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Thêm Môn Học</h1>
      <form className="addProductForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="addProductForm-warrper">
          <div className="addProductItem">
          <label>Mã học phần.</label>
            <TextField 
                id="outlined-basic" 
                label="Mã học phần" 
                variant="outlined" 
                name="Score"
                // value={warning.Score}
                size="small"
                style={{marginRight: "10px",width: 250}}
                required
                // onChange = {(e) => setWarning({...warning, Score: e.target.value})}
            />
          </div>
          <div className="addProductItem">
            <label>Tên học phần.</label>
            <TextField 
                id="outlined-basic" 
                label="Tên học phần" 
                variant="outlined" 
                name="Score"
                // value={warning.Score}
                size="small"
                style={{marginRight: "10px",width: 250}}
                required
                // onChange = {(e) => setWarning({...warning, Score: e.target.value})}
            />
          </div>
          <div className="addProductItem">
            <label>Số tín chỉ.</label>
            <TextField 
                id="outlined-basic" 
                label="Số tín chỉ" 
                variant="outlined" 
                name="Score"
                // value={warning.Score}
                size="small"
                style={{marginRight: "10px",width: 250}}
                required
                // onChange = {(e) => setWarning({...warning, Score: e.target.value})}
            />
          </div>
          <div className="addProductItem">
            <label>Mã học phần kế tiếp.</label>
            <TextField 
                id="outlined-basic" 
                label="Mã học phần kế tiếp" 
                variant="outlined" 
                name="Score"
                // value={warning.Score}
                size="small"
                style={{marginRight: "10px",width: 250}}
                required
                // onChange = {(e) => setWarning({...warning, Score: e.target.value})}
            />
          </div>
          <div className="addProductItem">
            <label>Cấp độ.</label>
            <FormControl style={{ marginRight: 10, width: 250 }} size="small">
                <InputLabel id="demo-simple-select-label">Cấp độ.</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="Semester"
                // value={warning.Semester}
                label="Cấp độ"
                required
                //onChange={(e) => setWarning({...warning, Semester: e.target.value})}
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
                name="Semester"
                // value={warning.Semester}
                label="Khoa"
                required
                //onChange={(e) => setWarning({...warning, Semester: e.target.value})}
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
                name="Semester"
                // value={warning.Semester}
                label="Chương trình đào tạo"
                required
                //onChange={(e) => setWarning({...warning, Semester: e.target.value})}
                >
                <MenuItem value="KTPM">KTPM</MenuItem>
                <MenuItem value="CNTT">CNTT</MenuItem>
                <MenuItem value="HTTT">HTTT</MenuItem>
                <MenuItem value="TTNT">TTNT</MenuItem>
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
                // value={warning.Semester}
                label="Học kỳ"
                required
                //onChange={(e) => setWarning({...warning, Semester: e.target.value})}
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
                name="Score"
                // value={warning.Score}
                size="small"
                style={{marginRight: "10px",width: 250}}
                required
                // onChange = {(e) => setWarning({...warning, Score: e.target.value})}
            />
          </div>
          <div className="addProductItem">
            <label>Số buổi thực hành.</label>
            <TextField 
                id="outlined-basic" 
                label="Số buổi thực hành" 
                variant="outlined" 
                name="Score"
                // value={warning.Score}
                size="small"
                style={{marginRight: "10px",width: 250}}
                required
                // onChange = {(e) => setWarning({...warning, Score: e.target.value})}
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
                    renderInput={(props) => <TextField {...props} />}
                    label="Ngày kết thúc."
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
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