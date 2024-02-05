import React from "react";

const InputField = (props: any) => {
  const { label, type, value, onChange } = props;

  return (
    <div className="flex flex-col py-2 w-[40%]">
      <label>{label}</label>

      <input
        className="border border-gray-300 rounded px-2 py-1 mr-2 drop-shadow-[0_4px_3px_rgba(0,0,0,0.06)]"
        type={type}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};
export default InputField;
