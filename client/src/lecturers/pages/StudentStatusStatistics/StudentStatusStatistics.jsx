import "./StudentStatusStatistics.css";
import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PermIdentity from "@mui/icons-material/MailOutline";
import MailOutline from "@mui/icons-material/PermIdentity";
import ClassIcon from "@mui/icons-material/Class";
import Loading from "./../../../utils/loading/Loading";
import PeopleIcon from '@mui/icons-material/People';
import { useSelector} from "react-redux";
import Chart from "../../components/Chart/Chart";
export default function Home() {
    const Profile = useSelector(
        (state) => state.LecturersAccount.LecturersAccountApi.data[0]
    );
    const student = useSelector((state) =>
    state.StudentsAccount.StudentsAccountApi.data.filter(
      (item) =>
        item.Class === Profile?.Class_Advisor
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
    function compareSubject(a,b){
        if(a.FullName > b.FullName)
        {
            return -1;
        }
        if(a.FullName < b.FullName)
        {
            return 1;
        }
        return 0;
    }
    student.sort(compare);
    // Get the number of students who owe the subject. 
    var arrChart = [];
    arrChart.push({_id : "Gốc",SinhVien : 0, name : "Gốc"})
    // get subject score with Class
    const subject = useSelector(state => state.SubjectScoreClass.SubjectScoreClassApi.data.filter(
        item =>item.Class===Profile?.Class_Advisor)
    );
    subject.sort(compareSubject);
    // Number student Subject Debt HK1
    const SubjectDebtHK1 = subject.filter(item => item.Final_Score <5 && item.Semester === "HK1");
    var NumStudentDebt = 0;
    for(let i = 0;i<SubjectDebtHK1.length;i++)
    {
        if(SubjectDebtHK1[i]?.FullName !== SubjectDebtHK1[i+1]?.FullName){
            NumStudentDebt++;
        }
    }
    arrChart.push({_id : "HK1",SinhVien : NumStudentDebt, name : "HK1"});
    // Number student Subject Debt HK2
    const SubjectDebtHK2 = subject.filter(item => item.Final_Score <5 && item.Semester === "HK2");
    var NumStudentDebtHK2 = 0;
    for(let i = 0;i<SubjectDebtHK2.length;i++)
    {
        if(SubjectDebtHK2[i]?.FullName !== SubjectDebtHK2[i+1]?.FullName){
            NumStudentDebtHK2++;
        }
    }
    arrChart.push({_id : "HK2",SinhVien : NumStudentDebtHK2, name : "HK2"});
    // Number student Subject Debt HK3
    const SubjectDebtHK3 = subject.filter(item => item.Final_Score <5 && item.Semester === "HK3");
    var NumStudentDebtHK3 = 0;
    for(let i = 0;i<SubjectDebtHK3.length;i++)
    {
        if(SubjectDebtHK3[i]?.FullName !== SubjectDebtHK3[i+1]?.FullName){
            NumStudentDebtHK3++;
        }
    }
    arrChart.push({_id : "HK3",SinhVien : NumStudentDebtHK3, name : "HK3"});
    // Number student Subject Debt HK4
    const SubjectDebtHK4 = subject.filter(item => item.Final_Score <5 && item.Semester === "HK4");
    var NumStudentDebtHK4 = 0;
    for(let i = 0;i<SubjectDebtHK4.length;i++)
    {
        if(SubjectDebtHK4[i]?.FullName !== SubjectDebtHK4[i+1]?.FullName){
            NumStudentDebtHK3++;
        }
    }
    arrChart.push({_id : "HK4",SinhVien : NumStudentDebtHK4, name : "HK4"});
    // Number student Subject Debt HK5
    const SubjectDebtHK5 = subject.filter(item => item.Final_Score <5 && item.Semester === "HK5");
    var NumStudentDebtHK5 = 0;
    for(let i = 0;i<SubjectDebtHK5.length;i++)
    {
        if(SubjectDebtHK5[i]?.FullName !== SubjectDebtHK5[i+1]?.FullName){
            NumStudentDebtHK5++;
        }
    }
    arrChart.push({_id : "HK5",SinhVien : NumStudentDebtHK5, name : "HK5"});
    // Number student Subject Debt HK6
    const SubjectDebtHK6 = subject.filter(item => item.Final_Score <5 && item.Semester === "HK6");
    var NumStudentDebtHK6 = 0;
    for(let i = 0;i<SubjectDebtHK6.length;i++)
    {
        if(SubjectDebtHK6[i]?.FullName !== SubjectDebtHK6[i+1]?.FullName){
            NumStudentDebtHK6++;
        }
    }
    arrChart.push({_id : "HK6",SinhVien : NumStudentDebtHK6, name : "HK6"});
    // Number student Subject Debt HK7
    const SubjectDebtHK7 = subject.filter(item => item.Final_Score <5 && item.Semester === "HK7");
    var NumStudentDebtHK7 = 0;
    for(let i = 0;i<SubjectDebtHK7.length;i++)
    {
        if(SubjectDebtHK7[i]?.FullName !== SubjectDebtHK7[i+1]?.FullName){
            NumStudentDebtHK7++;
        }
    }
    arrChart.push({_id : "HK7",SinhVien : NumStudentDebtHK7, name : "HK7"});
    // Number student Subject Debt HK8
    const SubjectDebtHK8 = subject.filter(item => item.Final_Score <5 && item.Semester === "HK8");
    var NumStudentDebtHK8 = 0;
    for(let i = 0;i<SubjectDebtHK8.length;i++)
    {
        if(SubjectDebtHK8[i]?.FullName !== SubjectDebtHK8[i+1]?.FullName){
            NumStudentDebtHK8++;
        }
    }
    arrChart.push({_id : "HK8",SinhVien : NumStudentDebtHK8, name : "HK8"});
    // Number student Subject Debt HK9
    const SubjectDebtHK9 = subject.filter(item => item.Final_Score <5 && item.Semester === "HK9");
    var NumStudentDebtHK9 = 0;
    for(let i = 0;i<SubjectDebtHK9.length;i++)
    {
        if(SubjectDebtHK9[i]?.FullName !== SubjectDebtHK9[i+1]?.FullName){
            NumStudentDebtHK9++;
        }
    }
    arrChart.push({_id : "HK9",SinhVien : NumStudentDebtHK9, name : "HK9"});
    // Number student Subject Debt HK10
    const SubjectDebtHK10 = subject.filter(item => item.Final_Score <5 && item.Semester === "HK10");
    var NumStudentDebtHK10 = 0;
    for(let i = 0;i<SubjectDebtHK10.length;i++)
    {
        if(SubjectDebtHK10[i]?.FullName !== SubjectDebtHK10[i+1]?.FullName){
            NumStudentDebtHK10++;
        }
    }
    arrChart.push({_id : "HK10",SinhVien : NumStudentDebtHK10, name : "HK10"});
    if(!Profile)
    {
        return (
            <div className="loading">
              {" "}
              <Loading />
            </div>
          );
    }
    if(!student)
    {
        return (
            <div className="loading">
              {" "}
              <Loading />
            </div>
        );
    }
    return (
        <div className="homeStudent">
            <div className="featured">
                <div className="featuredItem">
                    <span className="featuredTitle">Số sinh viên còn đi học</span>
                    <div className="featuredSubjectContainer">
                        <span className="featuredSubject">
                            {student.length} <PeopleIcon/>
                        </span>
                        <span className="featuredSubjectRate">
                    </span>
                    </div>
                    <span className="featuredSub">Trên tổng số 60 sinh viên.</span>
                </div>

                <div className="featuredItem">
                    <span className="featuredTitle">Số sinh viên đã nghỉ học</span>
                    <div className="featuredSubjectContainer">
                        <span className="featuredSubject">{60-student.length} <PeopleIcon/></span>
                        <span className="featuredSubjectRate">
                        </span>
                    </div>
                    <span className="featuredSub">Trên tổng số 60 sinh viên.</span>
                </div>

                <div className="featuredItem">
                    <span className="featuredTitle">Số sinh viên nợ môn</span>
                    <div className="featuredSubjectContainer">
                        <span className="featuredSubject">{SSD} <PeopleIcon/></span>
                        <span className="featuredSubjectRate">
                            
                        </span>
                    </div>
                    <span className="featuredSub">Trên tổng số 60 sinh viên.</span>
                </div>
                <div className="featuredItem">
                    <span className="featuredTitle">Số sinh viên đã hoàn thành</span>
                    <div className="featuredSubjectContainer">
                    <span className="featuredSubject">{SSE} <PeopleIcon/></span>
                    <span className="featuredSubjectRate">
                        
                    </span>
                    </div>
                    <span className="featuredSub">Trên tổng số 60 sinh viên.</span>
                </div>
            </div>
            <Chart
                data={arrChart}
                title="Biểu đồ thống kê số lượng sinh viên nợ môn qua các học kỳ."
                grid
                dataKey="SinhVien"
                color='#5550bd'
            />
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