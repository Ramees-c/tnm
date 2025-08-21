import React, { useState } from "react";

function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer:
        "New had happen unable uneasy. Drawings can followed improved out sociable not. Earnestly so do instantly pretended. See general few civilly amiable pleased account carried. Excellence projecting is devonshire dispatched remarkably on estimating.",
    },
    {
      question: "Can I access my courses on mobile devices?",
      answer:
        "Yes, you can access all your courses on mobile, tablet, or desktop. Our platform is fully responsive and supports learning on the go.",
    },
    {
      question: "What benefits does online education offer?",
      answer:
        "Online education provides flexibility, accessibility, and the ability to learn at your own pace while accessing resources from anywhere in the world.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Content */}
        <div>
          <span className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
            Frequently Asked Question
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">
            General Asked <br /> Questions
          </h2>
          <p className="text-gray-600 mb-6">
            Quick answers to questions you may have. Can't find what you're
            looking for? Get in touch with us.
          </p>
          <button className="px-6 py-3 bg-teal-500 text-white rounded-full font-medium shadow-md hover:bg-teal-600 transition">
            Contact Us
          </button>
        </div>

        {/* Right FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left text-lg font-medium text-gray-900 hover:bg-gray-50"
              >
                {faq.question}
                <span className="ml-2 text-teal-500 text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqPage;
