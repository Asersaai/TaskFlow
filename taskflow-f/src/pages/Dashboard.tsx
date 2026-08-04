import Sidebar from "../components/Sidebar.tsx";
import "../style/Dashboard.css";
import TaskCard from "../components/TaskCard.tsx";

function Dashboard(){
    const tasks = [
        {
            id: 1,
            title: "Run",
            description: "09:00",
            completed: true
        },
        {
            id: 2,
            title: "Learn React",
            description: "Study useState",
            completed: false
        },
        {
            id: 3,
            title: "Spring Boot",
            description: "Create REST API",
            completed: false
        }
    ];
    return(

        <div className="main_container">
            <div className="main_container-sidebar"><Sidebar/></div>
            <div className="main_container-f">Dashboard
                <div >
                    {tasks.map((task)=><TaskCard key={task.id} title={task.title} description={task.description} completed={task.completed}/>)}
                </div>
            </div></div>
            )
}
export default Dashboard;