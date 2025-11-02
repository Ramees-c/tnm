import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Phone } from "lucide-react";
import API_BASE from "../../../API/API";

const RefundPolicy = () => {
  const [refund, setRefund] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRefundPolicy = async () => {
      try {
        const response = await axios.get(`${API_BASE}/static-pages/`);

        //  Filter only the page where page_type is "refund"
        const refundPage = response.data.find(
          (page) => page.page_type === "refund"
        );

        setRefund(refundPage || null);
      } catch (error) {
        console.error("Error fetching refund policy:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRefundPolicy();
  }, []);

  return (
    <div className="container min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/*  Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Refund Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Last Updated:{" "}
            <span className="font-medium text-gray-800">
              {refund?.last_updated
                ? new Date(refund.last_updated).toLocaleDateString("en-GB")
                : "—"}
            </span>
          </p>
        </div>

        {/*  Loading State */}
        {loading && (
          <div className="text-center text-gray-500 py-10">
            Loading Refund Policy...
          </div>
        )}

        {/*  No Refund Found */}
        {!loading && !refund && (
          <div className="text-center text-red-500 py-10">
            No Refund Policy found.
          </div>
        )}

        {/*  Refund Content */}
        {refund && (
          <div
            className="bg-white rounded-md shadow-md p-6 mb-8 prose max-w-none text-black"
            dangerouslySetInnerHTML={{ __html: refund.content }}
          />
        )}
      </div>
    </div>
  );
};

export default RefundPolicy;
