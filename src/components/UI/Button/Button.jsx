import React from "react";
import "./Button.css";

const Button = ({ onClick, children, type, disabled = false, isMobile }) => {
  const buttonClass = ["Button", type].join(" ");
  const mobileStyle = {
    width: 'fit-content',
    // minWidth: "3.5rem",  
    fontSize: "13px",
    maxHeight: "1.5rem",
  };
  return (
    <button
      style={isMobile ? { ...mobileStyle } : null}
      disabled={disabled}
      onClick={onClick}
      className={buttonClass}
    >
      {children}
    </button>
  );
};

export default Button;
