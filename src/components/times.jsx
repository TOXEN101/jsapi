import { useContext, useEffect, useState } from "react";
import { locationContext } from "../contexts/location context.js";
import { usePrayerTimes } from "../contexts/usePrayerTimes.js";

const CelestialRhythms = () => {
  const [timeValues,dateValues] = useContext(locationContext);
  const prayerTimes= usePrayerTimes();
  const [dVal, setDval] = useState(
    `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
  );

  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${dayName}, ${day}-${month}-${year}`;

 
  useEffect(() => {
    if (dateValues && dateValues[2]) {
      const currentDay = dateValues[2][1]?.weekday?.en;
      const currentMonth = dateValues[2][1]?.month?.en;

      setDval(`${currentDay},${dateValues[2][1].day} ${currentMonth}`);
    }
  }, [dateValues]);
  // const prayerTimes = [
  //   { id: '01', name: 'Fajr', time: '04:32 AM', status: 'default' },
  //   { id: '02', name: 'Asr', time: '03:45 PM', status: 'current' },
  //   { id: '03', name: 'Maghrib', time: '06:12 PM', status: 'next' },
  //   { id: '04', name: 'Isha', time: '07:45 PM', status: 'default' },
  // ];
  return (
    <div className="celestial-wrapper">
      <div className="celestial-card">
        {/* Header */}
        <div className="celestial-header">
          <h2 className="celestial-title">Prayer Times</h2>
          <div>
            <span className="celestial-greg-date">{formattedDate}</span>
            <h3 className="celestial-hejri-date">{dVal}</h3>
          </div>
        </div>

        {/* List */}
        <div className="prayer-list">
          {prayerTimes.map((prayer) => {
            // Determine dynamic classes based on status
            let itemClass = "prayer-item";
            if (prayer.status === "current") itemClass += " is-current";
            if (prayer.status === "next") itemClass += " is-next";

            return (
              <div key={prayer.id} className={itemClass}>
                <div className="prayer-item-left">
                  <span className="prayer-number">{prayer.id}</span>

                  <div className="prayer-name-group">
                    <span className="prayer-name">{prayer.name}</span>
                    {prayer.status === "current" && (
                      <span className="current-badge">Current</span>
                    )}
                    {prayer.status === "next" && (
                      <span className="next-badge">Next</span>
                    )}
                  </div>
                </div>

                <span className="prayer-time">{prayer.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { CelestialRhythms };
