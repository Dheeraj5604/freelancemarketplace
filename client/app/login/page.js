"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const router = useRouter();
  const auth = useAuth();
  if (!auth) return null;
  const { login } = auth;

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, data);
      login(res.data);
      router.push("/dashboard");
    } catch (e) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Welcome Back</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full p-3 border border-black rounded-lg border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full p-3 border border-black rounded-lg border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
          <button>
            <a href="/register" className="space-y text-blue-600 hover:underline text-center block">
              Register
            </a>
          </button>
          <button>
            <a href="/forgot-password" className="space-y text-blue-600 hover:underline text-center block">
              Forgot Password?
            </a>
          </button>
          <button>
            <a href="/" className="space-y text-blue-600 hover:underline text-center block">
              Home page
            </a>
          </button>
        </form>
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}
