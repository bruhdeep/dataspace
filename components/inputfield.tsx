import React from "react";

const InputField = (props: any) => {
  const { label, type, placeholder } = props;

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label>{label}</label>
      </div>
      <div className="">
        <input
          className="border border-gray-300 rounded"
          type={type}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
export default InputField;
