import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpModal = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log("Sign up successful", data);
      onClose(); // Close modal after successful sign-up
      navigate("/dashboard"); // Navigate to dashboard after successful sign-up
    } catch (err) {
      console.error("Sign up failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <h2 className="text-2xl font-bold text-center text-purple-600">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          type="submit"
          className="w-full p-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

const SignInModal = ({ onClose }) => {
  const [username, setUsername] = useState(""); // Using username instead of email
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }), // Correctly sending username
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Sign in failed");
      }

      localStorage.setItem("token", data.token);
      console.log("Sign in successful", data);
      onClose();
      navigate("/dashboard");
    } catch (err) {
      console.error("Sign in failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <h2 className="text-2xl font-bold text-center text-purple-600">
        Sign In
      </h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input
          type="text" // Changed from email to text
          placeholder="Username"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          type="submit"
          className="w-full p-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export { SignUpModal, SignInModal };
