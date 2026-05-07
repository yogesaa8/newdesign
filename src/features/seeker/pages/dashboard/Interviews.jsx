import React from "react";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiVideo,
  FiChevronRight,
} from "react-icons/fi";
import Breadcrumb from "../../../../components/ui/Breadcrumb";
import { upcomingInterviews } from "../../data/mockData";

const Interviews = () => {
  return (
    <>
      <Breadcrumb pageName="Interviews" />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Left Section */}
        <div className="space-y-6 xl:col-span-2">
          <h3 className="mb-4 text-xl font-bold text-slate-800">
            Upcoming Interviews
          </h3>

          {upcomingInterviews.map((interview) => (
            <div
              key={interview.id}
              className="rounded border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                {/* Left Info */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <FiCalendar size={22} />
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-slate-800">
                      {interview.position}
                    </h4>

                    <p className="font-medium text-slate-500">
                      {interview.company} • {interview.type}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <FiCalendar size={16} />
                        {interview.date}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <FiClock size={16} />
                        {interview.time}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <FiUser size={16} />
                        {interview.interviewer}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 rounded-full bg-orange-600 px-8 py-2 font-medium text-white shadow-md transition-all hover:bg-orange-700">
                    <FiVideo size={18} />
                    Join Meeting
                  </button>

                  <button className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-2 font-medium text-slate-700 transition-all hover:border-orange-300 hover:text-orange-600">
                    Reschedule
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Calendar */}
          <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-bold text-slate-800">
              Calendar View
            </h3>

            <div className="flex flex-col gap-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="min-w-[50px] rounded-xl bg-slate-50 py-2 text-center">
                    <p className="text-sm font-bold text-slate-800">{28 + i}</p>
                    <p className="text-xs uppercase text-slate-500">Apr</p>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">
                      {i === 0
                        ? "Interview with Google"
                        : i === 4
                          ? "Interview with Stripe"
                          : "No events"}
                    </p>

                    {(i === 0 || i === 4) && (
                      <p className="text-xs text-slate-500">Technical Round</p>
                    )}
                  </div>

                  {(i === 0 || i === 4) && (
                    <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                  )}
                </div>
              ))}

              <button className="mt-2 text-sm font-medium text-orange-600 transition hover:text-orange-700 hover:underline">
                Open Full Calendar
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-800">
              Interview Tips
            </h3>

            <ul className="space-y-4">
              <li className="flex gap-3">
                <FiChevronRight
                  size={18}
                  className="mt-0.5 shrink-0 text-orange-600"
                />
                <p className="text-sm text-slate-600">
                  Research the company's culture and values.
                </p>
              </li>

              <li className="flex gap-3">
                <FiChevronRight
                  size={18}
                  className="mt-0.5 shrink-0 text-orange-600"
                />
                <p className="text-sm text-slate-600">
                  Prepare STAR method responses for behavioral questions.
                </p>
              </li>

              <li className="flex gap-3">
                <FiChevronRight
                  size={18}
                  className="mt-0.5 shrink-0 text-orange-600"
                />
                <p className="text-sm text-slate-600">
                  Dress professionally even for video interviews.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Interviews;
