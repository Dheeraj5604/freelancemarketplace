const express = require("express");
const { summarizeGig, extractKeywords } = require("../services/openaiService");

const router = express.Router();

router.post("/summarize", async (req, res) => {
  try {
    const { description } = req.body;
    const summary = await summarizeGig(description);
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ message: "Summarization failed", error: error.message });
  }
});

router.post("/keywords", async (req, res) => {
  try {
    const { description } = req.body;
    const keywords = await extractKeywords(description);
    res.json({ keywords });
  } catch (error) {
    res.status(500).json({ message: "Keyword extraction failed", error: error.message });
  }
});

module.exports = router;
