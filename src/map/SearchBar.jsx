import React, { useState } from 'react';
import './SearchBar.css';
import AutoCompleteInput from "./AutoComplete";
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
  } from '@chakra-ui/react'



const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform search or other actions based on searchTerm and selectedOption
    console.log('Search Term:', searchTerm);
    console.log('Selected Option:', selectedOption);
  };

  return (
    // <Flex
    //   position='relative'
    //   flexDirection='column'
    //   alignItems='center'
    //   h='100vh'
    //   w='100vw'
    //   backgroundColor={"red"}
    // ></Flex>
        <AutoCompleteInput
            // onLoad={onLoad}
            // onPlaceChanged={onPlaceChanged}
            // inputStyle={AutoCompleteInputStyle}
        />
    // <form className="search-form" 
    // // onSubmit={handleSearch}
    // >
    //   <input
    //     type="text"
    //     className="search-input"
    //     placeholder="Enter search text"
    //     // value={searchText}
    //     // onChange={(e) => setSearchText(e.target.value)}
    //   />
    //   {/* <select
    //     className="search-select"
    //     // value={selectedOption}
    //     // onChange={(e) => setSelectedOption(e.target.value)}
    //   >
    //     <option value="">All</option>
    //     <option value="option1">Option 1</option>
    //     <option value="option2">Option 2</option>
    //     <option value="option3">Option 3</option>
    //   </select> */}
    //   <button type="submit" className="search-button">Search</button>
    // </form>
  );
};

export default SearchBar;
