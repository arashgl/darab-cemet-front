"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  className = "",
}: PaginationProps) {
  const searchParams = useSearchParams();

  // Create URL with updated page parameter
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `/blog?${params.toString()}`;
  };

  // Don't show pagination if only one page
  if (totalPages <= 1) return null;

  // Calculate page range to display
  let startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + 2);

  // Adjust if at the end
  if (endPage - startPage < 2) {
    startPage = Math.max(1, endPage - 2);
  }

  return (
    <nav className={`flex justify-center items-center gap-1 mt-8 ${className}`}>
      {/* Previous page */}
      {currentPage > 1 && (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
          aria-label="Previous page"
        >
          <RiArrowRightSLine className="w-5 h-5" />
        </Link>
      )}

      {/* First page and ellipsis if needed */}
      {startPage > 1 && (
        <>
          <Link
            href={createPageUrl(1)}
            className={`w-10 h-10 flex items-center justify-center rounded-md border text-sm font-medium transition-colors bg-white border-gray-300 text-gray-600 hover:bg-gray-50 shadow-sm`}
          >
            1
          </Link>
          {startPage > 2 && (
            <span className="w-10 h-10 flex items-center justify-center text-gray-400">
              ...
            </span>
          )}
        </>
      )}

      {/* Page range */}
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      ).map((page) => (
        <Link
          key={page}
          href={createPageUrl(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-md border text-sm font-medium transition-colors shadow-sm ${
            page === currentPage
              ? "bg-[#F25822] text-white border-[#e34918] ring-1 ring-[#e34918]"
              : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
          }`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </Link>
      ))}

      {/* Last page and ellipsis if needed */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="w-10 h-10 flex items-center justify-center text-gray-400">
              ...
            </span>
          )}
          <Link
            href={createPageUrl(totalPages)}
            className={`w-10 h-10 flex items-center justify-center rounded-md border text-sm font-medium transition-colors bg-white border-gray-300 text-gray-600 hover:bg-gray-50 shadow-sm`}
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next page */}
      {currentPage < totalPages && (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
          aria-label="Next page"
        >
          <RiArrowLeftSLine className="w-5 h-5" />
        </Link>
      )}
    </nav>
  );
}
