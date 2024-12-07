"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  const verifyEmail = async (tokenToVerify: string) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/verifyEmail", {
        token: tokenToVerify,
      });
      setVerified(true);
    } catch (error: any) {
      setError(error.response?.data?.error || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) {
      setToken(urlToken);
      verifyEmail(urlToken);
    } else {
      setError("No verification token found");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Verifying your email...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (verified) {
    return <div>Email verified successfully!</div>;
  }

  return <div>Something went wrong</div>;
}
