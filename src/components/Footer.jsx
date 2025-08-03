import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">📝</span>
            <span className="text-xl font-bold">BlogVerse</span>
          </div>
          <p className="text-sm mt-2 text-gray-300">
            Share your story with the world. Your voice matters.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Write a Blog</Link></li>
            <li><Link to="/yourblogs">Your Blogs</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-sm text-gray-300">Email: blogverse@gmail.com</p>
          <p className="text-sm text-gray-300">Phone: +92 300 1234567</p>
          <p className="text-sm text-gray-300">Location: Karachi, Pakistan</p>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-4 border-t border-gray-800 pt-3">
        © 2025 BlogVerse. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
