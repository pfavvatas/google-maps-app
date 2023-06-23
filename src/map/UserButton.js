// UserButton.jsx

import React from 'react';

const UserButton = ({ style, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={style}
    >
      Users
    </button>
  );
};

export default UserButton;
