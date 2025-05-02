"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { RiArrowUpSLine } from "react-icons/ri";

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <footer className="mt-6 footer" dir="">
      <div className="top-page relative">
        <div className="btn-to-top">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="absolute left-1/2 transform -translate-x-1/2 rounded-full h-[50px] w-[50px] flex items-center justify-center top-[-1.5em]  border-[3px] border-[#f258221f] shadow-[0_-3px_26px_0px_#f2592261,0_2px_15px_2px_#f259223d] !bg-primary text-white hover:!bg-secondary hover:scale-110 transition-all duration-300"
          >
            <RiArrowUpSLine size={30} />
          </button>
        </div>
        <div className="container flex flex-row items-center justify-between gap-2 mt-2">
          <div className="flex items-center gap-2 item">
            <Image
              src="/assets/icons/email.svg"
              alt="email"
              width={20}
              height={20}
            />
            <h6 className="mb-0 font-semibold text-base text-[#5B5B5B]">
              کد پستی: ۱۱۱۳۱-۷۴۸۱۱ - صندوق پستی: ۹۸۷۶-۱۲۳۴۵۶
            </h6>
          </div>
          <hr className="w-full md:hidden" />
          <div className="flex items-center gap-2 item">
            <Image
              src="/assets/icons/phone.svg"
              alt="phone"
              width={20}
              height={20}
            />
            <h6 className="mb-0 font-semibold text-base text-[#5B5B5B]">
              مرکز تماس : ۲۸۴۹-۴۲۴-۰۲۱
            </h6>
          </div>
          <hr className="w-full md:hidden" />
          <div className="flex items-center gap-2 item">
            <Image
              src="/assets/icons/location.svg"
              alt="location"
              width={20}
              height={20}
            />
            <h6 className="mb-0 font-semibold text-base text-[#5B5B5B]">
              آدرس: استان فارس، کیلومتر ۳۵ جاده داراب - شیراز
            </h6>
          </div>
        </div>
      </div>
      <div className="footer-body pb-4">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Blocks */}
          <div className="row">
            <div className="col-sm-12 col-md-4 lg:order-none">
              <div className="d-flex text-white align-items-center justify-start gap-4 font-bold text-2xl flex-col-mobile">
                <Image
                  src="/assets/images/logo-white.svg"
                  alt="Logo"
                  width={100}
                  height={50}
                />
                شرکت سیمان داراب
              </div>
              <p
                className="text-white text-sm font-semibold mt-4"
                style={{ textAlign: "justify" }}
              >
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف.
              </p>
            </div>

            {/* 2nd block */}
            <div className="col-6 col-md-2 lg:col-span-2 px-5">
              <h6 className="text-base text-slate-50 font-bold mb-2">
                آدرس پستی
              </h6>
              <ul className="text-sm space-y-2 mt-4">
                <li>
                  <a
                    className="text-white hover:text-slate-200 transition duration-150 ease-in-out"
                    href="#0"
                  >
                    دفتر تهران
                  </a>
                </li>
                <li>
                  <a
                    className="text-white hover:text-slate-200 transition duration-150 ease-in-out"
                    href="#0"
                  >
                    دفتر شیراز
                  </a>
                </li>
                <li>
                  <a
                    className="text-white hover:text-slate-200 transition duration-150 ease-in-out"
                    href="#0"
                  >
                    کارخانه
                  </a>
                </li>
              </ul>
            </div>

            {/* 3rd block */}
            <div className="col-6 col-md-3 lg:col-span-2">
              <h6 className="text-base text-slate-50 font-bold mb-2">
                شرکت های زیر مجموعه
              </h6>
              <ul className="text-sm space-y-4 mt-4 p-0">
                <li>
                  <a
                    className="text-white hover:text-slate-200 transition duration-150 ease-in-out"
                    href="#0"
                  >
                    شرکت عمران و توسعه داراب
                  </a>
                </li>
                <li>
                  <a
                    className="text-white hover:text-slate-200 transition duration-150 ease-in-out"
                    href="#0"
                  >
                    باربری امید بار سیمان داراب
                  </a>
                </li>
                <li>
                  <a
                    className="text-white hover:text-slate-200 transition duration-150 ease-in-out"
                    href="#0"
                  >
                    صندوق قرض الحسنه غدیر کارکنان
                  </a>
                </li>
                <li>
                  <a
                    className="text-white hover:text-slate-200 transition duration-150 ease-in-out"
                    href="#0"
                  >
                    کارخانه کربنات کلسیم رسوبی و آهک هیدراته
                  </a>
                </li>
              </ul>
            </div>

            {/* 4th block */}
            <div className="col-sm-12 col-md-3 order-1 lg:order-none">
              <h6 className="text-base text-slate-50 font-bold mb-2">
                اطلاعات مفید
              </h6>
              <div className="item">
                <h6>شناسه ملی : ۱۰۱۰۱۱۳۴۵۵۴</h6>
              </div>
              <div className="item mt-2">
                <h6>شناسه اقتصادی : ۴۱۱۱۶۹۷۹۴۳۷۶</h6>
              </div>
              <div className="item mt-2">
                <h6>پست الکترونیکی info@darabcement.com</h6>
              </div>

              <div className="d-flex align-items-center gap-3 justify-end mt-5">
                <div>
                  <Image
                    src="/assets/icons/media/telegram.svg"
                    alt="Telegram"
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <Image
                    src="/assets/icons/media/instagram.svg"
                    alt="Instagram"
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <Image
                    src="/assets/icons/media/whatsapp.svg"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <h5 className="mt-4 text-center text-base font-bold text-white mb-0">
            © کلیه حقوق مادی و معنوی این پورتال، متعلق به شرکت سیمان داراب می
            باشد.
          </h5>
        </div>
      </div>
    </footer>
  );
}
