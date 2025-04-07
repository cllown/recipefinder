'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [maxReadyTime, setMaxReadyTime] = useState('');
  const router = useRouter();

  const handleNext = () => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (cuisine) params.append('cuisine', cuisine);
    if (maxReadyTime) params.append('maxReadyTime', maxReadyTime);

    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 text-black">
      <h1 className="text-4xl font-bold mb-10">Recipe Finder 🍽️</h1>

      <div className="flex flex-col gap-5 w-full max-w-md">
        {/* Query Input */}
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-3 border rounded-md shadow-sm"
        />

        {/* Cuisine Select */}
        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="p-3 border rounded-md shadow-sm"
        >
          <option value="">Select Cuisine</option>
          <option value="italian">Italian</option>
          <option value="chinese">Chinese</option>
          <option value="mexican">Mexican</option>
          <option value="indian">Indian</option>
          <option value="french">French</option>
        </select>

        {/* Max Ready Time */}
        <input
          type="number"
          placeholder="Max Ready Time (minutes)"
          value={maxReadyTime}
          onChange={(e) => setMaxReadyTime(e.target.value)}
          className="p-3 border rounded-md shadow-sm"
        />

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!query && !cuisine && !maxReadyTime}
          className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
