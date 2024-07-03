import React from 'react';
import BookForm from '../components/BookForm';
import BookList from '../pages/ManageBooks';

const LibrarianDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <h1 className="text-3xl font-semibold mb-4">Librarian Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add/Update Book</h2>
          <BookForm />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Manage Books</h2>
          <BookList />
        </div>
      </div>
    </div>
  );
};

export default LibrarianDashboard;
