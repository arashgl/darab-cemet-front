import Footer from "@/components/Footer";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { notFound } from "next/navigation";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";
import {
  FaStar,
  FaRegStar,
  FaUser,
  FaClock,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaTelegram,
} from "react-icons/fa";
import { BsCalendar } from "react-icons/bs";
import { FiChevronLeft } from "react-icons/fi";
import { parseImageURL } from "@/lib/parseImageURL";

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
  tags?: string[]
): Promise<BlogPost[]> {
  // If no tags, can't find related posts
  if (!tags || tags.length === 0) {
    return [];
  }

  try {
    // Check if URL is properly defined
    const apiUrl = process.env.API_URL || "http://localhost:3100";

    // Create a query with the tags
    const tagsQuery = tags.join(",");
    const url = `${apiUrl}/posts?section=blog&tags=${tagsQuery}&limit=3`;

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

  // If post not found, show 404 page
  if (!post) {
    notFound();
  }

  // Get related posts based on tags
  const relatedPosts = await getRelatedPosts(post.id, post.tags);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <Navbar />

      <main>
        {/* Breadcrumb */}
        <div className="breadcrumb-page w-100 p-2 mt-4 py-3">
          <div className="d-flex align-items-center container gap-4">
            <h6 className="text-base font-normal mb-0 title">صفحه اصلی</h6>
            <Link href="/blog">
              <h6 className="text-base font-normal mb-0">بلاگ</h6>
            </Link>
            <span>
              <FiChevronLeft size={18} />
            </span>
            <h6 className="text-base font-normal active mb-0">{post.title}</h6>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-8">
              {/* Post Header with Rating */}
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="text-3xl font-bold color-primary">
                  {post.title}
                </h1>

                <div className="rating-display d-flex align-items-center">
                  <div className="stars d-flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="star mx-1">
                        {star <= (post.averageRating || 0) ? (
                          <FaStar size={24} className="text-yellow-500" />
                        ) : (
                          <FaRegStar size={24} className="text-gray-300" />
                        )}
                      </span>
                    ))}
                  </div>
                  <span className="mx-2">
                    {post.averageRating?.toFixed(1) || "۰"}
                  </span>
                  <span className="text-sm text-muted">
                    ({post.totalRatings || "۰"} ارزیابی کاربران)
                  </span>
                </div>
              </div>

              {/* Post Meta */}
              <div className="d-flex align-items-center gap-4 mt-4 text-sm color-info">
                {post.createdAt && (
                  <div className="d-flex align-items-center gap-2">
                    <BsCalendar size={18} className="text-gray-500" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                )}

                {post.author?.name && (
                  <div className="d-flex align-items-center gap-2">
                    <FaUser size={16} className="text-gray-500" />
                    <span>{post.author.name}</span>
                  </div>
                )}

                {post.readingTime && (
                  <div className="d-flex align-items-center gap-2">
                    <FaClock size={16} className="text-gray-500" />
                    <span>{post.readingTime} دقیقه</span>
                  </div>
                )}
              </div>

              {/* Featured Image */}
              <div className="blog-featured-image mt-5">
                <Image
                  src={
                    parseImageURL(post.leadPicture) ||
                    "/assets/images/blog-default.jpg"
                  }
                  alt={post.title}
                  width={1200}
                  height={675}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "500px",
                    objectFit: "cover",
                  }}
                  className="rounded-lg"
                  priority
                />
              </div>

              {/* Post Content */}
              <div
                className="blog-content mt-6 text-lg color-info"
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="blog-tags mt-8 d-flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-md text-sm color-info"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Share Section */}
              <div className="share-section mt-8 d-flex align-items-center gap-3">
                <span className="text-lg font-medium color-primary">
                  اشتراک گذاری:
                </span>
                <div className="social-icons d-flex gap-2">
                  <a
                    href="#"
                    className="p-2 bg-gray-100 rounded-full d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <FaTwitter size={20} className="text-gray-600" />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-gray-100 rounded-full d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <FaFacebook size={20} className="text-gray-600" />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-gray-100 rounded-full d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <FaLinkedin size={20} className="text-gray-600" />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-gray-100 rounded-full d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <FaTelegram size={20} className="text-gray-600" />
                  </a>
                </div>
              </div>

              {/* Comments Section */}
              <div className="comments-section mt-10">
                <h3 className="text-xl font-bold color-primary border-bottom pb-3 mb-4">
                  دیدگاه‌ها و نظرسنجی
                </h3>

                {/* Display existing comments */}
                <CommentList comments={post.comments || []} />

                {/* Comment and Rating Form */}
                <CommentForm postId={post.id} />
              </div>
            </div>

            <div className="col-md-4">
              {/* Sidebar */}
              <div className="blog-sidebar">
                <h3 className="text-xl font-bold color-primary border-bottom pb-3 mb-4">
                  مقالات مرتبط
                </h3>

                {relatedPosts.length > 0 ? (
                  <div className="related-posts d-flex flex-column gap-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        href={`/blog/${relatedPost.id}`}
                        key={relatedPost.id}
                        className="related-post d-flex gap-3 text-decoration-none border-bottom pb-4"
                      >
                        <div
                          className="related-post-image relative"
                          style={{ minWidth: "100px", height: "100px" }}
                        >
                          <Image
                            src={
                              parseImageURL(relatedPost.leadPicture) ||
                              "/assets/images/blog-default.jpg"
                            }
                            alt={relatedPost.title}
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded"
                          />
                        </div>
                        <div>
                          <h4 className="text-md font-medium color-primary">
                            {relatedPost.title}
                          </h4>
                          {relatedPost.createdAt && (
                            <p className="text-sm color-info mt-1">
                              {formatDate(relatedPost.createdAt)}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm color-info">مقاله مرتبطی یافت نشد.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Site footer */}
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
