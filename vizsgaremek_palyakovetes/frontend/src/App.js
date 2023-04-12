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

function App() {
  const { logout } = useContext(AuthContext);
  const { currentUser } = useContext(AuthContext);
  const { classData, handleSet: handleClasses } = useContext(ClassContext);
  //const om_azon = currentUser.om_azon;
  const om_azon = () => {
    if (currentUser == null) {
      return 0;
    } else {
      return currentUser.om_azon;
    }
  };

  useEffect(() => {
    axios
      .post(
        "http://localhost:8080/classes/class_chooser",
        { om_azon: om_azon() },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        handleClasses(res.data);
      });
  }, [om_azon()]);

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
              <Route path="student">
                <Route path="add" element={<AddNewStudent />}></Route>
                <Route path=":studentId">
                  <Route path="update" element={<UpdateStudent />}></Route>
                </Route>
              </Route>
            </Route>
            <Route path="/">
              <Route
                path="admin"
                element={<AdminRoute redirectPath={false} user={currentUser} />}
              >
                <Route path="editusers" element={<EditUsers />} />
              </Route>
            </Route>
          </Routes>
        </DarkMode>
      </BrowserRouter>
    </div>
  );
}

export default App;
