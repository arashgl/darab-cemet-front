import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../style.css";

import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "شرکت سیمان داراب",
  description: "وب سایت رسمی شرکت سیمان داراب",
  icons: {
    icon: "/assets/images/logo-white.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="stylesheet" href="/css/vendors/aos.css" /> */}
        {/* <link rel="stylesheet" href="/css/vendors/swiper-bundle.min.css" /> */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} font-inter antialiased`}>
        {children}
        {/* Scripts */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossOrigin="anonymous"
        />
        <Script src="/js/vendors/alpinejs.min.js" defer />
        <Script src="/js/vendors/aos.js" />
        <Script src="/js/vendors/swiper-bundle.min.js" />
        <Script src="/js/main.js" />
      </body>
    </html>
  );
}
