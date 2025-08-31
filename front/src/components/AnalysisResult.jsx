import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function AnalysisResult({ result }) {
  if (!result) return null;

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <h2 className="card-title text-primary mb-3">Analysis Result</h2>

        {/* Extracted Text */}
        <div className="mb-4">
          <h5 className="text-secondary">Extracted Text</h5>
          <p className="card-text">{result.extractedText}</p>
        </div>

        {/* Sentiment / Category / Toxicity */}
        <div className="mb-4">
          <h5 className="text-secondary">Insights</h5>
          <p>
            <strong>Sentiment:</strong>{" "}
            <span
              className={
                result.sentiment === "Positive"
                  ? "text-success fw-bold"
                  : result.sentiment === "Negative"
                  ? "text-danger fw-bold"
                  : "text-warning fw-bold"
              }
            >
              {result.sentiment}
            </span>{" "}
            ({result.sentimentScore})
          </p>
          <p>
            <strong>Category:</strong>{" "}
            <span className="badge bg-info text-dark">{result.category}</span>
          </p>
          <p>
            <strong>Toxicity:</strong>{" "}
            <span
              className={
                result.toxicity === "High"
                  ? "badge bg-danger"
                  : result.toxicity === "Medium"
                  ? "badge bg-warning text-dark"
                  : "badge bg-success"
              }
            >
              {result.toxicity}
            </span>
          </p>
        </div>

        {/* Suggestions */}
        <div>
          <h5 className="text-secondary">Suggestions</h5>
          <ul className="list-group">
            {result.suggestions.map((s, i) => (
              <li key={i} className="list-group-item">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
