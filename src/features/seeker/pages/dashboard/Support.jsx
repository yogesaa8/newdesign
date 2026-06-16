import React from "react";
import {
  FiHelpCircle,
  FiMessageCircle,
  FiFileText,
  FiChevronRight,
  FiSend,
} from "react-icons/fi";
import Breadcrumb from "../../../../components/ui/Breadcrumb";

const Support = () => {
  return (
    <>
      <Breadcrumb pageName="Support Center" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left Card */}
        <div className="rounded border border-[#EADFD9] bg-white p-8 shadow-sm">
          <h3 className="mb-6 text-xl font-bold text-[#0A0A0A]">
            How can we help you?
          </h3>

          <div className="space-y-4">
            {[
              {
                icon: <FiHelpCircle size={22} />,
                title: "Knowledge Base",
              },
              {
                icon: <FiMessageCircle size={22} />,
                title: "Community Forum",
              },
              {
                icon: <FiFileText size={22} />,
                title: "API Documentation",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group flex cursor-pointer items-center justify-between rounded border border-[#EADFD9] bg-white p-5 transition-all hover:border-[#FF9566] hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-[#FFF7F3] text-[#FF6B35]">
                    {item.icon}
                  </div>

                  <span className="font-semibold text-[#4F4D55]">
                    {item.title}
                  </span>
                </div>

                <FiChevronRight
                  size={18}
                  className="text-[#8A8690] transition-all group-hover:translate-x-1 group-hover:text-[#FF6B35]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Card */}
        <div className="rounded border border-[#EADFD9] bg-white p-8 shadow-sm">
          <h3 className="mb-6 text-xl font-bold text-[#0A0A0A]">
            Open a Support Ticket
          </h3>

          <form>
            {/* Subject */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-[#4F4D55]">
                Subject
              </label>

              <input
                type="text"
                placeholder="Enter ticket subject"
                className="w-full rounded border border-[#D8C9C0] bg-[#F7F5F2] px-5 py-3 text-sm outline-none transition focus:border-[#8500FA]"
              />
            </div>

            {/* Category */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-[#4F4D55]">
                Category
              </label>

              <select className="w-full rounded border border-[#D8C9C0] bg-[#F7F5F2] px-5 py-3 text-sm outline-none transition focus:border-[#8500FA]">
                <option>Technical Issue</option>
                <option>Billing</option>
                <option>Account Access</option>
                <option>Feature Request</option>
              </select>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-[#4F4D55]">
                Description
              </label>

              <textarea
                rows="5"
                placeholder="Describe your issue"
                className="w-full rounded border border-[#D8C9C0] bg-[#F7F5F2] px-5 py-3 text-sm outline-none transition focus:border-[#8500FA]"
              ></textarea>
            </div>

            {/* Button */}
            <button className="flex w-full items-center justify-center gap-2 rounded bg-[#FF6B35] p-3.5 font-semibold text-white shadow-md transition-all hover:bg-[#FF9566]">
              <FiSend size={18} />
              Submit Ticket
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Support;
