// src/components/InputControl.jsx
import React from 'react';

const InputControl = ({ label, placeholder, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-sm text-gray-700">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="border px-3 py-2 rounded"
      />
    </div>
  );
};

export default InputControl;