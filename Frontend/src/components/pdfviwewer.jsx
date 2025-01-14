// PdfPreviewer.js
import React, { useState } from "react";
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

function PdfPreviewer() {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(URL.createObjectURL(file));
    }
  };

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 min-h-screen">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">PDF Previewer</h1>
        <input
          type="file"
          accept="application/pdf"
          onChange={onFileChange}
          className="block w-full text-sm text-gray-700 mb-4 p-2 border border-gray-300 rounded-md"
        />
        
        {pdfFile && (
          <div className="space-y-6">
            <Document file={pdfFile} onLoadSuccess={onLoadSuccess}>
              <Page pageNumber={pageNumber} className="mx-auto" />
            </Document>

            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={goToPrevPage}
                disabled={pageNumber === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
              >
                Previous
              </button>
              <span className="text-lg font-medium">
                Page {pageNumber} of {numPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={pageNumber === numPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {!pdfFile && <p className="text-center text-gray-500">No PDF file selected.</p>}
      </div>
    </div>
  );
}

export default PdfPreviewer;

