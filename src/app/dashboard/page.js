import TaskForm from "../components/tasks-form";
import TaskContainer from "../components/task-container";
import Styles from "../dashboard/pagedashboard.module.css";


export default function Page() {
   
    return (
        <div className={Styles.background}>
            <TaskForm/>
            <TaskContainer
            />

        </div>
    );
}