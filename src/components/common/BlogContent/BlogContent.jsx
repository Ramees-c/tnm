import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const BlogContent = ({ post }) => {
  return (
    // Blog content component
    <article className="bg-white rounded-md shadow-md p-2 md:p-6">
      {/* Featured Image */}
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full object-cover rounded-md mb-6"
        />
      )}

      {/* Meta Info */}
      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
        <FaCalendarAlt className="text-green-500" />
        <span>
          {new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Blog Body */}
      <div
        className="prose prose-lg prose-emerald max-w-none leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </article>
  );
};

export default BlogContent;
