const nodemailer = require("nodemailer");
// const bcrypt = require("bcrypt");
// const Student = require('../Students/Models/userModels');
class MailService{
    #mailManage = "hkkteamsp@gmail.com"; // Mail quản lý
    #passWordManage = "khanhvlcm12"; // password quản lý
    // tạo mail quản lý
    addMailManage(user = "hkkteamsp@gmail.com", password = "khanhvlcm12") {
        this.#mailManage = user;
        this.#passWordManage = password;
    }
    // gửi mail cảnh báo học vụ
    // [put] /sendMail/:email
    sendMailWarning = async (req, res) => {
        try {
            console.log(req.body);
            if(req.body.email === null || req.body.email === undefined){
                res.status(400).json("Email null");
            }
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                user: this.#mailManage,
                pass: this.#passWordManage,
                },
            });
            let mailOptions = {
                from: this.#mailManage,
                to: req.body.email,
                subject: req.body.title,
                html: `<div style="">
                <h1>Xin chào, ${req.body.Email}</h1>
                <h3></h3>
                <h2>Chi tiết môn học bị nợ</h2>
                <div>
                <h4>Dear</h4>
                <p style="font-size: 16px">Họ và tên : ${req.body.FullName}</p>
                <p style="font-size: 16px">Địa chỉ : ${req.body.address}</p>
                <p style="font-size: 16px">Số điện thoại : ${
                    req.body.phone_number
                }
                </div>
                </div>`,
            };
            transporter.sendMail(mailOptions);
            res.status(201).json("Send email successfully");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}
module.exports = new MailService();