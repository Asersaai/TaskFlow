import "../style/NavBar.css";
import {Link} from "react-router-dom";
import {useAuthStore} from "../store/authStore.ts";

interface NavbarProps{
    firstname:string;
    lastname:string;
}

function Navbar(props:NavbarProps){

    const logout=useAuthStore((state) => state.logout)
    return(
        <header className="header_1">

         <h4 className="name-user">{props.lastname} {props.firstname}</h4>

         <ul className="nav_container">
         </ul>
            <Link to="/login" className="login">Login</Link>

            <Link to="/register" >Register</Link>
            <div>
                <button onClick={logout}>Logout</button>
            </div>
        </header>

    )

}
export default Navbar;