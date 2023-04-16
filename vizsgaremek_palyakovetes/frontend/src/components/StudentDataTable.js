import * as React from "react";
import {
  DataGrid,
  GridCsvExportMenuItem,
  GridPrintExportMenuItem,
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  huHU,
} from "@mui/x-data-grid";
import {
  Button,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import GridToolbarExportExcelButton from "./custom-gridtoolbar-components/GridToolbarExportExcelButton";
import { GridToolbarImportButton } from "./custom-gridtoolbar-components/GridToolbarImportButton";
import "../css/App.css";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { GridToolbarAddNewStudentButton } from "./custom-gridtoolbar-components/GridToolbarAddNewStudentButton";
import { ClassContext } from "../context/auth/ClassContext";
import { useEffect } from "react";
import axios from "axios";
import { StudentRowContext } from "../context/auth/StudentsRowContext";
import AlertDialog from "./AlertDialog";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

export default function StudentData(props) {
  const { classData } = React.useContext(ClassContext);
  const class_id = localStorage.getItem("currentclassid");
  const { studentRow, handleSet: handleStudentRow } = React.useContext(
    StudentRowContext
  );
  const [data, setData] = React.useState([]);
  useEffect(() => {
    axios
      .post(
        "http://localhost:8080/students/studentList",
        { class_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      });
  }, []);

  const databaseLogicConverter = (a) => (a === 1 ? "Nappali" : "Esti");

  const currentStudentData = () => {
    let currStudentsData = data.filter(
      (students) => students.osztalyid == localStorage.getItem("currentclassid")
    );
    let boolConvertedClassData = currStudentsData.map((o) => ({
      ...o,
      nappali_munkarend: databaseLogicConverter(o.nappali_munkarend),
    }));
    const omitOsztalyId = boolConvertedClassData.map((e) => {
      const { osztalyid, ...arr } = e;
      return arr;
    });
    return omitOsztalyId;
  };

  const currentClassData = () => {
    if (!classData || classData.length == 0) {
      return [];
    }
    return classData.find(
      (classes) => classes.id == localStorage.getItem("currentclassid")
    );
  };
  const columns = [
    {
      field: "om_azon",
      headerName: "OM azonosító",
      width: 150,
      headerClassName: "columnsData",
    },
    {
      field: "tanulo_nev",
      headerName: "Tanuló neve",
      width: 150,
      headerClassName: "columnsData",
    },
    {
      field: "agazat_nev",
      headerName: "Ágazat",
      width: 150,
      headerClassName: "columnsData",
    },
    {
      field: "szakma_nev",
      headerName: "Szakma",
      width: 150,
      headerClassName: "columnsData",
    },
    {
      field: "nappali_munkarend",
      headerName: "Munkarend",
      width: 150,
      headerClassName: "columnsData",
    },
    {
      field: "edit",
      headerName: "Módosítás",
      sortable: false,
      disableColumnMenu: true,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <MatEdit params={params} />
          </div>
        );
      },
    },
    {
      field: "delete",
      headerName: "Törlés",
      sortable: false,
      disableColumnMenu: true,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <MatDelete params={params} />
          </div>
        );
      },
    },
  ];

  const onButtonClickEdit = (e, row) => {
    e.stopPropagation();
    handleStudentRow(row.om_azon);
    navigate("/student/update");
  };

  const onButtonClickDelete = (e, row) => {
    e.stopPropagation();
    axios.post("http://localhost:8080/students/deleteStudent", {
      om_azon: row.om_azon,
    });

    axios
      .post(
        "http://localhost:8080/students/studentList",
        { class_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      });
  };

  const MatEdit = ({ params }) => {
    return (
      <ModeEditOutlineOutlinedIcon
        onClick={(e) => {
          onButtonClickEdit(e, params.row);
        }}
        color="info"
      >
        Módosítás
      </ModeEditOutlineOutlinedIcon>
    );
  };
  const MatDelete = ({ params }) => {
    return (
      <div color="error">
        <AlertDialog
          alertButton={<DeleteForeverIcon variant="contained" color="error" />}
          dialogTitle="Biztosan szeretné törölni ezt a tanulót?"
          dialogContent={
            <table>
              <thead>
                <tr>
                  <th>{columns[0].headerName}</th>
                  <th>{columns[1].headerName}</th>
                  <th>{columns[2].headerName}</th>
                  <th>{columns[3].headerName}</th>
                  <th>{columns[4].headerName}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{params.row.om_azon}</td>
                  <td>{params.row.tanulo_nev}</td>
                  <td>{params.row.agazat_nev}</td>
                  <td>{params.row.szakma_nev}</td>
                  <td>{params.row.nappali_munkarend}</td>
                </tr>
              </tbody>
            </table>
          }
          onAgreeButtonMessage={"Igen"}
          onDisagreeButtonColor={"primary"}
          onAgreeButtonColor={"error"}
          onDisagreeButtonMessage={"Nem"}
          onAgreeEvent={(e) => {
            e.stopPropagation();
            onButtonClickDelete(e, params.row);
          }}
        />
      </div>
    );
  };

  const [selectedRows, setSelectedRows] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(25);
  const navigate = useNavigate();

  function CustomToolbar() {
    const date = new Date();

    return (
      <GridToolbarContainer>
        <GridToolbarAddNewStudentButton />
        <GridToolbarImportButton />
        <GridToolbarExportContainer>
          <GridToolbarExportExcelButton
            excelData={selectedRows}
            fileName={`Diák adatok ${date.getFullYear()}.${
              date.getMonth() + 1
            }.${date.getDate()}. ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`}
          />
          <GridCsvExportMenuItem />
          <GridPrintExportMenuItem />
        </GridToolbarExportContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }

  return (
    <div
      style={{
        height: 800,
        width: "90%",
        margin: "1rem auto",
        marginBottom: 175,
      }}
    >
      <h1>
        {currentClassData().iskola_nev} / {currentClassData().osztaly_nev}
      </h1>

      <DataGrid
        /*MUI-hoz tartozó magyar fordítás*/
        localeText={huHU.components.MuiDataGrid.defaultProps.localeText}
        rows={currentStudentData()}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick={true}
        pageSize={pageSize}
        onPageSizeChange={(newPage) => setPageSize(newPage)}
        pagination
        getRowId={(row) => row.om_azon}
        rowHeight={35}
        sx={{
          border: 2,
          borderColor: "#E0E0E0",
          /*
          '& .MuiDataGrid-cell:hover': {
            borderColor: 'primary.main',
          },
          */
        }}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = currentStudentData().filter((row) => {
            return selectedIDs.has(row.om_azon);
          });

          setSelectedRows(selectedRowData);
        }}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
