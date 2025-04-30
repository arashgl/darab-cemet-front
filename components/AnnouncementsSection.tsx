"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { RiArrowRightCircleLine } from "react-icons/ri";
import { Post } from "@/lib/api";
import { parseImageURL } from "@/lib/parseImageURL";

interface AnnouncementSectionProps {
  posts: Post[];
}

export default function AnnouncementSection({
  posts,
}: AnnouncementSectionProps) {
  // If no posts, show nothing or a placeholder
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-6 relative mb-36">
      <div className="title-div container">
        <Image src="/assets/icons/packet.svg" alt="" width={24} height={24} />
        <span className="text-base">اطلاعیه ها</span>
        <hr />
        <button className="btn btn-secondary">مشاهده همه</button>
      </div>
      <div className="relative z-10">
        <div className="pr-custom pr-custom-mobile mt-5 bg-slider overflow-visible">
          <div className="w-full relative pb-5 sm:pr-4 overflow-visible pr-32 mr-8">
            <div className="relative overflow-visible">
              <div className="testimonials-carousel swiper-container overflow-visible">
                <Swiper
                  modules={[Navigation, Pagination, A11y]}
                  spaceBetween={24}
                  slidesPerView={3}
                  navigation={{
                    nextEl: ".carousel-next",
                    prevEl: ".carousel-prev",
                  }}
                  pagination={{ el: ".notif-pagination", clickable: true }}
                  breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 16 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 3, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 24 },
                    1280: { slidesPerView: 4, spaceBetween: 24 },
                  }}
                  className="overflow-visible p-2"
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  {/* Swiper Slides */}
                  {posts.map((post) => (
                    <SwiperSlide key={post.id} className="overflow-visible">
                      <div className="relative bg-white md:rounded-lg lg:rounded-3xl max-sm:p-3 lg:p-4 hover:shadow-xl p-3 rounded-xl border border-[#eaeaea] shadow-md z-10 overflow-visible h-full transition duration-300">
                        <div className="img-box w-full h-44 mb-4">
                          <Image
                            className="rounded-lg object-cover w-full h-full"
                            src={
                              parseImageURL(post.leadPicture) ||
                              "/assets/images/news-img.jfif"
                            }
                            alt={post.title}
                            width={500}
                            height={250}
                            priority
                          />
                        </div>
                        <div className="relative">
                          <div className="notif-body px-2">
                            <h3 className="text-lg font-bold mt-2 mb-3 title">
                              {post.title}
                            </h3>
                            <p className="text-sm color-info text-justify item mb-4">
                              {post.description}
                            </p>
                          </div>
                          <div className="flex items-center justify-between gap-4 mt-4 w-full">
                            <span className="text-sm faNumber text-[#BCBCBC]">
                              زمان مطالعه {post.readingTime} دقیقه
                            </span>
                            <button className="btn btn-primary px-4 py-1 text-base">
                              ادامه مطلب
                            </button>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="swiper-pagination notif-pagination mt-4 z-10"></div>

            {/* Right arrow */}
            <RiArrowRightCircleLine
              className="absolute top-1/2 right-[-45px] transform -translate-y-1/2 pointer-events-auto w-10 h-10 bg-white border rounded-full "
              fill="#F25822"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
