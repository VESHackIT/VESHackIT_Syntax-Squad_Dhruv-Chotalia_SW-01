// src/components/InputField.jsx
import React, { useState } from 'react';

const InputField = ({ onInputSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onInputSubmit(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type the word here"
        aria-label="Spelling input field"
        className="px-4 py-2 text-lg w-80 border-2 border-gray-300 rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 text-base ml-2 bg-green-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default InputField;
