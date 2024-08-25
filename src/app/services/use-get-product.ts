import { useQuery } from "@tanstack/react-query";
import provider from "../providers/api";
import { Product } from "../shared/types/product";
import { getProductKey } from "./keys";

const useGetProduct = (id: number) => {
  const request = async () => {
    const response = await provider.get<Product>(`products/${id}`);
    return response.data;
  };
  return useQuery({
    queryKey: getProductKey(id),
    queryFn: request,
  });
};

export default useGetProduct;
