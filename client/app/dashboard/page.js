"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">Welcome, {user.name} 👋</h1>
        <p className="mb-6 text-gray-600">
          You're logged in as a <span className="font-semibold">{user.role}</span>.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-4 border rounded-lg bg-blue-50 shadow-sm">
            <h3 className="font-semibold text-gray-800">📧 Email</h3>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>
          <div className="p-4 border rounded-lg bg-green-50 shadow-sm">
            <h3 className="font-semibold text-gray-800">🧑 Role</h3>
            <p className="text-gray-600 text-sm capitalize">{user.role}</p>
          </div>
          <div className="p-4 border rounded-lg bg-yellow-50 shadow-sm">
            <h3 className="font-semibold text-gray-800">⚙️ Actions</h3>
            <p className="text-gray-600 text-sm">Use the buttons below to explore.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          {user.role === "freelancer" && (
            <button
              onClick={() => router.push("/gig/create")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              ➕ Add New Gig
            </button>
          )}
          <button
            onClick={() => router.push("/gigs")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            🔍 Browse Gigs
          </button>
          <button
            onClick={() => router.push("/orders")}
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            📦 View Orders
          </button>
        </div>

        <button
          onClick={logout}
          className="text-red-600 hover:underline text-sm"
        >
          🔓 Logout
        </button>
      </div>
    </div>
  );
}
