import React from 'react';
import { useSelector, } from 'react-redux';
import { UserCircle } from 'lucide-react';



const UserProfile = () => {
  const { user } = useSelector((state) => state.user); 
 console.log(user);
 console.log(user.email)
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-10 relative z-[-10]">
     <div className='flex items-center justify-center'> <h2 className="text-3xl font-semibold mt-4 mb-4 text-gray-700 items-center">Profile Page </h2></div>
      <div className="flex justify-center">
        <div className="max-w-lg w-full lg:w-2/3 px-4 py-6">
          <div className="bg-white rounded-lg overflow-hidden transform transition-transform hover:scale-105 shadow-2xl">
            <div className="h-64 bg-gray-300 flex items-center justify-center">
              <UserCircle size={80} className="text-gray-600" />
            </div>
            <div className="p-6">
              <h1 className="text-4xl font-semibold mb-4 text-center">{user.username}'s Profile</h1>
              <div className="mb-4 text-center">
                <p className="text-lg text-gray-700"><strong>Email:</strong> {user.email}</p>
                <p className="text-lg text-gray-700"><strong>Role:</strong> {user.role}</p>
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Books Borrowed:</h2>
                <ul className="list-disc ml-8">
                {user.booksBorrowed?.length > 0 ? (
                  <>{user.booksBorrowed?.map((book) => (
                    <li key={book._id} className="text-lg text-gray-600">{book.title}</li>
                  ))}</>) : (
                    <div className="text-lg text-gray-600">No books borrowed yet!!</div>
                )}
                </ul>
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Books Borrowing Currently:</h2>
                <ul className="list-disc ml-8">
                {user.booksBorrowingCurrently?.length > 0 ? (
                  <>{user.booksBorrowingCurrently?.map((book) => (
                    <li key={book._id} className="text-lg text-gray-600">{book.title}</li>
                  ))}</>) : (
                    <div className="text-lg text-gray-600">No books borrowing Currently !!</div>
                )}
                </ul>
              </div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700 mt-5">Fine: 0
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default UserProfile;
