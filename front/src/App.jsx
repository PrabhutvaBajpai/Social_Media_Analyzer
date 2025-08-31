import { useState } from "react";
import FileUpload from "./components/FileUpload";
import StatusPanel from "./components/StatusPanel";
import AnalysisResult from "./components/AnalysisResult";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="container py-5">
      <div className="card shadow-lg p-4">
        <h1 className="text-center mb-4">📊 Social Media Analyzer</h1>
        <FileUpload setResult={setResult} />
        <StatusPanel />
        <AnalysisResult result={result} />
      </div>
    </div>
  );
}
