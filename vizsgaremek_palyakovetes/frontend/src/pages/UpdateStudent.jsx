import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	InputLabel,
	ListSubheader,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography
} from "@mui/material";
import axios from "../utils/axios";
import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { ClassContext } from "../context/ClassContext";
import { useNavigate } from "react-router-dom";
import { StudentRowContext } from "../context/StudentsRowContext";
import { BackToPageButton } from "../components/BackToPageButton";
import { AuthContext } from "../context/AuthContext";
import { studentNameRegexPattern } from "../utils/utils";
import { toast } from "react-toastify";

export const UpdateStudent = () => {
	const { classData } = useContext(ClassContext);
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const [categories, setCategories] = useState([]);
	const [professions, setProfessions] = useState([]);
	const [sectors, setSectors] = useState([]);
	const [valid, setValid] = useState(true);
	const { studentRow, handleSet: handleStudentRow } =
		useContext(StudentRowContext);

	const [formData, setFormData] = useState({
		id: "",
		name: "",
		dayShift: null,
		classId: Number(localStorage.getItem("selected_class")),
		professionId: null,
		sectorId: null,
		categoryId: null,
		field_description: ""
	});

	const handleUpdateStudent = () => {
		axios
			.put(`/students/${formData.id}`, formData)
			.then((res) => {
				toast.success(res.data.message);
				navigate("/");
			})
			.catch((err) => {
				if (err.response.data.message) {
					toast.error(err.response.data.message);
				}
				if (err.code === "ERR_NETWORK") navigate("/login");
				if (err.response.status === 401) logout();
			});
	};

	const currentClassData = () => {
		if (!classData) {
			return [];
		}
		return (
			classData.find(
				(classes) =>
					classes.id == localStorage.getItem("selected_class")
			) || []
		);
	};

	useEffect(() => {
		new Promise((res, rej) => {
			res(studentRow);
		}).then((id) => {
			axios
				.get(`/students/${id}`)
				.then((e) => {
					console.log(e.data);
					setFormData({
						id: e.data.id,
						name: e.data.name || "",
						dayShift: e.data.day_shift,
						professionId: e.data.profession_id || null,
						sectorId: e.data.sector_id || null,
						description: e.data.Field.description || "",
						categoryId: e.data.Field.category_id || null
					});
				})
				.catch((err) => {
					if (err.code === "ERR_NETWORK") navigate("/login");
					if (err.response.status === 401) logout();
				});
		});

		axios.get("/categories").then((e) => setCategories(e.data));
		axios
			.get("/professions")
			.then((e) => {
				const updatedArray = e.data.map((obj) => {
					const updatedObj = { ...obj };

					if (typeof obj.id === "number") {
						updatedObj.id = obj.id + "p";
					}
					return updatedObj;
				});
				return updatedArray;
			})
			.then((e) => {
				setProfessions(e);
			})
			.catch((err) => {
				if (err.code === "ERR_NETWORK") navigate("/login");
				if (err.response.status === 401) logout();
			});

		axios
			.get("/sectors")
			.then((e) => {
				const updatedArray = e.data.map((obj) => {
					const updatedObj = { ...obj };
					if (typeof obj.id === "number") {
						updatedObj.id = obj.id + "s";
					}
					return updatedObj;
				});
				return updatedArray;
			})
			.then((e) => {
				setSectors(e);
			})
			.catch((err) => {
				if (err.code === "ERR_NETWORK") navigate("/login");
				if (err.response.status === 401) logout();
			});
	}, []);

	return (
		<>
			<Nav />
			<Paper elevation={2} className="wrapper">
				<BackToPageButton
					style={{ marginBottom: "1rem" }}
					onClick={() => {
						navigate("/");
					}}
				/>
				<Typography
					variant="h4"
					color="primary"
					className="add-new-student-text"
					style={{ fontWeight: "bold" }}
				>
					TANULÓ MÓDOSÍTÁSA
				</Typography>
				<h2 className="school-class-text">
					{currentClassData()?.School?.name || ""} :{" "}
					{currentClassData().name || ""}
				</h2>

				<div className="formMain">
					<div className="form1">
						<TextField
							value={formData?.id || ""}
							disabled
							required
							fullWidth
							label="OM azonosító"
							name="id"
							autoComplete="id"
							autoFocus
							inputProps={{ inputMode: "", pattern: "" }}
						/>
						<TextField
							helperText={
								formData.name.trim() === ""
									? "Kérjük, írja be egy tanuló nevét!"
									: " " &&
									  studentNameRegexPattern.test(
											formData.name
									  ) === false
									? "A megadott név nem felel meg a formátumnak."
									: " " || setValid(true)
							}
							error={!valid}
							value={formData?.name || ""}
							onChange={({ target: { name, value } }) => {
								setFormData({ ...formData, [name]: value });
								setValid(studentNameRegexPattern.test(value));
							}}
							required
							fullWidth
							label="Tanuló neve"
							name="name"
							autoComplete="name"
							autoFocus
							inputProps={{ pattern: studentNameRegexPattern }}
						/>

						<FormControl required>
							<InputLabel htmlFor="grouped-select">
								Szakma / Ágazat
							</InputLabel>

							<Select
								defaultValue=""
								name=""
								id="grouped-select"
								label="Szakma / Ágazat"
								value={
									(formData.sectorId
										? formData.sectorId + "s"
										: "") ||
									(formData.professionId
										? formData.professionId + "p"
										: "")
								}
								onChange={(event) => {
									if (event.target.value.includes("p")) {
										setFormData({
											...formData,
											professionId: Number(
												event.target.value.replace(
													"p",
													""
												)
											),
											sectorId: null
										});
										event.target.name = "professionId";
									}
									if (event.target.value.includes("s")) {
										setFormData({
											...formData,
											sectorId: Number(
												event.target.value.replace(
													"s",
													""
												)
											),
											professionId: null
										});
										event.target.name = "sectorId";
									}
								}}
							>
								<ListSubheader>Szakma</ListSubheader>

								{professions.map((e) => {
									return (
										<MenuItem value={e.id} key={e.id}>
											{e.name + " - " + e.number}
										</MenuItem>
									);
								}) || []}
								<ListSubheader>Ágazat</ListSubheader>
								{sectors.map((e) => {
									return (
										<MenuItem value={e.id} key={e.id}>
											{e.name + " - " + e.number}
										</MenuItem>
									);
								}) || []}
							</Select>
						</FormControl>
						<FormControlLabel
							control={
								<Checkbox
									value={formData?.dayShift}
									checked={
										formData.dayShift === 1 ? true : false
									}
									onChange={(event) => {
										setFormData({
											...formData,
											dayShift: event.target.checked
												? 1
												: 0
										});
									}}
								/>
							}
							label="Nappali munkarend"
						/>
						<Button
							style={{
								width: "50%",
								margin: "0 auto",
								height: "80%"
							}}
							onClick={(event) => {
								if (valid) handleUpdateStudent();
							}}
							variant="contained"
						>
							TANULÓ MÓDOSÍTÁSA
						</Button>
					</div>
					<div className="form2">
						<FormControl required>
							<InputLabel id="demo-simple-select-label">
								Pálya kategóriája
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								label="Pálya kategóriája"
								value={formData?.categoryId || ""}
								onChange={({ target: { name, value } }) => {
									setFormData({ ...formData, [name]: value });
								}}
								fullWidth
								name="categoryId"
								autoFocus
								inputProps={{ inputMode: "", pattern: "" }}
							>
								{categories.map((e) => {
									return (
										<MenuItem value={e.id}>
											{e.name}
										</MenuItem>
									);
								}) || []}
							</Select>

							<TextField
								id="outlined-multiline-static"
								label="Pálya leírása"
								helperText={
									"A pálya leírása maximum 255 karakter hosszú lehet."
								}
								multiline
								rows={10}
								defaultValue=""
								value={formData?.description || ""}
								onChange={({ target: { name, value } }) => {
									setFormData({ ...formData, [name]: value });
								}}
								margin="normal"
								required
								fullWidth
								name="description"
								autoFocus
								inputProps={{ inputMode: "", pattern: "" }}
							/>
						</FormControl>
					</div>
				</div>
			</Paper>
			<Footer trademark versionNumber />
		</>
	);
};
