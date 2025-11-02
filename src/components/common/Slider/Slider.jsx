import { useState, useEffect, useRef, Children, cloneElement } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Slider = ({
  children,
  slidesToShow,
  infinite = true,
  autoSlide = true,
  autoSlideInterval = 5000,
  slideBtnHide,
  forceSingleSlideBelow1024 = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const totalItems = Children.count(children);

  // ✅ Responsive width tracking
  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Get slides to show based on viewport
  const getSlidesToShow = () => {
    if (sliderWidth < 640) return 1;
    if (sliderWidth < 1024) return forceSingleSlideBelow1024 ? 1 : 2;
    return slidesToShow || 4;
  };

  const visibleSlides = getSlidesToShow();
  const totalSlides = totalItems;

  // ✅ Go to a specific slide safely
  const goToSlide = (index) => {
    let newIndex = index;
    if (infinite) {
      if (index < 0) newIndex = totalSlides - visibleSlides;
      else if (index >= totalSlides - visibleSlides + 1) newIndex = 0;
    } else {
      newIndex = Math.max(0, Math.min(index, totalSlides - visibleSlides));
    }
    setCurrentIndex(newIndex);
  };

  // ✅ Slide controls
  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  // ✅ Auto-slide setup
  useEffect(() => {
    if (!autoSlide || isHovered) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(intervalRef.current);
  }, [autoSlide, autoSlideInterval, isHovered, currentIndex]);

  // ✅ Handle hover
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // ✅ Touch swipe handlers
  const handleTouchStart = (e) => {
    setTouchPosition(e.touches[0].clientX);
    setIsHovered(true);
  };

  const handleTouchMove = (e) => {
    if (touchPosition === null) return;
    const currentTouch = e.touches[0].clientX;
    const diff = touchPosition - currentTouch;

    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
      setTouchPosition(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchPosition(null);
    setIsHovered(false);
  };

  // ✅ Clone child slides to control width
  const renderSlides = () =>
    Children.map(children, (child, index) =>
      cloneElement(child, {
        style: {
          minWidth: `${100 / visibleSlides}%`,
          maxWidth: `${100 / visibleSlides}%`,
        },
        key: index,
      })
    );

  // ✅ Compute transform width based on visible slides
  const slideWidthPercent = 100 / visibleSlides;
  const offset = currentIndex * slideWidthPercent;

  return (
    <div
      className="relative w-full overflow-hidden group"
      ref={sliderRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(-${offset}%)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {renderSlides()}
      </div>

      {/* Arrows */}
      {totalSlides > visibleSlides && (
        <>
          <button
            onClick={prevSlide}
            className={`${forceSingleSlideBelow1024 === true ? 'hidden' : 'hidden lg:block'} absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-primary/60 hover:bg-secondary p-2 rounded-full shadow-lg transition-all duration-300 focus:outline-none ${
              slideBtnHide ? "hidden" : "opacity-0 group-hover:opacity-100"
            } ${isHovered ? "opacity-100" : "opacity-0"}`}
            aria-label="Previous slide"
          >
            <FiChevronLeft className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className={` ${forceSingleSlideBelow1024 === true ? 'hidden' : 'hidden lg:block'}  absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-primary/60 hover:bg-secondary p-2 rounded-full shadow-lg transition-all duration-300 focus:outline-none ${
              slideBtnHide ? "hidden" : "opacity-0 group-hover:opacity-100"
            } ${isHovered ? "opacity-100" : "opacity-0"}`}
            aria-label="Next slide"
          >
            <FiChevronRight className="w-5 h-5 text-white" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {totalSlides > visibleSlides && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalSlides - visibleSlides + 1 }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => {
                  goToSlide(index);
                  setIsHovered(true);
                  setTimeout(() => setIsHovered(false), autoSlideInterval * 2);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  index === currentIndex ? "bg-primary w-4" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Slider;
