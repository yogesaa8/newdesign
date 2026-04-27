import React from "react";
import { FaStopwatch } from "react-icons/fa";
import { BsBagCheckFill, BsPinAngle } from "react-icons/bs";
import { TbCoinRupee } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
import { HeroHighlight } from "@/components/ui/hero-highlight";

const jobs = [
  {
    time: "10 min ago",
    title: "Forward Security Director",
    company: "Bauch, Schuppe and Schulist Co",
    category: "Hotels & Tourism",
    type: "Full time",
    salary: "$40000-$42000",
    location: "New-York, USA",
  },
  {
    time: "12 min ago",
    title: "Regional Creative Facilitator",
    company: "Wisozk - Becker Co",
    category: "Media",
    type: "Part time",
    salary: "$28000-$32000",
    location: "Los- Angeles, USA",
  },
  {
    time: "15 min ago",
    title: "Internal Integration Planner",
    company: "Mraz, Quigley and Feest Inc.",
    category: "Construction",
    type: "Full time",
    salary: "$48000-$50000",
    location: "Texas, USA",
  },
  {
    time: "24 min ago",
    title: "District Intranet Director",
    company: "VonRueden - Weber Co",
    category: "Commerce",
    type: "Full time",
    salary: "$42000-$48000",
    location: "Florida, USA",
  },
  {
    time: "26 min ago",
    title: "Corporate Tactics Facilitator",
    company: "Cormier, Turner and Flatley Inc",
    category: "Commerce",
    type: "Full time",
    salary: "$38000-$40000",
    location: "Boston, USA",
  },
  {
    time: "0 min ago",
    title: "Frontend Developer",
    company: "Aero Flight Technology Group",
    category: "Developer",
    type: "Full time",
    salary: "$48000-$50000",
    location: "Delhi, USA",
  },
];

const JobCard = ({ job }) => {
  return (
    <div className="bg-white border border-[#e6f4f2] md:max-w-xl rounded-2xl shadow-sm p-6 flex flex-col gap-4 mb-5">
      {/* Top Row */}
      <div className="flex justify-between items-start">
        <span className="text-xs bg-[#e6f4f2] text-[#3aa89f] px-3 py-1 rounded-full">
          {job.time}
        </span>
        <button className="text-gray-400">
          <BsPinAngle />
        </button>
      </div>

      {/* Title + Company */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
        <p className="text-sm text-gray-500 mt-1">{job.company}</p>
      </div>

      {/* Info Row */}
      <div className="flex flex-wrap md:max-w-106 items-center gap-6 text-sm text-gray-500">
        <div className="flex gap-1 items-center">
          <BsBagCheckFill />
          {job.category}
        </div>
        <div className="flex gap-1 items-center">
          <FaStopwatch /> {job.type}
        </div>
        <div className="flex gap-1 items-center">
          <TbCoinRupee /> {job.salary}
        </div>
        <div className="flex gap-1 items-center">
          <IoLocationOutline /> {job.location}
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-end">
        <button className="bg-[#3aa89f] text-white text-sm px-5 py-2 rounded-lg hover:opacity-90">
          Job Details
        </button>
      </div>
    </div>
  );
};

const JobList = () => {
  return (
    <HeroHighlight>
      <div className="px-4 sm:px-6 flex-wrap relative max-w-5xl mx-auto p-6 space-y-6 bg-[#f7fbfa] min-h-screen">
        <div className="flex justify-end text-sm text-[#3aa89f] cursor-pointer">
          View all
        </div>

        <div className="flex-wrap gap-6 md:flex ">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </div>
    </HeroHighlight>
  );
};

export default JobList;
