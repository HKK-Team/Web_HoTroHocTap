import { makeStyles } from "@material-ui/styles";
import { createTheme } from "@mui/material/styles";
import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import "./ViewStatusStudent.css";


export default function SubjectsList() {
    // get lecturer account
    const lecturer = useSelector(
        (state) =>  state.LecturersAccount.LecturersAccountApi.data[0]
    );
    // get List student from class
    const data = useSelector((state) =>
    state.StudentsAccount.StudentsAccountApi.data.filter(
      (item) =>
        item.Class === lecturer.Class_Advisor
    )
    );
    const columns = [
    { field: "_id", headerName: "ID", width: 220 },
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
      width: 202,
      renderCell: (params) => {
        return (
          <>
            {/* <Link to={"/HomeLecturer/ViewListStudent/" + params.id}></Link> */}
              <button className="productListEdit">Gửi mail cảnh cáo</button>
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

  return (
    <div className="productList">
      <div className="header-table">
        <h1 className="header-table-title">Thống Kê Quá Tình Trạng Sinh Viên</h1>
      </div>
      <DataGridPro
        className={classes.root}
        getRowId={(row) => row._id}
        rows={data}
        disableSelectionOnClick
        columns={columns}
        initialState={{
          pinnedColumns: { left: ["_id"], right: ["action"] },
        }}
        density="compact"
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