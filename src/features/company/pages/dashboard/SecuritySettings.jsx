import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../../../store/authStore";

const notificationOptions = [
  {
    key: "emailAlerts",
    label: "Email alerts",
    description: "Applicant and job updates.",
  },
  {
    key: "pushAlerts",
    label: "Push alerts",
    description: "Important recruiter actions.",
  },
  {
    key: "systemAlerts",
    label: "System alerts",
    description: "Security and platform notices.",
  },
];

const splitName = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" "),
  };
};

const pickNameValue = (...values) =>
  values.find(
    (value) => typeof value === "string" && value.trim() && !value.trim().includes("@"),
  ) || "";

const getNameParts = (user) => {
  const profile = user?.profile ?? {};
  const company = user?.company ?? {};
  const fallback = splitName(
    pickNameValue(
      profile.full_name,
      profile.name,
      user?.full_name,
      user?.name,
      company.contact_person,
    )
  );

  return {
    firstName: user?.first_name || profile.first_name || fallback.firstName,
    lastName: user?.last_name || profile.last_name || fallback.lastName,
  };
};

const SecuritySettings = () => {
  const { user, isLoading, updateCompanyAccountName } = useAuthStore();
  const nameParts = getNameParts(user);
  const [formData, setFormData] = useState({
    firstName: nameParts.firstName,
    lastName: nameParts.lastName,
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    const nextNameParts = getNameParts(user);
    setFormData((prev) => ({
      ...prev,
      firstName: nextNameParts.firstName,
      lastName: nextNameParts.lastName,
      email: user?.email || "",
    }));
  }, [user]);

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushAlerts: false,
    systemAlerts: true,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNotificationToggle = (type) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!formData.firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) nextErrors.lastName = "Last name is required.";

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const toastId = toast.loading("Updating account...");
    try {
      await updateCompanyAccountName({
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      toast.success("Account updated successfully.", { id: toastId });
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    console.log("Changing password");
  };

  const handleDeactivate = () => {
    if (
      window.confirm(
        "Are you sure you want to deactivate your account? All data will be archived for 30 days.",
      )
    ) {
      console.log("Deactivating account");
    }
  };

  const inputClass =
    "w-full rounded-[8px] border border-[#E7DDD6] bg-[#FDFBF9] px-4 py-3 text-sm font-semibold text-[#111114] outline-none transition focus:border-[#8500FA] focus:bg-white";
  const labelClass =
    "mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-[#77737D]";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8500FA]">
          Settings
        </p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#111114] md:text-3xl">
          Security
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className="rounded-[8px] border border-[#E7DDD6] bg-white p-5 md:p-6">
          <h2 className="text-base font-bold text-[#111114]">Account</h2>
          <form onSubmit={handleUpdateProfile} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass}>First name</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`${inputClass} ${fieldErrors.firstName ? "border-red-400" : ""}`}
                  type="text"
                  autoComplete="given-name"
                />
                {fieldErrors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.firstName}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Last name</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`${inputClass} ${fieldErrors.lastName ? "border-red-400" : ""}`}
                  type="text"
                  autoComplete="family-name"
                />
                {fieldErrors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.lastName}</p>
                )}
              </div>
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                name="email"
                value={formData.email}
                className={`${inputClass} cursor-not-allowed bg-[#EFE7E1] text-[#77737D]`}
                type="email"
                disabled
                readOnly
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-[8px] bg-[#111114] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#2B2B31] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Updating..." : "Update account"}
            </button>
          </form>
        </section>

        <section className="rounded-[8px] border border-[#E7DDD6] bg-white p-5 md:p-6">
          <h2 className="text-base font-bold text-[#111114]">Password</h2>
          <form onSubmit={handleChangePassword} className="mt-5 space-y-4">
            <div>
              <label className={labelClass}>Current password</label>
              <input
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="Current password"
                type="password"
              />
            </div>
            <div>
              <label className={labelClass}>New password</label>
              <input
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="New password"
                type="password"
              />
            </div>
            <button
              type="submit"
              className="rounded-[8px] bg-[#FF6B35] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#E85F2F]"
            >
              Change password
            </button>
          </form>
        </section>
      </div>

      <section className="mt-4 rounded-[8px] border border-[#E7DDD6] bg-white p-5 md:p-6">
        <h2 className="text-base font-bold text-[#111114]">Notifications</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {notificationOptions.map((option) => (
            <label
              key={option.key}
              className="flex cursor-pointer items-center justify-between gap-4 rounded-[8px] border border-[#EFE7E1] bg-[#FDFBF9] p-4"
            >
              <span>
                <span className="block text-sm font-bold text-[#111114]">
                  {option.label}
                </span>
                <span className="mt-1 block text-xs text-[#77737D]">
                  {option.description}
                </span>
              </span>
              <input
                type="checkbox"
                checked={notifications[option.key]}
                onChange={() => handleNotificationToggle(option.key)}
                className="h-5 w-5 accent-[#8500FA]"
              />
            </label>
          ))}
        </div>
      </section>

      <section className="mt-4 flex flex-col justify-between gap-4 rounded-[8px] border border-red-200 bg-red-50/50 p-5 md:flex-row md:items-center md:p-6">
        <div>
          <h2 className="text-base font-bold text-red-700">Deactivate account</h2>
          <p className="mt-1 text-sm text-red-600">
            Hiring data is archived for 30 days after deactivation.
          </p>
        </div>
        <button
          onClick={handleDeactivate}
          className="rounded-[8px] border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-600 transition-colors hover:bg-red-100"
          type="button"
        >
          Deactivate
        </button>
      </section>
    </div>
  );
};

export default SecuritySettings;
