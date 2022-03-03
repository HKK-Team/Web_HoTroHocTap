import axios from "axios";

export const sendMailOtpcode = async (...email) => {
  return await axios.put(`http://localhost:5000/sendEmail/${email}/otpCode`);
};
export const sendMailContextConfirmEmail = async (...email) => {
  return await axios.put(
    `http://localhost:5000/sendEmail/${email}/contextConfirmEmail`
  );
};
export const conFirmOtpCode = async (otp) => {
  return await axios.post(`http://localhost:5000/sendEmail/${otp}/confrimOtp`);
};
export const conFirmEmail = async (email) => {
  return await axios.post(
    `http://localhost:5000/sendEmail/${email}/conFirmEmail`
  );
};
export const sendMailWarning = async ({ ...context }) => {
  return await axios.put(
    `http://localhost:5000/sendEmail/SendMailWarning`,
    context
  );
};
export const sendMailAcademicWarning = async ({ ...context }) => {
    return await axios.put(
      `http://localhost:5000/sendEmail/SendMailAcademicWarning`,
      context
    );
};