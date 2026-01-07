import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../../../components/common/BlogCard/BlogCard";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import Loading from "../../../components/common/Loading/Loading";
import API_BASE from "../../../API/API";

import pageBanner from "../../../assets/images/page_banner/blog.png";

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_BASE}/blogs/`);
        const sortedPosts = res.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setPosts(sortedPosts);
      } catch (err) {
        console.error("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // slight delay to ensure content rendered first
    const timeout = setTimeout(scrollToTop, 100);

    return () => clearTimeout(timeout);
  }, [currentPage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  const getPaginationPages = (current, total) => {
    const isMobile = window.innerWidth < 640;
    const delta = isMobile ? 1 : 2;

    const pages = [];
    const range = [];
    const rangeWithDots = [];

    let start = Math.max(2, current - delta);
    let end = Math.min(total - 1, current + delta);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (start > 2) rangeWithDots.push("...");
    rangeWithDots.push(...range);
    if (end < total - 1) rangeWithDots.push("...");

    return [1, ...rangeWithDots, total].filter((v, i, a) => a.indexOf(v) === i);
  };

  // Pagination calculations
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = posts.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(posts.length / blogsPerPage);

  return (
    <div>
      <PageHeader title="Blogs" headerBg={pageBanner} />

      <div className="container">
        <section className="w-full py-16">
          <div className="mx-auto lg:px-12">
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {currentBlogs.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-wrap justify-center items-center mt-12 gap-2 px-2">
                {/* Previous */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center
        ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-green-100"
        }
      `}
                >
                  «
                </button>

                {/* Pages */}
                {getPaginationPages(currentPage, totalPages).map(
                  (page, index) =>
                    page === "..." ? (
                      <span
                        key={index}
                        className="px-2 text-gray-400 select-none"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-sm sm:text-base
            ${
              currentPage === page
                ? "bg-green-600 text-white"
                : "hover:bg-green-100"
            }
          `}
                      >
                        {page}
                      </button>
                    )
                )}

                {/* Next */}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center
        ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-green-100"
        }
      `}
                >
                  »
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default BlogPage;
