import "../style/TaskCard.css";

interface TaskCardProps{
    title:string;
    description:string;
    completed:boolean;
}
function TaskCard(card:TaskCardProps){
    return(
        <div className="card">
            <h4>{card.title}</h4>
            <p>{card.description}</p>
            <p>Status: <span className={card.completed? "status-completed":"status-in-progress"}>{card.completed? "Completed":"In Progress"}</span></p>
        </div>
    )
}
export default TaskCard;