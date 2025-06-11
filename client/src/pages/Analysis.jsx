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
import { ArrowLeft } from "lucide-react";
import gardenBg from "../assets/bg.jpg";
// Dynamic imports for different vegetable data files
const loadVegetableData = async (vegetable) => {
  try {
    switch (vegetable.toLowerCase()) {
      case 'potato':
        return (await import("../data/priceData.json")).default;
      case 'carrot':
        return (await import("../data/priceDataCarrot.json")).default; // This file actually contains carrot data
      case 'tomato':
        return (await import("../data/priceDataTomato.json")).default;
      // case 'cabbage':
      //   return (await import("../data/priceDataCabbage.json")).default;
      case 'cauliflower':
        return (await import("../data/priceDataCf.json")).default;
      default:
        throw new Error(`No data file found for ${vegetable}`);
    }
  } catch (error) {
    console.error(`Error loading data for ${vegetable}:`, error);
    return [];
  }
};

// Available vegetables - add more as you create more JSON files
const AVAILABLE_VEGETABLES = ['Potato', 'Carrot', 'Tomato','Cauliflower']; // Changed Onion to Carrot

// Vegetable-specific configurations
const VEGETABLE_CONFIG = {
  Potato: {
    color: '#8B4513', // Brown
    bgGradient: 'from-amber-100 via-amber-200 to-amber-300'
  },
  Carrot: { // Changed from Onion to Carrot
    color: '#FF8C00', // Orange
    bgGradient: 'from-orange-100 via-orange-200 to-orange-300'
  },
  Tomato: {
    color: '#DC143C', // Red
    bgGradient: 'from-red-100 via-red-200 to-red-300'
  },
  Cauliflower: {
    color: '#F0E68C', // Khaki
    bgGradient: 'from-yellow-100 via-yellow-200 to-yellow-300'
  },
};

const PriceAnalysis = ({ onBack }) => {
  // State management
  const [filteredData, setFilteredData] = useState([]);
  const [stateDistrictMap, setStateDistrictMap] = useState({});
  const [selectedVegetable, setSelectedVegetable] = useState("Potato");
  const [selectedState, setSelectedState] = useState("Karnataka");
  const [selectedDistrict, setSelectedDistrict] = useState("Bangalore");
  const [selectedMarket, setSelectedMarket] = useState("All");
  const [availableMarkets, setAvailableMarkets] = useState(["All"]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(100);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);

  // Load data when vegetable selection changes
  useEffect(() => {
    const loadData = async () => {
      setDataLoading(true);
      setLoading(true);
      
      try {
        const rawData = await loadVegetableData(selectedVegetable);
        
        if (!rawData || rawData.length === 0) {
          console.warn(`No data available for ${selectedVegetable}`);
          setFilteredData([]);
          setStateDistrictMap({});
          setTotalRecords(0);
          setLoading(false);
          setDataLoading(false);
          return;
        }

        // Clean and parse data
        const cleanedData = rawData
          .map((row) => ({
            ...row,
            Modal_Price: Number(row.Modal_Price) || 0,
            Min_Price: Number(row.Min_Price) || 0,
            Max_Price: Number(row.Max_Price) || 0,
            Arrival_Date: moment(
              row.Arrival_Date,
              ["DD/MM/YYYY", "YYYY-MM-DD", "MM/DD/YYYY"],
              true
            ).isValid()
              ? moment(row.Arrival_Date, ["DD/MM/YYYY", "YYYY-MM-DD", "MM/DD/YYYY"]).toDate()
              : null,
            State: row.State?.trim(),
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
              (row.Commodity?.toLowerCase() === selectedVegetable.toLowerCase() || 
               !row.Commodity) // Handle cases where commodity might not be specified
          );

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
          map[state] = Array.from(map[state]).sort();
        });
        
        setStateDistrictMap(map);
        setFilteredData(cleanedData);
        setTotalRecords(cleanedData.length);

        // Reset selections if current state/district not available in new data
        const availableStates = Object.keys(map);
        if (availableStates.length > 0 && !map[selectedState]) {
          const firstState = availableStates[0];
          setSelectedState(firstState);
          setSelectedDistrict(map[firstState]?.[0] || "");
        } else if (map[selectedState] && !map[selectedState].includes(selectedDistrict)) {
          setSelectedDistrict(map[selectedState]?.[0] || "");
        }

      } catch (error) {
        console.error(`Error loading ${selectedVegetable} data:`, error);
        setFilteredData([]);
        setStateDistrictMap({});
        setTotalRecords(0);
      } finally {
        setLoading(false);
        setDataLoading(false);
      }
    };

    loadData();
  }, [selectedVegetable]);

  // Update available markets when state, district, or vegetable changes
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

  // Generate chart data
  const chartData = useMemo(() => {
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

    // Convert to chart format
    return Object.values(monthlyData)
      .map((item) => ({
        date: moment(item.date).format("MMM YYYY"),
        modalPrice: Math.round(item.totalModal / item.count) / 100,
        minPrice: Math.round(item.totalMin / item.count) / 100,
        maxPrice: Math.round(item.totalMax / item.count) / 100,
      }))
      .sort((a, b) => moment(a.date, "MMM YYYY").valueOf() - moment(b.date, "MMM YYYY").valueOf());
  }, [filteredData, selectedState, selectedDistrict, selectedMarket]);

  // Event handlers
  const handleVegetableChange = (e) => {
    setSelectedVegetable(e.target.value);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedDistrict(stateDistrictMap[e.target.value]?.[0] || "");
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const handleMarketChange = (e) => {
    setSelectedMarket(e.target.value);
  };

  const loadMore = () => {
    if (offset + limit < totalRecords) {
      setOffset((prev) => prev + limit);
    }
  };

  // Get current vegetable config
  const currentConfig = VEGETABLE_CONFIG[selectedVegetable] || VEGETABLE_CONFIG.Potato;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">
            {dataLoading ? `Loading ${selectedVegetable} data...` : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 bg-gradient-to-br ${currentConfig.bgGradient}`}>
      <div className="mx-auto">
        {/* Header */}
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
             Price Analysis
           </h1>
         </div>

        {/* Analysis Section */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg"
          style={{
            maxHeight: "80vh",
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          <style>
            {`
              .bg-white::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4 mb-8">
            {/* Vegetable Selection */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Select Vegetable
              </label>
              <select
                className="border rounded px-4 py-2 font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedVegetable}
                onChange={handleVegetableChange}
              >
                {AVAILABLE_VEGETABLES.map((veg) => (
                  <option key={veg} value={veg}>
                    {veg}
                  </option>
                ))}
              </select>
            </div>

            {/* State Selection */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Select State
              </label>
              <select
                className="border rounded px-4 py-2 font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedState}
                onChange={handleStateChange}
              >
                {Object.keys(stateDistrictMap).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* District Selection */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Select District
              </label>
              <select
                className="border rounded px-4 py-2 font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedDistrict}
                onChange={handleDistrictChange}
              >
                {(stateDistrictMap[selectedState] || []).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* Market Selection */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Select Market
              </label>
              <select
                className="border rounded px-4 py-2 font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedMarket}
                onChange={handleMarketChange}
              >
                {availableMarkets.map((market) => (
                  <option key={market} value={market}>
                    {market}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Data Status */}
          {filteredData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">
                No data available for {selectedVegetable} in the selected location.
              </p>
            </div>
          ) : (
            <>
              {/* Line Chart */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4" style={{ color: currentConfig.color }}>
                  {selectedVegetable} Modal Price Trends (INR/kg)
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
                      stroke={currentConfig.color}
                      name="Modal Price"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4" style={{ color: currentConfig.color }}>
                  {selectedVegetable} Min/Max Price Range (INR/kg)
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
                <h3 className="text-lg font-semibold mb-2" style={{ color: currentConfig.color }}>
                  {selectedVegetable} Analysis Summary
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Average Modal Price</p>
                      <p className="text-2xl font-bold" style={{ color: currentConfig.color }}>
                        ₹{(
                          chartData.reduce((sum, d) => sum + d.modalPrice, 0) /
                            chartData.length || 0
                        ).toFixed(2)}/kg
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Records</p>
                      <p className="text-2xl font-bold text-gray-700">
                        {totalRecords.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Price Range</p>
                      <p className="text-lg font-semibold text-gray-700">
                        ₹{Math.min(...chartData.map(d => d.minPrice)).toFixed(2)} - 
                        ₹{Math.max(...chartData.map(d => d.maxPrice)).toFixed(2)}/kg
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="text-lg font-semibold text-gray-700">
                        {selectedDistrict}, {selectedState}
                        {selectedMarket !== "All" && ` (${selectedMarket})`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Load More Button */}
          {offset + limit < totalRecords && (
            <button
              onClick={loadMore}
              className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              Load More Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceAnalysis;