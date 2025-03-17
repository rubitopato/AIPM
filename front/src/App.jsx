import { useRef, useState } from "react";
import axios from "axios";

function App() {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // Estado para la URL de la imagen

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Imagen seleccionada:", file);

      // Crear una URL temporal para la imagen seleccionada
      const newImageUrl = URL.createObjectURL(file);
      setImageUrl(newImageUrl);

      const formData = new FormData();
      formData.append("file", file); // Asegúrate de que Flask espera "file"

      try {
        setLoading(true); // Activamos loading
        const res = await axios.post("http://127.0.0.1:5000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Respuesta del servidor:", res.data);
        setResponse(res.data); // Guardamos respuesta
        alert("Processing completed. Showing results...");
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      } finally {
        setLoading(false); // Quitamos loading
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-8">
      {/* Botón principal */}
      <div
        className="bg-indigo-400 px-8 py-6 text-3xl rounded-3xl font-bold cursor-pointer shadow-lg transition-all duration-200 transform hover:scale-105 select-none"
        onClick={handleDivClick}
      >
        {loading ? "Uploading..." : "Upload Photo!"}
      </div>

      {/* Mensaje de respuesta */}
      {response && (
        <div className="text-2xl font-semibold text-center mt-4">
          <p>✅ Response: {response.message}</p>
        </div>
      )}

      {/* Imagen subida */}
      {imageUrl && (
        <div className="mt-4 ">
          <img
            src={imageUrl}
            alt="Imagen subida"
            className="max-w-full max-h-96 object-contain rounded-4xl shadow-lg hover:scale-105 hover:rotate-1 transition-all cursor-pointer"
          />
        </div>
      )}

      {/* Input oculto */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

export default App;
