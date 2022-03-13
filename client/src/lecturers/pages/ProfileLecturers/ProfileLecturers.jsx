import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PermIdentity from "@mui/icons-material/MailOutline";
import MailOutline from "@mui/icons-material/PermIdentity";
import Publish from "@mui/icons-material/Publish";
import ClassIcon from '@mui/icons-material/Class';
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./ProfileLecturer.css";
import {toastSuccess} from "../../../shareAll/toastMassage/toastMassage.js";
import Loading from "./../../../utils/loading/Loading";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { FaHome } from "react-icons/fa";
import TextField from "@mui/material/TextField";
// chỉnh sửa thông tin Thư ký
export default function ProfileLecturer() {
  const data = useSelector(
    (state) => state.LecturersAccount.LecturersAccountApi.data[0]
  );
  const [profile, setProfile] = useState({
    _id: data?._id,
    Email: data?.Email,
    FullName: data?.FullName,
    Phone: data?.Phone,
    Address : data?.Address,
    Education_Program : data?.Education_Program,
    Class_Advisor : data?.Class_Advisor,
    Khoa : data?.Khoa
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const EditUserSubmit = async (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/lecturer/edituser", { ...profile });
    setTimeout(() =>{
      window.location.href = "/HomeLecturer";
    })
    toastSuccess("Update User Succesfully!");
  };
  if(!data)
  {
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
        <h1 className="userTitle">Thông Tin Giảng Viên</h1>
      </div>
      <span><h3><FaHome/> / Profile</h3></span>
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
              <span className="userShowInfoTitle">
                CTĐT : {data?.Education_Program}
              </span>
            </div>
            <div className="userShowInfo">
              <ClassIcon
                className="userShowIcon"
                style={{ color: "#000000" }}
              />
              <span className="userShowInfoTitle">
              Class Advisor : {data?.Class_Advisor}
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Chỉnh sửa</span>
          <form className="userUpdateForm" onSubmit={EditUserSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Họ và Tên</label>
                <TextField 
                  id="outlined-basic" 
                  label="Họ và tên" 
                  variant="outlined" 
                  name="FullName"
                  value={profile.FullName}
                  size="small"
                  style={{marginRight: "10px",width: 280,marginTop: "5px"}}
                  required
                  onChange={onChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <TextField 
                  id="outlined-basic" 
                  label="Email" 
                  variant="outlined" 
                  name="Email"
                  value={profile.Email}
                  size="small"
                  style={{marginRight: "10px",width: 280,marginTop: "5px"}}
                  required
                  onChange={onChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Số điện thoại</label>
                <TextField 
                  id="outlined-basic" 
                  label="Số điện thoại" 
                  variant="outlined" 
                  name="Phone"
                  value={profile.Phone}
                  size="small"
                  style={{marginRight: "10px",width: 280,marginTop: "5px"}}
                  required
                  onChange={onChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <TextField 
                  id="outlined-basic" 
                  label="Địa chỉ" 
                  variant="outlined" 
                  name="Address"
                  value={profile.Address}
                  size="small"
                  style={{marginRight: "10px",width: 280,marginTop: "5px"}}
                  required
                  onChange={onChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Class - Advisor</label>
                <TextField 
                  id="outlined-basic" 
                  label="Lớp" 
                  variant="outlined" 
                  name="Class_Advisor"
                  value={profile.Class_Advisor}
                  size="small"
                  style={{marginRight: "10px",width: 280,marginTop: "5px"}}
                  required
                  onChange={onChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Education - Program</label>
                <TextField 
                  id="outlined-basic" 
                  label="Chương trình đào tạo" 
                  variant="outlined" 
                  name="Education_Program"
                  value={profile.Education_Program}
                  size="small"
                  style={{marginRight: "10px",width: 280,marginTop: "5px"}}
                  required
                  onChange={onChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Khoa</label>
                <TextField 
                  id="outlined-basic" 
                  label="Khoa" 
                  variant="outlined" 
                  name="Khoa"
                  value={profile.Khoa}
                  size="small"
                  style={{marginRight: "10px",width: 280,marginTop: "5px"}}
                  required
                  onChange={onChangeInput}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={data?.Image}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton"><SaveAsIcon/> Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
