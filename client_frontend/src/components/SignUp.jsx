
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputControl from './InputControl';

function SignUp() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    pass: '',
  });

  const handleSignUp = () => {
    alert(`Name: ${values.name}\nEmail: ${values.email}\nPassword: ${values.pass}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>

        <InputControl
          label="Name"
          placeholder="Enter name"
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
        <InputControl
          label="Email"
          placeholder="Enter email"
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(e) => setValues({ ...values, pass: e.target.value })}
        />

        <button onClick={handleSignUp} className="bg-blue-700 text-white w-full py-2 rounded mt-4">
          Sign Up
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link to="/Login" className="text-green-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
