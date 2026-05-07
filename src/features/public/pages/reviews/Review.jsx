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

const feedbackHighlights = [
  {
    icon: ShieldCheck,
    title: "100% Secure",
    description: "Your feedback is handled privately and reviewed with care.",
    className: "bg-orange-100 text-orange-600",
  },
  {
    icon: Sparkles,
    title: "Helps us Improve",
    description: "Every review helps us polish the experience for everyone.",
    className: "bg-amber-100 text-amber-600",
  },
  {
    icon: Clock3,
    title: "Takes only 1 min",
    description: "Share quick notes, screenshots, or ideas in one place.",
    className: "bg-orange-50 text-orange-500",
  },
  {
    icon: CheckCircle2,
    title: "Real Action",
    description: "We use your input to prioritize meaningful product fixes.",
    className: "bg-yellow-100 text-yellow-600",
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-16 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        {/* Left Content */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm">
            <MessageSquareText className="h-4 w-4" />
            Feedback Center
          </div>

          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            We Value Your Feedback
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Your review helps us understand what feels smooth, what needs
            improvement, and how we can make the experience better for everyone.
          </p>

          {/* Feature Cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {feedbackHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded border border-orange-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-110 ${item.className}`}
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
        <div className="rounded border border-orange-100 bg-white p-6 shadow-2xl sm:p-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
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
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="h-12 w-full rounded border border-gray-200 px-4 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              />
            </div>

            {/* Issue */}
            <div>
              <label
                htmlFor="issue"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Issue / Feedback
              </label>
              <textarea
                id="issue"
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                rows="5"
                placeholder="Describe your issue or suggestion..."
                className="w-full resize-none rounded border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              />
            </div>

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
                className="group flex cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-orange-200 bg-orange-50 px-6 py-8 text-center transition hover:border-orange-400 hover:bg-orange-100"
              >
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded bg-white shadow-md group-hover:scale-105 transition">
                  <UploadCloud className="h-7 w-7 text-orange-500" />
                </div>

                <p className="text-sm font-semibold text-gray-700">
                  Click to upload image
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, WEBP supported
                </p>
              </label>

              {preview && (
                <div className="mt-4 overflow-hidden rounded border border-orange-100 bg-orange-50 p-3">
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium text-orange-600">
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

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
            >
              Submit Review
            </button>
          </form>

          {/* Success Message */}
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

export default ReviewPage;