"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const InputPasswordCose = () => {
  const email = useParams().email as string;

  const [isFormComplete, setIsFormComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState({
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
  });
  const router = useRouter();
  const handleChange = (e: any, name: string) => {
    const value = e.target.value;
    if (value.length > 1) return;
    setOtp((prev) => ({ ...prev, [name]: value }));
    if (value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text");
    const digits = pasteData.split("");
    setOtp({
      digit1: digits[0] || "",
      digit2: digits[1] || "",
      digit3: digits[2] || "",
      digit4: digits[3] || "",
    });
    e.preventDefault();
  };

  const handleFormInputChange = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const digit1 = formData.get("digit1");
    const digit2 = formData.get("digit2");
    const digit3 = formData.get("digit3");
    const digit4 = formData.get("digit4");
    const isComplete = Boolean(digit1 && digit2 && digit3 && digit4);
    setIsFormComplete(isComplete);
  };

  const handleVerifyOpt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`http://localhost:3000/api/reset-update-password`, {
      method: "PUT",
      body: JSON.stringify({ token: Object.values(otp).join(""), email }),
    });
    // const active = await res.json();
    if (res.ok) {
      setLoading(false);
      router.push(`/reset-password/${email}`);
    }
  };

  return (
    <div>
      <div className="grid w-full max-w-[400px] mx-auto my-[50px] p-8 shadow-md rounded-md">
        <form
          onInput={handleFormInputChange}
          onSubmit={handleVerifyOpt}
          className=""
        >
          <div className="mt-4 mb-10 mx-auto grid">
            <Image
              src={"/logo.svg"}
              alt=""
              width={60}
              height={60}
              className="text-center mx-auto"
            />
            <h1 className="text-center font-bold text-2xl ">
              Kindly Input your reset password code
            </h1>
          </div>
          <div className="flex justify-between mb-8">
            <input
              type="text"
              className=" border rounded-md w-16 h-16  text-center text-xl appearance-none"
              maxLength={1}
              name="digit1"
              value={otp.digit1}
              onChange={(e) => handleChange(e, "digit1")}
              onPaste={handlePaste}
            />
            <input
              type="text"
              className="w-16 h-16 border rounded-md  text-center text-xl appearance-none  no-spin"
              maxLength={1}
              value={otp.digit2}
              name="digit2"
              onChange={(e) => handleChange(e, "digit2")}
            />
            <input
              type="text"
              className="w-16 h-16 border rounded-md text-center inputs text-xl appearance-none  no-spin"
              maxLength={1}
              name="digit3"
              value={otp.digit3}
              onChange={(e) => handleChange(e, "digit3")}
            />
            <input
              type="text"
              className="w-16 h-16 border rounded-md text-center text-xl inputs appearance-none"
              maxLength={1}
              value={otp.digit4}
              name="digit4"
              onChange={(e) => handleChange(e, "digit4")}
            />
          </div>
          <button
            type="submit"
            disabled={!isFormComplete || loading}
            className="disabled:cursor-not-allowed disabled:bg-blue-400 w-full py-3 cursor-pointer bg-blue-600 text-white font-semibold capitalize rounded-md"
          >
            {loading ? "verifying..." : "verify reset code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputPasswordCose;
