import Image from "next/image";
import Link from "next/link";
import { parseImageURL } from "@/lib/parseImageURL";
import { formatDate } from "@/lib/formatDate";

interface BlogCardProps {
  id: string;
  title: string;
  summary?: string;
  leadPicture?: string;
  createdAt?: string;
  description?: string;
  tags?: string[];
}

export default function BlogCard({
  id,
  title,
  summary,
  leadPicture,
  createdAt,
  description,
  tags,
}: BlogCardProps) {
  // Default image paths
  const defaultImagePath = "/assets/images/landing/placeholder.jpg";

  // Parse image URLs safely, ensuring they're always strings
  const leadImageUrl = leadPicture
    ? parseImageURL(leadPicture) || defaultImagePath
    : defaultImagePath;

  return (
    <Link href={`/blog/${id}`} className="group block h-full">
      <article className="h-full flex flex-col overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={leadImageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {tags && tags.length > 0 && (
            <div className="absolute top-3 right-3">
              <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-[#F25822] rounded-md shadow-sm">
                {tags[0]}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col p-5">
          <h3
            className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2 group-hover:text-[#F25822] transition-colors"
            dir="rtl"
          >
            {title}
          </h3>

          {summary && (
            <p className="text-gray-600 mb-4 text-sm line-clamp-3" dir="rtl">
              {summary}
            </p>
          )}

          {description && (
            <p className="text-gray-600 mb-2 text-sm line-clamp-2" dir="rtl">
              {description}
            </p>
          )}

          <p className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
            {createdAt && (
              <time className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {formatDate(createdAt)}
              </time>
            )}
          </p>
        </div>
      </article>
    </Link>
  );
}
