import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../../../API/API";

function PrivacyPolicy() {
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await axios.get(`${API_BASE}/static-pages/`);

        // ✅ Filter only the page where page_type is "privacy"
        const privacyPage = response.data.find(
          (page) => page.page_type === "privacy"
        );

        setPolicy(privacyPage || null);
      } catch (error) {
        console.error("Error fetching privacy policy:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, []);

  return (
    <div className="container min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* ✅ Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Last Updated:{" "}
            <span className="font-medium text-gray-800">
              {policy?.last_updated
                ? new Date(policy.last_updated)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "-")
                : "—"}
            </span>
          </p>
        </div>

        {/* ✅ Loading State */}
        {loading && (
          <div className="text-center text-gray-500 py-10">
            Loading Privacy Policy...
          </div>
        )}

        {/* ✅ No Policy Found */}
        {!loading && !policy && (
          <div className="text-center text-red-500 py-10">
            No Privacy Policy found.
          </div>
        )}

        {/* ✅ Policy Content */}
        {policy && (
          <div
            className="bg-white rounded-md shadow-md p-6 mb-8 prose max-w-none text-black"
            dangerouslySetInnerHTML={{ __html: policy.content }}
          />
        )}
      </div>
    </div>
  );
}

export default PrivacyPolicy;
