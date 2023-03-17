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
<<<<<<< Updated upstream
import { Contact } from "./pages/Contact";
=======
import { Auth } from "./context/auth/AuthContext";
>>>>>>> Stashed changes

function App() {
  return (
    <div className="App">
<<<<<<< Updated upstream
      
      <BrowserRouter>
        <DarkMode>
          <Routes>
          <Route path="*"  element={<GenericNotFound />} />
            <Route path="/">
              <Route path = "/" index element={<Login />} />
              <Route path="contact" element={<Contact />} />
              <Route path="home" element={<Home />} />
              <Route path = "classchooser" element={<ClassChooser />} />
              <Route path="student">
                <Route path="add" element={<AddNewStudent/>}></Route>
                <Route path=":studentId">
                  <Route path="update" element={<UpdateStudent/>}></Route>
=======
      <Auth>
        <BrowserRouter>
          <DarkMode>
            <Routes>
              <Route path="*" element={<GenericNotFound />} />
              <Route path="/">
                <Route path="/" index element={<Login />} />
                <Route path="home" element={<Home />} />
                <Route path="classchooser" element={<ClassChooser />} />
                <Route path="student">
                  <Route path="add" element={<AddNewStudent />}></Route>
                  <Route path=":studentId">
                    <Route path="update" element={<UpdateStudent />}></Route>
>>>>>>> Stashed changes
                  </Route>
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
