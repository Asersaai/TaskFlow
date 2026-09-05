import './App.css'
import {Route,Routes,BrowserRouter} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";

import PublicLayout from "./layouts/PublicLayout.tsx";
import AppLayout from "./layouts/AppLayout.tsx";
import Tasks from "./pages/Tasks.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Settings from "./pages/Settings.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import Error404Page from "./pages/error/404.tsx";

function App() {

  return (
    <BrowserRouter>
                    <Routes>
                        <Route element={<PublicLayout />}>
                            <Route path="/" element={<Login />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="*" element={<Error404Page />} />
                        </Route>

                        <Route element={<ProtectedRoute>
                            <AppLayout />
                        </ProtectedRoute>}>
                            <Route path="/tasks" element={<Tasks />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/settings" element={<Settings />} />
                        </Route>
                    </Routes>
      </BrowserRouter>
  )

}

export default App
