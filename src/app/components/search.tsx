"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search as SearchIcon } from "react-feather";
import useDebounce from "../hooks/use-debounce";
import useGetProducts from "../services/use-get-products";
import { Product } from "../shared/types/product";

export default function Search() {
  const { data, isLoading } = useGetProducts("Todas", null);

  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debouncedQuery) {
      const filteredProducts =
        data?.filter((product) =>
          product.title.toLowerCase().includes(debouncedQuery.toLowerCase())
        ) || [];
      setFiltered(filteredProducts);
    } else {
      setFiltered([]);
    }
  }, [debouncedQuery, data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputFocus = () => setDropdownOpen(true);

  const handleProductClick = (productId: number) => {
    setDropdownOpen(false);
  };

  return (
    <div className="relative w-2/3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        id="search-navbar"
        onFocus={handleInputFocus}
        ref={inputRef}
        className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Pesquisar..."
      />
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-500">
        <SearchIcon size={20} />
      </div>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 p-2 shadow-lg"
        >
          {isLoading && <p className="text-gray-500">Carregando...</p>}

          {filtered.length > 0 ? (
            filtered.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                onClick={() => handleProductClick(product.id)}
                className="block p-2 hover:bg-gray-100"
              >
                {product.title}
              </Link>
            ))
          ) : (
            <p className="text-gray-500">Nenhum produto encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
}
