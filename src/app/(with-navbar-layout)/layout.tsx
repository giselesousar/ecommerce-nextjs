import Link from "next/link";
import { ShoppingCart } from "react-feather";
import { Search } from "../components";

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            E-commerce
          </span>

          <div className="flex-grow flex justify-center items-center">
            <Search />
          </div>

          <div className="flex md:order-2">
            <Link
              href={"/cart"}
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            >
              <ShoppingCart size={30} />
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
