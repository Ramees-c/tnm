import React, { useState } from "react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { HiChevronDown } from "react-icons/hi";

function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer:
        "Enrolling is simple! Just browse our course catalog, select the course you're interested in, and click the 'Enroll Now' button. You'll be guided through a quick registration and payment process.",
    },
    {
      question: "Can I access my courses on mobile devices?",
      answer:
        "Yes, you can access all your courses on mobile, tablet, or desktop. Our platform is fully responsive and supports learning on the go with our dedicated mobile app.",
    },
    {
      question: "What benefits does online education offer?",
      answer:
        "Online education provides flexibility, accessibility, and the ability to learn at your own pace while accessing resources from anywhere in the world. It's perfect for working professionals and busy students.",
    },
    {
      question: "Are the courses self-paced or scheduled?",
      answer:
        "We offer both options! Most courses are self-paced, allowing you to learn on your schedule. Some specialized programs have scheduled live sessions for real-time interaction with instructors.",
    },
    {
      question: "Do you offer certificates upon completion?",
      answer:
        "Yes, all our courses offer certificates of completion. Many are also accredited and can be shared directly on LinkedIn to showcase your achievements.",
    },
    {
      question: "What if I need help during my course?",
      answer:
        "We provide multiple support channels including instructor messaging, community forums, and dedicated support staff to ensure you have help when you need it.",
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer:
        "We offer a 30-day money-back guarantee on all courses. If you're not satisfied with your learning experience, you can request a full refund with no questions asked.",
    },
    {
      question: "Are there any prerequisites for the courses?",
      answer:
        "Prerequisites vary by course. Beginner courses typically have no requirements, while advanced courses may recommend prior knowledge. All requirements are clearly listed on each course page.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold text-green-600 bg-green-100 rounded-full mb-4">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Find Answers to{" "}
            <span className="text-transparent bg-clip-text bg-green-600">
              Common Questions
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Quick answers to questions you may have. Can't find what you're
            looking for? Our team is ready to help you with any inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Content - Sticky on larger screens */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-center w-16 h-16 bg-white rounded-xl shadow-md mb-6">
                <HiOutlineQuestionMarkCircle className="w-8 h-8 text-teal-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Need More <br /> Assistance?
              </h3>
              <p className="text-gray-600 mb-6">
                Our support team is available 24/7 to help you with any
                questions or concerns about our courses and platform.
              </p>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center">
                Contact Support
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Right FAQs */}
          <div className="lg:col-span-8 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md ${
                  openIndex === index ? "ring-1 ring-green-400" : ""
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left text-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="pr-4">{faq.question}</span>
                  <span
                    className={`flex-shrink-0 ml-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index
                        ? "bg-green-100 text-green-600 rotate-180"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <HiChevronDown className="w-4 h-4" />
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqPage;
