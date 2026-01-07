import React, { useEffect, useState, lazy, Suspense } from "react";
import Hero from "../../../components/common/Hero/Hero";
import TutorCard from "../../../components/common/TutorCard/TutorCard";
import SubHeader from "../../../components/common/Subheader/SubHeader";
import TestimonialCard from "../../../components/common/TestimonialCard/TestimonialCard";

import testimonialImg from "../../../assets/images/testimonial-image.jpg";
import advantageImg from "../../../assets/images/advantage2.jpg";

import { FaRocket } from "react-icons/fa";

import { FaUserGraduate, FaLightbulb } from "react-icons/fa";
import DefaultButton from "../../../components/common/DefaultButton/DefaultButton";
import Loading from "../../../components/common/Loading/Loading";
import axios from "axios";
import API_BASE from "../../../API/API";
import { Link } from "react-router-dom";

const Slider = lazy(() => import("../../../components/common/Slider/Slider"));
const CategoryCarousel = lazy(() =>
  import("../../../components/common/CategoryCarousel/CategoryCarousel")
);
const CategoryCard = lazy(() =>
  import("../../../components/common/CategoryCard/CategoryCard")
);
const FindTutorMenu = lazy(() =>
  import("../../../components/common/FindTutorMenu/FindTutorMenu")
);

function UserHome() {
  const features = [
    {
      icon: <FaUserGraduate className="text-3xl" />,
      title: "Expert Tutors",
      description:
        "Qualified and experienced tutors providing focused support in every subject.",
      gradient: "from-orange-400 to-orange-600",
      delay: "100",
    },
    {
      icon: <FaLightbulb className="text-3xl" />,
      title: "Personalized Learning",
      description:
        "Tailored lessons and guidance designed to match each student’s pace and learning style.",
      gradient: "from-blue-400 to-blue-600",
      delay: "200",
    },
    {
      icon: <FaRocket className="text-3xl" />,
      title: "Convenient & Flexible",
      description:
        "Easily connect with tutors and schedule sessions according to your needs.",
      gradient: "from-teal-400 to-teal-600",
      delay: "300",
    },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

 

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const res = await axios.get(`${API_BASE}/category-filter/`);

  //       // Filter: only top-level categories that have at least one subcategory with add_to_homepage true
  //       const filteredCategories = res.data
  //         .map((mainCat) => {
  //           // Collect all nested subcategories (recursively)
  //           const collectHomeSubcategories = (subs) => {
  //             return subs.flatMap((sub) => {
  //               if (sub.add_to_homepage) return [sub];
  //               if (sub.subcategories?.length)
  //                 return collectHomeSubcategories(sub.subcategories);
  //               return [];
  //             });
  //           };

  //           const homeSubcats = collectHomeSubcategories(
  //             mainCat.subcategories || []
  //           );

  //           if (homeSubcats.length > 0) {
  //             return {
  //               id: mainCat.id,
  //               name: mainCat.name,
  //               subcategories: homeSubcats,
  //             };
  //           }
  //           return null;
  //         })
  //         .filter(Boolean);

  //       setCategoriesData(filteredCategories);
  //     } catch (err) {
  //       console.error("Error fetching categories");
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  // useEffect(() => {
  //   const fetchTutors = async () => {
  //     try {
  //       const res = await axios.get(`${API_BASE}/home-tutors/`);

  //       setTutors(res.data);
  //     } catch (error) {
  //       console.log("Error fetching tutors");
  //     }
  //   };

  //   fetchTutors();
  // }, []);

  // useEffect(() => {
  //   const fetchTestimonials = async () => {
  //     try {
  //       const res = await axios.get(`${API_BASE}/testimonials/`);
  //       // Filter only those to show on homepage
  //       const homepageTestimonials = res.data.filter(
  //         (testimonial) => testimonial.add_to_homepage === true
  //       );
  //       setTestimonials(homepageTestimonials);
  //     } catch (err) {
  //       console.error("Failed to fetch testimonials");
  //       setError("Failed to load testimonials");
  //     }
  //   };

  //   fetchTestimonials();
  // }, []);

  useEffect(() => {
    let mounted = true;

    const fetchHomeData = async () => {
      try {
        const [categoriesRes, tutorsRes, testimonialsRes] = await Promise.all([
          axios.get(`${API_BASE}/category-filter/`),
          axios.get(`${API_BASE}/home-tutors/`),
          axios.get(`${API_BASE}/testimonials/`),
        ]);

        if (!mounted) return;

        const filteredCategories = categoriesRes.data
          .map((mainCat) => {
            const collectHomeSubcategories = (subs) =>
              subs.flatMap((sub) =>
                sub.add_to_homepage
                  ? [sub]
                  : sub.subcategories?.length
                  ? collectHomeSubcategories(sub.subcategories)
                  : []
              );

            const homeSubcats = collectHomeSubcategories(
              mainCat.subcategories || []
            );

            return homeSubcats.length
              ? {
                  id: mainCat.id,
                  name: mainCat.name,
                  subcategories: homeSubcats,
                }
              : null;
          })
          .filter(Boolean);

        setCategoriesData(filteredCategories);
        setTutors(tutorsRes.data);
        setTestimonials(testimonialsRes.data.filter((t) => t.add_to_homepage));
      } catch (err) {
        console.error("Home data fetch error");
      }finally {
      if (mounted) setIsLoading(false); 
    }
    };

    fetchHomeData();
    return () => (mounted = false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-hidden scrollbar-hide">
      <div>
        <Hero />
      </div>

      <div className="container">
        <div>
          <SubHeader
            tagline="popular tutors"
            title="Connect with the perfect tutor to guide your learning journey"
            description="Connect with top-rated tutors selected for your learning needs."
          />
          <Slider slidesToShow={4} autoSlide={true} autoSlideInterval={5000}>
            {tutors.map((tutor, index) => (
              <div
                key={tutor.id}
                className="flex justify-center items-center"
                data-aos="fade-up"
              >
                <TutorCard tutor={tutor} />
              </div>
            ))}
          </Slider>
          <div className="text-center mt-5">
            <Link to={"/all-tutors"}>
              <DefaultButton buttonText="View All Tutors" buttonMedium={true} />
            </Link>
          </div>
        </div>
        <SubHeader
          tagline="top categories"
          title="Explore our most popular learning categories"
          description="Explore our curated categories and find the perfect courses for your learning journey."
        />
        <div className="mb-24">
          {categoriesData.map((mainCat) => {
            // Collect all nested subcategories that have add_to_homepage = true
            const homepageSubs = mainCat.subcategories.flatMap((sub1) =>
              sub1.subcategories.filter((sub2) => sub2.add_to_homepage)
            );

            // Skip this main category if no subcategories are eligible
            if (homepageSubs.length === 0) return null;

            return (
              <div key={mainCat.id} className="mb-10" data-aos="fade-up">
                {/* Dynamic heading from API */}
                <h1 className="text-xl sm:text-2xl font-medium mb-3">
                  {mainCat.name}
                </h1>

                <CategoryCarousel>
                  {homepageSubs.map((sub) => (
                    <div key={sub.id} className="flex-shrink-0">
                      <CategoryCard image={sub.img} title={sub.name} />
                    </div>
                  ))}
                </CategoryCarousel>
              </div>
            );
          })}
        </div>

        <section
          className="relative bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-md text-white py-16 px-4 md:px-8 lg:px-12 overflow-hidden"
          data-aos="fade-up"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                {/* Heading */}
                <div className="space-y-3 sm:space-y-6">
                  <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-md text-xs md:text-sm font-semibold uppercase tracking-wide border border-white/30">
                    <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                    Our Advantages
                  </div>

                  <h2 className="text-2xl md:text-4xl xl:text-5xl font-bold leading-tight">
                    Connecting Students with Expert Tutors
                  </h2>

                  <p className="text-xs sm:text-lg text-green-100 leading-normal">
                    Join thousands of learners who have improved their skills
                    and achieved their academic goals through personalized tutor
                    guidance.
                  </p>
                </div>
              </div>

              {/* Right Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  {/* Main Image Container */}
                  <div className="relative w-full max-w-md lg:max-w-lg">
                    <div className="relative rounded-md overflow-hidden shadow-2xl">
                      {/* Image */}
                      <img
                        src={advantageImg}
                        loading="lazy"
                        decoding="async"
                        alt="Students learning online"
                        className="w-full object-cover"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Cards Grid */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-2 sm:p-5 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                >
                  {/* Icon Container */}
                  <div className="mb-4 p-3 bg-gradient-to-br from-white/20 to-white/10 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white group-hover:text-green-200 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial section */}
        <SubHeader
          tagline="Testimonials"
          title="Feedback from Students, Parents & Tutors"
          description="Discover how students, parents, and tutors have benefited from our personalized tutoring system and achieved meaningful academic growth."
        />
        {/* Testimonial Cards - Grid Layout */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 items-center gap-8"
          data-aos="fade-up"
        >
          {/* Left Image */}
          <div>
            <img
              src={testimonialImg}
              loading="lazy"
              decoding="async"
              alt="testimonial"
              className="w-full h-auto object-cover rounded-md"
            />
          </div>

          {/* Right Slider */}
          <div
            className="flex items-center justify-center relative transition-all duration-500 ease-in-out"
            style={{ overflow: "visible" }}
          >
            <Slider
              slidesToShow={1}
              autoSlide={true}
              autoSlideInterval={5000}
              slideBtnHide={true}
              forceSingleSlideBelow1024={true}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex justify-center items-center !h-auto"
                  style={{
                    alignSelf: "center",
                    transition: "transform 0.4s ease, height 0.4s ease",
                  }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Find Tutor menu */}
        <div>
          <SubHeader
            tagline="Find a Tutor"
            title="Connect with Expert Tutors for Every Learning Need"
            description="Explore qualified tutors who provide personalized guidance tailored to your goals."
          />

          <div data-aos="fade-up">
            <FindTutorMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
