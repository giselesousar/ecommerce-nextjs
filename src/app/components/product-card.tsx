import Link from "next/link";
import Image from "next/image";
import { Product } from "../shared/types/product";
import { formatPrice } from "../utils/formatters";

export default function ProductCard({
  id,
  title,
  image,
  category,
  price,
}: Product) {
  return (
    <Link
      href={`/products/${id}`}
      className="block transform transition-all duration-300 hover:scale-105 hover:shadow-lg max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-3"
    >
      <Image
        className="object-contain w-full h-48"
        src={image}
        alt={title}
        height={150}
        width={150}
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {category}
        </p>
        <p className="mb-3 font-bold text-gray-900">{formatPrice(price)}</p>
      </div>
    </Link>
  );
}
