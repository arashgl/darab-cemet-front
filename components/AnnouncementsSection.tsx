"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Post } from "@/lib/api";
import { parseImageURL } from "@/lib/parseImageURL";
import { SecondaryButton } from "./SecondaryButton";
import { PrimaryButton } from "./PrimaryButton";
import { format } from "date-fns-jalali";
import Link from "next/link";
import { SliderButton } from "./Announcements/SliderButton";

interface AnnouncementSectionProps {
  posts: Post[];
}

// Format date to Jalali (Persian) calendar format
const formatDate = (dateString: string | Date): string => {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  return format(date, "yyyy/MM/dd");
};

export default function AnnouncementSection({
  posts,
}: AnnouncementSectionProps) {
  // If no posts, show nothing or a placeholder
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-6 relative mb-36 md:mr-12 max-md:mr-6">
      <div className="title-div container">
        <Image src="/assets/icons/packet.svg" alt="" width={24} height={24} />
        <span className="text-base">اطلاعیه ها</span>
        <hr />
        <SecondaryButton text="مشاهده همه" />
      </div>
      <div className="relative z-10">
        <div className="pr-custom relative pr-custom-mobile mt-5 bg-slider overflow-visible">
          <div className="w-full  relative pb-5 sm:pr-4 overflow-visible pr-32 mr-8">
            <div className=" overflow-visible">
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
                    320: { slidesPerView: 1, spaceBetween: 13 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 3, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 24 },
                    1280: { slidesPerView: 4, spaceBetween: 24 },
                  }}
                  className="overflow-visible p-2"
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  <SliderButton />
                  {/* Swiper Slides */}
                  {posts.map((post) => (
                    <SwiperSlide key={post.id} className="overflow-visible">
                      <div className="relative min-h-[430px] max-md:min-h-[390px] w-72 max-md:w-64 bg-white md:rounded-lg lg:rounded-3xl max-sm:p-3 lg:p-4 p-3 rounded-xl border border-[#eaeaea] shadow-md z-10 overflow-visible transition duration-300">
                        <div className="w-full h-44">
                          <Image
                            className="rounded-lg object-cover w-full h-full"
                            src={
                              parseImageURL(post.leadPicture) ||
                              "/assets/images/news-img.jfif"
                            }
                            alt={post.title}
                            width={300}
                            height={250}
                            priority
                          />
                        </div>
                        <div className="flex flex-col h-[220px] max-md:h-[180px] justify-between relative">
                          <div className="mt-4 px-2">
                            <h3 className="text-lg font-bold mt-2 mb-3 title">
                              {post.title}
                            </h3>
                            <p className="text-sm color-info text-justify item mb-4">
                              {post.description}
                            </p>
                          </div>
                          <div className="flex items-center justify-between gap-2 mt-4 w-full">
                            <span className="text-[12px] faNumber text-[#BCBCBC]">
                              تاریخ انتشار: {formatDate(post.createdAt)}
                            </span>
                            <Link href={`/news/${post.id}`}>
                              <PrimaryButton text="ادامه مطلب" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="swiper-pagination notif-pagination mt-4 z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
