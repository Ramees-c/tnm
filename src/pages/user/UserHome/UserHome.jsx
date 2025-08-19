import React, { useState } from "react";
import Userheader from "../../../components/common/Userheader/Userheader";
import Hero from "../../../components/common/Hero/Hero";
import TutorCard from "../../../components/common/TutorCard/TutorCard";
import SubHeader from "../../../components/common/Subheader/SubHeader";
import Slider from "../../../components/common/Slider/Slider";
import CategoryCard from "../../../components/common/CategoryCard/CategoryCard";
import FeatureCard from "../../../components/common/FeatureCard/FeatureCard";
import TestimonialCard from "../../../components/common/TestimonialCard/TestimonialCard";

import testimonialImg from "../../../assets/images/testimonial-image.jpg";

import {
  FaGraduationCap,
  FaChalkboardTeacher,
  FaCertificate,
  FaUserFriends,
  FaMobileAlt,
  FaClock,
} from "react-icons/fa";
import { FaUserGraduate, FaLightbulb } from "react-icons/fa";
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
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
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
        "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTN8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 3,
      name: "Aisha Khan",
      specialization: "Physics Lecturer",
      rating: 4.8,
      bio: "MSc in Physics, specializing in Quantum Mechanics and Thermodynamics. Passionate about making physics fun and engaging.",
      subjects: ["Quantum Mechanics", "Thermodynamics", "Optics", "Mechanics"],
      students: 1023,
      courses: 6,
      price: 40,
      image:
        "https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA1fHxwcm9maWxlfGVufDB8fDB8fHww",
    },
    {
      id: 4,
      name: "Carlos Martinez",
      specialization: "Chemistry Expert",
      rating: 4.6,
      bio: "PhD in Organic Chemistry with 8 years of research and teaching experience.",
      subjects: ["Organic Chemistry", "Inorganic Chemistry", "Biochemistry"],
      students: 765,
      courses: 4,
      price: 38,
      image:
        "https://plus.unsplash.com/premium_photo-1690086519096-0594592709d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ5fHxwcm9maWxlfGVufDB8fDB8fHww",
    },
    {
      id: 5,
      name: "Emily Zhang",
      specialization: "Computer Science Instructor",
      rating: 4.9,
      bio: "BSc in Computer Science with expertise in web development, algorithms, and data structures.",
      subjects: [
        "Web Development",
        "JavaScript",
        "Algorithms",
        "Data Structures",
      ],
      students: 1560,
      courses: 9,
      price: 50,
      image:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 6,
      name: "Liam O'Connor",
      specialization: "History Professor",
      rating: 4.5,
      bio: "MA in World History, specializing in medieval and modern European history.",
      subjects: [
        "Medieval History",
        "Modern History",
        "World Wars",
        "Ancient Civilizations",
      ],
      students: 678,
      courses: 3,
      price: 30,
      image:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 7,
      name: "Sophia Roberts",
      specialization: "Art & Design Teacher",
      rating: 4.8,
      bio: "BA in Fine Arts with 6 years of experience in teaching painting, sketching, and digital design.",
      subjects: ["Painting", "Sketching", "Digital Art", "Graphic Design"],
      students: 934,
      courses: 7,
      price: 42,
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 8,
      name: "Michael Anderson",
      specialization: "Music Instructor",
      rating: 4.7,
      bio: "Diploma in Music Theory with 12 years of experience teaching piano and guitar.",
      subjects: ["Piano", "Guitar", "Music Theory", "Songwriting"],
      students: 512,
      courses: 5,
      price: 37,
      image:
        "https://images.unsplash.com/photo-1520975918318-3e1c9dcd99cc?w=600&auto=format&fit=crop&q=60",
    },
  ];

  const categories = [
    {
      id: 1,
      title: "Class 9 Tutilon",
      image:
        "https://plus.unsplash.com/premium_photo-1681248156502-745ab87474d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNsYXNzJTIwdHR1dGlvbnxlbnwwfHwwfHx8MA%3D%3D",
      count: 42,
    },
    {
      id: 2,
      title: "Class 10 Tutilon",
      image:
        "https://images.unsplash.com/photo-1636772523547-5577d04e8dc1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNsYXNzJTIwdHR1dGlvbnxlbnwwfHwwfHx8MA%3D%3D",
      count: 56,
    },
    {
      id: 3,
      title: "Class 11 Tutilon",
      image:
        "https://plus.unsplash.com/premium_photo-1681297117877-00d5ee51c156?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGNsYXNzJTIwdHR1dGlvbnxlbnwwfHwwfHx8MA%3D%3D",
      count: 38,
    },
    {
      id: 4,
      title: "Class 12 Tutilon",
      image:
        "https://images.unsplash.com/photo-1563394867331-e687a36112fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGNsYXNzJTIwdHR1dGlvbnxlbnwwfHwwfHx8MA%3D%3D",
      count: 61,
    },
    {
      id: 5,
      title: "BTech Tutilon",
      image:
        "https://plus.unsplash.com/premium_photo-1705267936187-aceda1a6c1a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fGNsYXNzJTIwdHR1dGlvbnxlbnwwfHwwfHx8MA%3D%3D",
      count: 89,
    },
    {
      id: 6,
      title: "Nursery-KG Tutilon",
      image:
        "https://media.istockphoto.com/id/1351409521/photo/teacher-assisting-student-in-classroom.webp?a=1&b=1&s=612x612&w=0&k=20&c=JXQ549mC3P035drHR-U1omX78GNtw_qkyDLwBz86o08=",
      count: 27,
    },
  ];

  const languages = [
    {
      id: 1,
      title: "IELTS Coaching",
      image:
        "https://images.unsplash.com/photo-1660927059794-152d06e11016?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aWVsdHN8ZW58MHx8MHx8fDA%3D",
      count: 78,
    },
    {
      id: 2,
      title: "Spoken English",
      image:
        "https://plus.unsplash.com/premium_photo-1682088176629-0f48d58a614c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3Bva2VuJTIwRW5nbGlzaHxlbnwwfHwwfHx8MA%3D%3D",
      count: 112,
    },
    {
      id: 3,
      title: "Business English",
      image:
        "https://plus.unsplash.com/premium_photo-1661382100492-91afa67e11c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QnVzaW5lc3MlMjBFbmdsaXNofGVufDB8fDB8fHww",
      count: 65,
    },
    {
      id: 4,
      title: "English for Kids",
      image:
        "https://media.istockphoto.com/id/171346513/photo/learn-word.webp?a=1&b=1&s=612x612&w=0&k=20&c=3kNyy40mN06SpLjoDyn4Q7KZcoxtFlMpVJpmpi3DzZg=",
      count: 89,
    },
    {
      id: 5,
      title: "Hindi Language",
      image:
        "https://media.istockphoto.com/id/1344732501/photo/teacher-teaching-and-writing-on-board.webp?a=1&b=1&s=612x612&w=0&k=20&c=Kr7GB7fr6eocZbGr3KOOm7hWrL4QxkWzWt5jPpzLHgQ=",
      count: 54,
    },
    {
      id: 6,
      title: "German Language",
      image:
        "https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2VybWFuJTIwbGFuZ3VhZ2V8ZW58MHx8MHx8fDA%3D",
      count: 93,
    },
  ];

  const hobbies = [
    {
      id: 1,
      title: "Photography",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D",
      count: 124,
    },
    {
      id: 2,
      title: "Painting",
      image:
        "https://images.unsplash.com/photo-1579965342575-16428a7c8881?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFpbnRpbmd8ZW58MHx8MHx8fDA%3D",
      count: 87,
    },
    {
      id: 3,
      title: "Gardening",
      image:
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FyZGVuaW5nfGVufDB8fDB8fHww",
      count: 92,
    },
    {
      id: 4,
      title: "Cooking",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29va2luZ3xlbnwwfHwwfHx8MA%3D%3D",
      count: 156,
    },
    {
      id: 5,
      title: "Music",
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
      count: 203,
    },
    {
      id: 6,
      title: "Yoga",
      image:
        "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9nYXxlbnwwfHwwfHx8MA%3D%3D",
      count: 118,
    },
    {
      id: 7,
      title: "Reading",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
      count: 145,
    },
    {
      id: 8,
      title: "Cycling",
      image:
        "https://media.istockphoto.com/id/179251545/photo/pretty-woman-riding-a-bicycle.webp?a=1&b=1&s=612x612&w=0&k=20&c=lZUe6C8E3Ko-tC6Cv9d3-8xU6wRBrEnRhM3wwEFv4As=",
      count: 76,
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
      {/* <TopHeader /> */}
      <Userheader />
      <Hero />

      <div className="container">
        <div>
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
        </div>
        <SubHeader
          tagline="Lorem, ipsum dolor."
          title="Lorem ipsum dolor sit amet."
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, sunt. Doloribus quibusdam beatae vero earum?"
        />
        <div>
          <div className="mb-16">
            <h1 className="text-2xl font-medium mb-5">Tution</h1>
            {/* Grid (large screens only) */}
            <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  image={category.image}
                  title={category.title}
                  count={category.count}
                />
              ))}
            </div>

            {/* Horizontal scroll (mobile + tablet) */}
            <div className="lg:hidden flex overflow-x-auto pb-2 space-x-2 px-2 scroll-smooth scrollbar-hide">
              {categories.map((category) => (
                <div key={category.id} className="flex-shrink-0">
                  <CategoryCard
                    image={category.image}
                    title={category.title}
                    count={category.count}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mb-16">
            <h1 className="text-2xl font-medium mb-5">Languages</h1>
            {/* Grid (large screens only) */}
            <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
              {languages.map((language) => (
                <CategoryCard
                  key={language.id}
                  image={language.image}
                  title={language.title}
                  count={language.count}
                />
              ))}
            </div>

            {/* Horizontal scroll (mobile + tablet) */}
            <div className="lg:hidden flex overflow-x-auto pb-2 space-x-2 px-2 scroll-smooth scrollbar-hide">
              {languages.map((language) => (
                <div key={language.id} className="flex-shrink-0">
                  <CategoryCard
                    image={language.image}
                    title={language.title}
                    count={language.count}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mb-16">
            <h1 className="text-2xl font-medium mb-5">Hobbies</h1>
            {/* Grid (large screens only) */}
            <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
              {hobbies.map((hobbie) => (
                <CategoryCard
                  key={hobbie.id}
                  image={hobbie.image}
                  title={hobbie.title}
                  count={hobbie.count}
                />
              ))}
            </div>

            {/* Horizontal scroll (mobile + tablet) */}
            <div className="lg:hidden flex overflow-x-auto pb-2 space-x-2 px-2 scroll-smooth scrollbar-hide">
              {hobbies.map((hobbie) => (
                <div key={hobbie.id} className="flex-shrink-0">
                  <CategoryCard
                    image={hobbie.image}
                    title={hobbie.title}
                    count={hobbie.count}
                  />
                </div>
              ))}
            </div>
          </div>
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

        <section className="bg-green-400 text-white py-12 px-4 md:px-12 rounded-md">
          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Heading */}
              <div>
                <span className="text-sm font-semibold text-white uppercase tracking-wide border px-3 py-1 rounded">
                  Our Advantages
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
                  Over 16 years in distant <br /> learning for skills
                </h2>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Card 1 */}
                <div className="bg-orange-400 text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <FaUserGraduate className="text-4xl mb-4" />
                  <h3 className="text-xl font-semibold">Academic Excellence</h3>
                  <p className="text-base mt-3 leading-relaxed">
                    Absolute required of reserved in offering no. How sense
                    found our those gay again.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-sky-400 text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <FaLightbulb className="text-4xl mb-4" />
                  <h3 className="text-xl font-semibold">Innovative Learning</h3>
                  <p className="text-base mt-3 leading-relaxed">
                    Absolute required of reserved in offering no. How sense
                    found our those gay again.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-teal-500 text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <FaLightbulb className="text-4xl mb-4" />
                  <h3 className="text-xl font-semibold">Smart Learning</h3>
                  <p className="text-base mt-3 leading-relaxed">
                    Absolute required of reserved in offering no. How sense
                    found our those gay again.
                  </p>
                </div>
                <div className="bg-purple-500 text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <FaLightbulb className="text-4xl mb-4" />
                  <h3 className="text-xl font-semibold">Smart Learning</h3>
                  <p className="text-base mt-3 leading-relaxed">
                    Absolute required of reserved in offering no. How sense
                    found our those gay again.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <img
                src="data:image/jpeg;base64,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"
                alt="Student"
                className="rounded-lg shadow-lg object-cover w-2/3 hidden xl:block"
              />
            </div>
          </div>
        </section>

        <SubHeader
          tagline="Testimonials"
          title=" What Our Students Say"
          description="Hear from our community of learners about their experiences"
        />
        {/* Testimonial Cards - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5">
          <div>
            <img
              src={testimonialImg}
              alt=""
              className="w-full h-auto object-cover"
            />
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
