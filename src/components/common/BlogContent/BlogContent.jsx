import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const BlogContent = ({ post }) => {
  return (
    <article className="bg-white rounded-md shadow-md p-4 md:p-6">
      {/* Featured Image */}
      <img
        src={post.image}
        alt="Blog"
        className="w-full lg:h-96 object-cover rounded-md mb-6"
      />

      {/* Meta Info */}
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

      {/* Blog Content */}
      <div className="lg:col-span-2">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </div>
    </article>
  );
};

export default BlogContent;
