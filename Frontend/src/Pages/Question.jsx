// ///////////////////////////////////Displaying all the Question////////////////////////////// 
import React, { useState, useEffect } from 'react';
import Sidebar from '../Navigations/Sidebar';
import Header from '../Navigations/Header';

function Member() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [questions, setQuestions] = useState([]); // State to hold all questions

  // Fetch all questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/all-questions`);

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow bg-[#F4F5F7]">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold mb-4">Questions and Answers</h1>
                <div className="space-y-4">
                  {questions.map((q, index) => (
                    <div key={index} className="p-4 border rounded bg-white shadow-sm">
                      <h2 className="font-semibold text-lg">{q.question}</h2>
                      <p className="mt-2">{q.answer || "Answer not available."}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Member;