"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ManagerSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="container" style={{ marginTop: "16em" }}>
      <div className="d-flex justify-between mt-5 flex-col-revers-mobile">
        <div
          className="body-div flex-1 w-100 lg:w-50"
          style={{ position: "relative" }}
          data-aos="fade-down"
        >
          <div>
            <span className="text-4xl color-primary font-bold mt-5 title">
              پیام مدیر عامل
            </span>
            <p className="text-lg color-info text-justify mt-4 five-dots">
              سال‌هاست که همکاران من در شرکت سیمان داراب، در قالب یک خانواده
              بزرگ و پرافتخار، راه تلاش، تعالی و خوداتکایی را برگزیده‌اند. ما در
              سختی‌ها با هم ماندیم و با حمایت از یکدیگر در فراز و نشیب‌های
              فراوان، خانواده بزرگ سیمان داراب را شکل دادیم؛ بگونه‌ای که امروز
              در عرصه صنعت سیمان کشور، نمونه بارزی از موفقیت و سربلندی محسوب
              می‌شود
            </p>
            <button className="text-lg text-orange-600 ">ادامه مطلب ...</button>
            <div className="d-flex align-items-center gap-2 w-fit p-2 px-4 mt-4 bg-[#F25822] rounded-md">
              <Image
                src="/assets/icons/mobile.svg"
                alt=""
                width={24}
                height={24}
              />
              <h6 className="faNumber  text-white mb-0 font-semibold">
                تماس با مدیر عامل ۰۲۱۲۶۴۰۵۵۲۱ داخلی ۳۰۵
              </h6>
            </div>
            <div className="d-flex align-items-center gap-2 w-fit p-2 px-4 mt-4 bg-[#F8F8F8] rounded-md">
              <Image
                src="/assets/icons/send.svg"
                alt=""
                width={24}
                height={24}
              />
              <h6
                className="text-[#818286] mb-0 font-semibold"
                style={{ color: "#818286" }}
              >
                ارسال پیام به مدیر عامل
              </h6>
            </div>
          </div>
        </div>
        <div className="img-box flex-1 w-100 lg:w-50" data-aos="fade-down">
          <Image
            src="/assets/images/managment.svg"
            alt="Manager Portrait"
            className="scale-105 mb-[-1px] max-md:scale-100 max-md:mb-0"
            width={600}
            height={400}
          />
        </div>
      </div>
      <hr
        className="web"
        style={{
          borderColor: "#F25822",
          borderWidth: "2px",
          width: "100%",
          opacity: 1,
          marginTop: "-1em",
        }}
      />
    </section>
  );
}
