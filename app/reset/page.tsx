"use client";

import { useRouter } from "next/navigation";

export default function Forget() {
  const router = useRouter();
  console.log("Error");

  router.push("/login");
  return (
    <div className="flex">
      <h1>You aren't authorized!</h1>
    </div>
  );
}
