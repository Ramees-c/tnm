import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CategoryCarousel = ({ children }) => {
  const scrollRef = useRef(null);
  const [canScroll, setCanScroll] = useState(false);

  // 🔍 Check if scrolling is possible
  useEffect(() => {
    const checkScroll = () => {
      if (!scrollRef.current) return;
      const { scrollWidth, clientWidth } = scrollRef.current;
      setCanScroll(scrollWidth > clientWidth);
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);

    return () => window.removeEventListener("resize", checkScroll);
  }, [children]);

  const handlePrev = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const handleNext = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative group">
      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto pb-2 space-x-2 px-2 scroll-smooth scrollbar-hide"
      >
        {children}
      </div>

      {/* Prev Button (only if scrollable) */}
      {canScroll && (
        <button
          onClick={handlePrev}
          className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm 
                     hover:bg-green-200 shadow-md p-2 rounded-full transition-all duration-200 
                     opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={22} className="text-green-600" />
        </button>
      )}

      {/* Next Button (only if scrollable) */}
      {canScroll && (
        <button
          onClick={handleNext}
          className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm 
                     hover:bg-green-200 shadow-md p-2 rounded-full transition-all duration-200 
                     opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={22} className="text-green-600" />
        </button>
      )}
    </div>
  );
};

export default CategoryCarousel;
