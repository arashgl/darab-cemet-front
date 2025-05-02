"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Post } from "@/lib/api";
import { parseImageURL } from "@/lib/parseImageURL";
import Link from "next/link";
import { SecondaryButton } from "./SecondaryButton";
import { A11y, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

interface EventsSectionProps {
  posts: Post[];
}

export default function EventsSection({ posts }: EventsSectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    setIsMounted(true);

    const initSwiper = async () => {
      try {
        // Dynamically import Swiper
        const SwiperModule = await import("swiper");
        const Swiper = SwiperModule.default;
        // CSS is already imported in the layout file via link tag

        // Initialize Swiper
        if (document.querySelector(".reason-swiper")) {
          swiperRef.current = new Swiper(".reason-swiper", {
            slidesPerView: 1,
            spaceBetween: 24,
            pagination: {
              el: ".reason-pagination",
              clickable: true,
            },
            breakpoints: {
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            },
            navigation: {
              nextEl: ".carousel-next",
              prevEl: ".carousel-prev",
            },
          });
        }
      } catch (error) {
        console.error("Failed to initialize swiper:", error);
      }
    };

    initSwiper();

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, [isMounted]);

  if (!isMounted || !posts || posts.length === 0) return null;

  return (
    <section className="mt-5 min-h-[550px] md:mr-12 max-md:mr-6 mb-12">
      <div className="title-div container">
        <Image src="/assets/icons/calendar.svg" alt="" width={16} height={16} />
        <span className="text-xs">مناسبت ها</span>
        <hr />
        <Link href="/events">
          <SecondaryButton text="مشاهده همه" />
        </Link>
      </div>
      <div className="relative">
        <div
          className="pr-custom pr-custom-mobile mt-2 bg-info-slider"
          style={{
            backgroundImage: "url('/assets/images/bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgba(100, 100, 100, 0.796)",
            backgroundBlendMode: "hue",
            minHeight: "auto",
          }}
        >
          <div
            className="w-100 relative pb-2"
            style={{
              overflowX: "hidden",
              padding: "0 1em",
            }}
          >
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
                {/* Swiper Slides */}
                {/* <SliderButtonEvents /> */}
                {posts.map((post) => (
                  <SwiperSlide key={post.id} className="overflow-visible">
                    <div className="relative min-h-[390px] max-md:min-h-[350px] w-72 max-md:w-64 bg-white md:rounded-lg lg:rounded-3xl max-sm:p-3 lg:p-4 p-3 rounded-xl border border-[#eaeaea] shadow-md z-10 overflow-visible transition duration-300">
                      <div className="w-full h-40">
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
                        <div className="mt-1">
                          <h3 className="text-lg font-bold mt-2 mb-3 title">
                            {post.title}
                          </h3>
                          <p className="text-sm color-info text-justify item mb-4">
                            {post.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[14px] border-1 p-1 rounded-md faNumber text-[#BCBCBC]"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between gap-2 w-full">
                          <span className="text-[12px] faNumber text-[#BCBCBC]"></span>
                          <Link className="w-full" href={`/events/${post.id}`}>
                            <button
                              className={`bg-orange-600 w-full  text-white rounded-md py-[5px] px-4 text-xs md:text-sm font-medium`}
                            >
                              مشاهده کنید
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="swiper-pagination reason-pagination mt-1"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
