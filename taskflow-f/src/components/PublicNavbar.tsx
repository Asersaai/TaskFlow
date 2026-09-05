import "../style/NavBar.css";
import {Link} from "react-router-dom";




function PublicNavbar(){


    return(
        <header className="public-navbar">
            <Link className="brand" to="/login"><span className="brand-mark">T</span>TaskFlow</Link>
            <nav className="public-links">
                <Link to="/login">Log in</Link>
                <Link className="nav-cta" to="/register">Create account</Link>
            </nav>
        </header>

    )

}
export default PublicNavbar;
