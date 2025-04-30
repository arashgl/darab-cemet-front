"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";
import Link from "next/link";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";

type EditorRef = {
  getContent: () => string;
};

export default function CreateBlogPost() {
  const router = useRouter();
  const editorRef = useRef<EditorRef | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Automatically generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    // Only auto-generate slug if user hasn't manually changed it
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(newTitle));
    }
  };

  // Generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\u0600-\u06FF\s]/g, "") // Keep Persian characters
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
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

      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          content,
          excerpt,
          coverImage,
          published,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "خطا در ایجاد مقاله");
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

  return (
    <>
      <Navbar />
      <main className="container mx-auto py-8">
        <div className="flex items-center mb-8">
          <Link
            href="/admin/blog"
            className="text-indigo-600 hover:text-indigo-900 ml-4"
          >
            بازگشت به لیست بلاگ ها
          </Link>
          <h1 className="text-3xl font-bold color-primary">ایجاد مقاله جدید</h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              عنوان مقاله <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={title}
              onChange={handleTitleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="عنوان مقاله را وارد کنید"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              نامک (Slug)
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="slug-of-the-post"
            />
            <p className="mt-1 text-sm text-gray-500">
              نامک در URL مقاله استفاده می‌شود. اگر خالی بگذارید، به صورت خودکار
              از عنوان ساخته می‌شود.
            </p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="excerpt"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              خلاصه مقاله
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="خلاصه کوتاهی از مقاله..."
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="coverImage"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              آدرس تصویر شاخص
            </label>
            <input
              type="text"
              id="coverImage"
              name="coverImage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              متن مقاله <span className="text-red-500">*</span>
            </label>
            <TinyMCEEditor
              onInit={(_evt, editor) => (editorRef.current = editor)}
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
                images_upload_handler: (blobInfo: any, _progress: any) =>
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
              اگر این گزینه را انتخاب نکنید، مقاله به عنوان پیش‌نویس ذخیره
              می‌شود.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary px-6 py-3 text-white rounded-md ${
                loading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "در حال ذخیره..." : "ذخیره مقاله"}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
