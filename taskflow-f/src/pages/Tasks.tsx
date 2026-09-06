import {useCallback, useEffect, useState, type FormEvent} from "react";
import {useOutletContext} from "react-router-dom";
import {api} from "../api/api.ts";
import TaskCard from "../components/TaskCard.tsx";
import type {AppOutletContext} from "../layouts/AppLayout.tsx";
import "../style/Tasks.css";

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

interface TaskPage {
    content: Task[];
    totalPages: number;
}

function Tasks() {
    const {refreshUser} = useOutletContext<AppOutletContext>();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchTasks = useCallback(async (pageNumber: number) => {
        try {
            const response = await api.get<TaskPage>("/task", {
                params: {page: pageNumber, size: 5},
            });

            if (response.data.totalPages > 0 && pageNumber >= response.data.totalPages) {
                setPage(response.data.totalPages - 1);
                return;
            }

            setTasks(response.data.content);
            setTotalPages(response.data.totalPages);
            await refreshUser();
        } catch (error) {
            console.log("Ошибка при получении задач:", error);
        }
    }, [refreshUser]);

    useEffect(() => {
        // The state updates happen after the HTTP request resolves.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void fetchTasks(page);
    }, [fetchTasks, page]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/task", {title, description});
            setTitle("");
            setDescription("");
            setIsOpen(false);
            await fetchTasks(page);
        } catch (error) {
            console.error("Ошибка при отправке:", error);
        }
    };

    return (
        <section className="tasks-page">
            <div className="continer_tasks_top">
                <div><h1>Tasks Board</h1></div>
                <div className="continer_tasks_top_button" onClick={() => setIsOpen(true)}>
                    <button type="button" aria-label="Add task">+</button>
                </div>
            </div>

            <div className="task-list">
                {tasks.length === 0 && <p className="task-list-empty">No tasks yet</p>}
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        completed={task.completed}
                        onUpdate={() => void fetchTasks(page)}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <nav className="tasks-pagination" aria-label="Task pages">
                    <button type="button" disabled={page === 0} onClick={() => setPage((current) => Math.max(0, current - 1))}>
                        Previous
                    </button>
                    <span>Page {page + 1} of {totalPages}</span>
                    <button type="button" disabled={page + 1 >= totalPages} onClick={() => setPage((current) => current + 1)}>
                        Next
                    </button>
                </nav>
            )}

            {isOpen && (
                <div className="modal_overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                        <h2>Добавить новую задачу</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input id="new-task-title" required type="text" className="input" placeholder=" " value={title} onChange={(e) => setTitle(e.target.value)}/>
                                <label className="user-label" htmlFor="new-task-title">Title</label>
                            </div>
                            <div className="input-group">
                                <input id="new-task-description" required type="text" className="input" placeholder=" " value={description} onChange={(e) => setDescription(e.target.value)}/>
                                <label className="user-label" htmlFor="new-task-description">Description</label>
                            </div>
                            <div className="modal_button_post_or_exit">
                                <button className="modal_button_exit" type="button" onClick={() => setIsOpen(false)}>Закрыть</button>
                                <button className="modal_button_post" type="submit">Отправить</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Tasks;
