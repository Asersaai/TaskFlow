import { useState, useEffect,type FormEvent } from "react";
import axios from "axios";
import TaskCard from "../components/TaskCard.tsx";
import "../style/Tasks.css";

interface Tasks {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

function Tasks() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [tasks, setTasks] = useState<Tasks[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);


    const fetchTasks=() => {
        axios.get("http://localhost:8080/api/tasks").then((response) => setTasks(response.data)).catch((error) => console.log(error));
    }

    const handleSubmit= async (e: FormEvent) =>{
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/task",{
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
        axios
            .get("http://localhost:8080/api/tasks")
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <div className="continer_tasks_top">
                <div>
                    <h1>Tasks Board</h1>
                </div>
                <div className="continer_tasks_top_button" onClick={() => setIsOpen(true)}>
                    <button >+</button>

                </div>
            </div>

            <div>
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        completed={task.completed}
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
        </div>
    );
}

export default Tasks;