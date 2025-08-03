import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        name,
        email,
        password
      })
      if (response.status === 201) {
        navigate('/login')
      }
    } catch (error) {
      console.error("Signup failed:", error)
    }
  }

  const navigateToLogin = () => {
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-500 flex items-center justify-center p-6">
          <img
            src="https://source.unsplash.com/400x400/?writing,blog"
            alt="Signup Illustration"
            className="rounded-lg shadow-xl"
          />
        </div>
        <div className="md:w-1/2 p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Your Account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-5 text-sm text-gray-600 text-center">
            Already have an account?{' '}
            <span
              onClick={navigateToLogin}
              className="text-indigo-600 hover:underline cursor-pointer font-medium"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
