import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Navigations/Sidebar';
import Header from '../Navigations/Header';

function Member() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  // Structure your data for subjects
  const semesters = [
    {
      id: 1,
      title: "Semester 1",
      units: [
        {
          id: 1,
          title: "Subjects",
          subjects: [
            { id: 1, name: "BIDA", syllabus: "Mathematics I syllabus content here..." },
            { id: 2, name: "Programming Fundamentals", syllabus: "Programming syllabus content here..." },
            { id: 3, name: "Digital Logic", syllabus: "Digital Logic syllabus content here..." },
            { id: 4, name: "Data Structures", syllabus: "Data Structures syllabus content here..." },
            { id: 5, name: "Operating Systems", syllabus: "Operating Systems syllabus content here..." },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Semester 2",
      units: [
        {
          id: 1,
          title: "Subjects",
          subjects: [
            { id: 1, name: "Mathematics II", syllabus: "Mathematics II syllabus content here..." },
            { id: 2, name: "Data Structures", syllabus: "Data Structures syllabus content here..." },
            { id: 3, name: "Operating Systems", syllabus: "Operating Systems syllabus content here..." },
            { id: 4, name: "Database Management", syllabus: "Database Management syllabus content here..." },
            { id: 5, name: "Computer Networks", syllabus: "Computer Networks syllabus content here..." },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Semester 3",
      units: [
        {
          id: 1,
          title: "Subjects",
          subjects: [
            { id: 1, name: "Mathematics II", syllabus: "Mathematics II syllabus content here..." },
            { id: 2, name: "Data Structures", syllabus: "Data Structures syllabus content here..." },
            { id: 3, name: "Operating Systems", syllabus: "Operating Systems syllabus content here..." },
            { id: 4, name: "Database Management", syllabus: "Database Management syllabus content here..." },
            { id: 5, name: "Computer Networks", syllabus: "Computer Networks syllabus content here..." },
          ],
        },
      ],
    },
    {
      id: 4,
        title: "Semester 4",
        units: [
          {
            id: 1,
            title: "Subjects",
            subjects: [
              { id: 1, name: "BIDA", syllabus: "Mathematics I syllabus content here..." },
              { id: 2, name: "Programming Fundamentals", syllabus: "Programming syllabus content here..." },
              { id: 3, name: "Digital Logic", syllabus: "Digital Logic syllabus content here..." },
              { id: 4, name: "Data Structures", syllabus: "Data Structures syllabus content here..." },
              { id: 5, name: "Operating Systems", syllabus: "Operating Systems syllabus content here..." },
            ],
          },
        ],
      },
      {
        id: 5,
        title: "Semester 5",
        units: [
          {
            id: 1,
            title: "Subjects",
            subjects: [
              { id: 1, name: "Mathematics II", syllabus: "Mathematics II syllabus content here..." },
              { id: 2, name: "Data Structures", syllabus: "Data Structures syllabus content here..." },
              { id: 3, name: "Operating Systems", syllabus: "Operating Systems syllabus content here..." },
              { id: 4, name: "Database Management", syllabus: "Database Management syllabus content here..." },
              { id: 5, name: "Computer Networks", syllabus: "Computer Networks syllabus content here..." },
            ],
          },
        ],
      },
      {
        id: 6,
        title: "Semester 6",
        units: [
          {
            id: 1,
            title: "Subjects",
            subjects: [
              { id: 1, name: "BIDA", syllabus: "BIDA syllabus content here..." },
              { id: 2, name: "GIS", syllabus: "GIS content here..." },
              { id: 3, name: "STQA", syllabus: "STQA syllabus content here..." },
              { id: 4, name: "ITSM", syllabus: "ITSM syllabus content here..." },
              { id: 5, name: "IS", syllabus: "IS syllabus content here..." },
            ],
          },
        ],
      },
    // Add other semesters...
  ];

  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <main className="grow bg-[#F4F5F7]">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="max-w-screen-lg mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Semester Cards</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {semesters.map((semester) => (
                  <div
                    key={semester.id}
                    className="border rounded-lg shadow-lg bg-white transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800">{semester.title}</h2>
                      <button
                        onClick={() => handleExpand(semester.id)}
                        aria-expanded={expanded === semester.id}
                        className="text-indigo-600 font-medium mt-2 focus:outline-none hover:underline"
                      >
                        {expanded === semester.id ? "Collapse" : "Expand"}
                      </button>
                    </div>
                    <div
                      className={`transition-all duration-300 overflow-hidden ${
                        expanded === semester.id ? "max-h-screen" : "max-h-0"
                      }`}
                    >
                      {expanded === semester.id && (
                        <div className="p-4 bg-gray-50">
                          {semester.units.map((unit) => (
                            <div key={unit.id} className="mb-4">
                              <h3 className="font-semibold text-gray-700">{unit.title}</h3>
                              <ul className="space-y-2 mt-2">
                                {unit.subjects.map((subject) => (
                                  <li
                                    key={subject.id}
                                    className="text-gray-600 text-sm border-b pb-2 last:border-b-0"
                                  >
                                    <button
                                      onClick={() => navigate(`/syllabus/${semester.id}/${unit.id}/${subject.id}`)}
                                      className="hover:text-indigo-600"
                                    >
                                      {subject.name}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Member;
