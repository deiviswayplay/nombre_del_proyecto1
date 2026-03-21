import TaskForm from "../components/tasks-form";
import TaskContainer from "../components/task-container";

export default function Page() {
    return (
        <div>
            <TaskForm/>
            <TaskContainer />
        </div>
    );
}