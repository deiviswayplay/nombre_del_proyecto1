import { useEffect, useState } from "react";
import { createClient } from "../utls/supabase/client";
import { FaPencilAlt } from "react-icons/fa";

export default function TaskCard({ task }) {
    const { title, description, image } = task;
    const [imageUrl, setImageUrl] = useState("");
    const[isEdit,setIsEdit] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    useEffect(() => {
        const getUrlImage = async () => {
            const supabase = createClient();
            const { data } = supabase.storage
                .from("archivos")
                .getPublicUrl(image);

            setImageUrl(data.publicUrl);
        };

        if (image) {
            getUrlImage();
        }
    }, [image]);

     return (
        <div className="w-[35%]">
            <img className="w-[100%] h-[250px] object-cover" src={imageUrl} alt={title} />
            {
                isEdit ? <input type="text" value={editedTask.title} onChange={(e) => setEditedTask (e.target.value)} />
                 : <p>{title}</p>
            }
            <p>{description}</p>
            <button onClick={() => setIsEdit(!isEdit)}>
                <FaPencilAlt/>
            </button>

        </div>
    );
}