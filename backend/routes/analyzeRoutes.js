const express = require("express");
const router = express.Router();
const Sentiment = require("sentiment");

const sentiment = new Sentiment();

// Categories (you can expand later)
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

// ✅ Updated Toxicity (High / Medium / Low)
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

// POST /api/analyze
router.post("/", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).send({ error: "Text required" });
  }

  // Sentiment
  const sent = sentiment.analyze(text);

  // Category
  const category = detectCategory(text);

  // Toxicity
  const toxicity = detectToxicity(text);

  // Suggestions (hashtags)
  const suggestions = [`#${category}`, "#trending", "#social"];

  // ✅ Send response
  res.send({
    sentiment:
      sent.score > 0 ? "Positive" : sent.score < 0 ? "Negative" : "Neutral",
    sentimentScore: sent.score,
    category,
    toxicity,
    suggestions,
  });
});

module.exports = router;
