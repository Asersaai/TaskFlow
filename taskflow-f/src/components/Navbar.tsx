import "../style/NavBar.css";
import {Link} from "react-router-dom";

interface NavbarProps{
    firstname:string;
    lastname:string;
}

function Navbar(props:NavbarProps){
    return(
        <header className="header_1">

         <h4 className="name-user">{props.lastname} {props.firstname}</h4>

         <ul className="nav_container">
         </ul>
            <Link to="/login" className="login">Login</Link>
        </header>
    )

}
export default Navbar;