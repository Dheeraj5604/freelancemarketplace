const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// 🔹 GET /api/orders — Fetch all orders (with gig and client info)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("gig")
      .populate("client"); // Add .populate("freelancer") if freelancer is also a user
    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Failed to fetch orders:", err);
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
});

// 🔹 POST /api/orders — Create a new order
router.post("/", async (req, res) => {
  try {
    const { gig, client, freelancer, price } = req.body;

    // ✅ Validate required fields
    if (!gig || !client || !freelancer || !price) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // 💾 Create and save order
    const newOrder = new Order({
      gig,
      client,
      freelancer,
      price,
      status: "pending",
    });

    await newOrder.save();

    console.log("✅ Order created:", newOrder._id);
    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (err) {
    console.error("❌ Order creation failed:", err);
    res.status(400).json({ message: "Failed to create order", error: err.message });
  }
});

module.exports = router;
