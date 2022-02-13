import "./StatisticalStudent.css";
import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PermIdentity from "@mui/icons-material/MailOutline";
import MailOutline from "@mui/icons-material/PermIdentity";
import ClassIcon from "@mui/icons-material/Class";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import Loading from "./../../../utils/loading/Loading";
import { useSelector} from "react-redux";
import Chart from "../../components/Chart/Chart";
import SubjectIcon from '@mui/icons-material/Subject';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
export default function Home() {
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
    score.data.map(item => ((item.Semester !== Profile?.Current_Semester) && (item.Final_Score>=5)) ? avgCredis += item.Number_Of_Credits : avgCredis += 0);
    // get % number of credis
    var PercentCredis = ((Profile?.Number_Of_Credits_Earned/avgCredis)-1)*100;
    var iconCredis;
    if(PercentCredis>=0)
    {
        iconCredis = <ArrowUpward className="featuredIcon"/>
    }
    else{
        iconCredis = <ArrowDownward className="featuredIcon negative" />
    }
    // get % number of credis dept
    var PercentCredisDP = (1-(150-Profile?.Number_Of_Credits_Earned)/(150-avgCredis))*100;
    var iconCredisDP;
    if(PercentCredisDP>=0)
    {
        iconCredisDP = <ArrowUpward className="featuredIcon"/>
    }
    else{
        iconCredis = <ArrowDownward className="featuredIcon negative" />
    }
    var avgScore = 0;
    score.data.map(item => (item.Semester !== Profile?.Current_Semester) ? avgScore += (item.Final_Score*item.Number_Of_Credits) : avgScore+=0);
    var avgN = 0;
    score.data.map(item => (item.Semester !== Profile?.Current_Semester) ? avgN += item.Number_Of_Credits : avgN += 0);
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
    // fix loading
    if(!Profile)
    {
        return (
            <div className="loading">
              {" "}
              <Loading />
            </div>
          );
    }
    // chart by avg score
    var arrChart = [];
    arrChart.push({_id : "Gốc",avgScore : 0.0, name : "Gốc"})
    // get avg score HK1
    var avgHK1 = 0;
    var avggHK1 = 0;
    score.data.map(item => item.Semester === "HK1" ? avgHK1+=item.Number_Of_Credits * item.Final_Score : avgHK1 +=0);
    score.data.map(item => item.Semester === "HK1" ? avggHK1+=item.Number_Of_Credits : avggHK1 +=0);
    var avgScoreHK1 = Math.round(avgHK1/avggHK1 * 100)/100;
    arrChart.push({_id : "HK1",avgScore : avgScoreHK1>=0 ? avgScoreHK1 : 0.0, name : "HK1"});
    // get avg score HK2
    var avgHK2 = 0;
    var avggHK2 = 0;
    score.data.map(item => item.Semester === "HK2" ? avgHK2+=item.Number_Of_Credits * item.Final_Score : avgHK2 +=0);
    score.data.map(item => item.Semester === "HK2" ? avggHK2+=item.Number_Of_Credits : avggHK2 +=0);
    var avgScoreHK2 = Math.round(avgHK2/avggHK2 * 100)/100;
    arrChart.push({_id : "HK2",avgScore : avgScoreHK2>=0 ? avgScoreHK2 : 0.0, name : "HK2"});
    // get avg score HK3
    var avgHK3 = 0;
    var avggHK3 = 0;
    score.data.map(item => item.Semester === "HK3" ? avgHK3+=item.Number_Of_Credits * item.Final_Score : avgHK3 +=0);
    score.data.map(item => item.Semester === "HK3" ? avggHK3+=item.Number_Of_Credits : avggHK3 +=0);
    var avgScoreHK3 = Math.round(avgHK3/avggHK3 * 100)/100;
    arrChart.push({_id : "HK3",avgScore : avgScoreHK3>=0 ? avgScoreHK3 : 0.0, name : "HK3"});
    // get avg score HK4
    var avgHK4 = 0;
    var avggHK4 = 0;
    score.data.map(item => item.Semester === "HK4" ? avgHK4+=item.Number_Of_Credits * item.Final_Score : avgHK4 +=0);
    score.data.map(item => item.Semester === "HK4" ? avggHK4+=item.Number_Of_Credits : avggHK4 +=0);
    var avgScoreHK4 = Math.round(avgHK4/avggHK4 * 100)/100;
    arrChart.push({_id : "HK4",avgScore : avgScoreHK4>=0 ? avgScoreHK4 : 0.0, name : "HK4"});
    // get avg score HK5
    var avgHK5 = 0;
    var avggHK5 = 0;
    score.data.map(item => item.Semester === "HK5" ? avgHK5+=item.Number_Of_Credits * item.Final_Score : avgHK5 +=0);
    score.data.map(item => item.Semester === "HK5" ? avggHK5+=item.Number_Of_Credits : avggHK5 +=0);
    var avgScoreHK5 = Math.round(avgHK5/avggHK5 * 100)/100;
    arrChart.push({_id : "HK5",avgScore : avgScoreHK5>=0 ? avgScoreHK5 : 0.0, name : "HK5"});
    // get avg score HK6
    var avgHK6 = 0;
    var avggHK6 = 0;
    score.data.map(item => item.Semester === "HK6" ? avgHK6+=item.Number_Of_Credits * item.Final_Score : avgHK6 +=0);
    score.data.map(item => item.Semester === "HK6" ? avggHK6+=item.Number_Of_Credits : avggHK6 +=0);
    var avgScoreHK6 = Math.round(avgHK6/avggHK6 * 100)/100;
    arrChart.push({_id : "HK6",avgScore : avgScoreHK6>=0 ? avgScoreHK6 : 0.0, name : "HK6"});
    // get avg score HK7
    var avgHK7 = 0;
    var avggHK7 = 0;
    score.data.map(item => item.Semester === "HK7" ? avgHK7+=item.Number_Of_Credits * item.Final_Score : avgHK7 +=0);
    score.data.map(item => item.Semester === "HK7" ? avggHK7+=item.Number_Of_Credits : avggHK7 +=0);
    var avgScoreHK7 = Math.round(avgHK7/avggHK7 * 100)/100;
    arrChart.push({_id : "HK7",avgScore : avgScoreHK7>=0 ? avgScoreHK7 : 0.0, name : "HK7"});
    // get avg score HK8
    var avgHK8 = 0;
    var avggHK8 = 0;
    score.data.map(item => item.Semester === "HK8" ? avgHK8+=item.Number_Of_Credits * item.Final_Score : avgHK8 +=0);
    score.data.map(item => item.Semester === "HK8" ? avggHK8+=item.Number_Of_Credits : avggHK8 +=0);
    var avgScoreHK8 = Math.round(avgHK8/avggHK8 * 100)/100;
    arrChart.push({_id : "HK8",avgScore : avgScoreHK8>=0 ? avgScoreHK8 : 0.0, name : "HK8"});
    // get avg score HK9
    var avgHK9 = 0;
    var avggHK9 = 0;
    score.data.map(item => item.Semester === "HK9" ? avgHK9+=item.Number_Of_Credits * item.Final_Score : avgHK9 +=0);
    score.data.map(item => item.Semester === "HK9" ? avggHK9+=item.Number_Of_Credits : avggHK9 +=0);
    var avgScoreHK9 = Math.round(avgHK9/avggHK9 * 100)/100;
    arrChart.push({_id : "HK9",avgScore : avgScoreHK9>=0 ? avgScoreHK9 : 0.0, name : "HK9"});
    // get avg score HK10
    var avgHK10 = 0;
    var avggHK10 = 0;
    score.data.map(item => item.Semester === "HK10" ? avgHK10+=item.Number_Of_Credits * item.Final_Score : avgHK10 +=0);
    score.data.map(item => item.Semester === "HK10" ? avggHK10+=item.Number_Of_Credits : avggHK10 +=0);
    var avgScoreHK10 = Math.round(avgHK10/avggHK10 * 100)/100;
    arrChart.push({_id : "HK10",avgScore : avgScoreHK10>=0 ? avgScoreHK10 : 0.0, name : "HK10"});
    return (
        <div className="homeStudent">
            <div className="featured">
                <div className="featuredItem">
                    <span className="featuredTitle">Số môn đã học</span>
                    <div className="featuredSubjectContainer">
                        <span className="featuredSubject">
                            {Profile.Number_Of_Subjects_Studied} <SubjectIcon/>
                        </span>
                        <span className="featuredSubjectRate">
                    </span>
                    </div>
                    <span className="featuredSub">Trên tổng số 59 môn học.</span>
                </div>

                <div className="featuredItem">
                    <span className="featuredTitle">Tổng số tín chỉ đạt được</span>
                    <div className="featuredSubjectContainer">
                        <span className="featuredSubject">{Profile.Number_Of_Credits_Earned} <CreditScoreIcon/></span>
                        <span className="featuredSubjectRate">
                            {Math.abs(Math.round((PercentCredis*100))/100)}%{iconCredis}
                        </span>
                    </div>
                    <span className="featuredSub">So với học kì trước</span>
                </div>

                <div className="featuredItem">
                    <span className="featuredTitle">Số tín chỉ còn thiếu</span>
                    <div className="featuredSubjectContainer">
                        <span className="featuredSubject">{150-Profile.Number_Of_Credits_Earned} <CreditScoreIcon/></span>
                        <span className="featuredSubjectRate">
                            {Math.abs(Math.round((PercentCredisDP*100))/100)}%{iconCredisDP}
                        </span>
                    </div>
                    <span className="featuredSub">So với học kì trước</span>
                </div>
                <div className="featuredItem">
                    <span className="featuredTitle">Điểm trung bình tích lũy</span>
                    <div className="featuredSubjectContainer">
                    <span className="featuredSubject">{Math.round((avgFinalScore/avgNumberofCredis)*100)/100} <CreditScoreIcon/></span>
                    <span className="featuredSubjectRate">
                        {Math.abs(Math.round((avgScores*100))/100)}%{iconCredisSS}
                    </span>
                    </div>
                    <span className="featuredSub">So với học kì trước</span>
                </div>
            </div>
            <Chart
                data={arrChart}
                title="Biểu đồ thống kê điểm trung bình qua các học kì."
                grid
                dataKey="avgScore"
                color='#5550bd'
            />
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