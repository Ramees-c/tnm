import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import DefaultButton from "../../common/DefaultButton/DefaultButton";

function SubscriptionCard({ title, price, features, onSelect, duration }) {
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

  return (
    <div className="flex flex-col rounded-md shadow-lg p-6 border relative">
      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>

      {/* Price */}
      <p className="text-3xl font-extrabold text-gray-900 mb-4">
        ₹{price}{" "}
        <span className="text-base font-medium text-gray-600">/{duration}</span>
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
            <li key={index} className="flex items-center gap-2 text-gray-700">
              <CheckCircle2 size={18} className="text-green-600" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Single Scroll Button */}
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
        <DefaultButton
          buttonText="Choose Plan"
          onClick={onSelect}
          buttonFullwidth={true}
        />
      </div>
    </div>
  );
}

export default SubscriptionCard;
