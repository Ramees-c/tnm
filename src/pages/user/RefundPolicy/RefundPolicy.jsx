import React, { useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiDollarSign,
  FiMail,
  FiPhone,
} from "react-icons/fi";

const RefundPolicy = () => {
  const [activeSection, setActiveSection] = useState(0);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const policySections = [
    {
      title: "Refund Eligibility",
      content:
        "To be eligible for a refund, you must request it within 14 days of your purchase. The service must not have been substantially used or consumed. Refunds are not available for services that have been completed or partially used beyond a 50% threshold.",
    },
    {
      title: "Non-Refundable Services",
      content:
        "The following services are non-refundable once initiated or completed: 1) Completed tutoring sessions, 2) Downloadable educational materials, 3) Membership fees after the first 7 days, 4) Customized learning plans that have been delivered, and 5) Any service marked as 'non-refundable' at the time of purchase.",
    },
    {
      title: "Refund Process",
      content:
        "To request a refund, please contact our support team with your order details. Refund requests are processed within 5-7 business days. Approved refunds will be credited to your original payment method. Processing times may vary depending on your financial institution.",
    },
    {
      title: "Partial Refunds",
      content:
        "Partial refunds may be granted in certain circumstances: 1) If technical issues prevented full access to services, 2) If the service did not meet the described quality, 3) For subscription services, refunds will be prorated based on unused time.",
    },
    {
      title: "Subscription Cancellations",
      content:
        "You may cancel your subscription at any time. Cancellation will prevent future charges but does not qualify for refunds of already paid periods unless requested within the first 7 days of a new subscription term.",
    },
    {
      title: "Exceptions",
      content:
        "Exceptions to this policy may be made on a case-by-case basis for exceptional circumstances such as medical emergencies or other serious situations. Documentation may be required for exception requests.",
    },
    {
      title: "Refund Denials",
      content:
        "Refunds may be denied if: 1) The refund request falls outside the eligibility period, 2) The service has been substantially used, 3) There's evidence of policy abuse, 4) Previous refunds have been granted for the same account within a 6-month period.",
    },
  ];

  const refundTimeline = [
    {
      time: "Within 24 hours",
      description: "Refund request received and acknowledged",
    },
    { time: "1-2 business days", description: "Request reviewed by our team" },
    { time: "3-5 business days", description: "Refund processed if approved" },
    {
      time: "5-10 business days",
      description: "Amount appears in your account (varies by bank)",
    },
  ];

  return (
    <div className="container min-h-screen py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Refund Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FiDollarSign className="text-blue-600 text-xl" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Our Refund Commitment
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            We strive to ensure complete satisfaction with our educational
            services. This policy outlines the terms and conditions for refund
            requests to ensure transparency and fairness for both our customers
            and our organization.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Policy Details
          </h2>

          {policySections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {section.title}
                </h3>
                {activeSection === index ? (
                  <FiChevronUp className="text-gray-500 text-xl" />
                ) : (
                  <FiChevronDown className="text-gray-500 text-xl" />
                )}
              </button>

              {activeSection === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Refund Timeline */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FiClock className="text-green-600 text-xl" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Refund Processing Timeline
            </h2>
          </div>

          <div className="space-y-6">
            {refundTimeline.map((item, index) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{item.time}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-secondary/30 border border-primary rounded-xl p-6 mb-12">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Important Notes
          </h2>
          <ul className="text-primary space-y-2">
            <li className="flex items-start">
              <span className="text-primary mr-2 font-bold">•</span>
              <span>
                All refund requests must be submitted in writing to
                support@company.com
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2 font-bold">•</span>
              <span>
                Include your order number and reason for refund request
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2 font-bold">•</span>
              <span>
                Refunds may take up to 10 business days to appear in your
                account
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2 font-bold">•</span>
              <span>
                Company credit or vouchers may be offered instead of cash
                refunds in some cases
              </span>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Need Help With a Refund?
          </h2>
          <p className="text-gray-700 mb-6">
            Our support team is here to assist you with any refund-related
            questions or requests.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FiMail className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Email Us</h3>
                <p className="text-gray-600">support@company.com</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FiPhone className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Call Us</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-blue-200">
            <p className="text-sm text-gray-600">
              <strong>Hours:</strong> Monday-Friday, 9AM-6PM EST
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
