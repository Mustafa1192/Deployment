import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TabSection = () => {
  const [activeTab, setActiveTab] = useState("subjects");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigate = useNavigate();

  const tabs = ["Subjects", "Documents", "Books"];

  const subjects = [
    "Operating Systems",
    "Web Development",
    "Artificial Intelligence",
    "Database Management Systems",
    "Computer Networks",
    "Software Engineering",
    "Data Structures and Algorithms",
    "Cloud Computing",
    "Cybersecurity",
  ];

  const documents = [
    { title: "Natural Law – Lecture notes 1", category: "LLB", pages: 4 },
    { title: "Python–Cheat-Sheet", category: "Machine Learning", pages: 14 },
    { title: "Blundel Blundel – Concepts in Thermal Physics", category: "Thermodynamics", pages: 66 },
    { title: "C++ and Data Structure", category: "B.Sc (Computer Science)", pages: 150 },
    // { title: "Whittlesey Classification", category: "(Paper IX) Economics", pages: 222 },
    { title: "PSS MCQ – MCQs", category: "Power System Studies", pages: 17 },
  ];

  const books = [
    { title: "Introduction to Algorithms", author: "Thomas H. Cormen", subject: "Computer Science" },
    { title: "The Pragmatic Programmer", author: "Andrew Hunt", subject: "Software Engineering" },
    { title: "Clean Code", author: "Robert C. Martin", subject: "Programming" },
    { title: "You Don’t Know JS", author: "Kyle Simpson", subject: "JavaScript" },
    { title: "Design Patterns", author: "Erich Gamma", subject: "Software Design" },
  ];

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 py-10 px-5">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-2 text-black">Only the best for the best</h1>
      <p className="text-lg text-gray-600 mb-8">
        Find the best study materials to ace your education.
      </p>

      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-300 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 text-lg font-medium ${
              activeTab.toLowerCase() === tab.toLowerCase()
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab(tab.toLowerCase());
              setExpandedIndex(null); // Reset expanded state
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Subjects Content */}
      {activeTab === "subjects" && (
        <div className="flex flex-wrap p-6 max-w-[60rem] rounded-xl shadow bg-white justify-center gap-4">
        {subjects.map((subject, index) => (
          <span
            key={index}  onClick={handleClick}
            className="bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:shadow-md"
          >
            {subject}
          </span>
        ))}
      </div>
      )}

      {/* Documents Content */}
      {activeTab === "documents" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 max-w-[60rem] rounded-xl shadow bg-white gap-6 w-full">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex items-start gap-4 cursor-pointer"
              onClick={handleClick}
            >
              <div className="flex-1 truncate">
                <h3 className="text-lg font-semibold truncate text-gray-800 truncate">
                  {doc.title}
                </h3>
                <p className="text-sm text-gray-600">{doc.category}</p>
              </div>
              <div className="flex items-center justify-center bg-gray-100 text-gray-800 text-xs font-medium w-8 h-8 rounded-full">
                {doc.pages}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Books Content */}
      {activeTab === "books" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 max-w-[60rem] rounded-xl shadow bg-white gap-6 w-full">
          {books.map((book, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex items-center justify-between cursor-pointer"
              onClick={handleClick}
            >
              {/* Book Details */}
              <div className="truncate">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 truncate">by {book.author}</p>
              </div>
              {/* Icon */}
              <div className="flex items-center justify-center bg-blue-100 text-blue-600 text-xl font-medium w-10 h-10 rounded-full">
                📘
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TabSection;
