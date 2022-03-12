import axios from "axios";

export const sendMailOtpcode = async (...email) => {
  return await axios.put(`/sendEmail/${email}/otpCode`);
};
export const sendMailContextConfirmEmail = async (...email) => {
  return await axios.put(
    `/sendEmail/${email}/contextConfirmEmail`
  );
};
export const conFirmOtpCode = async (otp) => {
  return await axios.post(`/sendEmail/${otp}/confrimOtp`);
};
export const conFirmEmail = async (email) => {
  return await axios.post(
    `/sendEmail/${email}/conFirmEmail`
  );
};
export const sendMailWarning = async ({ ...context }) => {
  return await axios.put(
    `/sendEmail/SendMailWarning`,
    context
  );
};
export const sendMailAcademicWarning = async ({ ...context }) => {
    return await axios.put(
      `http://localhost:5000/sendEmail/SendMailAcademicWarning`,
      context
    );
};
export const sendMailStopAcademic = async ({ ...context }) => {
  return await axios.put(
    `http://localhost:5000/sendEmail/SendMailStopAcademic`,
    context
  );
};