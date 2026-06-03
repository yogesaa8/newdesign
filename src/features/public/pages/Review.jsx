import React, { useState } from "react";
import {
  CheckCircle2,
  Clock3,
  ImagePlus,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import useSEO from "@/seo/useSEO";
import seoMeta from "@/data/seoMeta";
import {
  buildWebPage,
  buildBreadcrumbList,
  buildContactPage,
} from "@/seo/schemas";

const feedbackHighlights = [
  {
    icon: ShieldCheck,
    title: "Handled privately",
    description: "Your feedback is read in private and never shared with recruiters or other users.",
    className: "bg-indigo-50 text-indigo-700",
  },
  {
    icon: Sparkles,
    title: "Reviewed by humans",
    description: "Every note is read by our product team within a week.",
    className: "bg-indigo-50 text-indigo-700",
  },
  {
    icon: Clock3,
    title: "Two minutes",
    description: "Short form, plain words, attach a screenshot if it helps.",
    className: "bg-indigo-50 text-indigo-700",
  },
  {
    icon: CheckCircle2,
    title: "Shipped, not shelved",
    description: "We publish a monthly changelog of fixes that came directly from feedback.",
    className: "bg-indigo-50 text-indigo-700",
  },
];

const ReviewPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    issue: "",
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "image") {
      const file = files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        alert("Please upload image files only.");
        return;
      }

      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.issue.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    setMessage("Thank you! Your feedback has been submitted successfully.");
    setFormData({
      name: "",
      issue: "",
      image: null,
    });
    setPreview("");
  };

  const meta = seoMeta["/reviews"];
  const seoElement = useSEO({
    title: meta.title,
    description: meta.description,
    path: meta.path,
    graph: [
      buildWebPage({
        path: meta.path,
        title: meta.title,
        description: meta.description,
        breadcrumbPath: meta.path,
      }),
      buildBreadcrumbList(
        [
          { name: "Home", path: "/" },
          { name: "Feedback", path: meta.path },
        ],
        meta.path,
      ),
      buildContactPage({
        path: meta.path,
        title: meta.title,
        description: meta.description,
      }),
    ],
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      {seoElement}
      <section className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        {/* Left Content */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
            <MessageSquareText className="h-4 w-4" />
            Feedback Center
          </div>

          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Help us build a better FirstJobIndia.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            You are a fresher applying for your first job. We are the team
            building the platform around you. Tell us what to fix, what to
            keep, and what to add.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {feedbackHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded border border-indigo-100 bg-white p-5 shadow-sm"
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${item.className}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded border border-indigo-100 bg-white p-6 shadow-2xl sm:p-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Share your thoughts
            </p>

            <h2 className="mt-3 text-2xl font-bold text-gray-900">
              Submit Your Review
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Report bugs, suggest improvements, or share feedback.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FloatingInput
              label="Name"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />

            <FloatingTextarea
              label="Issue / Feedback"
              id="issue"
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              rows="5"
            />

            {/* Upload */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Upload Screenshot
              </label>

              <label
                htmlFor="image"
                className="flex cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-indigo-200 bg-indigo-50 px-6 py-8 text-center hover:border-indigo-400 hover:bg-indigo-100"
              >
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded bg-white shadow-md">
                  <UploadCloud className="h-7 w-7 text-indigo-600" />
                </div>

                <p className="text-sm font-semibold text-gray-700">
                  Click to upload image
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, WEBP supported
                </p>
              </label>

              {preview && (
                <div className="mt-4 overflow-hidden rounded border border-indigo-100 bg-indigo-50 p-3">
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium text-indigo-700">
                    <ImagePlus className="h-4 w-4" />
                    Image Preview
                  </div>

                  <img
                    src={preview}
                    alt="preview"
                    className="h-44 w-full rounded object-cover"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-700 cursor-pointer"
            >
              Submit Review
            </button>
          </form>

          {message && (
            <div className="mt-5 rounded border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              {message}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

const FloatingInput = ({ label, id, type = "text", name, value, onChange }) => {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer w-full border-0 border-b border-gray-300 bg-transparent px-0 pb-3 pt-6 text-sm outline-none focus:border-indigo-600"
      />

      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-5 text-sm text-gray-500peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-indigo-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
    </div>
  );
};

const FloatingTextarea = ({ label, id, name, value, onChange, rows = "5" }) => {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder=" "
        className="peer w-full resize-none border-0 border-b border-gray-300 bg-transparent px-0 pb-3 pt-6 text-sm outline-none focus:border-indigo-600"
      />

      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-5 text-sm text-gray-500peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-indigo-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
    </div>
  );
};

export default ReviewPage;
