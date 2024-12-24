import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (username && password) {
      navigate("/page-layout", { state: { username,password} });
    } else {
      alert("Please enter your username and password.");
    }
  };  

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="bg-gray-100 flex min-h-screen">
      <div className="hidden md:block md:w-1/3 bg-gray-200">
        <img
          src={`${process.env.PUBLIC_URL}/img.jpg`}
          alt="Illustration of lake"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="w-full md:w-2/3 flex flex-col justify-center items-center bg-white p-8">
        <h1 className="text-4xl font-bold mb-2 text-blue-600">Water quality monitoring system</h1>
        <p className="text-gray-600 mb-8">
          Please enter your details to continue...
        </p>
        <form className="w-full max-w-sm">
            
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          
          
          <div className="mb-4">
            <button
              type="button"
              onClick={handleSignIn}
              className="w-full bg-blue-400 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
          
          
          <p className="text-center text-gray-600 text-sm">
            New user?{" "}
            <a href="#" onClick={handleSignUp} className="text-blue-500 font-bold">
              Sign up...
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Welcome;