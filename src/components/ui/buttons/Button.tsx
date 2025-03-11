'use client'

import React from "react";

type ButtonProps = {
    variant?: "default" | "primary" | "secondary"; // Estilo del botón (primary, secondary, etc.)
    onClick?: () => void; // Función para manejar clics
    className?: string; // Clases adicionales para personalización
    children?: React.ReactNode; // Contenido del botón
    // Otros atributos como type, disabled, etc.
};

function Button({ 
  variant = "default", // Estilo del botón (primary, secondary, etc.)
  onClick, // Función para manejar clics
  className = "", // Clases adicionales para personalización
  children, // Contenido del botón
  ...props // Otros atributos como type, disabled, etc.
}: ButtonProps) {
  // Define los estilos según la variante
  const variants = {
    default: "bg-white text-black font-black rounded-lg p-2 hover:bg-black hover:text-white transition-all cursor-pointer",
    primary: "bg-white text-black font-black rounded-lg p-2 hover:bg-black hover:text-white transition-all cursor-pointer",
    secondary: "bg-white text-black font-black rounded-lg p-2 hover:bg-black hover:text-white transition-all cursor-pointer",
  };

  return (
    <button
      className={`${variants[variant]} ${className} `}
      onClick={onClick}
      {...props} // Pasa otros atributos al botón
    >
      {children}
    </button>
  );
}

export default Button;