// lấy thông tin giảng viên đăng nhập
export const getLecturersAccLogin = (state) =>
  state.LecturersAccount.LecturersAccountApi.data[0];
// lấy thông tin sinh viên đăng nhập
export const getStudentsAccLogin = (state) =>
  state.StudentsAccount.StudentsAccountApi.data[0];
