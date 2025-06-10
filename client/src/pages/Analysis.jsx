import React, { useState, useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import priceData from "../data/priceData.json"; // JSON dataset from CSV conversion
import { ArrowLeft } from "lucide-react";
import gardenBg from "../assets/bg.jpg";

// PriceAnalysis component for displaying potato price trends
const PriceAnalysis = ({ onBack }) => {
  // State for filtered data, filters, and UI controls
  const [filteredData, setFilteredData] = useState([]); // Cleaned and filtered dataset
  const [stateDistrictMap, setStateDistrictMap] = useState({}); // Map of states to districts
  const [selectedState, setSelectedState] = useState("Karnataka"); // Default state
  const [selectedDistrict, setSelectedDistrict] = useState("Bangalore"); // Default district
  const [selectedMarket, setSelectedMarket] = useState("All"); // Default market
  const [availableMarkets, setAvailableMarkets] = useState(["All"]); // Available markets for selected district
  const [offset, setOffset] = useState(0); // Pagination offset
  const [limit] = useState(100); // Pagination limit
  const [totalRecords, setTotalRecords] = useState(0); // Total number of records
  const [loading, setLoading] = useState(true); // Loading state

  // Load and clean data on component mount
  useEffect(() => {
    try {
      // Clean and parse JSON data
      const cleanedData = priceData
        .map((row) => ({
          ...row,
          Modal_Price: Number(row.Modal_Price) || 0, // Convert price to number
          Min_Price: Number(row.Min_Price) || 0,
          Max_Price: Number(row.Max_Price) || 0,
          Arrival_Date: moment(
            row.Arrival_Date,
            ["DD/MM/YYYY", "YYYY-MM-DD"],
            true
          ).isValid()
            ? moment(row.Arrival_Date, ["DD/MM/YYYY", "YYYY-MM-DD"]).toDate()
            : null, // Parse date
          State: row.State?.trim(), // Trim strings
          District: row.District?.trim(),
          Market: row.Market?.trim(),
          Commodity: row.Commodity?.trim(),
        }))
        .filter(
          (row) =>
            row.Modal_Price > 0 &&
            row.Arrival_Date &&
            row.State &&
            row.District &&
            row.Market &&
            row.Commodity === "Potato"
        ); // Filter valid potato records

      // Create state-to-district mapping
      const map = {};
      cleanedData.forEach((row) => {
        const state = row.State;
        const district = row.District;
        if (state && district) {
          if (!map[state]) map[state] = new Set();
          map[state].add(district);
        }
      });
      Object.keys(map).forEach((state) => {
        map[state] = Array.from(map[state]).sort(); // Sort districts
      });
      setStateDistrictMap(map);

      setFilteredData(cleanedData);
      setTotalRecords(cleanedData.length);
      setLoading(false);
    } catch (err) {
      console.error("Error processing data:", err);
      setLoading(false);
    }
  }, []);

  // Update available markets when state or district changes
  useEffect(() => {
    const markets = [
      "All",
      ...new Set(
        filteredData
          .filter(
            (row) =>
              row.State === selectedState && row.District === selectedDistrict
          )
          .map((row) => row.Market)
          .filter(Boolean)
      ),
    ].sort();
    setAvailableMarkets(markets);
    setSelectedMarket("All");
    setOffset(0);
  }, [selectedState, selectedDistrict, filteredData]);

  // Aggregate data by month for charting
  const chartData = useMemo(() => {
    // Filter data based on user selections
    const dataToChart = filteredData.filter(
      (row) =>
        row.State === selectedState &&
        row.District === selectedDistrict &&
        (selectedMarket === "All" || row.Market === selectedMarket)
    );

    // Group by year-month
    const monthlyData = {};
    dataToChart.forEach((row) => {
      const date = moment(row.Arrival_Date);
      const key = date.format("YYYY-MM");
      if (!monthlyData[key]) {
        monthlyData[key] = {
          totalModal: 0,
          totalMin: 0,
          totalMax: 0,
          count: 0,
          date: date.toDate(),
        };
      }
      monthlyData[key].totalModal += row.Modal_Price;
      monthlyData[key].totalMin += row.Min_Price;
      monthlyData[key].totalMax += row.Max_Price;
      monthlyData[key].count += 1;
    });

    // Convert to chart-friendly format (Quintal to kg)
    return Object.values(monthlyData)
      .map((item) => ({
        date: moment(item.date).format("MMM YYYY"),
        modalPrice: Math.round(item.totalModal / item.count) / 100, // Convert Quintal to kg
        minPrice: Math.round(item.totalMin / item.count) / 100,
        maxPrice: Math.round(item.totalMax / item.count) / 100,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [filteredData, selectedState, selectedDistrict, selectedMarket]);

  // Handle filter changes
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedDistrict(stateDistrictMap[e.target.value]?.[0] || ""); // Reset district
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const handleMarketChange = (e) => {
    setSelectedMarket(e.target.value);
  };

  // Load more data for pagination
  const loadMore = () => {
    if (offset + limit < totalRecords) {
      setOffset((prev) => prev + limit);
    }
  };

  // Show loading screen while data is processing
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 to-indigo-100 flex items-center justify-center">
        <p className="text-center text-xl text-gray-600">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-lime-100 via-lime-200 to-lime-300">
      <div className=" mx-auto">
        {/* Header with back button */}
        <div
          className="mb-8 rounded-lg border border-none px-5 py-10 relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 100%), url(${gardenBg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-5xl font-semibold text-start text-white drop-shadow">
            Analysis Pane
          </h1>
        </div>
        {/* Scrollable analysis section */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg"
          style={{
            maxHeight: "80vh",
            overflowY: "auto",
            scrollbarWidth: "none", // Firefox
            // IE/Edge
          }}
        >
          <style>
            {`
                    /* Hide scrollbar for Chrome, Safari and Opera */
                    .bg-white::-webkit-scrollbar {
                    display: none;
                    }
                  `}
          </style>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap gap-4 mb-8">
            {/* Vegetable Dropdown */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Select Vegetable
              </label>
              <select
                className="border rounded px-7 py-2 font-semibold hover:bg-lime-500 hover:text-white duration-500 ease-in-out transition-colors hover:border-black hover:border-2"
                value="Potato"
                disabled
              >
                <option value="Potato">Potato</option>
                {/* Add more options if supporting more vegetables */}
              </select>
            </div>
          </div>
          {/* Line Chart: Modal Price Trends */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Modal Price Trends (INR/kg)
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  interval={Math.floor(chartData.length / 10)}
                />
                <YAxis
                  label={{
                    value: "Price (INR/kg)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}/kg`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="modalPrice"
                  stroke="#3B82F6"
                  name="Modal Price"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart: Price Range */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Min/Max Price Range (INR/kg)
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  interval={Math.floor(chartData.length / 10)}
                />
                <YAxis
                  label={{
                    value: "Price (INR/kg)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}/kg`} />
                <Legend />
                <Bar dataKey="minPrice" fill="#10B981" name="Min Price" />
                <Bar dataKey="maxPrice" fill="#EF4444" name="Max Price" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Analysis Summary */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Analysis Summary</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li>
                <strong>
                  Potato Prices in {selectedDistrict}{" "}
                  {selectedMarket === "All"
                    ? "(All Markets)"
                    : `(${selectedMarket})`}
                </strong>
                : Average modal price: ₹
                {(
                  chartData.reduce((sum, d) => sum + d.modalPrice, 0) /
                    chartData.length || 0
                ).toFixed(2)}
                /kg
              </li>
              <li>
                <strong>2020 Price Spike</strong>: In October 2020, Ramanagara
                saw modal prices soar to ₹44-46/kg, likely due to COVID-19
                supply disruptions.
              </li>
              <li>
                <strong>Recent Trend</strong>: As of May 2025, Ramanagara prices
                stabilized around ₹25/kg, showing recovery from earlier
                volatility.
              </li>
            </ul>
          </div>

          {/* Load More Button for Pagination */}
          {offset + limit < totalRecords && (
            <button
              onClick={loadMore}
              className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceAnalysis;
