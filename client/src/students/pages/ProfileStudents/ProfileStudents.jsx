import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PermIdentity from "@mui/icons-material/MailOutline";
import MailOutline from "@mui/icons-material/PermIdentity";
import Publish from "@mui/icons-material/Publish";
import ClassIcon from '@mui/icons-material/Class';
import SchoolIcon from '@mui/icons-material/School';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {toastSuccess} from "../../../shareAll/toastMassage/toastMassage.js";
import Loading from "./../../../utils/loading/Loading";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { FaHome } from "react-icons/fa";
import TextField from "@mui/material/TextField";
export default function ProfileStudent() {
  const data = useSelector(
    (state) => state.StudentsAccount.StudentsAccountApi.data[0]
  );
  const [profile, setProfile] = useState({
    _id: data?._id,
    Email: data?.Email,
    FullName: data?.FullName,
    Phone: data?.Phone,
    Khoa: data?.Khoa,
    Class: data?.Class,
    Address : data?.Address,
    Education_Program : data?.Education_Program
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const EditUserSubmit = async (e) => {
    e.preventDefault();
    
    axios.post("http://localhost:5000/student/edituser", { ...profile });
    setTimeout(() =>{
      window.location.href = "/HomeStudent";
    },1000)
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
        <h1 className="userTitle">Thông Tin Sinh Viên</h1>
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
              <span className="userShowInfoTitle">CTĐT :  {data?.Education_Program}</span>
            </div>
            <div className="userShowInfo">
              <ClassIcon
                className="userShowIcon"
                style={{ color: "#000000" }}
              />
              <span className="userShowInfoTitle">Class :  {data?.Class}</span>
            </div>
            <div className="userShowInfo">
              <LocalLibraryIcon
                className="userShowIcon"
                style={{ color: "#000000" }}
              />
              <span className="userShowInfoTitle">Current_Semester :  {data?.Current_Semester}</span>
            </div>
            <div className="userShowInfo">
              <SchoolIcon
                className="userShowIcon"
                style={{ color: "#000000" }}
              />
              <span className="userShowInfoTitle">Study Year :  {data?.Study_Year}</span>
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
                  style={{marginRight: "10px",width: 320,marginTop: "5px"}}
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
                  style={{marginRight: "10px",width: 320,marginTop: "5px"}}
                  required
                  InputProps={{
                    readOnly: true,
                  }}
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
                  style={{marginRight: "10px",width: 320,marginTop: "5px"}}
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
                  style={{marginRight: "10px",width: 320,marginTop: "5px"}}
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
                  name="Class"
                  value={profile.Class}
                  size="small"
                  style={{marginRight: "10px",width: 320,marginTop: "5px"}}
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
                  style={{marginRight: "10px",width: 320,marginTop: "5px"}}
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
                  style={{marginRight: "10px",width: 320,marginTop: "5px"}}
                  required
                  onChange={onChangeInput}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img className="userUpdateImg" src={data?.Image} alt="" />
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
