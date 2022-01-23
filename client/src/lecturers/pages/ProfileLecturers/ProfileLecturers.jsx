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
    Adress : data?.Address,
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
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Thông Tin Giảng Viên</h1>
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
                <label>Address</label>
                <input
                  type="text"
                  placeholder={data?.Adress}
                  name="Adress"
                  value={profile.Adress}
                  className="userUpdateInput"
                  onChange={onChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Class - Advisor</label>
                <input
                  type="text"
                  placeholder={data?.Class_Advisor}
                  name="Class_Advisor"
                  value={profile.Class_Advisor}
                  className="userUpdateInput"
                  onChange={onChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Education - Program</label>
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
                <label>Khoa</label>
                <input
                  type="text"
                  placeholder={data?.Khoa}
                  name="Khoa"
                  value={profile.Khoa}
                  className="userUpdateInput"
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
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
