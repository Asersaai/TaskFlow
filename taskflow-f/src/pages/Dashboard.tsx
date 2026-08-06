import Sidebar from "../components/Sidebar.tsx";
import "../style/Dashboard.css";
import TaskCard from "../components/TaskCard.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
interface Task{
    id:number;
    title:string;
    description:string;
    completed:boolean;
}


function Dashboard(){

    const [tasks,setTasks]= useState<Task[]>([]);

    useEffect(() =>{

        axios.get("http://localhost:8080/api/tasks").then(response => {
            setTasks(response.data);
        }).catch(error =>{
            console.log(error)
        })

        },[])

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