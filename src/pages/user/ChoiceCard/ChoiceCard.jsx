function ChoiceCard({
  image,
  title,
  description,
  buttonText,
  buttonColor,
  cardColor,
  icon,
}) {
  return (
    <div
      className={`w-full max-w-md bg-gradient-to-b ${cardColor} rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100`}
    >
      <div className="p-8 flex flex-col items-center text-center">
        {/* Icon */}
        {icon}

        {/* Image */}
        <div className="mb-6 w-24 h-24 rounded-full bg-white p-4 shadow-md flex items-center justify-center">
          <img src={image} alt={title} className="w-16 h-16 object-contain" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

        {/* Button */}
        <button
          className={`${buttonColor} text-white font-medium py-3 px-6 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ChoiceCard;
