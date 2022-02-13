import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./../../../src/images/tdmu-elearning-banner.png";
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
              Mã sinh viên hoặc tên lớp
            </InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              onChange=""
              value=""
            />
            <Button
              variant="contained"
              size="small"
              style={{ marginTop: 10 ,width : 260 }}
              onClick=""
            >
              Tìm
            </Button>
            <FormHelperText id="my-helper-text">
              Nhập mã sinh viên nếu bạn là sinh viên.
            </FormHelperText>
            <FormHelperText id="my-helper-text">
              Nhập tên lớp của bạn nếu là sinh viên.
            </FormHelperText>
          </FormControl>
        </div>
      </div>
    </Fragment>
  );
}
