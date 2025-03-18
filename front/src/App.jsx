import { useRef, useState } from "react";
import axios from "axios";
import Nav from "./Nav";

function App() {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("IImage selected:", file);

      const newImageUrl = URL.createObjectURL(file);
      setImageUrl(newImageUrl);

      const formData = new FormData();
      formData.append("file", file);

      try {
        setLoading(true);
        const res = await axios.post("http://127.0.0.1:5000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Server response:", res.data);
        setResponse(res.data);
        alert("Processing completed. Showing results...");
      } catch (error) {
        console.error("Error uploading the image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-x-hidden">
      <Nav />
      <div className="flex-1 flex flex-col items-center justify-center gap-8 py-6">
        <img
          src="upload.svg"
          className="w-24 bg-indigo-400 p-4 rounded-2xl shadow-lg hover:rotate-2 transition-all"
        />
        <div
          className="bg-indigo-400 hover:bg-indigo-600 text-black hover:text-white px-8 py-6 text-3xl rounded-3xl font-bold cursor-pointer shadow-lg transition-all duration-200 transform hover:scale-105 select-none"
          onClick={handleDivClick}
        >
          {loading ? "Uploading..." : "Upload Photo!"}
        </div>

        {response && (
          <div className="text-2xl font-semibold text-center mt-4">
            <p>
              You have{" "}
              <span className="rounded-2xl hover:rotate-2 transition-all py-2">
                {response.disease}
              </span>{" "}
              with a probability of{" "}
              <span className="font-bold">{response.probability}</span>
            </p>
          </div>
        )}

        {imageUrl && (
          <div className="mt-4">
            <img
              src={imageUrl}
              alt="Image Uploaded"
              className="max-w-full max-h-96 object-contain rounded-4xl shadow-lg hover:scale-105 hover:rotate-1 border-8 border-transparent hover:border-indigo-400 transition-all cursor-pointer"
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default App;
