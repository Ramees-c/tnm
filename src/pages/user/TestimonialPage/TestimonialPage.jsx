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
        const sortedRes = res.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setTestimonials(sortedRes);
      } catch (err) {
        console.error("Failed to fetch testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

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
        {/* FIX: Added items-start so cards don't stretch equally */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 items-start">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestimonialPage;
