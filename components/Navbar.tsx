"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Navbar() {
  useEffect(() => {
    // Initialize dropdown behavior based on screen size
    const handleResize = () => {
      // We're just using media queries with CSS
      // This useEffect hook is mainly to demonstrate how you could
      // add additional JavaScript functionality if needed
      const isMobile = window.innerWidth < 900;
      console.log(`Screen is now ${isMobile ? "mobile" : "desktop"} size`);
    };

    // Initialize Bootstrap dropdowns manually for mobile menu
    const initMobileDropdowns = () => {
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        const dropdownToggleList =
          document.querySelectorAll(".dropdown-toggle");

        // Add click event listeners to all dropdown toggles in mobile menu
        dropdownToggleList.forEach((dropdownToggle) => {
          dropdownToggle.addEventListener("click", (e) => {
            if (window.innerWidth < 900) {
              e.preventDefault();
              const parent = (dropdownToggle as HTMLElement).closest(
                ".dropdown"
              );
              const dropdownMenu = parent?.querySelector(".dropdown-menu");

              // Toggle the 'show' class
              dropdownMenu?.classList.toggle("show");
            }
          });
        });
      }
    };

    // Run on mount and when window resizes
    handleResize();
    initMobileDropdowns();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="landing-header">
      <style jsx global>{`
        /* Desktop dropdown hover effects */
        @media (min-width: 900px) {
          .dropdown-menu {
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: all 0.3s ease;
            display: block;
          }

          .dropdown:hover > .dropdown-menu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
        }

        /* Mobile dropdown, use Bootstrap's default toggle behavior */
        @media (max-width: 991px) {
          .dropdown-menu {
            display: none;
            transition: all 0.3s ease;
          }

          .dropdown-menu.show {
            display: block;
            animation: fadeIn 0.3s ease forwards;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }

        .dropdown-item {
          transition: all 0.2s ease;
          padding: 8px 16px;
        }

        .dropdown-item:hover {
          background-color: #f0f0f0;
          padding-right: 20px;
        }

        /* Fix Bootstrap toggle behavior with our custom hover on desktop */
        @media (min-width: 900px) {
          .dropdown-toggle::after {
            display: none !important;
          }
        }

        /* Modern border draw animation */
        .nav-link {
          position: relative;
          padding: 8px 15px;
          margin: 0 5px;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .nav-link::before,
        .nav-link::after,
        .nav-link span::before,
        .nav-link span::after {
          content: "";
          position: absolute;
          background-color: #f47920;
          transition: 0.5s ease;
          z-index: 1;
        }

        .nav-link::before,
        .nav-link::after {
          width: 0;
          height: 2px;
        }

        .nav-link span::before,
        .nav-link span::after {
          width: 2px;
          height: 0;
        }

        /* Horizontal lines */
        .nav-link::before {
          top: 0;
          left: -10px;
        }

        .nav-link::after {
          bottom: 0;
          right: -10px;
        }

        /* Vertical lines */
        .nav-link span::before {
          top: -10px;
          left: 0;
        }

        .nav-link span::after {
          bottom: -10px;
          right: 0;
        }

        /* Hover animations */
        .nav-link:hover::before,
        .nav-link:hover::after {
          width: calc(100% + 10px);
        }

        .nav-link:hover span::before,
        .nav-link:hover span::after {
          height: calc(100% + 10px);
        }

        /* Animation timing */
        .nav-link::before {
          transition-delay: 0.1s;
        }

        .nav-link::after {
          transition-delay: 0.3s;
        }

        .nav-link span::before {
          transition-delay: 0s;
        }

        .nav-link span::after {
          transition-delay: 0.2s;
        }

        .nav-link:hover::before {
          transition-delay: 0.3s;
        }

        .nav-link:hover::after {
          transition-delay: 0.1s;
        }

        .nav-link:hover span::before {
          transition-delay: 0.2s;
        }

        .nav-link:hover span::after {
          transition-delay: 0s;
        }

        /* For dropdown items */
        .dropdown-item {
          position: relative;
          overflow: hidden;
        }

        .dropdown-item::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(244, 121, 32, 0.1),
            transparent
          );
          transition: 0.5s;
        }

        .dropdown-item:hover::before {
          left: 100%;
        }

        .dropdown-item::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #f47920;
          transition: width 0.3s ease;
        }

        .dropdown-item:hover::after {
          width: 100%;
        }

        /* Prevent text move on dropdown hover */
        .dropdown-toggle div {
          margin-right: 5px !important;
          transition: transform 0.3s ease;
        }

        .dropdown-toggle:hover div {
          transform: translateY(2px);
        }
      `}</style>
      <div className="top-page d-flex align-items-center justify-content-between container">
        <div className="d-flex align-items-center gap-2 item">
          <Image
            src="/assets/icons/email.svg"
            alt="email"
            width={20}
            height={20}
          />
          <h6 className="mb-0 font-semibold text-[14px] text-[#5B5B5B]">
            کد پستی: ۱۱۱۳۱-۷۴۸۱۱ - صندوق پستی: ۹۸۷۶-۱۲۳۴۵۶
          </h6>
        </div>
        <hr />
        <div className="d-flex align-items-center gap-2 item">
          <Image
            src="/assets/icons/phone.svg"
            alt="phone"
            width={20}
            height={20}
          />
          <h6 className="mb-0 font-semibold text-[14px] text-[#5B5B5B]">
            مرکز تماس : ۲۸۴۹-۴۲۴-۰۲۱
          </h6>
        </div>
        <hr />
        <div className="d-flex align-items-center gap-2 item">
          <Image
            src="/assets/icons/location.svg"
            alt="location"
            width={20}
            height={20}
          />
          <h6 className="mb-0 font-semibold text-[14px] text-[#5B5B5B]">
            آدرس: استان فارس، کیلومتر ۳۵ جاده داراب - شیراز
          </h6>
        </div>
      </div>

      {/* Web Navigation */}
      <nav className="web-nav navbar navbar-expand-lg">
        <div className="d-flex w-100 gap-2">
          <Link className="navbar-brand bg-white mr-custom" href="/">
            <div className="bg-logo"></div>
            <Image
              src="/assets/images/logo.svg"
              alt="Logo"
              width={100}
              height={50}
            />
          </Link>

          <div className="d-flex align-items-center justify-content-between w-100 bg-customize-dark ml-custom py-2">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link font-semibold text-base text-white dropdown-toggle d-flex align-items-center"
                  href="#"
                  role="button"
                  aria-expanded="false"
                >
                  <span>سیمان داراب</span>
                  <div style={{ width: "20px", marginRight: "5px" }}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.2797 5.9668L8.93306 10.3135C8.41973 10.8268 7.57973 10.8268 7.06639 10.3135L2.71973 5.9668"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/about-us">
                      تاریخچه
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/about-us/policy">
                      خط مشی
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/about-us/values">
                      ارزشهای سیمان داراب
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/about-us/presidency">
                      حوزه ریاست
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/about-us/deputies">
                      معاونت ها
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/contact-us">
                      ارتباط با شرکت
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/about-us/subsidiaries">
                      مجموعه های وابسته
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/about-us/achievements">
                      افتخارات و دستاوردها
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/about-us/assemblies">
                      مجامع عمومی
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link text-white font-semibold text-base dropdown-toggle d-flex align-items-center"
                  href="#"
                  role="button"
                  aria-expanded="false"
                >
                  <span>بازرگانی</span>
                  <div style={{ width: "20px", marginRight: "5px" }}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.2797 5.9668L8.93306 10.3135C8.41973 10.8268 7.57973 10.8268 7.06639 10.3135L2.71973 5.9668"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-header text-center fw-bold">فروش</li>
                  <li>
                    <a className="dropdown-item" href="/commerce/price">
                      قیمت سیمان
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/commerce/ticket">
                      ثبت و ارسال تیکت
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/commerce/ticket-tracking"
                    >
                      پیگیری تیکت ارسال شده
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/commerce/sales-contact">
                      ارتباط آنلاین با کارشناس فروش
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/commerce/complaints">
                      سیستم شکایات مشتریان
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="dropdown-header text-center fw-bold">
                    تدارکات
                  </li>
                  <li>
                    <a className="dropdown-item" href="/commerce/tender">
                      مناقصه و مزایده
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/commerce/cooperation">
                      ثبت درخواست همکاری
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/commerce/business-contact"
                    >
                      ارتباط با کارشناس بازرگانی
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/commerce/supplier-survey"
                    >
                      نظرسنجی و رضایت سنجی از تامین کنندگان
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link text-white dropdown-toggle d-flex align-items-center"
                  href="#"
                  role="button"
                  aria-expanded="false"
                >
                  <span>استاندارد و کیفیت</span>
                  <div style={{ width: "20px", marginRight: "5px" }}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.2797 5.9668L8.93306 10.3135C8.41973 10.8268 7.57973 10.8268 7.06639 10.3135L2.71973 5.9668"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/quality/products">
                      محصولات
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/quality/laboratory">
                      آزمایشگاه
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/quality/concrete-lab">
                      آزمایشگاه بتن
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/quality/certificates">
                      گواهی نامه های کیفیت
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link text-white dropdown-toggle d-flex align-items-center"
                  href="#"
                  role="button"
                  aria-expanded="false"
                >
                  پرتال مشتریان
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link text-white dropdown-toggle d-flex align-items-center"
                  href="#"
                  role="button"
                  aria-expanded="false"
                >
                  <span>منابع انسانی</span>
                  <div style={{ width: "20px", marginRight: "5px" }}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.2797 5.9668L8.93306 10.3135C8.41973 10.8268 7.57973 10.8268 7.06639 10.3135L2.71973 5.9668"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/hr/deputies">
                      معاونین
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/hr/managers">
                      مدیران
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/hr/recruitment">
                      جذب نیرو
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/hr/attendance">
                      سامانه تردد
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/hr/loan">
                      درخواست وام
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/hr/suggestions">
                      نظام پیشنهادات
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link text-white dropdown-toggle d-flex align-items-center"
                  href="#"
                  role="button"
                  aria-expanded="false"
                >
                  <span>خانواده سیمان داراب</span>
                  <div style={{ width: "20px", marginRight: "5px" }}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.2797 5.9668L8.93306 10.3135C8.41973 10.8268 7.57973 10.8268 7.06639 10.3135L2.71973 5.9668"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/family/competitions">
                      مسابقات
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/family/events">
                      مناسبت ها
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/family/environment">
                      محیط زیست
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/family/my-tree">
                      طرح درخت من
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/family/sports-welfare">
                      ورزش و امور رفاهی
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/family/social-responsibility"
                    >
                      مسئولیت های اجتماعی
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link text-white dropdown-toggle d-flex align-items-center"
                  href="#"
                  role="button"
                  aria-expanded="false"
                >
                  <span>بسیج کارگری</span>
                  <div style={{ width: "20px", marginRight: "5px" }}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.2797 5.9668L8.93306 10.3135C8.41973 10.8268 7.57973 10.8268 7.06639 10.3135L2.71973 5.9668"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      href="/basij/shahid-rajaee"
                      style={{ color: "#f47920", fontWeight: "bold" }}
                    >
                      پایگاه بسیج شهید رجایی
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <div>
              <Image
                src="/assets/images/img-top.svg"
                alt="Top"
                width={100}
                height={50}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="mobile-nav navbar fixed-top">
        <div className="container-fluid gap-2 p-0">
          <Link className="navbar-brand py-0" href="/">
            <Image
              src="/assets/images/logo.svg"
              alt="Logo"
              width={47}
              height={47}
            />
          </Link>
          <div
            className="bg-customize-dark w-100"
            style={{ flex: 1, textAlign: "end" }}
          >
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <Image
                src="/assets/icons/menu.svg"
                className="p-2"
                alt="Menu"
                width={40}
                height={40}
              />
            </button>
          </div>
          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <Image
                src="/assets/images/logo.svg"
                alt="Logo"
                width={47}
                height={47}
              />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link font-semibold text-base dropdown-toggle d-flex align-items-center"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span>سیمان داراب</span>
                    <div style={{ width: "20px", marginRight: "5px" }}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.2797 5.9668L8.93306 10.3135C8.41973 10.8268 7.57973 10.8268 7.06639 10.3135L2.71973 5.9668"
                          stroke="#000"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/about-us">
                        تاریخچه
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/about-us/policy">
                        خط مشی
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/about-us/values">
                        ارزشهای سیمان داراب
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/about-us/presidency">
                        حوزه ریاست
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/about-us/deputies">
                        معاونت ها
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/contact-us">
                        ارتباط با شرکت
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/about-us/subsidiaries"
                      >
                        مجموعه های وابسته
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/about-us/achievements"
                      >
                        افتخارات و دستاوردها
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/about-us/assemblies">
                        مجامع عمومی
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link font-semibold text-base dropdown-toggle d-flex align-items-center"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span>بازرگانی</span>
                    <div style={{ width: "20px", marginRight: "5px" }}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.2797 5.9668L8.93306 10.3135C8.41973 10.8268 7.57973 10.8268 7.06639 10.3135L2.71973 5.9668"
                          stroke="#000"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-header text-center fw-bold">
                      فروش
                    </li>
                    <li>
                      <a className="dropdown-item" href="/commerce/price">
                        قیمت سیمان
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/commerce/ticket">
                        ثبت و ارسال تیکت
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/commerce/ticket-tracking"
                      >
                        پیگیری تیکت ارسال شده
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/commerce/sales-contact"
                      >
                        ارتباط آنلاین با کارشناس فروش
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/commerce/complaints">
                        سیستم شکایات مشتریان
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li className="dropdown-header text-center fw-bold">
                      تدارکات
                    </li>
                    <li>
                      <a className="dropdown-item" href="/commerce/tender">
                        مناقصه و مزایده
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/commerce/cooperation">
                        ثبت درخواست همکاری
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/commerce/business-contact"
                      >
                        ارتباط با کارشناس بازرگانی
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/commerce/supplier-survey"
                      >
                        نظرسنجی و رضایت سنجی از تامین کنندگان
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span>استاندارد و کیفیت</span>
                    <div style={{ width: "20px", marginRight: "5px" }}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.2797 5.9668L8.93306 10.3135C8.41973 10.8268 7.57973 10.8268 7.06639 10.3135L2.71973 5.9668"
                          stroke="#000"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/quality/products">
                        محصولات
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/quality/laboratory">
                        آزمایشگاه
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/quality/concrete-lab">
                        آزمایشگاه بتن
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/quality/certificates">
                        گواهی نامه های کیفیت
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span>پرتال مشتریان</span>
                    <div style={{ width: "20px", marginRight: "5px" }}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.2797 5.9668L8.93306 10.3135C8.41973 10.8268 7.57973 10.8268 7.06639 10.3135L2.71973 5.9668"
                          stroke="#000"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/basij/shahid-rajaee">
                        پایگاه بسیج شهید رجایی
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span>منابع انسانی</span>
                    <div style={{ width: "20px", marginRight: "5px" }}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.2797 5.9668L8.93306 10.3135C8.41973 10.8268 7.57973 10.8268 7.06639 10.3135L2.71973 5.9668"
                          stroke="#000"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/hr/deputies">
                        معاونین
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/hr/managers">
                        مدیران
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/hr/recruitment">
                        جذب نیرو
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/hr/attendance">
                        سامانه تردد
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/hr/loan">
                        درخواست وام
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/hr/suggestions">
                        نظام پیشنهادات
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span>خانواده سیمان داراب</span>
                    <div style={{ width: "20px", marginRight: "5px" }}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.2797 5.9668L8.93306 10.3135C8.41973 10.8268 7.57973 10.8268 7.06639 10.3135L2.71973 5.9668"
                          stroke="#000"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/family/competitions">
                        مسابقات
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/family/events">
                        مناسبت ها
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/family/environment">
                        محیط زیست
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/family/my-tree">
                        طرح درخت من
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/family/sports-welfare"
                      >
                        ورزش و امور رفاهی
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/family/social-responsibility"
                      >
                        مسئولیت های اجتماعی
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span>بسیج کارگری</span>
                    <div style={{ width: "20px", marginRight: "5px" }}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.2797 5.9668L8.93306 10.3135C8.41973 10.8268 7.57973 10.8268 7.06639 10.3135L2.71973 5.9668"
                          stroke="#000"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="/basij/shahid-rajaee"
                        style={{ color: "#f47920", fontWeight: "bold" }}
                      >
                        پایگاه بسیج شهید رجایی
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
