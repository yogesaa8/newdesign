import useSEO from "@/seo/useSEO";
import { buildWebPage } from "@/seo/schemas";

// Side-effect imports register the builder's components on `window` (in order)
// before <ResumeBuilderApp /> renders and reads them.
import "./resumeBuilder.css";
import "./data";
import "./ui";
import "./templates";
import "./ai";
import "./steps";
import ResumeBuilderApp from "./app";

const PATH = "/resume/builder";
const TITLE = "Free Resume Builder | FirstJobIndia";
const DESCRIPTION =
  "Build a recruiter-ready, ATS-friendly resume in minutes - pick a format, fill guided sections, preview it live, and download a print-ready PDF. Free, no signup.";

const ResumeBuilder = () => {
  const seoElement = useSEO({
    title: TITLE,
    description: DESCRIPTION,
    path: PATH,
    graph: [
      buildWebPage({
        path: PATH,
        title: TITLE,
        description: DESCRIPTION,
        breadcrumbPath: PATH,
      }),
    ],
  });

  return (
    <>
      {seoElement}
      {/* .rb-scope confines the builder's dark theme + utility classes so they
          don't leak into the rest of the site (see resumeBuilder.css). */}
      <div className="rb-scope">
        <ResumeBuilderApp />
      </div>
    </>
  );
};

export default ResumeBuilder;
