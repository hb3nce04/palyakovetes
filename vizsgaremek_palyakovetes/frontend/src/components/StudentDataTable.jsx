import { DataGrid } from "@mui/x-data-grid";
import "../css/App.css";
import { useNavigate } from "react-router-dom";
import { ClassContext } from "../context/ClassContext";
import { useEffect, useContext, useState } from "react";
import axios from "../utils/axios";
import { StudentRowContext } from "../context/StudentsRowContext";
import { AuthContext } from "../context/AuthContext";
import { StudentToolBar } from "./custom-gridtoolbars/StudentToolBar";
import { workScheduleFromDatabaseLogicConverter } from "../utils/utils";
import { StudentRowViewAction } from "./student-row-actions/StudentRowViewAction";
import { StudentRowEditAction } from "./student-row-actions/StudentRowEditAction";
import { StudentRowDeleteAction } from "./student-row-actions/StudentRowDeleteAction";
import { toast } from "react-toastify";

export default function StudentData(props) {
	const { classData } = useContext(ClassContext);
	const class_id = localStorage.getItem("selected_class");
	const { studentRow, handleSet: handleStudentRow } =
		useContext(StudentRowContext);
	const [selectedRows, setSelectedRows] = useState([]);
	const [pageSize, setPageSize] = useState(25);
	const navigate = useNavigate();
	const { currentUser, logout } = useContext(AuthContext);
	const [data, setData] = useState([]);

	useEffect(() => {
		fetchPalyaWithStudents();
	}, []);

	const columns = [
		{
			field: "id",
			headerName: "OM azonosító",
			width: 150,
			headerClassName: "columnsData"
		},
		{
			field: "name",
			headerName: "Tanuló neve",
			width: 150,
			headerClassName: "columnsData"
		},
		{
			field: "sector_name",
			headerName: "Ágazat",
			width: 150,
			headerClassName: "columnsData"
		},
		{
			field: "profession_name",
			headerName: "Szakma",
			width: 150,
			headerClassName: "columnsData"
		},
		{
			field: "day_shift",
			headerName: "Munkarend",
			width: 150,
			headerClassName: "columnsData"
		},
		{
			field: "description",
			headerName: "Pálya megtekintése",
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
			}
		},
		{
			field: "field_description",
			headerName: "Pálya leírása",
			disableColumnMenu: true,
			width: 140,
			disableClickEventBubbling: true
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
			}
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
			}
		}
	];

	const fetchStudents = () => {
		return axios.get(`/classes/${class_id}/students`).catch((err) => {
			if (err.code === "ERR_NETWORK") navigate("/login");
			if (err.response.status === 401) logout();
		});
	};
	const fetchPalya = (id) => {
		return axios.get(`/students/${id}/field`).catch((err) => {
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
					return fetchPalya(item.id)
						.then((e) => {
							arr.push(e.data);
							return [arr, students];
						})
						.then((e) => {
							const mergedData = e[1].map((data) => {
								return {
									...data,
									...e[0].find(
										(newData) => newData.id === data.id
									)
								};
							});
							const omitDuplicateOmIdentifier = mergedData.map(
								({ ...data }) => {
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
			(students) =>
				students.class_id == localStorage.getItem("selected_class")
		);
		let boolConvertedClassData = currStudentsData.map((o) => ({
			...o,
			day_shift: workScheduleFromDatabaseLogicConverter(o.day_shift)
		}));
		let convertNames = boolConvertedClassData.map((o) => ({
			...o,
			sector_name: o.Sector?.name,
			profession_name: o.Profession.name,
			field_description: o.Field?.description
		}));
		const omitOsztalyId = convertNames.map((e) => {
			const { ...arr } = e;
			return arr;
		});
		return omitOsztalyId;
	};

	const currentClassData = () => {
		if (!classData || classData.length == 0) {
			return [];
		}
		return classData.find(
			(classes) => classes.id == localStorage.getItem("selected_class")
		);
	};

	const onButtonClickEdit = (e, row) => {
		e.stopPropagation();
		handleStudentRow(row.id);
		navigate("/student/update");
	};

	const onButtonClickView = (e, row) => {
		e.stopPropagation();
	};

	const onButtonClickDelete = (e, row) => {
		e.stopPropagation();
		axios
			.delete(`/students/${row.id}`)
			.then((e) => {
				toast.success(e.data.message);
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
				marginBottom: 175
			}}
		>
			<h1>
				{currentClassData()?.School?.name || ""}:{" "}
				{currentClassData()?.name || ""}
			</h1>

			<DataGrid
				/*MUI-hoz tartozó magyar fordítás hiányos*/
				rows={currentStudentData()}
				columns={columns}
				checkboxSelection
				disableRowSelectionOnClick={true}
				pageSize={pageSize}
				onPageSizeChange={(newPage) => setPageSize(newPage)}
				pagination
				getRowId={(row) => row.id}
				rowHeight={35}
				sx={{
					border: 2,
					borderColor: "#E0E0E0"
				}}
				onSelectionModelChange={(ids) => {
					const selectedIDs = new Set(ids);
					const selectedRowData = currentStudentData().filter(
						(row) => {
							return selectedIDs.has(row.om_azon);
						}
					);

					setSelectedRows(selectedRowData);
				}}
				components={{
					Toolbar: StudentToolBar
				}}
				componentsProps={{
					toolbar: { selectedRows }
				}}
			/>
		</div>
	);
}
