"use client";

import { useQuery } from "@tanstack/react-query";
import provider from "../providers/api";
import { Product, Sort } from "../shared/types/product";
import { formatQueryString } from "../utils/formatters";
import { getProductsKey } from "./keys";

const useGetProducts = (category: string, sort: Sort | null) => {
  const request = async () => {
    const query = !!sort ? formatQueryString({ sort }) : "";
    const url =
      category !== "Todas"
        ? `products/category/${category}?${query}`
        : `products?${query}`;
    const response = await provider.get<Product[]>(url);
    return response.data;
  };
  return useQuery({
    queryKey: getProductsKey([category, ...(sort ? [sort] : [])]),
    queryFn: request,
  });
};

export default useGetProducts;
