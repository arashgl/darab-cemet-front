import Footer from "@/components/Footer";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  summary?: string;
  leadPicture?: string;
  content?: string;
  section?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductsResponse {
  data: Product[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}

async function getProducts(): Promise<ProductsResponse> {
  try {
    // Check if URL is properly defined
    const apiUrl = process.env.API_URL || "http://localhost:3100";
    const url = `${apiUrl}/posts?section=product`;

    // Fetch from your backend with product section filter
    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return { data: [], meta: { totalItems: 0, totalPages: 1, currentPage: 1 } };
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <Navbar />

      <main>
        {/* Breadcrumb */}
        <div className="breadcrumb-page w-100 p-2 mt-4 py-3">
          <div className="d-flex align-items-center container gap-4">
            <h6 className="text-base font-normal mb-0 title">صفحه اصلی</h6>
            <span>
              <Image
                src="/assets/icons/arrow-left.svg"
                alt="arrow"
                width={16}
                height={16}
              />
            </span>
            <h6 className="text-base font-normal active mb-0">محصولات</h6>
          </div>
        </div>

        {/* Banner Image */}
        <div className="img-box mt-4">
          <Image
            src="/assets/images/product-banner.svg"
            alt="Product Banner"
            width={1920}
            height={400}
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </div>

        {/* Products Information Section */}
        <div className="container info-section">
          <h1 className="text-5xl font-semibold color-primary text-center mt-5">
            محصولات سیمان داراب
          </h1>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.data && products.data.length > 0 ? (
              products.data.map((product) => (
                <div
                  key={product.id}
                  className="product-card bg-white rounded-lg shadow-md p-5 flex flex-col"
                >
                  <div className="product-image relative h-48 mb-4">
                    <Image
                      src={
                        product.leadPicture ||
                        "/assets/images/product-default.jpg"
                      }
                      alt={product.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-md"
                    />
                  </div>
                  <h3 className="text-xl font-semibold color-primary mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm color-info flex-grow line-clamp-3 mb-4">
                    {product.summary || "توضیحات محصول در دسترس نیست."}
                  </p>
                  <Link
                    href={`/product/${product.id}`}
                    className="btn btn-primary text-center w-full"
                  >
                    مشاهده جزئیات
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-xl color-info">محصولی یافت نشد.</p>
              </div>
            )}
          </div>

          {/* Pagination can be added here */}

          {/* Download Catalog Button */}
          <button className="btn btn-primary gap-3 mx-auto mt-12 mb-8 custom-btn">
            <Image
              src="/assets/icons/document.svg"
              alt="document"
              width={24}
              height={24}
            />
            دریافت و مشاهده کاتالوگ محصولات تولیدی شرکت سیمان داراب
          </button>
        </div>
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  );
}
