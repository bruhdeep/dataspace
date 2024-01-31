"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import {
  generatePassword,
  copyToClipboard,
} from "../../utils/passwordGenerator";
import PasswordStrengthBar from "react-password-strength-bar";
import Link from "next/link";

import { validateEmail } from "@/utils/emailValidate";

export default function Register() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCaptchaFilled, setIsCaptchaFilled] = useState(false);

  // Email Validation
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isTempEmail, setIsTempEmail] = useState(false);

  // Genrate Password
  function handleGeneratePassword() {
    const generatedPassword = generatePassword(12); // Change 10 to your desired password length
    setPassword(generatedPassword);
    setConfirmPassword(generatedPassword);
    copyToClipboard(generatedPassword);
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleChangeConfirmPassword(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setConfirmPassword(event.target.value);
  }

  // Captcha
  const onChange = (value: string | null) => {
    if (value !== null) {
      setIsCaptchaFilled(true);
    } else {
      setIsCaptchaFilled(false);
    }
  };

  // Captcha Validation messsage

  // Validation
  useEffect(() => {
    const validateEmailAsync = async () => {
      try {
        const { isValid, isTemp } = await validateEmail(email);
        console.log("Email validation result:", { isValid, isTemp });

        // Additional logging for debugging
        console.log("Email validation API response:", { isValid, isTemp });

        setIsValidEmail(isValid);
        setIsTempEmail(isTemp);
      } catch (error) {
        console.error("Error during email validation:", error);

        // Additional logging for debugging
        console.error("Email validation error:", error);

        setIsValidEmail(false);
        setIsTempEmail(false);
      }
    };

    // Debounce the email validation to avoid frequent calls during typing
    const debounceTimer = setTimeout(() => {
      validateEmailAsync();
    }, 3000); // Adjust the debounce delay as needed (e.g., 500 milliseconds)

    // Clear the timer on component unmount or when the email changes
    return () => clearTimeout(debounceTimer);
  }, [email]);

  return (
    <div className="flex">
      <div className="flex w-[0%] lg:w-[30%] md:w-[30%] max-h-fit bg-[url('/BACKGROUND.png')] bg-cover">
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
      <div className="w-full">
        <div className="container mx-auto p-5 lg:p-20">
          <h1 className="text-3xl font-extrabold mb-8">
            Create an Account with Us
          </h1>

          {/* Personal Information Section*/}
          <div className="border-b-2">
            <h2 className="text-xl font-regular border-b-2S">
              Personal Information
            </h2>
          </div>
          <div className="flex my-3 justify-between">
            <div className="flex flex-col py-2 w-[40%]">
              <label>First Name</label>
              <input
                className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
                type="text"
                required
              />
            </div>
            <div className="flex flex-col py-2 w-[40%]">
              <label>Last Name</label>
              <input
                className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
                type="text"
                required
              />
            </div>
          </div>
          <div className="flex justify-between pb-5">
            <div className="flex flex-col w-[40%]">
              <label>Email</label>
              <input
                className={`border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md ${
                  email && !isValidEmail ? "border-red-500" : "border-gray-300"
                }`}
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              {email && !isValidEmail && (
                <p className="text-red-500 items-center pt-2">Invalid Email</p>
              )}
              {email && isTempEmail && (
                <p className="text-red-500">Temporary email detected</p>
              )}
            </div>
            <div className="flex flex-col w-[40%]">
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

            <div className="flex justify-between">
              <div className="flex flex-col py-2 w-[25%]">
                <label>City</label>
                <input
                  className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
                  type="text"
                  required
                />
              </div>

              <div className="flex flex-col py-2 w-[25%]">
                <label>State</label>
                <input
                  className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
                  type="text"
                  required
                />
              </div>

              <div className="flex flex-col py-2 w-[25%]">
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
              />
            </div>
          </div>

          {/* Account Security Section*/}
          <div className="border-b-2">
            <h2 className="text-xl font-regular">Account Security</h2>
          </div>

          <div>
            <div className="flex justify-between my-3">
              <div className="flex flex-col py-2 w-[40%]">
                <label>Password</label>
                <input
                  className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
                  type="text"
                  value={password}
                  onChange={handleChangePassword}
                  required
                />
                <PasswordStrengthBar
                  password={password}
                  className="pr-2 pt-1 font-semibold"
                />

                <button
                  type="button"
                  onClick={handleGeneratePassword}
                  className="w-52 h-10 text-1xl bg-[#337AB7] text-white py-2 rounded-md hover:bg-blue-600 duration-200 mt-5 drop-shadow-xl"
                >
                  Generate Password
                </button>
              </div>

              <div className="flex flex-col py-2 w-[40%]">
                <label>Confirm Password</label>
                <input
                  className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
                  type="text"
                  value={confirmPassword}
                  onChange={handleChangeConfirmPassword}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center gap-10">
            {/* ReCaptcha*/}
            <div>
              <ReCAPTCHA
                sitekey="6LezkWApAAAAAApNYV2yCP-oq1-TZVzXDMKaglUN"
                onChange={onChange}
              />
            </div>

            {/* Register Button */}
            <div className="flex float-right">
              <Link href="/">
                <button
                  type="submit"
                  disabled={!isCaptchaFilled}
                  className="border-2 py-2 px-5 rounded-md bg-[#337AB7] text-white hover:bg-blue-600 duration-200"
                >
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
