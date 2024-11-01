"use client";
import { ChangeUserPassword } from "@/components/actions/action";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoIosCheckmark, IoMdEye, IoMdEyeOff } from "react-icons/io";

const ResetPassword = () => {
  const router = useRouter();
  const email = useParams().email as string;
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasSpecialChar: false,
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPasswordCriteria({
      hasUppercase: /[A-Z]/.test(newPassword),
      hasLowercase: /[a-z]/.test(newPassword),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    });
  };

  const handleInputChange = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    setIsPasswordCorrect(password === confirmPassword);
    const isComplete = Boolean(password) && Boolean(confirmPassword);
    setIsFormComplete(isComplete);
    e.preventDefault();
  };

  const ChangePassword = async (formData: FormData) => {
    setLoading(true);
    const res = await ChangeUserPassword(formData);
    if (res.message === "password updated") {
      toast.success(res.message);
      router.push("/login");
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <div>
      <div className="grid w-full max-w-[400px] mx-auto my-[50px] p-8 shadow-md rounded-md">
        <form className="" action={ChangePassword} onInput={handleInputChange}>
          <input type="hidden" value={email} name="email" />
          <div className="mt-4 mb-10 mx-auto grid">
            <Image
              src={"/logo.svg"}
              alt=""
              width={60}
              height={60}
              className="text-center mx-auto"
            />
            <h1 className="text-center font-bold text-2xl ">
              Enter new password
            </h1>
          </div>
          <div className="flex flex-col  justify-between mb-8">
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                onChange={handlePasswordChange}
                minLength={6}
                className=" border rounded-md w-full p-2 placeholder:capitalize  text-lg appearance-none"
                name="password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[30%] cursor-pointer z-50 right-4 w-4 h-4 "
              >
                {showPassword ? <IoMdEye /> : <IoMdEyeOff />}{" "}
              </button>
            </div>

            <div className="mt-2 flex flex-col gap-1">
              <div className="flex items-center gap-4">
                <p
                  className={`${
                    passwordCriteria.hasUppercase
                      ? "bg-blue-600 border-blue-600"
                      : ""
                  } border rounded-full`}
                >
                  <IoIosCheckmark className="text-white w-5 h-5" />
                </p>
                <p
                  className={`${
                    passwordCriteria.hasUppercase
                      ? " text-blue-600  "
                      : "text-gray-400 "
                  } text-[12px] `}
                >
                  Password must contain uppercase
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p
                  className={`${
                    passwordCriteria.hasSpecialChar
                      ? "bg-blue-600 border-blue-600"
                      : ""
                  } border rounded-full`}
                >
                  <IoIosCheckmark className="text-white w-5 h-5" />
                </p>
                <p
                  className={`${
                    passwordCriteria.hasSpecialChar
                      ? " text-blue-600  "
                      : "text-gray-400 "
                  } text-[12px] `}
                >
                  Password must contain special-character
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p
                  className={`${
                    passwordCriteria.hasLowercase
                      ? "bg-blue-600 border-blue-600"
                      : ""
                  } border rounded-full`}
                >
                  <IoIosCheckmark className="text-white w-5 h-5" />
                </p>
                <p
                  className={`${
                    passwordCriteria.hasLowercase
                      ? " text-blue-600  "
                      : "text-gray-400 "
                  } text-[12px] `}
                >
                  Password must contain lowercase
                </p>
              </div>
            </div>
            <div className="relative w-full ">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="confirm password"
                minLength={6}
                className=" border rounded-md w-full  p-2 placeholder:capitalize text-lg appearance-none  mt-7 no-spin"
                name="confirmPassword"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[60%] cursor-pointer z-50 right-4 w-4 h-4 "
              >
                {showPassword ? <IoMdEye /> : <IoMdEyeOff />}{" "}
              </button>
            </div>
          </div>
          <button
            disabled={!isFormComplete || !isPasswordCorrect || loading}
            type="submit"
            className="disabled:cursor-not-allowed disabled:bg-blue-400 w-full py-3 cursor-pointer bg-blue-600 text-white font-semibold capitalize rounded-md"
          >
            reset password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
