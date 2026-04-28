import React from 'react'
import { useNavigate } from 'react-router-dom';
import {
    FiBriefcase,
    FiBookmark,
    FiClock,
    FiEye,
    FiArrowUpRight,
    FiArrowDownRight,
    FiExternalLink
} from 'react-icons/fi';
import { stats, applications, savedJobs, profileData } from '../../../json/mockData';
import Breadcrumb from '../../ui/Breadcrumb';

const DashboardData = () => {
    const navigate = useNavigate();

    return (
        <>
            <Breadcrumb pageName="Overview" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                {stats.map((stat, index) => (
                    <div key={index} className="rounded-2xl border border-outline-variant bg-white py-6 px-7.5 shadow-sm dark:border-outline-variant/30 dark:bg-inverse-surface">
                        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            {index === 0 && <FiBriefcase size={22} />}
                            {index === 1 && <FiBookmark size={22} />}
                            {index === 2 && <FiClock size={22} />}
                            {index === 3 && <FiEye size={22} />}
                        </div>

                        <div className="mt-4 flex items-end justify-between">
                            <div>
                                <h4 className="text-title-md font-bold text-on-surface dark:text-white">
                                    {stat.value}
                                </h4>
                                <span className="text-sm font-medium text-outline">{stat.label}</span>
                            </div>

                            <span className={`flex items-center gap-1 text-sm font-medium ${stat.change.startsWith('+') ? 'text-success' : 'text-error'}`}>
                                {stat.change}
                                {stat.change.startsWith('+') ? <FiArrowUpRight size={16} /> : <FiArrowDownRight size={16} />}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                {/* Profile Completion */}
                <div className="col-span-12 xl:col-span-8">
                    <div className="rounded-2xl border border-outline-variant bg-white px-5 pt-6 pb-2.5 shadow-sm dark:border-outline-variant/30 dark:bg-inverse-surface sm:px-7.5 xl:pb-1">
                        <div className="mb-6 flex justify-between items-center">
                            <h4 className="text-xl font-semibold text-on-surface dark:text-white">
                                Profile Completion
                            </h4>
                            <span className="text-primary font-medium">{profileData.completion}% Complete</span>
                        </div>

                        <div className="relative mb-6 h-4 w-full rounded-full bg-surface-container dark:bg-outline-variant/30">
                            <div
                                className="absolute left-0 h-full rounded-full bg-primary"
                                style={{ width: `${profileData.completion}%` }}
                            ></div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mb-6">
                            <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-primary/5">
                                <p className="text-sm text-outline mb-1">Applications</p>
                                <p className="text-lg font-bold text-on-surface dark:text-white">12 Pending</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-primary/5">
                                <p className="text-sm text-outline mb-1">Interviews</p>
                                <p className="text-lg font-bold text-on-surface dark:text-white">2 This Week</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-primary/5">
                                <p className="text-sm text-outline mb-1">Messages</p>
                                <p className="text-lg font-bold text-on-surface dark:text-white">5 Unread</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Applications Table */}
                    <div className="mt-6 rounded-2xl border border-outline-variant bg-white px-5 pt-6 pb-2.5 shadow-sm dark:border-outline-variant/30 dark:bg-inverse-surface sm:px-7.5 xl:pb-1">
                        <div className="mb-6 flex justify-between items-center">
                            <h4 className="text-xl font-semibold text-on-surface dark:text-white">
                                Recent Applications
                            </h4>
                            <button
                                onClick={() => navigate('/dashboard/applications')}
                                className="text-primary hover:underline text-sm font-medium"
                            >
                                View All
                            </button>
                        </div>

                        <div className="flex flex-col">
                            <div className="grid grid-cols-3 rounded-xl bg-surface-container-low dark:bg-primary/10 sm:grid-cols-4">
                                <div className="p-2.5 xl:p-5"><h5 className="text-xs font-semibold uppercase xsm:text-base text-on-surface dark:text-white">Company</h5></div>
                                <div className="p-2.5 text-center xl:p-5"><h5 className="text-xs font-semibold uppercase xsm:text-base text-on-surface dark:text-white">Job Title</h5></div>
                                <div className="p-2.5 text-center xl:p-5"><h5 className="text-xs font-semibold uppercase xsm:text-base text-on-surface dark:text-white">Status</h5></div>
                                <div className="hidden p-2.5 text-center sm:block xl:p-5"><h5 className="text-xs font-semibold uppercase xsm:text-base text-on-surface dark:text-white">Date</h5></div>
                            </div>

                            {applications.slice(0, 4).map((app, key) => (
                                <div className={`grid grid-cols-3 sm:grid-cols-4 ${key === applications.slice(0, 4).length - 1 ? '' : 'border-b border-outline-variant dark:border-outline-variant/30'}`} key={key}>
                                    <div className="flex items-center gap-3 p-2.5 xl:p-5">
                                        <div className="flex-shrink-0 h-9 w-9 rounded-md overflow-hidden bg-white p-1">
                                            <img src={app.logo} alt="Brand" />
                                        </div>
                                        <p className="hidden font-medium text-on-surface dark:text-white sm:block">{app.company}</p>
                                    </div>
                                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                                        <p className="text-on-surface dark:text-white truncate">{app.jobTitle}</p>
                                    </div>
                                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                                        <span className={`inline-flex rounded-full py-1 px-3 text-xs font-medium bg-opacity-10
                       ${app.status === 'Interview Scheduled' ? 'bg-success/10 text-success' :
                                                app.status === 'Shortlisted' ? 'bg-primary/10 text-primary' :
                                                    app.status === 'Rejected' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'}`}>
                                            {app.status}
                                        </span>
                                    </div>
                                    <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                        <p className="text-outline">{app.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recommended Jobs */}
                <div className="col-span-12 xl:col-span-4">
                    <div className="rounded-2xl border border-outline-variant bg-white shadow-sm dark:border-outline-variant/30 dark:bg-inverse-surface">
                        <div className="border-b border-outline-variant py-4 px-6.5 dark:border-outline-variant/30">
                            <h3 className="font-medium text-on-surface dark:text-white">
                                Recommended Jobs
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            {savedJobs.map((job, key) => (
                                <div key={key} className="flex items-center gap-5 border-b border-outline-variant pb-5 last:border-0 last:pb-0 dark:border-outline-variant/30">
                                    <div className="h-12 w-12 rounded-md bg-surface-container p-2 dark:bg-on-surface-variant/20">
                                        <img src={job.logo} alt="Company" />
                                    </div>
                                    <div className="flex flex-1 items-center justify-between">
                                        <div>
                                            <h5 className="font-medium text-on-surface dark:text-white">{job.title}</h5>
                                            <p className="text-xs text-outline">{job.company} • {job.location}</p>
                                        </div>
                                        <button className="text-primary hover:text-primary-container">
                                            <FiExternalLink size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button className="flex w-full justify-center rounded-full bg-primary py-3 px-6 font-bold text-white hover:bg-primary-container transition-all shadow-lg shadow-primary/20">
                                View More Jobs
                            </button>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="mt-6 rounded-2xl border border-outline-variant bg-white shadow-sm dark:border-outline-variant/30 dark:bg-inverse-surface">
                        <div className="border-b border-outline-variant py-4 px-6.5 dark:border-outline-variant/30">
                            <h3 className="font-medium text-on-surface dark:text-white">
                                Recent Activity
                            </h3>
                        </div>
                        <div className="p-6.5">
                            <div className="flex flex-col gap-6">
                                <div className="flex gap-4">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <FiBriefcase size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-on-surface dark:text-white">Applied to Google</p>
                                        <p className="text-xs text-outline">2 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-success/10 text-success">
                                        <FiClock size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-on-surface dark:text-white">Interview scheduled with Stripe</p>
                                        <p className="text-xs text-outline">Yesterday</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-warning/10 text-warning">
                                        <FiBookmark size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-on-surface dark:text-white">Saved Lead Frontend role at Spotify</p>
                                        <p className="text-xs text-outline">3 days ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardData
