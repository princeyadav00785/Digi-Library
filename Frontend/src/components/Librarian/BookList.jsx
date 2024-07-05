import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/books', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setBooks(response.data);
        // console.log(response);
      } catch (error) {
        console.error('Error fetching books', error);
      }
    };
    fetchBooks();
  }, []);


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Edit Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div 
            key={book._id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Link to={`/librarian/edit-books/${book._id}`} className="block h-full">
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h2>
                <p className="text-sm text-gray-600">By {book.author}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
