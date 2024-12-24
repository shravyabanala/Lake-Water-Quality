import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TbArrowBackUpDouble } from "react-icons/tb";
import { useDarkMode } from "../components/DarkModeContext";

function History() {
  const { darkMode } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stateHistory = location.state?.history;
    if (stateHistory) {
      setHistory(stateHistory);
    } else {
      const storedHistory = localStorage.getItem("history");
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    }
  }, [location.state]);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
      } flex flex-col items-center`}
    >
      <button
        onClick={() =>
          navigate("/page-layout", { state: { username: location.state?.username } })
        }
        className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all"
      >
        <TbArrowBackUpDouble />
      </button>

      <h1
        className={`text-center text-4xl font-bold my-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        History of Analyses
      </h1>

      <div className="w-full max-w-4xl px-6 py-8">
        {history.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            No history available.
          </p>
        ) : (
          <ul className="space-y-6">
            {history.map((entry, index) => (
              <li
                key={index}
                className={`${
                  darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
                } p-6 rounded-lg shadow-lg hover:shadow-xl transition-all`}
              >
                <div className="flex items-center space-x-8">
                  <div className="w-40 h-40 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={entry.previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <div className="mb-4">
                      <h3
                        className={`text-2xl font-semibold ${
                          darkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        Lake: {entry.lakeName}
                      </h3>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {entry.timestamp}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <p className="font-medium text-lg">Status:</p>
                        <p
                          className={`${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {entry.result.status}
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <p className="font-medium text-lg">pH Level:</p>
                        <p
                          className={`${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {entry.result.pHLevel}
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <p className="font-medium text-lg">Confidence:</p>
                        <p
                          className={`${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {entry.result.confidence}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default History;
