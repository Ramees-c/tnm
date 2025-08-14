function SubHeader({ title, description, tagline }) {
  return (
    <div className="container mx-auto py-20">
      {/* Main Title Area */}
      <div className="text-center">
        <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1 rounded-full mb-4">
         {tagline}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}

export default SubHeader;
