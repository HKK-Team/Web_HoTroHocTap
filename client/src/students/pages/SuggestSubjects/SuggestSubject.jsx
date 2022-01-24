import React from "react";
import "./SuggestSubject.css";
import { useSelector} from "react-redux";
export default function SuggestSubject(){
    // Get subject
    const subject = useSelector((state) => state.Subject.SubjectApi);
    const Subjects = useSelector(state => state.SubjectScore.SubjectScoreApi);
    // Suggest subjects debt
    var SubjectsDebt = Subjects.data.filter(item =>(item.Final_Score<=5))
    var SuggestSD = [];
    for(let i = 0;i<subject.data.length;i++)
    {
      for(let j = 0 ;j < SubjectsDebt.length;j++)
      {
        if(subject.data[i].Subject_Id === SubjectsDebt[j].Subject_Id){
          SuggestSD.push(subject.data[i]);
        }
      }
    }
    // Suggest subject with level
    return(
    <div className="user">
      <div className="userContainer">
      <div className="view-score">
        <div className="userUpdate">
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
            <h1><span class="blue"></span>Gợi Ý<span class="blue"></span> <span class="yellow">Môn Học</span></h1>
                  <h3 className = "year">Gợi ý Môn Học Lại.</h3>
                    <table class="container">
                      <thead>
                        <tr>
                          <th><h1 className = "sbn">Subject Name</h1></th>
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
                  <h3 className = "year">Gợi ý Môn Học Theo Cấp Độ.</h3>
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