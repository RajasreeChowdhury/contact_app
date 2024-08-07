import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from '../utils/marker_icon.png';

// Define the types for the props
interface CountryInfo {
  _id: string;
  lat: number;
  long: number;
}

interface CountryData {
  country: string;
  countryInfo: CountryInfo;
  active: number;
  recovered: number;
  deaths: number;
}

interface WorldMapProps {
  countriesData: CountryData[];
}

const WorldMap: React.FC<WorldMapProps> = ({ countriesData }) => {
  // Define a custom marker icon
  const customMarker = L.icon({
    iconUrl: markerIcon,
    iconSize: [20, 25],
    iconAnchor: [15, 30],
  });

  return (
    <div>
      {countriesData?.map((country) => (
        <Marker
          icon={customMarker} // Use the custom marker icon
          key={country.countryInfo._id} // Unique key for each marker
          position={[country.countryInfo.lat, country.countryInfo.long]} // Position of the marker
        >
          <Popup>
            <div>
              <h2>{country.country}</h2>
              <p>
                Active Cases: {country.active} <br />
                Recovered Cases: {country.recovered} <br />
                Deaths: {country.deaths}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </div>
  );
};

export default WorldMap;
