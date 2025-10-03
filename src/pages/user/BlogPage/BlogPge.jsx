  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import BlogCard from "../../../components/common/BlogCard/BlogCard";
  import PageHeader from "../../../components/common/PageHeader/PageHeader";
  import Loading from "../../../components/common/Loading/Loading";

  function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 6;

    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const res = await axios.get("/api/blogs/");
          setPosts(res.data);
        } catch (err) {
          console.error("Failed to fetch blogs:", err);
          setError("Failed to load blogs");
        } finally {
          setLoading(false);
        }
      };

      fetchBlogs();
    }, []);

    useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [currentPage]);

    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-red-500">{error}</p>
        </div>
      );
    }

    // Pagination calculations
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = posts.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(posts.length / blogsPerPage);

    // Compute page numbers to display (sliding window)
    const pageNumbers = [];
    const maxVisible = 3; // show 3 pages at a time

    let startPage = Math.max(currentPage - 1, 1);
    let endPage = Math.min(startPage + maxVisible - 1, totalPages);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(endPage - maxVisible + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div>
        <PageHeader
          title="Blogs"
          headerBg="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&auto=format&fit=crop&q=60"
        />

        <div className="container">
          <section className="w-full py-16">
            <div className="mx-auto lg:px-12">
              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {currentBlogs.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12 space-x-2">
                {/* Previous button */}
                {currentPage > 1 && (
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-green-100"
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    «
                  </button>
                )}

                {/* Page numbers */}
                {pageNumbers.map((num) => (
                  <button
                    key={num}
                    className={`w-10 h-10 flex items-center justify-center rounded-full border ${
                      currentPage === num
                        ? "bg-green-600 text-white"
                        : "hover:bg-green-100"
                    }`}
                    onClick={() => setCurrentPage(num)}
                  >
                    {num}
                  </button>
                ))}

                {/* Next button */}
                {currentPage < totalPages && (
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-green-100"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    »
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  export default BlogPage;
