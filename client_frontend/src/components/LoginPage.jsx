import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import "./LoginPageStyle.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/";
      console.log("Logged in successfully!");
    } catch (err) {
      setError(err.message);
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
    <div
      style={{
        display: "flex",
        width: "100%",
        backgroundColor: "#f2f3ff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "white",
          justifyContent: "space-evenly",
          alignItems: "center",
          boxShadow: "0 6px 16px rgba(135, 206, 235, 0.5)",
          margin: "4rem",
          padding: "4rem",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
            padding: "2rem",
            color: "grey",
            zIndex: "1",
          }}
        >
          <p
            style={{
              color: "darkblue",
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "4px",
            }}
          >
            Login
          </p>
          <p>
            Doesn't have an account yet?{" "}
            <a
              href="/signup"
              style={{ color: "darkblue", textDecoration: "underline" }}
            >
              SignUp
            </a>
          </p>
          <div style={{ marginTop: "2rem" }}>
            <label htmlFor="email">Email Address</label>
            <br />
            <input
              name="email"
              placeholder="you@example.com"
              style={{
                width: "24rem",
                padding: "1rem",
                border: "2px solid lightgrey",
                borderRadius: "0.5rem",
                marginTop: "4px",
              }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="password">Password</label>
            <br />
            <input
              name="password"
              type="password"
              placeholder="Enter 6 characters or more"
              style={{
                width: "24rem",
                padding: "1rem",
                border: "2px solid lightgrey",
                borderRadius: "0.5rem",
                marginTop: "4px",
                marginBottom: "1rem",
              }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <br />
          <p style={{ textAlign: "center" }}>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </p>
          <button
            style={{
              width: "24rem",
              padding: "1rem",
              border: "none",
              backgroundColor: "darkblue",
              color: "white",
              fontWeight: "bold",
              borderRadius: "0.5rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
            onClick={handleLogin}
          >
            LOGIN
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "30%",
                height: "2px",
                margin: "1rem",
                backgroundColor: "lightgrey",
              }}
            ></div>
            <p>or login with</p>
            <div
              style={{
                width: "30%",
                height: "2px",
                margin: "1rem",
                backgroundColor: "lightgrey",
              }}
            ></div>
          </div>
          <button
            style={{
              display: "flex",
              width: "24rem",
              padding: "1rem",
              border: "2px solid red",
              color: "red",
              fontWeight: "bold",
              borderRadius: "0.5rem",
              marginTop: "1rem",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
            }}
            onClick={handleGoogleLogin}
          >
            <img
              src="https://img.icons8.com/color/512/google-logo.png"
              style={{ width: "1.5rem" }}
            />
            Google
          </button>
        </div>
        <div
          style={{
            display: "flex",
            backgroundColor: "white",
            overflow: "hidden",
          }}
        >
          <img
            src="https://connect.myesr.org/app/uploads/login.svg"
            alt="loginimage"
            style={{ width: "40rem" }}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
