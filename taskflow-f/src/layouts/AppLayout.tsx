import Sidebar from "../components/Sidebar.tsx";
import Navbar from "../components/Navbar.tsx";
import "../App.css";
import { Outlet } from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {api} from "../api/api.ts";
import type {UserResponse} from "../types/UserResponse.ts";

export interface AppOutletContext {
    user: UserResponse | null;
    refreshUser: () => Promise<void>;
}

function AppLayout(){
    const [user, setUser] = useState<UserResponse | null>(null);
    const [isAccountLoading, setIsAccountLoading] = useState(true);

    const refreshUser = useCallback(async () => {
        const response = await api.get<UserResponse>("/account");
        setUser(response.data);
    }, []);

    useEffect(() => {
        api.get<UserResponse>("/account")
            .then((response) => setUser(response.data))
            .catch(() => setUser(null))
            .finally(() => setIsAccountLoading(false));
    }, []);

   return( <div className="app">
       <aside className="sidebar_app">
           <Sidebar/>
       </aside>
           <div className="main_app">
           <header className="navbar_app">
               <Navbar user={user}/>
           </header>
               <main className="content_app">
                   {isAccountLoading
                       ? <p className="page-description">Loading workspace...</p>
                       : user
                           ? <Outlet context={{user, refreshUser} satisfies AppOutletContext}/>
                           : <p className="settings-error" role="alert">Could not load your workspace.</p>}
                  </main>

           </div>
    </div>
   )
}

export default AppLayout;
