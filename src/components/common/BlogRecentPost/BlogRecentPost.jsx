import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BlogRecentPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/blogs/")
      .then((res) => {
        // assuming API returns an array of blog objects
        // take the latest 5
        const latest = res.data.slice(0, 5);
        setPosts(latest);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h3 className="font-bold mb-3">Recent Post</h3>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h3 className="font-bold mb-3">Recent Post</h3>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex items-center gap-3 border-b pb-3 last:border-none"
          >
            {/* Image */}
            <img
              src={post.image}
              alt={post.title}
              className="w-24 h-20 object-cover rounded-md"
            />
            {/* Text Content */}
            <div className="flex flex-col gap-2">
              <Link to={`/blogSingle/${post.id}`} className="text-sm text-gray-700 font-medium hover:text-green-600 cursor-pointer">
                {post.title}
              </Link>
              <span className="text-xs text-gray-500">
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogRecentPost;
