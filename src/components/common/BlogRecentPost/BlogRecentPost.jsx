import React from "react";

const posts = [
  {
    id: 1,
    title: "Commanded household smallness delivered.",
    date: "Jul 14, 2022",
    image: "https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww", // replace with your real image
  },
  {
    id: 2,
    title: "Future Plan & Strategy for Construction.",
    date: "Jul 14, 2022",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    title: "Melancholy particular devonshire alteration.",
    date: "Jul 14, 2022",
    image: "https://plus.unsplash.com/premium_photo-1661909267383-58991abdca51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww",
  },
  {
    id: 3,
    title: "Melancholy particular devonshire alteration.",
    date: "Jul 14, 2022",
    image: "https://plus.unsplash.com/premium_photo-1661909267383-58991abdca51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww",
  },
  {
    id: 3,
    title: "Melancholy particular devonshire alteration.",
    date: "Jul 14, 2022",
    image: "https://plus.unsplash.com/premium_photo-1661909267383-58991abdca51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww",
  },
];

function BlogRecentPost() {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h3 className="font-bold mb-3">Recent Post</h3>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="flex items-center gap-3 border-b pb-3 last:border-none">
            {/* Image */}
            <img
              src={post.image}
              alt={post.title}
              className="w-24 h-20 object-cover rounded-md"
            />
            {/* Text Content */}
            <div>
              <p className="text-sm text-gray-700 font-medium hover:text-green-600 cursor-pointer">
                {post.title}
              </p>
              <span className="text-xs text-gray-500">{post.date}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogRecentPost;
