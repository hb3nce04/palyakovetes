import './css/App.css';
import './css/Footer.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import { GenericNotFound } from './pages/GenericNotFound';
import { DarkModeTest } from './components/DarkModeTest';

function App() {

  return (

      <div className="App">

      
          <BrowserRouter>
          <DarkModeTest>
        <Routes>
        
          <Route path="/" >
            
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path='*' exact={true} element={<GenericNotFound/>} />
            
          </Route>
          
        </Routes>
        </DarkModeTest>
      </BrowserRouter>
      </div>

  );
}

export default App;
