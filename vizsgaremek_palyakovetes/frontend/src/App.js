import "./css/App.css";
import "./css/Footer.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

import { GenericNotFound } from "./pages/GenericNotFound";
import { DarkMode } from "./components/DarkMode";
import { AddNewStudent } from "./pages/AddNewStudent";
import { UpdateStudent } from "./pages/UpdateStudent";
import { ClassChooser } from "./pages/ClassChooser";

import { Contact } from "./pages/Contact";

import { Auth } from "./context/auth/AuthContext";
import {EditUsers} from "./pages/admin/EditUsers"

function App() {
  return (
    <div className="App">
      <Auth>
        <BrowserRouter>
          <DarkMode>
            <Routes>
              <Route path="*" element={<GenericNotFound />} />
              <Route path="/">
                <Route path="/" index element={<Login />} />
                <Route path="contact" element={<Contact />} />
                <Route path="home" element={<Home />} />
                <Route path="classchooser" element={<ClassChooser />} />
                <Route path="student">
                  <Route path="add" element={<AddNewStudent />}></Route>
                  <Route path=":studentId">
                    <Route path="update" element={<UpdateStudent />}></Route>
                  </Route>
                </Route>
                <Route path="admin">
                  <Route path="editusers" element={<EditUsers/>}/>
                </Route>
              </Route>
            </Routes>
          </DarkMode>
        </BrowserRouter>
      </Auth>
    </div>
  );
}

export default App;

