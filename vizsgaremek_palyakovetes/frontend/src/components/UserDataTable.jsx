import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import axios from "../utils/axios";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserToolBar } from "./custom-gridtoolbars/UserToolBar";
import { isAdmin } from "../utils/utils";
import { UserRowDeleteAction } from "./user-row-actions/UserRowDeleteAction";
import { huHU } from "@mui/x-data-grid/locales";
import { toast } from "react-toastify";
import { UserRowEditAction } from "./user-row-actions/UserRowEditAction";

export const UserDataTable = () => {
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState([]);
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const currentUserData = () => {
		let boolConvertedClassData = userData.map((o) => ({
			...o,
			admin: isAdmin(o.is_admin)
		}));
		return boolConvertedClassData;
	};

	useEffect(() => {
		axios
			.get("/users")
			.then((e) => {
				setUserData(e.data);
				setLoading(false);
			})
			.catch((err) => {
				if (err.code === "ERR_NETWORK") navigate("/login");
				if (err.response.status === 401) logout();
			});
	}, []);

	const columns = [
		{ field: "id", headerName: "OM azonosító", width: 130 },
		{ field: "admin", headerName: "Jogosultság", width: 130 },
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
						<UserRowEditAction
							params={params}
							clickEvent={onButtonClickEdit}
						/>
					</div>
				);
			}
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
						<UserRowDeleteAction
							params={params}
							clickEvent={onButtonClickDelete}
						/>
					</div>
				);
			}
		}
	];

	// FOLYAMATBAN
	const onButtonClickEdit = (e, row) => {
		e.stopPropagation();
		handleUserRow(row.id);
		navigate("/users/edit");
	};

	const onButtonClickDelete = (e, row) => {
		e.stopPropagation();
		axios
			.delete(`/users/${row.id}`)
			.then((e) => {
				toast.success(e.data.message);
				axios.get("/users").then((e) => setUserData(e.data));
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
				marginBottom: 175
			}}
		>
			<DataGrid
				localeText={huHU.components.MuiDataGrid.defaultProps.localeText}
				rows={currentUserData()}
				columns={columns}
				disableRowSelectionOnClick={true}
				pagination
				getRowId={(row) => row.id}
				rowHeight={35}
				sx={{
					border: 2,
					borderColor: "#E0E0E0"
				}}
				slots={{
					toolbar: UserToolBar
				}}
				loading={loading}
				slotProps={{
					loadingOverlay: {
						variant: "circular-progress",
						noRowsVariant: "skeleton"
					}
				}}
			/>
		</div>
	);
};
