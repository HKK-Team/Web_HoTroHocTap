import React from "react";
import "./ViewScore.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PermIdentity from "@mui/icons-material/MailOutline";
import MailOutline from "@mui/icons-material/PermIdentity";
import ClassIcon from "@mui/icons-material/Class";
import { useSelector} from "react-redux";
export default function ViewScore(){
    const Profile = useSelector(
        (state) => state.StudentsAccount.StudentsAccountApi.data[0]
    ); 
    const score = useSelector((state) => state.SubjectScore.SubjectScoreApi);
    var avgFinalScore = 0;
    var avgNumberofCredis = 0;
    score.data.map(item =>(
        avgNumberofCredis +=item.Number_Of_Credits
    ));
    score.data.map(item =>(
        avgFinalScore += item.Final_Score*item.Number_Of_Credits
    ));
    var avgNOC = 0;
    score.data.map(item =>(
        (item.Final_Score) >= 5 ? avgNOC+=item.Number_Of_Credits : avgNOC += 0
    ))
    return(
    <div className="user">
      <div className="userContainer">
      <div className="view-score">
        <div className="userUpdate">
          <form className="userUpdateForm" onSubmit="">
            <div className="userUpdateLeft">
            <h1><span class="blue"></span>Xem<span class="blue"></span> <span class="yellow">Điểm Thi</span></h1>
                <div className = "user-infor">
                    <h2 className = "title">Thông tin cá nhân</h2>
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
                    <h3 className= "year">Bảng điểm tất cả môn học tính tới thời điểm hiện tại.</h3>
                    <table class="container">
                        <thead>
                            <tr>
                            <th><h1>Subject Name</h1></th>
                            <th><h1>Subject Id</h1></th>
                            <th><h1>Number Of Credits</h1></th>
                            <th><h1>Process Score</h1></th>
                            <th><h1>Final Exam Score</h1></th>
                            <th><h1>Final Score</h1></th>
                            <th><h1 className = "result">Result</h1></th>
                            </tr>
                        </thead>
                        <tbody id = "myTbody">
                            {score.data.map(item =>(
                                <tr>
                                    <td className = "name">{item.Subject_Name}</td>
                                    <td>{item.Subject_Id}</td>
                                    <td>{item.Number_Of_Credits}</td>
                                    <td>{item.Process_Score}</td>
                                    <td>{item.Final_Exam_Score}</td>
                                    <td>{item.Final_Score}</td>
                                    <td>{(item.Final_Score >= 5 ? "Đạt" : "Không Đạt")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <table className="avg">
                        <tbody>
                            <tr className="dtb">
                                <td> - Điểm trung bình tích lũy : </td>
                                <td className="value">{Math.round((avgFinalScore/avgNumberofCredis)*100)/100}</td>
                            </tr>
                            <tr className="avgNOC">
                                <td> - Số tín chỉ đạt được : </td>
                                <td className="value">{avgNOC}</td>
                            </tr>
                            <tr className="avgNoct">
                                <td> - Số tín chỉ còn thiếu : </td>
                                <td className="value">{150-avgNOC}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
          </form>
        </div>
      </div>
      </div>
    </div>
    )
}