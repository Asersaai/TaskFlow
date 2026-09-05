import "../style/Dashboard.css";
import {useOutletContext} from "react-router-dom";
import type {AppOutletContext} from "../layouts/AppLayout.tsx";

function Dashboard(){
    const {user} = useOutletContext<AppOutletContext>();

    return(


        <section className="main_container">
            <span className="page-eyebrow">Overview</span>
            <h1>Dashboard</h1>
            <p className="page-description">A calm snapshot of your workspace.</p>
            <div className="dashboard-grid">
                <article className="stat-card stat-completed">
                    <span>Completed</span>
                    <strong>{user?.completedTasks ?? 0}</strong>
                    <p>Tasks you have finished</p>
                </article>
                <article className="stat-card stat-total">
                    <span>All tasks</span>
                    <strong>{user?.quantityTasks ?? 0}</strong>
                    <p>Total tasks you created</p>
                </article>
                <article className="stat-card stat-pending">
                    <span>Not completed</span>
                    <strong>{user?.notcompletedTasks ?? 0}</strong>
                    <p>Tasks still waiting for you</p>
                </article>
            </div>
        </section>
            )
}
export default Dashboard;
