import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlogContent from "../../../components/common/BlogContent/BlogContent";
import BlogSidebar from "../../../components/common/BlogSidebar/BlogSidebar";
import Loading from "../../../components/common/Loading/Loading";

function BlogSingle() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // optional error state

  useEffect(() => {
    setLoading(true); // ensure loading state is true before fetching
    axios
      .get(`/api/blogs/${id}/`)
      .then((res) => {
        setPost(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load blog");
        setPost(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
       <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!post) return <p className="text-center">Blog not found</p>;

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="mx-auto px-6 lg:px-12">
        {/* Title */}
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-center text-gray-900 leading-snug mb-10">
          {post.title}
        </h1>

        {/* Layout: Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Blog Content */}
          <div className="lg:col-span-2">
            <BlogContent post={post} />
          </div>

          {/* Sidebar */}
          <div className="relative">
            <div className="sticky top-24 transition-all duration-300">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogSingle;
