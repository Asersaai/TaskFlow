import { useState, useEffect,type FormEvent } from "react";
import TaskCard from "../components/TaskCard.tsx";
import "../style/Tasks.css";
import {api} from "../api/api.ts";

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

function Tasks() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);


    const fetchTasks=async () => {
        try{
            const responce= await api.get("/task");
            setTasks(responce.data)
        }catch (error){
            console.log("Ошибка при получении задач:",error)
        }
    }

    const handleSubmit= async (e: FormEvent) =>{
        e.preventDefault();
        try {
            await api.post("/task",{
                title,
                description
            });
            setTitle("");
            setDescription("");
            setIsOpen(false);

            fetchTasks()
        }catch (error) {
            console.error("Ошибка при отправке:", error);
        }}




    useEffect(() => {
        api.get("/task")
            .then((response) => setTasks(response.data))
            .catch((error) =>
                console.log("Ошибка при получении задач:", error)
            );
    }, []);

    return (
        <section className="tasks-page">
            <div className="continer_tasks_top">
                <div>
                    <h1>Tasks Board</h1>
                </div>
                <div className="continer_tasks_top_button" onClick={() => setIsOpen(true)}>
                    <button >+</button>

                </div>
            </div>

            <div className="task-list">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        completed={task.completed}
                        onUpdate={fetchTasks}
                    />
                ))}
            </div>

            {isOpen && (
                <div className="modal_overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                        <h2>Добавить новую задачу</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input required type="text" className="input" placeholder=" " value={title} onChange={(e) => setTitle(e.target.value)}/>
                                <label className="user-label">title</label>
                            </div>
                            <div className="input-group">
                                <input required type="text" className="input" placeholder=" "  value={description}
                                       onChange={(e) => setDescription(e.target.value)}/>
                                <label className="user-label">description</label>
                            </div>
                            <div className="modal_button_post_or_exit">
                                <button className="modal_button_exit" type="button" onClick={() => setIsOpen(false)}>Закрыть</button>
                                <button className="modal_button_post" type="submit" >Отправить</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </section>
    );
}

export default Tasks;
