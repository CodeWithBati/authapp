"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () =>{
    try {
      await axios.post("/api/users/verifyemail", {token});
    } catch (error) {
      
    }
  }

  return <div></div>;
}
