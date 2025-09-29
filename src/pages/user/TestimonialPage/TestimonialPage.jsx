import React, { useEffect, useState } from "react";
import axios from "axios";
import TestimonialCard from "../../../components/common/TestimonialCard/TestimonialCard";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import Loading from "../../../components/common/Loading/Loading";

function TestimonialPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("/api/testimonials/");
        setTestimonials(res.data); // assuming res.data is an array
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  console.log(testimonials);
  

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Testimonials"
        headerBg="https://images.unsplash.com/photo-1417733403748-83bbc7c05140?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHJldmlld3xlbnwwfHwwfHx8MA%3D%3D"
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
