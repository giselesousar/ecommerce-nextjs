"use client";

import { useState } from "react";
import { ArrowLeft } from "react-feather";
import useGetProduct from "@/app/services/use-get-product";
import { formatPrice } from "@/app/utils/formatters";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/app/context/cart";

export default function ProductPage({}) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data } = useGetProduct(Number(id));

  const { addProduct, isProductInCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  if (!data) {
    return null;
  }

  const handleAddToCart = () => {
    addProduct({ ...data, quantity });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <button
        onClick={router.back}
        className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
      >
        <ArrowLeft size={20} className="mr-2" />
        Voltar
      </button>

      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <Image
            src={data.image}
            alt={data.title}
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-8">
          <p className="text-xl text-gray-700 mb-4">
            {formatPrice(data.price)}
          </p>
          <p className="text-gray-700 mb-4">{data.description}</p>
          <p className="text-sm text-gray-500 mb-2">
            Categoria: {data.category}
          </p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500">{data.rating.rate} ★</span>
            <span className="text-sm text-gray-500 ml-2">
              ({data.rating.count} avaliações)
            </span>
          </div>
          <div>
            {isProductInCart(data.id) ? (
              <p className="text-md text-gray-500 mb-2">
                Produto adicionado ao carrinho
              </p>
            ) : (
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min="1"
                  className="w-16 p-2 text-center border border-gray-300 rounded-lg"
                />
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
