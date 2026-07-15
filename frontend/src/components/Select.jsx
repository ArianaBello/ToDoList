import React from 'react';

export default function Select({
  label,
  value,
  onChange,
  options,
  placeholder = 'Selecciona una opción',
  disabled = false,
  className = '',
  id,
  name,
  showPlaceholder = true,
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id || name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <select
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full px-4 py-2 border border-pink-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
          bg-white text-gray-900
          disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
          transition-colors duration-200
          ${className}
        `}
      >
        {showPlaceholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
