import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    }
  }, []);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true); // Start loading

    // Validate phone number
    if (!/^01\d{9}$/.test(phone)) {
      setError('Phone number must start with "01" and be 11 digits long.');
      setLoading(false); // Stop loading
      return;
    }

    try {
      const response = await fetch("https://full-start-rastaurant-back-end.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });

      const data = await response.json();
      setSuccess(true); // Set success state
      setLoading(false); // Stop loading
      localStorage.setItem("user", JSON.stringify(data));
      router.reload();
    } catch (error) {
      setError(error.message);
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Login
        </h2>
        <form onSubmit={handleLogin} className="text-black">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {user?.phone ? (
            <button
              className={`bg-blue-300 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded w-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled
            >
              Already Login
            </button>
          ) : (
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading} // Disable button when loading
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          )}

          {success && (
            <div className="text-green-500 mb-4">{success}</div>
          )}
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div>
            <p>
              {"Don't have any account?"}{" "}
              <Link href={"/components/LogIn/SignUp"} className="text-blue-400">
                SignUp
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
