
import React from "react";

interface ButtonProps {
  label: string;
  signUp?: () => void;
  auth?: () => void;
  className?: string;
}

const Button = ({ label, signUp, auth, className }: ButtonProps) => {
  const handleClick = () => {
    if (signUp) {
      signUp();
    } else if (auth) {
      auth();
    }
  };

  return (
    <button
      className={`bg-primary text-white font-medium py-2 px-4 rounded hover:bg-primary/80 transition-colors ${className || ""}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
