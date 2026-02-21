import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Button({ text, onClick, type = "button", variant = "primary" }) {
  const navigate = useNavigate();

  // Define styles for different button types
  const baseStyle = {
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none",
    fontSize: "14px",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const variants = {
    primary: {
      backgroundColor: "#4f46e5",
      color: "#fff",
    },
    back: {
      background: "none",
      color: "#94a3b8",
      padding: "0",
      marginBottom: "15px",
    }
  };

  // If it's a "back" button, we use the specific Home navigation logic
  const handleClick = () => {
    if (variant === "back") {
      navigate('/');
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      style={{ ...baseStyle, ...variants[variant] }}
      onMouseEnter={(e) => {
        if (variant === 'back') e.target.style.color = '#38bdf8';
      }}
      onMouseLeave={(e) => {
        if (variant === 'back') e.target.style.color = '#94a3b8';
      }}
    >
      {variant === "back" ? `← ${text || "Back to Home"}` : text}
    </button>
  );
}