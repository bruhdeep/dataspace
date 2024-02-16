"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Forget() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/BACKGROUND.png')] bg-cover">
      <div className="w-full max-w-[90%] md:max-w-[60%] lg:max-w-[40%] xl:max-w-[30%] h-auto md:h-[80%] my-9 rounded-xl bg-white bg-opacity-75">
        <div className="w-[90%] md:w-[80%] lg:w-[90%] mx-auto h-full px-14 py-8 flex flex-col justify-between">
          <div className="flex justify-center m-3 w-auto h-[10%] pb-5">
            <h1 className="text-3xl font-semibold">Enter Your Email</h1>
          </div>
          <div className="flex m-2 w-auto  py-5">
            <form className="w-full">
              <input
                type="email"
                placeholder="Email"
                value={email}
                className="w-full h-20 px-7 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-xl"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </form>
          </div>
          <div className="flex justify-center m-3 w-auto h-[10%] pb-2">
            <button className="w-full h-20 text-xl font-semibold bg-[#0D5077] text-white px-4 py-2 rounded-2xl hover:bg-blue-600 duration-200 focus:outline-none focus:bg-blue-600">
              Send
            </button>
          </div>
          <div className="flex justify-center m-3 w-auto h-[10%] ">
            <Link href="/login">
              <span className="text-xl font-semibold text-[#6CA2F3]">
                Go back to login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
