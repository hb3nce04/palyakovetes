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
import { AuthContext } from "../../contexts/AuthContext";
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
		.required("OM azonosító megadása kötelező"),
	password: yup
		.string()
		.matches(
			"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,24}$",
			"A jelszó legalább 8, legfeljebb 24 karakter hosszú lehet és tartalmaznia kell kisbetűt, nagybetűt, számot és speciális karaktert"
		)
		.required("Jelszó megadása kötelező"),
	isAdmin: yup.boolean()
});

export const AddUser = () => {
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			id: "",
			password: "",
			isAdmin: false
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			axios
				.post("/users", {
					...values
				})
				.then((res) => {
					toast.success(res.data.message);
					navigate("/admin/users");
				})
				.catch((err) => {
					if (err.response.status === 401) {
						logout();
					} else {
						toast.error(err.response.data.message);
					}
				});
		}
	});

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
						sx={{ mb: 1 }}
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
						id="password"
						autoFocus
						type="password"
					/>
					<div>
						<Switch
							id="isAdmin"
							checked={formik.values.isAdmin}
							onChange={formik.handleChange}
						/>
						<Typography variant="h7">
							{formik.values.isAdmin ? "Admin" : "Felhasználó"}
						</Typography>
					</div>
					<Button
						type="submit"
						variant="contained"
						sx={{ textTransform: "uppercase", marginTop: 2 }}
					>
						létrehozás
					</Button>
				</Box>
			</Paper>
			<Footer />
		</>
	);
};
