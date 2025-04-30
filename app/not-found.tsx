import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <Navbar />

      <main>
        {/* Breadcrumb */}
        <div className="breadcrumb-page w-100 p-2 mt-4 py-3">
          <div className="d-flex align-items-center container gap-4">
            <Link href="/">
              <h6 className="text-base font-normal mb-0 title">صفحه اصلی</h6>
            </Link>
            <h6 className="text-base font-normal active mb-0">صفحه یافت نشد</h6>
          </div>
        </div>

        <div className="container mt-10 text-center">
          <div className="not-found-wrapper py-14 px-4">
            <div className="mb-8">
              <div className="text-8xl font-bold color-primary">404</div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold color-primary mb-4">
              صفحه مورد نظر یافت نشد!
            </h1>

            <p className="text-xl color-info mb-8 max-w-2xl mx-auto">
              متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس دیگری
              منتقل شده است.
            </p>

            <div className="d-flex justify-center gap-4 flex-wrap">
              <Link
                href="/"
                className="btn btn-primary px-6 py-3 text-lg font-medium"
              >
                بازگشت به صفحه اصلی
              </Link>

              <Link
                href="/product"
                className="btn btn-outline px-6 py-3 text-lg font-medium"
                style={{ border: "1px solid #5DCCDC", color: "#5DCCDC" }}
              >
                مشاهده محصولات
              </Link>

              <Link
                href="/blog"
                className="btn btn-outline px-6 py-3 text-lg font-medium"
                style={{ border: "1px solid #5DCCDC", color: "#5DCCDC" }}
              >
                مشاهده بلاگ
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  );
}
