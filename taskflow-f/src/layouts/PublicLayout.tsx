
import "../style/PublicLayout.css";
import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar.tsx";

function PublicLayout(){
    return( <div className="public-shell">
            <div className="public-main">
                <PublicNavbar/>
                <main className="public-content">
                    <section className="public-intro">
                        <span>Plan clearly. Finish calmly.</span>
                        <h1>Bring your day<br/>into focus.</h1>
                        <p>TaskFlow keeps your priorities visible and your work moving, without the noise.</p>
                    </section>
                    <section className="public-panel"><Outlet /></section>
                </main>

            </div>
        </div>
    )
}

export default PublicLayout;
