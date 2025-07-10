const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  freelancerName: { type: String, required: true },
  summary: { type: String },        // AI-generated
  keywords: [{ type: String }],     // AI-generated
});

module.exports = mongoose.model("Gig", gigSchema);
