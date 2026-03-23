"use client";
import { useState } from "react";
import { createClient } from "../utls/supabase/client";
import Styles from "./tasks-form.module.css";

export default function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const supabase = createClient();
    const {data: userData} = await supabase.auth.getUser();

    const { data, error} = await supabase.from('tasks')
      .insert({
        title: task.title,
        description: task.description,
        user_id: userData.user.id,
      });

    if (error) throw error;
  } catch (error) {
    console.error(error)
  }
};
  return (
    <div className={Styles.container}>
      <h2>Registrar nueva tarea</h2>
    <form className={Styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titulo de la tarea"
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descripcion de tarea"
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      <button onClick={handleSubmit}>Registrar tarea</button>
    </form>
    </div>
  );
};
