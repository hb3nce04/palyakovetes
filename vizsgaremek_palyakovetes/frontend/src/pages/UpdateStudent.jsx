import {
	Box,
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
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
	id: yup.string(),
	name: yup.string(),
	dayShift: yup.boolean(),
	classId: yup.number(),
	professionId: yup.number(),
	sectorId: yup.number(),
	categoryId: yup.number(),
	field_description: yup.string()
});

export const UpdateStudent = () => {
	const { classData } = useContext(ClassContext);
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const [categories, setCategories] = useState([]);
	const [professions, setProfessions] = useState([]);
	const [sectors, setSectors] = useState([]);
	const { studentRow, handleSet: handleStudentRow } =
		useContext(StudentRowContext);

	const formik = useFormik({
		initialValues: {
			id: "",
			name: "",
			dayShift: null,
			classId: Number(localStorage.getItem("selected_class")),
			professionId: null,
			sectorId: null,
			categoryId: null,
			description: ""
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(values);
			axios
				.put(`/students/${values.id}`, values)
				.then((res) => {
					console.log(values);
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
		}
	});

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
		new Promise((res) => {
			res(studentRow);
		}).then((id) => {
			axios
				.get(`/students/${id}`)
				.then((e) => {
					formik.setValues({
						id: e.data.id,
						name: e.data.name,
						dayShift: e.data.day_shift,
						professionId: e.data.profession_id,
						sectorId: e.data.sector_id,
						categoryId: e.data.Field?.category_id,
						description: e.data.Field?.description
					});
				})
				.catch((err) => {
					if (err.code === "ERR_NETWORK") navigate("/login");
					if (err.response?.status === 401) logout();
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
					style={{ fontWeight: "bold", textTransform: "uppercase" }}
				>
					tanuló módosítása
				</Typography>
				<h2 className="school-class-text">
					{currentClassData()?.School?.name || ""}:{" "}
					{currentClassData().name || ""}
				</h2>

				<Box
					component="form"
					onSubmit={formik.handleSubmit}
					className="formMain"
				>
					<div className="form1">
						<TextField
							value={formik.values.id}
							disabled
							fullWidth
							label="OM azonosító"
							name="id"
							autoComplete="id"
							autoFocus
						/>
						<TextField
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.name &&
								Boolean(formik.errors.name)
							}
							helperText={
								formik.touched.name && formik.errors.name
							}
							fullWidth
							label="Tanuló neve"
							name="name"
							autoComplete="name"
							autoFocus
						/>

						<FormControl>
							<InputLabel htmlFor="grouped-select">
								Szakma / Ágazat
							</InputLabel>

							<Select
								defaultValue=""
								name=""
								id="grouped-select"
								label="Szakma / Ágazat"
								value={
									(formik.values.sectorId
										? formik.values.sectorId + "s"
										: "") ||
									(formik.values.professionId
										? formik.values.professionId + "p"
										: "")
								}
								onChange={(event) => {
									if (event.target.value.includes("p")) {
										formik.setValues({
											...formik.values,
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
										formik.setValues({
											...formik.values,
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
									id="dayShift"
									name="dayShift"
									value={formik.values.dayShift}
									checked={formik.values.dayShift}
									onChange={formik.handleChange}
								/>
							}
							label="Nappali munkarend"
						/>
						<Button
							style={{
								width: "50%",
								margin: "0 auto",
								height: "80%",
								textTransform: "uppercase"
							}}
							type="submit"
							variant="contained"
						>
							tanuló módosítása
						</Button>
					</div>
					<div className="form2">
						<FormControl>
							<InputLabel id="demo-simple-select-label">
								Pálya kategóriája
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								label="Pálya kategóriája"
								value={formik.values.categoryId || ""}
								onChange={formik.handleChange}
								fullWidth
								name="categoryId"
								autoFocus
							>
								{categories.map((e, i) => {
									return (
										<MenuItem key={i} value={e.id}>
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
								value={formik.values.description}
								onChange={formik.handleChange}
								margin="normal"
								fullWidth
								name="description"
								autoFocus
							/>
						</FormControl>
					</div>
				</Box>
			</Paper>
			<Footer trademark versionNumber />
		</>
	);
};
