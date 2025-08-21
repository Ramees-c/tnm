import React from "react";
import BlogContent from "../../../components/common/BlogContent/BlogContent";
import BlogSidebar from "../../../components/common/BlogSidebar/BlogSidebar";

function BlogSingle() {
  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Title */}
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-center text-gray-900 leading-snug mb-10">
          Partiality indulgence dispatched to of celebrated.
        </h1>

        {/* Layout: Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Blog Content */}
          <div className="lg:col-span-2">
            <BlogContent />
          </div>

          {/* Sidebar */}
          <div>
            <BlogSidebar />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogSingle;
