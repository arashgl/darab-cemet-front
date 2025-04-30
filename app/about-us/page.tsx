"use client";

import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import Navbar from "@/components/Navbar";

export default function AboutUs() {
  const [mounted, setMounted] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    setMounted(true);

    const initSwiper = async () => {
      try {
        // Dynamically import Swiper
        const SwiperModule = await import("swiper");
        const Swiper = SwiperModule.default;

        // Initialize AOS
        import("aos").then((AosModule) => {
          AosModule.default.init({
            once: true,
            duration: 700,
            easing: "ease-out-cubic",
          });
        });

        // Initialize gallery Swiper
        if (document.querySelector(".gallery-swiper")) {
          swiperRef.current = new Swiper(".gallery-swiper", {
            slidesPerView: 2,
            spaceBetween: 24,
            pagination: {
              el: ".gallery-pagination",
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
                slidesPerView: 4,
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
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <Navbar />

      <main className="about-us">
        {/* Breadcrumb */}
        <div className="breadcrumb-page w-100 p-2 mt-4 py-3">
          <div className="d-flex align-items-center container gap-4">
            <h6 className="text-base font-normal mb-0 title">صفحه اصلی</h6>
            <h6 className="text-base font-normal mb-0">درباره ما</h6>
          </div>
        </div>

        <div className="container">
          {/* Banner Image */}
          <div className="img-box mt-4">
            <Image
              src="/assets/images/banner-aboutUs.svg"
              alt="Banner About Us"
              width={1200}
              height={500}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </div>

          {/* Company History Section */}
          <section className="mt-5" data-aos="fade-up">
            <div className="title-div">
              <h6 className="btn-primary btn text-white text-xl">
                تاریخچه شرکت سیمان داراب
              </h6>
              <hr />
            </div>
            <p className="color-info mt-4">
              شرکت سیمان داراب در سال ۱۳۶۶ به صورت سهامی عام و تحت شماره ۶۸۵۱۳
              در اداره ثبت شرکتها و مالکیت صنعتی تهران، با هدف احداث کارخانه
              ۲۰۰۰ تنی به ثبت رسید که بعداً به ۳۰۰۰ تن در روز تغییر کرد.در تاریخ
              ۱۳۷۵/۲/۱۷ طبق مصوبه شورای محترم اقتصاد، مقرر شد وزارت صنایع از
              طریق شرکت احداث صنعت نسبت به مشارکت و ادامه فعالیت طرح، اقدام
              نماید. پس از ورود شرکت احداث صنعت به جرگه سهامداران و تأمین نسبی
              منابع مالی مورد نیاز، اجرای پروژه شتاب بیشتری یافت و پیشرفت قابل
              ملاحظه‌ای در طول سالهای ۱۳۷۷ لغایت ۱۳۸۱ حاصل شد. سرانجام در ۱۱
              خرداد ماه سال ۱۳۸۲ با تولید روزانه ۳۰۰۰ تن کلینکر رسماً به
              بهره‌برداری رسید.
            </p>
          </section>

          {/* Company Opening Section */}
          <section className="mt-5" data-aos="fade-up" data-aos-delay="100">
            <div className="title-div">
              <h6 className="btn-primary btn text-white text-xl">
                افتتاح شرکت سیمان داراب
              </h6>
              <hr />
            </div>
            <div className="d-flex align-items-center gap-5 flex-col-mobile">
              <p className="color-info mt-4 flex-1">
                افتتاح كارخانه سيمان خاكستري ۳۰۰۰ تني داراب با توجه به وجود
                معادن غني مرغوب و مجاورت با خطوط ترانزيت و نزديكي به بنادر
                صادراتي و موقعيت خاص جغرافیایی داراب در توزيع سيمان و در جهت
                پوشش پروژه‌هاي بزرگ عمراني استان فارس و استان‌هاي مجاور (به جهت
                نياز آنها به سيمان تیپ ۲ و ۵ كه كارخانه سيمان داراب در حال حاضر
                تنها توليد كننده آن در منطقه است)، از جمله اهدافي بوده كه توسط
                مديران متخصص شركت، دنبال شده است.
              </p>
              <div className="img-box flex-1">
                <Image
                  src="/assets/images/img3.svg"
                  alt="Cement Factory"
                  width={500}
                  height={300}
                  className="rounded-sm"
                />
              </div>
            </div>

            {/* Company Mission Section */}
            <div className="bg-img mt-5" data-aos="fade-up">
              <h1 className="text-white">مأموريت شركت سیمان داراب</h1>
              <p className="text-white mt-5">
                فعالیت شرکت، تولید انواع سیمان خاکستری با کیفیت مطلوب و عرضه در
                بازارهای داخلی و خارجی است. فلسفه وجودی شرکت، عمران، آبادانی و
                تسهیل زیرساختهای بخشی از کشور می‌باشد. ویژگی‌های متمایز شرکت،
                دانایی و هوشمندی است. ما با تکاپوی تحولات دانشی، تکنولوژیکی و
                بهبود روزافزون، از جمله شرکت‌های پیشرو در صنعت سیمان کشور هستیم.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mt-5" data-aos="fade-up" data-aos-delay="200">
            <div className="title-div">
              <h6 className="btn-primary btn text-white text-xl">
                سوالات متداول
              </h6>
              <hr />
            </div>

            <div className="accordion mt-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    لورم ایپسوم سوال ؟
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان گرافیک است.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    لورم ایپسوم سوال ؟
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان گرافیک است.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    لورم ایپسوم سوال ؟
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان گرافیک است.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFor"
                    aria-expanded="false"
                    aria-controls="collapseFor"
                  >
                    لورم ایپسوم سوال ؟
                  </button>
                </h2>
                <div
                  id="collapseFor"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان گرافیک است.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    لورم ایپسوم سوال ؟
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان گرافیک است.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section className="mt-5" data-aos="fade-up" data-aos-delay="300">
            <div className="title-div">
              <h6 className="btn-primary btn text-white text-xl">
                گالری تصاویر
              </h6>
              <hr />
              <button
                className="btn btn-secondary"
                style={{ backgroundColor: "transparent !important" }}
              >
                مشاهده همه
              </button>
            </div>

            <div className="overflow-x-hidden mt-5">
              <div className="testimonials-carousel gallery-swiper swiper-container group">
                <div className="swiper-wrapper w-fit" data-highlighter>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="swiper-slide h-auto relative absolute group/slide"
                    >
                      <div className="relative h-full rounded-xl">
                        <div>
                          <Image
                            src="/assets/images/image.png"
                            alt={`Gallery image ${index + 1}`}
                            width={300}
                            height={290}
                            className="rounded-xl"
                            style={{ height: "290px" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="swiper-pagination gallery-pagination"></div>
            </div>
          </section>
        </div>
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  );
}
