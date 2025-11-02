import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import DefaultButton from "../../common/DefaultButton/DefaultButton";

function SubscriptionCard({
  title,
  price,
  features,
  onSelect,
  duration,
  disabled,
  isChosen,
  userCurrentPrice,
}) {
  const listRef = useRef(null);
  const [atBottom, setAtBottom] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (!listRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = listRef.current;

      setIsScrollable(scrollHeight > clientHeight); // only show if scrollable
      setAtBottom(scrollTop + clientHeight >= scrollHeight - 2); // near bottom
    };

    checkScroll(); // run on mount
    const list = listRef.current;
    if (list) list.addEventListener("scroll", checkScroll);

    return () => {
      if (list) list.removeEventListener("scroll", checkScroll);
    };
  }, [features]);

  const handleScrollDown = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ top: 100, behavior: "smooth" });
    }
  };

  const handleScrollUp = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ top: -100, behavior: "smooth" });
    }
  };

  // Button logic combining isChosen and price comparison
  let buttonText = "Choose Plan";
  let isButtonDisabled = disabled;

  const planPrice = Number(price);
  const currentPrice = Number(userCurrentPrice);

  if (isChosen) {
    buttonText = "Subscribed";
    isButtonDisabled = true;
  } else if (!isNaN(currentPrice)) {
    if (currentPrice === 0) {
      buttonText = "Subscribe";
      isButtonDisabled = false;
    } else if (planPrice === currentPrice) {
      buttonText = "Choosed";
      isButtonDisabled = true;
    } else if (planPrice > currentPrice) {
      buttonText = "Update Plan";
      isButtonDisabled = false;
    } else if (planPrice < currentPrice) {
      buttonText = "Subscribe";
      isButtonDisabled = true; // can’t downgrade
    }
  }

  return (
    <div
      className={`flex flex-col rounded-md shadow-sm p-6 border ${
        isChosen && "border-2 border-green-600"
      } relative`}
    >
      {/* Title */}
      <h3 className="text-xl lg:text-2xl font-bold text-green-700 mb-2">{title}</h3>

      {/* Price */}
      <p className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
        ₹{price}{" "}
        <span className="text-xl lg:text-2xl font-semobold">/ {duration}</span>
      </p>

      {/* Features */}
      <div className="flex flex-col justify-between h-full relative">
        <ul
          ref={listRef}
          className={`space-y-2 mb-6 overflow-y-auto scrollbar-hide ${
            features.length > 5 ? "max-h-40 pr-2" : ""
          }`}
        >
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
              <CheckCircle2 size={18} className="text-green-600" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Scroll Button */}
        {isScrollable && (
          <button
            onClick={atBottom ? handleScrollUp : handleScrollDown}
            className="absolute right-0 bottom-14 bg-green-500 p-2 rounded-full shadow-md"
          >
            {atBottom ? (
              <ChevronUp className="text-white" size={10} />
            ) : (
              <ChevronDown className="text-white" size={10} />
            )}
          </button>
        )}

        {/* Choose Plan Button */}
        <button
          type="button"
          onClick={onSelect}
          disabled={isButtonDisabled}
          className={`px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition ${
            isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default SubscriptionCard;
