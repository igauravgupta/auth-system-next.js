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
  });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get("/api/users/profile");
      if (response.data.status == 400) {
        router.push("/login");
      }
      setUser({
        name: response.data.user.username,
        email: response.data.user.email,
        username: response.data.user.username,
      });
    } catch (error) {
      console.log("Failed to fetch user:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout failed:", error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Name:</span> {user?.name}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Username:</span> {user?.username}
          </p>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Logout
          </button>
          <Link href="/" className="text-blue-500 hover:underline text-sm">
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
