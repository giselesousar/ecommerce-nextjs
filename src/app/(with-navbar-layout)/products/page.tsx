"use client";

import { useState } from "react";
import { Loading, ProductCard, ProductsFilters } from "@/app/components";
import useGetProducts from "@/app/services/use-get-products";
import { Sort } from "@/app/components/products-filters";

export default function Products() {
  const [category, setCategory] = useState("Todas");
  const [sort, setSort] = useState<Sort | null>(null);

  const { data, isLoading } = useGetProducts(category, sort);

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductsFilters
        category={category}
        sort={sort}
        onCategoryChange={setCategory}
        onSortChange={setSort}
      />
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(data || []).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
}
