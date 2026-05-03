import { useEffect, useState } from "react";
import { usePrayerTimes } from "../contexts/usePrayerTimes.js";

const NextPrayerCountdown = ({ prayerName = "Maghrib", minutesLeft = 45 }) => {
  const prayerTimes = usePrayerTimes();
  const [timeLeft, setTimeLeft] = useState("00:00");

  // 1. Find the target string OUTSIDE the useEffect
  const nextPrayer = prayerTimes?.find((pt) => pt.status === "next");
  const nextTimeString = nextPrayer?.time; // This is just a string, e.g., "15:45"

  useEffect(() => {
    // 2. Stop if we don't have a valid time string yet
    if (!nextTimeString) return;

    const calculateCountDown = () => {
      // 3. Use the string directly
      const aTime =
        parseInt(nextTimeString.split(":")[0]) +
        parseFloat(nextTimeString.split(":")[1]) / 60;

      const now = new Date();
      const lTime = now.getHours() + now.getMinutes() / 60;

      let timeUntilAdhan = aTime > lTime ? aTime - lTime : aTime - lTime + 24;

      const timeUntilAdhanH = Math.trunc(timeUntilAdhan);
      const timeUntilAdhanM = Math.floor(
        (timeUntilAdhan - timeUntilAdhanH) * 60,
      )
        .toString()
        .padStart(2, "0");

      return {
        name: nextPrayer.name,
        time: `${timeUntilAdhanH}:${timeUntilAdhanM}`,
      };
    };

    // 4. Run instantly on load
    setTimeLeft(calculateCountDown());

    // 5. Start the interval timer
    const timer = setInterval(() => {
      setTimeLeft(calculateCountDown());
    }, 60000);

    return () => clearInterval(timer);

    // 6. THE FIX: Watch the string, not the array!
    // It will ONLY re-run when the prayer actually changes to the next one.
  }, [nextTimeString]);


  return (
    <div className="countdown-container">
      <div className="countdown-card">
        {/* Background Graphic */}
        <div className="moon-graphic"></div>

        {/* Header Section */}
        <h2 className="countdown-header">
          <span className="text-until">Until </span>
          <span className="text-prayer">{timeLeft.name}</span>
        </h2>

        {/* Time Display */}
        <div className="time-display">
          <span className="time-number">{timeLeft.time}</span>
          {/* <span className="time-label">Hours</span> */}
        </div>

        {/* Actions Row */}
        <div className="actions-row" >
          {/* <button className="action-button">View Duas for Sunset</button> */}
        </div>
      </div>
    </div>
  );
};

export default NextPrayerCountdown;
