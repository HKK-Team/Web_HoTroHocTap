const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const Lecturer = require('../Lecturers/Models/lecturerModels');
const Excel = require("exceljs");
class MailService{
  #codeOTP; // lưu trữ mã otp
  #mailManage = "hkkteamsp@gmail.com"; // Mail quản lý
  #passWordManage = "khanhvlcm12"; // password quản lý
  #isResetOtp = false; // Mã otp đã được gửi chưa

  // tạo mail quản lý
  addMailManage(user = "hkkteamsp@gmail.com", password = "khanhvlcm12") {
    this.#mailManage = user;
    this.#passWordManage = password;
  }

  //reset mã otp
  resetOtpCode(time = 300000) {
    if (this.#isResetOtp) {
      setTimeout(() => {
        this.#isResetOtp = false;
        return (this.#codeOTP = Math.round(
          Math.random() * (999999 - 100000 + 1) + 100000
        ));
      }, time);
    }
  }

  // khởi tạo mã otp
  createtOptCode() {
    return (this.#codeOTP = Math.round(
      Math.random() * (999999 - 100000 + 1) + 100000
    ));
  }

  // xác nhận mã otp
  // [post] /sendMail/:otp/confrimOtp
  conFirmOtpCode = async (req, res) => {
    try {
      let otpCodeValue = req.params.otp;
      let isOtp = false;
      if (Number(otpCodeValue) === this.#codeOTP) {
        isOtp = true;
      }
      res.status(200).json(isOtp);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  // xác thực email
  // [post] /sendMail/:email/conFirmEmail
  conFirmEmail = async (req, res) => {
    let isEmail = true;
    const regex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    if (!regex.test(req.params.email)) {
      isEmail = false;
      return res.status(400).json({ msg: "Trường này phải là Email." });
    }

    const email = req.params.email;
    const user = await Lecturer.findOne({ email });
    // check email
    if (user === null) {
      isEmail = false;
      return res.status(400).json({ msg: "Email này không tồn tại." });
    }
    res.status(200).json(isEmail);
  };

  // gửi mail mã otp xác nhận
  // [put] /sendMail/:email
  sendMailOtpcode = async (req, res) => {
    try {
      if (req.params.email === null || req.params.email === undefined) {
        res.status(400).json("Email null");
      }
      this.createtOptCode();
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: this.#mailManage,
          pass: this.#passWordManage,
        },
      });
      let mailOptions = {
        from: this.#mailManage,
        to: req.params.email,
        subject: `Xác nhập mã otp đến từ HKK team`,
        html: `<h1>Xin chào.</h1><h2>Chúng tôi nhận được yêu cầu xác nhận, Mã OTP của bạn là: ${
          this.#codeOTP
        }</h2>
      <h3>Vui lòng không chia sẽ mã cho bất kỳ ai</h3>
      <h3>Mã của bạn sẽ hết hạn sau 5 phút</h3>`,
      };
      transporter.sendMail(mailOptions);
      res.status(200).json({ msg: "Send email otp code successfully" });
      this.resetOtpCode();
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };

  // gửi mail context
  // [put] /sendMail/:email
  sendMailConfirmEmail = async (req, res) => {
    try {
      if (req.params.email === null || req.params.email === undefined) {
        res.status(400).json("Email null");
      }
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: this.#mailManage,
          pass: this.#passWordManage,
        },
      });
      let mailOptions = {
        from: this.#mailManage,
        to: req.params.email,
        subject: `Mật Khẩu đã được thay đổi qua hệ thống Theo dõi quá trình học tập của Sinh Viên Đại Học Thủ Dầu Một`,
        html: `<h1>Xin chào.</h1> 
        <h3>Mật Khẩu giảng viên <strong>${req.params.email}</strong> của bạn đã được thay đổi thành công.<h3>
        <h3>Cảm ơn bạn đã sử dụng dịch vụ. Chúc bạn một ngày tốt lành!</h3>
        <h2>Trân trọng.</h2>`,
      };
      transporter.sendMail(mailOptions);
      res.status(201).json("Send email successfully");
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

  // gửi mail cảnh báo đối với môn học nợ
  // [put] /sendMail/:email
  sendMailWarning = async (req, res) => {
    try {
      if (req.body.email === null || req.body.email === undefined) {
        res.status(400).json("Email null");
      }
      const data = req.body.subject_Debt;
      const key = req.body.information.Study_Year;
      
      // tạo file excel 
      const filename = `DanhSachMonHocDangNo_${key}.xlsx`;
      let workbook = new Excel.Workbook();
      let worksheet = workbook.addWorksheet("Mon Hoc", {
        views: [{ state: "frozen", xSplit: 3 }],
      });

      worksheet.columns = [
        {
          header: "Id Môn Học",
          key: "_id",
          width: 15.7,
        },
        {
          header: "Tên học phần",
          key: "Subject_Name",
          width: 37.4,
        },
        {
            header: "Mã môn học",
            key: "Subject_Id",
            width: 5.7,
        },
        { header: "Số tín chỉ", 
          key: "Number_Of_Credits", 
          width: 17 
        },
        { header: "Mã lớp học", 
          key: "Class_Subject_Id", 
          width: 6.3 
        },
        { header: "Chương trình đào tạo", 
          key: "Education_Program", 
          width: 5.5 
        },
        {
          header: "Điểm quá trình",
          key: "Process_Score",
          width: 18,
        },
        {
          header: "Điểm thi",
          key: "Final_Exam_Score",
          width: 26,
        },
        { header: "Điểm tổng kết",
          key: "Final_Score", 
          width: 13.11 },
      ];
      [
        "A1",
        "B1",
        "C1",
        "D1",
        "E1",
        "F1",
        "G1",
        "H1",
        "I1",
      ].map((key) => {
        worksheet.getCell(key).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "ffff00" },
        };
      });

      // set header filter for column
      worksheet.autoFilter = "A2:I2";

      // loop column set alignment center and font size excel js
      for (let i = 1; i <= worksheet.columns.length; i++) {
        worksheet.getColumn(i).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };
        worksheet.getColumn(i).font = {
          name: "Times New Roman",
          family: 2,
          size: 8,
        };
      }

      //get row A2 set alignment center and fonts bold
      worksheet.getRow(1).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      worksheet.getRow(1).font = {
        name: "Times New Roman",
        family: 2,
        size: 8,
        bold: true,
      };

      // set background color and border for row A2
      worksheet.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffff00" },
      };
      worksheet.getRow(1).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      // Splicing row excel js
      worksheet.spliceRows(1, 0, {});
      //merger cell
      worksheet.mergeCells("A1:I1");
      worksheet.getCell("A1").value = `CẢNH BÁO MÔN HỌC BỊ NỢ 
        ${req.body.information.Current_Semester} ${key}`;
      worksheet.getCell("A1").alignment = {
        horizontal: "center",
        wrapText: true,
        vertical: "bottom",
      };
      worksheet.getCell("A1").font = {
        name: "Times New Roman",
        family: 2,
        size: 16,
        bold: true,
      };
      worksheet.getRow(1).height = 56;

      data.forEach((e) => {
        worksheet.addRow(e);
      });
      const buffer = await workbook.xlsx.writeBuffer();
      // auth mail service create and send email
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: this.#mailManage,
          pass: this.#passWordManage,
        },
      });
      // content send email
      let mailOptions = {
        from: this.#mailManage,
        to: req.body.email,
        subject: "Cảnh báo học vụ đối với sinh viên nợ môn quá nhiều.",
        html: `<div>
        <h1>Dear ${req.body.information.FullName},</h1>
        <h3>Xin gửi cho bạn email này nhằm cảnh báo học vụ do nợ môn quá số lượng cho phép của chương trình đào tạo đối với niên khóa ${key}.</h3>
        <h4>Xin Chào sinh viên ${req.body.information.FullName}!</h4>
        <h4>Mã sinh viên : ${req.body.information.Student_Id}</h4>
        <h4>Số điện thoại : ${req.body.information.Phone}</h4>
        <h4>Khoa : ${req.body.information.Khoa}</h4>
        <h4>Chương trình đào tạo : ${req.body.information.Education_Program}</h4>
        <h4>Học kỳ : ${req.body.information.Current_Semester} (${req.body.information.Study_Year})</h4>
        <h4>Điểm trung bình : ${req.body.information.GPA}</h4>
        <h3>Nội dung : Xin chào ${req.body.information.FullName} tôi là cố vấn học tập của lớp ${req.body.information.Class}.</h3>
        <h3> - ${req.body.content}</h3>
        <h3>Cảm ơn bạn, chúc bạn sớm tìm ra chiến lược học hành thật tốt để kịp hoàn thành tiến độ học tập của nhà trường đề ra, mong bạn cố gắng học hành thật tốt!</h3>
        <h2>Thanks You!</h2>
        </div>`,
        attachments: [
          {
            filename,
            content: buffer,
            contentType:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          },
        ],
      };
      transporter.sendMail(mailOptions);
      res.status(201).json("Send email successfully");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // gửi mail cảnh báo học vụ
  sendMailAcademicWarning = async (req, res) => {
    try {
      if (req.body.email === null || req.body.email === undefined) {
        res.status(400).json("Email null");
      }
      
      const key = req.body.information.Study_Year;

      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: this.#mailManage,
          pass: this.#passWordManage,
        },
      });
      let mailOptions = {
        from: this.#mailManage,
        to: req.body.email,
        subject: "Cảnh báo học vụ đối với sinh viên có điểm trung bình tích lũy quá thấp.",
        html: `<div>
        <h1>Dear ${req.body.information.FullName},</h1>
        <h3>Xin gửi cho bạn email này nhằm cảnh báo học vụ do điểm trung bình tích lũy của bạn quá thấp so với chương trình đào tạo đối với niên khóa ${key}.</h3>
        <h4>Xin Chào sinh viên ${req.body.information.FullName}!</h4>
        <h4>Mã sinh viên : ${req.body.information.Student_Id}</h4>
        <h4>Số điện thoại : ${req.body.information.Phone}</h4>
        <h4>Khoa : ${req.body.information.Khoa}</h4>
        <h4>Chương trình đào tạo : ${req.body.information.Education_Program}</h4>
        <h4>Học kỳ : ${req.body.information.Current_Semester} (${req.body.information.Study_Year})</h4>
        <h4>Điểm trung bình : ${req.body.information.GPA}</h4>
        <h3>Nội dung : Xin chào ${req.body.information.FullName} tôi là cố vấn học tập của lớp ${req.body.information.Class}.</h3>
        <h3> - ${req.body.content}</h3>
        <h3>Cảm ơn bạn, chúc bạn sớm tìm ra chiến lược học hành thật tốt để kịp hoàn thành tiến độ học tập của nhà trường đề ra, mong bạn cố gắng học hành thật tốt!</h3>
        <h2>Thanks You!</h2>
        </div>`,
      };
      transporter.sendMail(mailOptions);
      res.status(201).json("Send email successfully");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // thay đổi pass word
  // [put]/editPassword
  editPassword = async (req, res) => {
    // check password
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!regex.test(req.body.password))
      return res.status(400).json({
        msg: `Mật khẩu phải chứa ít nhất một chữ số [0-9]. Một ký tự Latinh viết thường [a-z]. Một ký tự Latinh viết hoa [A-Z]. Độ dài ít nhất 6 ký tự và tối đa 20 ký tự.`,
      });

    if (req.body.confirm_password !== req.body.password)
      return res
        .status(400)
        .json({ msg: "Xác nhận mật khẩu không chính xác , vui lòng thử lại" });

    const passwordHash = await bcrypt.hash(req.body.password, 10);
    try {
      await Lecturer.findOneAndUpdate(
        { email: req.body.email },
        { Password: passwordHash }
      );
      return res.status(200).json("Bạn đã đổi mật khẩu thành công!");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };
}
module.exports = new MailService();