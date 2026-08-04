import "../style/Sidebar.css";

function Sidebar(){

    return(
        <aside>
            <h2>TaskFlow</h2>

            <ul>
                <li className="sidebar_string">My Tasks</li>
                <li className="sidebar_string">Completed</li>
                <li className="sidebar_string">Settings</li>
            </ul>

        </aside>
    )

}

export default Sidebar;