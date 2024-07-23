import "./css/App.css";
import "./css/Footer.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

import { DarkMode } from "./components/DarkMode";
import { AddNewStudent } from "./pages/AddNewStudent";
import { UpdateStudent } from "./pages/UpdateStudent";
import { ClassChooser } from "./pages/ClassChooser";

import { AuthContext } from "./context/AuthContext";
import { EditUsers } from "./pages/admin/EditUsers";
import { useContext, useEffect } from "react";
import { ClassContext } from "./context/ClassContext";
import axios from "./utils/axios";
import { UserRoute } from "./route/UserRoute";
import { AdminRoute } from "./route/AdminRoute";
import { Error } from "./pages/Error";
import { Profile } from "./pages/Profile";
import { AddUser } from "./pages/admin/AddUser";
import { UserAdminCommonRoute } from "./route/UserAdminCommonRoute";
import { AddClass } from "./pages/AddClass";

function App() {
	const { logout } = useContext(AuthContext);
	const { currentUser } = useContext(AuthContext);
	const { classData, handleSet: handleClasses } = useContext(ClassContext);

	useEffect(() => {
		axios
			.get("/classes")
			.then((res) => {
				handleClasses(res.data);
			})
			.catch((err) => {
				if (
					err.code === "ERR_NETWORK" &&
					window.location.href.split("/")[
						window.location.href.split("/").length - 1
					] !== "login"
				) {
					window.location.href = "/login";
				}
			});
	}, [currentUser]);

	return (
		<div className="App">
			<BrowserRouter>
				<DarkMode>
					<Routes>
						<Route
							path="*"
							element={<Error message="Valami hiba történt..." />}
						/>
						<Route path="/login" index element={<Login />} />
						<Route
							path="/"
							element={<UserRoute user={currentUser} />}
						>
							<Route path="/" element={<Home />} />

							<Route path="student">
								<Route
									path="add"
									element={<AddNewStudent />}
								></Route>
								<Route
									path="update"
									element={<UpdateStudent />}
								></Route>
							</Route>
						</Route>
						<Route path="class">
							<Route path="add" element={<AddClass />} />
							<Route path="choose" element={<ClassChooser />} />
						</Route>
						<Route
							path="/"
							element={<AdminRoute user={currentUser} />}
						>
							<Route path="admin">
								<Route path="users">
									<Route
										path="list"
										element={<EditUsers />}
									/>
									<Route path="add" element={<AddUser />} />
								</Route>
							</Route>
						</Route>
						<Route
							path="/"
							element={
								<UserAdminCommonRoute user={currentUser} />
							}
						>
							<Route path="profile" element={<Profile />} />
						</Route>
					</Routes>
				</DarkMode>
			</BrowserRouter>
		</div>
	);
}

export default App;
