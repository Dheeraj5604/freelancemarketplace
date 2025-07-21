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

router.get('/freelancer/:freelancerId', async (req, res) => {
  try {
    const { freelancerId } = req.params;
    const orders = await Order.find({ freelancer: freelancerId });
    res.json(orders);
  } catch (error) {
    console.error('❌ Error fetching orders for freelancer:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.patch('/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required.' });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.json(order);
  } catch (error) {
    console.error('❌ Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
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

    // PATCH /api/orders/:id/status
router.patch("/:id/status", async (req, res) => {
  const { status } = req.body;

  const validStatuses = ["pending", "accepted", "rejected", "completed"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order status.", error });
  }
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
