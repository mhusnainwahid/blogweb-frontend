import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if(storedUser){
      setUser(JSON.parse(storedUser))
    }
  }, []);

  if (!user) return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white shadow-md rounded-xl p-6 text-center">
        <img
          src={user.profilePic || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-purple-700">{user.name}</h2>
        <p className="text-gray-600 mb-2">{user.email}</p>
        {user.bio && <p className="text-gray-700 italic mb-4">"{user.bio}"</p>}

        <p className="text-sm text-gray-400">Joined on {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default UserProfile;
