import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailOrMobile, setEmailOrMobile] = useState("");

  const handleCreateUser  = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("emailOrMobile", emailOrMobile);
    navigate("/page-layout", { state: { username } });
  };

  return (
    <div className="bg-blue-500 flex items-center justify-center min-h-screen">
      <div className="text-white text-center">
        <h1 className="text-3xl font-bold mb-8">Create an Account</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-full">
          <form onSubmit={handleCreateUser }>
            <div className="mb-5">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 rounded border border-blue-600 bg-transparent text-black focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded border border-blue-600 bg-transparent text-black focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Email or Mobile Number"
                value={emailOrMobile}
                onChange={(e) => setEmailOrMobile(e.target.value)}
                className="w-full p-2 rounded border border-blue-600 bg-transparent text-black focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full"
            >
              Create User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;