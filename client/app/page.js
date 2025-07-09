"use client";
import { useRouter } from "next/navigation";
import { ArrowRightCircle, UserPlus, Briefcase, ClipboardList, LogIn, Star, Search, PlusCircle, LayoutDashboard } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="flex justify-between items-center py-6">
          <h1 className="text-4xl font-extrabold text-blue-800">Freelancer Marketplace</h1>
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg font-semibold shadow-md"
            >
              <LogIn size={18} /> Login
            </button>
            <button
              onClick={() => router.push("/register")}
              className="flex items-center gap-2 bg-white border border-blue-700 text-blue-700 hover:bg-blue-100 px-5 py-2 rounded-lg font-semibold shadow-md"
            >
              <UserPlus size={18} /> Register
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-white p-10 rounded-2xl shadow-lg text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Connect. Work. Succeed.</h2>
          <p className="text-gray-600 text-lg mb-8">
            A professional platform where freelancers offer services and clients hire the best talent.
          </p>
          <button
            onClick={() => router.push("/gigs")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow"
          >
            <Search size={20} className="inline-block mr-2" /> Browse Gigs
          </button>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Briefcase className="text-blue-600 mb-3" size={36} />
            <h3 className="text-gray-800 text-2xl font-bold mb-2">Hire Professionals</h3>
            <p className="text-gray-600">Access a wide pool of freelancers across domains.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <PlusCircle className="text-green-600 mb-3" size={36} />
            <h3 className="text-gray-800 text-2xl font-bold mb-2">Create Gigs</h3>
            <p className="text-gray-600">Freelancers can showcase services with detailed descriptions.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <ClipboardList className="text-yellow-600 mb-3" size={36} />
            <h3 className="text-gray-800 text-2xl font-bold mb-2">Manage Orders</h3>
            <p className="text-gray-600">Track, deliver, and complete orders with a simple interface.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Star className="text-purple-600 mb-3" size={36} />
            <h3 className="text-gray-800 text-2xl font-bold mb-2">Leave Reviews</h3>
            <p className="text-gray-600">Clients can review freelancers to build trust in the platform.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <LayoutDashboard className="text-pink-600 mb-3" size={36} />
            <h3 className="text-gray-800 text-2xl font-bold mb-2">Custom Dashboards</h3>
            <p className="text-gray-600">Role-based dashboards for freelancers and clients.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500  mt-16 text-sm">
          &copy; {new Date().getFullYear()} Freelancer Marketplace. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
