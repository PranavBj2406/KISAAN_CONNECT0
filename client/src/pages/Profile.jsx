import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [aadharID, setAadharID] = useState(null);

  useEffect(() => {
    const getPersistedUserData = () => {
  try {
    // Parse the entire persisted root
    const persistedState = JSON.parse(localStorage.getItem("persist:root"));
    console.log("Persisted State:", persistedState);

    // Parse the `user` key
    const userState = JSON.parse(persistedState.user);
    console.log("User State:", userState);

    // Access Aadhaar ID
    const aadharCard = userState.currentUser?.aadharCard;
    console.log("Extracted Aadhaar ID:", aadharCard);

    return aadharCard;
  } catch (err) {
    console.error("Error accessing persisted user data:", err);
    return null;
  }
};


    const aadhar = getPersistedUserData();
    console.log("Extracted Aadhaar ID:", aadhar);
    setAadharID(aadhar);
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!aadharID) {
        console.warn("No Aadhaar ID available");
        setError("No Aadhaar ID found for the logged-in user. Please log in again.");
        setLoading(false);
        return;
      }

      console.log("Fetching user details for Aadhaar ID:", aadharID);

      try {
        const response = await axios.get(`http://localhost:3000/api/user/${aadharID}`);
        console.log("API Response:", response.data);
        setUserDetails(response.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch user details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (aadharID) {
      fetchUserDetails();
    }
  }, [aadharID]);

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">User Profile</h1>
      {loading ? (
        <p className="text-blue-500">Loading...</p>
      ) : error ? (
        <div>
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        userDetails && (
          <div className="mt-6 bg-gray-100 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">User Details</h2>
            <p>
              <span className="font-medium">Name:</span> {userDetails.username}
            </p>
            <p>
              <span className="font-medium">Aadhaar:</span> {userDetails.aadharCard}
            </p>
          </div>
        )
      )}
    </div>
  );
}
