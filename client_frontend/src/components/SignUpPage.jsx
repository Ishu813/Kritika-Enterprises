import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import "./LoginPageStyle.css";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      setError("Passwords do not match");
      return null;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      setSuccessMsg("Account created successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setError("");
      window.location.href = "/login";
    } catch (err) {
      setError(err.message);
      setSuccessMsg("");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User:", user.displayName, user.email);
      // Redirect if needed
      window.location.href = "/";
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-[#f2f3ff] px-2 sm:px-4">
      <div className="flex flex-col lg:flex-row bg-white shadow-[0_6px_16px_rgba(135,206,235,0.5)] m-2 sm:m-4 p-2 sm:p-4 rounded-lg w-full max-w-7xl">
        {/* Image Section */}
        <div className="hidden lg:flex items-center justify-center w-full max-w-lg bg-white">
          <img
            src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-bill_516790-2301.jpg"
            alt="signupimage"
            className="object-contain w-full h-auto"
          />
        </div>
        {/* Form Section */}
        <div
          className="flex flex-col justify-center items-center bg-white shadow-md p-4 sm:p-8 md:p-12 w-full"
          style={{ color: "grey" }}
        >
          <p className="text-blue-900 text-2xl font-bold mb-2">SignUp</p>
          <p className="text-center mb-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-700 underline"
            >
              Login
            </a>
          </p>
          <div className="flex flex-col w-full max-w-md mb-4">
            <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
              <i className="fa-solid fa-user text-blue-700"></i> Full Name
            </label>
            <input
              name="fullname"
              placeholder="Jane Doe"
              className="p-3 border-2 border-gray-300 rounded-lg w-full"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full max-w-md mb-4">
            <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
              <i className="fa-solid fa-envelope text-blue-700"></i> Email
            </label>
            <input
              name="email"
              placeholder="you@example.com"
              className="p-3 border-2 border-gray-300 rounded-lg w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full max-w-md mb-4">
            <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
              <i className="fa-solid fa-lock text-blue-700"></i> Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="p-3 border-2 border-gray-300 rounded-lg w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full max-w-md mb-4">
            <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
              <i className="fa-solid fa-key text-blue-700"></i> Confirm Password
            </label>
            <input
              name="confirmpassword"
              type="password"
              placeholder="Confirm Password"
              className="p-3 border-2 border-gray-300 rounded-lg w-full"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <label className="flex items-center gap-2 mb-4">
            <input type="checkbox" className="form-checkbox" />{" "}
            <span className="text-sm text-gray-600">Remember Password</span>
          </label>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {successMsg && (
            <p className="text-green-500 text-sm mb-4">{successMsg}</p>
          )}
          <button
            className="w-full max-w-md bg-blue-900 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-800 transition-all duration-300 ease-in-out mb-4"
            onClick={handleSignup}
          >
            REGISTER
          </button>
          <div className="flex items-center w-full mb-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-center text-gray-500 px-4">
              or login with
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <button
            className="w-full max-w-md bg-red-500 text-white font-bold py-3 rounded-lg shadow-md hover:bg-red-400 transition-all duration-300 ease-in-out flex items-center justify-center gap-2"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://img.icons8.com/color/512/google-logo.png"
              className="w-5 h-5"
              alt="Google Logo"
            />
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
