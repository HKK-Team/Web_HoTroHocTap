const Subject = require('../Models/subjectModels');
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
const SubjectCtrl = {
    GetSubject : async(req,res) =>{
        const features = new APIfeatures(Subject.find(), req.query)
            .filtering()
        const subject = await features.query
        res.json(subject);
    },
    NewSubject : async(req,res) =>{
        try{
            const checkSubject_id = await Subject.findOne({Subject_Id : {$eq:req.body.Subject_Id}});
            if(checkSubject_id){
                return res.status(400).json({msg : "Mã học phần đã tồn tại. Xin vui lòng nhập lại!"})
            }
            var general_Period = parseInt(req.body.Theory) + parseInt(req.body.Practice);
            const newSubject = new Subject({
                Subject_Id : req.body.Subject_Id,
                Subject_Name : req.body.Subject_Name,
                Number_Of_Credits : parseInt(req.body.Number_Of_Credits),
                Start_Time : Date(req.body.Start_Time),
                End_Time : Date(req.body.End_Time),
                Khoa : req.body.Khoa,
                Education_Program : req.body.Education_Program,
                Semester : req.body.Semester,
                Id_Next_Subject : req.body.Id_Next_Subject,
                Level : parseInt(req.body.Level),
                Practice : parseInt(req.body.Practice),
                Theory : parseInt(req.body.Theory),
                General_Period : general_Period,
            });
            await newSubject.save();
            return res.status(200).json({msg :"Create Success!"});
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}
module.exports = SubjectCtrl;
