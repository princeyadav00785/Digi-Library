import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';


function AdminBookHistory() {
  const { id } = useParams();
  const [history, setHistory] = useState([]);
  const Navigate =useNavigate();
  const handleClick=()=>{
    Navigate('/admin/book-history')
  }

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // console.log(id)
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/books/history/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            },
        });
        setHistory(response.data);
        // console.log(response)
      } catch (error) {
        console.error('Error fetching book history', error);
      }
    };
    fetchHistory();
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Book History</h1>
      <ul className="list-disc">
        {history.length === 0 ? (
          <li>No history available for this book.</li>
        ) : (
          history.map((entry, index) => (
            <li key={index}>
              User: {entry.user.username} ({entry.user.email}) - Borrowed on: {new Date(entry.borrowDate).toLocaleDateString()} - Returned on: {entry.returnDate ? new Date(entry.returnDate).toLocaleDateString() : 'Not returned yet'}
            </li>
          ))
        )}
      </ul>
      <button
        className="mt-8 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={handleClick}
        >
         <div className='flex '>  <ChevronLeft className=" h-6 " />    Go Back</div>
      </button>

    </div>
  );
}

export default AdminBookHistory;
