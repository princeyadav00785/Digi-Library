import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Share } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard';

export default function Bookinfo() {
  const { id } = useParams(); 
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);  
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [message,setMessage]=useState('');
  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/books', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setBooks(response.data);
        setLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching books:', error.data);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);
  

  useEffect(() => {
    const fetchBook = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(
          `http://localhost:5000/api/books/${id}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBook(response.data);
        setLoading(false);
        // console.log(response.data); 
      } catch (error) {
        console.error('Error fetching book:', error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleBorrowRequest = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:5000/api/book-requests/request', 
        { 
          bookId: id, 
          requestType: 'borrow'  
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log('Request sent:', response.data);
      setMessage(response.data.message);
      setShowModal(false);
      setShowModal2(true);

    } catch (error) {
      console.error('Error sending request:', error);
      setMessage(error.response.data.message);
      setShowModal2(true);
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="sp mx-auto max-w-7xl px-2 py-10 lg:px-0  mt-10">
      <div className="overflow-hidden">
        <div className="mb-9 pt-4 md:px-6 md:pt-7 lg:mb-2 lg:p-8 2xl:p-10 2xl:pt-10">
          <div className="items-start justify-between lg:flex lg:space-x-8">
            <div className="mb-6 items-center justify-center overflow-hidden md:mb-8 lg:mb-0 xl:flex">
              <div className="w-full xl:flex xl:flex-row-reverse">
                <div className=" mb-2.5 w-full shrink-0 overflow-hidden rounded-md border md:mb-3 xl:w-[480px] 2xl:w-[650px]">
                  <div className=" flex items-center justify-center">
                    <img
                      alt={`Product gallery 1`}
                      // src={book.imageSrc}
                              src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                      width={650}
                      height={590}
                      className="rounded-lg object-cover md:h-[300px] md:w-full lg:h-full"
                    />
                  </div>
                  <div className="absolute top-2/4 z-10 flex w-full items-center justify-between">
                  </div>
                </div>
                {/* <div className="flex gap-2 xl:flex-col">
                  {book.images.map((image, index) => (
                    <div
                      key={index}
                      className="border-border-base flex cursor-pointer items-center justify-center overflow-hidden rounded border transition hover:opacity-75 "
                    >
                      <img
                        alt={`Product ${index}`}
                        src={image}
                        decoding="async"
                        loading="lazy"
                        className="h-20 w-20 object-cover md:h-24 md:w-24 lg:h-28 lg:w-28 xl:w-32"
                      />
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
            <div className="flex shrink-0 flex-col lg:w-[430px] xl:w-[470px] 2xl:w-[480px]">
              <div className="pb-5">
              <h2 className="text-lg text-red-600 font-semibold md:text-xl xl:text-2xl">{message}</h2>
                <h2 className="text-lg font-semibold md:text-xl xl:text-2xl">{book.title}</h2>
                <p className="mt-4 font-semibold">Author : {book.author}</p>
              </div>
              <div className="mb-2 pt-0.5">
                <h4 className="text-15px mb-3 font-normal capitalize text-opacity-70">
                  Quantity Available : {book.quantity}
                </h4>
                <ul className="flex flex-wrap space-x-2">
                <p className="mt-4 font-semibold">#{book.category}</p>
                  {/* {book.availableSizes.map((size, index) => (
                    <li
                      key={index}
                      className="md:text-15px mb-2 flex h-9 cursor-pointer items-center justify-center rounded border p-1 px-3 text-sm font-medium transition duration-200 ease-in-out md:mb-3 md:h-10"
                    >
                      {size}
                    </li>
                  ))} */}
                </ul>
              </div>
              <div className="pb-2" />
              <div className="space-y-2.5 pt-1.5 md:space-y-3.5 lg:pt-3 xl:pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Borrow It !!
                </button>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <Heart size={16} className="mr-3" />
                    <span className="block">Wishlist</span>
                  </button>
                  <div className="">
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <Share size={16} className="mr-3" />
                      <span className="block">Return It !!</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="pt-6 xl:pt-8">
                <h3 className="text-15px mb-3 font-semibold sm:text-base lg:mb-3.5">
                  Book Description :
                </h3>
                <p className="text-sm">
                  {book.description}
                </p>
              </div>
              <h3 className="text-15px mb-3 font-semibold sm:text-base lg:mb-3.5 mt-4">
                Reviews :
                </h3> 
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Similar Books (Would add filter here later for filtering similar category books.)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
    </div>
    {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Confirmation</h2>
            <p className="mb-4">Send a request to the librarian for the book?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleBorrowRequest}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
       {showModal2 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
             {message&& <p className="mb-4 text-xl  text-red-600">{message}</p>}
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal2(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
