import React /*useState*/ from "react";
import "./App.css";
// import { Oval }from "react-loader-spinner";
// import { useJsApiLoader, GoogleMap, MarkerF } from '@react-google-maps/api';
import Map from "./map/Map";
import { Puff } from "react-loader-spinner"; // import the spinner you want to use
import './MapContainer.css'; // Import the CSS file



const initialCenter = { lat: 37.7749, lng: -122.4194 };
const markers = [
  {
    position: { lat: 37.7749, lng: -122.4194 },
    title: "San Franciscooooo",
  },
  {
    position: { lat: 34.0522, lng: -118.2437 },
    title: "Los Angeles",
  },
  // more markers here...
];

const defaultContainerStyle = {
  width: "100%",
  height: "600px",
};

const defaultOptions = {
  // zoomControl: false,
  streetViewControl: false,
  // mapTypeControl: false,
  // disableDefaultUI: true,
  // fullscreenControl: false,
  zoomControlOptions: {
    position: 7,
  },
  styles: [
    {
      featureType: 'poi',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
  ],
};

const loaderProps = {
  color: "#00BFFF",
  height: 100,
  width: 100,
  timeout: 10000,
};

const loaderStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f5f5f5",
};

const pois = [
  {
    category: 'Restaurant',
    name: 'Restaurant A',
    description: 'This is a nice restaurant.',
    // icon: <RestaurantIcon />,
    // lat: 37.7749,
    // lng: -122.4194,
    position: { lat: 6.7749, lng: -122.4194 },
    title: "San Franciscooooo",
  },
  {
    category: 'Restaurant',
    name: 'Restaurant A2',
    description: 'This is a nice restaurant.',
    // icon: <RestaurantIcon />,
    // lat: 37.7749,
    // lng: -122.4194,
    position: { lat: 16.7749, lng: -122.4194 },
    title: "San Franciscooooo2",
  },
  {
    category: 'Park',
    name: 'Park B',
    description: 'This is a beautiful park.',
    // icon: <ParkIcon />,
    // lat: 34.0522,
    // lng: -118.2437,
    position: { lat: 7.7749, lng: -122.4194 },
    title: "San Franciscooooo",
  },
  // Add more POIs with different categories as needed
];



// const extraButtons = [
//   ClearButton,
//   // OtherButton,
//   // ... add more button components as needed
// ];
const MapMenu = () => {
  const handleMenuItemClick = (menuItem) => {
    // Handle menu item click event
    console.log(`Clicked on ${menuItem}`);
  };

  return (
    <div className="map-menu">
      <h3>Menu</h3>
      <ul>
        <li onClick={() => handleMenuItemClick('Option 1')}>Option 1</li>
        <li onClick={() => handleMenuItemClick('Option 2')}>Option 2</li>
        <li onClick={() => handleMenuItemClick('Option 3')}>Option 3</li>
      </ul>
    </div>
  );
};

function App() {
  return (
    <div>
      <Map
        initialzoom={12}
        zoomInSearch={16}
        initialCenter={initialCenter}
        initialMarkers={markers}
        pois={pois}
        markerIcon="/path-to-your-icon.png"
        defaultContainerStyle={defaultContainerStyle}
        options={defaultOptions}
        loaderProps={loaderProps}
        loaderStyle={loaderStyle}
        LoaderComponent={Puff} // pass the spinner component you want to use
        // AutocompleteComponent={CustomAutocomplete}
        // extraToolbarButtons={extraButtons}
      />
      {/* <MapMenu /> */}
    </div>
  );
}

export default App;
