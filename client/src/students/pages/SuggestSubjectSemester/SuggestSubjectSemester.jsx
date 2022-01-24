import React from "react";
import "./SuggestSubjectSemester.css";
import { useSelector} from "react-redux";
export default function SuggestSubjectSemester(){
    const Profile = useSelector(
        (state) => state.StudentsAccount.StudentsAccountApi.data[0]
    );
    // ép kiểu để lấy tên hk tiếp theo
    let Semester = Profile.Current_Semester.slice(0,2) + (parseInt(Profile.Current_Semester.slice(2,3)) + 1);
    // Get subject
    const SuggestSD = useSelector((state) => state.Subject.SubjectApi.data.filter(item => item.Semester ===Semester));
    return(
    <div className="user">
      <div className="userContainer">
      <div className="view-score">
        <div className="userUpdate">
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
                <h1><span class="blue"></span>Gợi Ý<span class="blue"></span> <span class="yellow">Môn Học Cho Học Ký Tới</span></h1>
                <table class="container">
                    <thead>
                        <tr>
                          <th><h1>Subject Name</h1></th>
                          <th><h1>Subject Id</h1></th>
                          <th><h1>Number Of Credits</h1></th>
                          <th><h1>Start Time</h1></th>
                          <th><h1>End Time</h1></th>
                          <th><h1>Theory</h1></th>
                          <th><h1>Practice</h1></th>
                          <th><h1>General Period</h1></th>
                          <th><h1 className = "result">Education Program</h1></th>
                        </tr>
                      </thead>
                      <tbody id = "myTbody">
                        {SuggestSD.map(item =>(
                          <tr>
                            <td>{item.Subject_Name}</td>
                            <td>{item.Subject_Id}</td>
                            <td>{item.Number_Of_Credits}</td>
                            <td>{item.Start_Time.slice(0,10)}</td>
                            <td>{item.End_Time.slice(0,10)}</td>
                            <td>{item.Theory}</td>
                            <td>{item.Practice}</td>
                            <td>{item.General_Period}</td>
                            <td>{item.Education_Program}</td>
                          </tr>
                            ))}
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