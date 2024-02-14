"use client";

import Link from "next/link";
import { useState } from "react";

export default function Forget() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/BACKGROUND.png')] bg-cover">
      <div className="w-full max-w-[90%] md:max-w-[60%] lg:max-w-[40%] xl:max-w-[30%] h-auto md:h-[80%] my-9 rounded-xl bg-white bg-opacity-75">
        <div className="w-[90%] md:w-[80%] lg:w-[90%] mx-auto h-full px-14 py-8 flex flex-col justify-between">
          <div className="flex justify-center m-3 w-auto h-[10%] pb-5">
            <h1 className="text-3xl font-semibold">Create a fresh password</h1>
          </div>
          <div className="flex m-2 w-auto py-2">
            <form className="w-full">
              <div className="flex">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  className="w-full h-20 px-7 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-xl"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex py-6">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  className="w-full h-20 px-7 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-xl"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </form>
          </div>
          <div className="flex justify-center m-3 w-auto h-[10%] pb-2">
            <button className="w-full h-20 text-xl font-semibold bg-[#0D5077] text-white px-4 py-2 rounded-2xl hover:bg-blue-600 duration-200 focus:outline-none focus:bg-blue-600">
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
