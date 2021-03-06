const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const studentSchema = new Schema({
    FirstName : String,
    LastName : String,
    FullName : String,
    Email : {
        type : String,
        require : true,
    },
    Phone : String,
    Address :String,
    ID : String,
    Student_Id : String,
    Education_Program : String,
    Khoa : String,
    Image : String,
    AccessToken : String,
    Token_ID : String,
    Api : String,
    Class : String,
    Study_Year : String,
    Current_Semester : String,
    Number_Of_Subjects_Studied : {
        type : Number,
    },
    Number_Of_Registered_Credits : {
        type : Number,
    },
    Number_Of_Credits_Earned : {
        type : Number,
    },
    Outstanding_Number_Of_Credits: {
        type : Number,
    },
    Number_Of_Subjects_Debt : {
        type : Number,
    },
    GPA : {
        type : Number,
    }

})
module.exports = mongoose.model('student',studentSchema);