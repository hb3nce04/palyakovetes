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
import { ClassContext } from "../contexts/ClassContext";
import { useNavigate } from "react-router-dom";
import { BackToPageButton } from "../components/BackToPageButton";
import { AuthContext } from "../contexts/AuthContext";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

const validationSchema = yup.object({
	id: yup
		.string()
		.matches(
			"^[0-9]{11}$",
			"Az OM azonosító 11 karakter hosszú és csak számot tartalmazhat"
		)
		.required(),
	name: yup
		.string()
		.matches(
			/^[^\d'"`\\]{2,100}$/,
			"A név legalább 2, legfeljebb 100 karakter lehet, nem tartalmazhat számot és speciális karaktert sem"
		)
		.required(""),
	dayShift: yup.boolean(),
	classId: yup.number(),
	professionId: yup.number(),
	sectorId: yup.number(),
	categoryId: yup.number().optional(),
	field_description: yup.string().optional()
});

export const AddNewStudent = () => {
	const { logout } = useContext(AuthContext);
	const { classData } = useContext(ClassContext);
	const navigate = useNavigate();
	const [categories, setCategories] = useState([]);
	const [professions, setProfessions] = useState([]);
	const [sectors, setSectors] = useState([]);

	const formik = useFormik({
		initialValues: {
			id: "",
			name: "",
			dayShift: false,
			classId: Number(localStorage.getItem("selected_class")),
			professionId: null,
			sectorId: null,
			categoryId: null,
			description: ""
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			axios
				.post("/students", values)
				.then((res) => {
					toast.success(res.data.message);
					navigate("/students");
				})
				.catch((err) => {
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
		axios
			.get("/categories")
			.then((e) => setCategories(e.data))
			.catch((err) => {
				if (err.code === "ERR_NETWORK") navigate("/login");
				if (err.response.status === 401) logout();
			});
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
				<BackToPageButton style={{ marginBottom: "1rem" }} />
				<Typography
					variant="h4"
					color="primary"
					className="add-new-student-text"
					style={{ fontWeight: "bold", textTransform: "uppercase" }}
				>
					új tanuló felvétele
				</Typography>
				<h2 className="school-class-text">
					{currentClassData().School?.name || ""}:{" "}
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
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.id && Boolean(formik.errors.id)
							}
							helperText={formik.touched.id && formik.errors.id}
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
										event.target.name = "szakid";
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
										event.target.name = "agazatid";
									}
								}}
							>
								<ListSubheader>Szakma</ListSubheader>

								{professions.map((e, index) => {
									return (
										<MenuItem value={e.id} key={index}>
											{e.name + " - " + e.number}
										</MenuItem>
									);
								}) || []}
								<ListSubheader>Ágazat</ListSubheader>
								{sectors.map((e, index) => {
									return (
										<MenuItem value={e.id} key={index}>
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
								height: "80%"
							}}
							type="submit"
							variant="contained"
							sx={{ textTransform: "uppercase" }}
						>
							tanuló hozzáadása
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
							>
								{categories.map((e, index) => {
									return (
										<MenuItem key={index} value={e.id}>
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
								value={formik.values.description}
								onChange={formik.handleChange}
								margin="normal"
								fullWidth
								name="description"
							/>
						</FormControl>
					</div>
				</Box>
			</Paper>
			<Footer />
		</>
	);
};
