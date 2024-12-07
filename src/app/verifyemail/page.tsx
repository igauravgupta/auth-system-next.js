"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");

  const verifyEmail = async () => {
    const response = await axios.post("/api/users/verifyEmail", {
      token: token,
    });
    console.log(response);
  };
  useEffect(() => {
    const token: any = searchParams.get("token");
    setToken(token);
    verifyEmail();
  }, [token]);
  return <div>Email Verified</div>;
}
