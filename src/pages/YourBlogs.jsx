import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import Modal from "../components/Modal";

const YourBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [userRating, setUserRating] = useState({});
  const userId = localStorage.getItem("userId");
  const [selectedBlog,setSelectedBlog] = useState(null)
  const [isModalOpen,setIsModalOpen] = useState(true)
  const Navigate = useNavigate()

  useEffect(() => {
    
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/getuserblog/${userId}`);
        setBlogs(res.data.blog);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, [userId]);

  const deleteBlog = async(id)=>{
    try {
      const res = await axios.delete(`http://localhost:3000/${id}`)
      alert("Blog deleted successfully!");
      // Navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  const updateBlog = async()=>{
    try {
       await axios.put(`http://localhost:3000/${selectedBlog._id}`),{
        title: selectedBlog.title,
        article : selectedBlog.article
      }
      isModalOpen(false)
      fetchBlog()
    } catch (error) {
      console.log(error)
    }
  }

  const handleRating = (blogId, rating) => {
    setUserRating((prev) => ({ ...prev, [blogId]: rating }));
  };

  if (blogs.length === 0) {
    return (
      <div className="p-6 text-center text-lg text-gray-500">
        No blogs found. Start writing something amazing! ✍️
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-purple-700 drop-shadow-sm">
        Your Blogs
      </h1>

      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="bg-white rounded-2xl shadow-lg mb-10 overflow-hidden transition-transform duration-300 hover:scale-[1.01]"
        >
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-72 object-cover"
          />

          <div className="p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{blog.title}</h2>

            <div className="flex flex-col sm:flex-row sm:justify-between text-gray-500 text-sm mb-4">
              <p>✍️ <span className="font-semibold text-gray-700">{blog.name}</span></p>
              <p>📅 {blog.date}</p>
              <p>📧 {blog.email}</p>
            </div>

            <p className="text-gray-800 text-base leading-relaxed mb-6 whitespace-pre-line">
              {blog.article}
            </p>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                ⭐ Rate this article:
              </h3>
              <div className="flex items-center gap-1 text-yellow-500 text-2xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRating(blog._id, star)}
                    className={`cursor-pointer hover:scale-110 transition-transform ${
                      userRating[blog._id] >= star ? "text-yellow-500" : "text-gray-400"
                    }`}
                  >
                    {userRating[blog._id] >= star ? "★" : "☆"}
                  </span>
                ))}
                <span className="text-sm text-gray-600 ml-3">
                  (You rated: {userRating[blog._id] || 0})
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <button onClick={()=>{setSelectedBlog(blog);setIsModalOpen(true)}} className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition duration-200 shadow-md hover:shadow-lg">
                ✏️ Edit
              </button>
              <button onClick={()=>deleteBlog(blog._id)} className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition duration-200 shadow-md hover:shadow-lg">
                🗑️ Delete
              </button>
            </div>
          </div>

          <Modal />
        </div>
      ))}
    </div>
  );
};

export default YourBlogs;
