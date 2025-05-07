import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  current: string;
}

export default function Breadcrumbs({ items, current }: BreadcrumbsProps) {
  return (
    <nav
      className="flex items-center text-sm text-gray-600"
      aria-label="breadcrumb"
      dir="rtl"
    >
      {items.map((item) => (
        <span key={item.label} className="flex items-center text-orange-600">
          {item.href ? (
            <Link href={item.href} className="text-black hover:underline">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
          <span className="mx-2">
            <FaChevronLeft />
          </span>
        </span>
      ))}
      <span className="font-medium text-gray-800">{current}</span>
    </nav>
  );
}
