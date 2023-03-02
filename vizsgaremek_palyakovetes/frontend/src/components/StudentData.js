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
  huHU
} from "@mui/x-data-grid";

import ExportExcel from "./ExportExcel";
import { GridToolbarImportButton } from "./GridToolbarImportButton";
import "../css/App.css";

const data = {

  columns: [
    { field: "id", headerName: "ID", width: 70 ,headerClassName: 'columnsData'},
    { field: "firstName", headerName: "First name", width: 130,headerClassName: 'columnsData' },
    { field: "lastName", headerName: "Last name", width: 130,headerClassName: 'columnsData' },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
      headerClassName: 'columnsData'
    },
    {
      field: "fullName",
      headerClassName: 'columnsData',
      headerName: "Full name",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ],
  rows: [{ id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 10, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 11, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 12, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 13, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 14, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 15, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 16, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 17, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 18, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 19, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 20, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 21, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 22, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 23, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 24, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 25, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 26, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 27, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 28, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 29, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 30, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 31, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 32, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 33, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 34, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 35, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 36, lastName: "Roxie", firstName: "Harvey", age: 65 },
]
}

export default function StudentData() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(25);

  function CustomToolbar() {
    const date = new Date();
  
    return (
      <GridToolbarContainer>
        <GridToolbarImportButton/>
          <GridToolbarExportContainer>
            <ExportExcel
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
    <div style={{ height: 800, width: "90%", margin: "1rem auto" }}>
      <DataGrid
        /*MUI-hoz tartozó magyar fordítás*/
        localeText={huHU.components.MuiDataGrid.defaultProps.localeText}
        pageSize={pageSize}
        onPageSizeChange={(newPage) => setPageSize(newPage)}
        pagination
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
          const selectedRowData = data.rows.filter((row) => {
            return selectedIDs.has(row.id)
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
