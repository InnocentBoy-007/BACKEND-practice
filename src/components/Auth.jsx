// src/Auth.jsx

import React, { useState } from "react";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {isSignUp ? <SignUp /> : <SignIn />}
        <div className="flex items-center justify-center mt-4">
          <span className="text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </span>
          <button onClick={toggleForm} className="text-blue-500 ml-2 underline">
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
