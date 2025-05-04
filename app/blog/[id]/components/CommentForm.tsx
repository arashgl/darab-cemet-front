"use client";

import { useState, FormEvent } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface CommentFormProps {
  postId: string;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !email || !comment || !rating) {
      setError("لطفا تمام فیلدها را پر کنید و امتیاز خود را ثبت نمایید.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("لطفا یک ایمیل معتبر وارد کنید.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const apiUrl = process.env.API_URL || "http://localhost:3100";
      const response = await fetch(`${apiUrl}/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: { name, email },
          content: comment,
          rating,
        }),
      });

      if (!response.ok) {
        throw new Error("خطا در ارسال دیدگاه");
      }

      // Clear form
      setName("");
      setEmail("");
      setComment("");
      setRating(0);
      setSubmitMessage("دیدگاه شما با موفقیت ارسال شد.");

      // Reload page after successful submission to show the new comment
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError("خطا در ارسال دیدگاه. لطفا دوباره تلاش کنید.");
      console.error("Error submitting comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="comment-form mt-8 p-5 bg-gray-50 rounded-lg">
      <h4 className="text-lg font-bold color-primary mb-4">ارسال نظر</h4>

      {submitMessage && (
        <div className="alert alert-success mb-4">{submitMessage}</div>
      )}

      {error && <div className="alert alert-danger mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row mb-4">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              نام *
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              ایمیل *
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="comment" className="form-label">
            دیدگاه *
          </label>
          <textarea
            id="comment"
            className="form-control"
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="form-label d-block">امتیاز *</label>
          <div className="rating-input d-flex align-items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="star cursor-pointer mx-2"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                {(hoverRating || rating) >= star ? (
                  <FaStar size={30} className="text-yellow-500" />
                ) : (
                  <FaRegStar size={30} className="text-gray-300" />
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="form-check mb-4">
          <input type="checkbox" className="form-check-input" id="saveData" />
          <label className="form-check-label" htmlFor="saveData">
            ذخیره نام و ایمیلم در این مرورگر برای زمانی که دوباره دیدگاه
            می‌نویسم.
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary px-4 py-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "در حال ارسال..." : "فرستادن دیدگاه"}
        </button>
      </form>
    </div>
  );
}
