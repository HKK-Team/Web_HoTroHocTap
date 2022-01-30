import "./StatisticalStudent.css";
import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PermIdentity from "@mui/icons-material/MailOutline";
import MailOutline from "@mui/icons-material/PermIdentity";
import ClassIcon from "@mui/icons-material/Class";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
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
        (state) => state.StudentsAccount.StudentsAccountApi.data[0]
    );
    const score = useSelector((state) => state.SubjectScore.SubjectScoreApi);
    // get avg score
    var avgFinalScore = 0;
    var avgNumberofCredis = 0;
    score.data.map(item =>(
        avgNumberofCredis +=item.Number_Of_Credits
    ));
    score.data.map(item =>(
        avgFinalScore += item.Final_Score*item.Number_Of_Credits
    ));
    // get avgCredis earned
    var avgCredis = 0;
    score.data.map(item => ((item.Semester !== Profile.Current_Semester) && (item.Final_Score>=5)) ? avgCredis += item.Number_Of_Credits : avgCredis += 0);
    // get % number of credis
    var PercentCredis = ((Profile.Number_Of_Credits_Earned/avgCredis)-1)*100;
    var iconCredis;
    if(PercentCredis>=0)
    {
        iconCredis = <ArrowUpward className="featuredIcon"/>
    }
    else{
        iconCredis = <ArrowDownward className="featuredIcon negative" />
    }
    // get % number of credis dept
    var PercentCredisDP = (1-(150-Profile.Number_Of_Credits_Earned)/(150-avgCredis))*100;
    var iconCredisDP;
    if(PercentCredisDP>=0)
    {
        iconCredisDP = <ArrowUpward className="featuredIcon"/>
    }
    else{
        iconCredis = <ArrowDownward className="featuredIcon negative" />
    }
    var avgScore = 0;
    score.data.map(item => (item.Semester !== Profile.Current_Semester) ? avgScore += (item.Final_Score*item.Number_Of_Credits) : avgScore+=0);
    var avgN = 0;
    score.data.map(item => (item.Semester !== Profile.Current_Semester) ? avgN += item.Number_Of_Credits : avgN += 0);
    var avgScoreSemester = avgScore/avgN;
    var avgScores = ((Math.round((avgFinalScore/avgNumberofCredis)*100)/100)/avgScoreSemester- 1)*100;
    var iconCredisSS;
    if(avgScores>=0)
    {
        iconCredisSS = <ArrowUpward className="featuredIcon"/>
    }
    else{
        iconCredisSS = <ArrowDownward className="featuredIcon negative"/>
    }
    // get 10 subjects with the highest GPA
    var arr = score.data;
    arr.map(item => item.Final_Score)
    var ar = [];
    for(let i = 0 ;i<arr.length;i++)
    {
        ar.push(arr[i])
    };
    function compare( a, b ) {
        if ( a.Final_Score > b.Final_Score ){
          return -1;
        }
        if ( a.Final_Score < b.Final_Score ){
          return 1;
        }
        return 0;
    };
    ar.sort(compare);
    return (
        <div className="homeStudent">
            <div className="featured">
                <div className="featuredItem">
                    <span className="featuredTitle">Số môn đã học</span>
                    <div className="featuredSubjectContainer">
                        <span className="featuredSubject">
                            {Profile.Number_Of_Subjects_Studied}
                        </span>
                        <span className="featuredSubjectRate">
                    </span>
                    </div>
                    <span className="featuredSub">Trên tổng số 59 môn học.</span>
                </div>

                <div className="featuredItem">
                    <span className="featuredTitle">Tổng số tín chỉ đạt được</span>
                    <div className="featuredSubjectContainer">
                        <span className="featuredSubject">{Profile.Number_Of_Credits_Earned}</span>
                        <span className="featuredSubjectRate">
                            {Math.abs(Math.round((PercentCredis*100))/100)}%{iconCredis}
                        </span>
                    </div>
                    <span className="featuredSub">So với học kì trước</span>
                </div>

                <div className="featuredItem">
                    <span className="featuredTitle">Số tín chỉ còn thiếu</span>
                    <div className="featuredSubjectContainer">
                        <span className="featuredSubject">{150-Profile.Number_Of_Credits_Earned}</span>
                        <span className="featuredSubjectRate">
                            {Math.abs(Math.round((PercentCredisDP*100))/100)}%{iconCredisDP}
                        </span>
                    </div>
                    <span className="featuredSub">So với học kì trước</span>
                </div>
                <div className="featuredItem">
                    <span className="featuredTitle">Điểm trung bình tích lũy</span>
                    <div className="featuredSubjectContainer">
                    <span className="featuredSubject">{Math.round((avgFinalScore/avgNumberofCredis)*100)/100}</span>
                    <span className="featuredSubjectRate">
                        {Math.abs(Math.round((avgScores*100))/100)}%{iconCredisSS}
                    </span>
                    </div>
                    <span className="featuredSub">So với học kì trước</span>
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
                    <span className="widgetSmTitle">Thông tin cá nhân</span>
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
                        <span className="userShowInfoTitle">Class :  {Profile?.Class}</span>
                        </div>
                    </div>
                </div>
                <div className="widgetLg">
                <h3 className="widgetLgTitle">Top 10 môn học có điểm trung bình cao nhất </h3>
                <table className="widgetLgTable">
                    <tr className="widgetLgTr">
                    <th className="widgetLgTh">Tên môn học</th>
                    <th className="widgetLgTh">Mã môn học</th>
                    <th className="widgetLgTh">Số tín chỉ</th>
                    <th className="widgetLgTh">Chương trình đào tạo</th>
                    <th className="widgetLgTh">Điểm trung bình</th>
                    </tr>
                    {ar.slice(0,10).map(item =>(
                        <tr>
                            <td>{item.Subject_Name}</td>
                            <td>{item.Subject_Id}</td>
                            <td>{item.Number_Of_Credits}</td>
                            <td>{item.Education_Program}</td>
                            <td>{item.Final_Score}</td>
                        </tr>
                    ))}
                </table>
                </div>
        </div>
        </div>
    );
}