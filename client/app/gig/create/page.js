"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddGig() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    freelancerName: "", // Later you can fetch this from auth
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "freelancer") {
      alert("Only logged-in freelancers can create gigs.");
      setLoading(false);
      return;
    }

    const dataToSend = {
      ...form,
      freelancerId: storedUser._id,
    };
console.log("➡️ Sending this data to backend:", dataToSend);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/gigs`,
      dataToSend
    );

    console.log("Gig created:", res.data);
    router.push("/gigs");
  } catch (error) {
    console.error("Gig creation failed:", error.response?.data || error);
    alert("Gig creation failed. Check console for details.");
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        {/* 🔙 Back Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 text-sm text-blue-600 hover:text-blue-800 underline"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold text-blue-600 mb-6">➕ Add New Gig</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Gig Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <textarea
            name="description"
            placeholder="Detailed Description"
            value={form.description}
            onChange={handleChange}
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price in ₹"
            value={form.price}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            name="freelancerName"
            placeholder="Your Name"
            value={form.freelancerName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full"
          >
            {loading ? "Creating..." : "Create Gig"}
          </button>
        </form>
      </div>
    </main>
  );
}
