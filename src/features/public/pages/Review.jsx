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
    className:
      "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-200",
  },
  {
    icon: Sparkles,
    title: "Helps us Improve",
    description: "Every review helps us polish the experience for everyone.",
    className:
      "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-200",
  },
  {
    icon: Clock3,
    title: "Takes only 1 min",
    description: "Share quick notes, screenshots, or ideas in one place.",
    className:
      "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-200",
  },
  {
    icon: CheckCircle2,
    title: "Real Action",
    description: "We use your input to prioritize meaningful product fixes.",
    className:
      "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-200",
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
        alert("Please upload an image file only.");
        return;
      }

      setFormData((current) => ({ ...current, image: file }));
      setPreview(URL.createObjectURL(file));
      return;
    }

    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.issue.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    setMessage("Thank you. Your review has been submitted successfully.");
    setFormData({ name: "", issue: "", image: null });
    setPreview("");
  };

  return (
    <main className="relative overflow-hidden bg-white px-4 py-16 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent dark:from-primary/20" />
      <div className="absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20" />

      <section className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.92fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur dark:bg-gray-900/70">
            <MessageSquareText className="h-4 w-4" />
            Feedback Center
          </div>

          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            We Value Your Feedback
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
            Your review helps us understand what feels smooth, what needs
            attention, and where we can make your experience better. Share an
            issue, idea, or screenshot and our team will use it to improve the
            product with real user context.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {feedbackHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-gray-200/80 bg-white/70 p-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 dark:border-gray-800 dark:bg-gray-900/70"
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-110 ${item.className}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200/80 bg-white/85 p-6 shadow-2xl shadow-gray-900/10 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-800/80 dark:shadow-black/30 sm:p-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Share your thoughts
            </p>
            <h2 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
              Submit a Review for better experience
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
              Tell us what happened, what you expected, or what would make this
              page more useful.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
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
                className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition duration-300 placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
              />
            </div>            

            <div>
              <label
                htmlFor="issue"
                className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
              >
                Issue / Feedback
              </label>
              <textarea
                id="issue"
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                rows="6"
                placeholder="Describe your feedback, issue, or suggestion..."
                className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition duration-300 placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
              >
                Image Upload
              </label>
              <label
                htmlFor="image"
                className="group flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50/80 px-6 py-8 text-center transition duration-300 hover:border-primary hover:bg-primary/5 dark:border-gray-700 dark:bg-gray-900/70 dark:hover:border-primary"
              >
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-sm transition duration-300 group-hover:scale-105 dark:bg-gray-800">
                  <UploadCloud className="h-7 w-7" />
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Drop an image here or click to browse
                </p>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                  PNG, JPG, or WEBP screenshots are supported.
                </p>
              </label>

              {preview && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-900">
                  <div className="mb-2 flex items-center gap-2 px-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                    <ImagePlus className="h-4 w-4 text-primary" />
                    Image preview
                  </div>
                  <img
                    src={preview}
                    alt="Uploaded feedback preview"
                    className="h-40 w-full rounded-xl object-cover"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
            >
              <span className="relative z-10 text-sm font-semibold text-white">
                Submit Review
              </span>
            </button>
          </form>

          {message && (
            <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-medium text-primary dark:bg-primary/15">
              {message}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ReviewPage;
