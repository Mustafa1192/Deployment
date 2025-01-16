import React, { useState, useEffect } from 'react';
import Sidebar from '../Navigations/Sidebar';
import Header from '../Navigations/Header';
import clsx from 'clsx';

function Member() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [questions, setQuestions] = useState([]); // State to hold questions
  const [activeUnit, setActiveUnit] = useState(1); // Track the active unit, default is Unit 1

  // Function to fetch questions based on unit
  const fetchQuestions = async (unit) => {
    try {
      const response = await fetch(`https://deployment-2-99do.onrender.com/unit-${unit}-questions`); // Fetch unit-specific questions
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data = await response.json();
      setQuestions(data);
      setActiveUnit(unit); // Set the clicked unit as active
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Fetch questions for Unit 1 by default
  useEffect(() => {
    fetchQuestions(1);
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
                <h1 className="text-2xl w-full font-bold mb-4">Questions and Answers</h1>

                {/* Unit navigation buttons */}
                <div className="flex justify-between mt-8 w-full space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <button
                      key={i}
                      className={clsx(
                        'flex-1 px-4 py-2 rounded-md shadow hover:bg-slate-700', // Default button styles
                        activeUnit === i + 1 ? 'bg-violet-500' : 'bg-slate-400', // Active unit styling
                        'text-white'
                      )}
                      onClick={() => fetchQuestions(i + 1)} // Fetch questions for the clicked unit
                    >
                      Unit {i + 1}
                    </button>
                  ))}
                </div>

                {/* Display questions */}
                <div className="space-y-4 mt-6">
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
