import React, { useState } from "react";
import useSEO from "@/seo/useSEO";
import seoMeta from "@/data/seoMeta";
import { buildWebPage, buildBreadcrumbList } from "@/seo/schemas";

const Blog = () => {
  const meta = seoMeta["/blog"];
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

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
          { name: "Blog", path: meta.path },
        ],
        meta.path,
      ),
    ],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("submitted");
    setEmail("");
  };

  return (
    <main className="fji-page px-4 py-24 sm:px-6 lg:px-8">
      {seoElement}
      <section className="mx-auto max-w-2xl text-center">
        <span className="inline-block rounded-[8px] border border-[#EADFD9] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#8500FA]">
          Launching soon
        </span>
        <h1 className="fji-heading mt-6 text-4xl sm:text-5xl">
          Career advice for freshers.
        </h1>
        <p className="fji-copy mt-5 text-base sm:text-lg">
          We are still writing the first batch of articles on resumes, first
          interviews, salary negotiation, and choosing the right first role in
          India. Subscribe and we will email you the moment the first article
          goes live.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="blog-subscribe-email" className="sr-only">
            Your email address
          </label>
          <input
            id="blog-subscribe-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="you@example.com"
            className="fji-input flex-1"
          />
          <button
            type="submit"
            className="rounded-[8px] bg-[#FF6B35] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#FF9566]"
          >
            Notify me
          </button>
        </form>

        {status === "submitted" && (
          <p className="mt-4 text-sm text-green-700">
            Thanks. You are on the list and will hear from us when the first
            article goes live.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-rose-600">
            Please enter a valid email address.
          </p>
        )}

        <p className="mt-8 text-xs text-[#6F6F76]">
          One email at launch, then a gentle weekly digest. Unsubscribe in one
          click.
        </p>
      </section>
    </main>
  );
};

export default Blog;
