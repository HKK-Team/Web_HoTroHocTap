import { useSelector } from "react-redux";
import {useParams } from "react-router-dom";
import "./MailService.css";
import { FaHome } from "react-icons/fa";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PermIdentity from "@mui/icons-material/MailOutline";
import MailOutline from "@mui/icons-material/PermIdentity";
import ClassIcon from '@mui/icons-material/Class';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EmailIcon from '@mui/icons-material/Email';
import React,{useState} from "react";
import {toastError,toastSuccess} from "../../../shareAll/toastMassage/toastMassage.js";
import { sendMailWarning,sendMailAcademicWarning } from "../../../api/MailService.js";

export default function MailService() {
    const param = useParams();
    const student = useSelector((state) =>
        state.StudentsAccountApi.StudentsAccount.data.filter(
        (item) =>
            item._id === param.id
        )
    );
    var data = student[0];
    const subjectScore = useSelector((state) => state.SubjectScoreClass.SubjectScoreClassApi.data.filter(
        (item) => item.Student_Id === param.id && item.Final_Score <5
    ));
    const [mail,setmail] = useState({
        email : data?.Email,
        option : '',
        content : '',
        information : '',
        subject_Debt : '',
        GPA : data?.GPA
    })
    // get infor and GPA
    var HocVu = {
        FullName : data?.FullName,
        Email : data?.Email,
        Education_Program : data?.Education_Program,
        Current_Semester : data?.Current_Semester,
        Khoa : data?.Khoa,
        Phone : data?.Phone,
        Class : data?.Class,
        Student_Id : data?.Student_Id,
        Study_Year : data?.Study_Year,
        GPA : data?.GPA
    }
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setmail({ ...mail, [name]: value });
    };
    const handleSendMailWarning = async (e) => {
        try{
            if(mail.option === "2"){
                if (window.confirm("Bạn thực sự muốn gửi email không?")) {
                    e.preventDefault();
                    sendMailWarning({...mail, information : HocVu ,subject_Debt : subjectScore});
                    setTimeout(() =>{
                        window.location.href = "/HomeLecturer/ViewStatusStudent";
                    },1000)
                    toastSuccess("Gửi mail cảnh báo thành công!");
                } else {
                    toastSuccess("Đã hủy gửi email");
                }
            }
            else if(mail.option ==="1"){
                if (window.confirm("Bạn thực sự muốn gửi email không?")) {
                    e.preventDefault();
                    sendMailAcademicWarning({...mail, information : HocVu ,subject_Debt : subjectScore});
                    setTimeout(() =>{
                        window.location.href = "/HomeLecturer/ViewStatusStudent";
                    },1000)
                    toastSuccess("Gửi mail cảnh báo thành công!");
                } else {
                    toastSuccess("Đã hủy gửi email");
                }
            }
        }
        catch(err) {
            toastError(err.response.data.msg)
        }
    };
  return (
    <div className="productList">
        <div className="header-table">
            <h1 className="header-table-title">Thông Tin Chi Tiết Gửi Mail.</h1>
        </div>
        <span><h3><FaHome/> / ViewStatusStudent / MailService</h3></span>
        <p className="header-table-ps"><span>P/s</span>  : Cố vấn học tập chọn hình thức gửi mail cảnh cáo.</p>
        <p className="header-table-ps"><span>P/s</span> : Có 2 hình thức gửi mail là cảnh cáo học vụ do điểm trung bình tích lũy quá thấp và cảnh cáo đối với sinh viên nợ quá nhiều môn.</p>
        <div className="MailuserContainer">
            <div className="userUpdate">
                <span className="userUpdateTitle">Thông tin sinh viên.</span>
                <form className="userUpdateForm" onSubmit={handleSendMailWarning}>
                    <div className="userUpdateLeft">
                        <div className="MailuserShow">
                            <div className="userShowTop">
                                <img
                                src={data?.Image}
                                alt=""
                                className="userShowImg"
                                />
                                <div className="userShowTopTitle">
                                <span className="userShowUsername">Họ Tên : {data?.FullName}</span>
                                <span className="userShowUserTitle">Khoa : {data?.Khoa}</span>
                                </div>
                            </div>
                            <div className="userShowBottom">
                                <span className="userShowTitle">Chi tiết liên hệ</span>

                                <div className="userShowInfo">
                                    <PermIdentity
                                        className="userShowIcon"
                                        style={{ color: "#000000" }}
                                    />
                                    <span className="userShowInfoTitle">Email : {data?.Email}</span>
                                </div>
                                <div className="userShowInfo">
                                    <LocalPhoneIcon
                                        className="userShowIcon"
                                        style={{ color: "#000000" }}
                                    />
                                    <span className="userShowInfoTitle">Phone : {data?.Phone}</span>
                                </div>
                                <div className="userShowInfo">
                                    <MailOutline
                                        className="userShowIcon"
                                        style={{ color: "#000000" }}
                                    />
                                    <span className="userShowInfoTitle">
                                        CTĐT : {data?.Education_Program}
                                    </span>
                                </div>
                                <div className="userShowInfo">
                                    <ClassIcon
                                        className="userShowIcon"
                                        style={{ color: "#000000" }}
                                    />
                                    <span className="userShowInfoTitle">
                                    Class Advisor : {data?.Class}
                                    </span>
                                </div>
                                <div className="userShowInfo">
                                    <CreditScoreIcon
                                        className="userShowIcon"
                                        style={{ color: "#000000" }}
                                    />
                                    <span className="userShowInfoTitle">
                                    Avg Score : {data?.GPA}
                                    </span>
                                </div>
                                <div className="userShowInfo">
                                    <CreditCardIcon
                                        className="userShowIcon"
                                        style={{ color: "#000000" }}
                                    />
                                    <span className="userShowInfoTitle">
                                    Credit Debt : {data?.Outstanding_Number_Of_Credits}
                                    </span>
                                </div>
                                <div className="userShowInfo">
                                    <CreditCardIcon
                                        className="userShowIcon"
                                        style={{ color: "#000000" }}
                                    />
                                    <span className="userShowInfoTitle">
                                    Subject Debt : {data?.Number_Of_Subjects_Debt}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Mail-Service-Right">
                        <div className="mail-select">
                            <span className = "mail-title">Hình thức gửi mail.</span>
                            <div class="select">
                                <select name="option" onChange = {onChangeInput}>
                                    <option selected disabled>Chọn hình thức.</option>
                                    <option value = {1}>Cảnh cáo học vụ.</option>
                                    <option value = {2}>Cảnh cáo môn học bị nợ.</option>
                                </select>
                            </div>
                        </div>
                        <div className="mail-textArea">
                            <span className = "mail-Content">Nội dung kèm theo</span>
                            <textarea 
                                className = "Content"
                                name="content"
                                value={mail.content}
                                placeholder = "Nhập nội dung gửi mail..."
                                required
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className="btnsubmit-mail">
                            <button className="submit-mail"><EmailIcon/> Gửi Mail</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}