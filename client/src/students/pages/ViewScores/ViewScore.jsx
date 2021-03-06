import React from "react";
import "./ViewScore.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PermIdentity from "@mui/icons-material/MailOutline";
import MailOutline from "@mui/icons-material/PermIdentity";
import ClassIcon from "@mui/icons-material/Class";
import { useSelector} from "react-redux";
import Loading from "./../../../utils/loading/Loading";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FaFileExcel } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

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
    ));
    if(!Profile)
    {
        return (
            <div className="loading">
              {" "}
              <Loading />
            </div>
        );
    }
    // get subject score Semester
    var scoreHK1 = score.data.filter(item => item.Semester === "HK1");
    var scoreHK2 = score.data.filter(item => item.Semester === "HK2");
    var scoreHK3 = score.data.filter(item => item.Semester === "HK3");
    var scoreHK4 = score.data.filter(item => item.Semester === "HK4");
    var scoreHK5 = score.data.filter(item => item.Semester === "HK5");
    var scoreHK6 = score.data.filter(item => item.Semester === "HK6");
    var scoreHK7 = score.data.filter(item => item.Semester === "HK7");
    var scoreHK8 = score.data.filter(item => item.Semester === "HK8");
    var scoreHK9 = score.data.filter(item => item.Semester === "HK9");
    var scoreHK10 = score.data.filter(item => item.Semester === "HK10");
    return(
    <div className="user">
        <span><h3><FaHome/> / ViewScore</h3></span>
      <div className="userContainer">
      <div className="view-score">
        <div className="userUpdate">
          <form className="userUpdateForm" onSubmit="">
            <div className="userUpdateLeft">
            <h1><span class="blue"></span>Xem<span class="blue"></span> <span class="yellow">??i???m Thi</span></h1>
                <div className = "user-infor">
                    <h2 className = "title">Th??ng tin c?? nh??n</h2>
                    <div className="userShowTop">
                        <img
                        src={Profile.Image}
                        alt=""
                        className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                        <span className="userShowUsername">H??? T??n : {Profile?.FullName}</span>
                        <span className="userShowUsername">Khoa : {Profile?.Khoa}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Chi ti???t li??n h???</span>

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
                        <span className="userShowInfoTitle">CT??T :  {Profile?.Education_Program}</span>
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
                    <h3 className= "year">B???ng ??i???m t???t c??? m??n h???c t??nh t???i th???i ??i???m hi???n t???i.</h3>
                    <div className = "export-excel">
                        <span>
                            <FaFileExcel className = "img-export"/>
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="download-table-xls-button"
                                table="table-to-xls"
                                filename="BangDiemMonHoc"
                                sheet="BangDiemMonHoc"
                                buttonText="Xu???t Excel"
                            />
                        </span>
                    </div>
                    <table class="container-table" id = "table-to-xls">
                        <thead>
                            <tr>
                            <th><h1 className = "name">Subject Name</h1></th>
                            <th><h1>Credits</h1></th>
                            <th><h1>Subject Id</h1></th>
                            <th><h1>Process Score</h1></th>
                            <th><h1>Final Exam Score</h1></th>
                            <th><h1>Final Score</h1></th>
                            <th><h1 className = "result">Result</h1></th>
                            </tr>
                        </thead>
                        {
                            scoreHK1.length !== 0 ? 
                            <tbody id = "myTbody">
                                <tr className = "HK1"> - B???ng ??i???m HKI n??m h???c {Profile?.Study_Year.slice(0,4)} - {parseInt(Profile?.Study_Year.slice(0,4))+1}</tr>
                                {scoreHK1.map(item =>(
                                    <tr>
                                        <td>{item.Subject_Name}</td>
                                        <td>{item.Number_Of_Credits}</td>
                                        <td>{item.Subject_Id}</td>
                                        <td>{item.Process_Score}</td>
                                        <td>{item.Final_Exam_Score}</td>
                                        <td>{item.Final_Score}</td>
                                        <td>{(item.Final_Score >= 5 ? "?????t" : "Kh??ng ?????t")}</td>
                                    </tr>
                                ))}
                            </tbody>
                            : ""
                        }
                        {
                            scoreHK2.length !== 0 ? 
                            <tbody id = "myTbody">
                                <tr className = "HK1"> - B???ng ??i???m HKII n??m h???c {Profile?.Study_Year.slice(0,4)} - {parseInt(Profile?.Study_Year.slice(0,4))+1}</tr>
                                {scoreHK2.map(item =>(
                                    <tr>
                                        <td>{item.Subject_Name}</td>
                                        <td>{item.Number_Of_Credits}</td>
                                        <td>{item.Subject_Id}</td>
                                        <td>{item.Process_Score}</td>
                                        <td>{item.Final_Exam_Score}</td>
                                        <td>{item.Final_Score}</td>
                                        <td>{(item.Final_Score >= 5 ? "?????t" : "Kh??ng ?????t")}</td>
                                    </tr>
                                ))}
                            </tbody>
                            : ""
                        }
                        {
                            scoreHK3.length !== 0 ? 
                            <tbody id = "myTbody">
                                <tr className = "HK1"> - B???ng ??i???m HKIII n??m h???c {parseInt(Profile?.Study_Year.slice(0,4))+1} - {parseInt(Profile?.Study_Year.slice(0,4))+2}</tr>
                                {scoreHK3.map(item =>(
                                    <tr>
                                        <td>{item.Subject_Name}</td>
                                        <td>{item.Number_Of_Credits}</td>
                                        <td>{item.Subject_Id}</td>
                                        <td>{item.Process_Score}</td>
                                        <td>{item.Final_Exam_Score}</td>
                                        <td>{item.Final_Score}</td>
                                        <td>{(item.Final_Score >= 5 ? "?????t" : "Kh??ng ?????t")}</td>
                                    </tr>
                                ))}
                            </tbody>
                            : ""
                        }
                        {
                            scoreHK4.length !== 0 ? 
                            <tbody id = "myTbody">
                                <tr className = "HK1"> - B???ng ??i???m HKIV n??m h???c {parseInt(Profile?.Study_Year.slice(0,4))+1} - {parseInt(Profile?.Study_Year.slice(0,4))+2}</tr>
                                {scoreHK4.map(item =>(
                                    <tr>
                                        <td>{item.Subject_Name}</td>
                                        <td>{item.Number_Of_Credits}</td>
                                        <td>{item.Subject_Id}</td>
                                        <td>{item.Process_Score}</td>
                                        <td>{item.Final_Exam_Score}</td>
                                        <td>{item.Final_Score}</td>
                                        <td>{(item.Final_Score >= 5 ? "?????t" : "Kh??ng ?????t")}</td>
                                    </tr>
                                ))}
                            </tbody>
                            : ""
                        }
                        {
                            scoreHK5.length !== 0 ? 
                            <tbody id = "myTbody">
                                <tr className = "HK1"> - B???ng ??i???m HKV n??m h???c {parseInt(Profile?.Study_Year.slice(0,4))+1} - {parseInt(Profile?.Study_Year.slice(0,4))+2}</tr>
                                {scoreHK5.map(item =>(
                                    <tr>
                                        <td>{item.Subject_Name}</td>
                                        <td>{item.Number_Of_Credits}</td>
                                        <td>{item.Subject_Id}</td>
                                        <td>{item.Process_Score}</td>
                                        <td>{item.Final_Exam_Score}</td>
                                        <td>{item.Final_Score}</td>
                                        <td>{(item.Final_Score >= 5 ? "?????t" : "Kh??ng ?????t")}</td>
                                    </tr>
                                ))}
                            </tbody>
                            : ""
                        }
                        {
                            scoreHK6.length !== 0 ? 
                            <tbody id = "myTbody">
                                <tr className = "HK1"> - B???ng ??i???m HKVI n??m h???c {parseInt(Profile?.Study_Year.slice(0,4))+2} - {parseInt(Profile?.Study_Year.slice(0,4))+3}</tr>
                                {scoreHK6.map(item =>(
                                    <tr>
                                        <td>{item.Subject_Name}</td>
                                        <td>{item.Number_Of_Credits}</td>
                                        <td>{item.Subject_Id}</td>
                                        <td>{item.Process_Score}</td>
                                        <td>{item.Final_Exam_Score}</td>
                                        <td>{item.Final_Score}</td>
                                        <td>{(item.Final_Score >= 5 ? "?????t" : "Kh??ng ?????t")}</td>
                                    </tr>
                                ))}
                            </tbody>
                            : ""
                        }
                        {
                            scoreHK7.length !== 0 ? 
                            <tbody id = "myTbody">
                                <tr className = "HK1"> - B???ng ??i???m HKVII n??m h???c {parseInt(Profile?.Study_Year.slice(0,4))+2} - {parseInt(Profile?.Study_Year.slice(0,4))+3}</tr>
                                {scoreHK7.map(item =>(
                                    <tr>
                                        <td>{item.Subject_Name}</td>
                                        <td>{item.Number_Of_Credits}</td>
                                        <td>{item.Subject_Id}</td>
                                        <td>{item.Process_Score}</td>
                                        <td>{item.Final_Exam_Score}</td>
                                        <td>{item.Final_Score}</td>
                                        <td>{(item.Final_Score >= 5 ? "?????t" : "Kh??ng ?????t")}</td>
                                    </tr>
                                ))}
                            </tbody>
                            : ""
                        }
                        {
                            scoreHK8.length !== 0 ? 
                            <tbody id = "myTbody">
                                <tr className = "HK1"> - B???ng ??i???m HKVIII n??m h???c {parseInt(Profile?.Study_Year.slice(0,4))+2} - {parseInt(Profile?.Study_Year.slice(0,4))+3}</tr>
                                {scoreHK8.map(item =>(
                                    <tr>
                                        <td>{item.Subject_Name}</td>
                                        <td>{item.Number_Of_Credits}</td>
                                        <td>{item.Subject_Id}</td>
                                        <td>{item.Process_Score}</td>
                                        <td>{item.Final_Exam_Score}</td>
                                        <td>{item.Final_Score}</td>
                                        <td>{(item.Final_Score >= 5 ? "?????t" : "Kh??ng ?????t")}</td>
                                    </tr>
                                ))}
                            </tbody>
                            : ""
                        }
                        {
                            scoreHK9.length !== 0 ? 
                            <tbody id = "myTbody">
                                <tr className = "HK1"> - B???ng ??i???m HKIX n??m h???c {parseInt(Profile?.Study_Year.slice(0,4))+3} - {parseInt(Profile?.Study_Year.slice(0,4))+4}</tr>
                                {scoreHK9.map(item =>(
                                    <tr>
                                        <td>{item.Subject_Name}</td>
                                        <td>{item.Number_Of_Credits}</td>
                                        <td>{item.Subject_Id}</td>
                                        <td>{item.Process_Score}</td>
                                        <td>{item.Final_Exam_Score}</td>
                                        <td>{item.Final_Score}</td>
                                        <td>{(item.Final_Score >= 5 ? "?????t" : "Kh??ng ?????t")}</td>
                                    </tr>
                                ))}
                            </tbody>
                            : ""
                        }
                        {
                            scoreHK10.length !== 0 ? 
                            <tbody id = "myTbody">
                                <tr className = "HK1"> - B???ng ??i???m HKX n??m h???c {parseInt(Profile?.Study_Year.slice(0,4))+3} - {parseInt(Profile?.Study_Year.slice(0,4))+4}</tr>
                                {scoreHK10.map(item =>(
                                    <tr>
                                        <td>{item.Subject_Name}</td>
                                        <td>{item.Number_Of_Credits}</td>
                                        <td>{item.Subject_Id}</td>
                                        <td>{item.Process_Score}</td>
                                        <td>{item.Final_Exam_Score}</td>
                                        <td>{item.Final_Score}</td>
                                        <td>{(item.Final_Score >= 5 ? "?????t" : "Kh??ng ?????t")}</td>
                                    </tr>
                                ))}
                            </tbody>
                            : ""
                        }
                    </table>
                    <table className="avg">
                        <tbody>
                            <tr className="dtb">
                                <td> - ??i???m trung b??nh t??ch l??y : </td>
                                <td className="value">{Math.round((avgFinalScore/avgNumberofCredis)*100)/100}</td>
                            </tr>
                            <tr className="avgNOC">
                                <td> - S??? t??n ch??? ?????t ???????c : </td>
                                <td className="value">{avgNOC}</td>
                            </tr>
                            <tr className="avgNoct">
                                <td> - S??? t??n ch??? c??n thi???u : </td>
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