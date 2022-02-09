import "./StudentStatusStatistics.css";
import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PermIdentity from "@mui/icons-material/MailOutline";
import MailOutline from "@mui/icons-material/PermIdentity";
import ClassIcon from "@mui/icons-material/Class";
import Loading from "./../../../utils/loading/Loading";
import {
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useSelector} from "react-redux";
export default function Home({data, dataKey, grid ,color}) {
    const Profile = useSelector(
        (state) => state.LecturersAccount.LecturersAccountApi.data[0]
    );
    const student = useSelector((state) =>
    state.StudentsAccount.StudentsAccountApi.data.filter(
      (item) =>
        item.Class === Profile.Class_Advisor
    )
    );
    // get student subject debt
    var SSD = 0;
    student.map(item => item.Number_Of_Subjects_Debt > 0 ? SSD ++ : SSD += 0);
    var SSE = 0;
    student.map(item => item.Number_Of_Subjects_Debt === 0 ? SSE ++ : SSE += 0);
    function compare( a, b ) {
        if ( a.GPA > b.GPA ){
          return -1;
        }
        if ( a.GPA < b.GPA ){
          return 1;
        }
        return 0;
    };
    student.sort(compare);
    if(!Profile)
    {
        return <Loading/>
    }
    if(!student)
    {
        return <Loading/>
    }
    return (
        <div className="homeStudent">
            <div className="featured">
                <div className="featuredItem">
                    <span className="featuredTitle">Số sinh viên còn đi học</span>
                    <div className="featuredSubjectContainer">
                        <span className="featuredSubject">
                            {student.length}
                        </span>
                        <span className="featuredSubjectRate">
                    </span>
                    </div>
                    <span className="featuredSub">Trên tổng số 60 sinh viên.</span>
                </div>

                <div className="featuredItem">
                    <span className="featuredTitle">Số sinh viên đã nghỉ học</span>
                    <div className="featuredSubjectContainer">
                        <span className="featuredSubject">{60-student.length}</span>
                        <span className="featuredSubjectRate">
                        </span>
                    </div>
                    <span className="featuredSub">Trên tổng số 60 sinh viên.</span>
                </div>

                <div className="featuredItem">
                    <span className="featuredTitle">Số sinh viên nợ môn</span>
                    <div className="featuredSubjectContainer">
                        <span className="featuredSubject">{SSD}</span>
                        <span className="featuredSubjectRate">
                            
                        </span>
                    </div>
                    <span className="featuredSub">Trên tổng số 60 sinh viên.</span>
                </div>
                <div className="featuredItem">
                    <span className="featuredTitle">Số sinh viên đã hoàn thành</span>
                    <div className="featuredSubjectContainer">
                    <span className="featuredSubject">{SSE}</span>
                    <span className="featuredSubjectRate">
                        
                    </span>
                    </div>
                    <span className="featuredSub">Trên tổng số 60 sinh viên.</span>
                </div>
            </div>
            <div className="chart">
                <h3 className="chartTitle">Biểu đồ thống kê điểm trung bình qua các học kỳ</h3>
                <ResponsiveContainer width="100%" aspect={4 / 1}>
                    <LineChart data={data}>
                    <XAxis dataKey="name" stroke={color} />
                    <Line type="monotone" dataKey={dataKey} stroke={color} />
                    <Tooltip />
                    {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="homeWidgets">
                <div className="widgetSm">
                    <span className="widgetSmTitle">Thông tin giảng viên</span>
                    <div className="userShowTop">
                        <img
                        src={Profile.Image}
                        alt=""
                        className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                        <span className="userShowUsername">Họ Tên : {Profile?.FullName}</span>
                        <span className="userShowUsername">Khoa : {Profile?.Khoa}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Chi tiết liên hệ</span>

                        <div className="userShowInfo">
                        <PermIdentity
                            className="userShowIcon"
                            style={{ color: "#000000" }}
                        />
                        <span className="userShowInfoTitle">Email : {Profile?.Email}</span>
                        </div>
                        <div className="userShowInfo">
                        <LocalPhoneIcon
                            className="userShowIcon"
                            style={{ color: "#000000" }}
                        />
                        <span className="userShowInfoTitle">Phone : {Profile?.Phone}</span>
                        </div>
                        <div className="userShowInfo">
                        <MailOutline
                            className="userShowIcon"
                            style={{ color: "#000000" }}
                        />
                        <span className="userShowInfoTitle">CTĐT :  {Profile?.Education_Program}</span>
                        </div>
                        <div className="userShowInfo">
                        <ClassIcon
                            className="userShowIcon"
                            style={{ color: "#000000" }}
                        />
                        <span className="userShowInfoTitle">Class :  {Profile?.Class_Advisor}</span>
                        </div>
                    </div>
                </div>
                <div className="widgetLg">
                <h3 className="widgetLgTitle">Top 10 sinh viên có điểm trung bình tích lũy cao nhất </h3>
                <table className="widgetLgTable">
                    <tr className="widgetLgTr">
                    <th className="widgetLgTh">Tên sinh viên</th>
                    <th className="widgetLgTh">Mã sinh viên</th>
                    <th className="widgetLgTh">Email</th>
                    <th className="widgetLgTh">Số điện thoại</th>
                    <th className="widgetLgTh">Điểm trung bình</th>
                    </tr>
                    {student.slice(0,5).map(item =>(
                        <tr>
                            <td>{item.FullName}</td>
                            <td>{item.Student_Id}</td>
                            <td>{item.Email}</td>
                            <td>{item.Phone}</td>
                            <td>{item.GPA}</td>
                        </tr>
                    ))}
                </table>
                </div>
        </div>
        </div>
    );
}