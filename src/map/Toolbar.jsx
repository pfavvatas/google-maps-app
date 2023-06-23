// Toolbar.jsx

import React from 'react';
import ClearButton from './ClearButton';
import UserButton from './UserButton';
import PoisPane from './Pois';


const Toolbar = ({ handleUser, handleClear, pois, handleCategoryClick, children }) => {
    
 const style = {
    padding: '8px 12px',
    background: '#fff',
    color: '#333',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    transition: 'background-color 0.3s ease',
  }
  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        zIndex: '1',
      }}
    >
    <ClearButton style={style} onClick={handleClear} />
    <UserButton style={style} onClick={handleUser} />
    {/* <PoisPane pois={pois} handleCategoryClick={handleCategoryClick}/> */}
    <div
        style={{
          display: 'flex',
          gap: '10px',
        }}
      >
      </div>
      {children}
    </div>
  );
};

export default Toolbar;
