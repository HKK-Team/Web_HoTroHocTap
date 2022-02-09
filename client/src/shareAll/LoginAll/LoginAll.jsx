import React, { Fragment, useState } from "react";
import logo from "./../../../src/images/tdmu-elearning-banner.png";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import "./LoginAll.css";
import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import {toastError,toastSuccess}from "../toastMassage/toastMassage.js";
// import { GoogleLogout } from 'react-google-login';
export default function LoginAll() {
  // Student login
  const [student, setstudent] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    ID: "",
    Student_Id : "",
    image: "",
    accessToken: "",
    token_ID: "",
    Api: "",
  });
  // lecturer login
  const [lecturer, setlecturer] = useState({
    email: "",
    password: "",
  });
  const responseGoogle = (response) => {
    setstudent({
      email: response.profileObj.email,
      fullName: response.profileObj.name,
      firstName: response.profileObj.familyName,
      lastName: response.profileObj.givenName,
      ID: response.profileObj.googleId,
      Student_Id: response.profileObj.email.slice(0,13),
      image: response.profileObj.imageUrl,
      accessToken: response.accessToken,
      token_ID: response.tokenObj.id_token,
      Api: "Google",
    });
  };
  // định dạng email
  var reg = /^([0-9]{13})+@student.tdmu.edu.vn$/i;
  const CreateUser = async (e) => {
    e.preventDefault();
    if(reg.test(student.email)===true)
    {
      await axios.post("http://localhost:5000/student/login",{...student});
      sessionStorage.setItem("StudentLogin", true);
      sessionStorage.setItem("StudentEmail",student.email);
      setTimeout(() => {
        window.location.href = "/HomeStudent";
      },1000)
      toastSuccess("Bạn đã đăng nhập Google thành công!");
    } else {
      toastError(
        "Email của bạn không tồn tại trong cơ sở dữ liệu. Xin vui lòng đăng nhập lại!"
      );
    }
  };
  const check = () => {
    if (lecturer.email !== "") {
      return (
        <div className="Logged">
          <div
            variant="contained"
            style={{ display: "none" }}
            className="btn-login-email"
          >
            <div className="well">
              <span>Wellcom! Please Submit Login.</span>
            </div>
            <div className="email">
              <span>{student.email}</span>
            </div>
            <form onSubmit={CreateUser}>
              <button className="btn">Đăng Nhập</button>
            </form>
          </div>
        </div>
      );
    }
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setlecturer({ ...lecturer, [name]: value });
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:5000/lecturer/login", { ...lecturer });
      sessionStorage.setItem("LecturerLogin", true);
      sessionStorage.setItem("LecturerEmail", lecturer.email);
      setTimeout(() =>{
        window.location.href = "/HomeLecturer";
      },1000);
      toastSuccess("Bạn đã đăng nhập thành công!");
    } catch (err) {
      toastError("Sai tên tài khoản hoặc mật khẩu. Xin vui lòng đăng nhập lại!");
    }
  };
  return (
    <Fragment>
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <Link to="/">
              <img src={logo} alt="" className="logo" />
            </Link>
          </div>
          <div className="topRight">
            <Stack spacing={1} direction="row">
              <Button variant="contained" size="small">
                <Link to="/" style={{ color: "white" }}>
                  Trang chủ
                </Link>
              </Button>
            </Stack>
          </div>
        </div>
      </div>
      <section className="home"></section>
      <div className="information-lookup-box">
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            style={{ width: "50%" }}
            onClick={(e) => {
              e.preventDefault();
              let a = document.querySelector(".btn-login-email");
              let b = document.querySelector(".form-login-secretary");
              a.style.display = "block";
              b.style.display = "none";
            }}
          >
            Sinh Viên
          </Button>
          <Button
            variant="contained"
            style={{ width: "50%" }}
            onClick={(e) => {
              e.preventDefault();
              let a = document.querySelector(".btn-login-email");
              let b = document.querySelector(".form-login-secretary");
              b.style.display = "block";
              a.style.display = "none";
            }}
          >
            Giảng Viên
          </Button>
        </Stack>

        <div className="information-lookup-box-login">
          {student.email === "" ? (
            <div className="Log-In">
              <div
                variant="contained"
                style={{ display: "none" }}
                className="btn-login-email"
              >
                <GoogleLogin
                  clientId="843229411433-dce21ks6062giislln1ndmer3voocdfp.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                  render={(renderProps) => (
                    <Button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <EmailIcon style={{ paddingRight: 10 }} className = "icon-email"/>
                      <span> Đăng nhập bằng Email</span>
                    </Button>
                  )}
                />
              </div>
            </div>
          ) : (
            check()
          )}
          <form className="form-login-secretary" onSubmit={loginSubmit}>
            <div className="information-lookup-box-secretary">
              <h2 className = "Title">Giảng Viên</h2>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel htmlFor="my-input">Email</InputLabel>
                  <Input
                    id="my-input"
                    aria-describedby="my-helper-text"
                    type="text"
                    name="email"
                    value={lecturer.email}
                    onChange={onChangeInput}
                    required
                  />
                  <FormHelperText id="my-helper-text">
                    Hãy nhập email
                  </FormHelperText>
                </FormControl>
                <FormControl style={{ marginTop: 20, width: "100%" }}>
                  <InputLabel htmlFor="my-input">PassWord</InputLabel>
                  <Input
                    id="my-input"
                    aria-describedby="my-helper-text"
                    type="password"
                    name="password"
                    value={lecturer.password}
                    onChange={onChangeInput}
                    required
                  />
                  <FormHelperText id="my-helper-text">
                    Hãy nhập mật khẩu
                  </FormHelperText>
                </FormControl>
              <button
                className="Login-Secretary"
                variant="contained"
                size="small"
                style={{ marginTop: 20, display: "block", width: "100%" }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
