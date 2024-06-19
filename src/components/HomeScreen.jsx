import React, { useState } from "react";

const HomeScreen = ({ onSubmit }) => {
  const [groupSize, setGroupSize] = useState(2);
  const [tripName, setTripName] = useState("");

  const handleSubmit = () => {
    if (groupSize >= 2) {
      onSubmit(groupSize, tripName);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl mb-4">How many people are in your group?</h1>
      <div className="flex items-center mb-4">
        <button
          onClick={() => setGroupSize(groupSize - 1)}
          disabled={groupSize <= 2}
          className="px-4 py-2 bg-red-500 text-white"
        >
          -
        </button>
        <span className="px-4">{groupSize}</span>
        <button
          onClick={() => setGroupSize(groupSize + 1)}
          className="px-4 py-2 bg-green-500 text-white"
        >
          +
        </button>
      </div>
      <input
        type="text"
        placeholder="Trip Name (optional)"
        value={tripName}
        onChange={(e) => setTripName(e.target.value)}
        className="mb-4 px-4 py-2 border"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white"
      >
        Create
      </button>
    </div>
  );
};

export default HomeScreen;
