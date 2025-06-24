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
            display: "flex",
            width: "36rem",
            backgroundColor: "white",
          }}
        >
          <img
            src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-bill_516790-2301.jpg"
            alt="signupimage"
            style={{ width: "32rem" }}
          ></img>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
            padding: "2rem",
            paddingLeft: "4rem",
            paddingRight: "4rem",
            color: "grey",
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
            SignUp
          </p>
          <p>
            Already have an account?{" "}
            <a
              href="/login"
              style={{ color: "darkblue", textDecoration: "underline" }}
            >
              Login
            </a>
          </p>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <i style={{ fontSize: "1.5rem" }} className="fa-solid fa-user"></i>
            <input
              name="fullname"
              placeholder="Jane Doe"
              style={{
                width: "24rem",
                padding: "1rem",
                border: "2px solid lightgrey",
                borderRadius: "0.5rem",
                margin: "1rem",
              }}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <i
              style={{ fontSize: "1.5rem" }}
              className="fa-solid fa-envelope"
            ></i>
            <input
              name="email"
              placeholder="you@example.com"
              style={{
                width: "24rem",
                padding: "1rem",
                border: "2px solid lightgrey",
                borderRadius: "0.5rem",
                margin: "1rem",
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <i style={{ fontSize: "1.5rem" }} className="fa-solid fa-lock"></i>
            <input
              name="password"
              type="password"
              placeholder="Password"
              style={{
                width: "24rem",
                padding: "1rem",
                border: "2px solid lightgrey",
                borderRadius: "0.5rem",
                margin: "1rem",
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <i style={{ fontSize: "1.5rem" }} className="fa-solid fa-key"></i>
            <input
              name="confirmpassword"
              type="password"
              placeholder="Confirm Password"
              style={{
                width: "24rem",
                padding: "1rem",
                border: "2px solid lightgrey",
                borderRadius: "0.5rem",
                margin: "1rem",
              }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <label
            style={{ margin: "0.5rem", width: "100%", marginLeft: "2.5rem" }}
          >
            <input type="checkbox" /> Remember Password
          </label>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
          <button
            style={{
              width: "26rem",
              padding: "1rem",
              border: "none",
              backgroundColor: "darkblue",
              color: "white",
              fontWeight: "bold",
              borderRadius: "0.5rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
            onClick={handleSignup}
          >
            REGISTER
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
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
              width: "26rem",
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
      </div>
    </div>
  );
};

export default SignUpPage;
