// src/SignUp.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [signUpInfo, setSignUpInfo] = useState([]);

  const signUp = async (e) => {
    e.preventDefault();
    const backendURL = import.meta.env.VITE_BACKEND;

    try {
      const response = await axios.post(`${backendURL}/signUp`, {
        username: signUpUsername,
        email: signUpEmail,
        password: signUpPassword,
      });
      setSignUpInfo(response.data);
      console.log("User signed up successfully! ---> ", response.data);
      navigate("/home");
    } catch (error) {
      console.log(`Error signing up: ${error}`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter your username"
            value={signUpUsername}
            onChange={(e) => setSignUpUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter your email"
            value={signUpEmail}
            onChange={(e) => setSignUpEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter your password"
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          onClick={signUp}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
