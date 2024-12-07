"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const signupUser = async () => {
    try {
      setButtonDisabled(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      router.push("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setButtonDisabled(false);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        SignupPage
        <hr />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
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
        <button onClick={signupUser} className="bg-blue-500 text-white p-2">
          {buttonDisabled ? "Signing up..." : "Signup"}
        </button>
        <Link rel="login" href="/login">
          for Login, visit here
        </Link>
      </div>
    </>
  );
}
