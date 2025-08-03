import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get');
        setBlogs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-10">📚 Latest Blogs</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <Link to={`/blog/${blog._id}`} key={index}>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-purple-700 mb-2">{blog.title}</h2>
                <p className="text-gray-600 text-sm mb-4">
                  {blog.article?.substring(0, 100)}...
                </p>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>✍️ {blog.name}</span>
                  <span>📅 {blog.date}</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>
                      {blog.rating >= star ? "★" : blog.rating >= star - 0.5 ? "☆" : "☆"}
                    </span>
                  ))}
                  <span className="text-gray-500 text-xs ml-2">({blog.rating})</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
