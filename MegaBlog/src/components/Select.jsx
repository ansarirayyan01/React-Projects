import React, {useId} from 'react'

const Select = React.forwardRef(function({
    label,
    options = [],
    className = "",
    error = "",
    ...props
}, ref){
    const id = useId()
    
    // Handle different option formats
    const renderOptions = () => {
        if (options.length > 0) {
            // Check if options are objects with value/label properties
            if (typeof options[0] === 'object' && options[0].value !== undefined) {
                return options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ));
            } else {
                // Simple string/number options
                return options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ));
            }
        }
        return null;
    };
    
    return(
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-secondary-700 mb-1"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    className={`
                        block w-full rounded-md 
                        border-secondary-300 shadow-sm 
                        focus:border-primary-500 focus:ring-primary-500 
                        text-secondary-900 
                        appearance-none
                        pl-3 pr-10 py-2
                        ${error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""}
                        ${className}
                    `}
                    ref={ref}
                    {...props}
                    id={id}
                >
                    {renderOptions()}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-secondary-500">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    )
})

export default Select
