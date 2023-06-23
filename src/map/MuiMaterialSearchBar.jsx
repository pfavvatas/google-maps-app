import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Autocomplete } from '@mui/material';
// import { Autocomplete } from '@mui/lab';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const MuiSearchBar = ({ onSearch, searchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);

  const {
    ready,
    suggestions: { data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSearch = async () => {
    console.log("===============handleSearch: ", selectedPlace);
    if (selectedPlace) {
      const geocodeResults = await getGeocode({ address: selectedPlace.description });
      console.log("===============geocodeResults: ", geocodeResults)
      if (geocodeResults && geocodeResults.length > 0) {
        const { geometry } = geocodeResults[0];
        onSearch(geometry);
      }
    }
    clearSuggestions();
    // onSearch(selectedPlace);
    // clearSuggestions();
  };

  return (
    <Box display="flex" justifyContent="center" marginTop={1}>
      {ready && (<Autocomplete
        freeSolo
        options={data}
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            variant="outlined"
            size="small" // Set the size to 'small' for a smaller text field
            sx={{ 
              backgroundColor: '#F5F5F5', // Set the desired background color
              borderRadius: '20px', // Increase the border radius for more rounded corners
              // paddingRight: '10px',
              marginRight: '200px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent', // Remove the border line color
                },
              }, 
            }} 
            inputProps={{
              ...params.inputProps,
            }}
            value={searchQuery}
            onChange={(e) => {
              setValue(e.target.value);
              setSearchQuery(e.target.value);
            }}
          />
        )}
        onChange={(event, value) => {
          setSelectedPlace(value);
        }}
      />)}
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
    // return (
    //   <Box 
    //     display="flex" 
    //     justifyContent="center" 
    //     marginTop={1}
    //   >
    //     <Box display="flex" alignItems="center">
    //       <TextField
    //         label="Search"
    //         variant="outlined"
    //         size="small" // Set the size to 'small' for a smaller text field
    //         sx={{ 
    //           backgroundColor: '#F5F5F5', // Set the desired background color
    //           borderRadius: '20px', // Increase the border radius for more rounded corners
    //           marginRight: '8px',
    //           '& .MuiOutlinedInput-root': {
    //             '& fieldset': {
    //               borderColor: 'transparent', // Remove the border line color
    //             },
    //           }, 
    //         }} // Add custom style to create some spacing between the text field and the button
    //         value={searchQuery}
    //         onChange={(e) => setSearchQuery(e.target.value)}
    //       />
    //       <Button 
    //         variant="contained" 
    //         color="primary" 
    //         sx={{ 
    //           borderRadius: '20px', // Increase the border radius for more rounded corners
    //           marginRight: '8px',
    //           '& .MuiOutlinedInput-root': {
    //             '& fieldset': {
    //               borderColor: 'transparent', // Remove the border line color
    //             },
    //           }, 
    //         }}
    //           onClick={handleSearch}
    //       >
    //         Search
    //       </Button>
    //     </Box>
    //     {searchResults && (
    //     <Box marginTop={2}>
    //       <Typography variant="h6">Search Results:</Typography>
    //       <ul>
    //         {searchResults.map((result) => (
    //           <li key={result.id}>{result.name}</li>
    //         ))}
    //       </ul>
    //     </Box>
    //   )}
    //   </Box>

    // );
  };
  
  export default MuiSearchBar;