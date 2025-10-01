import React from "react";
import "../styles/CategoryBar.css";

export default function CategoryBar({ categories, selected, onSelect }) {
  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-button ${selected === category ? "active" : ""}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}