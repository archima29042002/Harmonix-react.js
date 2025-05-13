import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all registered users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/v1/user/allgetusers');
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Function to delete a user
  const deleteUser = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.delete(`http://localhost:4000/api/v1/user/deleteuser/${userId}`);
      if (response.data) {
        fetchUsers();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-50">
      <h1 className="text-3xl font-bold mb-6 text-purple-800">User Details</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full divide-y divide-gray-200 border-separate border-spacing-0 border-[1px] border-black">
            <thead className="bg-purple-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b-[1px] border-black">First Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b-[1px] border-black">Last Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b-[1px] border-black">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b-[1px] border-black">Registered On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b-[1px] border-black">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-6 pt-1 pb-1 w-40 whitespace-nowrap text-gray-900 border-b-[1px] border-r-[1px] border-black">
                      {user.firstName}
                    </td>
                    <td className="px-6 pt-1 pb-1 w-40 whitespace-nowrap text-gray-900 border-b-[1px] border-r-[1px] border-black">
                      {user.lastName}
                    </td>
                    <td className="px-6 pt-1 pb-1 w-40 whitespace-nowrap text-gray-900 border-b-[1px] border-r-[1px] border-black">
                      {user.email}
                    </td>
                    <td className="px-6 pt-1 pb-1 w-40 whitespace-nowrap text-gray-900 border-b-[1px] border-black">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 pt-1 pb-1 w-40 whitespace-nowrap text-gray-900 border-b-[1px] border-r-[1px] border-black">
                    <button
                          onClick={() => deleteUser(user._id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition">
                          Delete
                        </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500 border-b-[1px] border-black">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default User
