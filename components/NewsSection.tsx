import React from "react";
import { Post } from "@/lib/api";
import { parseImageURL } from "@/lib/parseImageURL";

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
    <section className="bg-white rounded-[18px] p-4 sm:p-6 md:p-10 mx-auto my-4 sm:my-6 md:my-8 max-w-[1300px] rtl font-['IRANSans',_Tahoma,_Arial,_sans-serif]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2">
          <span className="text-base md:text-lg font-medium text-[#222] ml-2">
            آخرین اخبارها
          </span>
          <span className="inline-flex items-center justify-center border-[1.5px] border-[#F36F2B] rounded-lg w-7 h-7 md:w-8 md:h-8 text-[#F36F2B]">
            <svg
              width="18"
              height="18"
              className="md:w-[20px] md:h-[20px]"
              fill="none"
              viewBox="0 0 24 24"
            >
              <rect x="4" y="6" width="16" height="2" rx="1" fill="#F36F2B" />
              <rect x="4" y="11" width="16" height="2" rx="1" fill="#F36F2B" />
              <rect x="4" y="16" width="16" height="2" rx="1" fill="#F36F2B" />
            </svg>
          </span>
        </div>
        <button className="bg-[#FFF3ED] p-1.5 md:p-2 text-[#F36F2B] border-none rounded-lg py-1 md:py-1.5 px-3 md:px-4.5 text-xs md:text-sm font-medium cursor-pointer">
          مشاهده همه
        </button>
      </div>
      <hr className="border-none border-t border-t-[#E6E6E6] m-0 mb-4 md:mb-8" />

      {mainPost && (
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-4 md:gap-8 mb-6 md:mb-8">
          {/* Main News Image on Mobile */}
          <div className="md:hidden mb-4">
            <img
              src={parseImageURL(mainPost.leadPicture) || ""}
              alt={mainPost.title}
              className="w-full h-[200px] object-cover rounded-[18px] shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
            />
          </div>

          {/* Main News Text */}
          <div>
            <h2 className="text-[#F36F2B] font-bold text-lg sm:text-xl md:text-[22px] mb-2 md:mb-4">
              {mainPost.title}
            </h2>
            <p className="text-[#444] text-sm md:text-[15px] leading-7 md:leading-8 mb-4 md:mb-8">
              {mainPost.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <span className="text-xs md:text-sm text-[#A1A1A1] bg-[#F6F6F6] rounded-md py-0.5 px-2 md:px-3">
                زمان مطالعه {mainPost.readingTime} دقیقه
              </span>
              <span className="text-xs md:text-sm text-white bg-[#F36F2B] rounded-md py-0.5 px-2 md:px-3">
                تاریخ: {formatDate(mainPost.createdAt)}
              </span>
              <button className="bg-[#F36F2B] text-white border-none rounded-md py-1 px-3 md:px-[18px] text-xs md:text-sm font-medium cursor-pointer md:mr-3 mt-2 md:mt-0">
                ادامه مطلب
              </button>
            </div>
          </div>

          {/* Main News Image on Desktop */}
          <div className="hidden md:block">
            <img
              src={parseImageURL(mainPost.leadPicture) || ""}
              alt={mainPost.title}
              className="w-full h-[200px] md:h-[260px] object-cover rounded-[18px] shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
            />
          </div>
        </div>
      )}

      {/* Sub News Cards */}
      {supportingPosts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {supportingPosts.map((post, index) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col h-full"
            >
              <img
                src={parseImageURL(post.leadPicture) || ""}
                alt={post.title}
                className="w-full h-[100px] sm:h-[110px] md:h-[120px] object-cover rounded-t-2xl"
              />
              <div className="p-3 md:p-[18px_16px_12px_16px] flex-1">
                <h3
                  className={`${
                    index === 2 ? "text-[#F36F2B]" : "text-[#222]"
                  } font-bold text-sm md:text-base mb-2 md:mb-2.5 min-h-[40px] md:min-h-[48px]`}
                >
                  {post.title}
                </h3>
                <p className="text-[#666] text-xs md:text-sm leading-6 md:leading-8 mb-3 md:mb-4.5 min-h-[36px] md:min-h-[40px]">
                  {post.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 md:gap-2.5">
                  <span className="text-[10px] md:text-xs text-[#A1A1A1] bg-[#F6F6F6] rounded-md py-0.5 px-2 md:px-2.5">
                    زمان مطالعه {post.readingTime} دقیقه
                  </span>
                  <span className="text-[10px] md:text-xs text-[#A1A1A1] bg-[#F6F6F6] rounded-md py-0.5 px-2 md:px-2.5">
                    تاریخ انتشار {formatDate(post.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default NewsSection;
