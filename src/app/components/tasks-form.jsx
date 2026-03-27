"use client"
import { createClient } from "../utls/supabase/client";
import Image from "next/image";
import { useRef, useState } from "react"

export default function TaskForm() {

    const [task, setTask] = useState({
        title: '',
        description: '',
        image: null
    });

    const inputFileRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const supabase = createClient();

            const { data: { user } } = await supabase.auth.getUser();

            if (task.image.type !== 'image/png' && task.image.type !== 'image/jpeg') {
                alert("Solo se permiten imagenes")
                return
            }

            if (!user) {
                alert("No hay un usuario")
                return
            }

            const filePath = `${user.id}/${task.image.name}`;

            const { data: dataImage, error: errorImage } = await supabase.storage
                .from('archivos')
                .upload(filePath, task.image, {
                    cacheControl: '3600',
                });

            console.log('img data', dataImage);
            console.error(errorImage);
            if (errorImage) {
                alert("Error al subir la imagen")
                return
            }
            const { data: userData } = await supabase.auth.getUser();
            const { data, error } = await supabase.from('tasks')
                .insert({
                    title: task.title,
                    description: task.description,
                    user_id: userData.user.id,
                    image: dataImage.path,
                });


            if (error) throw error;
        } catch (error) {
  console.error(error);
}
    }

    return (
        <form className="flex flex-col bg-red-500 w-[50%] mx-auto p-3 rounded-2xl gap-5 items-center">
            <input
                type="text"
                placeholder="Titulo de la tarea"
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                className="border border-white p-2"
            />
            <textarea
                type="text"
                placeholder="Descripcion de tarea"

                onChange={(e) => setTask({ ...task, description: e.target.value })}
                className="border border-white p-2"
            />
            <input ref={inputFileRef} className="hidden" type="file" onChange={(e) => setTask({ ...task, image: e.target.files[0] })} name="imagen" />
            {
                task.image
                &&
               <div className="relative h-[200px] w-[50%]">
                 <Image sizes="100%" fill onClick={()=>{
                    inputFileRef.current.click()
                }} src={URL.createObjectURL(task.image)} className="object-cover cursor-pointer hover:scale-105" alt="" />
               </div>
            }
            {
                !task.image
                &&
                <div onClick={()=>{
                    inputFileRef.current.click()
                }}>
                    Selecciona tu imagen
                </div>
            }
            <button className="bg-red-600 p-2 w-fit mx-auto" onClick={handleSubmit}>Registrar tarea</button>
        </form>
    )
}