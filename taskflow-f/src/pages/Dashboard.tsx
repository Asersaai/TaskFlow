import "../style/Dashboard.css";

function Dashboard(){



    return(


        <section className="main_container">
            <span className="page-eyebrow">Overview</span>
            <h1>Dashboard</h1>
            <p className="page-description">A calm snapshot of your workspace.</p>
            <div className="dashboard-grid">
                <article><span>Today</span><strong>Stay focused</strong><p>Your task board is ready when you are.</p></article>
                <article><span>Workflow</span><strong>One step at a time</strong><p>Small progress still counts.</p></article>
                <article className="dashboard-accent"><span>Quick start</span><strong>Review your tasks</strong><p>Choose one clear priority and begin.</p></article>
            </div>
        </section>
            )
}
export default Dashboard;
