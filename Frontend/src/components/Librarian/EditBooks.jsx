import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const EditBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const [book, setBook] = useState({
    title: '',
    author: '',
    quantity: 0,
    availability: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch book details');
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/books/${bookId}`, book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/librarian/edit-books'); 
    alert("! Book updated sucessfully..")
    } catch (error) {
      setError('Failed to update book details');
    }
  };
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate('/librarian/edit-books'); 
        alert("! Book deleted sucessfully..")
      } catch (error) {
        setError('Failed to delete book');
        console.log(error);
      }
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Edit Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Author</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={book.quantity}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Availability</label>
          <input
            type="text"
            name="availability"
            value={book.availability}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
         <div className='flex justify-between'>
         <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
        >
          Delete Book
        </button>
         </div>
      </form>
    </div>
  );
};

export default EditBook;
