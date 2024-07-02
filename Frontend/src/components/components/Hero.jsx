import React from 'react';
import bgimage from '../../assets/7.jpg'


function Hero() {
  return (
   <div className='h-[60vh] flex justify-center items-center bg-transparent' >
     <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center text-black">
      <h1 className="text-[6vh] font-semibold mb-4 max-w-3xl text-center  ">
        Welcome to the Digi-Library
      </h1>
      <p className="mt-10 text-lg  max-w-2xl text-center text-teal-900 font-extrabold">
        Explore the library's collection, manage your borrowed books, and more.
      </p>
    </div>
   </div>
  );
}

export default Hero;
