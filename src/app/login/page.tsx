"use client";
import { RemoveNullContext } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isLoginFormComplete, setIsLoginFormComplete] = useState(false);
  const [open, setOpen] = useState(false);
  const { updateUser } = RemoveNullContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleVisible = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formdata = new FormData(e.currentTarget);
      const email = formdata.get("email");
      const password = formdata.get("password");
      const res = await fetch(`http://localhost:3000/api/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      updateUser(await res.json());
      if (res.ok) {
        router.push("/");
        const resUser = await res.json();
        setLoading(false);
      } else {
        toast.error("failed to login");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;

      const res = await fetch(`http://localhost:3000/api/update-password`, {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        router.push(`/input-reset-code/${email}`);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleFormInputChange = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const email = Boolean(formData.get("email"));
    setIsFormComplete(email);
  };
  const handleFormLoginInputChange = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const email = formData.get("email");
    const isComplete = Boolean(email && password);
    setIsLoginFormComplete(isComplete);
  };

  return (
    <div className="grid w-full max-w-[350px] mx-auto shadow-md  p-6 my-8 rounded-lg">
      <form
        onSubmit={handleLogin}
        onInput={handleFormLoginInputChange}
        className="grid"
      >
        <h2 className="w-full text-center font-bold  text-xl capitalize my-4">
          login
        </h2>
        <div className="w-full flex gap-1 flex-col mb-4">
          <label htmlFor="email" className="capitalize font-bold ">
            email
          </label>
          <input
            type="email"
            id="email"
            required
            name="email"
            className="border outline-none p-2 rounded-md"
          />
        </div>
        <div className="w-full flex gap-1 flex-col mb-4 relative">
          <label htmlFor="password" className="capitalize font-bold ">
            password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            required
            className="border outline-none p-2 rounded-md"
          />
          <button
            type="button"
            onClick={handleVisible}
            className="absolute top-[60%] cursor-pointer z-50 right-4 w-4 h-4 "
          >
            {showPassword ? <IoMdEye /> : <IoMdEyeOff />}{" "}
          </button>
        </div>
        <button
          disabled={loading || !isLoginFormComplete}
          className="disabled:cursor-not-allowed p-2 font-bold text-white capitalize cursor-pointer rounded-lg bg-blue-600"
        >
          Login
        </button>
        <div className="flex my-3 items-center text-sm">
          <p className=" font-semibold">No account?</p>
          <Link
            href={"/register"}
            className="text-blue-600 cursor-pointer text-sm"
          >
            Register
          </Link>
        </div>
        <div className="flex  items-center text-sm mt-5">
          <p className=" font-semibold">Forgot password?</p>
          <p
            onClick={() => setOpen(!open)}
            className="text-blue-600 cursor-pointer text-sm "
          >
            Reset
          </p>
        </div>
      </form>
      {open && (
        <form
          onInput={handleFormInputChange}
          onSubmit={handleResetPassword}
          className=""
        >
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            className="border outline-none p-1 rounded-md mt-2 w-full "
          />
          <button
            disabled={loading || !isFormComplete}
            type="submit"
            className="disabled:cursor-not-allowed p-2 disabled:bg-blue-300 font-medium text-white capitalize cursor-pointer rounded-lg bg-blue-600 w-full mt-2"
          >
            reset password
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
