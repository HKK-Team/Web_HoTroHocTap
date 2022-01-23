import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PermIdentity from "@mui/icons-material/MailOutline";
import MailOutline from "@mui/icons-material/PermIdentity";
import ClassIcon from '@mui/icons-material/Class';
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import "./StudentStatusStatistics.css";


export default function StudentStatusStatistic() {
    // get lecturer account
    const lecturer = useSelector(
        (state) =>  state.LecturersAccount.LecturersAccountApi.data[0]
    );
    const data = useSelector((state) =>
    state.StudentsAccount.StudentsAccountApi.data.filter(
      (item) =>
        item.Class === lecturer.Class_Advisor
    )
    );
    var Number_Of_Credits_Earned = 0;
    var Outstanding_Number_Of_Credits = 0;
    data.map(item =>(
      item.Outstanding_Number_Of_Credits > 0 ? Outstanding_Number_Of_Credits+=1 : Number_Of_Credits_Earned +=1 
    ))
    return (
    <div className="productList">
        <div className="header-table">
            <h1 className="header-table-title">Thống Kê Danh Sách Sinh Viên Của Lớp {lecturer.Class_Advisor}</h1>
        </div>
        <div className="user">
            <div className="userContainer">
                <div className="userShow">
                <div className="userShowTop">
                    <img
                    src={lecturer.Image}
                    alt=""
                    className="userShowImg"
                    />
                    <div className="userShowTopTitle">
                    <span className="userShowUsername">Họ Tên : {lecturer?.FullName}</span>
                    <span className="userShowUserTitle">Khoa : {lecturer?.Khoa}</span>
                    </div>
                </div>
                <div className="userShowBottom">
                    <span className="userShowTitle">Chi tiết liên hệ</span>

                    <div className="userShowInfo">
                    <PermIdentity
                        className="userShowIcon"
                        style={{ color: "#000000" }}
                    />
                    <span className="userShowInfoTitle">Email : {lecturer?.Email}</span>
                    </div>
                    <div className="userShowInfo">
                    <LocalPhoneIcon
                        className="userShowIcon"
                        style={{ color: "#000000" }}
                    />
                    <span className="userShowInfoTitle">Phone : {lecturer?.Phone}</span>
                    </div>
                    <div className="userShowInfo">
                    <MailOutline
                        className="userShowIcon"
                        style={{ color: "#000000" }}
                    />
                    <span className="userShowInfoTitle">
                        CTĐT : {lecturer?.Education_Program}
                    </span>
                    </div>
                    <div className="userShowInfo">
                    <ClassIcon
                        className="userShowIcon"
                        style={{ color: "#000000" }}
                    />
                    <span className="userShowInfoTitle">
                    Class Advisor : {lecturer?.Class_Advisor}
                    </span>
                    </div>
                </div>
                </div>
                <div className="StudentStatus">
                <span className="StudentStatusTitle">Thống kê tình trạng sinh viên của lớp {lecturer.Class_Advisor}</span>
                <form className="StudentStatusForm">
                    <div className="StudentStatusLeft">
                    <table className="table">
                        <tbody>
                            <tr className="Student">
                                <td>Tổng số sinh viên của lớp : </td>
                                <td className="value">60</td>
                            </tr>
                            <tr className="Student">
                                <td>Số lượng sinh viên còn đang học : </td>
                                <td className="value">{data.length}</td>
                            </tr>
                            <tr className="Student">
                                <td>Số lượng sinh viên đã nghỉ học : </td>
                                <td className="value">12</td>
                            </tr>
                            <tr className="Student">
                                <td>Số lượng sinh viên đang nợ môn : </td>
                                <td className="value">{Outstanding_Number_Of_Credits}</td>
                            </tr>
                            <tr className="Student">
                                <td>Số lượng sinh viên đã hoàn thành tất cả các môn : </td>
                                <td className="value">{Number_Of_Credits_Earned}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
  );
}