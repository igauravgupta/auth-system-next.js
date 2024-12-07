"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    isVerified: false,
  });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get("/api/users/profile");
      if (response.data.status === 400) {
        router.push("/login");
      }
      setUser({
        name: response.data.user.username,
        email: response.data.user.email,
        username: response.data.user.username,
        isVerified: Boolean(response.data.user.isVerified),
      });
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const sendVerificationEmail = async () => {
    try {
      await axios.post("/api/users/sendVerificationEmail", {
        email: user.email,
      });
      alert("Verification email sent");
    } catch (error) {
      console.error("Failed to send verification email:", error);
    }
  };

  const forgetPassword = async () => {
    try {
      await axios.post("/api/users/sendForgetPasswordMail", {
        email: user.email,
      });
      alert("Forget password email sent");
    } catch (error) {
      console.error("Failed to send forget password email:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Your Profile
        </h1>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Name:</span>
            <span className="text-gray-900 font-semibold">
              {user.name || "-"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Email:</span>
            <span className="text-gray-900 font-semibold">
              {user.email || "-"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Username:</span>
            <span className="text-gray-900 font-semibold">
              {user.username || "-"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Verified:</span>
            <div className="flex items-center space-x-4">
              <span
                className={`font-semibold ${
                  user.isVerified ? "text-green-600" : "text-red-600"
                }`}
              >
                {user.isVerified ? "Yes" : "No"}
              </span>
              {!user.isVerified && (
                <button
                  onClick={sendVerificationEmail}
                  className="text-blue-500 hover:text-blue-600 font-medium text-sm"
                >
                  Verify Now
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col space-y-4">
          <button
            onClick={logout}
            className="w-full py-2 px-4 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-150"
          >
            Logout
          </button>
          <button
            onClick={forgetPassword}
            className="w-full py-2 px-4 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-150"
          >
            Forget Password
          </button>
          <Link
            href="/"
            className="text-center text-blue-500 hover:underline text-sm"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
