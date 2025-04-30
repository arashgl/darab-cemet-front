import Footer from "@/components/Footer";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { parseImageURL } from "@/lib/parseImageURL";

interface BlogPost {
  id: string;
  title: string;
  summary?: string;
  leadPicture?: string;
  content?: string;
  section?: string;
  createdAt?: string;
  updatedAt?: string;
  author?: {
    name: string;
    avatar?: string;
  };
}

interface BlogPostsResponse {
  data: BlogPost[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}

async function getBlogPosts(): Promise<BlogPostsResponse> {
  try {
    // Check if URL is properly defined
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const url = `${apiUrl}/posts?section=blog`;

    // Fetch from your backend with blog section filter
    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { data: [], meta: { totalItems: 0, totalPages: 1, currentPage: 1 } };
  }
}

// Format date to Persian format
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    // You can implement Persian date formatting here
    // For now, just returning a simple format
    return date.toLocaleDateString("fa-IR");
  } catch {
    return "تاریخ نامشخص";
  }
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

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
            <h6 className="text-base font-normal active mb-0">بلاگ</h6>
          </div>
        </div>

        {/* Banner Image */}
        <div className="img-box mt-4">
          <Image
            src="/assets/images/blog-banner.svg"
            alt="Blog Banner"
            width={1920}
            height={400}
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </div>

        {/* Blog Posts Section */}
        <div className="container info-section">
          <h1 className="text-5xl font-semibold color-primary text-center mt-5">
            بلاگ سیمان داراب
          </h1>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.data && blogPosts.data.length > 0 ? (
              blogPosts.data.map((post) => (
                <div
                  key={post.id}
                  className="blog-card bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                >
                  <div className="blog-image relative h-48">
                    <Image
                      src={
                        parseImageURL(post.leadPicture) ||
                        "/assets/images/blog-default.jpg"
                      }
                      alt={post.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-t-md"
                    />
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="mb-3 text-sm color-info">
                      {post.createdAt && (
                        <span>{formatDate(post.createdAt)}</span>
                      )}
                      {post.author?.name && (
                        <>
                          <span className="mx-2">|</span>
                          <span>{post.author.name}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold color-primary mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm color-info flex-grow line-clamp-3 mb-4">
                      {post.summary || "توضیحات مقاله در دسترس نیست."}
                    </p>
                    <Link
                      href={`/blog/${post.id}`}
                      className="btn btn-primary text-center w-full mt-auto"
                    >
                      مطالعه بیشتر
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-xl color-info">مقاله‌ای یافت نشد.</p>
              </div>
            )}
          </div>

          {/* Pagination can be added here */}
        </div>
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  );
}
