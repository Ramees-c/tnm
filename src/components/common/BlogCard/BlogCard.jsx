import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function BlogCard({ post }) {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div data-aos="fade-up">
      <div onClick={handleClick}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
          {/* Image */}
          <Link to={`/blogSingle/${post.id}`}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-52 2xl:h-80 object-cover ransform transition-transform duration-500 hover:scale-105"
          />
          </Link>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
              <FaCalendarAlt className="text-green-500" />
              <span>
                <p className="text-gray-500 text-sm">
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
              {post.title}
            </h3>

            <Link to={`/blogSingle/${post.id}`} className="text-green-600 font-medium text-sm hover:underline">
              READ MORE →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
