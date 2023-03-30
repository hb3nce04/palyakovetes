import { ListItemButton } from "@mui/material";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

export default function GridToolbarExportExcelButton({ excelData, fileName }) {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      <ListItemButton onClick={(e) => exportToExcel(fileName)}>
        Mentés Excel fájlként
      </ListItemButton>
    </>
  );
}
