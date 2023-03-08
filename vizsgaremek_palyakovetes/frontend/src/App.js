import "./css/App.css";
import "./css/Footer.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { GenericNotFound } from "./pages/GenericNotFound";
import { DarkModeTest } from "./components/DarkModeTest";
import { AddNewStudent } from "./pages/AddNewStudent";
import { UpdateStudent } from "./pages/UpdateStudent";
import { ClassChooser } from "./pages/ClassChooser";

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <DarkModeTest>
          <Routes>
          <Route path="*"  element={<GenericNotFound />} />
            <Route path="/">
              <Route path = "/" index element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path = "classchooser" element={<ClassChooser />} />
              <Route path="student">
                <Route path="add" element={<AddNewStudent/>}></Route>
                <Route path=":studentId">
                  <Route path="update" element={<UpdateStudent/>}></Route>
                  </Route>
                </Route>
            </Route>
          </Routes>
        </DarkModeTest>
      </BrowserRouter>
    </div>
  );
}

export default App;
