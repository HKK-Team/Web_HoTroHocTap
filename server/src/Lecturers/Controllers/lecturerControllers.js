const Lecturers = require('../Models/lecturerModels');
const bcrypt = require('bcrypt')
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
        const isMatch = await bcrypt.compare(req.body.password, lecturer.Password)
        if(!isMatch){
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
    },
    EditPassWord : async(req,res) =>{
        let user = await Lecturers.findById(req.body.id);
        const check = await bcrypt.compare(req.body.PassWord, user.Password)
        if(!check) return res.status(400).json({msg : "Password incorrect, please try again."});
        if(req.body.newPassWord !== req.body.confirmPassWord)
        {
            return res.status(400).json({msg: "Confirm PassWord incorrect!"});
        }
        const passwordHash = await bcrypt.hash(req.body.newPassWord, 10);
        await Lecturers.findOneAndUpdate({_id : req.body.id},{Password : passwordHash});
        return res.status(200).json({msg : "Bạn đã đổi mật khẩu thành công!"});
    }
}
module.exports = lecturersCtrl
