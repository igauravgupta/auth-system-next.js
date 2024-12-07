"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const loginUser = async () => {
    try {
      setButtonDisabled(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);
      router.push(`/profile/${response.data.user}`);
    } catch (error) {
      console.log(error);
    } finally {
      setButtonDisabled(false);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        LoginPage
        <hr />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          onClick={loginUser}
          className="bg-blue-500 text-white p-2"
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Logging in..." : "Login"}
        </button>
        <Link rel="signup" href="/signup">
          for Signup, visit here
        </Link>
      </div>
    </>
  );
}
