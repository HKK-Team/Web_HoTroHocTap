const SubjectScore = require('../Models/subjectScoreModels');
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
const SubjectScoreCtrl = {
    GetSubject : async(req,res) =>{
        const features = new APIfeatures(SubjectScore.find(), req.query)
            .filtering()
        const subject = await features.query
        res.json(subject);
    },
    InputSubjectScore : async(req,res) =>{
        try{
            const newSubjectScore = new SubjectScore({
                Student_Id : req.body.Student_Id,
                Email : req.body.Email,
                FullName : req.body.FullName,
                Subject_Id : req.body.Subject_Id,
                Subject_Name : req.body.Subject_Name,
                Number_Of_Credits : req.body.Number_Of_Credits,
                Class : req.body.Class,
                Class_Subject_Id : req.body.Class_Subject_Id,
                Education_Program : req.body.Education_Program,
                Process_Score : req.body.Process_Score,
                Final_Exam_Score : req.body.Final_Exam_Score,
                Final_Score : req.body.Final_Score,
            });
            await newSubjectScore.save();
            const student = await Students.findById(req.body.Student_Id)
            const Number_Of_Subjects_Studied = student.Number_Of_Subjects_Studied + 1;
            const Number_Of_Registered_Credits = student.Number_Of_Registered_Credits + req.body.Number_Of_Credits;
            if(req.body.Final_Score>=5)
            {
                const Number_Of_Credits_Earned = student.Number_Of_Credits_Earned + req.body.Number_Of_Credits;
                await Students.updateOne({_id : req.body.Student_Id},{
                    Number_Of_Subjects_Studied,
                    Number_Of_Registered_Credits,
                    Number_Of_Credits_Earned
                });
            }
            else{
                const Outstanding_Number_Of_Credits  = student.Outstanding_Number_Of_Credits + req.body.Number_Of_Credits;
                await Students.updateOne({_id : req.body.Student_Id},{
                    Number_Of_Subjects_Studied : Number_Of_Subjects_Studied,
                    Number_Of_Registered_Credits : Number_Of_Registered_Credits,
                    Outstanding_Number_Of_Credits : Outstanding_Number_Of_Credits
                });
            }
            return res.status(200).json({msg :"Input Score Success!"});
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}
module.exports = SubjectScoreCtrl;