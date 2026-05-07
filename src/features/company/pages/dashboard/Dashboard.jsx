import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("Last 30 Days");

  // Sample data
  const stats = [
    {
      id: 1,
      icon: "work",
      label: "Active Jobs",
      value: "24",
      badge: "+12%",
      badgeColor: "bg-green-50 text-green-600",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      id: 2,
      icon: "groups",
      label: "Total Applicants",
      value: "1,284",
      badge: "+4%",
      badgeColor: "bg-green-50 text-green-600",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      id: 3,
      icon: "calendar_today",
      label: "Interviews Today",
      value: "8",
      badge: "Busy",
      badgeColor: "bg-orange-50 text-orange-600",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      id: 4,
      icon: "chat_bubble",
      label: "New Messages",
      value: "42",
      badge: "15 New",
      badgeColor: "bg-blue-50 text-blue-600",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  const funnelStages = [
    { label: "Applied", count: "1,284 candidates", percentage: 100 },
    { label: "Phone Screen", count: "452 candidates", percentage: 35 },
    { label: "Interview", count: "128 candidates", percentage: 15 },
    { label: "Offer Issued", count: "12 candidates", percentage: 2 },
  ];

  const activities = [
    {
      id: 1,
      icon: "check_circle",
      iconColor: "bg-green-50 text-green-600",
      title: "Sarah Jenkins shortlisted",
      subtitle: "Product Designer role • 2m ago",
    },
    {
      id: 2,
      icon: "schedule",
      iconColor: "bg-orange-50 text-orange-600",
      title: "New Interview Scheduled",
      subtitle: "With Marcus Aurelius • 1h ago",
    },
    {
      id: 3,
      icon: "mail",
      iconColor: "bg-blue-50 text-blue-600",
      title: "New Application received",
      subtitle: "Senior Backend Eng • 3h ago",
    },
    {
      id: 4,
      icon: "cancel",
      iconColor: "bg-red-50 text-red-500",
      title: "Job Posting Expired",
      subtitle: "Marketing Intern • 5h ago",
    },
  ];

  const recentApplicants = [
    {
      id: 1,
      name: "Elena Rodriguez",
      email: "elena.rod@example.com",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBU5xAljB9fU1RO0HDTV6yuccthnKKVP_aLc1gclWe97svjoRDa_x18UDTJdG02BCW69wejNI9bDx3dSLjPdmNKocZ7r8NYPUKXRN2ODMliH80J0t8KVCbMc4fFSSuaT1gMWoRjsQnz-g88juBAAjaiC4Ru3sAFnzNfRrAwlQVNnT7zSemd8P-nExpJxIV9256fDIttj1ywTxLZ5BJ52TD-J6SulRUcQS34F5q7rr4Xfv9qxAMldQHy2jl2Bdu4Vl_-ikN6D1pEoi7c",
      jobTitle: "Senior Product Designer",
      appliedDate: "Oct 12, 2023",
      rating: 4,
    },
    {
      id: 2,
      name: "James Kalu",
      email: "j.kalu@work.io",
      initials: "JK",
      jobTitle: "Growth Lead",
      appliedDate: "Oct 11, 2023",
      rating: 3,
    },
    {
      id: 3,
      name: "David Miller",
      email: "david@tech.io",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDnXTHesdVYbC32mIGYcONvx9QyTSjEudHACrcBm48gjNh7ylYedX0QY--rpLNSDU5EE1w9-sfFDb5gFJ__R_8Ux0fYewjP2sg_9K9Oph0SLcu9vQ_5GqezkdIR8_wsb0vLSBmG-xBmhZZm4zwrUpsQbPPPr67glpRRwADvZzD8HOVK27pOwn6jOJlfo2i_o6ksQfBSq7rEqXphBODooIEyB5H2PygTlcoZsUXudFILS5iEVJDnfBP4RufioYwTnttvHFj732jaPbtn",
      jobTitle: "Data Analyst",
      appliedDate: "Oct 11, 2023",
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5 text-orange-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="material-symbols-outlined text-sm"
            style={{
              fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            star
          </span>
        ))}
      </div>
    );
  };

  const handleShortlist = (applicantId) => {
    console.log("Shortlist applicant:", applicantId);
  };

  const handleReject = (applicantId) => {
    console.log("Reject applicant:", applicantId);
  };

  return (
    <div className="flex-1">
      <main className="w-full max-w-[1400px] space-y-9 p-8 mx-auto">
        {/* Page Heading */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight font-headline text-slate-800">
              Hiring Overview
            </h1>
            <p className="mt-1 font-medium text-slate-500">
              Welcome back, Alex. You have 3 interviews scheduled for today.
            </p>
          </div>
          <Link
            to="/company/jobs/new"
            className="flex items-center gap-2 rounded bg-orange-600 px-6 py-2.5 font-semibold text-white shadow-md transition-all hover:bg-orange-700"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Create Job Posting
          </Link>
        </div>

        {/* Top Row: Stat Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="rounded border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.iconBg} ${stat.iconColor}`}
                >
                  <span className="material-symbols-outlined">{stat.icon}</span>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-bold ${stat.badgeColor}`}
                >
                  {stat.badge}
                </span>
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest font-label text-slate-400">
                {stat.label}
              </h3>
              <p className="mt-1 text-3xl font-extrabold text-slate-800">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Middle Section: Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Hiring Funnel */}
          <div className="rounded border border-slate-200 bg-white p-8 shadow-sm lg:col-span-2">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight font-headline text-slate-800">
                  Hiring Funnel
                </h2>
                <p className="text-sm text-slate-500">
                  Application conversion throughout the last 30 days
                </p>
              </div>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="rounded border border-slate-200 bg-slate-50 py-1.5 pl-3 pr-8 text-xs font-bold text-slate-600 outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              >
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
            <div className="space-y-6">
              {funnelStages.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                    <span>{stage.label}</span>
                    <span>{stage.count}</span>
                  </div>
                  <div className="h-4 w-full overflow-hidden rounded bg-slate-100">
                    <div
                      className="h-full rounded bg-orange-500"
                      style={{
                        width: `${stage.percentage}%`,
                        opacity: 1 - index * 0.2,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="flex flex-col rounded border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-xl font-bold tracking-tight font-headline text-slate-800">
              Recent Activity
            </h2>
            <div className="flex-1 space-y-6">
              {activities.map((activity) => (
                <div key={activity.id} className="flex gap-4">
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full shadow-sm ${activity.iconColor}`}
                  >
                    <span className="material-symbols-outlined text-lg">
                      {activity.icon}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      {activity.title}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {activity.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-8 self-start text-sm font-bold text-orange-600 hover:underline">
              View all activity
            </button>
          </div>
        </div>

        {/* Bottom Section: Recent Applicants Table */}
        <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between p-8">
            <div>
              <h2 className="text-xl font-bold tracking-tight font-headline text-slate-800">
                Recent Applicants
              </h2>
              <p className="text-sm text-slate-500">
                Review your latest candidate submissions
              </p>
            </div>
            <Link
              to="/company/applicants"
              className="rounded-lg px-4 py-2 text-sm font-bold text-orange-600 transition-colors hover:bg-orange-50"
            >
              View Database
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="text-label-md uppercase tracking-[0.05em] border-t border-slate-100">
                  <th className="px-8 py-4 text-xs font-bold text-slate-400">
                    Candidate
                  </th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400">
                    Job Title
                  </th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400">
                    Applied Date
                  </th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400">
                    Rating
                  </th>
                  <th className="px-8 py-4 text-xs font-bold text-right text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentApplicants.map((applicant) => (
                  <tr
                    key={applicant.id}
                    className="border-t border-slate-100 transition-colors hover:bg-slate-50/50"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        {applicant.avatar ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover shadow-sm"
                            src={applicant.avatar}
                            alt={applicant.name}
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 font-bold text-orange-600">
                            {applicant.initials}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-slate-800">
                            {applicant.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {applicant.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-medium text-slate-700">
                        {applicant.jobTitle}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm text-slate-600">
                        {applicant.appliedDate}
                      </span>
                    </td>
                    <td className="px-8 py-5">{renderStars(applicant.rating)}</td>
                    <td className="px-8 py-5 text-right space-x-2">
                      <button
                        onClick={() => handleShortlist(applicant.id)}
                        className="rounded-full bg-orange-50 px-4 py-1.5 text-xs font-bold text-orange-600 transition-all hover:bg-orange-100"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => handleReject(applicant.id)}
                        className="rounded-full bg-red-50 px-4 py-1.5 text-xs font-bold text-red-500 transition-all hover:bg-red-100"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;