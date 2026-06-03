import React from "react";
import { FaStopwatch } from "react-icons/fa";
import { BsBagCheckFill, BsPinAngle } from "react-icons/bs";
import { TbCoinRupee } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { HeroHighlight } from "../../../components/ui/hero-highlight";

const baseJobs = [
  {
    time: "5 min ago",
    title: "Frontend Developer",
    company: "NexaTech Solutions",
    category: "Engineering",
    type: "Full time",
    salary: "$85k-$95k",
    location: "San Francisco, USA",
  },
  {
    time: "8 min ago",
    title: "Backend Engineer",
    company: "CloudArc Systems",
    category: "Technology",
    type: "Remote",
    salary: "$90k-$105k",
    location: "Remote",
  },
  {
    time: "12 min ago",
    title: "UI/UX Designer",
    company: "PixelWave Studio",
    category: "Design",
    type: "Full time",
    salary: "$72k-$82k",
    location: "Austin, USA",
  },
  {
    time: "18 min ago",
    title: "Data Analyst",
    company: "InsightGrid Analytics",
    category: "Data",
    type: "Full time",
    salary: "$70k-$80k",
    location: "New York, USA",
  },
  {
    time: "22 min ago",
    title: "Product Manager",
    company: "LaunchBridge",
    category: "Product",
    type: "Full time",
    salary: "$100k-$115k",
    location: "Seattle, USA",
  },
  {
    time: "30 min ago",
    title: "DevOps Engineer",
    company: "NovaScale Infrastructure",
    category: "Operations",
    type: "Internship",
    salary: "$45k-$55k",
    location: "Denver, USA",
  },
];

const jobs = baseJobs.map((job, index) => ({
  ...job,
  id: index + 1,
}));

const createJobDetailsState = (job) => ({
  ...job,
  description:
    job.description ||
    `${job.company} is hiring a ${job.title} to join their ${job.category} team and contribute to high-impact projects in a collaborative environment`,
  responsibilities: job.responsibilities || [
    `Work closely with the ${job.category} team to deliver reliable outcomes.`,
    "Collaborate with cross-functional stakeholders on planning and execution.",
    "Maintain high-quality standards across assigned projects.",
    "Communicate progress, blockers, and recommendations clearly.",
  ],
  skills: job.skills || [
    job.category,
    "Communication",
    "Problem Solving",
    "Team Collaboration",
  ],
  experience: job.experience || "2+ Years",
  degree: job.degree || "Bachelor",
  tags: job.tags || [job.type, job.category, job.location],
});

const JobCard = ({ job, index }) => {
  const navigate = useNavigate();

  const handleJobDetails = () => {
    const selectedJob = createJobDetailsState(job);
    const allJobs = jobs.map(createJobDetailsState);

    navigate(`/jobs/${selectedJob.id}`, {
      state: {
        job: selectedJob,
        allJobs,
      },
    });
  };

  // Array of different light glowing colors
  const glows = [
    { border: "rgba(139, 92, 246, 0.6)", shadow: "rgba(139, 92, 246, 0.5)" }, // Light Purple
    { border: "rgba(59, 130, 246, 0.6)", shadow: "rgba(59, 130, 246, 0.5)" }, // Light Blue
    { border: "rgba(16, 185, 129, 0.6)", shadow: "rgba(16, 185, 129, 0.5)" }, // Light Green
    { border: "rgba(245, 158, 11, 0.6)", shadow: "rgba(245, 158, 11, 0.5)" }, // Light Amber
    { border: "rgba(236, 72, 153, 0.6)", shadow: "rgba(236, 72, 153, 0.5)" }, // Light Pink
    { border: "rgba(20, 184, 166, 0.6)", shadow: "rgba(20, 184, 166, 0.5)" }, // Light Teal
  ];

  // Fallback just in case
  const selectedGlow = glows[index % glows.length] || glows[0];

  return (
    <div
      className="group relative flex h-full w-full flex-col justify-between rounded-[28px] bg-[#f7f5f2] p-6 transition-all duration-500 "
      style={{
        border: "1px solid rgba(0, 0, 0, 0.05)",
        transition:
          "border-color 0.5s ease, box-shadow 0.5s ease, transform 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = selectedGlow.border;
        e.currentTarget.style.boxShadow = `0 0 30px -5px ${selectedGlow.shadow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.05)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <span className="rounded-full bg-[#ece8e1] px-3 py-1 text-xs font-medium text-neutral-700">
          {job.time}
        </span>
        <button className="text-neutral-400 transition hover:text-neutral-700">
          <BsPinAngle size={16} />
        </button>
      </div>

      {/* Main Content */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-black">
          {job.title}
        </h2>
        <p className="mt-2 text-sm text-neutral-600">{job.company}</p>
      </div>

      {/* Info Pills */}
      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#dff4ea] px-3 py-1.5 text-xs font-medium text-[#246b45]">
          {job.category}
        </span>
        <span className="rounded-full bg-[#fceccf] px-3 py-1.5 text-xs font-medium text-[#8a5a00]">
          {job.type}
        </span>
        <span className="rounded-full bg-[#e8eefc] px-3 py-1.5 text-xs font-medium text-[#3556a8]">
          {job.salary}
        </span>
        <span className="rounded-full bg-[#f7e3e8] px-3 py-1.5 text-xs font-medium text-[#9a4f62]">
          {job.location}
        </span>
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between">
        <p className="text-xs text-neutral-500">Quick apply available</p>
        <button
          onClick={handleJobDetails}
          className="text-sm font-semibold text-black underline underline-offset-4 transition hover:opacity-70"
        >
          Job Details
        </button>
      </div>
    </div>
  );
};

const JobList = () => {
  return (
    <HeroHighlight containerClassName="bg-[radial-gradient(ellipse_at_top,_rgba(252,150,100,0.28)_0%,_rgba(255,247,243,0.95)_35%,_#F5E9DF_72%,_#EADCD2_100%)]">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            {/* Changed text-neutral-100 to text-neutral-900 so it's visible on light background */}
            <h1 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
              First jobs hiring this week
            </h1>
            {/* Changed text-neutral-500 to text-neutral-600 */}
            <p className="text-black mt-2 text-sm md:text-base">
              Live fresher openings across India, hand-checked by our team
              before they go on the board.
            </p>
          </div>
          {/* Changed indigo colors to neutral/black so it matches light theme */}
          <button className="text-sm font-medium text-neutral-900 hover:text-neutral-700 transition-colors hover:underline cursor-pointer whitespace-nowrap">
            See all openings
          </button>
        </div>
        {/* Grid Layout */}
        {/* FIX APPLIED HERE: Added index={index} prop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} index={index} />
          ))}
        </div>
      </div>
    </HeroHighlight>
  );
};

export default JobList;
