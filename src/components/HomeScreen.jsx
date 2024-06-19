import React, { useState } from "react";
import logo from "/logot.png";
import { toast } from "react-toastify";

const HomeScreen = ({ onSubmit }) => {
  const [groupSize, setGroupSize] = useState(2);
  const [tripName, setTripName] = useState("");

  const handleSubmit = () => {
    if (groupSize >= 2) {
      onSubmit(groupSize, tripName);
    }
    toast.success("Start Entering all the details");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-20 w-auto" src={logo} alt="Your Company" />
        <h2 className="mt-20 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          How many people are in your group?
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex w-full items-center mb-4 justify-center">
          {" "}
          {/* Modified this line */}
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
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-5"
        />
        <button
          onClick={handleSubmit}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
