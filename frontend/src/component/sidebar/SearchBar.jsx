import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'; // Import search icon

const SearchBar = () => {
  return (
    <form className="flex items-center gap-2">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered w-full rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      {/* Search Button */}
      <button
        type="submit"
        className="btn btn-circle bg-sky-500 text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        <MagnifyingGlassIcon className="w-5 h-5" />
      </button>
    </form>
  );
};

export default SearchBar;