import React from "react";
import { useNavigate } from "react-router-dom";

const TheaterList = () => {
  const navigate = useNavigate();

  // Random list of theaters
  const theaters = [
    { id: 1, name: "Cineplex A", location: "Downtown" },
    { id: 2, name: "Cinema B", location: "Uptown" },
    { id: 3, name: "Movie House C", location: "Suburb" },
    { id: 4, name: "Film Plaza D", location: "City Center" },
  ];

  // Handle theater selection
  const handleSelectTheater = (theater) => {
    // Navigate to MainPage (or any other component) with selected theater data
    navigate("/mainpage", { state: { theater } });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-white">Select a Theater</h1>
      <ul className="space-y-4">
        {theaters.map((theater) => (
          <li
            key={theater.id}
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer"
            onClick={() => handleSelectTheater(theater)}
          >
            <div className="text-lg font-semibold">{theater.name}</div>
            <div className="text-gray-400">{theater.location}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TheaterList;
