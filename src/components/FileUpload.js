import React from "react";

const FileUpload = ({ onFileChange, selectedFile, fileSize, previewUrl, onFileRemove, darkMode }) => {
  const handleFileInputClick = () => {
    document.getElementById("file-input").click();
  };

  return (
    <div
      className={`w-full max-w-[725px] min-h-[300px] rounded-lg flex flex-col justify-center items-center mb-5 cursor-pointer text-center mx-auto p-5 shadow-md relative border border-transparent hover:border-blue-500 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <i className="bi bi-cloud-upload text-3xl text-blue-500 hover:text-blue-700 cursor-pointer mb-2.5"></i>
      <input
        type="file"
        id="file-input"
        onChange={onFileChange}
        accept=".jpg,.png,.jpeg"
        className="hidden"
      />
      <label
        onClick={handleFileInputClick}
        className={`text-base font-bold cursor-pointer ${
          darkMode ? 'text-gray-200' : 'text-gray-800'
        }`}
      >
        {selectedFile ? selectedFile : "Choose the satellite image"}
      </label>
      {fileSize && <p className={`text-xs mt-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>File Size: {fileSize}</p>}
      <p className={`text-xs mt-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Supported formats: JPG, JPEG, PNG (max 22MB)</p>
      
      {previewUrl && (
        <div className="mt-5 relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-[100px] h-[100px] object-cover border border-gray-300 rounded"
          />
          <i
            className="bi bi-x-circle-fill absolute top-0.5 right-0.5 text-xl text-red-500 hover:text-red-700 cursor-pointer"
            onClick={onFileRemove}
          ></i>
        </div>
      )}
    </div>
  );
};

export default FileUpload;