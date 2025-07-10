"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">📦 Your Orders</h1>

        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500">No orders placed yet.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order._id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-lg">{order.gig?.title || "Gig Title"}</p>
                  <p className="text-sm text-gray-500">Status: {order.status}</p>
                </div>
                <p className="text-blue-600 font-bold">₹{order.price}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
