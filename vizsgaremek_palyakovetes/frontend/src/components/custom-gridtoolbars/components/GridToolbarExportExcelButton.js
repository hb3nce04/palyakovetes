import { ListItemButton } from "@mui/material";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

export default function GridToolbarExportExcelButton({ excelData, fileName }) {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8";
  const fileExtension = ".xlsx";
  const exportToExcel = async () => {
    if (excelData.length === 0) {
      alert("Nincs kiválasztva sor...");
      return;
    }

    const ws = XLSX.utils.json_to_sheet(excelData);
    // excel oszlopszélesség
    var wscols = [
      { wch: 15 },
      { wch: 20 },
      { wch: 16 },
      { wch: 30 },
      { wch: 30 },
      { wch: 60 },
      { wch: 60 },
    ];
    ws["!cols"] = wscols;
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    wb.Sheets.data.A1.v = "OM azonosító";
    wb.Sheets.data.B1.v = "Tanuló neve";
    wb.Sheets.data.C1.v = "Munkarend";
    wb.Sheets.data.D1.v = "Szakma neve";
    wb.Sheets.data.E1.v = "Ágazat neve";
    wb.Sheets.data.F1.v = "Pálya leírása";
    wb.Sheets.data.G1.v = "Pálya megnevezése";

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
