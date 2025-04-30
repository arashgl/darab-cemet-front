"use client";

import { useEffect, useState, useRef } from "react";
import Footer from "@/components/Footer";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function ContactUs() {
  const [mounted, setMounted] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const initMap = async () => {
      if (!mapRef.current) return;

      // Initialize AOS
      import("aos").then((AosModule) => {
        AosModule.default.init({
          once: true,
          duration: 700,
          easing: "ease-out-cubic",
        });
      });

      // Only import Leaflet on the client-side
      const L = (await import("leaflet")).default;

      // Fix the icon paths issue with webpack
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      });

      // Create map instance
      const map = L.map(mapRef.current).setView([28.7519, 54.5445], 14); // Darab, Iran coordinates

      // Add tile layer (Google Maps style)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add marker
      const marker = L.marker([28.7519, 54.5445]).addTo(map);
      marker.bindPopup("<b>شرکت سیمان داراب</b>").openPopup();
    };

    if (mounted) {
      initMap();
    }

    return () => {
      // Cleanup code if needed
    };
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <Navbar />

      <main className="contact-us">
        {/* Breadcrumb */}
        <div className="breadcrumb-page w-100 p-2 mt-4 py-3">
          <div className="d-flex align-items-center container gap-4">
            <h6 className="text-base font-normal mb-0 title">صفحه اصلی</h6>
            <h6 className="text-base font-normal mb-0">تماس با ما</h6>
          </div>
        </div>

        {/* Contact Info Banner */}
        <div
          className="bordered py-5 px-2 bg-[#F2582208] border-primary-1 container rounded-sm mt-5"
          data-aos="fade-up"
        >
          <h2 className="text-3xl text-center">
            پاسخ دهی شنبه تا پنج شنبه / 8 صبح الی 8 شب
          </h2>
          <div className="top-page d-flex align-items-center justify-content-between container mt-4">
            <div className="d-flex align-items-center gap-2 item">
              <Image
                src="/assets/icons/email.svg"
                alt="Email icon"
                width={24}
                height={24}
              />
              <h6 className="mb-0 font-semibold text-base text-[#F25822]">
                کد پستی: ۱۱۱۳۱-۷۴۸۱۱ - صندوق پستی: ۹۸۷۶-۱۲۳۴۵۶
              </h6>
            </div>
            <hr />
            <div className="d-flex align-items-center gap-2 item">
              <Image
                src="/assets/icons/phone.svg"
                alt="Phone icon"
                width={24}
                height={24}
              />
              <h6 className="mb-0 font-semibold text-base text-[#F25822]">
                مرکز تماس : ۲۸۴۹-۴۲۴-۰۲۱
              </h6>
            </div>
            <hr />
            <div className="d-flex align-items-center gap-2 item">
              <Image
                src="/assets/icons/location.svg"
                alt="Location icon"
                width={24}
                height={24}
              />
              <h6 className="mb-0 font-semibold text-base text-[#F25822]">
                آدرس: استان فارس، کیلومتر ۳۵ جاده داراب - شیراز
              </h6>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <h1 className="font-semibold text-2xl text-center mt-6">
            آدرس شرکت روی نقشه
          </h1>
          <p
            className="color-info text-xl mt-4"
            style={{ textAlign: "justify" }}
          >
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.لورم ایپسوم
            متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
            گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
            که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع
            با هدف بهبود ابزارهای کاربردی می باشد.
          </p>

          {/* Map Container */}
          <div
            ref={mapRef}
            id="map"
            style={{
              height: "400px",
              width: "100%",
              borderRadius: "4px",
              marginTop: "1.5rem",
            }}
            className="leaflet-container"
          />
        </div>

        {/* Contact Form */}
        <div className="container" data-aos="fade-up" data-aos-delay="200">
          <h1 className="font-semibold text-2xl text-center mt-6">
            جهت ارسال پیام به مدیر مورد نظر، فرم زیر را تکمیل و ارسال نمائید
          </h1>
          <div className="row mt-4 gy-4">
            <div className="col-12 col-md-6 col-lg-4">
              <label htmlFor="fullName" className="form-label">
                نام و نام خانوادگی
              </label>
              <input type="text" className="form-control" id="fullName" />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <label htmlFor="phoneNumber" className="form-label">
                شماره تماس
              </label>
              <input type="number" className="form-control" id="phoneNumber" />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <label htmlFor="title" className="form-label">
                موضوع
              </label>
              <input type="text" className="form-control" id="title" />
            </div>
            <div className="col-12">
              <label htmlFor="text" className="form-label">
                متن پیام / درخواست:
              </label>
              <textarea className="form-control" id="text" rows={6} />
            </div>
          </div>
          <div className="d-flex align-items-center gap-4 mt-4 mb-5">
            <select
              className="form-select w-25 custom-select"
              aria-label="گیرنده:"
            >
              <option value="1">گیرنده</option>
              <option value="2">گیرنده</option>
              <option value="3">گیرنده</option>
            </select>
            <button className="btn btn-primary px-4">ارسال</button>
          </div>
        </div>
      </main>

      {/* Site footer */}
      <Footer />

      {/* We need to add the Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
      />
    </div>
  );
}
