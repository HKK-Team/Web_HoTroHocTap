import axios from "axios";
import React, {useState} from "react";
import { useSelector } from "react-redux";
import "./AccountLecturer.css";
import {toastError,toastSuccess} from "../../../shareAll/toastMassage/toastMassage.js";
import Loading from "./../../../utils/loading/Loading";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { FaHome } from "react-icons/fa";
import TextField from "@mui/material/TextField";
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
                <label>Mật khẩu cũ.</label>
                <TextField 
                  id="outlined-basic" 
                  label="Mật khẩu cũ" 
                  variant="outlined" 
                  name="PassWord"
                  value={editPassWord.PassWord}
                  type="password"
                  size="small"
                  style={{marginRight: "10px",width: 250,marginTop: "5px"}}
                  required
                  onChange={onChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Mật khẩu mới.</label>
                <TextField 
                  id="outlined-basic" 
                  label="Mật khẩu mới" 
                  variant="outlined" 
                  name="newPassWord"
                  value={editPassWord.newPassWord}
                  type="password"
                  size="small"
                  style={{marginRight: "10px",width: 250,marginTop: "5px"}}
                  required
                  onChange={onChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Nhập lại mật khẩu.</label>
                <TextField 
                  id="outlined-basic" 
                  label="Nhập lại mât khẩu" 
                  variant="outlined" 
                  name="confirmPassWord"
                  value={editPassWord.confirmPassWord}
                  type="password"
                  size="small"
                  style={{marginRight: "10px",width: 250,marginTop: "5px"}}
                  required
                  onChange={onChangeInput}
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
