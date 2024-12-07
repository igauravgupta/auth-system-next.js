"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function Resetpassword() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const forgetPassword = async () => {
    await axios.post("/api/users/forgetPassword", {
      token,
      password,
    });
  };

  useEffect(() => {
    const token: any = searchParams.get("token");
    setToken(token);
  }, [searchParams]);
  return (
    <div>
      <h1>Reset Password</h1>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={forgetPassword}>Reset Password</button>
    </div>
  );
}
