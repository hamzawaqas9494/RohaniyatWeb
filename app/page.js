"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
const validEmail = process.env.NEXT_PUBLIC_LOGIN_EMAIL;
const validPassword = process.env.NEXT_PUBLIC_LOGIN_PASSWORD;
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }

    if (email === validEmail && password === validPassword) {
      localStorage.setItem("loggedIn", "true");

      // Clear inputs
      setEmail("");
      setPassword("");

      router.push("/dashboard");
    } else {
      setError("Incorrect email or password.");
    }
  };

  return (
    <div className="min-h-screen h-[100vh] bg-gradient-to-br from-[#f8f2ec] to-[#e0d1c1] flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-3xl mb-6 font-bold text-center text-[#6C472D]">
          Login
        </h2>

        <label className="block mb-1">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6C472D]"
          placeholder="example@example.com"
          required
        />

        <label className="block mb-1">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6C472D]"
          placeholder="Enter password"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#6C472D] text-white py-2 rounded hover:bg-[#5a3b23] transition-colors"
        >
          Login
        </button>

        {error && (
          <p className="text-red-600 mt-4 text-center">{error}</p>
        )}
      </form>
    </div>
  );
}
