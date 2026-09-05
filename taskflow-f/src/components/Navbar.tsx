import "../style/NavBar.css";
import {useAuthStore} from "../store/authStore.ts";

interface NavbarProps{
    firstname:string;
    lastname:string;
}

function Navbar(props:NavbarProps){

    const logout=useAuthStore((state) => state.logout)
    return(
        <header className="app-navbar">
            <div><p className="navbar-kicker">Personal workspace</p><h4 className="name-user">Welcome back</h4></div>
            <div className="navbar-actions">
                <div className="avatar">{props.firstname}{props.lastname}</div>
                <button className="logout-button" onClick={logout}>Log out</button>
            </div>
        </header>

    )

}
export default Navbar;
