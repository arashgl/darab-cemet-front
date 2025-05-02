import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { RiArrowLeftSLine } from "react-icons/ri";
import BlogCard from "./components/BlogCard";
import TagFilter from "./components/TagFilter";
import Pagination from "./components/Pagination";

// Sections from backend
export enum PostSection {
  OCCASIONS = "مناسبت ها",
  ANNOUNCEMENTS = "اطلاعیه ها",
  NEWS = "اخبار ها",
  ACHIEVEMENTS = "افتخارات",
}

// Default section to display
const DEFAULT_SECTION = PostSection.NEWS;

interface BlogPost {
  id: string;
  title: string;
  summary?: string;
  leadPicture?: string;
  content?: string;
  section?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
}

interface BlogPostsResponse {
  data: BlogPost[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}

// Server-side data fetching
async function getBlogPosts(
  page: number = 1,
  limit: number = 9,
  section?: PostSection,
  title?: string,
  tags?: string[]
): Promise<BlogPostsResponse> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    // Build query params
    const params = new URLSearchParams();
    if (section) {
      params.append("section", section);
    }
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    if (title) params.append("title", title);
    if (tags && tags.length > 0) params.append("tags", tags.join(","));

    const url = `${apiUrl}/posts?${params.toString()}`;

    console.log(`Fetching blog posts from: ${url}`);

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate cache every hour
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch blog posts: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { data: [], meta: { totalItems: 0, totalPages: 1, currentPage: 1 } };
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    search?: string;
    tags?: string;
    section?: string;
  };
}) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const searchQuery = searchParams.search || "";
  const tagFilters = searchParams.tags ? searchParams.tags.split(",") : [];
  const sectionFilter =
    (searchParams.section as PostSection) || DEFAULT_SECTION;

  // Fetch blog posts with filters
  const blogPosts = await getBlogPosts(
    currentPage,
    9,
    sectionFilter,
    searchQuery || undefined,
    tagFilters.length > 0 ? tagFilters : undefined
  );

  // Extract all unique tags from posts for filter options
  const allTags = Array.from(new Set<string>());
  blogPosts.data.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => allTags.includes(tag) || allTags.push(tag));
    }
  });

  // Get all available sections
  const sections = Object.values(PostSection);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Site header with higher z-index */}
      <div className="relative z-50">
        <Navbar />
      </div>

      <main className="relative">
        {/* Hero Section - Compact version */}
        <section className="relative bg-gradient-to-r from-[#F25822] to-[#676767] py-6 text-white border-b border-[#e34918] shadow-md">
          <div className="absolute inset-0 opacity-10"></div>
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1" dir="rtl">
                  وبلاگ
                </h1>
                <p className="text-sm text-white/90" dir="rtl">
                  آخرین اخبار و مقالات در حوزه صنعت سیمان
                </p>
              </div>

              {/* Search */}
              {/* <BlogSearch initialQuery={searchQuery} className="mt-4 md:mt-0" /> */}
            </div>
          </div>
        </section>

        {/* Filters and Blog Posts */}
        <section className="container mx-auto px-4 py-6">
          {/* Filters */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2
              className="text-lg font-semibold mb-3 text-right text-gray-800"
              dir="rtl"
            >
              فیلتر بر اساس:
            </h2>

            {/* Section filter */}
            <div className="mb-4" dir="rtl">
              <h3 className="text-sm font-medium mb-2 text-gray-700">بخش:</h3>
              <div className="flex flex-wrap gap-2">
                {sections.map((section) => (
                  <Link
                    key={section}
                    href={`/blog?section=${encodeURIComponent(section)}`}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      sectionFilter === section
                        ? "bg-[#F25822] text-white font-medium shadow-sm ring-1 ring-[#e34918]"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                    }`}
                  >
                    {section}
                  </Link>
                ))}
              </div>
            </div>

            {/* Tag filter */}
            {allTags.length > 0 && (
              <div dir="rtl">
                <h3 className="text-sm font-medium mb-2 text-gray-700">
                  برچسب‌ها:
                </h3>
                <TagFilter tags={allTags} activeTags={tagFilters} />
              </div>
            )}
          </div>

          {/* Results info */}
          <div className="flex justify-between items-center mb-4 px-2">
            <p className="text-sm text-gray-600 font-medium" dir="rtl">
              {blogPosts.meta.totalItems} مقاله یافت شد
              {searchQuery && ` برای "${searchQuery}"`}
              {sectionFilter && ` در بخش "${sectionFilter}"`}
              {tagFilters.length > 0 && ` با برچسب ${tagFilters.join(", ")}`}
            </p>
          </div>

          {/* Blog posts grid */}
          {blogPosts.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {blogPosts.data.map((post) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  summary={post.summary}
                  leadPicture={post.leadPicture}
                  createdAt={post.createdAt}
                  description={post.description}
                  tags={post.tags}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
                <RiArrowLeftSLine className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2" dir="rtl">
                مقاله‌ای یافت نشد
              </h3>
              <p className="text-gray-600 mb-4 text-sm" dir="rtl">
                با جستجوی عبارت‌های دیگر یا حذف فیلترها دوباره تلاش کنید.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-4 py-2 text-sm border border-transparent font-medium rounded-md text-white bg-[#F25822] hover:bg-[#e34918] shadow-sm"
                dir="rtl"
              >
                مشاهده همه مقالات
              </Link>
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={blogPosts.meta.currentPage}
            totalPages={blogPosts.meta.totalPages}
          />
        </section>
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  );
}
