import React from 'react';

const teamMembers = [
  {
    name: 'Prince Yadav',
    role: 'Full Stack Developer',
    image: 'https://via.placeholder.com/150', 
    linkedin: 'https://www.linkedin.com/in/prince-yadav00785/',
    github: 'https://github.com/princeyadav00785',
  },
];

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h1 className="text-3xl font-semibold mb-4 text-center">About Digi-Library</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Welcome to Digi-Library, your one-stop solution for managing your library online. Our mission is to provide an
        efficient and user-friendly platform to manage your library's books, requests, and more.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4 text-center">Our Team</h2>
      <div className="flex flex-wrap justify-center">
        {teamMembers.map((member, index) => (
          <div key={index} className="max-w-sm w-full lg:w-1/3 px-4 py-6">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                className="w-full h-48 object-cover"
                src={member.image}
                alt={member.name}
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.role}</p>
                <div className="flex justify-center">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 mx-2"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-gray-900 mx-2"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;


