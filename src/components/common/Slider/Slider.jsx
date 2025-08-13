import { useState, useEffect, useRef, Children, cloneElement } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Slider = ({
  children,
  slidesToShow = 3,
  infinite = true,
  autoSlide = true,
  autoSlideInterval = 5000, // default 5 seconds
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const totalItems = Children.count(children);

  // Handle responsive slides count
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

  // Auto-slide functionality
  useEffect(() => {
    if (!autoSlide || isHovered) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => clearInterval(intervalRef.current);
  }, [autoSlide, autoSlideInterval, currentIndex, isHovered]);

  // Auto-center slides after resize
  useEffect(() => {
    goToSlide(currentIndex);
  }, [sliderWidth]);

  // Calculate responsive slides to show
  const getSlidesToShow = () => {
    if (sliderWidth < 640) return 1;
    if (sliderWidth < 1024) return 2;
    return slidesToShow;
  };

  const visibleSlides = getSlidesToShow();
  const totalSlides = Math.ceil(totalItems / visibleSlides);

  const goToSlide = (index) => {
    let newIndex = index;
    if (infinite) {
      if (index < 0) {
        newIndex = totalSlides - 1;
      } else if (index >= totalSlides) {
        newIndex = 0;
      }
    } else {
      newIndex = Math.max(0, Math.min(index, totalSlides - 1));
    }
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    goToSlide(currentIndex + 1);
  };

  const prevSlide = () => {
    goToSlide(currentIndex - 1);
  };

  // Pause auto-slide on hover
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
    setIsHovered(true); // Pause auto-slide during interaction
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      nextSlide();
    }

    if (diff < -5) {
      prevSlide();
    }

    setTouchPosition(null);
  };

  const handleTouchEnd = () => {
    setIsHovered(false); // Resume auto-slide after interaction
  };

  // Clone children to add slider-specific props
  const renderSlides = () => {
    return Children.map(children, (child, index) => {
      return cloneElement(child, {
        style: {
          minWidth: `${100 / visibleSlides}%`,
          maxWidth: `${100 / visibleSlides}%`,
        },
        key: index,
      });
    });
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      ref={sliderRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {renderSlides()}
      </div>

      {/* Navigation Arrows */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 focus:outline-none"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 focus:outline-none"
            aria-label="Next slide"
          >
            <FiChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                goToSlide(index);
                setIsHovered(true); // Pause auto-slide on manual navigation
                setTimeout(() => setIsHovered(false), autoSlideInterval * 2); // Resume after double the interval
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                index === currentIndex ? "bg-primary w-4" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;
