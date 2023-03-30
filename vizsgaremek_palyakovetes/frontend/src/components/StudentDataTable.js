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
import { FormControlLabel, IconButton, Typography } from "@mui/material";
import GridToolbarExportExcelButton from "./custom-gridtoolbar-components/GridToolbarExportExcelButton";
import { GridToolbarImportButton } from "./custom-gridtoolbar-components/GridToolbarImportButton";
import "../css/App.css";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import {useNavigate} from 'react-router-dom';
import { GridToolbarAddNewStudentButton } from "./custom-gridtoolbar-components/GridToolbarAddNewStudentButton";
import { ClassContext } from "../context/auth/ClassContext";

export default function StudentData() {

  const databaseLogicConverter = a => a === 1 ? "Nappali" : "Éjszakai";  

  const currentStudentData = () => {
    console.log(studentRows.classData.tanulok);
    let currClassData =  studentRows.classData.tanulok.filter(students => students.osztalyid == localStorage.getItem("currentclassid"))
    let boolConvertedClassData = currClassData.map(o => ({ ...o, nappali_munkarend: databaseLogicConverter(o.nappali_munkarend) }));
    return boolConvertedClassData;
  }

  const currentClassData = () => {
    return studentRows.classData.osztalyok.find(classes => classes.id == localStorage.getItem("currentclassid"))
    
  }

  
  const studentRows = React.useContext(ClassContext);
  
  const [data,setData] = React.useState({
    columns: [
      { field: "om_azon", headerName: "OM azonosító", width: 150 ,headerClassName: 'columnsData'},
      { field: "tanulo_nev", headerName: "Tanuló neve", width: 150 ,headerClassName: 'columnsData'},
      { field: "agazat_nev", headerName: "Ágazat", width: 150 ,headerClassName: 'columnsData'},
      { field: "szakma_nev", headerName: "Szakma", width: 150 ,headerClassName: 'columnsData'},
      { field: "nappali_munkarend", headerName: "Munkarend", width: 150 ,headerClassName: 'columnsData'},
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
              <MatEdit index={params.row.id} />
            </div>
          );
        }
      }
    ],
    rows:currentStudentData()
  });

  const MatEdit = ({ index,prop }) => {
    const handleEditClick = () => {
      navigate(`/student/${index}/update`,{replace:true});
    };
  
    return (
      
        <FormControlLabel
          control={
            <IconButton
              color="secondary"
              aria-label="add an alarm"
              onClick={handleEditClick}
            >
              <ModeEditOutlineOutlinedIcon color="primary"/>
            </IconButton>
        }
      />
      
    );
  };

  const [selectedRows, setSelectedRows] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(25);
  const navigate = useNavigate();
  

  function CustomToolbar() {
    const date = new Date();
  
    return (
      <GridToolbarContainer>
        <GridToolbarAddNewStudentButton/>
        <GridToolbarImportButton/>
          <GridToolbarExportContainer>
            <GridToolbarExportExcelButton
              excelData={selectedRows}
              fileName={`Diák adatok ${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}. ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`}
            />
          <GridCsvExportMenuItem />
          <GridPrintExportMenuItem />
        </GridToolbarExportContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector  />
      </GridToolbarContainer>
    );
  }

  return (
    

    <div style={{ height: 800, width: "90%", margin: "1rem auto", marginBottom: 175 }}>
      <h1>{currentClassData().iskola_nev} / {currentClassData().osztaly_nev}</h1>

      <DataGrid
      
        /*MUI-hoz tartozó magyar fordítás*/
        localeText={huHU.components.MuiDataGrid.defaultProps.localeText} 
        pageSize={pageSize}
        onPageSizeChange={(newPage) => setPageSize(newPage)}
        pagination
        getRowId={row => row.om_azon}
        rowHeight={35}
        checkboxSelection
        columns={data.columns}
        sx={{
          border: 4,
          borderColor: '#E0E0E0'
          /*
          '& .MuiDataGrid-cell:hover': {
            borderColor: 'primary.main',
          },
          */
        }}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = currentStudentData().filter((row) => {
            return selectedIDs.has(row.om_azon)
          }
          );

          setSelectedRows(selectedRowData);
          console.log(selectedRowData);
        }}
        components={{
          Toolbar: CustomToolbar,
        }}
        {...data}
      />
    </div>
  );
}
