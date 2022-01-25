const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubjectScoreSchema = new Schema({
    Student_Id: String,
    Email : String,
    FullName: String,
    Subject_Id: String,
    Subject_Name: String,
    Number_Of_Credits: Number,
    Class : String,
    Class_Subject_Id : String,
    Education_Program : String,
    Id_Next_Subject : String,
    Process_Score : Number,
    Final_Exam_Score : Number,
    Final_Score : Number,
    Date : {
        type: Date, 
        default: Date.now 
    }
})
module.exports = mongoose.model('subjectscore',SubjectScoreSchema);