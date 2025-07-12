const express = require("express");
const Gig = require("../models/Gig");

const router = express.Router();

// 🔹 POST /api/gigs — Create a new gig 
router.post("/", async (req, res) => {
  try {
    const { title, description, price, freelancerName,freelancerId } = req.body;

    // 🛡 Validate required fields
    if (!title || !description || !price || !freelancerName || !freelancerId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 💾 Save gig to MongoDB
    const gig = new Gig({
      title,
      description,
      price: Number(price),
      freelancerName,
      freelancerId,
    });

    await gig.save();

    // ✅ Return created gig
    res.status(201).json({
      message: "Gig created successfully",
      gig,
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

// GET /api/gigs/:id
router.get("/:id", async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: "Gig not found" });
    res.json(gig);
  } catch (err) {
    res.status(500).json({ message: "Error fetching gig", error: err.message });
  }
});

module.exports = router;
