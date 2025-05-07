"use client";

import { useEffect, useState } from "react";

interface ProductTabsProps {
  product: {
    introduction?: string;
    features?: string[];
    benefits?: string[];
    applications?: string[];
    title?: string;
    name?: string;
  };
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("sec-1");

  useEffect(() => {
    setMounted(true);

    // Initialize AOS
    import("aos").then((AosModule) => {
      AosModule.default.init({
        once: true,
        duration: 700,
        easing: "ease-out-cubic",
      });
    });

    // Handle scroll to tabs
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setActiveTab(hash);
        const element = document.getElementById(hash);
        if (element) {
          // Scroll to the element with a slight offset
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: "smooth",
          });
        }
      }
    };

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Check hash on initial load
    if (window.location.hash) {
      handleHashChange();
    }

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div>
      {/* Tab Navigation */}
      <div className="tab-menu d-flex align-items-center gap-4 mt-6">
        <a href="#sec-1" onClick={() => scrollToSection("sec-1")}>
          <div
            className={`text-xl ${
              activeTab === "sec-1" ? "color-primary" : "color-info"
            } pb-3 item ${activeTab === "sec-1" ? "active" : ""}`}
          >
            معرفی
          </div>
        </a>
        <a href="#sec-2" onClick={() => scrollToSection("sec-2")}>
          <div
            className={`text-xl ${
              activeTab === "sec-2" ? "color-primary" : "color-info"
            } pb-3 item ${activeTab === "sec-2" ? "active" : ""}`}
          >
            ویژگی
          </div>
        </a>
        <a href="#sec-3" onClick={() => scrollToSection("sec-3")}>
          <div
            className={`text-xl ${
              activeTab === "sec-3" ? "color-primary" : "color-info"
            } pb-3 item ${activeTab === "sec-3" ? "active" : ""}`}
          >
            مزایا
          </div>
        </a>
        <a href="#sec-4" onClick={() => scrollToSection("sec-4")}>
          <div
            className={`text-xl ${
              activeTab === "sec-4" ? "color-primary" : "color-info"
            } pb-3 item ${activeTab === "sec-4" ? "active" : ""}`}
          >
            کاربرد
          </div>
        </a>
      </div>
      <hr className="mt-0" />

      {/* Introduction Section */}
      <div className="mt-5" id="sec-1" data-aos="fade-up">
        <div
          className="text-2xl font-bold color-primary w-fit pb-3 pl-5 title-section"
          style={{ borderBottom: "2px solid #F25822" }}
        >
          معرفی
        </div>
        <p className="color-info font-normal text-xl mt-4">
          {product.introduction || "اطلاعات در دسترس نیست."}
        </p>
        <button
          className="btn color-primary text-lg mt-2"
          style={{ color: "#5DCCDC !important" }}
        >
          بیشتر
        </button>
      </div>
      <hr className="mt-5" />

      {/* Features Section */}
      <div className="mt-5" id="sec-2" data-aos="fade-up">
        <div
          className="text-2xl font-bold color-primary w-fit pb-3 pl-5 title-section"
          style={{ borderBottom: "2px solid #F25822" }}
        >
          ویژگی ها
        </div>
        {product.features && product.features.length > 0 ? (
          product.features.map((feature, index) => (
            <div key={index}>
              <h6 className="color-info font-normal text-xl mt-4">{feature}</h6>
              {index < (product.features?.length || 0) - 1 && <br />}
            </div>
          ))
        ) : (
          <h6 className="color-info font-normal text-xl mt-4">
            اطلاعات در دسترس نیست.
          </h6>
        )}
      </div>
      <hr className="mt-5" />

      {/* Benefits Section */}
      <div className="mt-5" id="sec-3" data-aos="fade-up">
        <div
          className="text-2xl font-bold color-primary w-fit pb-3 pl-5 title-section"
          style={{ borderBottom: "2px solid #F25822" }}
        >
          مزایا
        </div>
        {product.benefits && product.benefits.length > 0 ? (
          product.benefits.map((benefit, index) => (
            <div key={index}>
              <h6 className="color-info font-normal text-xl mt-4">{benefit}</h6>
              {index < (product.benefits?.length || 0) - 1 && <br />}
            </div>
          ))
        ) : (
          <h6 className="color-info font-normal text-xl mt-4">
            اطلاعات در دسترس نیست.
          </h6>
        )}
      </div>
      <hr className="mt-5" />

      {/* Applications Section */}
      <div className="mt-5" id="sec-4" data-aos="fade-up">
        <div
          className="text-2xl font-bold color-primary w-fit pb-3 pl-5 title-section"
          style={{ borderBottom: "2px solid #F25822" }}
        >
          کاربرد
        </div>
        {product.applications && product.applications.length > 0 ? (
          product.applications.map((application, index) => (
            <div key={index}>
              <h6 className="color-info font-normal text-xl mt-4">
                {application}
              </h6>
              {index < (product.applications?.length || 0) - 1 && <br />}
            </div>
          ))
        ) : (
          <h6 className="color-info font-normal text-xl mt-4">
            اطلاعات در دسترس نیست.
          </h6>
        )}
      </div>
      <hr className="mt-5" />
    </div>
  );
}
