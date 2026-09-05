import "../style/NavBar.css";
import {useAuthStore} from "../store/authStore.ts";
import type {UserResponse} from "../types/UserResponse.ts";

interface NavbarProps{
    user: UserResponse | null;
}

function Navbar({user}:NavbarProps){

    const logout=useAuthStore((state) => state.logout);
    const initials = user?.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("") || "?";

    return(
        <header className="app-navbar">
            <div className="navbar-user">
                <p className="navbar-kicker">Personal workspace</p>
                <h4 className="name-user">{user?.name || "Loading profile..."}</h4>
                {user?.email && <p className="user-email">{user.email}</p>}
            </div>
            <div className="navbar-actions">
                <div className="avatar" aria-hidden="true">{initials}</div>
                <button className="logout-button" onClick={logout}>Log out</button>
            </div>
        </header>

    )

}
export default Navbar;
