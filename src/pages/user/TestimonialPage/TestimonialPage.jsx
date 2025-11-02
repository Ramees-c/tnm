import React, { useEffect, useState } from "react";
import axios from "axios";
import TestimonialCard from "../../../components/common/TestimonialCard/TestimonialCard";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import Loading from "../../../components/common/Loading/Loading";
import API_BASE from "../../../API/API";

import pageBanner from "../../../assets/images/page_banner/testimonial.jpg";

function TestimonialPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(`${API_BASE}/testimonials/`);
        setTestimonials(res.data); // assuming res.data is an array
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
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

  return (
    <div>
      <PageHeader title="Testimonials" headerBg={pageBanner} />
      <div className="container py-16" data-aos="fade-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestimonialPage;
