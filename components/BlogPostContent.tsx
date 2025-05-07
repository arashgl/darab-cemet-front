import { parseImageURL } from "@/lib/parseImageURL";
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  content?: string;
  leadPicture?: string;
  section?: string;
  createdAt?: string;
  updatedAt?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
  readingTime?: number;
}

interface BlogPostContentProps {
  post: BlogPost;
}

function formatDate(dateString?: string): string {
  if (!dateString) return "تاریخ نامشخص";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR");
  } catch {
    return "تاریخ نامشخص";
  }
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="bg-white rounded-lg shadow p-6 mb-8" dir="rtl">
      {post.leadPicture && (
        <div className="mb-6">
          <Image
            src={parseImageURL(post.leadPicture)}
            alt={post.title}
            width={800}
            height={400}
            className="rounded-lg w-full object-cover"
            priority
          />
        </div>
      )}
      <h1 className="text-2xl font-bold mb-2 text-gray-800">{post.title}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        {post.author?.avatar && (
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <span>{post.author?.name}</span>
        <span>•</span>
        <span>{formatDate(post.createdAt)}</span>
        {post.readingTime && <span>• {post.readingTime} دقیقه مطالعه</span>}
      </div>
      {post.tags && post.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 text-xs rounded px-2 py-1 text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div
        className="prose prose-lg max-w-none text-justify"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />
    </article>
  );
}
