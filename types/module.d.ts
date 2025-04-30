declare module "swiper" {
  export interface SwiperOptions {
    slidesPerView?: number | "auto";
    spaceBetween?: number;
    pagination?: {
      el: string;
      clickable?: boolean;
    };
    navigation?: {
      nextEl?: string;
      prevEl?: string;
    };
    breakpoints?: {
      [width: number]: {
        slidesPerView?: number | "auto";
        spaceBetween?: number;
      };
    };
    // Add other options as needed
  }

  export class Swiper {
    constructor(selector: string | HTMLElement, options?: SwiperOptions);
    destroy(deleteInstance?: boolean, cleanStyles?: boolean): void;
    // Add other methods as needed
  }

  export default Swiper;
}

declare module "swiper/css";

// AOS library
interface AosParams {
  duration?: number;
  easing?: string;
  once?: boolean;
  offset?: number;
  delay?: number;
  // Using Record instead of index signature
  [key: string]: unknown;
}

interface AosType {
  init: (params?: AosParams) => void;
  refresh: (force?: boolean) => void;
}

declare global {
  interface Window {
    AOS?: AosType;
  }
}
