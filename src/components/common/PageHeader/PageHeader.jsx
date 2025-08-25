import React from "react";

const PageHeader = ({ title, headerBg }) => {
  return (
    <header className="relative w-full h-52 md:h-80 lg:h-96">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${headerBg})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Text Content */}
      <div className="relative flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white" data-aos="zoom-in">
          {title}
        </h1>
      </div>
    </header>
  );
};

export default PageHeader;
