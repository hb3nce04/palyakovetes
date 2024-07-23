import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography
} from "@mui/material";
import axios from "../utils/axios";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackToPageButton } from "../components/BackToPageButton";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
	id: yup.string(),
	finishingYear: yup.number().required("Az év megadása kötelező"),
	schoolId: yup.number(),
	name: yup.string()
});

export const AddClass = () => {
	const navigate = useNavigate();
	const { logout } = useContext(AuthContext);
	const { currentUser } = useContext(AuthContext);
	const year = new Date().getFullYear();
	const years = Array.from(new Array(25), (val, index) =>
		String(year - index)
	);
	const { schools, setSchools } = useState([]);
	const formik = useFormik({
		initialValues: {
			id: currentUser.id,
			name: "",
			finishingYear: 2024,
			schoolId: 0
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			axios
				.post("/classes", values)
				.then((res) => {
					toast.success(res.data.message);
					navigate("/class/choose");
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
	useEffect(() => {
		axios
			.get("/schools")
			.then((e) => {
				setSchools(e.data);
				console.log(schools);
			})
			.catch((err) => {
				if (err.code === "ERR_NETWORK") navigate("/login");
				if (err.response?.status === 401) logout();
			});
	}, []);

	return (
		<>
			<Nav />
			<Paper elevation={2} className="wrapper">
				<BackToPageButton
					style={{ marginBottom: "1rem" }}
					onClick={() => {
						navigate("/class/choose");
					}}
				/>
				<Typography
					variant="h4"
					color="primary"
					className="add-new-student-text"
					style={{ marginBottom: "1rem", fontWeight: "bold" }}
				>
					OSZTÁLY FELVÉTELE
				</Typography>

				<Box
					component="form"
					onSubmit={formik.handleSubmit}
					className="form1"
				>
					<TextField
						value={formik.values.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.name && Boolean(formik.errors.name)
						}
						helperText={formik.touched.name && formik.errors.name}
						fullWidth
						label="Osztály neve"
						name="name"
						autoFocus
					/>
					<FormControl>
						<InputLabel id="demo-simple-select-label">
							Végzési év
						</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							label="Végzési év"
							value={formik.values.finishingYear}
							onChange={formik.handleChange}
							name="finishingYear"
						>
							{years.map((s, index) => {
								return (
									<MenuItem key={index} value={s}>
										{s}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<FormControl>
						<InputLabel id="demo-simple-select-label2">
							Iskola
						</InputLabel>
						<Select
							labelId="demo-simple-select-label2"
							id="demo-simple-select2"
							label="Iskola"
							name="schoolId"
							value={formik.values.schoolId}
							onChange={formik.handleChange}
						>
							{schools?.map((e, index) => {
								return (
									<MenuItem key={index} value={e.id}>
										{e.name}
									</MenuItem>
								);
							}) && "Loading..."}
						</Select>
					</FormControl>
					<Button type="submit" variant="contained">
						OSZTÁLY FELVÉTELE
					</Button>
				</Box>
			</Paper>
			<Footer trademark versionNumber />
		</>
	);
};
