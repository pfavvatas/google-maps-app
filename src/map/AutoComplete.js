import React, { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';

const AutoCompleteInput = ({ onLoad, onPlaceChanged, inputStyle }) => {
  const inputRef = useRef(null);

  const _inputStyle = inputStyle ||   {
        // Define the style for the input field of the AutocompleteInput component
        boxSizing: `border-box`, 
        border: `1px solid #ccc`, 
        width: `240px`, 
        height: `32px`, 
        padding: `0 12px`, 
        borderRadius: `15px`, 
        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`, 
        fontSize: `14px`, 
        outline: `none`, 
        textOverflow: `ellipses`, 
        // position: "absolute", 
        left: "50%", 
        marginLeft: "-120px",
        // marginTop: "10px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        transition: "all 0.3s ease"
    };

  return (
    <Autocomplete 
      onLoad={onLoad} 
      onPlaceChanged={onPlaceChanged}
      onFocus={e => e.target.style.border = '1px solid #007BFF'}
      onBlur={e => e.target.style.border = '1px solid #ccc'}
    >
      <div style={{ position: 'relative' }}>
        <input 
          type="text" 
          placeholder="Enter location" 
          style={_inputStyle} 
          ref={inputRef}
        />
      </div>
    </Autocomplete>
  );
};

export default AutoCompleteInput;
