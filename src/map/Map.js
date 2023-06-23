import React, { useRef, useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { Oval } from "react-loader-spinner";
import AutoCompleteInput from "./AutoComplete";
import Toolbar from "./Toolbar";
import "./MapContainer.css"; // Import the CSS file
import logo from "./../logo/logo_1.png";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
// import {
//   Container, VStack,
//   Grid, GridItem,
//   AspectRatio ,
//   Box,
//   Button,
//   ButtonGroup,
//   Flex, Spacer,
//   HStack,
//   IconButton,
//   Input,
//   SkeletonText,
//   Text, Link, LinkOverlay,
//   Spinner, Stack, Skeleton
// } from '@chakra-ui/react'
import { 
  CircularProgress, Backdrop,
  Grid, Typography, Container
 } from '@mui/material';

import  MuiSearchBar from "./MuiMaterialSearchBar";

// const _debug = true;
const _debug = false;
// import debugLog from './../debugLog';

const libraries = ["places"]; // Define libraries as a constant outside the component
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Define googleMapsApiKey as a constant outside the component

function Map({
  initialCenter,
  initialzoom = 10,
  zoomInSearch = 14,
  initialMarkers = [],
  pois = [],
  markerIcon,
  loaderProps,
  loaderStyle,
  LoaderComponent = Oval, // default to Oval
  AutoCompleteComponent,
  AutoCompleteInputStyle,
  CustomToolbar,
  extraToolbarButtons,
  ...args
}) {
  const [data, setData] = useState([]);

  const [showMenu, setShowMenu] = useState(false);
  const [center, setCenter] = useState(initialCenter);
  const [markers, setMarkers] = useState(initialMarkers);
  const [zoom, setZoom] = useState(initialzoom);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedPOI, setSelectedPOI] = useState(pois);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedfilteredPOIs, setSelectedfilteredPOIs] = useState(null);
  const mapRef = useRef(null);
  // const autocompleteRef = useRef(null);  

  console.log("selectedPOI:  ", selectedPOI);
  const categories = [...new Set(pois.map((poi) => poi.category))];
  console.log("categories:  ", categories);

  useEffect(() => {
    if (_debug) console.log("useEffect-> data");
  }, [data]);

  useEffect(() => {
    if (_debug) console.log("useEffect-> setCenter");
    setCenter(initialCenter);
  }, [initialCenter]);

  useEffect(() => {
    const filteredPOIs = selectedCategory
      ? pois.filter((poi) => poi.category === selectedCategory)
      : pois;
    console.log("filteredPOIs: ", filteredPOIs);
    // setSelectedfilteredPOIs(filteredPOIs)
    // setMarkers(filteredPOIs)
  }, [selectedCategory]);
  // if(_debug) console.log("center: ", center);

  // const AutoComplete = AutoCompleteComponent || AutoCompleteInput;

  // Default values for container style
  const fallbackContainerStyle = {
    width: "100%",
    height: "400px",
  };

  // Default values for options
  const fallbackOptions = {
    zoomControl: true,
    streetViewControl: true,
    mapTypeControl: true,
    fullscreenControl: true,
    zoomControlOptions: {
      position: 7,
    },
    styles: [
      {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  const {
    defaultContainerStyle = fallbackContainerStyle,
    options = fallbackOptions,
  } = args;

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
    libraries,
  });

  const [autocomplete, setAutocomplete] = useState(null); // Moved to top level, outside of conditions or loops

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  // const handleKeyPress = (event) => {
  //   // if (event.key === 'Enter') {
  //   //   event.preventDefault();
  //   //   event.stopPropagation();
  //   //   onPlaceChanged();
  //   // }
  // };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      console.warn(autocomplete.getPlace());
      const place = autocomplete.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const location = place.geometry.location;
        setCenter({
          lat: location.lat(),
          lng: location.lng(),
        });
        setMarkers([]);
        setSelectedPlace(place);
        setZoom(zoomInSearch);
      }
    } else {
      if (_debug) console.log("Autocomplete is not loaded yet!");
    }
  };

  const handleClear = () => {
    setMarkers([]);
    setSelectedPlace(null);
    setZoom(initialzoom);
  };

  const handleUser = () => {
    fetchData();
  };

  const handleZoomChanged = () => {
    if (_debug) console.log("handleZoomChanged.mapRef: ", mapRef);
    if (mapRef.current) {
      const newZoom = mapRef.current.getZoom();
      setZoom(newZoom);
    }
    // if(_debug) console.log('handleZoomChanged: ', zoom)
  };

  const handlePOIClick = (poi) => {
    setSelectedPOI(poi);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/users");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCategoryClick = (category) => {
    console.log("category:  ", category);
    setSelectedCategory(category);
    console.log("setSelectedCategory:  ", selectedCategory);
    // setSelectedPOI(null);
    setMarkers();
  };

  const handleButtonClick = () => {
    console.log("handleButtonClick:  ", handleButtonClick);
    setShowMenu(!showMenu);
  };
  
  const handleSearch = (searchQuery) => {
    // Perform search logic here
    // You can use the searchQuery parameter to search for specific locations on the map
    console.log('Search query:', searchQuery);
    
    // Example: Display the selected place on the map
    if (searchQuery) {
      const { description, geometry, location } = searchQuery;
      // const { location } = geometry;

      // Use the location coordinates to set the map center or add a marker
      // Example: Set the map center to the selected place
      this.map.panTo({ lat: location.lat(), lng: location.lng() });
    }

  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  // return (
  //   <div>
  //     <div className="container">
  //       <div className="map">
  //         {!isLoaded ? (
  //           <div style={loaderStyle}>
  //             <LoaderComponent {...loaderProps} />
  //           </div>
  //         ) : (
  //           <div>
  //             {CustomToolbar || (
  //               <Toolbar
  //                 handleUser={handleUser}
  //                 handleClear={handleClear}
  //                 pois={pois}
  //                 handleCategoryClick={handleCategoryClick}
  //               >
  //                 {extraToolbarButtons &&
  //                   extraToolbarButtons.map((ButtonComponent, index) => (
  //                     <ButtonComponent key={index} />
  //                   ))}
  //               </Toolbar>
  //             )}
  //             <GoogleMap
  //               onLoad={(map) => {
  //                 mapRef.current = map;
  //               }}
  //               mapContainerStyle={defaultContainerStyle}
  //               center={center}
  //               zoom={zoom}
  //               options={options}
  //               onZoomChanged={handleZoomChanged}
  //             >
  //               <SearchBar/>
  //               {/* <div className="container_menu">
  //                 <div class="">
  //                   <div className="row">
  //                     {AutoCompleteComponent || (
  //                       <AutoCompleteInput
  //                         onLoad={onLoad}
  //                         onPlaceChanged={onPlaceChanged}
  //                         // inputStyle={AutoCompleteInputStyle}
  //                       />
  //                     )}
  //                     <button onClick={handleButtonClick} className="ShowMenu">
  //                       Show Menu
  //                     </button>
  //                   </div>
  //                   <div className="row">
  //                     {showMenu && (
  //                       <div className="menu-bar">
  //                         <Menu />
  //                       </div>
  //                     )}
  //                   </div>
  //                 </div>
  //               </div> */}
  //               {markers.map((marker, index) => (
  //                 <MarkerF
  //                   key={index}
  //                   position={marker.position}
  //                   title={marker.title}
  //                 />
  //               ))}
  //               {data.map((data, index) => (
  //                 <MarkerF
  //                   key={index}
  //                   position={{
  //                     lat: data.latitude,
  //                     lng: data.longitude,
  //                   }}
  //                   title={data.UserName}
  //                 />
  //               ))}
  //               {selectedPlace && (
  //                 <MarkerF
  //                   position={{
  //                     lat: selectedPlace.geometry.location.lat(),
  //                     lng: selectedPlace.geometry.location.lng(),
  //                   }}
  //                 />
  //               )}
  //               {/* {selectedfilteredPOIs && selectedfilteredPOIs.map((poi, index) => (
  //               <MarkerF 
  //                 key={index}
  //                 position={poi.position}
  //                 title={poi.title}
  //               />
  //             ))} */}
  //             </GoogleMap>
  //           </div>
  //         )}
  //       </div>
  //       <div className="info-bar">
  //         <p>
  //           © {new Date().getFullYear()} IST – International Software Techniques
  //           S.A. All rights reserved
  //         </p>
  //         <div className="links">
  //           <a href="/privacy-policy">Privacy Policy</a>
  //           <span className="separator">|</span>
  //           <a href="/terms-of-use">Terms of Use</a>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return(
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12}>
        {!isLoaded ? (
          <Container
              align="center"
              style={{ 
                marginTop: '2rem',
                marginBottom: '2rem'
               }}
            >
            <CircularProgress color="inherit" />
          </Container>
        ) : (
          <GoogleMap
              onLoad={(map) => {
                mapRef.current = map;
              }}
              mapContainerStyle={defaultContainerStyle}
              center={center}
              zoom={zoom}
              options={options}
              onZoomChanged={handleZoomChanged}
            >
              <MuiSearchBar onSearch={handleSearch} />
          </GoogleMap>
        )}
      </Grid>
      <Grid item xs={12}>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
      >
      &copy; {new Date().getFullYear()} IST – International Software Techniques S.A. All rights reserved
    </Typography>
      </Grid>
    </Grid>
  );
}

export default React.memo(Map);
