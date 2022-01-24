import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import DynamicFeed from "@mui/icons-material/DynamicFeed";
import MailOutline from "@mui/icons-material/MailOutline";
import "./../../../lecturers/components/Sidebar/Sidebar.css";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import PreviewIcon from '@mui/icons-material/Preview';
import { NavLink } from "react-router-dom";
import { Tooltip } from "@mui/material";
export default function SideBarLecturers() {
  return (
    <div className="sidebarAdmin">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Bảng Điều Khiển</h3>
          <ul className="sidebarList">
            <NavLink to="/HomeStudent/inputScore" className="link">
              <Tooltip title="Nhập Điểm">
                <li className="sidebarListItem">
                  <DriveFileRenameOutlineIcon
                    className="sidebarIcon"
                    style={{ color: "#000000" }}
                  />
                  {/* Lịch coi thi */}
                </li>
                </Tooltip>
            </NavLink>
            <NavLink to="/HomeStudent/viewScore" className="link">
            <Tooltip title="Xem Điểm">
                <li className="sidebarListItem">
                  <LibraryBooksIcon
                    className="sidebarIcon"
                    style={{ color: "#000000" }}
                  />
                  {/* Đăng ký tiểu luận */}
                </li>
              </Tooltip>
            </NavLink>
            <NavLink to="/HomeStudent/SuggestSubject" className="link">
            <Tooltip title="Xem gợi ý môn học">
                <li className="sidebarListItem">
                  <FeaturedPlayListIcon
                    className="sidebarIcon"
                    style={{ color: "#000000" }}
                  />
                  {/* Xem gọi ý môn học*/}
                </li>
              </Tooltip>
            </NavLink>
            <NavLink to="/HomeStudent/SuggestSubjectSemester" className="link">
            <Tooltip title="Gợi ý môn học cho học kỳ tới">
                <li className="sidebarListItem">
                  <PreviewIcon
                    className="sidebarIcon"
                    style={{ color: "#000000" }}
                  />
                  {/* Xem tín chỉ */}
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
          <Tooltip title="Message">
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
