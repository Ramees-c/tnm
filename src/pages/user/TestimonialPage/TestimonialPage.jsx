import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import TestimonialCard from "../../../components/common/TestimonialCard/TestimonialCard";
import PageHeader from "../../../components/common/PageHeader/PageHeader";

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

function TestimonialPage() {
  return (
    <div>
        <PageHeader
        title="Testimonials"
        headerBg="https://plus.unsplash.com/premium_photo-1681842143575-03bf1be4c11c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
      />
      <div className="container py-16" data-aos="fade-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestimonialPage;
