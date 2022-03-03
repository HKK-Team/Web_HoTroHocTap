import { makeStyles } from "@material-ui/styles";
import { createTheme } from "@mui/material/styles";
import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HeaderTable from "../../components/headerTable/headerTable";
import "./ViewListStudent.css";
import Loading from "./../../../utils/loading/Loading";
import { FaHome } from "react-icons/fa";
export default function ViewListStudent() {
    // get lecturer account
    const lecturer = useSelector(
        (state) =>  state.LecturersAccount.LecturersAccountApi.data[0]
    );
    // get List student from class
    const data = useSelector((state) =>
      state.StudentsAccount.StudentsAccountApi.data.filter(
        (item) =>
          item.Class === lecturer?.Class_Advisor
      )
    );
    const columns = [
    { field: "Student_Id", headerName: "Mã Sinh Viên", width: 220 },
    { field: "FullName", headerName: "Họ Tên", width: 150 },
    {
      field: "Email",
      headerName: "Email",
      width: 280,
    },
    { field: "Address", headerName: "Địa chỉ", width: 145 },
    {
        field: "Class",
        headerName: "Lớp",
        width: 150,
      },
    {
      field: "Khoa",
      headerName: "Khoa",
      width: 150,
    },
    {
      field: "Phone",
      headerName: "Số điện thoại",
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      width: 205,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/HomeLecturer/ViewListStudent/" + params.id}>
              <button className="productListEdit">Xem chi tiết quá trình học tập</button>
            </Link>
          </>
        );
      },
    },
  ];

  const defaultTheme = createTheme();

  const useStyles = makeStyles(
    (theme) => {
      return {
        root: {
          "& .MuiButton-root": {
            color: "#1976d2",
            fontWeight: "700",
          },
          "& .MuiSvgIcon-root": {
            color: "#1976d2",
            fontWeight: "700",
          },
        },
      };
    },
    { defaultTheme }
  );

  const classes = useStyles();
  if(!lecturer)
  {
    return (
      <div className="loading">
        {" "}
        <Loading />
      </div>
    );
  }
  return (
    <div className="productList">
      <HeaderTable
        title="Xem Danh Sách Sinh Viên"
        name="Danh Sách Sinh Viên"
        urlNew="/HomeLecturer/ViewListStudent"
      />
      <span><h3><FaHome/> / ViewListStudent</h3></span>
      <DataGridPro
        id = "test-table-xls-button"
        className={classes.root}
        getRowId={(row) => row._id}
        rows={data}
        disableSelectionOnClick
        columns={columns}
        initialState={{
          pinnedColumns: { left: ["Student_Id"], right: ["action"] },
        }}
        density="comfortable"
        scrollbarSize={10}
        localeText={{
          toolbarDensity: "Size",
          toolbarDensityLabel: "Size",
          toolbarDensityCompact: "Small",
          toolbarDensityStandard: "Medium",
          toolbarDensityComfortable: "Large",
        }}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
}
