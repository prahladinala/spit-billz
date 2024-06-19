import { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import SplitScreen from "./components/SplitScreen";

function App() {
  const [groupSize, setGroupSize] = useState(null);
  const [tripName, setTripName] = useState("");

  const handleStart = (size, name) => {
    setGroupSize(size);
    setTripName(name);
  };

  return (
    <>
      {groupSize === null ? (
        <HomeScreen onSubmit={handleStart} />
      ) : (
        <SplitScreen groupSize={groupSize} tripName={tripName} />
      )}
    </>
  );
}

export default App;
