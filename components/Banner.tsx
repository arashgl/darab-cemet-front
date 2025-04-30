"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Carousel as BootstrapCarousel } from "bootstrap";

// Add type declaration for Bootstrap
declare global {
  interface Window {
    bootstrap: {
      Carousel: typeof BootstrapCarousel;
    };
  }
}

export default function Banner() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Initialize Bootstrap carousel
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      // Check if Bootstrap is available globally
      if (window.bootstrap) {
        // Use existing Bootstrap
        const carouselElement = document.getElementById("sliderBanner");
        if (carouselElement) {
          new window.bootstrap.Carousel(carouselElement, {
            interval: 5000,
            wrap: true,
          });
        }
      } else {
        // Import Bootstrap dynamically if not available
        import("bootstrap").then((bootstrap) => {
          const carouselElement = document.getElementById("sliderBanner");
          if (carouselElement) {
            new bootstrap.Carousel(carouselElement, {
              interval: 5000,
              wrap: true,
            });
          }
        });
      }
    }
  }, []);

  if (!isMounted) return null;

  return (
    <div id="sliderBanner" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#sliderBanner"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#sliderBanner"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#sliderBanner"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <Image
            src="/assets/images/banner.jpg"
            className="d-block w-100"
            alt="Darab Cement Banner"
            width={1920}
            height={600}
            priority
          />
        </div>
        <div className="carousel-item">
          <Image
            src="/assets/images/banner.jpg"
            className="d-block w-100"
            alt="Darab Cement Banner"
            width={1920}
            height={600}
          />
        </div>
        <div className="carousel-item">
          <Image
            src="/assets/images/banner.jpg"
            className="d-block w-100"
            alt="Darab Cement Banner"
            width={1920}
            height={600}
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#sliderBanner"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#sliderBanner"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
      <div className="caption-slider">
        <div className="container item d-flex align-items-center gap-3">
          <h6 className="text-xl text-white">
            گاز تخصیصی به سیمانی ها ۲۱ میلیون متر مکعب کمتر از نیاز
          </h6>
          <button className="btn btn-primary">مشاهده بیشتر</button>
        </div>
      </div>
    </div>
  );
}
