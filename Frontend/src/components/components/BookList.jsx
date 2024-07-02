import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard'; 
import Loader from './Loader'; 

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  console.log(books);
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">All Books</h2>
      {loading ? (
        <Loader /> 
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))} */}
        </div>
      )}
    </div>
  );
};

export default BooksList;
