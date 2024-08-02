import { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Button, Paper, TextField, Typography } from "@mui/material";
import lightprofile from "../images/lightprofile.png";
import darkprofile from "../images/darkprofile.png";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { AuthContext } from "../contexts/AuthContext";
import { BackToPageButton } from "../components/BackToPageButton";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useTheme } from "../contexts/ThemeContext";

const validationSchema = yup.object({
	oldPassword: yup
		.string()
		.matches(
			"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,24}$",
			"A régi jelszó legalább 8, legfeljebb 24 karakter hosszú lehet és tartalmaznia kell kisbetűt, nagybetűt, számot és speciális karaktert"
		)
		.required("Régi jelszó megadása kötelező"),
	newPassword: yup
		.string()
		.matches(
			"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,24}$",
			"Az új jelszó legalább 8, legfeljebb 24 karakter hosszú lehet és tartalmaznia kell kisbetűt, nagybetűt, számot és speciális karaktert"
		)
		.required("Új jelszó megadása kötelező"),
	newPassword2: yup
		.string()
		.required("Jelszó megadása kötelező")
		.oneOf([yup.ref("newPassword")], "A két jelszó nem egyezik")
});

export const Profile = () => {
	const { mode } = useTheme();
	const { currentUser, logout } = useContext(AuthContext);
	const formik = useFormik({
		initialValues: {
			oldPassword: "",
			newPassword: "",
			newPassword2: ""
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			axios
				.patch(`/users/${currentUser.id}`, {
					oldPassword: values.oldPassword,
					newPassword: values.newPassword
				})
				.then((e) => {
					toast.success(e.data.message);
					navigate("/login");
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
	const navigate = useNavigate();

	return (
		<>
			<Nav />
			<Paper elevation={2}>
				<div className="user-form" onSubmit={formik.handleSubmit}>
					<BackToPageButton
						style={{ width: "30%", marginBottom: "1rem" }}
					/>
					<Typography
						variant="h3"
						color="primary"
						sx={{ textTransform: "uppercase" }}
					>
						Profil
					</Typography>

					<img
						src={mode === "light" ? lightprofile : darkprofile}
						style={{
							width: "150px",
							height: "150px",
							margin: "2.5rem 0"
						}}
					/>

					<Typography variant="h5" color="primary">
						OM azonosító: {currentUser.id}
					</Typography>
					<TextField
						style={{ width: "100%" }}
						value={formik.values.oldPassword}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.oldPassword &&
							Boolean(formik.errors.oldPassword)
						}
						helperText={
							formik.touched.oldPassword &&
							formik.errors.oldPassword
						}
						margin="normal"
						label="Régi jelszó"
						type="password"
						name="oldPassword"
					/>
					<TextField
						style={{ width: "100%" }}
						value={formik.values.newPassword}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.newPassword &&
							Boolean(formik.errors.newPassword)
						}
						helperText={
							formik.touched.newPassword &&
							formik.errors.newPassword
						}
						margin="normal"
						name="newPassword"
						label="Új jelszó"
						type="password"
					/>
					<TextField
						style={{ width: "100%" }}
						value={formik.values.newPassword2}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.newPassword2 &&
							Boolean(formik.errors.newPassword2)
						}
						helperText={
							formik.touched.newPassword2 &&
							formik.errors.newPassword2
						}
						margin="normal"
						name="newPassword2"
						label="Új jelszó mégegyszer"
						type="password"
					/>
					<Button
						type="submit"
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Jelszó módosítása
					</Button>
				</div>
			</Paper>
			<Footer />
		</>
	);
};
