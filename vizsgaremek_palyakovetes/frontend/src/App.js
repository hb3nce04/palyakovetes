import "./css/App.css";
import "./css/Footer.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

import { DarkMode } from "./components/DarkMode";
import { AddNewStudent } from "./pages/AddNewStudent";
import { UpdateStudent } from "./pages/UpdateStudent";
import { ClassChooser } from "./pages/ClassChooser";

import { Contact } from "./pages/Contact";

import { AuthContext } from "./context/auth/AuthContext";
import { EditUsers } from "./pages/admin/EditUsers";
import { useContext, useEffect } from "react";
import { ClassContext } from "./context/auth/ClassContext";
import axios from "axios";
import { UserRoute } from "./route/UserRoute";
import { AdminRoute } from "./route/AdminRoute";
import { GenericError } from "./pages/error-pages/GenericError";
import { UserPage } from "./pages/UserPage";
import { AddUser } from "./pages/admin/AddUser";

function App() {
  const { logout } = useContext(AuthContext);
  const { currentUser } = useContext(AuthContext);
  const { classData, handleSet: handleClasses } = useContext(ClassContext);
console.log(currentUser)
  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/classes/class_chooser",
        { withCredentials: true },
      )
      .then((res) => {
        handleClasses(res.data);
      }).catch(err => {
        console.log(err)
      });
  }, [currentUser]);

  return (
    <div className="App">
      <BrowserRouter>
        <DarkMode>
          <Routes>
            <Route
              path="*"
              element={<GenericError message="Valami hiba történt :(" />}
            />
            <Route path="/login" index element={<Login />} />
            <Route path="/" element={<UserRoute user={currentUser} />}>
              <Route path="contact" element={<Contact />} />
              <Route path="/" element={<Home />} />
              <Route path="classchooser" element={<ClassChooser />} />
              <Route path="user" element={<UserPage />} />
              <Route path="student">
                <Route path="add" element={<AddNewStudent />}></Route>
                <Route path="update" element={<UpdateStudent />}></Route>
              </Route>
            </Route>
            <Route
              path="/"
              element={<AdminRoute redirectPath={false} user={currentUser} />}
            >
              <Route path="admin">
                <Route path="users">
                  <Route path="edit" element={<EditUsers />} />
                  <Route path="add" element={<AddUser />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </DarkMode>
      </BrowserRouter>
    </div>
  );
}

export default App;
