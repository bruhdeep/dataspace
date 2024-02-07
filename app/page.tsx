"use client";

import Link from "next/link";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    console.log("Cookies before removal:", Cookies.get()); // Log cookies before removal
    Cookies.remove("accessToken");
    console.log("accessToken cookie removed");
    console.log("Cookies after removal:", Cookies.get());
  };

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="text-black">
      Home page test demo
      <img src="" alt="" />
      <br />
      <Link href="/login">Login page</Link>
      <br />
      <Link href="/register">Register Page</Link>
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
