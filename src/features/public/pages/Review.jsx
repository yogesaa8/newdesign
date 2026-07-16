import { useState } from "react";
import toast from "@/lib/toast";
import {
  CheckCircle2,
  ImagePlus,
  MessageSquareText,
  UploadCloud,
  Lightbulb,
  Bug,
  Sparkles,
} from "lucide-react";
import useSEO from "@/seo/useSEO";
import seoMeta from "@/data/seoMeta";
import {
  buildWebPage,
  buildBreadcrumbList,
  buildContactPage,
} from "@/seo/schemas";
import Footer from "../components/Footer";

const FEEDBACK_TYPES = [
  { id: "bug", label: "Bug report", icon: Bug, color: "text-error bg-error-bg border-error/20" },
  { id: "idea", label: "Feature idea", icon: Lightbulb, color: "text-warning bg-warning-bg border-warning/20" },
  { id: "general", label: "General feedback", icon: MessageSquareText, color: "text-sk-primary bg-sk-surface border-sk-border" },
];

const TRUST_NOTES = [
  "Private — only our team reads this",
  "We respond to every actionable report",
  "Screenshots always helpful",
];

const ReviewPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "general",
    issue: "",
    image: null,
  });
  const [preview, setPreview] = useState("");

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "image") {
      const file = files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload image files only.");
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
      toast.error("Please fill all required fields.");
      return;
    }
    toast.success("Thank you. Your feedback has been submitted.");
    setFormData({ name: "", type: "general", issue: "", image: null });
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
    <>
      {seoElement}
      <main className="min-h-screen bg-n-50 text-n-900">

        {/* Hero */}
        <section className="border-b border-n-200 bg-white px-4 py-16 text-center">
          <div className="mx-auto max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-sk-surface px-4 py-1.5 text-xs font-semibold text-sk-primary">
              <MessageSquareText className="h-3.5 w-3.5" />
              Feedback
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-n-900 md:text-5xl">
              Help us build a better{" "}
              <span className="text-sk-primary">first job platform</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-n-500">
              Spotted a bug? Have an idea? Something confusing? We read every
              note and ship fixes fast.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              {TRUST_NOTES.map((note) => (
                <span
                  key={note}
                  className="inline-flex items-center gap-2 rounded-full border border-n-200 bg-n-50 px-4 py-2 text-xs font-medium text-n-500"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  {note}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="px-4 py-14">
          <div className="mx-auto max-w-xl">

            {/* Trust note */}
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-sk-border bg-sk-surface p-4">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-sk-primary" />
              <p className="text-sm leading-relaxed text-n-700">
                <strong className="text-n-900">Real team, real responses.</strong>{" "}
                Feedback goes directly to the product team — not a ticketing black hole.
              </p>
            </div>

            <div className="rounded-2xl border border-n-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-xl font-bold text-n-900">Send your feedback</h2>
              <p className="mt-1 text-sm text-n-500">Takes under 2 minutes.</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">

                {/* Feedback type */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-n-500">
                    Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {FEEDBACK_TYPES.map(({ id, label, icon: Icon, color }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, type: id }))
                        }
                        className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-3 text-xs font-semibold transition ${
                          formData.type === id
                            ? color
                            : "border-n-200 bg-white text-n-500 hover:border-n-300"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-n-500"
                  >
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Priya Sharma"
                    className="w-full rounded-lg border border-n-200 bg-n-50 px-4 py-3 text-sm text-n-900 outline-none transition placeholder:text-n-400 focus:border-sk-primary focus:bg-white focus:ring-2 focus:ring-sk-primary/10"
                  />
                </div>

                {/* Feedback */}
                <div>
                  <label
                    htmlFor="issue"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-n-500"
                  >
                    Feedback <span className="text-error">*</span>
                  </label>
                  <textarea
                    id="issue"
                    name="issue"
                    value={formData.issue}
                    onChange={handleChange}
                    rows={5}
                    placeholder="What happened? What should be better? What are we missing?"
                    className="w-full resize-none rounded-lg border border-n-200 bg-n-50 px-4 py-3 text-sm text-n-900 outline-none transition placeholder:text-n-400 focus:border-sk-primary focus:bg-white focus:ring-2 focus:ring-sk-primary/10"
                  />
                </div>

                {/* Screenshot upload */}
                <div>
                  <label
                    htmlFor="image"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-n-500"
                  >
                    Screenshot{" "}
                    <span className="font-normal normal-case text-n-400">
                      (optional)
                    </span>
                  </label>
                  <label
                    htmlFor="image"
                    className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-n-200 bg-n-50 px-6 py-6 text-center transition hover:border-sk-primary hover:bg-sk-surface"
                  >
                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                    <UploadCloud className="h-6 w-6 text-n-400" />
                    <p className="text-sm font-semibold text-n-700">
                      Click to upload
                    </p>
                    <p className="text-xs text-n-400">PNG, JPG or WEBP</p>
                  </label>

                  {preview && (
                    <div className="mt-3 overflow-hidden rounded-xl border border-sk-border bg-sk-surface p-3">
                      <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-sk-primary">
                        <ImagePlus className="h-3.5 w-3.5" />
                        Preview
                      </div>
                      <img
                        src={preview}
                        alt="Uploaded feedback screenshot preview"
                        className="h-40 w-full rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-sk-primary py-3.5 text-sm font-semibold text-white transition hover:bg-sk-hover active:bg-sk-pressed"
                >
                  Submit feedback
                </button>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default ReviewPage;
