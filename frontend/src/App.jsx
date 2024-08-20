import "./styles/App.css";
import "./styles/Footer.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AddNewStudent } from "./pages/AddNewStudent";
import { EditStudent } from "./pages/EditStudent";
import { ClassSelector } from "./pages/ClassSelector";

import { AuthContext } from "./contexts/AuthContext";
import { EditUsers } from "./pages/admin/EditUsers";
import { useContext, useEffect } from "react";
import { ClassContext } from "./contexts/ClassContext";
import axios from "./utils/axios";
import { UserRoute } from "./routes/UserRoute";
import { AdminRoute } from "./routes/AdminRoute";
import { Error } from "./pages/Error";
import { Profile } from "./pages/Profile";
import { AddUser } from "./pages/admin/AddUser";
import { AuthRoute } from "./routes/AuthRoute";
import { AddClass } from "./pages/AddClass";
import { IndexRoute } from "./routes/IndexRoute";
import { NotAuthRoute } from "./routes/NotAuthRoute";

function App() {
	const { logout } = useContext(AuthContext);
	const { currentUser } = useContext(AuthContext);
	const { classData, handleSet: handleClasses } = useContext(ClassContext);

	useEffect(() => {
		if (currentUser) {
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
		}
	}, [currentUser]);

	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route
						path="*"
						element={
							<Error message="A keresett oldal nem található" />
						}
					/>
					<Route index element={<IndexRoute user={currentUser} />} />
					<Route element={<NotAuthRoute user={currentUser} />}>
						<Route path="login" element={<Login />} />
					</Route>
					<Route element={<AuthRoute user={currentUser} />}>
						<Route element={<UserRoute user={currentUser} />}>
							<Route
								path="classes"
								index
								element={<ClassSelector />}
							/>
							<Route path="students" element={<Home />} />
							<Route path="class">
								<Route path="add" element={<AddClass />} />
							</Route>
							<Route path="student">
								<Route
									path="add"
									element={<AddNewStudent />}
								></Route>
								<Route
									path="edit"
									element={<EditStudent />}
								></Route>
							</Route>
						</Route>
						<Route
							path="admin"
							element={<AdminRoute user={currentUser} />}
						>
							<Route
								index
								element={
									<Error message="A keresett oldal nem található" />
								}
							/>
							<Route path="users" index element={<EditUsers />} />
							<Route path="user">
								<Route path="add" element={<AddUser />} />
							</Route>
						</Route>
						<Route path="profile" element={<Profile />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
