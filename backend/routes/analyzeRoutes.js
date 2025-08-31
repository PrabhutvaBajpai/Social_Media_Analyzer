const express = require("express");
const cors = require("cors");
const Sentiment = require("sentiment");
const serverless = require("serverless-http");

const app = express();
app.use(cors());
app.use(express.json());

const sentiment = new Sentiment();

const categories = {
  sports: ["football", "cricket", "basketball", "tennis"],
  technology: ["ai", "machine", "computer", "software", "tech"],
  health: ["fitness", "diet", "doctor", "medicine", "yoga"],
  politics: ["government", "election", "minister", "policy"],
};

function detectCategory(text) {
  const lower = text.toLowerCase();
  for (let [cat, keywords] of Object.entries(categories)) {
    if (keywords.some((word) => lower.includes(word))) return cat;
  }
  return "general";
}

function detectToxicity(text) {
  const toxicWords = ["stupid", "hate", "idiot", "kill", "dumb"];
  const lower = text.toLowerCase();

  let score = 0;
  toxicWords.forEach((word) => {
    if (lower.includes(word)) score++;
  });

  if (score >= 2) return "High";
  if (score === 1) return "Medium";
  return "Low";
}

app.post("/", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).send({ error: "Text required" });
  }

  const sent = sentiment.analyze(text);
  const category = detectCategory(text);
  const toxicity = detectToxicity(text);
  const suggestions = [`#${category}`, "#trending", "#social"];

  res.send({
    sentiment:
      sent.score > 0 ? "Positive" : sent.score < 0 ? "Negative" : "Neutral",
    sentimentScore: sent.score,
    category,
    toxicity,
    suggestions,
  });
});

module.exports = serverless(app);
