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
                <input
                  type="text"
                  placeholder={data?.FullName}
                  name="FullName"
                  value={profile.FullName}
                  className="userUpdateInput"
                  onChange={onChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder={data?.Email}
                  value={profile.Email}
                  className="userUpdateInput"
                  onChange={onChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  placeholder={data?.Phone}
                  name="Phone"
                  value={profile.Phone}
                  className="userUpdateInput"
                  onChange={onChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  placeholder={data?.Address}
                  name="Address"
                  value={profile.Address}
                  className="userUpdateInput"
                  onChange={onChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Chương trình đào tạo</label>
                <input
                  type="text"
                  placeholder={data?.Education_Program}
                  name="Education_Program"
                  value={profile.Education_Program}
                  className="userUpdateInput"
                  onChange={onChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>
                  <span style={{ color: "red" }}>*</span> Khoa
                </label>
                <input
                  type="text"
                  placeholder={data?.Khoa}
                  name="Khoa"
                  value={profile.Khoa}
                  className="userUpdateInput"
                  onChange={onChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>
                  {" "}
                  <span style={{ color: "red" }}>*</span> Lớp
                </label>
                <input
                  type="text"
                  placeholder={data?.Class}
                  name="Class"
                  value={profile.Class}
                  className="userUpdateInput"
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
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
