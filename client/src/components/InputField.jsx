export const InputField = ({ formik, fieldName, label, type, placeholder }) => {
  const hasError = formik.errors[fieldName];
  const value = formik.values[fieldName] || "";

  return (
    <div id={`input-container-${fieldName}`} className="flex justify-between">
      <div id={`${fieldName}-input`}>
        <div className="text-base text-black">{label}</div>
        <div
          className={`relative ${
            hasError ? "border-red-500" : "border-gray-300"
          } rounded-lg`}
        >
          <input
            className={`border bg-white rounded-lg p-3 w-[27.9rem] text-black focus:border-purple-500 outline-none ${
              hasError ? "border-red-500" : ""
            }`}
            id={fieldName}
            name={fieldName}
            type={type}
            placeholder={placeholder}
            onChange={formik.handleChange}
            value={value}
          />
          {hasError && (
            <div className="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
              <img src="public/images/alert_error_icon.svg" />
            </div>
          )}
        </div>
        {formik.errors && formik.errors[fieldName] && (
          <p className=" text-red-500">{formik.errors[fieldName]}</p>
        )}
      </div>
    </div>
  );
};

export const SelectInputField = ({
  formik,
  fieldName,
  label,
  options,
  placeholder,
}) => {
  const hasError = formik.errors[fieldName];
  const value = formik.values[fieldName] || "";

  return (
    <div id={`${fieldName}-input`}>
      <div className="text-base text-black">{label}</div>
      <div
        className={`relative ${
          hasError ? "border-red-500" : "border-gray-300"
        } rounded-lg`}
      >
        <select
          className={`border bg-white rounded-lg p-3 w-[27.9rem] text-black focus:border-purple-500 outline-none ${
            hasError ? "border-red-500" : ""
          }`}
          id={fieldName}
          name={fieldName}
          onChange={formik.handleChange}
          value={value}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {hasError && (
          <div className="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
            <img src="public/images/alert_error_icon.svg" />
          </div>
        )}
      </div>
      {formik.errors && formik.errors[fieldName] && (
        <p className="text-red-500">{formik.errors[fieldName]}</p>
      )}
    </div>
  );
};
