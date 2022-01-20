const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const lecturerSchema = new Schema({
    FirstName : String,
    LastName : String,
    FullName : String,
    Email : {
        type : String,
        require : true,
    },
    Password : String,
    Phone : String,
    Address :String,
    Class_Advisor : String,
    Education_Program : String,
    Khoa : String,
    Image : String,
})
module.exports = mongoose.model('lecturer',lecturerSchema);