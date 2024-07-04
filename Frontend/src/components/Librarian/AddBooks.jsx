import React, { useState } from 'react';
import axios from 'axios';

const AddBooks = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    description: '',
    yearOfPublication: '',
    quantity: 0,
    coverImageUrl: '', 
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
        // console.log(token);
      const response = await axios.post('http://localhost:5000/api/books',formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }}); 
      // console.log(response.data);
      alert(`!${formData.title} Book sucessfully added...`)
      setFormData({
        title: '',
        author: '',
        isbn: '',
        category: '',
        description: '',
        yearOfPublication: '',
        quantity: 0,
        coverImageUrl: '',
      });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 shadow-md rounded">
              <div className=" text-3xl flex items-end justify-center font-medium text-black mt-3">Add New Book</div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">ISBN</label>
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Year of Publication</label>
        <input
          type="number"
          name="yearOfPublication"
          value={formData.yearOfPublication}
          onChange={handleChange}
          className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Cover Image URL</label>
        <input
          type="text"
          name="coverImageUrl"
          value={formData.coverImageUrl}
          onChange={handleChange}
          className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
      >
        Add Book
      </button>
    </form>
  );
};

export default AddBooks;
