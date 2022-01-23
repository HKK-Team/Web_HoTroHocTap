import "./Sidebar.css";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import DynamicFeed from "@mui/icons-material/DynamicFeed";
import MailOutline from "@mui/icons-material/MailOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ClassIcon from '@mui/icons-material/Class';
import { NavLink } from "react-router-dom";
import { Tooltip } from "@mui/material";

export default function Sidebar() {
  return (
    <div className="sidebarAdmin">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản Lý</h3>
          <ul className="sidebarList">
            <NavLink to="/HomeLecturer/ViewListStudent" className="link">
              <Tooltip title="Xem Danh Sách Lớp">
                <li className="sidebarListItem">
                  <ClassIcon
                    className="sidebarIcon"
                    style={{ color: "#000000" }}
                  />
                  {/* Xem Danh Sách Lớp*/}
                </li>
              </Tooltip>
            </NavLink>
            <NavLink to="/HomeLecturer/ViewStatusStudent" className="link">
              <Tooltip title="Xem Tình Trạng Sinh Viên">
                <li className="sidebarListItem">
                  <MailOutline
                    className="sidebarIcon"
                    style={{ color: "#000000" }}
                  />
                  {/* Xem Tình Trạng Sinh Viên */}
                </li>
              </Tooltip>
            </NavLink>
            <NavLink to="/HomeLecturer/StudentStatusStatistic" className="link">
              <Tooltip title="Thống Kê Tình Trạng Sinh Viên">
                <li className="sidebarListItem">
                  <EventNoteIcon
                    className="sidebarIcon"
                    style={{ color: "#000000" }}
                  />
                  {/* Lịch thi */}
                </li>
              </Tooltip>
            </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Thông Báo</h3>
          <ul className="sidebarList">
          <Tooltip title="Email">
            <li className="sidebarListItem">
              <MailOutline
                className="sidebarIcon"
                style={{ color: "#000000" }}
              />
              {/* Mail */}
            </li>
          </Tooltip>
          <Tooltip title="Feedback">
            <li className="sidebarListItem">
              <DynamicFeed
                className="sidebarIcon"
                style={{ color: "#000000" }}
              />
              {/* Feedback */}
            </li>
          </Tooltip>
          <Tooltip title="Messages">
            <li className="sidebarListItem">
              <ChatBubbleOutline
                className="sidebarIcon"
                style={{ color: "#000000" }}
              />
              {/* Messages */}
            </li>
          </Tooltip>
          </ul>
        </div>
      </div>
    </div>
  );
}
