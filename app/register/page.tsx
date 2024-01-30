"use client";

import Image from "next/image";
import { useState } from "react";

import {
  generatePassword,
  copyToClipboard,
} from "../../utils/passwordGenerator";

export default function Register() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleGeneratePassword() {
    const generatedPassword = generatePassword(10); // Change 10 to your desired password length
    setPassword(generatedPassword);
    setConfirmPassword(generatedPassword);
    copyToClipboard(generatedPassword);
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleChangeConfirmPassword(event: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(event.target.value);
  }

  return (
    <div className="flex">
      <div className="flex w-[30%] max-h-fit bg-[url('/BACKGROUND.png')] bg-cover">
        <div className="h-[20%] mx-auto">
          <Image
            className="mt-20"
            src="/dataspacelogo.png"
            alt="dataspace"
            width={250}
            height={200}
          />
        </div>
      </div>
      <div className="w-[70%]">
        <div className="container mx-auto p-24">
          <h1 className="text-3xl font-extrabold mb-8">
            Create an Account with Us
          </h1>

          {/* Personal Information Section*/}
          <div className="border-b-2">
            <h2 className="text-xl font-regular border-b-2S">
              Personal Information
            </h2>
          </div>
          <div className="flex my-3  gap-32">
            <div className="flex flex-col py-2 w-full">
              <label>First Name</label>
              <input
                className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
                type="text"
                required
              />
            </div>
            <div className="flex flex-col py-2 w-full">
              <label>Last Name</label>
              <input
                className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
                type="text"
                required
              />
            </div>
          </div>
          <div className="flex gap-32 pb-5">
            <div className="flex flex-col w-full">
              <label>Email</label>
              <input
                className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
                type="email"
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Phone number</label>
              <input
                className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
                type="tel"
                required
              />
            </div>
          </div>

          {/* Billing Section*/}
          <div className="border-b-2">
            <h2 className="text-xl font-regular">Billing Address</h2>
          </div>
          <div className="flex-col my-3">
            <div className="flex flex-col py-2 w-full">
              <label>Company Name</label>
              <input
                className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
                type="text"
                required
              />
            </div>

            <div className="flex flex-col py-2 w-full">
              <label>Street Adrress</label>
              <input
                className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
                type="text"
                required
              />
            </div>

            <div className="flex flex-col py-2 w-full">
              <label>Street Address 2</label>
              <input
                className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
                type="text"
                required
              />
            </div>

            <div className="flex gap-20">
              <div className="flex flex-col py-2 w-full">
                <label>City</label>
                <input
                  className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
                  type="text"
                  required
                />
              </div>

              <div className="flex flex-col py-2 w-full">
                <label>State</label>
                <input
                  className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
                  type="text"
                  required
                />
              </div>

              <div className="flex flex-col py-2 w-full">
                <label>Postcode</label>
                <input
                  className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
                  type="number"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col py-2 w-full">
              <label>Country</label>
              <input
                className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
                type="text"
                required
              />
            </div>

            <div className="flex flex-col py-2 w-full">
              <label>VAT Number (Optional)</label>
              <input
                className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
                type="text"
                required
              />
            </div>
          </div>

          {/* Account Security Section*/}
          <div className="border-b-2">
            <h2 className="text-xl font-regular">Account Security</h2>
          </div>

          <div>
            <div className="flex gap-32 my-3">
              <div className="flex flex-col py-2 w-full">
                <label>Password</label>
                <input
                  className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
                  type="password"
                  value={password}
                  onChange={handleChangePassword}
                  required
                />
                <button
                  type="button"
                  onClick={handleGeneratePassword}
                  className="w-[50%] h-10 text-1xl bg-[#337AB7] text-white py-2 rounded-md hover:bg-blue-600 duration-200 mt-5 drop-shadow-xl"
                >
                  Generate Password
                </button>
              </div>

              <div className="flex flex-col py-2 w-full">
                <label>Confirm Password</label>
                <input
                  className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
                  type="password"
                  value={confirmPassword}
                  onChange={handleChangeConfirmPassword}
                  required
                />
              </div>
            </div>
          </div>

          {/* Register Button */}
          <div className="flex float-right">
            <button
              type="submit"
              className="border-2 py-2 px-5 rounded-md bg-[#337AB7] text-white hover:bg-blue-600 duration-200"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
