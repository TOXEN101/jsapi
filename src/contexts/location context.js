import { createContext, useEffect, useState } from "react";

import axios from "axios";
const locationContext = createContext();
const addressContext = createContext();

function LocationContext({ children }) {
  const [add, setAdd] = useState("Amman,Jordan");
  const [timeValues, setTimeValues] = useState([]);
  const [dateValues, setDateValues] = useState([]);

  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  useEffect(() => {
    axios
      .get(
        `https://api.aladhan.com/v1/timingsByAddress/${formattedDate}?address=${add}`,
      )
      .then(function (response) {
        let respTime = response.data.data.timings;
        let respDate = response.data.data.date;

        let values = Object.entries(respTime);
        let dValues = Object.entries(respDate);
        // to only filer the prayer times
        values = values.filter((t) => {
          return (
            t[0] === "Fajr" ||
            t[0] === "Sunrise" ||
            t[0] === "Dhuhr" ||
            t[0] === "Asr" ||
            t[0] === "Maghrib" ||
            t[0] === "Isha"
          );
        });

        setTimeValues(values);
        setDateValues(dValues);
      })
      .catch(function (error) {
        // handle error
        console.error(error);
      });
  }, [add]);

  return (
    <>
      <locationContext.Provider value={[timeValues, dateValues]}>
        <addressContext.Provider value={[add, setAdd]}>
          {children}
        </addressContext.Provider>
      </locationContext.Provider>
    </>
  );
}
export { locationContext, addressContext, LocationContext };
