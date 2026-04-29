import { useEffect, useState } from "react";
import { usePrayerTimes } from "../contexts/usePrayerTimes.js";
const initialAdhkar = [
  {
    id: 1,
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    transliteration: "Astaghfirullah",
    translation: "I seek the forgiveness of Allah.",
    target: 3,
    count: 0,
  },
  {
    id: 2,
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: "SubhanAllah",
    translation: "Glory be to Allah.",
    target: 33,
    count: 0,
  },
  {
    id: 3,
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah",
    translation: "All praise is due to Allah.",
    target: 33,
    count: 0,
  },
  {
    id: 4,
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    translation: "Allah is the Greatest.",
    target: 34,
    count: 0,
  },
];

const PostPrayerAdhkar = () => {
  const [adhkarList, setAdhkarList] = useState(initialAdhkar);
  const [activeDhikr, setActiveDhikr] = useState(1);
  const prayerTimes = usePrayerTimes();

  const nextPrayer = prayerTimes?.find((pt) => pt.status === "next");

  const nextTimeString = nextPrayer?.time; // This is just a string, e.g., "15:45"

  // Function to handle the counter increment
  const handleTap = (id) => {
    setAdhkarList((currentList) =>
      currentList.map((dhikr) => {
        // If it's the clicked item and hasn't reached target, increment it
        if (dhikr.id === id && dhikr.count < dhikr.target) {
          return { ...dhikr, count: dhikr.count + 1 };
        }
        return dhikr;
      }),
    );
  };

  // Optional: Function to reset all counters
  const resetCounters = () => {
    setAdhkarList((currentList) =>
      currentList.map((dhikr) => ({ ...dhikr, count: 0 })),
    );
  };
  const handleNext = () => {
    setActiveDhikr(
      activeDhikr != initialAdhkar.length
        ? (activeDhikr + 1) % (initialAdhkar.length + 1)
        : 1,
    );
  };
  const handlePrev = () => {
    setActiveDhikr(
      activeDhikr != 1
        ? (activeDhikr - 1) % (initialAdhkar.length + 1)
        : initialAdhkar.length,
    );
  };

  useEffect(() => {
    resetCounters();
  }, [nextTimeString]);
  return (
    <div className="adhkar-wrapper">
      <div className="adhkar-card">
        <h2 className="adhkar-header">Post-Prayer Adhkar</h2>
        <p className="adhkar-subtitle">
          Supplications after completing obligatory Salat
        </p>

        <button className="slide-btn next" onClick={handleNext}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        <div className="adhkar-list ">
          {adhkarList.map((dhikr) => {
            const isCompleted = dhikr.count === dhikr.target;
            const isActive = dhikr.id === activeDhikr;

            return (
              <div
                key={dhikr.id}
                className={`dhikr-item ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""} `}
              >
                <div className="arabic-text">{dhikr.arabic}</div>
                <div className="transliteration">{dhikr.transliteration}</div>
                <div className="translation">"{dhikr.translation}"</div>

                <div className="counter-row">
                  <div className="progress-text">
                    {dhikr.count} <span>/ {dhikr.target}</span>
                  </div>

                  <button
                    className="tap-button"
                    onClick={() => handleTap(dhikr.id)}
                    disabled={isCompleted}
                  >
                    {isCompleted ? "Done ✓" : "Tap"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <button className="slide-btn prev" onClick={handlePrev}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PostPrayerAdhkar;
