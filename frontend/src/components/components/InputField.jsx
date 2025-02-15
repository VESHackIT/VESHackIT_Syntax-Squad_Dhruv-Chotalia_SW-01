import React, { useState } from "react";

const InputField = ({ onInputSubmit }) => {
  const [inputValue, setInputValue] = useState("");
  
  const handleChange = (e) => setInputValue(e.target.value);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onInputSubmit(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex justify-center items-center">
      <div className="relative w-full max-w-md group">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Type your spelling here..."
          className="w-full px-6 py-3 text-xl rounded-lg bg-indigo-950/50 text-white border-2 border-indigo-500/50 
                     focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 
                     placeholder-indigo-300/50 transition-all duration-300"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-indigo-600 text-white text-lg 
                     rounded-md hover:bg-indigo-500 transition-colors duration-300 
                     focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
        >
          Launch
        </button>
      </div>
    </form>
  );
};

export default InputField;