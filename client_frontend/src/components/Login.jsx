// src/components/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputControl from './InputControl';

function Login() {
  const [values, setValues] = useState({
    email: '',
    pass: '',
  });

  const handleLogin = () => {
    alert(`Email: ${values.email}\nPassword: ${values.pass}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <InputControl label="Email" placeholder="Enter email" onChange={(e) => setValues({ ...values, email: e.target.value })} />
        <InputControl label="Password" placeholder="Enter password" onChange={(e) => setValues({ ...values, pass: e.target.value })} />

        <button onClick={handleLogin} className="bg-green-600 text-white w-full py-2 rounded mt-4">
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Don't have an account? <Link to="/Signup" className="text-blue-600">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;