import React from "react";

const InputField = (props: any) => {
  const { label, type } = props;

  return (
    <div className="flex flex-col py-2 w-[40%]">
      <label>{label}</label>

      <input
        className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-md"
        type={type}
        required
      />
    </div>
  );
};
export default InputField;
