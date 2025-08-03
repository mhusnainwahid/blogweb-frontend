import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password
      });

      localStorage.setItem("token", response.data.existUser.token);
      // console.log(response.data.existUser._id)
      localStorage.setItem("userId", response.data.existUser._id);
      if (response.status === 201) {
        navigate('/');
        const user = response.data.existUser
        localStorage.setItem("user",JSON.stringify(user))
        // console.log(user)
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6">
          <img
            src="https://source.unsplash.com/400x400/?login,security"
            alt="Login Illustration"
            className="rounded-lg shadow-xl"
          />
        </div>
        <div className="md:w-1/2 p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Login to Your Account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-5 text-sm text-gray-600 text-center">
            Don’t have an account?{' '}
            <span
              onClick={navigateToSignup}
              className="text-purple-600 hover:underline cursor-pointer font-medium"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
