import {
	Button,
	Paper,
	Switch,
	TextField,
	Typography,
	Box
} from "@mui/material";
import axios from "../../utils/axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BackToPageButton } from "../../components/BackToPageButton";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import { AuthContext } from "../../context/AuthContext";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
	id: yup
		.string()
		.required("OM azonosító megadása kötelező")
		.min(
			11,
			"Az OM azonosítónak pontosan 11 karakter hosszúnak kell lennie"
		)
		.max(
			11,
			"Az OM azonosítónak pontosan 11 karakter hosszúnak kell lennie"
		),
	password: yup
		.string()
		.min(8, "A jelszónak legalább 8 karakter hosszúnak kell lennie")
		.max(24, "A jelszónak legfeljebb 24 karakter hosszúnak kell lennie")
		.required("Jelszó megadása kötelező"),
	admin: yup.boolean()
});

export const AddUser = () => {
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			id: "",
			password: "",
			admin: false
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			axios
				.post("/auth/register", {
					...values,
					admin: values.admin ? 1 : 0
				})
				.then((res) => {
					// toast
					navigate("/admin/users/list");
				})
				.catch((err) => {
					// toast
					if (err.response.status === 401) logout();
				});
		}
	});

	return (
		<>
			<Nav />
			<Paper elevation={2} className="wrapper">
				<BackToPageButton
					style={{ marginBottom: "1rem" }}
					onClick={() => {
						navigate("/admin/users/list");
					}}
				/>
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
					új felhasználó létrehozása
				</Typography>

				<Box
					component="form"
					onSubmit={formik.handleSubmit}
					className="form1"
				>
					<TextField
						value={formik.values.id}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.id && Boolean(formik.errors.id)}
						helperText={formik.touched.id && formik.errors.id}
						fullWidth
						label="OM azonosító"
						name="id"
						autoComplete="id"
						autoFocus
					/>
					<TextField
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.password &&
							Boolean(formik.errors.password)
						}
						helperText={
							formik.touched.password && formik.errors.password
						}
						fullWidth
						label="Jelszó"
						name="jelszo"
						autoFocus
						type="password"
					/>
					<div>
						<Switch checked={formik.values.admin} onChange={true} />
						<Typography variant="h7">
							{formik.values.admin ? "Admin" : "Felhasználó"}
						</Typography>
					</div>
					<Button
						type="submit"
						variant="contained"
						sx={{ textTransform: "uppercase" }}
					>
						létrehozás
					</Button>
				</Box>
			</Paper>
			<Footer trademark versionNumber />
		</>
	);
};
