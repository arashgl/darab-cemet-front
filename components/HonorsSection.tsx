"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Post } from "@/lib/api";
import { parseImageURL } from "@/lib/parseImageURL";
import { SecondaryButton } from "./SecondaryButton";

interface HonorsSectionProps {
  posts: Post[];
}

export default function HonorsSection({ posts }: HonorsSectionProps) {
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
        if (document.querySelector(".medal-swiper")) {
          swiperRef.current = new Swiper(".medal-swiper", {
            slidesPerView: 2,
            spaceBetween: 24,
            pagination: {
              el: ".medal-pagination",
              clickable: true,
            },
            breakpoints: {
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 5,
              },
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
    <section className="mt-6">
      <div className="title-div container">
        <Image src="/assets/icons/medal.svg" alt="" width={24} height={24} />
        <span className="text-base">افتخارات</span>
        <hr />
        <SecondaryButton text="مشاهده همه" />
      </div>
      <div className="relative">
        <div className="container overflow-x-hidden mt-5">
          <div className="testimonials-carousel medal-swiper swiper-container group pb-5">
            <div className="swiper-wrapper w-fit" data-highlighter>
              {/* Swiper Slides */}
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="swiper-slide h-auto  absolute group/slide"
                >
                  <div className="relative h-full rounded-xs">
                    <div>
                      <Image
                        src={
                          parseImageURL(post.leadPicture) ||
                          "/assets/images/medal.jfif"
                        }
                        alt={post.title}
                        className="border-8 rounded-md border-gray-200"
                        width={200}
                        height={150}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="swiper-pagination medal-pagination"></div>
        </div>
      </div>
    </section>
  );
}
