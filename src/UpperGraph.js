import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

const UpperGraph = () => {
  const [historicalData, setHistoricalData] = useState(null);
  const [deathData, setdeathData] = useState(null);
  // const [recoverdData, setrecoveredData] = useState(null);

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((response) => {
        const { cases, deaths, recovered } = response.data;

        const categories = Object.keys(cases);
        const casesData = Object.values(cases);
        const deathsData = Object.values(deaths);
        const recoveredData = Object.values(recovered);

        const chartData = [
          {
            name: "Cases",
            data: casesData,
          },
        ];
        const deathData = [
          {
            name: "Deaths",
            data: deathsData,
          },
          {
            name: "Recovered",
            data: recoveredData,
          },
        ];
        // const recoverdData = [
        //   {
        //     name: "Recovered",
        //     data: recoveredData,
        //   },
        // ];

        setHistoricalData({
          options: {
            chart: {
              type: "line",
              height: 450,
              width: 500,
              stacked: false,
              zoom: {
                type: "x",
                autoScaleYaxis: true,
              },
              toolbar: {
                show: false,
              },
            },
            stroke: {
              show: true,
              width: 2,
              curve: "smooth",
            },
            dataLabels: {
              enabled: false,
            },
            markers: {
              size: 0,
            },
            xaxis: {
              categories: categories,
              type: "datetime",
            },
            yaxis: {
              title: {
                text: "Count",
              },
              min: 0,
              tickAmount: 10,
              labels: {
                formatter: function (val) {
                  return (val / 1000000).toFixed(1) + "M";
                },
              },
            },

            tooltip: {
              x: {
                format: "dd/MM/yy",
              },
              y: {
                formatter: function (val) {
                  return val.toString();
                },
              },
            },
          },
          series: chartData,
        });

        setdeathData({
          options: {
            chart: {
              type: "line",
              height: 450,
              width: 400,
              stacked: false,
              zoom: {
                type: "x",
                autoScaleYaxis: true,
              },
              toolbar: {
                show: false,
              },
            },
            stroke: {
              show: true,
              width: 2,
              curve: "smooth",
            },
            dataLabels: {
              enabled: false,
            },
            markers: {
              size: 0,
            },
            xaxis: {
              categories: categories,
              type: "datetime",
            },
            yaxis: {
              title: {
                text: "Count",
              },
              min: 0,
              tickAmount: 10,
              labels: {
                formatter: function (val) {
                  return (val / 1000000).toFixed(1) + "M";
                },
              },
            },

            tooltip: {
              x: {
                format: "dd/MM/yy",
              },
              y: {
                formatter: function (val) {
                  return val.toString();
                },
              },
            },
          },
          series: deathData,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <span
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <span
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <h2 style={{ marginLeft: "10px" }}>COVID-19 Historical Cases Data</h2>

        {historicalData && (
          <ReactApexChart
            options={historicalData.options}
            series={historicalData.series}
            type="area"
            height={350}
            width={450}
          />
        )}
      </span>

      <span
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <h2 style={{ marginLeft: "10px" }}>
          COVID-19 Historical Deaths And Recoverd Data
        </h2>
        {deathData && (
          <ReactApexChart
            options={deathData.options}
            series={deathData.series}
            type="area"
            height={350}
            width={450}
          />
        )}
      </span>

      {/* <span
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <h2 style={{ marginLeft: "10px" }}>
          COVID-19 Historical Recovered Data
        </h2>
        {recoverdData && (
          <ReactApexChart
            options={recoverdData.options}
            series={recoverdData.series}
            type="area"
            height={350}
            width={450}
          />
        )}
      </span> */}
    </span>
  );
};

export default UpperGraph;
