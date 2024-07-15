import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleUserUpdate = async (userId, updatedData) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/admin/users/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(users.map(user => 
        user._id === userId ? response.data : user
      ));
      alert(`Data of ${updatedData.username} has been updated sucessfully`)
    } catch (error) {
    //   console.error('Error updating user:', error);
    }
  };

  const handleInputChange = (userId, field, value) => {
    setUsers(users.map(user => 
      user._id === userId ? { ...user, [field]: value } : user
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Admin Panel - User Management</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300">Username</th>
            <th className="py-2 px-4 border-b border-gray-300">Email</th>
            <th className="py-2 px-4 border-b border-gray-300">Role</th>
            <th className="py-2 px-4 border-b border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b border-gray-300">
                <input
                  type="text"
                  value={user.username}
                  onChange={(e) => handleInputChange(user._id, 'username', e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => handleInputChange(user._id, 'email', e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                <select
                  value={user.role}
                  onChange={(e) => handleInputChange(user._id, 'role', e.target.value)}
                  className="border rounded p-2 w-full"
                >
                  <option value="student">Student</option>
                  <option value="librarian">Librarian</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                <button
                  onClick={() => handleUserUpdate(user._id, {
                    username: user.username,
                    email: user.email,
                    role: user.role,
                  })}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
