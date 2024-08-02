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
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
	id: yup.string(),
	finishingYear: yup.number().required("Az év megadása kötelező"),
	schoolId: yup.number(),
	name: yup
		.string()
		.matches(
			/^[^'"`\\;=()]{2,50}$/,
			"Az osztály neve legalább 2, legfeljebb 50 karakter hosszú lehet és csak megfelelő elválasztót tartalmazhat"
		)
		.required("Név megadása kötelező")
});

export const AddClass = () => {
	const navigate = useNavigate();
	const { logout } = useContext(AuthContext);
	const { currentUser } = useContext(AuthContext);
	const year = new Date().getFullYear();
	const years = Array.from(new Array(25), (val, index) =>
		String(year - index)
	);
	const [schools, setSchools] = useState();
	const formik = useFormik({
		initialValues: {
			id: currentUser.id,
			name: "",
			finishingYear: new Date().getFullYear(),
			schoolId: ""
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			axios
				.post("/classes", values)
				.then((res) => {
					toast.success(res.data.message);
					navigate("/classes");
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
				<BackToPageButton style={{ marginBottom: "1rem" }} />
				<Typography
					variant="h4"
					color="primary"
					className="add-new-student-text"
					style={{
						marginBottom: "1rem",
						fontWeight: "bold",
						textTransform: "uppercase"
					}}
				>
					osztály felvétele
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
						sx={{ mb: 3 }}
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
							sx={{ mb: 3 }}
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
							sx={{ mb: 3 }}
						>
							{schools?.map((e, index) => {
								return (
									<MenuItem key={index} value={e.id}>
										{e.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<Button
						type="submit"
						variant="contained"
						sx={{ textTransform: "uppercase" }}
					>
						osztály felvétele
					</Button>
				</Box>
			</Paper>
			<Footer />
		</>
	);
};
