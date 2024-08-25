"use client";

import { useQuery } from "@tanstack/react-query";
import provider from "../providers/api";
import { getCategoriesKey } from "./keys";

const useGeCategories = () => {
  const request = async () => {
    const response = await provider.get<string[]>("products/categories");
    return response.data;
  };
  return useQuery({
    queryKey: getCategoriesKey,
    queryFn: request,
  });
};

export default useGeCategories;
