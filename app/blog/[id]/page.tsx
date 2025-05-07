import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";
import CommentList from "./components/CommentList";
import CommentForm from "./components/CommentForm";
import BlogPostContent from "@/components/BlogPostContent";
import RelatedPosts from "@/components/RelatedPosts";
import RatingStars from "@/components/RatingStars";
import Breadcrumbs from "@/components/Breadcrumbs";
import { FaShareAlt } from "react-icons/fa";

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  rating: number;
  createdAt: string;
}

interface BlogPost {
  id: string;
  title: string;
  content?: string;
  leadPicture?: string;
  section?: string;
  createdAt?: string;
  updatedAt?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
  readingTime?: number;
  comments?: Comment[];
  averageRating?: number;
  totalRatings?: number;
}

interface GetBlogPostParams {
  params: {
    id: string;
  };
}

async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    // Check if URL is properly defined
    const apiUrl = process.env.API_URL || "http://localhost:3100";
    const url = `${apiUrl}/posts/${id}`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch blog post");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

async function getRelatedPosts(
  currentPostId: string,
  tags?: string[],
  section?: string
): Promise<BlogPost[]> {
  // If no tags, can't find related posts
  if (!tags || tags.length === 0) {
    return [];
  }
  console.log(section, "<<");
  try {
    // Check if URL is properly defined
    const apiUrl = process.env.API_URL || "http://localhost:3100";

    // Create a query with the tags - properly encode the tags
    const tagsQuery = encodeURIComponent(tags.join(","));
    const url = `${apiUrl}/posts?section=${section}&tags=${tagsQuery}&limit=3`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch related posts");
    }

    const data = await response.json();

    // Filter out the current post
    return data.data.filter((post: BlogPost) => post.id !== currentPostId);
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

export default async function BlogPostPage({ params }: GetBlogPostParams) {
  // In Next.js 15, params is now async and must be awaited before accessing properties
  const unwrappedParams = await params;
  const id = unwrappedParams.id;

  const post = await getBlogPost(id);

  // If post not found, show a 404 page
  if (!post) {
    notFound();
  }

  // Get related posts based on tags
  const relatedPosts = await getRelatedPosts(post.id, post.tags, post.section);

  // Get comment count

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gray-50">
      <Navbar />
      {/* Top bar: Breadcrumbs, Rating, Share */}
      <div
        className="bg-gray-100 py-2 px-4 flex flex-col md:flex-row md:items-center gap-y-2 md:gap-y-0 gap-x-4 rounded-b-lg"
        dir="rtl"
      >
        <div className="flex-1 flex items-start md:items-center gap-2 md:gap-6 w-full md:w-auto">
          <Breadcrumbs
            items={[
              { label: "صفحه اصلی", href: "/" },
              {
                label: post.section || "اخبار",
                href: post.section ? `/blog?section=${post.section}` : "/blog",
              },
            ]}
            current={post.title}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-gray-700 text-base font-medium">
            {(post.averageRating || 0).toFixed(1)}/5
          </span>
          <RatingStars rating={post.averageRating || 0} />
        </div>
        <div className="flex items-center gap-1 text-gray-700 cursor-pointer w-full md:w-auto">
          <FaShareAlt className="text-orange-500" size={22} />
          <span className="text-sm">اشتراک‌گذاری</span>
        </div>
      </div>
      <main className="container mx-auto flex flex-col md:flex-row gap-8 py-8 px-4">
        {/* Main Blog Content */}
        <section className="flex-1 min-w-0">
          <BlogPostContent post={post} />
          <div className="my-8">
            <h3 className="font-bold text-lg mb-4">امتیاز کاربران</h3>
            <div className="flex items-center gap-2">
              <RatingStars rating={post.averageRating || 0} />
              <span className="text-sm text-gray-500">
                ({post.totalRatings || 0} رای)
              </span>
            </div>
          </div>
          <div className="my-8">
            <h3 className="font-bold text-lg mb-4">
              دیدگاه‌ها ({post.comments?.length || 0})
            </h3>
            <CommentList comments={post.comments || []} />
            <CommentForm postId={post.id} />
          </div>
        </section>
        {/* Related Posts Sidebar */}
        <aside className="w-full md:w-80 flex-shrink-0">
          <RelatedPosts posts={relatedPosts} />
        </aside>
      </main>
      <Footer />
    </div>
  );
}

// Generate static metadata for the page
export async function generateMetadata({ params }: GetBlogPostParams) {
  try {
    // In Next.js 15, params is async and must be awaited before accessing properties
    const unwrappedParams = await params;
    const id = unwrappedParams.id;

    // Validate the id before using it
    if (!id || typeof id !== "string") {
      throw new Error("Invalid blog post ID");
    }

    const post = await getBlogPost(id);

    if (!post) {
      return {
        title: "مقاله یافت نشد | سیمان داراب",
        description: "مقاله مورد نظر یافت نشد.",
      };
    }

    return {
      title: `${post.title} | سیمان داراب`,
      description: post.content?.substring(0, 160) || "مقاله‌ای از سیمان داراب",
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "خطا | سیمان داراب",
      description: "خطا در بارگذاری مقاله",
    };
  }
}
