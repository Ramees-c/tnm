import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../../../API/API";

function TermsConditions() {
  const [terms, setTerms] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get(`${API_BASE}/static-pages/`);

        // ✅ Filter only the page where page_type is "terms"
        const termsPage = response.data.find(
          (page) => page.page_type === "terms"
        );

        setTerms(termsPage || null);
      } catch (error) {
        console.error("Error fetching terms and conditions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  return (
    <div className="container min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* ✅ Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Last Updated:{" "}
            <span className="font-medium text-gray-800">
              {terms?.last_updated
                ? new Date(terms.last_updated).toLocaleDateString("en-GB")
                : "—"}
            </span>
          </p>
        </div>

        {/* ✅ Loading State */}
        {loading && (
          <div className="text-center text-gray-500 py-10">
            Loading Terms and Conditions...
          </div>
        )}

        {/* ✅ No Terms Found */}
        {!loading && !terms && (
          <div className="text-center text-red-500 py-10">
            No Terms and Conditions found.
          </div>
        )}

        {/* ✅ Terms Content */}
        {terms && (
          <div
            className="bg-white rounded-md shadow-md p-6 mb-8 prose max-w-none text-black"
            dangerouslySetInnerHTML={{ __html: terms.content }}
          />
        )}
      </div>
    </div>
  );
}

export default TermsConditions;
