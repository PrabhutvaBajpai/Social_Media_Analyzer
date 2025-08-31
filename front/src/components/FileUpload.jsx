import { useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function FileUpload({ setResult }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    try {
      // Step 1: Upload file → backend
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      const extractedText = uploadData.extractedText;

      if (!extractedText) {
        alert("No text extracted!");
        return;
      }

      // Step 2: Analyze extracted text
      const analyzeRes = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: extractedText }),
      });

      const analysisData = await analyzeRes.json();

      // Step 3: Combine results
      setResult({
        extractedText,
        ...analysisData,
      });
    } catch (error) {
      console.error("Upload/Analyze failed:", error);
      alert("Something went wrong, check console.");
    }
  };

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <h2 className="card-title text-primary mb-3">Upload a File</h2>

        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button
          className="btn btn-success w-100"
          onClick={handleUpload}
        >
          Analyze 🚀
        </button>
      </div>
    </div>
  );
}
