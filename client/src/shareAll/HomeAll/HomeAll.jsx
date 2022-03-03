import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React, { Fragment, useEffect,useState } from "react";
import { Link } from "react-router-dom";
import logo from "./../../../src/images/tdmu-elearning-banner.png";
import {toastError}from "../toastMassage/toastMassage.js";
import "./HomeAll.css";
export default function HomeAll() {

  useEffect(() => {
    const topbarSecretary = document.querySelector(".topbarSecretary");
    const containerAdminSecretarys = document.querySelector(
      ".containerAdmin-Secretarys"
    );
    const topBarLecturers = document.querySelector(".topBarLecturers");
    const containerAdminLecturers = document.querySelector(
      ".containerAdmin-Lecturers"
    );
    topbarSecretary.style.display = "none";
    containerAdminSecretarys.style.display = "none";
    topBarLecturers.style.display = "none";
    containerAdminLecturers.style.display = "none";
    document.body.style.overflowY = "auto";
  }, []);
  const [keyWord,setkeyWord] = useState({
    id : ''
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setkeyWord({ ...keyWord, [name]: value });
  };
  const check = () =>{
    if(keyWord.id === "")
    {
      toastError("Bạn chưa nhập vào nội dung tìm kiếm. Vui lòng nhập thông tin vào form.");
    }
  }
  return (
    <Fragment>
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <img src={logo} alt="" className="logo" />
          </div>
          <div className="topRight">
            <Stack spacing={1} direction="row">
              <Button variant="contained" size="small">
                <Link to="/login" style={{ color: "white" }}>
                  {" "}
                  Đăng Nhập
                </Link>
              </Button>
            </Stack>
          </div>
        </div>
      </div>
      <section className="home"></section>
      <div className="information-lookup-box">
        <h2 className="information-lookup-box-title">
          Chào mừng bạn đã đến với hệ thống Hỗ trợ học tập dành cho Sinh Viên 
          <p>của Đại Học Thủ Dầu Một.</p>
        </h2>
        <h2 className = "Title-score">Hệ Thống Tra cứu Điểm Thi.</h2>
        <div className="information-lookup-box-form">
          <FormControl>
            <InputLabel htmlFor="my-input">
              Nhập mã sinh viên hoặc Email...
            </InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              onChange={onChangeInput}
              name = "id"
              value={keyWord.id}
              required
            />
            <Link to = {keyWord.id === "" ? "/" :"/SearchScore/" + keyWord.id}>
              <Button
                variant="contained"
                size="small"
                style={{ marginTop: 10 ,width : 260 }}
                onClick = {check}
              >
                Tìm
              </Button>
            </Link>
            <FormHelperText id="my-helper-text">
              Nhập mã sinh viên nếu bạn là sinh viên.
            </FormHelperText>
            <FormHelperText id="my-helper-text">
              Nhập Email của bạn nếu bạn là sinh viên.
            </FormHelperText>
          </FormControl>
        </div>
      </div>
    </Fragment>
  );
}
