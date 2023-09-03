import React, { useState, useEffect } from "react";
import Map from "../Map";
import UpperGraph from "../UpperGraph";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState(null);

  async function getData() {
    try {
      const res = await axios.get("https://disease.sh/v3/covid-19/all");

      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {data ? (
        <div id="container" style={{ margin: "auto" }}>
          <div id="dash-box1">
            <h3>Active: {data.active}</h3>
          </div>
          <div id="dash-box2">
            <h3>Critical: {data.critical}</h3>
          </div>
          <div id="dash-box3">
            <h3>deaths: {data.deaths}</h3>
          </div>
          <div id="dash-box4">
            <h3>recovered: {data.recovered}</h3>
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
      <UpperGraph />
      <Map />
    </div>
  );
}

export default Dashboard;
