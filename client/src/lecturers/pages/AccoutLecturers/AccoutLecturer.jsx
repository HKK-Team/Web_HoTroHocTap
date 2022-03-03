import axios from "axios";
import React, {useState} from "react";
import { useSelector } from "react-redux";
import "./AccountLecturer.css";
import {toastError,toastSuccess} from "../../../shareAll/toastMassage/toastMassage.js";
import Loading from "./../../../utils/loading/Loading";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { FaHome } from "react-icons/fa";
export default function AccountLecturer() {
  // get user
  const lecturer = useSelector(
    (state) => state.LecturersAccount.LecturersAccountApi.data[0]
  );
  const [editPassWord,setEditPassWord] = useState({
    id : lecturer?._id,
    PassWord : '',
    newPassWord : '',
    confirmPassWord : '',
  });
  // event get input
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setEditPassWord({ ...editPassWord, [name]: value });
  };
  // event submit
  const EditPassWordSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:5000/lecturer/editpassword", { ...editPassWord });
      setTimeout(() =>{
        window.location.href = "/HomeLecturer";
      },1000)
      toastSuccess("Update Password Succesfully!");
    }
    catch(err) {
      toastError(err.response.data.msg)
    }
  };
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
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Đổi Mật Khẩu</h1>
      </div>
      <span><h3><FaHome/> / PassWord</h3></span>
      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Chỉnh sửa</span>
          <form className="userUpdateForm" onSubmit ={EditPassWordSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Mật khẩu cũ</label>
                <input 
                  type="password" 
                  className="userUpdateInput"
                  name = "PassWord"
                  value = {editPassWord.PassWord}
                  placeholder = "abc123....."
                  onChange = {onChangeInput}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Mật khẩu mới</label>
                <input 
                  type="password" 
                  className="userUpdateInput" 
                  name = "newPassWord"
                  value = {editPassWord.newPassWord}
                  placeholder = "abc123....."
                  onChange = {onChangeInput}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Nhập lại mật khẩu</label>
                <input 
                  type="password" 
                  className="userUpdateInput" 
                  name = "confirmPassWord"
                  value = {editPassWord.confirmPassWord}
                  placeholder = "abc123....."
                  onChange = {onChangeInput}
                  required
                />
              </div>
              <div className="userUpdateItem" style={{paddingTop:10 }}>
              <button className = "btn-Confirm"><VpnKeyIcon/> Xác nhận</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
