import React from "react";
import { Post } from "@/lib/api";
import { parseImageURL } from "@/lib/parseImageURL";
import Link from "next/link";
import { SecondaryButton } from "./SecondaryButton";
import Image from "next/image";
import { PrimaryButton } from "./PrimaryButton";

interface NewsSectionProps {
  posts: Post[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ posts }) => {
  // If no posts, show nothing or a placeholder
  if (!posts || posts.length === 0) {
    return null;
  }

  // Get the main post and supporting posts
  const mainPost = posts[0];
  const supportingPosts = posts.slice(1, 4);

  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Format to Persian date (simple implementation)
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <section className="container mt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2">
          <svg
            width="24"
            height="32"
            viewBox="0 0 29 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.1328 0C25.0361 0 28.33 3.3578 28.33 8.35474V22.6968C28.33 27.7374 25.1375 31.0156 20.1967 31.0468L8.19878 31.0515C3.29542 31.0515 0 27.6937 0 22.6968V8.35474C0 3.31257 3.19249 0.0358706 8.13328 0.00623837L20.1312 0H20.1328ZM20.1328 2.33939L8.14107 2.34563C4.51034 2.36746 2.33939 4.61327 2.33939 8.35474V22.6968C2.33939 26.4632 4.53062 28.7121 8.19722 28.7121L20.1889 28.7074C23.8197 28.6856 25.9906 26.4367 25.9906 22.6968V8.35474C25.9906 4.58832 23.8009 2.33939 20.1328 2.33939ZM19.8319 21.0135C20.4776 21.0135 21.0016 21.5375 21.0016 22.1832C21.0016 22.8288 20.4776 23.3529 19.8319 23.3529H8.57168C7.92601 23.3529 7.40198 22.8288 7.40198 22.1832C7.40198 21.5375 7.92601 21.0135 8.57168 21.0135H19.8319ZM19.8319 14.4842C20.4776 14.4842 21.0016 15.0083 21.0016 15.6539C21.0016 16.2996 20.4776 16.8236 19.8319 16.8236H8.57168C7.92601 16.8236 7.40198 16.2996 7.40198 15.6539C7.40198 15.0083 7.92601 14.4842 8.57168 14.4842H19.8319ZM12.8679 7.97014C13.5136 7.97014 14.0376 8.49416 14.0376 9.13984C14.0376 9.78551 13.5136 10.3095 12.8679 10.3095H8.57121C7.92554 10.3095 7.40151 9.78551 7.40151 9.13984C7.40151 8.49416 7.92554 7.97014 8.57121 7.97014H12.8679Z"
              fill="#F25822"
            />
          </svg>
          <Link className="min-w-[105px]" href="/blog">
            <span className="text-base font-medium text-gray-500 ml-2">
              آخرین اخبارها
            </span>
          </Link>
        </div>
        <div className="w-full border" />
        <Link href="/blog">
          <SecondaryButton text="مشاهده همه" className="mr-3" />
        </Link>
      </div>
      <hr className="border-t border-gray-200 mb-4 md:mb-6" />

      {mainPost && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="hidden md:block md:order-1">
            <Image
              width={100}
              height={100}
              src={parseImageURL(mainPost.leadPicture) || ""}
              alt={mainPost.title}
              className="w-full h-64 object-cover rounded-xl shadow-sm"
            />
          </div>
          {/* Main News Image on Mobile */}
          <div className="md:hidden mb-4">
            <Image
              width={100}
              height={100}
              src={parseImageURL(mainPost.leadPicture) || ""}
              alt={mainPost.title}
              className="w-full h-48 object-cover rounded-xl shadow-sm"
            />
          </div>

          {/* Main News Text */}
          <div className="md:order-1">
            <h2 className="text-orange-500 font-bold text-lg sm:text-xl md:text-2xl mb-2 md:mb-3">
              {mainPost.title}
            </h2>
            <p className="text-gray-700 min-h-[150px] text-sm md:text-base leading-6 md:leading-7 mb-4 md:mb-6 line-clamp-6 text-right rtl whitespace-pre-wrap break-words">
              {mainPost.description}
            </p>
            <div className="flex flex-wrap justify-between gap-2 md:gap-3">
              <span className="text-xs md:text-sm text-gray-400 rounded-md py-0.5 px-2">
                زمان مطالعه {mainPost.readingTime} دقیقه
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm text-white bg-secondary rounded-md py-0.5 px-2">
                  تاریخ: {formatDate(mainPost.createdAt)}
                </span>
                <Link href={`/blog/${mainPost.id}`}>
                  <PrimaryButton text="ادامه مطلب" />
                </Link>
              </div>
            </div>
          </div>

          {/* Main News Image on Desktop */}
        </div>
      )}

      {/* Sub News Cards */}
      {supportingPosts.length > 0 && (
        <div className="hidden md:grid grid-cols-1  sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-5 mt-12">
          {supportingPosts.map((post) => (
            <Link
              href={`/blog/${post.id}`}
              key={post.id}
              className="bg-white rounded-xl overflow-hidden flex flex-col h-full"
            >
              <Image
                width={100}
                height={100}
                src={parseImageURL(post.leadPicture) || ""}
                alt={post.title}
                className="w-full h-32 md:h-36 object-cover rounded-xl"
              />
              <div className="p-3 md:p-4 flex-1 flex flex-col">
                <h3
                  className={`text-orange-600 font-bold text-sm md:text-base mb-2 line-clamp-2`}
                >
                  {post.title}
                </h3>
                <div className="flex mt-auto justify-start">
                  <span className="text-[10px] text-gray-500  rounded-md py-0.5 ">
                    زمان مطالعه {post.readingTime} دقیقه
                  </span>
                  <span className="text-[10px] text-gray-500 rounded-md py-0.5 px-2">
                    تاریخ انتشار {formatDate(post.createdAt)}
                  </span>
                </div>
                <p className="text-gray-600 mt-4 text-xs md:text-sm md:leading-6 mb-3 flex-grow line-clamp-2">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default NewsSection;
