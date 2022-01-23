import { makeStyles } from "@material-ui/styles";
import { createTheme } from "@mui/material/styles";
import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";
import { useSelector } from "react-redux";
import {useParams } from "react-router-dom";
import "./ViewStudentDetail.css";


export default function ViewStudentDetail() {
    const param = useParams();
    // get List student from class
    const data = useSelector((state) =>
        state.SubjectScoreClass.SubjectScoreClassApi.data.filter(
        (item) =>
            item.Student_Id === param.studentId
        )
    );
    console.log(data);
    const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    { field: "Subject_Name", headerName: "Tên môn học", width: 360 },
    {
      field: "Subject_Id",
      headerName: "Mã môn học",
      width: 110,
    },
    {
        field: "Number_Of_Credits",
        headerName: "Số tín chỉ",
        width: 90,
    },
    { field: "Class_Subject_Id", headerName: "Mã lớp học", width: 100 },
    {
      field: "Education_Program",
      headerName: "Chương trình đào tạo",
      width: 150,
    },
    {
        field: "Process_Score",
        headerName: "Điểm quá trình",
        width: 130,
    }
    ,
    {
        field: "Final_Exam_Score",
        headerName: "Điểm thi",
        width: 130,
    },
    {
        field: "Final_Score",
        headerName: "Điểm tông kết",
        width: 120,
    }
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
        <h1 className="header-table-title">Thống Kê Quá Trình Học Tập</h1>
      </div>
      <DataGridPro
        className={classes.root}
        getRowId={(row) => row._id}
        rows={data}
        disableSelectionOnClick
        columns={columns}
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
