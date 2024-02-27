"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import ReCAPTCHA from "react-google-recaptcha";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { AsYouType } from "libphonenumber-js";

import InputField from "@/components/inputfield";

import {
  generatePassword,
  copyToClipboard,
} from "../../utils/passwordGenerator";
import PasswordStrengthBar from "react-password-strength-bar";

import { validateEmail } from "@/utils/tempEmailDetect";
import { PasswordCriteria } from "@/utils/passwordCriteria";
import axios from "axios";

export default function Register() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [isCaptchaFilled, setIsCaptchaFilled] = useState(false);

  // Email Validation
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isTempEmail, setIsTempEmail] = useState(false);
  const [DisplayInvalid, setDisplayInvalid] = useState(false);

  // Country Code
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);

  // Backend Integratiom
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Company, setCompany] = useState("");
  const [StreetAddress, setStreetAddress] = useState("");
  const [StreetAddress2, setStreetAddress2] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [Postcode, setPostcode] = useState("");
  const [Country, setCountry] = useState("");
  const [VatNumber, setVatNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneWithoutCountryCode, setPhoneWithoutCountryCode] = useState("");

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const apiBaseUrl = "http://172.16.100.116:8080";
      const RegEndpoint = "/auth/register";

      const response = await axios.post(apiBaseUrl + RegEndpoint, {
        firstName: Firstname,
        lastName: Lastname,
        email: email,
        countryTeleCode: countryCode,
        phone: phoneWithoutCountryCode,
        companyName: Company,
        streetAddress: StreetAddress,
        streetAddress2: StreetAddress2,
        city: City,
        state: State,
        postcode: Postcode,
        country: Country,
        vatNumber: VatNumber,
        password: password,
        confirmPassword: confirmPassword,
      });

      console.log(response.data);

      router.push("/");
    } catch (error) {
      console.error("Error during registration:", error);

      // Additional logging for debugging
    }
  };

  const handlePhoneChange = (
    value: string,
    country: any,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => {
    // Format the phone number as the user types
    const phoneNumber = new AsYouType(country).input(value);

    // Access the country code directly from the country state
    const currentCountryCode = country ? `+${country.dialCode}` : "";

    // Check if the phone number is valid
    if (phoneNumber) {
      setPhoneNumber(phoneNumber.substring(currentCountryCode.length));
      setCountryCode(currentCountryCode);
      setValid(true);
    } else {
      // If the user has entered the phone number without selecting the country code
      setPhoneNumber(value);
      setValid(false);
      // handle invalid phone number
    }
  };
  // Password Criteriae
  const PasswordRequirements = () => (
    <div className="mb-4">
      <PasswordCriteria
        label="At least 12 characters"
        isValid={password.length >= 12}
      />
      <PasswordCriteria
        label="At least one lowercase letter"
        isValid={/[a-z]/.test(password)}
      />
      <PasswordCriteria
        label="At least one uppercase letter"
        isValid={/[A-Z]/.test(password)}
      />
      <PasswordCriteria
        label="At least one digit"
        isValid={/\d/.test(password)}
      />
      <PasswordCriteria
        label="At least one special character"
        isValid={/[!@#$%^&*(),.?":{}|<>]/.test(password)}
      />
    </div>
  );

  useEffect(() => {
    // Check password criteria and update isPasswordValid state
    const isPasswordCriteriaMet =
      password.length >= 12 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setIsPasswordValid(isPasswordCriteriaMet);
  }, [password]);

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

  // Temp Email Detection
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayInvalid(false);
    setEmail(event.target.value);
  };

  const handleEmailFocus = () => {
    setDisplayInvalid(false);
  };

  const handleEmailBlur = async () => {
    try {
      const { isTemp } = await validateEmail(email);

      const { isValid } = await validateEmail(email);

      console.log("Email validation result:", { isTemp, isValid });

      // Additional logging for debugging
      console.log("Email validation API response:", { isTemp, isValid });

      const isValidFormat = isValidEmailFormat(email);

      // Update state based on the result of email validation
      setIsTempEmail(typeof isTemp === "boolean" ? isTemp : isTemp === "true");
      setIsValidEmail(isValid && isValidFormat);

      // Log the validation results to the console
      console.log("Email format is valid:", isValidFormat);
      console.log("Is temp email:", isTemp);

      if (!isValidFormat) {
        setTimeout(() => {
          setDisplayInvalid(true);
        }, 1200);
      }

      // You can directly show a message for temporary emails here
      if (isTemp === true) {
        console.log("Temp Email detected!");
      }

      setEmail;
    } catch (error) {
      console.error("Error during email validation:", error);

      // Additional logging for debugging
      console.error("Email validation error:", error);

      // Handle errors by updating state accordingly
      setIsTempEmail(false);
      setIsValidEmail(false);
    }
  };

  // Captcha
  const onChange = (value: string | null) => {
    if (value !== null) {
      setIsCaptchaFilled(true);
    } else {
      setIsCaptchaFilled(false);
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
      <form className="w-full" onSubmit={handleRegister}>
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
            <InputField
              label="First Name"
              type="text"
              value={Firstname}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFirstname(e.target.value)
              }
            />

            <InputField
              label="Last Name"
              type="text"
              value={Lastname}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLastname(e.target.value)
              }
            />
          </div>
          <div className="flex justify-between pb-5">
            <div className="flex flex-col w-[40%]">
              <label>Email</label>
              <input
                className={`border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-[0_4px_3px_rgba(0,0,0,0.06)] 
                `}
                type="email"
                value={email}
                required
                onChange={handleEmailChange}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
              />
              {isTempEmail ? (
                <p className="text-red-500 p-1">Disposable Email Detected!</p>
              ) : null}
              {email && !isValidEmail && DisplayInvalid ? (
                <p className="text-red-500 p-1">Invalid Email Format!</p>
              ) : null}
            </div>
            <div className="flex w-[40%]">
              <div className="flex flex-col w-full">
                <label>Phone number</label>
                <div className="flex w-full justify-between">
                  <div className="w-[10%]">
                    <PhoneInput
                      country={"us"}
                      value={countryCode}
                      onChange={handlePhoneChange}
                      autoFormat={false}
                      inputStyle={{
                        border: "1px solid rgba(128, 128, 128, 0.31)",
                        borderRadius: "0.25rem",
                        padding: "0.268rem 1rem", // Adjust the percentage for responsiveness
                        width: "20%", // Make the input take full width
                        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.04)",
                      }}
                    />
                  </div>
                  <div className="w-[85%]">
                    <input
                      className={
                        "border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-[0_4px_3px_rgba(0,0,0,0.06)] w-[98%]"
                      }
                      type="tel"
                      value={phoneWithoutCountryCode}
                      onChange={(e) =>
                        setPhoneWithoutCountryCode(e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/*
                {!valid && (
                  <p className="text-red-500 py-1">
                    {" "} 
                    Please enter valid phone number!
                  </p>
                )}
              */}
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
                className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-[0_4px_3px_rgba(0,0,0,0.06)]"
                type="text"
                value={Company}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCompany(e.target.value)
                }
                required
              />
            </div>

            <div className="flex flex-col py-2 w-full">
              <label>Street Adrress</label>
              <input
                className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-[0_4px_3px_rgba(0,0,0,0.06)]"
                type="text"
                required
                value={StreetAddress}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStreetAddress(e.target.value)
                }
              />
            </div>

            <div className="flex flex-col py-2 w-full">
              <label>Street Address 2</label>
              <input
                className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-[0_4px_3px_rgba(0,0,0,0.06)]"
                type="text"
                required
                value={StreetAddress2}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStreetAddress2(e.target.value)
                }
              />
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col py-2 w-[30%]">
                <label>City</label>
                <input
                  className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-[0_4px_3px_rgba(0,0,0,0.06)]"
                  type="text"
                  required
                  value={City}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCity(e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col py-2 w-[30%]">
                <label>State</label>
                <input
                  className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-[0_4px_3px_rgba(0,0,0,0.06)]"
                  type="text"
                  required
                  value={State}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setState(e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col py-2 w-[30%]">
                <label>Postcode</label>
                <input
                  className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-[0_4px_3px_rgba(0,0,0,0.06)]"
                  type="number"
                  required
                  value={Postcode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPostcode(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex flex-col py-2 w-full">
              <label>Country</label>
              <input
                className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-[0_4px_3px_rgba(0,0,0,0.06)]"
                type="text"
                required
                value={Country}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCountry(e.target.value)
                }
              />
            </div>

            <div className="flex flex-col py-2 w-full">
              <label>VAT Number (Optional)</label>
              <input
                className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-[0_4px_3px_rgba(0,0,0,0.06)]"
                type="text"
                value={VatNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setVatNumber(e.target.value)
                }
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
                <div className="relative">
                  <input
                    className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-[0_4px_3px_rgba(0,0,0,0.06)]  pr-10 w-full" // Add right padding to prevent text overlap
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handleChangePassword}
                    required
                  />
                  <i
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2 flex items-center" // Align to the right
                  >
                    {showPassword ? (
                      <AiOutlineEye size={22} color="gray" />
                    ) : (
                      <AiOutlineEyeInvisible size={22} color="gray" />
                    )}
                  </i>
                </div>
                <PasswordStrengthBar
                  password={password}
                  className="pr-2 pt-1 font-semibold"
                />
                <PasswordRequirements />

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
                  className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-[0_4px_3px_rgba(0,0,0,0.06)]"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleChangeConfirmPassword}
                  required
                />
                {confirmPassword !== password && (
                  <p className="text-red-500 py-1">Passwords do not match!</p>
                )}
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
              {!isCaptchaFilled || !isPasswordValid ? (
                <div
                  onClick={() =>
                    alert("Please fill the CAPTCHA and meet password criteria!")
                  }
                  className="border-2 py-2 px-5 rounded-md bg-[#337AB7] text-white hover:bg-blue-600 duration-200 cursor-pointer"
                >
                  Register
                </div>
              ) : (
                <button
                  type="submit"
                  className="border-2 py-2 px-5 rounded-md bg-[#337AB7] text-white hover:bg-blue-600 duration-200"
                >
                  Register
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
