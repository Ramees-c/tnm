import React, { useState } from "react";
import Userheader from "../../../components/common/Userheader/Userheader";
import Hero from "../../../components/common/Hero/Hero";
import TutorCard from "../../../components/common/TutorCard/TutorCard";
import SubHeader from "../../../components/common/Subheader/SubHeader";
import Slider from "../../../components/common/Slider/Slider";
import CategoryCard from "../../../components/common/CategoryCard/CategoryCard";
import FeatureCard from "../../../components/common/FeatureCard/FeatureCard";
import TestimonialCard from "../../../components/common/TestimonialCard/TestimonialCard";

import testimonialImg from "../../../assets/images/testimonial-image.jpg"

import {
  FaGraduationCap,
  FaChalkboardTeacher,
  FaCertificate,
  FaUserFriends,
  FaMobileAlt,
  FaClock,
} from "react-icons/fa";
import FindTutorMenu from "../../../components/common/FindTutorMenu/FindTutorMenu";
import Footer from "../../../components/common/Footer/Footer";
import TopHeader from "../../../components/common/TopHeader/TopHeader";

function UserHome() {
  const tutors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Mathematics Professor",
      rating: 4.9,
      bio: "PhD in Applied Mathematics with 10+ years of teaching experience. Specialized in Calculus and Linear Algebra.",
      subjects: ["Calculus", "Algebra", "Statistics", "Geometry"],
      students: 1245,
      courses: 8,
      price: 45,
      image:
        "https://plus.unsplash.com/premium_photo-1688740375397-34605b6abe48?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      name: "James Wilson",
      specialization: "English Literature",
      rating: 4.7,
      bio: "MA in English Literature with expertise in creative writing and classic literature analysis.",
      subjects: ["Literature", "Creative Writing", "Grammar", "Poetry"],
      students: 892,
      courses: 5,
      price: 35,
      image:
        "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 3,
      name: "James Wilson",
      specialization: "English Literature",
      rating: 4.7,
      bio: "MA in English Literature with expertise in creative writing and classic literature analysis.",
      subjects: ["Literature", "Creative Writing", "Grammar", "Poetry"],
      students: 892,
      courses: 5,
      price: 35,
      image:
        "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 4,
      name: "James Wilson",
      specialization: "English Literature",
      rating: 4.7,
      bio: "MA in English Literature with expertise in creative writing and classic literature analysis.",
      subjects: ["Literature", "Creative Writing", "Grammar", "Poetry"],
      students: 892,
      courses: 5,
      price: 35,
      image:
        "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 5,
      name: "James Wilson",
      specialization: "English Literature",
      rating: 4.7,
      bio: "MA in English Literature with expertise in creative writing and classic literature analysis.",
      subjects: ["Literature", "Creative Writing", "Grammar", "Poetry"],
      students: 892,
      courses: 5,
      price: 35,
      image:
        "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    },
  ];

  const categories = [
    {
      id: 1,
      title: "Class 9 Tutilon",
      image:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      count: 42,
    },
    {
      id: 2,
      title: "Class 10 Tutilon",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      count: 56,
    },
    {
      id: 3,
      title: "Class 11 Tutilon",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      count: 38,
    },
    {
      id: 4,
      title: "Class 12 Tutilon",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      count: 61,
    },
    {
      id: 5,
      title: "BTech Tutilon",
      image:
        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      count: 89,
    },
    {
      id: 6,
      title: "Nursery-KG Tutilon",
      image:
        "https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      count: 27,
    },
    {
      id: 6,
      title: "Nursery-KG Tutilon",
      image:
        "https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      count: 27,
    },
    {
      id: 6,
      title: "Nursery-KG Tutilon",
      image:
        "https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      count: 27,
    },
    {
      id: 6,
      title: "Nursery-KG Tutilon",
      image:
        "https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      count: 27,
    },
  ];

  const benefits = [
    {
      icon: <FaGraduationCap className="w-8 h-8 text-blue-600" />,
      title: "Expert Instructors",
      description:
        "Learn from industry professionals with years of teaching experience",
      bgColor: "bg-blue-50",
    },
    {
      icon: <FaChalkboardTeacher className="w-8 h-8 text-purple-600" />,
      title: "Interactive Learning",
      description:
        "Engaging lessons with quizzes, assignments, and practical exercises",
      bgColor: "bg-purple-50",
    },
    {
      icon: <FaCertificate className="w-8 h-8 text-green-600" />,
      title: "Certification",
      description: "Earn recognized certificates upon course completion",
      bgColor: "bg-green-50",
    },
    {
      icon: <FaUserFriends className="w-8 h-8 text-orange-600" />,
      title: "Community Support",
      description: "Join discussions and get help from peers and instructors",
      bgColor: "bg-orange-50",
    },
    {
      icon: <FaMobileAlt className="w-8 h-8 text-red-600" />,
      title: "Mobile Friendly",
      description: "Access courses anytime, anywhere on any device",
      bgColor: "bg-red-50",
    },
    {
      icon: <FaClock className="w-8 h-8 text-indigo-600" />,
      title: "Self-Paced Learning",
      description: "Learn at your own convenience with lifetime access",
      bgColor: "bg-indigo-50",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Student, Class 12",
      text: "Tutilon completely transformed my learning experience. The interactive lessons and expert teachers helped me score 95% in my board exams! fdsgfadsgsdgsdgfsadg",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/43.jpg",
    },
    {
      id: 2,
      name: "Raj Patel",
      position: "BTech Student",
      text: "The quality of courses is exceptional. I was able to land an internship at a top tech company thanks to the skills I learned here.",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Priya Sharma",
      position: "Parent",
      text: "My child's grades improved significantly after joining Tutilon. The teachers are patient and explain concepts very clearly.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <div>
      <TopHeader />
      <Userheader />
      <Hero />

      <div className="container">
        <SubHeader
          tagline=" Meet Our Experts"
          title="Find Your Ideal Learning Partner"
          description="Connect with top-rated tutors in various subjects tailored to your learning needs"
        />
        <Slider slidesToShow={3} autoSlide={true} autoSlideInterval={5000}>
          {tutors.map((tutor) => (
            <div key={tutor.id} className="flex justify-center items-center">
              <TutorCard tutor={tutor} />
            </div>
          ))}
        </Slider>
        <SubHeader
          tagline="Lorem, ipsum dolor."
          title="Lorem ipsum dolor sit amet."
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, sunt. Doloribus quibusdam beatae vero earum?"
        />
        <div>
          <div className="mb-16">
            <h1 className="text-2xl font-medium mb-5">Tution</h1>
            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  image={category.image}
                  title={category.title}
                  count={category.count}
                />
              ))}
            </div>
          </div>
          <div className="mb-16">
            <h1 className="text-2xl font-medium mb-5">Languages</h1>
            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  image={category.image}
                  title={category.title}
                  count={category.count}
                />
              ))}
            </div>
          </div>
          <div className="mb-16">
            <h1 className="text-2xl font-medium mb-5">Hobbies</h1>
            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  image={category.image}
                  title={category.title}
                  count={category.count}
                />
              ))}
            </div>
          </div>
        </div>

        <SubHeader
          tagline="Why Choose Us"
          title="Benefits of Learning With TNM"
          description=" Discover the advantages that make our platform the best choice for your educational journey"
        />

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
          {benefits.map((item) => (
            <div>
              <FeatureCard benefits={item} />
            </div>
          ))}
        </div>

        <SubHeader
          tagline="Testimonials"
          title=" What Our Students Say"
          description="Hear from our community of learners about their experiences"
        />
        {/* Testimonial Cards - Grid Layout */}
       <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <div>
           <img src={testimonialImg} alt="" className="w-full h-auto object-cover" />
        </div>
         <div>
          

          <Slider
            slidesToShow={1}
            autoSlide={true}
            autoSlideInterval={5000}
            slideBtnHide={true}
          >
            {testimonials.map((testimonial) => (
              <div className="flex justify-center">
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              </div>
            ))}
          </Slider>
        </div>
       </div>

        <FindTutorMenu />


       
      </div>
       <Footer />
    </div>
  );
}

export default UserHome;
