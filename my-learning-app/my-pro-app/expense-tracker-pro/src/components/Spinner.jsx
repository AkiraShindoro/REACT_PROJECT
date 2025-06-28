// src/components/Spinner.jsx
import React from "react";
import "./Spinner.css"; // External CSS for clarity

export default function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
}
