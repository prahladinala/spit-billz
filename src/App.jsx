import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import SplitScreen from "./components/SplitScreen";
import BillScreen from "./components/BillScreen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [groupSize, setGroupSize] = useState(null);
  const [tripName, setTripName] = useState("");

  const handleStart = (size, name) => {
    setGroupSize(size);
    setTripName(name);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              groupSize === null ? (
                <HomeScreen onSubmit={handleStart} />
              ) : (
                <SplitScreen groupSize={groupSize} tripName={tripName} />
              )
            }
          />
          <Route path="/bill/:id" element={<BillScreen />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
