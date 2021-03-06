import React from "react";
import "./../../../lecturers/components/Topbar/Topbar.css";
import Settings from "@mui/icons-material/Settings";
import Language from "@mui/icons-material/Language";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "./../../../images/tdmu-elearning-banner.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import {toastSuccess} from "../../../shareAll/toastMassage/toastMassage.js";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function TopBarLecturers() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    window.sessionStorage.removeItem("StudentLogin");
    window.sessionStorage.removeItem("StudentEmail");
  };
  const user = () =>{
    toastSuccess("Hello")
  }
  return (
    <div className="topBarLecturers">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to = "/HomeStudent">
            <img src={logo} alt="" className="logo" />
            {/* <span className="logo">HKK team</span> */}
          </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone style={{ color: "#000000" }} />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language style={{ color: "#000000" }} />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings onClick={handleClick} style={{ color: "#000000" }} />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <AccountCircleIcon/>
                <Link
                  to="/HomeStudent/profileStudent"
                  style={{ color: "black" }}
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem>
                <LogoutIcon/>
                <a href="/login" onClick={logout}>
                  Logout
                </a>
              </MenuItem>
            </Menu>
          </div>
          <div className="topbarIconContainer">
            <img
              src="https://as2.ftcdn.net/v2/jpg/02/50/31/95/500_F_250319577_BuOE8gd49LUD41DFH6eY3mahs0Q6n8Jp.jpg"
              alt=""
              className="topAvatar"
              onClick={user}
            />
          </div>
          <div className="topbarIconContainer">
            <a href="/login" onClick={logout}>
              <LogoutIcon style={{ color: "#000000" }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
