import { HoverEffect } from "../../../components/ui/card-hover-effect";
import { useNavigate } from "react-router-dom";

export const projects = [
  {
    title: "Engineering & IT",
    description:
      "Software, QA, DevOps, and platform roles for engineering freshers across India.",
    link: "/jobs?category=engineering",
  },
  {
    title: "Sales & Business",
    description:
      "Inside sales, business development, and account roles open to graduates of any stream.",
    link: "/jobs?category=sales",
  },
  {
    title: "Data & Analytics",
    description:
      "Entry-level analyst, BI, and reporting roles in Indian product and services companies.",
    link: "/jobs?category=data",
  },
  {
    title: "Design & UX",
    description:
      "Visual design, UX research, and product design roles for design-school graduates.",
    link: "/jobs?category=design",
  },
  {
    title: "Marketing & Content",
    description:
      "Digital marketing, content, and brand roles for first-time marketers in India.",
    link: "/jobs?category=marketing",
  },
  {
    title: "Operations & Support",
    description:
      "Operations, customer support, and HR roles that take freshers in their first season.",
    link: "/jobs?category=operations",
  },
];

const categoryJobs = projects.map((project, index) => ({
  id: index + 101,
  time: "Just now",
  title: `${project.title} Specialist`,
  company: "First Job India",
  category: project.title,
  type: project.title === "Remote Work" ? "Remote" : "Full time",
  salary: "$70k-$95k",
  location: project.title === "Remote Work" ? "Remote" : "Bangalore, India",
  experience: "1+ Years",
  degree: "Bachelor",
  description: `${project.description} This sample role gives you a quick preview of opportunities available in the ${project.title} category`,
  responsibilities: [
    `Support active hiring needs in the ${project.title} category.`,
    "Collaborate with teams to understand role requirements and priorities.",
    "Deliver quality work while communicating progress clearly.",
    "Use modern tools and best practices to solve day-to-day problems.",
  ],
  skills: [
    project.title,
    "Communication",
    "Problem Solving",
    "Ownership",
  ],
  tags: [project.title, "Entry Level", "Hiring Now"],
}));

export default function CardHoverEffectDemo() {
  const navigate = useNavigate();

  const handleCategoryClick = (event) => {
    const cardLink = event.target.closest("a");

    if (!cardLink) {
      return;
    }

    event.preventDefault();

    const projectIndex = projects.findIndex(
      (project) => project.link === cardLink.getAttribute("href"),
    );

    if (projectIndex === -1) {
      return;
    }

    const job = categoryJobs[projectIndex];

    navigate(`/jobs/${job.id}`, {
      state: {
        job,
        allJobs: categoryJobs,
      },
    });
  };

  return (
    <div
      className="px-4 sm:px-6 relative max-w-5xl mx-auto z-50"
      onClick={handleCategoryClick}
    >
      <h2 className="text-6xl font-bold text-center text-white">
        Browse by Category
      </h2>
      <h4 className="text-center text-2xl mt-4 text-zinc-400">
        Find roles in the fastest-growing career paths across remote, full-time,
        and internship tracks.
      </h4>
      <HoverEffect items={projects} />
    </div>
  );
}
