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
          <h3 className="mb-4 text-xl font-bold text-[#0A0A0A]">
            Upcoming Interviews
          </h3>

          {upcomingInterviews.map((interview) => (
            <div
              key={interview.id}
              className="rounded border border-[#EADFD9] bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                {/* Left Info */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-[#FFF7F3] text-[#FF6B35]">
                    <FiCalendar size={22} />
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-[#0A0A0A]">
                      {interview.position}
                    </h4>

                    <p className="font-medium text-[#6F6F76]">
                      {interview.company} • {interview.type}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-[#6F6F76]">
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
                  <button className="flex items-center gap-2 rounded-full bg-[#FF6B35] px-8 py-2 font-medium text-white shadow-md transition-all hover:bg-[#FF9566]">
                    <FiVideo size={18} />
                    Join Meeting
                  </button>

                  <button className="flex items-center gap-2 rounded-full border border-[#D8C9C0] bg-white px-6 py-2 font-medium text-[#4F4D55] transition-all hover:border-[#FF9566] hover:text-[#FF6B35]">
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
          <div className="rounded border border-[#EADFD9] bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-bold text-[#0A0A0A]">
              Calendar View
            </h3>

            <div className="flex flex-col gap-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 border-b border-[#EFE7E1] pb-4 last:border-0 last:pb-0"
                >
                  <div className="min-w-[50px] rounded-[8px] bg-[#F7F5F2] py-2 text-center">
                    <p className="text-sm font-bold text-[#0A0A0A]">{28 + i}</p>
                    <p className="text-xs uppercase text-[#6F6F76]">Apr</p>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#4F4D55]">
                      {i === 0
                        ? "Interview with Google"
                        : i === 4
                          ? "Interview with Stripe"
                          : "No events"}
                    </p>

                    {(i === 0 || i === 4) && (
                      <p className="text-xs text-[#6F6F76]">Technical Round</p>
                    )}
                  </div>

                  {(i === 0 || i === 4) && (
                    <div className="h-2 w-2 rounded-full bg-[#FF6B35]"></div>
                  )}
                </div>
              ))}

              <button className="mt-2 text-sm font-medium text-[#FF6B35] transition hover:text-[#C84F1F] hover:underline">
                Open Full Calendar
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="rounded border border-[#EADFD9] bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-[#0A0A0A]">
              Interview Tips
            </h3>

            <ul className="space-y-4">
              <li className="flex gap-3">
                <FiChevronRight
                  size={18}
                  className="mt-0.5 shrink-0 text-[#FF6B35]"
                />
                <p className="text-sm text-[#6F6F76]">
                  Research the company's culture and values.
                </p>
              </li>

              <li className="flex gap-3">
                <FiChevronRight
                  size={18}
                  className="mt-0.5 shrink-0 text-[#FF6B35]"
                />
                <p className="text-sm text-[#6F6F76]">
                  Prepare STAR method responses for behavioral questions.
                </p>
              </li>

              <li className="flex gap-3">
                <FiChevronRight
                  size={18}
                  className="mt-0.5 shrink-0 text-[#FF6B35]"
                />
                <p className="text-sm text-[#6F6F76]">
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
