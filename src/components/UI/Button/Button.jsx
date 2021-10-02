import React from "react";
import "./Button.css";

const Button = ({ onClick, children, type, disabled }) => {
  const buttonClass = ['Button', type].join(" ");
  return (
    <button disabled={disabled}  onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};

export default Button;
