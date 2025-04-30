"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Post } from "@/lib/api";
import { parseImageURL } from "@/lib/parseImageURL";

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
    <section className="mt-6 mb-[220px]">
      <div className="title-div container">
        <Image src="/assets/icons/calendar.svg" alt="" width={24} height={24} />
        <span className="text-base">اطلاعیه ها</span>
        <hr />
        <button className="btn btn-secondary">مشاهده همه</button>
      </div>
      <div className="relative">
        <div
          className="pr-custom pr-custom-mobile mt-5 bg-info-slider"
          style={{
            backgroundImage: "url('/assets/images/bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgba(100, 100, 100, 0.796)",
            backgroundBlendMode: "hue",
          }}
        >
          <div
            className="w-100 relative pb-5"
            style={{
              overflowX: "hidden",
              padding: "0 2em",
            }}
          >
            <div className="relative">
              <div className="testimonials-carousel reason-swiper swiper-container group">
                <div className="swiper-wrapper w-fit" data-highlighter>
                  {/* Swiper Slides */}
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="swiper-slide h-auto relative rounded-3xl group/slide"
                    >
                      <div className="relative h-full rounded-lg bg-white md:rounded-lg lg:rounded-3xl p-4 z-20 overflow-hidden flex flex-col">
                        <div className="img-box">
                          <Image
                            src={
                              parseImageURL(post.leadPicture) ||
                              "/assets/images/img.jfif"
                            }
                            alt={post.title}
                            className="rounded-lg lg:rounded-3xl md:rounded-3xl w-full h-[100px] object-cover"
                            width={200}
                            height={150}
                          />
                        </div>
                        <div className="mt-4 flex-grow flex flex-col">
                          <div
                            className="reason-body flex-grow"
                            style={{ margin: "0" }}
                          >
                            <span
                              className="text-base font-semibold title block"
                              style={{ color: "#818286" }}
                            >
                              {post.title}
                            </span>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {post.tags &&
                                post.tags.map((tag, index) => (
                                  <div
                                    key={index}
                                    className="border-1 tag-item rounded-sm p-1 text-sm font-semibold text-[#818286]"
                                    style={{ borderColor: "#818286" }}
                                  >
                                    # {tag}
                                  </div>
                                ))}
                              {(!post.tags || post.tags.length === 0) && (
                                <div
                                  className="border-1 tag-item rounded-sm p-1 text-sm font-semibold text-[#818286]"
                                  style={{ borderColor: "#818286" }}
                                >
                                  # اطلاعیه ها
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="mt-5 mb-2">
                            <button className="btn btn-primary px-4 py-1 text-base w-full">
                              مشاهده کنید
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="swiper-pagination reason-pagination mt-4"></div>
          </div>

          {/* Arrows */}
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full px-4 z-30 pointer-events-none">
            <button className="carousel-prev z-20 w-12 h-12 flex items-center justify-center group bg-white rounded-full shadow pointer-events-auto">
              <span className="sr-only">Previous</span>
              <svg
                width="10"
                height="17"
                viewBox="0 0 10 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: "rotate(180deg)" }}
              >
                <path
                  d="M7.73325 8.84791L8.08678 8.49437L7.73325 8.14083L1.35806 1.7653L1.35805 1.76529C1.27674 1.68398 1.26604 1.55785 1.32683 1.46539L1.36773 1.41801C1.44912 1.34514 1.56909 1.33753 1.65796 1.39595L1.70912 1.44012L8.59431 8.32531C8.67562 8.40662 8.68631 8.53275 8.62553 8.62521L8.58135 8.67638L1.69617 15.5616C1.6028 15.6549 1.45142 15.6549 1.35805 15.5616C1.27674 15.4803 1.26604 15.3541 1.32683 15.2617L1.37101 15.2105L7.73325 8.84791Z"
                  fill="white"
                  stroke="#81858D"
                />
              </svg>
            </button>
            <button className="carousel-next z-20 w-12 h-12 flex items-center justify-center group bg-white rounded-full shadow pointer-events-auto">
              <span className="sr-only">Next</span>
              <svg
                width="10"
                height="17"
                viewBox="0 0 10 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.73325 8.84791L8.08678 8.49437L7.73325 8.14083L1.35806 1.7653L1.35805 1.76529C1.27674 1.68398 1.26604 1.55785 1.32683 1.46539L1.36773 1.41801C1.44912 1.34514 1.56909 1.33753 1.65796 1.39595L1.70912 1.44012L8.59431 8.32531C8.67562 8.40662 8.68631 8.53275 8.62553 8.62521L8.58135 8.67638L1.69617 15.5616C1.6028 15.6549 1.45142 15.6549 1.35805 15.5616C1.27674 15.4803 1.26604 15.3541 1.32683 15.2617L1.37101 15.2105L7.73325 8.84791Z"
                  fill="white"
                  stroke="#81858D"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
