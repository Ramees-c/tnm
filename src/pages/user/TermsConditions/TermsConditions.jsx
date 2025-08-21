import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

function TermsConditions() {
  const [activeSection, setActiveSection] = useState(0);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const sections = [
    {
      title: "Introduction",
      content: "Welcome to our platform. These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to be bound by these Terms and Conditions and our Privacy Policy."
    },
    {
      title: "User Accounts",
      content: "To access certain features of our platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information, including your password, and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account."
    },
    {
      title: "User Conduct",
      content: "You agree not to use the platform to: post or transmit any material that is unlawful, threatening, abusive, defamatory, invasive of privacy, vulgar, obscene, or otherwise objectionable; impersonate any person or entity; engage in spamming or other invasive advertising practices; interfere with or disrupt the platform or servers."
    },
    {
      title: "Intellectual Property",
      content: "All content on this platform, including text, graphics, logos, images, and software, is the property of our company or our content suppliers and is protected by international copyright laws. The compilation of all content on this platform is our exclusive property."
    },
    {
      title: "Payment Terms",
      content: "For services that require payment, you agree to pay all applicable fees. Payments are processed through secure third-party payment processors. We reserve the right to change our pricing at any time, but will provide notice of such changes."
    },
    {
      title: "Cancellation and Refund Policy",
      content: "You may cancel your subscription at any time. Refunds are processed according to our refund policy, which may vary based on the type of service purchased. Please contact our support team for specific refund inquiries."
    },
    {
      title: "Limitation of Liability",
      content: "To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses."
    },
    {
      title: "Privacy Policy",
      content: "Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our platform, you agree to the collection and use of information in accordance with our Privacy Policy."
    },
    {
      title: "Modifications to Terms",
      content: "We reserve the right to modify these Terms and Conditions at any time. We will provide notice of significant changes through our platform or via email. Your continued use of the platform after such modifications constitutes your acceptance of the new Terms."
    },
    {
      title: "Governing Law",
      content: "These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which our company is established, without regard to its conflict of law provisions."
    }
  ];
  return (
   <div className="container min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Terms and Conditions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <p className="text-gray-700 leading-relaxed">
            Please read these Terms and Conditions carefully before using our platform. 
            These terms outline the rules and regulations for the use of our website and services.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-4 mb-12">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
                {activeSection === index ? (
                  <FiChevronUp className="text-gray-500 text-xl" />
                ) : (
                  <FiChevronDown className="text-gray-500 text-xl" />
                )}
              </button>
              
              {activeSection === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about these Terms and Conditions, please contact us:
          </p>
          <ul className="text-gray-700 space-y-2">
            <li>Email: legal@company.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Education Street, Knowledge City, 12345</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TermsConditions;
