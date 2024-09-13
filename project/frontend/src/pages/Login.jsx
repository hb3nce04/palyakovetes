import {
	Avatar,
	Button,
	TextField,
	Box,
	Typography,
	Container
} from "@mui/material";
import Footer from "../components/Footer";
import fingerprint from "../images/fingerprint.svg";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
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
		.required("OM azonosító megadása kötelező"),
	password: yup
		.string()
		.matches(
			"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,24}$",
			"A jelszó legalább 8, legfeljebb 24 karakter hosszú lehet és tartalmaznia kell kisbetűt, nagybetűt, számot és speciális karaktert"
		)
		.required("Jelszó megadása kötelező")
});

export default function SignIn() {
	localStorage.setItem("user", null);
	const navigate = useNavigate();
	const { login } = useContext(AuthContext);
	const formik = useFormik({
		initialValues: {
			id: "",
			password: ""
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			login(values)
				.then((e) => {
					if (e.isAdmin === 1) {
						navigate("/admin/users");
					} else if (e.isAdmin === 0) {
						navigate("/classes");
					}
					toast.success(e.message);
				})
				.catch(() => {
					toast.error("Hibás felhasználónév vagy jelszó!");
				});
		}
	});

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center"
				}}
			>
				<Avatar
					src={fingerprint}
					sx={{ mt: "40%", bgcolor: "white" }}
				></Avatar>

				<Typography component="h1" variant="h5" sx={{ mt: 2 }}>
					Bejelentkezés
				</Typography>
				<Box
					component="form"
					onSubmit={formik.handleSubmit}
					sx={{ mt: 2 }}
				>
					<TextField
						id="id"
						name="id"
						label="OM azonosító"
						value={formik.values.id}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.id && Boolean(formik.errors.id)}
						helperText={formik.touched.id && formik.errors.id}
						margin="normal"
						autoFocus
						fullWidth
					/>
					<TextField
						id="password"
						name="password"
						label="Jelszó"
						type="password"
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
						margin="normal"
						fullWidth
					/>
					<Button
						fullWidth
						type="submit"
						variant="contained"
						sx={{ marginTop: "1rem" }}
					>
						Bejelentkezés
					</Button>
				</Box>
			</Box>

			<Footer />
		</Container>
	);
}
