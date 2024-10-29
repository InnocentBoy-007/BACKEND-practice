import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignIn = () => {
    // Logic for signing in the user (e.g., API call)
    // setIsLoggedIn(true);
    navigate("/");
  };

  const handleSignOut = () => {
    // Logic for signing out the user
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl">MyApp</div>
        <div className="flex items-center">
          {!isLoggedIn ? (
            <>
              <button onClick={handleSignIn} className="text-white mx-2">
                Sign In
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <div className="text-white mx-2">User Logo</div>
              <button onClick={handleSignOut} className="text-white mx-2">
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
