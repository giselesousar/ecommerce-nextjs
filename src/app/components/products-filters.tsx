"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown } from "react-feather";
import useGetCategories from "../services/use-get-categories";

export type Sort = "asc" | "desc";

type ProductsFiltersProps = {
  category: string;
  sort: Sort | null;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: Sort | null) => void;
};

export default function ProductsFilters({
  category,
  sort,
  onCategoryChange,
  onSortChange,
}: ProductsFiltersProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { data } = useGetCategories();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryChange = (category: string) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  const handleSortChange = () => {
    if (!!sort) {
      if (sort === "asc") {
        onSortChange("desc");
      } else {
        onSortChange(null);
      }
    } else {
      onSortChange("asc");
    }
  };

  if (!data) {
    return null;
  }

  return (
    <div className="flex items-center space-x-4 mb-8">
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
        >
          <span>{category}</span>
          <ChevronDown size={20} />
        </button>

        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10"
          >
            <ul>
              {["Todas", ...data].map((category) => (
                <li
                  key={category}
                  className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={handleSortChange}
        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 flex items-center space-x-2"
      >
        <span>Ordenar</span>
        {sort === null ? null : sort === "asc" ? (
          <ChevronDown size={20} />
        ) : (
          <ChevronUp size={20} />
        )}
      </button>
    </div>
  );
}
