function ChoiceCard({
  image,
  title,
  description,
  buttonText,
  buttonColor,
  cardColor,
  icon,
  onRegisterClick,
}) {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div
      className={`w-full max-w-md bg-gradient-to-b ${cardColor} rounded-md overflow-hidden shadow-sm`}
    >
      <div className="p-6 flex flex-col items-center text-center">
        {/* Icon */}
        {icon}

        {/* Image */}
        <div className="mb-4 w-20 h-20 rounded-full bg-white p-4 shadow-md flex items-center justify-center">
          <img src={image} alt={title} className="w-12 h-12 object-contain" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>

        {/* Description */}
        <p className="text-gray-600 mb-6  text-sm">{description}</p>

        {/* Button */}
        <button
          className={`${buttonColor} text-white font-medium py-2 px-4 rounded-md transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg text-sm`}
          onClick={() => {
            onRegisterClick();
            handleClick();
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ChoiceCard;
