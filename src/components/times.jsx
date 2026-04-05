import { useContext, useEffect } from "react";
import { locationContext } from "../contexts/location context.js";
export default function Times() {
  const [timeValues,dateValues] = useContext(locationContext);
  // console.log(dateValues)

  let counter=1
  let timeElements = timeValues.map((time) => {
    return (
      <div className="time-item">
        <div>0{counter++}</div>
        <div>{time[0]}</div>
        <div>{time[1]}</div>
      </div>
    );
  });
  return <div>
    <div className="time-list">

    {timeElements}
    </div>
    </div>;
}

const CelestialRhythms = () => {
  
  const [timeValues, dateValues] = useContext(locationContext);
  let counter=1
  const prayerTimes=[]
   timeValues.forEach((t)=>{
    prayerTimes.push({id:counter++,name:t[0],time:t[1],status:'default'})
  })
  useEffect(()=>{
  
    const currentDay= dateValues[2][1].weekday.en
    console.log(currentDay)
    const currentMonth= dateValues[2][1].month.en
    console.log(currentMonth)
  })
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
          <span className="celestial-date">{}</span>
        </div>

        {/* List */}
        <div className="prayer-list">
          {prayerTimes.map((prayer) => {
            // Determine dynamic classes based on status
            let itemClass = "prayer-item";
            if (prayer.status === 'current') itemClass += " is-current";
            if (prayer.status === 'next') itemClass += " is-next";

            return (
              <div key={prayer.id} className={itemClass}>
                <div className="prayer-item-left">
                  <span className="prayer-number">{prayer.id}</span>
                  
                  <div className="prayer-name-group">
                    <span className="prayer-name">{prayer.name}</span>
                    {prayer.status === 'current' && (
                      <span className="current-badge">Current</span>
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

export {CelestialRhythms};