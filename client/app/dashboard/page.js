"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  PlusCircle,
  ClipboardList,
  Search,
  LogOut,
  User,
  Mail,
} from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

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
        <section className="grid sm:grid-cols-3 gap-6">
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

        {/* Footer */}
        <footer className="text-center text-gray-500 mt-12 text-sm">
          &copy; {new Date().getFullYear()} Freelancer Marketplace. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
