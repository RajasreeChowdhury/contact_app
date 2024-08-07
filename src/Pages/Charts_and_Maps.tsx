import axios from "axios";
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { MapContainer, TileLayer } from "react-leaflet";
import WorldMap from "../Components/WorldMap";

const Dashboard: React.FC = () => {
  // State to store country-specific data
  const [countriesData, setCountriesData] = useState<any[]>([]);
  // State to store chart data
  const [chartData, setChartData] = useState<any>({});
  // State to store the date range for the chart
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });
  // State for worldwide data
  const [worldwideData, setWorldwideData] = useState<{ cases: number, recovered: number, deaths: number }>({ cases: 0, recovered: 0, deaths: 0 });

  // Fetch country-data
  useEffect(() => {
    axios.get("https://disease.sh/v3/covid-19/countries")
      .then((res) => {
        const data = res.data;
        setCountriesData(data);
      });
  }, []);

  // Fetch historical COVID-19 data
  useEffect(() => {
    axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((res) => {
        const data = res.data;
        const dates = Object.keys(data.cases);
        const cases = Object.values(data.cases);
        const recovered = Object.values(data.recovered);
        const deaths = Object.values(data.deaths);

        // Get the first and last date in the dataset
        const firstDate = dates[0];
        const lastDate = dates[dates.length - 1];
        setDateRange({ start: firstDate, end: lastDate });

        // Construct the chart data object
        const newChartData = {
          labels: dates,
          datasets: [
            {
              label: "Cases",
              data: cases,
              fill: false,
              borderColor: "#facc15",
              tension: 0.2,
            },
            {
              label: "Recovered",
              data: recovered,
              fill: false,
              borderColor: "#4caf50",
              tension: 0.2,
            },
            {
              label: "Deaths",
              data: deaths,
              fill: false,
              borderColor: "#f44336",
              tension: 0.2,
            },
          ],
        };
        setChartData(newChartData);
      });

    // Register Chart.js components
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );
  }, []);

  // Fetch worldwide data
  useEffect(() => {
    axios.get("https://disease.sh/v3/covid-19/all")
      .then((res) => {
        const data = res.data;
        setWorldwideData({
          cases: data.cases,
          recovered: data.recovered,
          deaths: data.deaths,
        });
      });
  }, []);

  return (
    <div className="w-full pt-16 px-4 pb-8 ">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Graph data for cases with date:</h1>
      <div className="border-2 border-blue-500 w-11/12 m-auto">
        {chartData.datasets ? (
          <>
            <Line data={chartData} />
            <p className="text-xl font-bold mb-4 mt-4 text-blue-500">Showing data from {dateRange.start} to {dateRange.end}</p>
          </>
        ) : (
          <h1 className="text-gray-600 mb-4 font-bold text-2xl">Loading...</h1>
        )}
      </div>

      <h1 className="text-4xl font-bold mb-4 mt-4 text-blue-700">Country Specific data of cases:</h1>
      <div className="border-2 border-blue-500 w-11/12 m-auto">
        <div className=" max-h-[500px] overflow-y-auto">
          <MapContainer
            className="m-auto w-full border-blue-700"
            bounds={[[-60, -180], [85, 180]]}
            zoom={2}
            center={[20, 40]}
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            />
            <WorldMap countriesData={countriesData} />
          </MapContainer>
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-4 mt-4 text-green-500">Worldwide Data:</h1>
      <div className="border-2 border-green-500 w-11/12 m-auto p-4">
        <p>Total Cases: {worldwideData.cases}</p>
        <p>Total Recovered: {worldwideData.recovered}</p>
        <p>Total Deaths: {worldwideData.deaths}</p>
      </div>
    </div>
  );
};

export default Dashboard;
