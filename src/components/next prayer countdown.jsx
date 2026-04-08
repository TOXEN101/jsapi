import { useEffect, useState } from "react";
import { usePrayerTimes } from "../contexts/usePrayerTimes.js";

const NextPrayerCountdown = ({ prayerName = "Maghrib", minutesLeft = 45 }) => {
  let prayerTimes = usePrayerTimes();
//   const [nPrayer, setnPrayer] = useState({ name: "null", time: "00:00" });
let nPrayer = { name: "null", time: "00:00" };

//   useEffect(() => {
//     if (prayerTimes && prayerTimes.length > 0) {
//       const nextp = prayerTimes.find((pt) => pt.status === "next");
//       if (nextp) setnPrayer(nextp);
//     }
//   }, [prayerTimes]);
if (prayerTimes && prayerTimes.length > 0) {
      const nextp = prayerTimes.find((pt) => pt.status === "next");
      if (nextp) nPrayer=nextp;
    }
  let aTime =
    parseInt(nPrayer.time.split(":")[0]) +
    parseFloat(nPrayer.time.split(":")[1]);
  const lHour = new Date().getHours();
  const lMin = new Date().getMinutes() / 60;
  const lTime = lHour + lMin;

  const timeUntilAdhan = (aTime-lTime)*60;
  return (
    <div className="countdown-container">
      <div className="countdown-card">
        {/* Background Graphic */}
        <div className="moon-graphic"></div>

        {/* Header Section */}
        <h2 className="countdown-header">
          <span className="text-until">Until </span>
          <span className="text-prayer">{nPrayer.name}</span>
        </h2>

        {/* Time Display */}
        <div className="time-display">
          <span className="time-number">{timeUntilAdhan}</span>
          <span className="time-label">minutes</span>
        </div>

        {/* Actions Row */}
        <div className="actions-row">
          <button className="action-button">View Duas for Sunset</button>
        </div>
      </div>
    </div>
  );
};

export default NextPrayerCountdown;
