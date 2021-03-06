const Students = require('../Models/userModels');
class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }
}
const studentsCtrl = {
    login : async(req,res) =>{
        try{
            const student = await Students.findOne({ID : {$eq:req.body.ID}})
            if(!student){
                const newStudent = new Student({
                    FirstName : req.body.firstName,
                    LastName : req.body.lastName,
                    FullName : req.body.fullName,
                    Email : req.body.email,
                    Phone : '',
                    Address : '',
                    ID : req.body.ID,
                    Student_Id : req.body.Student_Id,
                    Education_Program : '',
                    Khoa : '',
                    Image : req.body.image,
                    AccessToken : req.body.accessToken,
                    Token_ID : req.body.token_ID,
                    Api : req.body.Api,
                    Class : '',
                    Study_Year : '',
                    Current_Semester : '',
                    Number_Of_Subjects_Studied : 0,
                    Number_Of_Subjects_Debt : 0,
                    Number_Of_Registered_Credits : 0,
                    Number_Of_Credits_Earned : 0,
                    Outstanding_Number_Of_Credits : 0,
                    GPA : 0.0,
                });
                await newStudent.save();
            }
            return res.status(200).json({msg :"Login Success!"});
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    GetUser : async(req,res) =>{
        const features = new APIfeatures(Students.find(), req.query)
            .filtering()
        const user = await features.query
        res.json(user)
    },
    EditUser : async(req,res) =>{
        // check your id
        user = req.body;
        // update to mongodb
        const editUser = new Students(user);
        try {
            await Students.updateOne({ _id: req.body._id }, editUser);
            return res.status(200).json("B???n ???? update th??ng tin th??nh c??ng!")

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
};
module.exports = studentsCtrl
