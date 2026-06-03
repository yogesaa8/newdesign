import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  // Sample data
  const stats = [
    {
      id: 1,
      icon: 'work',
      label: 'Active Jobs',
      value: '24',
      badge: '+12%',
      badgeColor: 'bg-green-100 text-green-700',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      id: 2,
      icon: 'groups',
      label: 'Total Applicants',
      value: '1,284',
      badge: '+4%',
      badgeColor: 'bg-green-100 text-green-700',
      iconBg: 'bg-secondary-container/20',
      iconColor: 'text-secondary',
    },
    {
      id: 3,
      icon: 'calendar_today',
      label: 'Interviews Today',
      value: '8',
      badge: 'Busy',
      badgeColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
      iconBg: 'bg-tertiary/10',
      iconColor: 'text-tertiary',
    },
    {
      id: 4,
      icon: 'chat_bubble',
      label: 'New Messages',
      value: '42',
      badge: '15 New',
      badgeColor: 'bg-primary text-white',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
  ];

  const funnelStages = [
    { label: 'Applied', count: '1,284 candidates', percentage: 100 },
    { label: 'Phone Screen', count: '452 candidates', percentage: 35 },
    { label: 'Interview', count: '128 candidates', percentage: 15 },
    { label: 'Offer Issued', count: '12 candidates', percentage: 2 },
  ];

  const activities = [
    {
      id: 1,
      icon: 'check_circle',
      iconColor: 'text-primary',
      title: 'Sarah Jenkins shortlisted',
      subtitle: 'Product Designer role • 2m ago',
    },
    {
      id: 2,
      icon: 'schedule',
      iconColor: 'text-tertiary',
      title: 'New Interview Scheduled',
      subtitle: 'With Marcus Aurelius • 1h ago',
    },
    {
      id: 3,
      icon: 'mail',
      iconColor: 'text-primary',
      title: 'New Application received',
      subtitle: 'Senior Backend Eng • 3h ago',
    },
    {
      id: 4,
      icon: 'cancel',
      iconColor: 'text-error',
      title: 'Job Posting Expired',
      subtitle: 'Marketing Intern • 5h ago',
    },
  ];

  const recentApplicants = [
    {
      id: 1,
      name: 'Elena Rodriguez',
      email: 'elena.rod@example.com',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU5xAljB9fU1RO0HDTV6yuccthnKKVP_aLc1gclWe97svjoRDa_x18UDTJdG02BCW69wejNI9bDx3dSLjPdmNKocZ7r8NYPUKXRN2ODMliH80J0t8KVCbMc4fFSSuaT1gMWoRjsQnz-g88juBAAjaiC4Ru3sAFnzNfRrAwlQVNnT7zSemd8P-nExpJxIV9256fDIttj1ywTxLZ5BJ52TD-J6SulRUcQS34F5q7rr4Xfv9qxAMldQHy2jl2Bdu4Vl_-ikN6D1pEoi7c',
      jobTitle: 'Senior Product Designer',
      appliedDate: 'Oct 12, 2023',
      rating: 4,
    },
    {
      id: 2,
      name: 'James Kalu',
      email: 'j.kalu@work.io',
      initials: 'JK',
      jobTitle: 'Growth Lead',
      appliedDate: 'Oct 11, 2023',
      rating: 3,
    },
    {
      id: 3,
      name: 'David Miller',
      email: 'david@tech.io',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnXTHesdVYbC32mIGYcONvx9QyTSjEudHACrcBm48gjNh7ylYedX0QY--rpLNSDU5EE1w9-sfFDb5gFJ__R_8Ux0fYewjP2sg_9K9Oph0SLcu9vQ_5GqezkdIR8_wsb0vLSBmG-xBmhZZm4zwrUpsQbPPPr67glpRRwADvZzD8HOVK27pOwn6jOJlfo2i_o6ksQfBSq7rEqXphBODooIEyB5H2PygTlcoZsUXudFILS5iEVJDnfBP4RufioYwTnttvHFj732jaPbtn',
      jobTitle: 'Data Analyst',
      appliedDate: 'Oct 11, 2023',
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5 text-primary">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="material-symbols-outlined text-sm"
            style={{ fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0" }}
          >
            star
          </span>
        ))}
      </div>
    );
  };

  const handleShortlist = (applicantId) => {
    console.log('Shortlist applicant:', applicantId);
  };

  const handleReject = (applicantId) => {
    console.log('Reject applicant:', applicantId);
  };

  return (
    <div className="flex-1">
      <main className="p-8 space-y-9 max-w-[1400px] mx-auto w-full">
        {/* Page Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-on-surface tracking-tight font-headline">
              Hiring Overview
            </h1>
            <p className="text-outline mt-1 font-medium">
              Welcome back, Alex. You have 3 interviews scheduled for today.
            </p>
          </div>
          <Link
            to="/company-post-job"
            className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary-hover transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Create Job Posting
          </Link>
        </div>

        {/* Top Row: Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_12px_32px_-4px_rgba(13,28,46,0.06)] group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.iconBg} flex items-center justify-center ${stat.iconColor}`}>
                  <span className="material-symbols-outlined">{stat.icon}</span>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.badgeColor}`}>
                  {stat.badge}
                </span>
              </div>
              <h3 className="text-outline text-xs font-bold uppercase tracking-widest font-label">
                {stat.label}
              </h3>
              <p className="text-3xl font-extrabold text-on-surface mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Middle Section: Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hiring Funnel */}
          <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-[0px_12px_32px_-4px_rgba(13,28,46,0.06)]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight font-headline">Hiring Funnel</h2>
                <p className="text-sm text-outline">Application conversion throughout the last 30 days</p>
              </div>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-surface-container-low border-none rounded-lg text-xs font-bold py-1.5 pl-3 pr-8 focus:ring-0 outline-none"
              >
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
            <div className="space-y-6">
              {funnelStages.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-outline">
                    <span>{stage.label}</span>
                    <span>{stage.count}</span>
                  </div>
                  <div className="h-4 w-full bg-surface-container-low rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
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
          <div className="bg-surface-container-low p-8 rounded-xl flex flex-col">
            <h2 className="text-xl font-bold tracking-tight mb-6 font-headline">Recent Activity</h2>
            <div className="space-y-6 flex-1">
              {activities.map((activity) => (
                <div key={activity.id} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 bg-white flex items-center justify-center ${activity.iconColor} shadow-sm`}>
                    <span className="material-symbols-outlined text-lg">{activity.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{activity.title}</p>
                    <p className="text-xs text-outline mt-0.5">{activity.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-8 text-primary font-bold text-sm hover:underline self-start">
              View all activity
            </button>
          </div>
        </div>

        {/* Bottom Section: Recent Applicants Table */}
        <div className="bg-surface-container-lowest rounded-xl shadow-[0px_12px_32px_-4px_rgba(13,28,46,0.06)] overflow-hidden">
          <div className="p-8 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight font-headline">Recent Applicants</h2>
              <p className="text-sm text-outline">Review your latest candidate submissions</p>
            </div>
            <Link
              to="/company-applicants"
              className="text-sm font-bold px-4 py-2 bg-surface-container-low text-primary rounded-lg hover:bg-surface-container transition-colors"
            >
              View Database
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-label-md uppercase tracking-[0.05em] text-outline">
                  <th className="px-8 py-4 font-bold text-xs">Candidate</th>
                  <th className="px-8 py-4 font-bold text-xs">Job Title</th>
                  <th className="px-8 py-4 font-bold text-xs">Applied Date</th>
                  <th className="px-8 py-4 font-bold text-xs">Rating</th>
                  <th className="px-8 py-4 font-bold text-xs text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {recentApplicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        {applicant.avatar ? (
                          <img
                            className="w-10 h-10 rounded-full object-cover shadow-sm"
                            src={applicant.avatar}
                            alt={applicant.name}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-secondary-container/30 flex items-center justify-center font-bold text-secondary">
                            {applicant.initials}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-on-surface">{applicant.name}</p>
                          <p className="text-xs text-outline">{applicant.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-medium text-on-surface">{applicant.jobTitle}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm text-outline">{applicant.appliedDate}</span>
                    </td>
                    <td className="px-8 py-5">{renderStars(applicant.rating)}</td>
                    <td className="px-8 py-5 text-right space-x-2">
                      <button
                        onClick={() => handleShortlist(applicant.id)}
                        className="px-4 py-1.5 bg-primary-container/10 text-primary font-bold text-xs rounded-full hover:bg-primary-container hover:text-white transition-all"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => handleReject(applicant.id)}
                        className="px-4 py-1.5 bg-error/8 text-error font-bold text-xs rounded-full hover:bg-error/15 transition-all"
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
