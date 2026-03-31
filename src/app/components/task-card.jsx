import { useEffect, useState } from "react";
import { createClient } from "../utls/supabase/client";
import { FaPencilAlt } from "react-icons/fa";
import Styles from "../components/task-card.module.css";

export default function TaskCard({ task }) {
  const { title, description, image } = task;
  const [imageUrl, setImageUrl] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [editedImage, setEditedImage] = useState(null);

  useEffect(() => {
    const getUrlImage = async () => {
      const supabase = createClient();
      const { data } = supabase.storage.from("archivos").getPublicUrl(image);
      setImageUrl(data.publicUrl);
    };

    if (image) {
      getUrlImage();
    }
  }, [image]);

  const handleUpdate = async () => {
    const supabase = await createClient();
    let imagePath = image;
    if (editedImage) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
        const filePath = `${user.id}/${editedImage.name}`;
        const { data: dataImage, error: errorImage } = await supabase.storage
          .from("archivos")
          .upload(filePath, editedImage, {
            cacheControl: "3600",
          });
      if (errorImage) {
        console.error("Error uploading image:", errorImage);
      } else {
        imagePath = dataImage.path;
      }
    }
    
  };
  return (
    <div className={Styles.container}>
<div className={Styles.card}>
  {isEdit && (
    <input
      type="file"
      onChange={(e) => setEditedImage(e.target.files[0])}
     
    />
  )}

  {(imageUrl || editedImage) && (
    <img
      className={Styles.image}
      src={
        editedImage
          ? URL.createObjectURL(editedImage)
          : imageUrl
      }
      alt={title}
    />
  )}
      
      {isEdit ? (
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) => setEditedTask(e.target.value)}
        />
      ) : (
        <p>{title}</p>
      )}
      {isEdit ? (
        <input
          type="text"
          value={editedTask.description}
          onChange={(e) => setEditedTask(e.target.value)}
        />
      ) : (
        <p>{description}</p>
      )}
      <button onClick={() => setIsEdit(!isEdit)}>
        <FaPencilAlt />
      </button>
    
    {isEdit && (
  <button onClick={handleUpdate}>
    Guardar cambios
  </button>
  
)}
</div>
</div>
  );
}
