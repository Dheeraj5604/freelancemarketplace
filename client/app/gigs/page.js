"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BrowseGigs() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/gigs") // Adjust your API route
      .then(res => {
        setGigs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching gigs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Browse Gigs</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading gigs...</p>
        ) : gigs.length === 0 ? (
          <p className="text-center text-gray-500">No gigs available right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <div key={gig._id} className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
                <h2 className="text-xl font-semibold text-blue-800 mb-2">{gig.title}</h2>
                <p className="text-gray-600 mb-2 line-clamp-2">{gig.description}</p>
                <p className="text-sm text-gray-500 mb-1">By: {gig.freelancerName || "Unknown"}</p>
                <p className="text-blue-700 font-bold">₹{gig.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
