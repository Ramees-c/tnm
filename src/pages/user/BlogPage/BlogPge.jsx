import React from "react";

import BlogCard from "../../../components/common/BlogCard/BlogCard";
import PageHeader from "../../../components/common/PageHeader/PageHeader";

function BlogPge() {

   
  const posts = [
    {
      id: 1,
      category: "Course",
      date: "October 18, 2025",
      title: "This prefabice passive house is memorable highly sustainable",
      image:
        "https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww",
    },
    {
      id: 2,
      category: "Learning",
      date: "November 15, 2025",
      title: "Announcing if attachment resolution performing the regular.",
      image:
        "https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww",
    },
    {
      id: 3,
      category: "Coach",
      date: "December 13, 2025",
      title: "Resolution performing the regular sentim keeps at no meant.",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZWR1Y2F0aW9ufGVufDB8fDB8fHww",
    },
    {
      id: 4,
      category: "Learning",
      date: "December 13, 2025",
      title: "Drawings can followed improved out sociable not register.",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];
  return (
   <div>
    <PageHeader
        title="Blogs"
        headerBg="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmxvZ3N8ZW58MHx8MHx8fDA%3D"
      />
    <div className="container">
       <section className="w-full py-16 bg-gray-50">
      <div className="mx-auto lg:px-12">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
           <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 space-x-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-green-100">
            «
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 text-white border">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-green-100">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-green-100">
            3
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-green-100">
            »
          </button>
        </div>
      </div>
    </section>
    </div>
   </div>
  );
}

export default BlogPge;
