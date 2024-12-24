import React, { useState, useEffect } from "react";
import { GiDroplets } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import FileUpload from "../components/FileUpload";
import Input from "../components/Input";
import Results from "../components/Results";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDarkMode } from '../components/DarkModeContext'; 

function PageLayout() {
  const { darkMode } = useDarkMode(); 
  const [lakeName, setLakeName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [history, setHistory] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username); 
    }
  }, [location.state]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name);
      setFileSize((file.size / 1024).toFixed(2) + " KB");
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setFileSize(null);
    setPreviewUrl(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lakeName || !selectedFile) {
      alert("Please enter a lake name and upload an image!");
      return;
    }
    const newResult = { status: "Excellent", pHLevel: 7.09, confidence: "77.8%" };
    setResult(newResult);
    setIsResultsOpen(true);

    const timestamp = new Date().toLocaleString();
    const newHistoryItem = { 
      lakeName, 
      timestamp, 
      result: newResult, 
      file: selectedFile, 
      previewUrl 
    };

    const updatedHistory = [...history, newHistoryItem];
    setHistory(updatedHistory);
    localStorage.setItem("history", JSON.stringify(updatedHistory));
  };
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigateTo = (path) => {
    navigate(path, { state: { username } }); 
    setDropdownOpen(false); 
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
      }`}
    >

      <div className="relative">
        <button
          className={`fixed top-4 right-20 text-lg ${darkMode ? "text-gray-200" : "text-gray-800"} 
                      border ${darkMode ? "border-gray-600" : "border-gray-300"} 
                      bg-transparent rounded-md px-4 py-2 transition duration-200 
                      hover:bg-blue-500 hover:text-white`}
          onClick={toggleDropdown}
        >
          {username || "Guest"}
        </button>
        {dropdownOpen && (
          <div className={`absolute right-5 mt-16 w-48 bg-white-smoke rounded-md shadow-lg z-10 ${darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
            <div className="flex justify-between items-center p-2">
              <button onClick={toggleDropdown} className="text-gray-500 hover:text-gray-700">
                <AiOutlineClose />
              </button>
            </div>
            <button 
              onClick={() => navigateTo('/profile')} 
              className={`block w-full text-left px-4 py-2 border-b ${darkMode ? "border-gray-600" : "border-white"} hover:bg-blue-500 hover:text-white`}
            >
              Profile
            </button>
            <button 
              onClick={() => navigateTo('/history')} 
              className={`block w-full text-left px-4 py-2 border-b ${darkMode ? "border-gray-600" : "border-white"} hover:bg-blue-500 hover:text-white`}
            >
              History
            </button>
          </div>
        )}
      </div>

      <div className="text-center py-24 font-roboto">
        <h1 className="text-4xl flex items-center justify-center gap-6 text-blue-600">
          Lake - water quality analysis <GiDroplets />
        </h1>
        <p className="mt-5 text-base">
          Upload satellite images to analyze water quality parameters
        </p>
        <form onSubmit={handleSubmit} className="mx-auto mt-12 w-full max-w-lg px-4">
          <FileUpload
            onFileChange={handleFileChange}
            selectedFile={selectedFile}
            fileSize={fileSize}
            previewUrl={previewUrl}
            onFileRemove={handleFileRemove}
            darkMode={darkMode}
          />
          <Input
            lakeName={lakeName}
            onLakeNameChange={(e) => setLakeName(e.target.value)}
            onSubmit={handleSubmit}
            darkMode={darkMode}
            setUsername={setUsername}
          />
        </form>
      </div>

      {isResultsOpen && (
        <Results
          result={result}
          darkMode={darkMode}
          isOpen={isResultsOpen}
          onClose={() => setIsResultsOpen(false)}
          lakeName={lakeName}
          previewUrl={previewUrl}
        />
      )}

      <Outlet />
    </div>
  );
}

export default PageLayout;