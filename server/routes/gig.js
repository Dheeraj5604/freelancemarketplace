const express = require("express");
const Gig = require("../models/Gig");
const { summarizeGig, extractKeywords } = require("../services/openaiService");

const router = express.Router();

// 🔹 POST /api/gigs — Create a new gig with AI integration
router.post("/", async (req, res) => {
  try {
    const { title, description, price, freelancerName } = req.body;

    // 🛡 Validate required fields
    if (!title || !description || !price || !freelancerName) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 🧠 AI: Generate summary and keywords
    const summary = "This is a short summary of the gig description.";
const keywords = ["freelance", "gig", "web", "design", "services"];

    // 💾 Save gig to MongoDB
    const gig = new Gig({
      title,
      description,
      price: Number(price),
      freelancerName,
      summary,
      keywords,
    });

    await gig.save();

    // ✅ Return created gig with AI fields
    res.status(201).json({
      message: "Gig created successfully",
      gig: {
        ...gig.toObject(),
        summary,
        keywords,
      },
    });
  } catch (err) {
    console.error("❌ Gig creation failed:", err);
    res.status(400).json({
      message: "Failed to create gig",
      error: err.message,
    });
  }
});

// 🔹 GET /api/gigs — Fetch all gigs
router.get("/", async (req, res) => {
  try {
    const gigs = await Gig.find();
    res.status(200).json(gigs);
  } catch (err) {
    console.error("❌ Fetch gigs error:", err);
    res.status(500).json({ message: "Failed to fetch gigs", error: err.message });
  }
});

module.exports = router;
