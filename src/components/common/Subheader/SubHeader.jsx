function SubHeader({ title, description, tagline }) {
  return (
    <div className="container mx-auto py-10 sm:py-20">
      {/* Main Title Area */}
      <div className="text-center">
        <span className="inline-block bg-primary/10 text-primary text-xs md:text-sm font-medium px-4 py-1 rounded-full mb-4">
          {tagline}
        </span>
        <h1 className="text-lg md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
          {title}
        </h1>
        <p className="text-xs md:text-base text-gray-600 max-w-2xl mx-auto leading-tight">
          {description}
        </p>
      </div>
    </div>
  );
}

export default SubHeader;
