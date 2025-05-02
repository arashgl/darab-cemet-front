"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface TagFilterProps {
  tags: string[];
  activeTags: string[];
  className?: string;
}

export default function TagFilter({
  tags,
  activeTags,
  className = "",
}: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTagClick = useCallback(
    (tag: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const currentTags = params.get("tags")?.split(",") || [];

      let newTags: string[];
      if (currentTags.includes(tag)) {
        // Remove tag if already selected
        newTags = currentTags.filter((t) => t !== tag);
      } else {
        // Add tag if not selected
        newTags = [...currentTags, tag];
      }

      if (newTags.length > 0) {
        params.set("tags", newTags.join(","));
      } else {
        params.delete("tags");
      }

      // Reset to page 1 when filters change
      params.set("page", "1");

      router.push(`/blog?${params.toString()}`);
    },
    [router, searchParams]
  );

  if (tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`} dir="rtl">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
            activeTags.includes(tag)
              ? "bg-[#F25822] text-white font-medium shadow-sm ring-1 ring-[#e34918]"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
