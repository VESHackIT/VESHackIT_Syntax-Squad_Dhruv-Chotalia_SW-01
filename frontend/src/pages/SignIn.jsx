import React, { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState(""); // assuming username is the email
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("hellow world");

    try {
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Send the email as username to match the backend expectation
        body: JSON.stringify({ username: email, password }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      console.log("in handleSubmit");
      const data = await response.json();
      console.log("Sign in successful:", data);
      // Store the token in localStorage
      localStorage.setItem("token", data.token);
      // Optionally redirect or update your auth context here
    } catch (err) {
      console.error("Sign in failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-purple-600">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full p-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
