// ClearButton.jsx

import React from 'react';

const ClearButton = ({ style, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={style}
    >
      Clear
    </button>
  );
};

export default ClearButton;
