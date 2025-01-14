import React, { useState, useEffect  } from 'react';
import Sidebar from '../Navigations/Sidebar';
import Header from '../Navigations/Header';

function member() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Rotating slides every 3 seconds
  const banners = [
    {
      name: "John Doe",
      description: "A passionate web developer who loves building modern UI.",
      image: "https://pngset.com/images/circle-profile-picture-face-person-human-clothing-transparent-png-488441.png",
    },
    {
      name: "Jane Smith",
      description: "An award-winning designer creating aesthetic experiences.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Sam Wilson",
      description: "A backend genius specializing in scalable architectures.",
      image: "https://via.placeholder.com/150",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const councilMembers = [
    {
      name: "Alice Brown",
      role: "President",
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Bob Green",
      role: "Vice President",
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Charlie White",
      role: "Secretary",
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Diana Black",
      role: "Treasurer",
      image: "https://via.placeholder.com/100",
    },
  ];

  const socialPosts = [
    {
      name: "John Doe",
      description: "Completed a major project in AI-based recommendations!",
      image: "https://via.placeholder.com/300",
      linkedin: "https://linkedin.com/in/johndoe",
    },
    {
      name: "Jane Smith",
      description: "Designed an award-winning app for mobile health tracking.",
      image: "https://via.placeholder.com/300",
      linkedin: "https://linkedin.com/in/janesmith",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      {/*  Site header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="grow bg-[#F4F5F7]">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between  sm:items-center mb-8">

      {/* Right: Actions */}
      <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="py-6 px-8">
        <h1 className="text-3xl font-bold">Achievements</h1>
      </div>

      {/* Rotating Banner */}
      <div className="mt-8 relative overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {banners.map((banner, index) => (
            <div key={index} className="flex-shrink-0 w-full h-64 flex items-center px-8 bg-white rounded-lg shadow-lg relative">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{banner.name}</h2>
                <p className="text-gray-600">{banner.description}</p>
              </div>
              <img src={banner.image} alt={banner.name} className="absolute top-0 right-0 w-48 h-48 rounded-full transform translate-x-1/3" />
            </div>
          ))}
        </div>
      </div>

      {/* Council Section */}
      <div className="mt-12 px-8">
        <h2 className="text-2xl font-bold mb-4">Council Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {councilMembers.map((member, index) => (
            <div key={index} className="bg-white p-4 shadow rounded-lg text-center">
              <img src={member.image} alt={member.name} className="w-24 h-24 mx-auto rounded-full mb-4" />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Posts */}
      <div className="mt-12 px-8">
        <h2 className="text-2xl font-bold mb-4">Social Media Highlights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {socialPosts.map((post, index) => (
            <div key={index} className="bg-white p-4 shadow rounded-lg">
              <img src={post.image} alt={post.name} className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="text-lg font-semibold">{post.name}</h3>
              <p className="text-gray-600 mb-2">{post.description}</p>
              <a href={post.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                LinkedIn Profile
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
 
      </div>
      </div>
      </main>
      </div>
    </div>
  );
}

export default member;