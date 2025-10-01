"use client";

import { useState } from "react";
import { z } from "zod";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

const searchSchema = z.string().max(100, "Le titre recherché est trop long.");

const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleCHange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const result = searchSchema.safeParse(value);

    if (result.success) {
      setError(null);
      setSearch(value);
    } else {
      setError(result.error.message); // TODO
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Chercher un titre..."
        value={search}
        onChange={handleCHange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SearchBar;
