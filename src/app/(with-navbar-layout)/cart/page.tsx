"use client";

import Image from "next/image";
import { formatPrice } from "@/app/utils/formatters";
import { useCart } from "@/app/context/cart";
import { Product } from "@/app/shared/types/product";
import { ArrowLeft, Trash2 } from "react-feather";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { products, updateProduct, deleteProduct } = useCart();

  const handleCheckout = () => {};

  const handleQuantityChange = (product: Product) => {
    updateProduct(product);
  };

  const handleDeleteProduct = (productId: number) => {
    deleteProduct(productId);
  };

  const totalAmount = products.reduce(
    (total, item) => total + item.price * (item.quantity || 0),
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-4 mt-8">
      <button
        onClick={router.back}
        className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
      >
        <ArrowLeft size={20} className="mr-2" />
        Voltar
      </button>
      <h1 className="text-3xl font-bold mb-4">Carrinho de Compras</h1>
      {products.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          {products.map((item) => (
            <div key={item.id} className="flex items-center mb-4 border-b pb-4">
              <div className="w-24 h-24 relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  className="object-contain"
                />
              </div>
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-sm text-gray-500">
                  {item.category} - {item.rating.rate} ★
                </p>
                <p className="text-gray-700">{formatPrice(item.price)}</p>
                <div className="flex items-center mt-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange({
                        ...item,
                        quantity: Number(e.target.value),
                      })
                    }
                    min="1"
                    className="w-16 p-2 text-center border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <button
                onClick={() => handleDeleteProduct(item.id)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          <div className="text-right mt-8">
            <p className="text-xl font-bold">
              Total: {formatPrice(totalAmount)}
            </p>
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
