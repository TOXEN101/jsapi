import "./App.css";
import { useContext } from "react";
import Nav from "./components/nav.jsx";
import Times from "./components/times.jsx";
import { CelestialRhythms } from "./components/times.jsx";
import { locationContext } from "./contexts/location context.js";
import NextPrayerCountdown from "./components/next prayer countdown.jsx";

function App() {
  const timeValues = useContext(locationContext);
  let timeElements = timeValues.map((time) => {
    return (
      <div>
        <h2>
          {time[0]}:{time[1]}
        </h2>
      </div>
    );
  });
  return (
    <>
      <Nav></Nav>
      <div>
      <NextPrayerCountdown></NextPrayerCountdown>
      <CelestialRhythms></CelestialRhythms>
      </div>
    </>
  );
}

export default App;
