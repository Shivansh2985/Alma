import React from "react";
import { Search, Filter } from "lucide-react";

const SearchFilter = ({ searchQuery, onSearchChange, selectedCategory, onCategoryChange, selectedDate, onDateChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="flex flex-1 items-center rounded-lg bg-gray-50 px-3 py-2">
        <Search className="mr-2 h-5 w-5 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Events..."
          className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 outline-none"
        />
      </div>
      <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)} className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary">
        <option value="all">All Categories</option>
        <option value="tech">Tech</option>
        <option value="marketing">Marketing</option>
        <option value="design">Design</option>
        <option value="networking">Networking</option>
        <option value="cultural">Cultural</option>
        <option value="business">Business</option>
      </select>
      <select value={selectedDate} onChange={(e) => onDateChange(e.target.value)} className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary">
        <option value="all">All Dates</option>
        <option value="upcoming">Upcoming</option>
        <option value="past">Past</option>
      </select>
    </div>
  );
};

export default SearchFilter;
