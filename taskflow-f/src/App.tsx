import './App.css'
import {Route,Routes,BrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";

function App() {

  return (

    <BrowserRouter>

        <Navbar firstname={"Alisher"} lastname={"Askarul"}/>

          <Routes>
              <Route path="/" element={<Home/>}/>

              <Route path="/login" element={<Login/>}/>

              <Route path="/register" element={<Register/>}/>

              <Route path="/dashboard" element={<Dashboard/>}/>

          </Routes>

        <Footer/>

      </BrowserRouter>
  )

}

export default App
