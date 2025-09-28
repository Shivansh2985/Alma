import React from 'react';
import { Search } from 'lucide-react';

export default function PromptSearch({ prompt, setPrompt, onSearch }) {
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSearch} className="mt-8">
      <h2 className="text-xl font-bold tracking-tight text-gray-900">AI-Powered Search</h2>
      <p className="mt-1 text-gray-600">
        Use natural language to search for alumni. For example: "Kavya Tiwari from batch 2027".
      </p>
      <div className="mt-4 flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your search prompt..."
            className="w-full rounded-md border-gray-300 py-2 pl-10 pr-4 shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-primary px-6 py-2 font-semibold text-black shadow-sm hover:bg-opacity-90"
        >
          Search
        </button>
      </div>
    </form>
  );
}
