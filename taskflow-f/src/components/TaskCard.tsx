import "../style/TaskCard.css";
import axios from "axios";
import {type FormEvent, type MouseEvent, useState} from "react";

interface TaskCardProps{
    id:number;
    title:string;
    description:string;
    completed:boolean;
    onUpdate?: (id: number) => void;

}

function TaskCard(card:TaskCardProps){
    const [isOpenEdit,setIsOpenEdit]= useState<boolean>(false);
    const [title, setTitle] =  useState(card.title || '');
    const [description, setDescription] = useState(card.description || '');
    const [completed,setCompleted]=useState(card.completed || false);


    const completedButton=async (e:FormEvent) =>{
        e.preventDefault()
        try {
            setCompleted(!completed)
            await axios.patch(`http://localhost:8080/api/task/${card.id}`,{
                completed
            })
            if (card.onUpdate){
                card.onUpdate(card.id);
            }
        }catch (error){
            console.log(error)
        }

    }
    const editWindow=()=>{setIsOpenEdit(true)};
    const handleSubmit=async (e: FormEvent)=>{
        e.preventDefault();
    try {
        await axios.patch(`http://localhost:8080/api/task/${card.id}`,{
            title,
            description
        })
        setIsOpenEdit(false);


        if(card.onUpdate){
            card.onUpdate(card.id);

        }
    }catch (error){
        console.log(error)
    }}


        const deleteButton=async (e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:8080/api/task/${card.id}`)
            if(card.onUpdate){
                card.onUpdate(card.id)
            }
        }catch (error){
            console.error("Ошибка при удалении задачи:", error);
        }

    }

    return(
        <div className="card">
        <div className="card_text">
            <h4>{card.title}</h4>
            <p>{card.description}</p>
            <p>Status: <span className={completed? "status-completed":"status-in-progress"}>{completed? "Completed":"In Progress"}</span></p>
            <p>{card.id}</p></div>
            <div className="card_button">
                <div>
                    <button className="card_button_delete" onClick={deleteButton}>delete</button>
                </div>
                <div>
                    <button className="card_button_edit" onClick={editWindow}>edit</button>
                </div>
                <div>
                    <button className="card_button_edit" onClick={completedButton} >completed</button>
                </div>
            </div>
            {isOpenEdit && (
                <div className="modal_overlay" onClick={() => setIsOpenEdit(false)}>
                    <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                        <h2>Изменить задачу</h2>
                        <form onSubmit={handleSubmit}>
                            <div >
                                <input required type="text"  placeholder={"title..."} value={title} onChange={(e) => setTitle(e.target.value)}/>

                            </div>
                            <div >
                                <input required type="text"  placeholder={"description..."}  value={description}
                                       onChange={(e) => setDescription(e.target.value)}/>

                            </div>
                            <div className="modal_button_post_or_exit">
                                <button className="modal_button_exit" type="button" onClick={() => setIsOpenEdit(false)}>Закрыть</button>
                                <button className="modal_button_post" type="submit" >Отправить</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>


    )

}
export default TaskCard;