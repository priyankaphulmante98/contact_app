import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import L from "leaflet";

const Map = () => {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then((response) => {
        setCountriesData(response.data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  const customIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#FF5733" class="bi bi-dot" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="3"/>
    </svg>
  `;

  return (
    <div
      style={{
        padding: "10px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        margin: "20px",
      }}
    >
      <div className="map-container">
        <MapContainer
          center={[0, 0]}
          zoom={3}
          style={{ height: "80vh", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {countriesData.map((country) => (
            <Marker
              key={country.country}
              position={[country.countryInfo.lat, country.countryInfo.long]}
              icon={L.divIcon({ className: "custom-icon", html: customIcon })}
            >
              <Popup>
                <div>
                  <h3>{country.country}</h3>
                  <p>Total Active Cases: {country.active}</p>
                  <p>Total Recovered Cases: {country.recovered}</p>
                  <p>Total Deaths: {country.deaths}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
