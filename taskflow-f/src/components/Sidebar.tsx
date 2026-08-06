import "../style/Sidebar.css";
import {Link} from "react-router-dom";

function Sidebar(){

    return(
        <aside>
            <h2>TaskFlow</h2>

            <ul>
                <li className="sidebar_string"><Link to="/dashboard" >Dashboard</Link></li>
                <li className="sidebar_string"><Link to="/tasks">Tasks</Link></li>
                <li className="sidebar_string">Teams</li>
                <li className="sidebar_string"><Link to="/settings">Settings</Link></li>
            </ul>

        </aside>
    )

}

export default Sidebar;