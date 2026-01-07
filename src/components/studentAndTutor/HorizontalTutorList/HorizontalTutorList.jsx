import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TutorSmallCard from "../../../components/studentAndTutor/TutorSmallCard/TutorSmallCard";

function HorizontalTutorList({ tutors, setRefreshFavourites }) {
  const scrollRef = useRef(null);
  const [canScroll, setCanScroll] = useState(false);

  // Check if scrolling is needed
  useEffect(() => {
    const checkScroll = () => {
      if (!scrollRef.current) return;
      const { scrollWidth, clientWidth } = scrollRef.current;
      setCanScroll(scrollWidth > clientWidth); // true if content overflows
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [tutors]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.7; // scroll ~70% width
      scrollRef.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative group">
      {/* Prev Button */}
      {canScroll && (
        <button
          onClick={() => scroll("prev")}
          className="absolute -left-7 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-green-200 shadow-lg p-2 rounded-full hidden sm:flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={24} className="text-green-600" />
        </button>
      )}

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
      >
        {tutors.map((tutor, index) => (
          <div key={index} className="flex-shrink-0 w-[200px] sm:w-[280px]">
            <TutorSmallCard
              tutor={tutor}
              setRefreshFavourites={setRefreshFavourites}
            />
          </div>
        ))}
      </div>

      {/* Next Button */}
      {canScroll && (
        <button
          onClick={() => scroll("next")}
          className="absolute -right-7 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-green-200 shadow-lg p-2 rounded-full hidden sm:flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={24} className="text-green-600" />
        </button>
      )}
    </div>
  );
}

export default HorizontalTutorList;
