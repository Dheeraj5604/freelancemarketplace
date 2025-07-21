"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  PlusCircle,
  ClipboardList,
  Search,
  LogOut,
  User,
  Mail,
} from "lucide-react";

const updateOrderStatus = async (orderId, newStatus, fetchOrders) => {
  try {
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}/status`, {
      status: newStatus,
    });
    alert(`Order marked as ${newStatus}`);
    fetchOrders(); // Refresh orders after update
  } catch (error) {
    console.error("Failed to update status:", error.response?.data || error);
    alert("Failed to update order status.");
  }
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  const fetchOrders = async () => {
    if (!user || user.role !== "freelancer") return;
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/freelancer/${user._id}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-800">Dashboard</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-600 border border-red-600 hover:bg-red-100 px-4 py-2 rounded-md font-medium transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </header>

        {/* Welcome Card */}
        <section className="bg-white rounded-xl shadow p-6 mb-10">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">
            Welcome, {user.name} 👋
          </h2>
          <p className="text-gray-600">
            You're logged in as a <strong>{user.role}</strong>.
          </p>
        </section>

        {/* Profile Info */}
        <section className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow flex items-start gap-4">
            <User className="text-blue-600" size={28} />
            <div>
              <h3 className="font-semibold text-gray-800">Name</h3>
              <p className="text-gray-600">{user.name}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow flex items-start gap-4">
            <Mail className="text-green-600" size={28} />
            <div>
              <h3 className="font-semibold text-gray-800">Email</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow flex items-start gap-4">
            <ClipboardList className="text-purple-600" size={28} />
            <div>
              <h3 className="font-semibold text-gray-800">Role</h3>
              <p className="text-gray-600 capitalize">{user.role}</p>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="grid sm:grid-cols-3 gap-6 mb-10">
          {user.role === "freelancer" && (
            <button
              onClick={() => router.push("/gig/create")}
              className="flex flex-col items-center justify-center bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 p-6 rounded-xl shadow-md transition text-center"
            >
              <PlusCircle size={32} className="mb-2" />
              <span className="font-semibold text-lg">Add New Gig</span>
            </button>
          )}
          <button
            onClick={() => router.push("/gigs")}
            className="flex flex-col items-center justify-center bg-white border border-green-600 text-green-600 hover:bg-green-50 p-6 rounded-xl shadow-md transition text-center"
          >
            <Search size={32} className="mb-2" />
            <span className="font-semibold text-lg">Browse Gigs</span>
          </button>
          <button
            onClick={() => router.push("/orders")}
            className="flex flex-col items-center justify-center bg-white border border-yellow-600 text-yellow-600 hover:bg-yellow-50 p-6 rounded-xl shadow-md transition text-center"
          >
            <ClipboardList size={32} className="mb-2" />
            <span className="font-semibold text-lg">View Orders</span>
          </button>
        </section>

        {/* Orders Section */}
        {user.role === "freelancer" && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Your Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-600">No orders yet.</p>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white p-4 rounded-xl shadow mb-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">Gig: {order.gigId?.title || "Gig Info"}</p>
                    <p className="text-gray-600">Status: <strong>{order.status}</strong></p>
                    <p className="text-sm text-gray-500">Client: {order.clientId?.name || "N/A"}</p>
                  </div>
                  <div className="flex gap-2">
                    {order.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateOrderStatus(order._id, "accepted", fetchOrders)}
                          className="bg-green-600 text-white px-4 py-1 rounded"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order._id, "rejected", fetchOrders)}
                          className="bg-red-600 text-white px-4 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {order.status === "accepted" && (
                      <button
                        onClick={() => updateOrderStatus(order._id, "completed", fetchOrders)}
                        className="bg-blue-600 text-white px-4 py-1 rounded"
                      >
                        Mark Completed
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </section>
        )}

        {/* Footer */}
        <footer className="text-center text-gray-500 mt-12 text-sm">
          &copy; {new Date().getFullYear()} Freelancer Marketplace. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
