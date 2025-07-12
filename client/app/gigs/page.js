"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function BrowseGigs() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch user from localStorage (or your auth context)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/gigs`)
      .then(res => {
        setGigs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching gigs:", err);
        setLoading(false);
      });
  }, []);

  const handlePurchase = async (gig) => {
  if (!user || user.role !== "client") {
    alert("Only clients can purchase gigs.");
    return;
  }

  if (!gig.freelancerId) {
    alert("Freelancer info missing. Cannot place order.");
    return;
  }

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
      gig: gig._id,
      client: user._id,
      freelancer: gig.freelancerId, // ✅ Use freelancer ID here
      price: gig.price,
    });

    alert("✅ Order placed successfully!");
  } catch (err) {
    console.error("❌ Order creation failed:", err.response?.data || err);
    alert("Failed to place order.");
  }
};


  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto">
        {/* 🔙 Back Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 text-sm text-blue-600 hover:text-blue-800 underline"
        >
          ← Back to Dashboard
        </button>
        
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Browse Gigs</h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="animate-pulse bg-white p-5 rounded-lg shadow">
                <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : gigs.length === 0 ? (
          <p className="text-center text-gray-500">No gigs available right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <div key={gig._id} className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
                <h2 className="text-xl font-semibold text-blue-800 mb-2">{gig.title}</h2>
                <p className="text-gray-600 mb-2 line-clamp-2">{gig.description}</p>
                <p className="text-sm text-gray-500 mb-1">By: {gig.freelancerName || "Unknown"}</p>
                <p className="text-blue-700 font-bold mb-2">₹{gig.price}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/gigs/${gig._id}`)}
                    className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
                  >
                    View Details
                  </button>

                  {user?.role === "client" && (
                    <button
                      onClick={() => handlePurchase(gig)}
                      className="text-sm text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition"
                    >
                      Purchase
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
