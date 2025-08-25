import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function BlogCard({ post }) {
  return (
    <div>
      <Link to="/blogSingle">
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
          {/* Image */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-52 md:h-80 object-cover ransform transition-transform duration-500 hover:scale-105"
          />

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
              <FaCalendarAlt className="text-green-500" />
              <span>{post.date}</span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
              {post.title}
            </h3>

            <a
              href="#"
              className="text-green-600 font-medium text-sm hover:underline"
            >
              READ MORE →
            </a>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BlogCard;
