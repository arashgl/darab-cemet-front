"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import { RiSearchLine } from "react-icons/ri";

interface BlogSearchProps {
  initialQuery?: string;
  className?: string;
}

export default function BlogSearch({
  initialQuery = "",
  className = "",
}: BlogSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }

    // Reset to page 1 when search changes
    params.set("page", "1");

    router.push(`/blog?${params.toString()}`);
  }, [query, router, searchParams]);

  return (
    <div className={`relative flex w-full max-w-xs ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="جستجو..."
        className="w-full px-3 py-2 pr-9 text-sm rounded-md bg-white/90 shadow-sm backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-1 focus:ring-[#F25822]"
        dir="rtl"
      />
      <button
        onClick={handleSearch}
        className="absolute top-0 right-0 h-full px-2 text-gray-500 hover:text-[#F25822] transition-colors"
        aria-label="Search blog posts"
      >
        <RiSearchLine className="w-4 h-4" />
      </button>
    </div>
  );
}
