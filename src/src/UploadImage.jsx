import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function UploadImage() {
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");

    async function upload() {
        if (!file) return alert("Selecione um arquivo!");

        const fileName = Date.now() + "-" + file.name;

        // 1. Enviar para o bucket
        const { error: uploadError } = await supabase
            .storage
            .from("images") // nome do seu bucket
            .upload(fileName, file);

        if (uploadError) {
            alert("Erro ao enviar imagem");
            return;
        }

        // 2. Pegar URL pública
        const { data } = supabase.storage
            .from("images")
            .getPublicUrl(fileName);

        setUrl(data.publicUrl);
    }

    return (
        <div>
            <h2>Upload de Imagem</h2>

            <input type="file" onChange={e => setFile(e.target.files[0])} />

            <button onClick={upload}>Enviar</button>

            {url && (
                <div>
                    <p>Imagem enviada!</p>
                    <img src={url} alt="uploaded" width="200" />
                </div>
            )}
        </div>
    );
}
