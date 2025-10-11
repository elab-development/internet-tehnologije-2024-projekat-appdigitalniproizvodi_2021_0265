import React from 'react';

const Input = ({
    type = 'text',
    placeholder = '',
    value = '',
    onChange,
    name = '',
    id = '',
    className = '',
    disabled = false,
    required = false,
    error = false,
    errorMessage = '',
    label = '',
    ...props
}) => {
    const baseClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors';
    
    const stateClasses = error 
        ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' 
        : 'border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500';
    
    const disabledClasses = disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white';
    
    const classes = `${baseClasses} ${stateClasses} ${disabledClasses} ${className}`.trim();

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id || name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                type={type}
                id={id || name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                className={classes}
                {...props}
            />
            {error && errorMessage && (
                <p className="mt-1 text-sm text-red-600">
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export default Input;
