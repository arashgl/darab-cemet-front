import Link from "next/link";
import Image from "next/image";
import { parseImageURL } from "@/lib/parseImageURL";

interface BlogPost {
  id: string;
  title: string;
  content?: string;
  leadPicture?: string;
}

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;
  return (
    <aside className="bg-white rounded-lg shadow p-4">
      <h3 className="font-bold text-lg mb-4">مطالب مرتبط</h3>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/blog/${post.id}`}
              className="flex gap-3 items-center group"
            >
              {post.leadPicture && (
                <Image
                  src={parseImageURL(post.leadPicture)}
                  alt={post.title}
                  width={80}
                  height={60}
                  className="rounded object-cover flex-shrink-0"
                />
              )}
              <div>
                <h4 className="font-semibold text-base group-hover:text-primary transition-colors mb-1">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {post.content?.replace(/<[^>]+>/g, "").slice(0, 60)}...
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
