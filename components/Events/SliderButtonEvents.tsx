import { RiArrowRightSLine } from "react-icons/ri";
import { useSwiper } from "swiper/react";

export const SliderButtonEvents = () => {
  const navigation = useSwiper();
  return (
    <div className="absolute z-10 top-32 right-[-20px] max-md:right-[-40px] max-md:top-20 cursor-pointer pointer-events-auto w-12 h-12 flex items-center justify-center bg-white rounded-full border-2 border-gray-400">
      <RiArrowRightSLine
        onClick={() => {
          navigation.slideTo(0);
        }}
        fill="#696969"
        className="h-10 w-10 z-20"
      />
    </div>
  );
};
