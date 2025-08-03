import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from "./Modal";

const BlogForm = () => {
  const [step, setStep] = useState(1);
  const userId = localStorage.getItem("userId")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    category: "",
    imageUrl: "",
    article: "",
    userId,
  });
  const [image,setImage] = useState(null)

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };
  // const handleImage = (e) =>{
  //   console.log(e.target.files[0])
  //   setImage(e.target.files[0])
  // }
  const handleImage = (e) =>{
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageData = new FormData()
      imageData.append('image', image)

      const res = await axios.post("http://localhost:3000/image",imageData)

      console.log(res)

      formData.imageUrl = res.data.imageUrl
      
      const { data } = await axios.post('http://localhost:3000/create', formData);
      console.log(data);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-12 bg-gradient-to-br from-white via-purple-50 to-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
        ✍️ Share Your Blog
      </h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-5">
            <label className="block">
              <span className="text-gray-700 font-medium">Name</span>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full border border-purple-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                required
              />
            </label>

            <label className="block">
              <span className="text-gray-700 font-medium">Email</span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full border border-purple-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                required
              />
            </label>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-5">
            <label className="block">
              <span className="text-gray-700 font-medium">Title</span>
              <input
                type="text"
                name="title"
                placeholder="Blog Title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 w-full border border-purple-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                required
              />
            </label>

            <label className="block">
              <span className="text-gray-700 font-medium">Category</span>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 w-full border border-purple-300 rounded-xl px-4 py-2 bg-white focus:ring-2 focus:ring-purple-400 focus:outline-none"
                required
              >
                <option value="">Choose one</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="Travel">Travel</option>
                <option value="Education">Education</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </label>

            <label className="block">
              <span className="text-gray-700 font-medium">Cover Image URL</span>
              <input
                type="file"
                accept="image/*"
                name="coverImage"
                // placeholder="https://example.com/image.jpg"
                value={formData.coverImage}
                onChange={(e)=>handleImage(e)}
                className="mt-1 w-full border border-purple-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <label className="block">
              <span className="text-gray-700 font-medium">Your Article</span>
              <textarea
                name="article"
                placeholder="Write your blog post here..."
                value={formData.article}
                onChange={handleChange}
                className="mt-1 w-full border border-purple-300 rounded-xl px-4 py-2 h-44 resize-none focus:ring-2 focus:ring-purple-400 focus:outline-none"
                required
              ></textarea>
            </label>
          </div>
        )}
        <div className="flex justify-between items-center mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-all"
            >
              ⬅️ Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto px-5 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all"
            >
              Next ➡️
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all"
            >
              ✅ Submit
            </button>

            
          )}
        </div>
      </form>

      <Modal />
    </div>
  );
};

export default BlogForm;
