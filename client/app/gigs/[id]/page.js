"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function GigDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/gigs/${id}`)
      .then((res) => {
        setGig(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load gig:", err);
        setLoading(false);
      });
  }, [id]);

  const placeOrder = async () => {
    const storedUser = localStorage.getItem("user");
    const client = storedUser ? JSON.parse(storedUser) : null;

    if (!client || client.role !== "client") {
      alert("Only logged-in clients can place orders.");
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        gig: gig._id,
        client: client._id,
        freelancer: gig.freelancerId,
        price: gig.price,
      });

      alert("✅ Order placed successfully!");
      router.push("/orders");
    } catch (error) {
      console.error("❌ Failed to place order:", error.response?.data || error);
      alert("Failed to place order. Check console.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!gig) return <p>Gig not found</p>;

  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        {/* 🔙 Back Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 text-sm text-blue-600 hover:text-blue-800 underline"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold text-blue-700 mb-4">{gig.title}</h1>
        <p className="text-gray-700 mb-4">{gig.description}</p>
        <p className="text-sm text-gray-500 mb-2">Freelancer: {gig.freelancerName}</p>
        <p className="text-xl text-blue-600 font-semibold mb-4">₹{gig.price}</p>

        <button
          onClick={placeOrder}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          ✅ Place Order
        </button>
      </div>
    </main>
  );
}
