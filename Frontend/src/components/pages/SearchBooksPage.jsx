import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';

const SearchBooksPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [allBooks, setAllBooks] = useState([]);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [author, setAuthor] = useState('');
    const [availability, setAvailability] = useState('');
    const [yearOfPublication, setYearOfPublication] = useState('');
  

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/books', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllBooks(response.data.books);
        setBooks(response.data.books);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = () => {
    let filteredBooks = allBooks;

    if (searchTerm) {
      filteredBooks = filteredBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory) {
      filteredBooks = filteredBooks.filter(book => book.category.toLowerCase() === filterCategory.toLowerCase());
    }

    if (author) {
      filteredBooks = filteredBooks.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
    }

    if (availability) {
      filteredBooks = filteredBooks.filter(book => book.availability.toLowerCase() === availability.toLowerCase());
    }

    if (yearOfPublication) {
      filteredBooks = filteredBooks.filter(book => book.yearOfPublication.toString() === yearOfPublication);
    }

    setBooks(filteredBooks);
  };
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h2 className="text-3xl font-semibold mb-4">Search Books</h2>
      <div className="flex flex-col md:flex-row items-center mb-12">
        <input
          type="text"
          placeholder="Search for books..."
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded mb-2 md:mb-0 md:mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full md:w-1/4 p-2 border border-gray-300 rounded mb-2 md:mb-0 md:mr-2 "
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
          <option value="mystery">Mystery</option>
          <option value="fantasy">Fantasy</option>
          <option value="science">Science</option>
          <option value="history">History</option>
          {/* Add more categories as needed */}
        </select>
        <input
          type="text"
          placeholder="Author"
          className="w-full md:w-1/4 p-2 border border-gray-300 rounded mb-2 md:mb-0 md:mr-2"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <select
          className="w-full md:w-1/4 p-2 border border-gray-300 rounded mb-2 md:mb-0 md:mr-2"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <input
          type="text"
          placeholder="Year of Publication"
          className="w-full md:w-1/4 p-2 border border-gray-300 rounded mb-2 md:mb-0 md:mr-2"
          value={yearOfPublication}
          onChange={(e) => setYearOfPublication(e.target.value)}
        />
        <button
          className="w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBooksPage;
