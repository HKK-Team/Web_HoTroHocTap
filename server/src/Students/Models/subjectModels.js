const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubjectSchema = new Schema({
    Subject_Id : String,
    Subject_Name : String,
    Number_Of_Credits : Number,
    Start_Time : Date,
    End_Time : Date,
    Semester : String,
    Id_Next_Subject : String,
    Level : Number,
    Khoa : String,
    Education_Program : String,
    Practice : Number,
    Theory : Number,
    General_Period : Number
})
module.exports = mongoose.model('subject',SubjectSchema);