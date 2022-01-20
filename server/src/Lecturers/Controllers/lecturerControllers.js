const Lecturers = require('../Models/lecturerModels');
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
const lecturersCtrl = {
    login : async(req,res) =>{
        const lecturer = await Lecturers.findOne({email : {$eq : req.body.email}})
        if(!lecturer)
        {
            return res.status(400).json({msg: "Email doesn't Exist!"});
        }
        if(lecturer.Password !== req.body.password){
            return res.status(400).json({msg: "Password incorrect!"});
        }
        return res.status(200).json({msg : "Login SuccessFully!"})
    },
    getUser: async (req, res) =>{
        try {
            const features = new APIfeatures(Lecturers.find().select('-Password'), req.query)
            .filtering()
            const user = await features.query
            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    EditUser : async(req,res) =>{
        // check your id
        user = req.body;
        // update to mongodb
        const editUser = new Lecturers(user);
        try {
            await Lecturers.updateOne({ _id: req.body._id }, editUser);
            return res.status(200).json("Bạn đã update thông tin thành công!")

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}
module.exports = lecturersCtrl
