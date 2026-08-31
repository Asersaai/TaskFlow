import './App.css'
import {Route,Routes,BrowserRouter} from "react-router-dom";
import Tasks from "./pages/Tasks.tsx";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Navbar from "./components/Navbar.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

function App() {

  return (

    <BrowserRouter>
        <div className="app">
            <aside className="sidebar_app">
                <Sidebar/>
            </aside>

            <div className="main_app">
                <header className="navbar_app">
                    <Navbar firstname={"s"} lastname={"a"}/>
                </header>
                <main className="content_app">
          <Routes>

              <Route path="/" element={<Login/>}/>
              <Route path="/login" element={<Login/>}/>

              <Route path="/register" element={<Register/>}/>

              <Route path="/dashboard" element={
                  <ProtectedRoute>
                      <Dashboard/>
                  </ProtectedRoute>
              }/>

              <Route path="/settings" element={
                  <ProtectedRoute>
                      <Settings/>
                  </ProtectedRoute>
              }/>

              <Route path="/tasks" element={
                  <ProtectedRoute>
                      <Tasks/>
                  </ProtectedRoute>
              }/>

          </Routes>

                </main>
            </div>
        </div>


      </BrowserRouter>
  )

}

export default App
