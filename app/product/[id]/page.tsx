import Footer from "@/components/Footer";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { notFound } from "next/navigation";

// Client-side interactive component
import ProductTabs from "../components/ProductTabs";

interface Product {
  id: string;
  title: string;
  content?: string;
  leadPicture?: string;
  section?: string;
  introduction?: string;
  features?: string[];
  benefits?: string[];
  applications?: string[];
}

interface GetProductParams {
  params: {
    id: string;
  };
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    // Check if URL is properly defined
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const url = `${apiUrl}/posts/${id}`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch product");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Process the product content to extract sections
function processProductContent(product: Product): Product {
  // If no content, return the product as is
  if (!product.content) return product;

  try {
    // Parse JSON content if it's in JSON format
    if (product.content.startsWith("{") && product.content.endsWith("}")) {
      const contentData = JSON.parse(product.content);
      return {
        ...product,
        introduction: contentData.introduction,
        features: contentData.features,
        benefits: contentData.benefits,
        applications: contentData.applications,
      };
    }

    // For plain text content, you can add custom parsing logic here
    // This is just a placeholder for text-based parsing
    return {
      ...product,
      introduction: product.content,
      features: [],
      benefits: [],
      applications: [],
    };
  } catch (error) {
    console.error("Error parsing product content:", error);
    return product;
  }
}

export default async function ProductPage({ params }: GetProductParams) {
  // In Next.js 15, params is async and must be awaited before accessing properties
  const unwrappedParams = await params;
  const id = unwrappedParams.id;

  const product = await getProduct(id);

  // If product not found, show 404 page
  if (!product) {
    notFound();
  }

  // Process content to extract sections if needed
  const processedProduct = processProductContent(product);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <Navbar />

      <main>
        {/* Breadcrumb */}
        <div className="breadcrumb-page w-100 p-2 mt-4 py-3">
          <div className="d-flex align-items-center container gap-4">
            <h6 className="text-base font-normal mb-0 title">صفحه اصلی</h6>
            <Link href="/product">
              <h6 className="text-base font-normal mb-0">محصولات</h6>
            </Link>
            <span>
              <Image
                src="/assets/icons/arrow-left.svg"
                alt="arrow"
                width={16}
                height={16}
              />
            </span>
            <h6 className="text-base font-normal active mb-0">
              {processedProduct.title}
            </h6>
          </div>
        </div>

        {/* Banner Image */}
        <div className="img-box mt-4">
          <Image
            src={
              processedProduct.leadPicture ||
              "/assets/images/product-banner.svg"
            }
            alt={processedProduct.title}
            width={1920}
            height={400}
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </div>

        {/* Product Information Section */}
        <div className="container info-section">
          <h1 className="text-5xl font-semibold color-primary text-center mt-5">
            {processedProduct.title}
          </h1>

          <div className="product-tabs-container mt-6" data-aos-delay="100">
            {/* Use client component for interactive tabs */}
            <ProductTabs product={processedProduct} />

            {/* Download Catalog Button */}
            <button className="btn btn-primary gap-3 mx-auto mt-5 mb-8 custom-btn">
              <Image
                src="/assets/icons/document.svg"
                alt="document"
                width={24}
                height={24}
              />
              دریافت و مشاهده کاتالوگ محصولات تولیدی شرکت سیمان داراب
            </button>
          </div>
        </div>
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  );
}

// Generate static metadata for the page
export async function generateMetadata({ params }: GetProductParams) {
  try {
    // In Next.js 15, params is async and must be awaited before accessing properties
    const unwrappedParams = await params;
    const id = unwrappedParams.id;

    // Validate the id before using it
    if (!id || typeof id !== "string") {
      throw new Error("Invalid product ID");
    }

    const product = await getProduct(id);

    if (!product) {
      return {
        title: "محصول یافت نشد | سیمان داراب",
        description: "محصول مورد نظر یافت نشد.",
      };
    }

    return {
      title: `${product.title} | سیمان داراب`,
      description:
        product.content?.substring(0, 160) || "جزئیات محصول سیمان داراب",
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "خطا | سیمان داراب",
      description: "خطا در بارگذاری محصول",
    };
  }
}
