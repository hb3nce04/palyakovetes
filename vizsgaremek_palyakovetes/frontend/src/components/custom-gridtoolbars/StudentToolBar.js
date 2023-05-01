import {
  GridCsvExportMenuItem,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExportContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { GridToolbarAddNewStudentButton } from "./components/GridToolbarAddNewStudentButton";
import GridToolbarExportExcelButton from "./components/GridToolbarExportExcelButton";
import { GridToolbarImportButton } from "./components/GridToolbarImportButton";

export const StudentToolBar = ({ selectedRows }) => {
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
      </GridToolbarExportContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
};
