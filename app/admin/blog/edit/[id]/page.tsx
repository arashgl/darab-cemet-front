"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";
import Link from "next/link";

type EditorRef = {
  getContent: () => string;
  setContent: (content: string) => void;
};

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  published: boolean;
}

// TinyMCE specific types
interface BlobInfo {
  blob: () => Blob;
  filename: () => string;
}

interface ProgressFn {
  (percent: number): void;
}

export default function EditBlogPost({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const editorRef = useRef<EditorRef | null>(null);

  const [post, setPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/blog/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("مقاله مورد نظر یافت نشد");
          }
          throw new Error("خطا در دریافت اطلاعات مقاله");
        }

        const data = await response.json();
        setPost(data);

        // Initialize form with post data
        setTitle(data.title);
        setSlug(data.slug);
        setExcerpt(data.excerpt || "");
        setCoverImage(data.coverImage || "");
        setPublished(data.published);

        // Set editor content once it's ready
        if (editorRef.current) {
          editorRef.current.setContent(data.content);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(
          error instanceof Error ? error.message : "خطا در دریافت اطلاعات مقاله"
        );
      } finally {
        setFetchLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  // Set editor content when it's initialized and we have post data
  const handleEditorInit = (_evt: unknown, editor: EditorRef) => {
    editorRef.current = editor;
    if (post) {
      editor.setContent(post.content);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setError("لطفا عنوان مقاله را وارد کنید");
      return;
    }

    if (!editorRef.current) {
      setError("مشکلی در ویرایشگر متن وجود دارد");
      return;
    }

    const content = editorRef.current.getContent();

    if (!content) {
      setError("لطفا متن مقاله را وارد کنید");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          content,
          excerpt: excerpt || null,
          coverImage: coverImage || null,
          published,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "خطا در بروزرسانی مقاله");
      }

      // Redirect to blog management page on success
      router.push("/admin/blog");
    } catch (error: unknown) {
      console.error(error);
      setError(
        error instanceof Error
          ? error.message
          : "خطایی رخ داد. لطفا دوباره تلاش کنید"
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">ویرایش مقاله</h1>
          <Link
            href="/admin/blog"
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            بازگشت
          </Link>
        </div>

        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">ویرایش مقاله</h1>
        <Link
          href="/admin/blog"
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          بازگشت
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            عنوان مقاله <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="عنوان مقاله را وارد کنید"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            نامک (Slug)
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="slug-of-the-post"
          />
          <p className="mt-1 text-sm text-gray-500">
            تغییر نامک ممکن است باعث شکستن لینک‌ها شود. با احتیاط تغییر دهید.
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="excerpt"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            خلاصه مقاله
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="خلاصه کوتاهی از مقاله..."
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="coverImage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            آدرس تصویر شاخص
          </label>
          <input
            type="text"
            id="coverImage"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            متن مقاله <span className="text-red-500">*</span>
          </label>
          <TinyMCEEditor
            onInit={handleEditorInit}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "preview",
                "help",
                "wordcount",
                "directionality",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | ltr rtl | help",
              directionality: "rtl",
              content_style:
                "body { font-family:Vazir,Arial,sans-serif; font-size:16px }",
              language: "fa",
              images_upload_handler: (
                blobInfo: BlobInfo,
                _progress: ProgressFn
              ) =>
                new Promise<string>((resolve, reject) => {
                  // In a real implementation, you would upload the image to your server
                  // For now, we'll just create a temporary URL
                  const reader = new FileReader();
                  reader.onload = () => resolve(reader.result as string);
                  reader.onerror = () => reject("Image upload failed");
                  reader.readAsDataURL(blobInfo.blob());
                }),
            }}
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="published"
              className="mr-2 block text-sm text-gray-700"
            >
              انتشار مقاله
            </label>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            اگر این گزینه را انتخاب نکنید، مقاله به عنوان پیش‌نویس ذخیره می‌شود.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "در حال ذخیره..." : "بروزرسانی مقاله"}
          </button>
        </div>
      </form>
    </div>
  );
}
