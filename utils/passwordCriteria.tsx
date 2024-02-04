import React from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

interface PasswordCriteriaProps {
  label: string;
  isValid: boolean;
}

export const PasswordCriteria: React.FC<PasswordCriteriaProps> = ({
  label,
  isValid,
}) => (
  <div className="flex items-center">
    {isValid ? (
      <AiOutlineCheck color="green" className="mr-2" />
    ) : (
      <AiOutlineClose color="red" className="mr-2" />
    )}
    <span className="text-sm">{label}</span>
  </div>
);
