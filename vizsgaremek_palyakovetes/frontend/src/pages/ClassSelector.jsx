import {
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	Grow,
	Paper,
	Typography
} from "@mui/material";
import axios from "../utils/axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { ClassContext } from "../contexts/ClassContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AlertDialog from "../components/AlertDialog";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export const ClassSelector = () => {
	const { classData, handleSet: handleClasses } = useContext(ClassContext);
	const { currentUser, logout } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser) {
			axios
				.get("/classes")
				.then((res) => {
					handleClasses(res.data);
				})
				.catch((err) => {
					if (err.code === "ERR_NETWORK") navigate("/login");
					if (err.response.status === 401) logout();
				});
		}
	}, [currentUser]);

	return (
		<>
			<Nav />
			<Paper style={{ padding: "3rem 6rem" }} elevation={2}>
				<Typography
					style={{ marginBottom: "1rem", fontWeight: "bold" }}
					variant="h3"
					color="primary"
				>
					Válassz osztályt!
				</Typography>

				<Grid container spacing={2}>
					{[0, ...classData].map((el, i) => {
						return el === 0 ? (
							<Grid item xs={12} sm={6} md={3} key={i}>
								<Card sx={{ minWidth: 150, height: "100%" }}>
									<CardActions sx={{ height: "100%" }}>
										<Button
											color="success"
											style={{
												width: "100%",
												height: "100%",
												fontWeight: "bold",
												fontSize: "1.5rem",
												textTransform: "uppercase"
											}}
											onClick={() => {
												navigate("/class/add");
											}}
										>
											+ osztály hozzáadása
										</Button>
									</CardActions>
								</Card>
							</Grid>
						) : (
							<Grid item xs={12} sm={6} md={3} key={i}>
								<Grow
									in={true}
									style={{ transformOrigin: "0 0 0" }}
									timeout={1500}
								>
									<Card
										sx={{ minWidth: 150, height: "100%" }}
									>
										<CardContent>
											<Typography
												variant="h5"
												gutterBottom
											>
												Osztály: {el.name}
											</Typography>
											<Typography variant="h5">
												Végzési év: {el.finishing_year}
											</Typography>
											<Typography color="text.secondary">
												{el.School.name}
											</Typography>
										</CardContent>
										<CardActions
											style={{
												justifyContent: "space-between",
												width: "100%"
											}}
										>
											<Button
												onClick={() => {
													localStorage.setItem(
														"selected_class",
														el.id
													);
													navigate("/students");
												}}
												sx={{ fontWeight: "bold" }}
											>
												Tovább
											</Button>
											<AlertDialog
												alertButton={
													<Button color="error">
														<DeleteForeverIcon
															variant="contained"
															color="error"
														/>
														{"Törlés"}
													</Button>
												}
												dialogTitle="Biztosan szeretné törölni ezt az osztályt?"
												dialogContent={
													<table>
														<thead>
															<tr>
																<th>Osztály</th>
																<th>
																	Végzési év
																</th>
																<th>Iskola</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td>
																	{el.name}
																</td>
																<td>
																	{
																		el.finishing_year
																	}
																</td>
																<td>
																	{
																		el
																			.School
																			.name
																	}
																</td>
															</tr>
														</tbody>
													</table>
												}
												onAgreeButtonMessage={"Igen"}
												onDisagreeButtonColor={
													"primary"
												}
												onAgreeButtonColor={"error"}
												onDisagreeButtonMessage={"Nem"}
												onAgreeEvent={(e) => {
													e.stopPropagation();

													axios
														.delete(
															`/classes/${el.id}`
														)
														.then((r) => {
															toast.success(
																r.data.message
															);
															axios
																.get("/classes")
																.then((res) => {
																	handleClasses(
																		res.data
																	);
																});
														})

														.catch((err) => {
															if (
																err.code ===
																"ERR_NETWORK"
															)
																navigate(
																	"/login"
																);
															if (
																err.response
																	.status ===
																401
															)
																logout();
														});
												}}
											/>
										</CardActions>
									</Card>
								</Grow>
							</Grid>
						);
					}) || []}
				</Grid>
			</Paper>
			<Footer />
		</>
	);
};
