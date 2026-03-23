"use client"

import { createClient } from "../utls/supabase/client"
import { useEffect } from "react"


export default function TaskContainer() {

    useEffect(
        () => {
            const fetchTasks = async () => {
                const supabase = createClient();
                const { data: userData } = await supabase.auth.getUser();

                console.log(userData.user.id);

                const { data } = await supabase.from('tasks')
                    .select('*')
                    .eq('user_id', userData.user.id);
            }
            fetchTasks()

        }, []
    )

    return (
        <div>

        </div>
    )
}