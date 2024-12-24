import React, { useEffect, useState } from "react";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai"; 
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../components/DarkModeContext";
import { TbArrowBackUpDouble } from "react-icons/tb";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const { darkMode } = useDarkMode(); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedEmailOrMobile = localStorage.getItem("emailOrMobile");

    if (storedUsername && storedEmailOrMobile) {
      setUsername(storedUsername);
      setEmailOrMobile(storedEmailOrMobile);
    }
  }, []);

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-16 px-6 sm:px-8 lg:px-10 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
      }`} 
    >
      <div
        className={`max-w-xl w-full shadow-xl rounded-lg overflow-hidden ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => navigate("/page-layout", { state: { username } })}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          >
            <TbArrowBackUpDouble className="text-xl" />
          </button>
        </div>

        <div
          className={`flex items-center justify-center py-8 ${
            darkMode ? "bg-gradient-to-r from-blue-800 to-indigo-700" : "bg-gradient-to-r from-blue-500 to-indigo-600"
          }`}
        >
          <h1 className="text-white text-4xl font-semibold">User Profile</h1>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex items-center space-x-4">
            <AiOutlineUser className={`text-${darkMode ? "blue-400" : "blue-600"} text-4xl`} />
            <div>
              <p className="text-lg font-semibold">Username</p>
              <p className={`text-${darkMode ? "gray-300" : "gray-800"} text-lg`}>{username}</p> 
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <AiOutlineMail className={`text-${darkMode ? "blue-400" : "blue-600"} text-4xl`} />
            <div>
              <p className="text-lg font-semibold">Email or Mobile</p>
              <p className={`text-${darkMode ? "gray-300" : "gray-800"} text-lg`}>{emailOrMobile}</p> 
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate("/change-password")}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Update Password
            </button>
          </div>

          <div className="mt-8">
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-md transition duration-300"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
