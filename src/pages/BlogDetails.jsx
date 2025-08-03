import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/${id}`);
        setBlog(res.data.blog);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleRating = (rating) => {
    setUserRating(rating);
  };

  if (!blog) return <div className="p-6 text-center text-lg text-gray-600">Loading blog...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-72 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-purple-700 mb-2">
            {blog.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 mb-4">
            <p>✍️ <span className="font-medium text-gray-700">{blog.name}</span></p>
            <p>📅 {blog.date}</p>
          </div>

          <p className="text-gray-800 leading-relaxed mb-6 whitespace-pre-line">
            {blog.article}
          </p>

          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Rate this article:</h2>
            <div className="flex items-center gap-1 text-yellow-500 text-2xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRating(star)}
                  className="cursor-pointer hover:scale-110 transition-transform"
                >
                  {userRating >= star ? "★" : "☆"}
                </span>
              ))}
              <span className="text-sm text-gray-600 ml-3">(You rated: {userRating})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
