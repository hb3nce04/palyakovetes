import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  huHU,
} from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import AlertDialog from "./AlertDialog";
import { GridToolbarAddNewUserButton } from "./custom-gridtoolbar-components/GridToolBarAddNewUserButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";
import { AuthContext } from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const UserDataTable = () => {
  const [userData, setUserData] = useState([]);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const databaseLogicConverter = (a) => (a === 1 ? "Admin" : "Felhasználó");

  const currentUserData = () => {
    let boolConvertedClassData = userData.map((o) => ({
      ...o,
      admin: databaseLogicConverter(o.admin),
    }));
    console.log(boolConvertedClassData);
    return boolConvertedClassData;
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/users/userList", { withCredentials: true })
      .then((e) => setUserData(e.data))
      .catch((err) => {
        if (err.code === "ERR_NETWORK") navigate("/login");
        if (err.response.status === 401) logout();
      });
  }, []);

  const columns = [
    { field: "om_azon", headerName: "OM azonosító", width: 130 },
    { field: "admin", headerName: "Jogosultság", width: 130 },
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

  const onButtonClickDelete = (e, row) => {
    e.stopPropagation();
    axios
      .post(
        "http://localhost:8080/users/deleteUser",
        {
          om_azon: row.om_azon,
        },
        { withCredentials: true }
      )
      .then((e) => {
        axios
          .get("http://localhost:8080/users/userList", {
            withCredentials: true,
          })
          .then((e) => setUserData(e.data));
      })
      .catch((err) => {
        if (err.response.status === 401) logout();
      });
  };

  const MatDelete = ({ params }) => {
    return (
      <div color="error">
        <AlertDialog
          alertButton={<DeleteForeverIcon variant="contained" color="error" />}
          dialogTitle="Biztosan szeretné törölni ezt a felhasználót?"
          dialogContent={
            <table>
              <thead>
                <tr>
                  <th>{columns[0].headerName}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{params.row.om_azon}</td>
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
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarAddNewUserButton />
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
      <DataGrid
        /*MUI-hoz tartozó magyar fordítás*/
        localeText={huHU.components.MuiDataGrid.defaultProps.localeText}
        rows={currentUserData()}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick={true}
        //pageSize={pageSize}
        //onPageSizeChange={(newPage) => setPageSize(newPage)}
        pagination
        getRowId={(row) => row.om_azon}
        //getRowId={(row) => row.om_azon}
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
        /*onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = currentStudentData().filter((row) => {
            return selectedIDs.has(row.om_azon);
          });
      

          setSelectedRows(selectedRowData);
          
        }}*/
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};
