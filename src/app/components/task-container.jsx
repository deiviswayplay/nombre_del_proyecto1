"use client"

import { createClient } from "../utls/supabase/client";
import { useEffect, useState } from "react"
import TaskCard from "./task-card";

export default function TaskContainer() {

    const [tasks, setTasks] = useState([]);

    useEffect(
        () => {
            const fetchTasks = async () => {
                const supabase = createClient();
                const { data: userData } = await supabase.auth.getUser();

                console.log(userData.user.id);

                const { data, error } = await supabase.from('tasks')
                    .select('*')
                    .eq('user_id', userData.user.id);
            
                console.log(data);
                setTasks(data);
                }
            fetchTasks()
        }, []
    )

    return (
        <div className="flex gap-5">
            {
                tasks.length > 0 
                ? (
                    tasks.map(
                        task=>(
                            <TaskCard key={task.id} task={task} />
                        )
                    )
                )
                : <h2>No hay tareas disponibles.</h2>
            }
        </div>
    )
}