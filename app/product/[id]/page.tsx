import Footer from "@/components/Footer";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { notFound } from "next/navigation";

// Client-side interactive component
import ProductTabs from "../components/ProductTabs";
import { parseImageURL } from "@/lib/parseImageURL";

interface Product {
  id: string;
  name: string;
  description: string;
  type: "cement" | "concrete" | "other";
  image: string;
  features: string[];
  advantages: string[];
  applications: string[];
  technicalSpecs: string[];
  createdAt: Date;
  updatedAt: Date;
  // Keep backwards compatibility with existing fields
  title?: string;
  content?: string;
  leadPicture?: string;
  // Additional fields for processed data
  introduction?: string;
  benefits?: string[];
}

interface GetProductParams {
  params: {
    id: string;
  };
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    // Check if URL is properly defined
    const apiUrl = process.env.API_URL || "http://localhost:3100";
    const url = `${apiUrl}/products/${id}`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch product");
    }

    const product = await response.json();

    // Ensure backwards compatibility
    if (!product.title && product.name) {
      product.title = product.name;
    }
    if (!product.leadPicture && product.image) {
      product.leadPicture = product.image;
    }
    if (!product.content && product.description) {
      product.content = product.description;
    }

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Process the product content to extract sections (if needed for legacy data)
function processProductContent(product: Product): Product {
  const result = { ...product };

  // If content is in JSON format, parse it (legacy support)
  if (
    product.content &&
    product.content.startsWith("{") &&
    product.content.endsWith("}")
  ) {
    try {
      const contentData = JSON.parse(product.content);
      result.introduction = contentData.introduction;
      result.features = product.features || contentData.features || [];
      result.benefits = product.advantages || contentData.benefits || [];
      result.applications =
        product.applications || contentData.applications || [];
      return result;
    } catch (error) {
      console.error("Error parsing product content:", error);
    }
  }

  // If we have structured data, use it directly
  result.introduction = product.description || product.content;
  result.features = product.features || [];
  result.benefits = product.advantages || [];
  result.applications = product.applications || [];
  return result;
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
    <div className="flex flex-col min-h-screen overflow-hidden bg-[#F8F8F8]">
      {/* Site header */}
      <Navbar />

      <main>
        {/* Breadcrumb */}
        <div className="breadcrumb-page w-full px-4 mt-4 py-3">
          <div className="flex items-center container gap-4">
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
              {processedProduct.title || processedProduct.name}
            </h6>
          </div>
        </div>

        {/* Banner background with faded image */}
        <div className="relative w-full h-[260px] md:h-[340px] flex items-center justify-center bg-[#F2F2F2] overflow-hidden mt-4">
          <Image
            src="/assets/images/bg.png"
            alt="background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="relative z-10 flex flex-col items-center justify-center w-full">
            <div className="w-[180px] md:w-[220px] mx-auto drop-shadow-xl">
              <Image
                src={
                  parseImageURL(processedProduct.image) ||
                  "/assets/images/product-banner.svg"
                }
                alt={processedProduct.title || processedProduct.name}
                width={220}
                height={300}
                className="object-contain mx-auto"
                priority
              />
            </div>
          </div>
        </div>

        {/* Product Information Section */}
        <div className="container max-w-3xl mx-auto bg-white rounded-xl shadow-sm mt-[-60px] md:mt-[-80px] p-6 md:p-10 z-20 relative border border-gray-100">
          <h1 className="text-2xl md:text-4xl font-bold text-[#E44D26] text-center mt-2 mb-2">
            {processedProduct.title || processedProduct.name}
          </h1>
          <div className="flex justify-center mb-4">
            <span className="block w-16 h-1 bg-[#E44D26] rounded-full"></span>
          </div>

          {processedProduct.type && (
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-1 rounded-full bg-orange-600 text-white text-sm">
                {processedProduct.type === "cement"
                  ? "سیمان"
                  : processedProduct.type === "concrete"
                  ? "بتن"
                  : "سایر"}
              </span>
            </div>
          )}

          <div className="product-tabs-container mt-6" data-aos-delay="100">
            {/* Use client component for interactive tabs */}
            <ProductTabs
              product={{
                title: processedProduct.title || processedProduct.name,
                introduction: processedProduct.introduction,
                features: processedProduct.features,
                benefits: processedProduct.benefits,
                applications: processedProduct.applications,
              }}
            />

            {/* Download Catalog Button */}
            <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#E44D26] text-white font-semibold text-base mx-auto mt-8 mb-2 shadow hover:bg-[#c43e1b] transition-colors">
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

    // Create a more descriptive meta description for SEO
    const description = product.description || product.content || "";
    const metaDescription =
      description.substring(0, 155) + (description.length > 155 ? "..." : "");

    return {
      title: `${product.name || product.title} | سیمان داراب`,
      description: metaDescription || "جزئیات محصول سیمان داراب",
      openGraph: {
        title: `${product.name || product.title} | سیمان داراب`,
        description: metaDescription,
        images:
          product.image || product.leadPicture
            ? [
                {
                  url: product.image || product.leadPicture,
                  width: 1200,
                  height: 630,
                  alt: product.name || product.title,
                },
              ]
            : undefined,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.name || product.title} | سیمان داراب`,
        description: metaDescription,
        images:
          product.image || product.leadPicture
            ? [product.image || product.leadPicture]
            : undefined,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "خطا | سیمان داراب",
      description: "خطا در بارگذاری محصول",
    };
  }
}
