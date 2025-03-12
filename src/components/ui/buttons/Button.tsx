'use client'

import React from "react";

type ButtonProps = {
  variant?: "default" | "primary" | "secondary"; 
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  children?: React.ReactNode;
};


function Button({
  variant = "default",
  onClick,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const variants = {
    default: "bg-white text-black font-black rounded-lg p-2 hover:bg-black hover:text-white transition-all cursor-pointer",
    primary: "bg-white text-black font-black rounded-lg p-2 hover:bg-black hover:text-white transition-all cursor-pointer",
    secondary: "bg-white text-black font-black rounded-lg p-2 hover:bg-black hover:text-white transition-all cursor-pointer",
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={`${variants[variant]} ${className} `}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;