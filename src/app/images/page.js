import { createClient } from "../utls/supabase/server";
import { ImagesForm } from "../components/images-form";


export default function  Page() {
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const formData = new FormData(e.target);
    return (
        <div>
            <ImagesForm />
        </div>
    )
}
}