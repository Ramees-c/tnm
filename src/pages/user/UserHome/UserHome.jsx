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

function UserHome() {
  const features = [
    {
      icon: <FaUserGraduate className="text-3xl" />,
      title: "Academic Excellence",
      description:
        "World-class curriculum designed by industry experts and academic professionals.",
      gradient: "from-orange-400 to-orange-600",
      delay: "100",
    },
    {
      icon: <FaLightbulb className="text-3xl" />,
      title: "Innovative Learning",
      description:
        "Cutting-edge teaching methods with interactive and engaging content.",
      gradient: "from-blue-400 to-blue-600",
      delay: "200",
    },
    {
      icon: <FaRocket className="text-3xl" />,
      title: "Smart Learning",
      description:
        "AI-powered personalized learning paths tailored to your progress.",
      gradient: "from-teal-400 to-teal-600",
      delay: "300",
    },
  ];
  // const tutors = [
  //   {
  //     id: 1,
  //     name: "Dr. Sarah Johnson",
  //     specialization: "Mathematics Professor",
  //     rating: 4.9,
  //     bio: "PhD in Applied Mathematics with 10+ years of teaching experience. Specialized in Calculus and Linear Algebra.",
  //     subjects: ["Calculus", "Algebra", "Statistics", "Geometry"],
  //     students: 1245,
  //     courses: 8,
  //     price: 45,
  //     image:
  //       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
  //   },
  //   {
  //     id: 2,
  //     name: "James Wilson",
  //     specialization: "English Literature",
  //     rating: 4.7,
  //     bio: "MA in English Literature with expertise in creative writing and classic literature analysis.",
  //     subjects: ["Literature", "Creative Writing", "Grammar", "Poetry"],
  //     students: 892,
  //     courses: 5,
  //     price: 35,
  //     image:
  //       "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTN8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
  //   },
  //   {
  //     id: 3,
  //     name: "Aisha Khan",
  //     specialization: "Physics Lecturer",
  //     rating: 4.8,
  //     bio: "MSc in Physics, specializing in Quantum Mechanics and Thermodynamics. Passionate about making physics fun and engaging.",
  //     subjects: ["Quantum Mechanics", "Thermodynamics", "Optics", "Mechanics"],
  //     students: 1023,
  //     courses: 6,
  //     price: 40,
  //     image:
  //       "https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA1fHxwcm9maWxlfGVufDB8fDB8fHww",
  //   },
  //   {
  //     id: 4,
  //     name: "Carlos Martinez",
  //     specialization: "Chemistry Expert",
  //     rating: 4.6,
  //     bio: "PhD in Organic Chemistry with 8 years of research and teaching experience.",
  //     subjects: ["Organic Chemistry", "Inorganic Chemistry", "Biochemistry"],
  //     students: 765,
  //     courses: 4,
  //     price: 38,
  //     image:
  //       "https://plus.unsplash.com/premium_photo-1690086519096-0594592709d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ5fHxwcm9maWxlfGVufDB8fDB8fHww",
  //   },
  //   {
  //     id: 5,
  //     name: "Emily Zhang",
  //     specialization: "Computer Science Instructor",
  //     rating: 4.9,
  //     bio: "BSc in Computer Science with expertise in web development, algorithms, and data structures.",
  //     subjects: [
  //       "Web Development",
  //       "JavaScript",
  //       "Algorithms",
  //       "Data Structures",
  //     ],
  //     students: 1560,
  //     courses: 9,
  //     price: 50,
  //     image:
  //       "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=600&auto=format&fit=crop&q=60",
  //   },
  //   {
  //     id: 6,
  //     name: "Liam O'Connor",
  //     specialization: "History Professor",
  //     rating: 4.5,
  //     bio: "MA in World History, specializing in medieval and modern European history.",
  //     subjects: [
  //       "Medieval History",
  //       "Modern History",
  //       "World Wars",
  //       "Ancient Civilizations",
  //     ],
  //     students: 678,
  //     courses: 3,
  //     price: 30,
  //     image:
  //       "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=600&auto=format&fit=crop&q=60",
  //   },
  //   {
  //     id: 7,
  //     name: "Sophia Roberts",
  //     specialization: "Art & Design Teacher",
  //     rating: 4.8,
  //     bio: "BA in Fine Arts with 6 years of experience in teaching painting, sketching, and digital design.",
  //     subjects: ["Painting", "Sketching", "Digital Art", "Graphic Design"],
  //     students: 934,
  //     courses: 7,
  //     price: 42,
  //     image:
  //       "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60",
  //   },
  //   {
  //     id: 8,
  //     name: "Michael Anderson",
  //     specialization: "Music Instructor",
  //     rating: 4.7,
  //     bio: "Diploma in Music Theory with 12 years of experience teaching piano and guitar.",
  //     subjects: ["Piano", "Guitar", "Music Theory", "Songwriting"],
  //     students: 512,
  //     courses: 5,
  //     price: 37,
  //     image:
  //       "https://images.unsplash.com/photo-1520975918318-3e1c9dcd99cc?w=600&auto=format&fit=crop&q=60",
  //   },
  // ];

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

  // const testimonials = [
  //   {
  //     id: 1,
  //     name: "Sarah Johnson",
  //     position: "Student, Class 12",
  //     text: "Tutilon completely transformed my learning experience. The interactive lessons and expert teachers helped me score 95% in my board exams! fdsgfadsgsdgsdgfsadg",
  //     rating: 5,
  //     avatar: "https://randomuser.me/api/portraits/women/43.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Raj Patel",
  //     position: "BTech Student",
  //     text: "The quality of courses is exceptional. I was able to land an internship at a top tech company thanks to the skills I learned here.",
  //     rating: 4,
  //     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Priya Sharma",
  //     position: "Parent",
  //     text: "My child's grades improved significantly after joining Tutilon. The teachers are patient and explain concepts very clearly.",
  //     rating: 5,
  //     avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  //   },
  // ];

  const [isLoading, setIsLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axios.get("/api/tutors_list/");
        console.log(res.data, "tutors");

        // ✅ Only keep approved tutors
        const approvedTutors = res.data.filter(
          (tutor) => tutor.is_approved === true
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
        const res = await axios.get("/api/testimonials/");
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
      {/* <TopHeader /> */}

      <div>
        <Hero />
      </div>

      <div className="container">
        <div>
          <SubHeader
            tagline=" Meet Our Experts"
            title="Find Your Ideal Learning Partner"
            description="Connect with top-rated tutors in various subjects tailored to your learning needs"
          />
          <Slider slidesToShow={3} autoSlide={true} autoSlideInterval={5000}>
            {tutors.map((tutor) => (
              <div
                key={tutor.id}
                className="flex justify-center items-center"
                data-aos="fade-up"
              >
                <TutorCard tutor={tutor} />
              </div>
            ))}
          </Slider>
          {/* <div className="text-center mt-5">
           <DefaultButton buttonText="View All Tutors" />
         </div> */}
        </div>
        <SubHeader
          tagline="Lorem, ipsum dolor."
          title="Lorem ipsum dolor sit amet."
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, sunt. Doloribus quibusdam beatae vero earum?"
        />
        <div>
          <div className="mb-16" data-aos="fade-up">
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
          <div className="mb-16" data-aos="fade-up">
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
          <div className="mb-16" data-aos="fade-up">
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

        <section
          className="relative bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-md text-white py-16 px-4 md:px-8 lg:px-12 overflow-hidden"
          data-aos="fade-up"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                {/* Heading */}
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm font-semibold uppercase tracking-wide border border-white/30">
                    <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                    Our Advantages
                  </div>

                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    Over 16 Years of Excellence in Online Education
                  </h2>

                  <p className="text-md lg:text-lg text-green-100  leading-relaxed">
                    Join thousands of successful students who have transformed
                    their careers through our innovative distance learning
                    programs.
                  </p>
                </div>

                {/* CTA Button */}
                <button className="w-full sm:w-auto bg-white text-green-600 px-6 py-2 md:px-8 md:py-4 rounded-md font-semibold hover:bg-green-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center mx-auto lg:mx-0">
                  Start Learning Today
                  <svg
                    className="ml-2 w-4 h-4 lg:w-5 lg:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </button>
              </div>

              {/* Right Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  {/* Main Image Container */}
                  <div className="relative w-full max-w-md lg:max-w-lg">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                      {/* Image */}
                      <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                        alt="Students learning online"
                        className="w-full lg:h-[450px] object-cover"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent"></div>

                      {/* Floating Elements */}
                      <div className="absolute top-6 right-6 bg-white text-green-600 px-4 py-2 rounded-full text-xs md:text-sm font-semibold shadow-lg">
                        🎓 95% Success
                      </div>
                      <div className="absolute bottom-6 left-6 bg-white text-green-600 px-4 py-2 rounded-full text-xs md:text-sm font-semibold shadow-lg">
                        ⭐ 4.9/5 Rating
                      </div>
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
                  className="group relative p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                >
                  {/* Icon Container */}
                  <div className="mb-4 p-3 bg-gradient-to-br from-white/20 to-white/10 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-green-200 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SubHeader
          tagline="Testimonials"
          title=" What Our Students Say"
          description="Hear from our community of learners about their experiences"
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
            tagline="Find Tutor"
            title="Find a Tutor for Anything!"
            description="Discover expert tutors for all subjects, languages, hobbies, and exam preparation"
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
