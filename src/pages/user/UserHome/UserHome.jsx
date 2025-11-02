import React, { useEffect, useState } from "react";
import Userheader from "../../../components/common/Userheader/Userheader";
import Hero from "../../../components/common/Hero/Hero";
import TutorCard from "../../../components/common/TutorCard/TutorCard";
import SubHeader from "../../../components/common/Subheader/SubHeader";
import Slider from "../../../components/common/Slider/Slider";
import CategoryCard from "../../../components/common/CategoryCard/CategoryCard";
import FeatureCard from "../../../components/common/FeatureCard/FeatureCard";
import TestimonialCard from "../../../components/common/TestimonialCard/TestimonialCard";

import testimonialImg from "../../../assets/images/testimonial-image.jpg";
import advantageImg from "../../../assets/images/advantage2.jpg";

import {
  FaGraduationCap,
  FaChalkboardTeacher,
  FaCertificate,
  FaUserFriends,
  FaMobileAlt,
  FaClock,
  FaRocket,
  FaAward,
  FaChartLine,
} from "react-icons/fa";

// import { FaUserGraduate, FaLightbulb, FaRocket, FaAward, FaChartLine } from "react-icons/fa";

import { FaUserGraduate, FaLightbulb } from "react-icons/fa";
import FindTutorMenu from "../../../components/common/FindTutorMenu/FindTutorMenu";
import Footer from "../../../components/common/Footer/Footer";
import TopHeader from "../../../components/common/TopHeader/TopHeader";
import DefaultButton from "../../../components/common/DefaultButton/DefaultButton";
import Loading from "../../../components/common/Loading/Loading";
import axios from "axios";
import API_BASE from "../../../API/API";
import { Link } from "react-router-dom";
import CategoryCarousel from "../../../components/common/CategoryCarousel/CategoryCarousel";

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

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE}/category-filter/`);
        console.log("Category API:", res.data);

        // Filter: only top-level categories that have at least one subcategory with add_to_homepage true
        const filteredCategories = res.data
          .map((mainCat) => {
            // Collect all nested subcategories (recursively)
            const collectHomeSubcategories = (subs) => {
              return subs.flatMap((sub) => {
                if (sub.add_to_homepage) return [sub];
                if (sub.subcategories?.length)
                  return collectHomeSubcategories(sub.subcategories);
                return [];
              });
            };

            const homeSubcats = collectHomeSubcategories(
              mainCat.subcategories || []
            );

            if (homeSubcats.length > 0) {
              return {
                id: mainCat.id,
                name: mainCat.name,
                subcategories: homeSubcats,
              };
            }
            return null;
          })
          .filter(Boolean);

        setCategoriesData(filteredCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axios.get(`${API_BASE}/tutors_list/`);
        console.log(res.data, "tutors");

        // Only keep approved tutors and addd to home true
        const approvedTutors = res.data.filter(
          (tutor) =>
            tutor.is_approved === true &&
            tutor.add_to_home === true &&
            tutor.active_inactive === true &&
            (tutor.is_paid === true ||
              (Array.isArray(tutor.assigned_students) &&
                tutor.assigned_students.length > 0))
        );

        setTutors(approvedTutors);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTutors();
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(`${API_BASE}/testimonials/`);
        // Filter only those to show on homepage
        const homepageTestimonials = res.data.filter(
          (testimonial) => testimonial.add_to_homepage === true
        );
        setTestimonials(homepageTestimonials);
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
        setError("Failed to load testimonials");
      }
    };

    fetchTestimonials();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
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
                key={index}
                className="flex justify-center items-center"
                data-aos="fade-up"
              >
                <TutorCard tutor={tutor} />
              </div>
            ))}
          </Slider>
          <div className="text-center mt-5">
            <Link to={"/all-tutors"}>
              <DefaultButton buttonText="View All Tutors" />
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

        {/* <div className="">
          <SubHeader
            tagline="Why Choose Us"
            title="Benefits of Learning With TNM"
            description=" Discover the advantages that make our platform the best choice for your educational journey"
          />

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
            {benefits.map((item) => (
              <div>
                <FeatureCard benefits={item} />
              </div>
            ))}
          </div>
        </div> */}

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

        <SubHeader
          tagline="Testimonials"
          title="Feedback from Our Students & Parents"
          description="Discover how students and parents have benefited from personalized tutoring and achieved their academic goals."
        />
        {/* Testimonial Cards - Grid Layout */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 items-center gap-5"
          data-aos="fade-up"
        >
          <div>
            <img
              src={testimonialImg}
              alt=""
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
          <div>
            <Slider
              slidesToShow={1}
              autoSlide={true}
              autoSlideInterval={5000}
              slideBtnHide={true}
              forceSingleSlideBelow1024={true}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex justify-center">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </Slider>
          </div>
        </div>

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
