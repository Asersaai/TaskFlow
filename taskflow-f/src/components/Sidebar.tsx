import "../style/Sidebar.css";
import {Link} from "react-router-dom";

function Sidebar(){

    return(
        <aside className="sidebar">
            <Link className="sidebar-brand" to="/dashboard"><span className="brand-mark">T</span>TaskFlow</Link>
            <p className="sidebar-label">Workspace</p>
            <ul className="sidebar-menu">
                <li className="sidebar_string"><Link to="/dashboard">⌂ <span>Dashboard</span></Link></li>
                <li className="sidebar_string"><Link to="/tasks">✓ <span>My tasks</span></Link></li>
                <li className="sidebar_string"><Link to="/settings">⚙ <span>Settings</span></Link></li>
            </ul>
            <div className="sidebar-foot"><i/>All systems normal</div>

        </aside>
    )

}

export default Sidebar;
