"use client";
import { Mail, User, Lock, Eye, EyeClosed, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [nameErr, setNameErr] = useState("");
  const { signup, isSigningUp} =
    useAuthStore();

  const handleEmailError = () => {
    if (!formData.email.trim()) {
      setEmailErr("Email is Required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailErr("Invalid Email Format");
    }
  };

  const handlePasswordError = () => {
    if (!formData.password.trim()) {
      setPasswordErr("Password Is Required");
    } else if (formData.password.trim().length < 6) {
      setPasswordErr("Password must be at least 6 characters");
    }
  };

  const handleNameErr = () => {
    if (!formData.name.trim()) {
      setNameErr("Name Is Required");
    }
  };

  const validateForm = () => {
    let emailError = "";
    let nameError = "";
    let passwordError = "";

    if (!formData.email.trim()) {
      emailError = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      emailError = "Invalid email format";
    }

    if (!formData.name.trim()) {
      nameError = "Name is required";
    }

    setNameErr(nameError);

    if (!formData.password.trim()) {
      passwordError = "Password is required";
    } else if (formData.password.length < 6) {
      passwordError = "Password must be at least 6 characters";
    }

    setEmailErr(emailError);
    setPasswordErr(passwordError);

    return !emailError && !passwordError && !nameError;
  };
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors");
      return;
    }
    signup(formData);

    setFormData({ email: "", password: "", name: "" });
  }
  return (
    <>
      {/* Your existing Signup form JSX goes here */}

      <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-base-200">
        <div className="card w-full max-w-md bg-base-100 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body gap-4">
            <h2 className="text-2xl font-bold text-center">Create Account</h2>

            {/* Email */}
            <div className="form-control">
              <label className="input input-bordered flex items-center gap-2 w-full ">
                <Mail className="w-5 h-5 opacity-70" />
                <input
                  type="text"
                  aria-label="Email"
                  onBlur={handleEmailError}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setEmailErr("");
                  }}
                  placeholder="Email"
                  className="grow"
                />
              </label>
              {emailErr && (
                <p className="text-error text-sm mt-1">{emailErr}</p>
              )}
            </div>

            {/* Name */}
            <div className="form-control">
              <label className="input input-bordered flex items-center gap-2 w-full">
                <User className="w-5 h-5 opacity-70" />
                <input
                  type="text"
                  aria-label="Name"
                  value={formData.name}
                  onBlur={handleNameErr}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    setNameErr("");
                  }}
                  placeholder="Name"
                  className="grow"
                />
              </label>
              {nameErr && <p className="text-error text-sm mt-1">{nameErr}</p>}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="input input-bordered flex items-center gap-2 w-full">
                <Lock className="w-5 h-5 opacity-70" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  aria-label="Password"
                  onBlur={handlePasswordError}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setPasswordErr("");
                  }}
                  placeholder="Password"
                  className="grow"
                />
                <button
                  aria-label="Toggle Password Visibility"
                  type="button"
                  onClick={(e) => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeClosed className="w-5 h-5 opacity-70 cursor-pointer" />
                  ) : (
                    <Eye className="w-5 h-5 opacity-70 cursor-pointer" />
                  )}
                </button>
              </label>
              {passwordErr && (
                <p className="text-error text-sm mt-1">{passwordErr}</p>
              )}
            </div>

            <button
              aria-label="Signup"
              className="btn btn-primary w-full mt-4"
              disabled={
                isSigningUp ||
                !formData.email.trim() ||
                !formData.password.trim() ||
                !formData.name.trim() ||
                emailErr ||
                passwordErr ||
                nameErr
              }
            >
              {isSigningUp ? <Loader2 className="animate-spin" /> : "Sign Up"}
            </button>

            <p className="text-center text-sm">
              Already have an account?
              <Link href="/login" className="link link-primary ml-1">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
