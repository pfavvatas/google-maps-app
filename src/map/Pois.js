// Pois.jsx

import React from 'react';

const PoisPane = ({ pois, ...args }) => {
  const  { handleCategoryClick } = args;
  const categories = [...new Set(pois.map((poi) => poi.category))];
  return (
    <>
    {categories.map((category, index) => (
        <button key={index} onClick={() => {
            handleCategoryClick(category)
        }}>
          {category}
        </button>
      ))}</>
  );
};

export default PoisPane;