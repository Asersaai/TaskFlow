import Sidebar from "../components/Sidebar.tsx";
import Navbar from "../components/Navbar.tsx";
import "../App.css";
import { Outlet } from "react-router-dom";

function AppLayout(){
   return( <div className="app">
       <aside className="sidebar_app">
           <Sidebar/>
       </aside>
           <div className="main_app">
           <header className="navbar_app">
               <Navbar firstname={"s"} lastname={"a"}/>
           </header>
               <main className="content_app">
                   <Outlet />
                  </main>

           </div>
    </div>
   )
}

export default AppLayout;