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
    }
}
module.exports = SubjectCtrl;
