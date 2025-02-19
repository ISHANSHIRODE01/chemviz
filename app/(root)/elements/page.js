"use client";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { elements } from "data/Elementsdata.js";

const PeriodicTable = () => {
  const [hoveredElement, setHoveredElement] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const handleElementHover = (element) => {
    setHoveredElement(element);
  };

  const handleElementLeave = () => {
    setHoveredElement(null);
  };

  const handleElementClick = (element) => {
    window.location.href = `/elements/${element.name.toLowerCase()}`;
  };

  const filteredElements = elements.filter(
    (element) =>
      element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    document.title = "Element Exploration"; // Set your custom title here
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search elements..."
          className="w-full p-2 pl-8 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute left-2 top-3 text-gray-400" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {filteredElements.map((element) => (
          <div
            key={element.atomicNumber}
            className={`relative p-2 border rounded cursor-pointer transition-all duration-300 ${getCategoryColor(
              element.category
            )} hover:z-10 hover:scale-110`}
            onMouseEnter={() => handleElementHover(element)}
            onMouseLeave={handleElementLeave}
            onClick={() => handleElementClick(element)}
            tabIndex={0}
            aria-label={`${element.name}, Atomic Number ${element.atomicNumber}`}
          >
            <div className="text-xs">{element.atomicNumber}</div>
            <div className="text-2xl font-bold">{element.symbol}</div>
            <div className="text-xs truncate">{element.name}</div>
            {hoveredElement === element && (
              <div className="absolute left-0 top-full mt-2 p-2 bg-white border rounded shadow-lg z-20 w-48">
                <h3 className="font-bold">{element.name}</h3>
                <p>Atomic Number: {element.atomicNumber}</p>
                <p>Atomic Mass: {element.atomicMass}</p>
                <p>Category: {element.category}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const getCategoryColor = (category) => {
  switch (category) {
    case "Nonmetal":
      return "bg-green-200";
    case "Noble Gas":
      return "bg-purple-200";
    case "Alkali Metal":
      return "bg-red-200";
    case "Alkaline Earth Metal":
      return "bg-orange-200";
    case "Metalloid":
      return "bg-yellow-200";
    case "Halogen":
      return "bg-blue-200";
    default:
      return "bg-gray-200";
  }
};

export default PeriodicTable;
