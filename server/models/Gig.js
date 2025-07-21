const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  freelancerName: { type: String, required: true },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "User",required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Gig", gigSchema);
