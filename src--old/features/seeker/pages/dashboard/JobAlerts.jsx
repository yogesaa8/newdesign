import React from "react";
import { FiBell, FiSettings, FiPlus, FiTrash2, FiEdit3 } from "react-icons/fi";
import Breadcrumb from "../../../../components/ui/Breadcrumb";

const JobAlerts = () => {
  const alerts = [
    {
      id: 1,
      role: "Senior React Developer",
      location: "Remote",
      frequency: "Daily",
      status: true,
    },
    {
      id: 2,
      role: "Full Stack Engineer",
      location: "San Francisco",
      frequency: "Weekly",
      status: true,
    },
    {
      id: 3,
      role: "UI/UX Designer",
      location: "Austin, TX",
      frequency: "Daily",
      status: false,
    },
  ];

  return (
    <>
      <Breadcrumb pageName="Job Alerts" />

      <div className="min-h-screen rounded border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-slate-800">
            Active Alerts
          </h3>

          <button className="flex items-center gap-2 bg-orange-600 px-6 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-orange-700">
            <FiPlus size={18} />
            Create New Alert
          </button>
        </div>

        <div className="p-6">
          {/* Alerts List */}
          <div className="flex flex-col gap-5">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex flex-col justify-between  border border-slate-200 bg-white p-5 transition-all hover:shadow-md sm:flex-row sm:items-center"
              >
                {/* Left */}
                <div className="mb-4 flex items-center gap-4 sm:mb-0">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      alert.status
                        ? "bg-orange-50 text-orange-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <FiBell size={22} />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800">{alert.role}</h4>
                    <p className="text-sm text-slate-500">
                      {alert.location} • {alert.frequency} notifications
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-6">
                  {/* Toggle */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600">
                      Status:
                    </span>

                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        defaultChecked={alert.status}
                        className="peer sr-only"
                      />

                      <div className="h-6 w-11 rounded-full bg-slate-300 peer-checked:bg-orange-600 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600">
                      <FiEdit3 size={18} />
                    </button>

                    <button className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-500">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Notification Settings */}
          <div className="mt-10 rounded border border-slate-200 bg-slate-50 p-8">
            <h4 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-800">
              <FiSettings size={20} className="text-orange-600" />
              Notification Settings
            </h4>

            <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">
                  Email Notifications
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 rounded accent-orange-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">
                  Push Notifications
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 rounded accent-orange-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">
                  Weekly Job Digest
                </span>
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded accent-orange-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">
                  Profile View Alerts
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 rounded accent-orange-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobAlerts;
