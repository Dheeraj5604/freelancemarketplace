const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  gig: { type: mongoose.Schema.Types.ObjectId, ref: "Gig", required: true },
  clientName: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
