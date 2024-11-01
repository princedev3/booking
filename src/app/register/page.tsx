"use client";
// import { registerUser } from '@/actions/action'
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import toast from "react-hot-toast";

const Register = () => {
  const [error, setError] = useState<string | null>("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFormRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const names = formData.get("names") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    if (
      hasUpperCase.test(password) &&
      hasLowerCase.test(password) &&
      hasSpecialChar.test(password)
    ) {
      try {
        const res = await fetch(`http://localhost:3000/api/verify-email`, {
          method: "POST",
          body: JSON.stringify({ email, names, password }),
        });
        setError(null);
        form.reset();
        if (res.ok) {
          setLoading(false);
          toast.success("a verification code was sent to your email");
          router.push("/register/verify-otp");
        }
      } catch (err) {
        setError("Registration failed, please try again.");
        setLoading(false);
      }
    } else {
      setError(
        "Password must contain an uppercase, lowercase, and special character."
      );
      setLoading(false);
    }
  };
  const handleVisible = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={handleFormRegister}
      className="grid w-full max-w-[350px] mx-auto shadow-md  p-6 my-8 rounded-lg"
    >
      <h2 className="w-full text-center font-bold  text-xl capitalize my-4">
        Register
      </h2>
      <div className="w-full flex gap-1 flex-col mb-4">
        <label htmlFor="names" className="capitalize font-bold ">
          names
        </label>
        <input
          type="names"
          id="names"
          name="names"
          className="border outline-none p-2 rounded-md"
        />
      </div>
      <div className="w-full flex gap-1 flex-col mb-4">
        <label htmlFor="email" className="capitalize font-bold ">
          email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="border outline-none p-2 rounded-md"
        />
      </div>
      <div className="w-full flex gap-1 flex-col mb-4 relative">
        <label htmlFor="password" className="capitalize font-bold ">
          password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type={showPassword ? "text" : "password"}
          id="password"
          min={6}
          name="password"
          className="border outline-none p-2 rounded-md"
        />
        <button
          type="button"
          onClick={handleVisible}
          className="absolute top-[47%] cursor-pointer z-50 right-4 w-4 h-4 "
        >
          {showPassword ? <IoMdEye /> : <IoMdEyeOff />}{" "}
        </button>
        <p className="text-[10px] text-red-500 ">
          password must uppercase, lowercase, @%^#
        </p>
      </div>
      <button
        disabled={loading}
        type="submit"
        className={`disabled:cursor-not-allowed p-2 font-bold text-white capitalize cursor-pointer rounded-lg bg-blue-600`}
      >
        {loading ? "Creating your Account" : "Create an Account"}{" "}
      </button>
      {error && <p className="text-xs text-red-500 mb-1">{error}</p>}
      <div className="flex my-3 items-center">
        <p className=" font-semibold">Have an account?</p>
        <Link href={"/login"} className="text-blue-600 cursor-pointer text-sm">
          Login
        </Link>
      </div>
    </form>
  );
};

export default Register;
