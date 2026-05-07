import { HoverEffect } from "../../../components/ui/card-hover-effect";
import { useNavigate } from "react-router-dom";

export const projects = [
  {
    title: "Remote Work",
    description:
      "Explore flexible remote roles across product, engineering, and operations teams.",
    link: "/jobs?category=remote",
  },
  {
    title: "Startup Hiring",
    description:
      "Fast-growing startups seeking fresh talent for design, developers, and business roles.",
    link: "/jobs?category=startup",
  },
  {
    title: "Data & Analytics",
    description:
      "Positions for analysts, data scientists, and reporting professionals driving business insight.",
    link: "/jobs?category=data",
  },
  {
    title: "Design & UX",
    description:
      "Creative roles in UX, UI, product design, and research for early-career talent.",
    link: "/jobs?category=design",
  },
  {
    title: "Product Management",
    description:
      "Build customer-focused products with roles in roadmap, strategy, and execution.",
    link: "/jobs?category=product",
  },
  {
    title: "DevOps & Cloud",
    description:
      "Infrastructure and automation roles for distributed teams and modern cloud stacks.",
    link: "/jobs?category=devops",
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
