import { useContext, useEffect, useState } from "react";
import { locationContext } from "../contexts/location context.js";

export const usePrayerTimes=()=>{
const [timeValues] = useContext(locationContext);
let counter = 1;
const prayerTimes = [];
timeValues.forEach((t, i, ar) => {
  let status;
  let name;

  //p: prev prayer time
  const pHour = parseInt(ar[(i - 1 + ar.length) % ar.length][1].split(":")[0]);
  const pMin = ar[(i - 1 + ar.length) % ar.length][1].split(":")[1] / 60;
  const pTime = pHour + pMin;
  //c: current prayer time
  const cHour = parseInt(t[1].split(":")[0]);
  const cMin = t[1].split(":")[1] / 60;
  const cTime = cHour + cMin;
  //n: next prayer time
  const nHour = parseInt(ar[(i + 1) % ar.length][1].split(":")[0]);
  const nMin = ar[(i + 1) % ar.length][1].split(":")[1] / 60;
  const nTime = nHour + nMin;
  //l: local time(current device time)
  const lHour = new Date().getHours();
  const lMin = new Date().getMinutes() / 60;
  const lTime = lHour + lMin;
  //i: ishaTime
  const iHour = parseInt(ar[ar.length - 1][1].split(":")[0]);
  const iMin = ar[ar.length - 1][1].split(":")[1] / 60;
  const iTime = iHour + iMin;
  //f: fajirTime
  const fHour = parseInt(ar[0][1].split(":")[0]);
  const fMin = ar[0][1].split(":")[1] / 60;
  const fTime = fHour + fMin;

  if (cTime <= lTime && nTime > lTime) status = "current";
  else if ((lTime >= iTime || lTime < fTime) && cTime == iTime)
    status = "current";
  else if ((lTime >= iTime || lTime < fTime) && cTime == fTime) status = "next";
  else if (lTime > pTime && lTime <= cTime) status = "next";
  else status = "default";
  if (lTime > cTime && t[0] === "Sunrise") {
    name = "Duha";
  }
  prayerTimes.push({
    id: counter++,
    name: name === "Duha" ? name : t[0],
    time: t[1],
    status,
    key: counter,
  });
});
return prayerTimes;
}
