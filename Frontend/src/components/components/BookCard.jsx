import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  return (
    <Link to={`/api/books/${book._id}`} className="w-[300px]  rounded-md border shadow-2xl">
      <img
        src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
        alt="Laptop"
        className="h-[150px] w-full rounded-t-md object-cover"
      />
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
         {book.title} &nbsp; <ArrowUpRight className="h-4 w-4" />
        </h1>
        <p className="mt-3 text-sm text-gray-600 ">
          <p className='max-h-[80px] h-[80px] overflow-auto'>{book.description}</p>
         <br/>
         <div className=' font-semibold text-gray-900 mt-3'>
         YOE : {book.yearOfPublication} 
         </div>
        </p>
        <div className="mt-4">
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
            #{book.category}
          </span>
        </div>
        <button
          type="button"
          className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Read
        </button>
      </div>
    </Link>
  );
}
