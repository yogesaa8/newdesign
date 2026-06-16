import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ImagePlus,
  MessageSquareText,
  UploadCloud,
} from "lucide-react";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from "../../../components/ui/resizable-navbar";
import {
  HeroHighlight,
  Highlight,
} from "../../../components/ui/hero-highlight";
import navItems from "../data/headerData.json";
import useSEO from "@/seo/useSEO";
import seoMeta from "@/data/seoMeta";
import {
  buildWebPage,
  buildBreadcrumbList,
  buildContactPage,
} from "@/seo/schemas";

const inputClass =
  "w-full rounded-[8px] border border-[#EADFD9] bg-[#FFFDFB] px-4 py-3 text-sm text-[#0A0A0A] outline-none transition placeholder:text-[#9F9FA9] focus:border-[#8500FA] focus:ring-2 focus:ring-[#8500FA]/15";
const labelClass = "mb-2 block text-xs font-semibold uppercase text-[#6F6F76]";

const feedbackNotes = [
  "Private",
  "Read by the team",
  "Screenshots welcome",
];

const ReviewPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

    setMessage("Thank you. Your feedback has been submitted.");
    setFormData({ name: "", issue: "", image: null });
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
    <main className="min-h-screen bg-[#FFF7F3] text-[#0A0A0A]">
      {seoElement}

      <div className="relative w-full bg-[#FFF7F3]">
        <Navbar>
          <NavBody disableScrollResize>
            <NavbarLogo />
            <NavItems items={navItems} />
            <div className="flex items-center gap-4">
              <NavbarButton as={Link} to="/seeker/login" variant="secondary">
                Sign in
              </NavbarButton>
              <NavbarButton as={Link} to="/seeker/signup" variant="primary">
                Start free
              </NavbarButton>
            </div>
          </NavBody>

          <MobileNav disableScrollResize>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, idx) => (
                <div key={`mobile-link-${idx}`} className="w-full">
                  {item.link && (
                    <a
                      href={item.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-[#6F6F76] transition hover:text-[#0A0A0A]"
                    >
                      {item.name}
                    </a>
                  )}

                  {item.children && (
                    <div className="flex flex-col gap-2">
                      <span className="py-2 font-medium text-[#0A0A0A]">
                        {item.name}
                      </span>
                      <div className="ml-4 flex flex-col gap-2">
                        {item.children.map((child, i) => (
                          <a
                            key={i}
                            href={child.link}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-sm text-[#6F6F76] transition hover:text-[#8500FA]"
                          >
                            {child.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex w-full flex-col gap-4">
                <NavbarButton
                  href="/seeker/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="secondary"
                  className="w-full"
                >
                  Sign in
                </NavbarButton>
                <NavbarButton
                  href="/seeker/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Start free
                </NavbarButton>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </div>

      <HeroHighlight
        containerClassName="bg-[#FFF7F3]"
        className="flex min-h-[calc(100vh-72px)] items-center px-4 py-14 md:py-16"
      >
        <section className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-[#8500FA]">
              <MessageSquareText className="h-4 w-4" />
              Feedback
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-[#0A0A0A] md:text-6xl">
              Tell us what to{" "}
              <Highlight className="rounded-[8px] bg-gradient-to-r from-[#F6EAE0] to-[#C6AFFF] px-2 pb-1">
                fix.
              </Highlight>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#6F6F76] md:text-lg">
              Share bugs, ideas, or confusing moments. We read every note.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {feedbackNotes.map((note) => (
                <span
                  key={note}
                  className="inline-flex items-center gap-2 rounded-[8px] border border-[#EADFD9] bg-[#FFFDFB] px-3 py-2 text-sm font-semibold text-[#6F6F76]"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  {note}
                </span>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[8px] border border-[#EADFD9] bg-white/75 p-5 shadow-sm backdrop-blur md:p-6"
          >
            {message && (
              <div className="mb-5 rounded-[8px] border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                {message}
              </div>
            )}

            <div>
              <label htmlFor="name" className={labelClass}>
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={inputClass}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="issue" className={labelClass}>
                Feedback
              </label>
              <textarea
                id="issue"
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                rows="5"
                placeholder="What happened? What should be better?"
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="image" className={labelClass}>
                Screenshot
              </label>
              <label
                htmlFor="image"
                className="flex cursor-pointer flex-col items-center justify-center rounded-[8px] border-2 border-dashed border-[#EADFD9] bg-[#FFFDFB] px-6 py-7 text-center transition hover:border-[#C6AFFF]"
              >
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
                <UploadCloud className="h-6 w-6 text-[#8500FA]" />
                <p className="mt-3 text-sm font-semibold text-[#0A0A0A]">
                  Upload image
                </p>
                <p className="mt-1 text-xs text-[#6F6F76]">
                  PNG, JPG, or WEBP
                </p>
              </label>

              {preview && (
                <div className="mt-4 overflow-hidden rounded-[8px] border border-[#EADFD9] bg-[#FFFDFB] p-3">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#8500FA]">
                    <ImagePlus className="h-4 w-4" />
                    Preview
                  </div>
                  <img
                    src={preview}
                    alt="Uploaded feedback screenshot preview"
                    className="h-44 w-full rounded-[8px] object-cover"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="mt-5 w-full rounded-[8px] bg-[#FF6B35] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#FF9566]"
            >
              Submit feedback
            </button>
          </form>
        </section>
      </HeroHighlight>
    </main>
  );
};

export default ReviewPage;
