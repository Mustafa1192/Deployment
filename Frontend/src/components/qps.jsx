import React, { useState, useEffect } from 'react';

function Qps() {
  const [imageLinks, setImageLinks] = useState([]); // State to store fetched image links
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchImageLinks = async () => {
      try {
        const response = await fetch('http://localhost:5000/qps-links'); // Fetch image links from the API
        if (!response.ok) {
          throw new Error('Failed to fetch image links');
        }
        const data = await response.json();
        setImageLinks(data); // Set the fetched image links
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchImageLinks();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Question Paper Images</h1>
      {loading ? (
        <p className="text-gray-600">Loading images...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : imageLinks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {imageLinks.map((link, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-md">
              <img
                src={link}
                alt={`Question Paper ${index + 1}`}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No images found.</p>
      )}
    </div>
  );
}

export default Qps;
