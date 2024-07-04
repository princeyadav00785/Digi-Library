import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LibrarianHomepage = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/admin/dashboard/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(res.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 mt-16">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">Library Data</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Total Books</h2>
            <p className="text-xl">{stats.totalBooks}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Total Users</h2>
            <p className="text-xl">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Total Requests</h2>
            <p className="text-xl">{stats.totalRequests}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Pending Requests</h2>
            <p className="text-xl">{stats.pendingRequests}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Approved Requests</h2>
            <p className="text-xl">{stats.approvedRequests}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Rejected Requests</h2>
            <p className="text-xl">{stats.rejectedRequests}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibrarianHomepage;
