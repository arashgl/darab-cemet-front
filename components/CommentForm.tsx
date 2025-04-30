"use client";

import { useState } from "react";

export default function CommentForm() {
  const [formData, setFormData] = useState({
    comment: "",
    fullName: "",
    email: "",
    saveInfo: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        saveInfo: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted with data:", formData);
    // Reset form or show success message
  };

  return (
    <form className="row mt-4 gy-4 comment-form" onSubmit={handleSubmit}>
      <div className="col-12">
        <label htmlFor="comment" className="form-label text-xl color-info">
          دیدگاه *
        </label>
        <textarea
          className="form-control"
          id="comment"
          name="comment"
          rows={10}
          value={formData.comment}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="col-12 col-md-4 col-lg-3">
        <label htmlFor="fullName" className="form-label mt-3">
          نام
        </label>
        <input
          type="text"
          className="form-control"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>
      <div className="col-12 col-md-4 col-lg-3">
        <label htmlFor="email" className="form-label text-xl">
          ایمیل *
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-check mt-4 col-12">
        <input
          name="saveInfo"
          className="form-check-input"
          type="checkbox"
          id="checkDefault"
          checked={formData.saveInfo}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="checkDefault">
          ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
          می‌نویسم.
        </label>
      </div>
      <button className="btn btn-primary w-auto mx-2" type="submit">
        فرستادن دیدگاه
      </button>
    </form>
  );
}
