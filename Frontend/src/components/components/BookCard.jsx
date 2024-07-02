import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
      <img
        src={book.coverImageUrl} 
        alt={book.title}
        className="w-full h-64 object-cover object-center"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
        <p className="text-sm mb-2">{book.author}</p>
        <p className="text-sm">{book.category}</p>
      </div>
    </div>
  );
};

export default BookCard;
