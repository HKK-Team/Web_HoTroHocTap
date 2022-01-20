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
    Education_Program : String,
    Khoa : String,
    Image : String,
    AccessToken : String,
    Token_ID : String,
    Api : String,
    Class : String
})
module.exports = mongoose.model('student',studentSchema);