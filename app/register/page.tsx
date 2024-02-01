"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import countryData from "country-codes-list";

import InputField from "@/components/inputfield";

import {
  generatePassword,
  copyToClipboard,
} from "../../utils/passwordGenerator";
import PasswordStrengthBar from "react-password-strength-bar";
import Link from "next/link";

import { validateEmail } from "@/utils/tempEmailDetect";

export default function Register() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCaptchaFilled, setIsCaptchaFilled] = useState(false);

  // Email Validation
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isTempEmail, setIsTempEmail] = useState(false);

  // Country Code
  // const country
 
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

  //Email format validation function
  function isValidEmailFormat(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Captcha
  const onChange = (value: string | null) => {
    if (value !== null) {
      setIsCaptchaFilled(true);
    } else {
      setIsCaptchaFilled(false);
    }
  };

  // Temp Email Detection
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleEmailBlur = async () => {
    try {
      const { isTemp } = await validateEmail(email);
      console.log("Email validation result:", { isTemp });

      // Additional logging for debugging
      console.log("Email validation API response:", { isTemp });

      const isValidFormat = isValidEmailFormat(email);

      // Update state based on the result of email validation
      setIsTempEmail(typeof isTemp === "boolean" ? isTemp : isTemp === "true");
      setIsValidEmail(isValidFormat);

      // Log the validation results to the console
      console.log("Email format is valid:", isValidFormat);
      console.log("Is temp email:", isTemp);

      if (!isValidFormat) {
        console.log("Invalid email format!");
      }

      // You can directly show a message for temporary emails here
      if (isTemp === true) {
        console.log("Temp Email detected!");
      }
    } catch (error) {
      console.error("Error during email validation:", error);

      // Additional logging for debugging
      console.error("Email validation error:", error);

      // Handle errors by updating state accordingly
      setIsTempEmail(false);
      setIsValidEmail(false);
    }
  };

  return (
    <div className="flex">
      <div className="flex w-[0%] lg:w-[30%] md:w-[30%] max-h-fit bg-[url('/BACKGROUND.png')] bg-cover">
        <div className="h-[20%] mx-auto">
          <Image
            className="mt-20"
            src="/dataspacelogo.png"
            alt="dataspace"
            width={250}
            height={250}
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
            <InputField label="First Name" type="text" />

            <InputField label="Last Name" type="text" />
          </div>
          <div className="flex justify-between pb-5">
            <div className="flex flex-col w-[40%]">
              <label>Email</label>
              <input
                className={`border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md 
                }`}
                type="email"
                required
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
              />
              {isTempEmail ? (
                <p className="text-red-500 py-1">Disposable Email Detected!</p>
              ) : null}
              {email && !isValidEmail ? (
                <p className="text-red-500 py-1">Invalid Email Format!</p>
              ) : null}
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

          {/* Custom Fields */}

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
              {!isCaptchaFilled ? (
                <div
                  onClick={() => alert("Please fill the CAPTCHA!")}
                  className="border-2 py-2 px-5 rounded-md bg-[#337AB7] text-white hover:bg-blue-600 duration-200 cursor-pointer"
                >
                  Register
                </div>
              ) : (
                <Link href="/">
                  <button
                    type="submit"
                    className="border-2 py-2 px-5 rounded-md bg-[#337AB7] text-white hover:bg-blue-600 duration-200"
                  >
                    Register
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
