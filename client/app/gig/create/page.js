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
    freelancerName: "", // You can fetch this from auth later
  });

  const [loading, setLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState("");
  const [aiKeywords, setAiKeywords] = useState([]);
  const [created, setCreated] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAiSummary("");
    setAiKeywords([]);
    setCreated(false);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/gigs`,
        form
      );

      console.log("Gig created:", res.data);

      // ✅ Set AI-generated fields from backend response
      setAiSummary(res.data.summary);
      setAiKeywords(res.data.keywords);
      setCreated(true);

      // ✅ Optional delay to show AI output before redirect
      setTimeout(() => {
        router.push("/gigs");
      }, 3000);
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

        {/* ✅ AI Output Preview */}
        {created && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            {aiSummary && (
              <>
                <h3 className="text-lg font-semibold mb-2">🧠 AI Summary:</h3>
                <p className="text-gray-700">{aiSummary}</p>
              </>
            )}

            {aiKeywords.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mt-4 mb-2">🔑 AI Keywords:</h3>
                <div className="flex flex-wrap gap-2">
                  {aiKeywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
