import React from "react";
import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaQuoteLeft,
} from "react-icons/fa";

const CEOSection = () => {
  // CEO data - you can replace this with actual data
  const ceoData = {
    name: "Sarah Johnson",
    position: "Chief Executive Officer",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    bio: "With over 15 years of experience in the education technology sector, Sarah has been instrumental in driving our company's vision to make quality education accessible to everyone. Under her leadership, we've helped over 100,000 students achieve their academic goals.",
    quote:
      "Education is not the filling of a pail, but the lighting of a fire. Our mission is to ignite that passion for learning in every student.",
    socialMedia: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
    },
  };

  return (
    <section className="py-12 px-4 bg-secondary/10 rounded-md">
      <div className="">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3">
            Leadership
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the visionary leader driving our mission to transform education
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* CEO Image */}
          <div className="w-full lg:w-2/5 max-w-md">
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={ceoData.image}
                  alt={ceoData.name}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Social Media Links */}
              <div className="flex justify-center mt-6 space-x-4">
                <a
                  href={ceoData.socialMedia.linkedin}
                  className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-lg" />
                </a>
                <a
                  href={ceoData.socialMedia.twitter}
                  className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white hover:bg-sky-600 transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-lg" />
                </a>
                <a
                  href={ceoData.socialMedia.instagram}
                  className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-white hover:bg-pink-700 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-lg" />
                </a>
              </div>
            </div>
          </div>

          {/* CEO Details */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
                {ceoData.name}
              </h3>
              <p className="text-sm md:text-lg text-secondary font-semibold mb-5">
                {ceoData.position}
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-lg">
                {ceoData.bio}
              </p>

              {/* Quote */}
              <div className="bg-secondary/10 rounded-lg p-5 border-l-4 border-secondary">
                <FaQuoteLeft className="text-secondary text-xl mb-2" />
                <p className="text-gray-800 italic text-sm md:text-lg">{ceoData.quote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOSection;