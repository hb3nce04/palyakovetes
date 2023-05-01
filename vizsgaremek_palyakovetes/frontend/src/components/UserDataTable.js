import { DataGrid, huHU } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserToolBar } from "./custom-gridtoolbars/UserToolBar";
import { isAdminFromDatabaseLogicConverter } from "../utils/utils";
import { UserRowDeleteAction } from "./user-row-actions/UserRowDeleteAction";

export const UserDataTable = () => {
  const [userData, setUserData] = useState([]);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const currentUserData = () => {
    let boolConvertedClassData = userData.map((o) => ({
      ...o,
      admin: isAdminFromDatabaseLogicConverter(o.admin),
    }));
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
            <UserRowDeleteAction
              params={params}
              clickEvent={onButtonClickDelete}
            />
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
      <DataGrid
        /*MUI-hoz tartozó magyar fordítás*/
        localeText={huHU.components.MuiDataGrid.defaultProps.localeText}
        rows={currentUserData()}
        columns={columns}
        disableRowSelectionOnClick={true}
        pagination
        getRowId={(row) => row.om_azon}
        rowHeight={35}
        sx={{
          border: 2,
          borderColor: "#E0E0E0",
        }}
        components={{
          Toolbar: UserToolBar,
        }}
      />
    </div>
  );
};
