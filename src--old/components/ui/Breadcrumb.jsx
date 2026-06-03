import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = ({ pageName, showTitle = true, className = "" }) => {
  const location = useLocation();

  const segments = location.pathname.split("/").filter(Boolean);

  const isIdSegment = (segment) => {
    return /^\d+$/.test(segment) || /^[a-fA-F0-9]{12,}$/.test(segment);
  };

  const routeLabels = {
    "job-seeker": "Job Seeker",
    dashboard: "Dashboard",
    applications: "Applications",
    "saved-jobs": "Saved Jobs",
    "job-alerts": "Job Alerts",
    messages: "Messages",
    interviews: "Interviews",
    documents: "Documents",
    support: "Support",
    settings: "Settings",
    company: "Company",
    jobs: "Jobs",
    new: "Post a Job",
    applicants: "Applicants",
    profile: "Profile",
    security: "Security Settings",
    admin: "Admin",
  };

  const formatSegment = (segment) => {
    if (isIdSegment(segment)) {
      return location.state?.breadcrumbTitle || "Details";
    }

    if (routeLabels[segment]) {
      return routeLabels[segment];
    }

    return segment
      .replace(/-/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const title =
    pageName ||
    (segments.length ? formatSegment(segments[segments.length - 1]) : "Home");

  return (
    <div
      className={`${showTitle ? "mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" : ""} ${className}`}
    >
      {showTitle && (
        <h2 className="text-title-md2 font-semibold text-slate-800">{title}</h2>
      )}

      <nav>
        <ol className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
          <li>
            <Link
              className="font-medium text-slate-400 transition-colors hover:text-orange-600"
              to="/"
            >
              Home
            </Link>
          </li>
          {segments.map((segment, index) => {
            const label = formatSegment(segment);
            const path = `/${segments.slice(0, index + 1).join("/")}`;
            const isLast = index === segments.length - 1;

            return (
              <React.Fragment key={path}>
                <li className="text-slate-300">/</li>
                <li>
                  {isLast ? (
                    <span className="font-medium text-slate-800">{label}</span>
                  ) : (
                    <Link
                      className="font-medium text-slate-400 transition-colors hover:text-orange-600"
                      to={path}
                    >
                      {label}
                    </Link>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
