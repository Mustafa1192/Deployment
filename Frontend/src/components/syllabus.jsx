import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../Navigations/Sidebar';
import Header from '../Navigations/Header';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

function UnitDetail() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [syllabusData, setSyllabusData] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pdfFile, setPdfFile] = useState('');
  const navigate = useNavigate();

  // Fetch the syllabus data from backend
  useEffect(() => {
    const fetchSyllabusData = async () => {
      try {
        const response = await fetch('http://localhost:5000/syllabus');
        const data = await response.json();
        setSyllabusData(data);
      } catch (error) {
        console.error("Error fetching syllabus data:", error);
      }
    };

    fetchSyllabusData();
  }, []);

  // Handle the subject selection
  const handleUnitSelect = (unitId) => {
    const unit = syllabusData.units.find((unit) => unit.id === unitId);
    setSelectedUnit(unit);
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
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-gray-800 mb-4">Select the Semester 6 Subject</h1>
              {/* Unit Selection */}
              <div className="flex space-x-4 mb-8">
                {syllabusData && syllabusData.units.map((unit) => (
                  <button
                    key={unit.id}
                    className="flex-1 px-4 py-2 rounded-md shadow hover:bg-violet-500"
                    onClick={() => handleUnitSelect(unit.id)}
                  >
                    {unit.title}
                  </button>
                ))}
              </div>

              {/* Display selected unit and its subjects */}
              {selectedUnit ? (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Subject: {selectedUnit.title}</h2>
                  {selectedUnit.subjects.map((subject) => (
                    <div key={subject.id} className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-800">{subject.name}</h3>                 
                      
                      {/* Display question images */}
                      {subject.questionImages && (
                        
                        <div className="grid grid-cols-2 gap-4">
                          {subject.questionImages.map((imgUrl, index) => (
                            <img key={index} src={imgUrl} alt={`Question ${index + 1}`} className="rounded-lg shadow-md" />
                          ))}
                        </div>
                      )}

                      {/* Important Question & Answers Button */}
                      <div className="flex justify-around mt-8">
                        {Array.from({ length: 1 }, (_, i) => (
                          <button
                            key={i}
                            className="px-4 py-2 bg-violet-500 text-white rounded-md shadow hover:bg-violet-700"
                            onClick={() => navigate('/try')}
                          >
                            View Important Questions with Answers
                          </button>
                        ))}
                      </div>
                    </div>                    
                  ))}
                </div>
              ) : (
                <div className="text-gray-600">Please select a subject to view its details.</div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UnitDetail;
