import  { useState } from "react";

const ayatData = [
  {
    id: 1,
    surah: "Surah An-Nisa [4:103]",
    arabic:
      "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا",
    translation:
      "Indeed, prayer has been decreed upon the believers a decree of specified times.",
  },
  {
    id: 2,
    surah: "Surah Al-'Ankabut [29:45]",
    arabic:
      "وَأَقِمِ الصَّلَاةَ ۖ إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ",
    translation:
      "And establish prayer. Indeed, prayer prohibits immorality and wrongdoing, and the remembrance of Allah is greater.",
  },
  {
    id: 3,
    surah: "Surah Al-Mu'minun [23:1-2]",
    arabic:
      "قَدْ أَفْلَحَ الْمُؤْمِنُونَ ۝ الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ",
    translation:
      "Certainly will the believers have succeeded: They who are during their prayer humbly submissive.",
  },
];

const SalatAyat = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ayatData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ayatData.length) % ayatData.length);
  };

  const currentAyah = ayatData[currentIndex];

  return (
    <div className="ayat-wrapper">
      <div className="ayat-card">
        <h2 className="ayat-header">Divine Guidance</h2>

        {/* The key attribute forces React to re-trigger the CSS fade animation on change */}
        <div className="ayat-content" key={currentAyah.id}>
          <div className="ayat-arabic">{currentAyah.arabic}</div>
          <div className="ayat-translation">"{currentAyah.translation}"</div>
          <div className="ayat-reference">— {currentAyah.surah}</div>
        </div>

        {/* Previous Button */}
        <button
          className="slide-btn prev"
          onClick={handlePrev}
          aria-label="Previous Ayah"
        >
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

        {/* Next Button */}
        <button
          className="slide-btn next"
          onClick={handleNext}
          aria-label="Next Ayah"
        >
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
      </div>
    </div>
  );
};

export default SalatAyat;
