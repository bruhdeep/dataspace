"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import PasswordStrengthBar from "react-password-strength-bar";
import { PasswordCriteria } from "@/utils/passwordCriteria";

export default function Forget({ params }: { params: { token: string } }) {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const [token, setToken] = useState(params.token);

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

  const handlereset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const apiBaseUrl = "http://172.16.100.116:8080";
      const resetEndpoint = "/users/resetPassword";

      const response = await axios.post(apiBaseUrl + resetEndpoint, {
        password: password,
        token: token,
      });

      console.log("Password Reset", response.data);
    } catch (error) {
      console.error("Reset Error", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/BACKGROUND.png')] bg-cover">
      <div className="w-full max-w-[90%] md:max-w-[60%] lg:max-w-[40%] xl:max-w-[30%] h-auto md:h-[80%] my-9 rounded-xl bg-white bg-opacity-75">
        <div className="w-[90%] md:w-[80%] lg:w-[90%] mx-auto h-full px-14 py-8 flex flex-col justify-between">
          <div className="flex justify-center m-3 w-auto h-[10%] pb-5">
            <h1 className="text-3xl font-semibold">Create a new password</h1>
          </div>
          <div className="flex m-2 w-auto py-2">
            <form className="w-full" onSubmit={handlereset}>
              <div className="relative flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  className="w-full h-20 px-7 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-xl"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <AiOutlineEye size={30} color="gray" />
                  ) : (
                    <AiOutlineEyeInvisible size={30} color="gray" />
                  )}
                </i>
              </div>

              <div className="py-6">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  className="w-full h-20 px-7 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-xl"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setConfirmPasswordTouched(true)}
                  required
                />
                {confirmPasswordTouched && confirmPassword !== password && (
                  <p className="text-red-500 p-1">Passwords do not match!</p>
                )}
              </div>
              <div className="pl-2 pb-4">
                <PasswordStrengthBar
                  password={password}
                  className="pr-2 pt-1 font-semibold"
                  barColors={["white", "red", "yellow", "blue", "green"]}
                />
                <PasswordRequirements />
              </div>
              <div className="flex justify-center m-3 w-auto h-[10%] pb-2">
                {!isPasswordValid ? (
                  <button
                    onClick={() => alert("Please meet the password criteria!")}
                    className="w-full h-20 text-xl font-semibold bg-[#0D5077] text-white px-4 py-2 rounded-2xl hover:bg-blue-600 duration-200 focus:outline-none focus:bg-blue-600"
                  >
                    Reset Password
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full h-20 text-xl font-semibold bg-[#0D5077] text-white px-4 py-2 rounded-2xl hover:bg-blue-600 duration-200 focus:outline-none focus:bg-blue-600"
                  >
                    Reset Password
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
