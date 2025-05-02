import { RiArrowRightSLine } from "react-icons/ri";
import { useSwiper } from "swiper/react";
export const SliderButton = () => {
  const navigation = useSwiper();
  return (
    <div className="absolute z-10 top-32 right-[-70px] max-md:right-[-80px] max-md:top-20 cursor-pointer pointer-events-auto w-12 h-12 flex items-center justify-center bg-white rounded-full border-2 border-orange-500">
      {/* Right arrow */}
      <RiArrowRightSLine
        onClick={() => {
          navigation.slideTo(0);
        }}
        fill="#F25822"
        className="h-10 w-10"
      />
    </div>
  );
};
