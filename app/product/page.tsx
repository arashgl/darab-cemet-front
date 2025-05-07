import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { parseImageURL } from "@/lib/parseImageURL";

export const metadata: Metadata = {
  title: "محصولات سیمان داراب",
  description: "مشاهده محصولات سیمان داراب",
};

interface Product {
  id: string;
  name: string;
  description: string;
  type: string;
  image: string;
  isActive: boolean;
}

interface ProductsResponse {
  items: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

async function getProducts(page = 1, limit = 9, search = "") {
  try {
    const res = await fetch(
      `${process.env.API_URL}/products?page=${page}&limit=${limit}${
        search ? `&search=${search}` : ""
      }`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("خطا در دریافت محصولات");
    }

    const data = await res.json();
    return data as ProductsResponse;
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      items: [],
      pagination: {
        total: 0,
        page: page,
        limit: limit,
        pages: 0,
      },
    };
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const searchParamsAwait = await searchParams;
  const currentPage =
    searchParamsAwait?.page !== undefined
      ? parseInt(searchParamsAwait.page)
      : 1;
  const searchQuery = searchParamsAwait?.search || "";
  const pageSize = 9;
  const productsData = await getProducts(currentPage, pageSize, searchQuery);
  const { items: products, pagination } = productsData;

  // Generate page numbers array for pagination
  const pageNumbers = [];
  for (let i = 1; i <= pagination.pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="relative z-50">
        <Navbar />
      </header>
      <main className="flex-grow">
        <div className="container mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">
            محصولات سیمان داراب
          </h1>

          {/* Search Form */}
          <div className="mb-10 max-w-md mx-auto">
            <form action="/product" method="get" className="flex">
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="جستجوی محصولات..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="px-6 py-2 !bg-orange-600 text-white rounded-l-lg hover:bg-orange-700 transition-colors"
              >
                جستجو
              </button>
            </form>
          </div>

          {searchQuery && (
            <div className="mb-6 text-center">
              <p className="text-gray-600">
                نتایج جستجو برای:{" "}
                <span className="font-semibold">{searchQuery}</span>{" "}
                <Link
                  href="/product"
                  className="text-orange-600 hover:underline"
                >
                  (پاک کردن)
                </Link>
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length === 0 ? (
              <p className="col-span-full text-center py-12 text-gray-500">
                محصولی یافت نشد.
              </p>
            ) : (
              products.map((product) => (
                <Link
                  href={`/product/${product.id}`}
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-60 w-full">
                    {product.image ? (
                      <Image
                        src={parseImageURL(product.image)}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain object-center p-4"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">بدون تصویر</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2 text-orange-600">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                        {product.type === "cement"
                          ? "سیمان"
                          : product.type === "concrete"
                          ? "بتن"
                          : "سایر"}
                      </span>
                      <span className="text-orange-600 text-sm font-medium">
                        مشاهده جزئیات
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-1">
                <Link
                  href={`/product?page=${Math.max(1, currentPage - 1)}${
                    searchQuery ? `&search=${searchQuery}` : ""
                  }`}
                  className={`px-4 py-2 rounded border ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                  aria-disabled={currentPage === 1}
                >
                  قبلی
                </Link>

                {pageNumbers.map((page) => (
                  <Link
                    key={page}
                    href={`/product?page=${page}${
                      searchQuery ? `&search=${searchQuery}` : ""
                    }`}
                    className={`px-4 py-2 rounded border ${
                      currentPage === page
                        ? "bg-orange-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </Link>
                ))}

                <Link
                  href={`/product?page=${Math.min(
                    pagination.pages,
                    currentPage + 1
                  )}${searchQuery ? `&search=${searchQuery}` : ""}`}
                  className={`px-4 py-2 rounded border ${
                    currentPage === pagination.pages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                  aria-disabled={currentPage === pagination.pages}
                >
                  بعدی
                </Link>
              </nav>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
