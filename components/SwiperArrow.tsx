import { useSwiper } from "swiper/react";

export const SwiperArrow = () => {
  const swiper = useSwiper();

  return (
    <div
      className="flex mt-8 justify-between absolute z-10"
      style={{ top: "35%", left: "-100px", width: "-webkit-fill-available" }}
    >
      <button
        onClick={() => swiper.slideNext()}
        className="carousel-next z-20 w-12 h-12 flex items-center justify-center group"
      >
        <span className="sr-only">Next</span>
        <svg
          width="10"
          height="15"
          viewBox="0 0 10 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.35483 0.882285C1.27696 0.805811 1.26767 0.691182 1.32422 0.606183L1.36456 0.560302C1.44645 0.488468 1.57037 0.480075 1.66141 0.53888L1.71244 0.582143L8.59753 7.34352C8.6754 7.42 8.68469 7.53463 8.62814 7.61962L8.58444 7.66933L1.69939 14.4307C1.60526 14.5231 1.44896 14.5231 1.35483 14.4307C1.27696 14.3542 1.26767 14.2396 1.32422 14.1546L1.36792 14.1049L7.73003 7.85673L8.09327 7.5L7.73003 7.14327L1.35484 0.882295L1.35483 0.882285Z"
            fill="#F25822"
            stroke="#F25822"
          />
        </svg>
      </button>
    </div>
  );
};
