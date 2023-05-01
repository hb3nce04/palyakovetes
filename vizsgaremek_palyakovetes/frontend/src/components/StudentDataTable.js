import * as React from "react";
import { DataGrid, huHU } from "@mui/x-data-grid";
import "../css/App.css";
import { useNavigate } from "react-router-dom";
import { ClassContext } from "../context/auth/ClassContext";
import { useEffect } from "react";
import axios from "axios";
import { StudentRowContext } from "../context/auth/StudentsRowContext";
import { AuthContext } from "../context/auth/AuthContext";
import { StudentToolBar } from "./custom-gridtoolbars/StudentToolBar";
import { workScheduleFromDatabaseLogicConverter } from "../utils/utils";
import { StudentRowViewAction } from "./student-row-actions/StudentRowViewAction";
import { StudentRowEditAction } from "./student-row-actions/StudentRowEditAction";
import { StudentRowDeleteAction } from "./student-row-actions/StudentRowDeleteAction";

export default function StudentData(props) {
  const { classData } = React.useContext(ClassContext);
  const class_id = localStorage.getItem("currentclassid");
  const { studentRow, handleSet: handleStudentRow } = React.useContext(
    StudentRowContext
  );
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(25);
  const navigate = useNavigate();
  const { currentUser, logout } = React.useContext(AuthContext);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    fetchPalyaWithStudents();
  }, []);

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
      field: "leiras",
      headerName: "Pálya leírása",
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
            <StudentRowViewAction
              params={params}
              clickEvent={onButtonClickView}
            />
          </div>
        );
      },
    },
    {
      field: "megnevezes",
      headerName: "Pálya megnevezése",
      disableColumnMenu: true,
      width: 140,
      disableClickEventBubbling: true,
    },
    {
      field: "edit",
      headerName: "Módosítás",
      sortable: false,
      disableColumnMenu: true,
      width: 140,
      disableExport: true,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <StudentRowEditAction
              params={params}
              clickEvent={onButtonClickEdit}
            />
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
      disableExport: true,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <StudentRowDeleteAction
              params={params}
              clickEvent={onButtonClickDelete}
            />
          </div>
        );
      },
    },
  ];

  const fetchStudents = () => {
    return axios
      .post(
        "http://localhost:8080/students/studentList",
        { class_id },
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((err) => {
        if (err.code === "ERR_NETWORK") navigate("/login");
        if (err.response.status === 401) logout();
      });
  };
  const fetchPalya = (studentOM) => {
    return axios
      .post(
        "http://localhost:8080/students/getPalya",
        { om_azon: studentOM },
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((err) => {
        if (err.code === "ERR_NETWORK") navigate("/login");
        if (err.response.status === 401) logout();
      });
  };

  const fetchPalyaWithStudents = () => {
    const arr = [];
    fetchStudents()
      .then((e) => {
        return e.data;
      })
      .then((students) => {
        return students.map((item) => {
          return fetchPalya(item.om_azon)
            .then((e) => {
              arr.push(e.data);
              return [arr, students];
            })
            .then((e) => {
              const mergedData = e[1].map((data) => {
                return {
                  ...data,
                  ...e[0].find(
                    (newData) => newData.diak_om_azon === data.om_azon
                  ),
                };
              });
              const omitDuplicateOmIdentifier = mergedData.map(
                ({ diak_om_azon, ...data }) => {
                  return data;
                }
              );
              setData(omitDuplicateOmIdentifier);
            });
        });
      });
  };

  const currentStudentData = () => {
    let currStudentsData = data.filter(
      (students) => students.osztalyid == localStorage.getItem("currentclassid")
    );
    let boolConvertedClassData = currStudentsData.map((o) => ({
      ...o,
      nappali_munkarend: workScheduleFromDatabaseLogicConverter(
        o.nappali_munkarend
      ),
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

  const onButtonClickEdit = (e, row) => {
    e.stopPropagation();
    handleStudentRow(row.om_azon);
    navigate("/student/update");
  };

  const onButtonClickView = (e, row) => {
    e.stopPropagation();
  };

  const onButtonClickDelete = (e, row) => {
    e.stopPropagation();
    axios
      .post(
        "http://localhost:8080/students/deleteStudent",
        {
          om_azon: row.om_azon,
        },
        { withCredentials: true }
      )
      .then((e) => {
        fetchPalyaWithStudents();
        if (data.length <= 1) window.location.reload();
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") navigate("/login");
        if (err.response.status === 401) logout();
      });
  };

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
        {currentClassData()
          ? currentClassData().iskola_nev
          : navigate("/classchooser")}{" "}
        {currentClassData() ? currentClassData().osztaly_nev : ""}
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
        }}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = currentStudentData().filter((row) => {
            return selectedIDs.has(row.om_azon);
          });

          setSelectedRows(selectedRowData);
        }}
        components={{
          Toolbar: StudentToolBar,
        }}
        componentsProps={{
          toolbar: { selectedRows },
        }}
      />
    </div>
  );
}
