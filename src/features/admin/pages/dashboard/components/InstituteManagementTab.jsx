import { useEffect, useState } from "react";
import toast from "@/lib/toast";
import { useAuthStore, useAdminStore } from "../../../../../store";

const initialForm = {
  email: "",
  phone_no: "",
  password: "",
  must_change_password: false,
};

const formatDate = (value) => {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const InstituteManagementTab = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const {
    clearSelectedInstitute,
    createInstitute,
    fetchInstituteById,
    fetchInstitutes,
    instituteError,
    instituteFilters,
    institutePagination,
    institutes,
    isCreatingInstitute,
    isFetchingInstitute,
    isInstitutesLoading,
    selectedInstitute,
    setInstituteFilters,
  } = useAdminStore();

  const [formData, setFormData] = useState(initialForm);
  const [localFilters, setLocalFilters] = useState({
    search: instituteFilters.search || "",
    status: instituteFilters.status || "all",
    profile_status: instituteFilters.profile_status || "all",
    sort_by: instituteFilters.sort_by || "created_at",
    sort_order: instituteFilters.sort_order || "desc",
  });

  useEffect(() => {
    if (!accessToken) return;
    fetchInstitutes(accessToken, instituteFilters).catch(() => {});
  }, [accessToken, fetchInstitutes]);

  const handleFieldChange = (event) => {
    const { checked, name, type, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateInstitute = async (event) => {
    event.preventDefault();

    try {
      await createInstitute(
        {
          email: formData.email.trim(),
          phone_no: formData.phone_no.trim(),
          password: formData.password,
          must_change_password: formData.must_change_password,
        },
        accessToken,
      );
      setFormData(initialForm);
      toast.success("Institute account created successfully.");
    } catch (error) {
      toast.error(error?.message || "Unable to create institute account.");
    }
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    const nextFilters = { ...instituteFilters, ...localFilters, page: 1 };
    setInstituteFilters(nextFilters);
    fetchInstitutes(accessToken, nextFilters).catch(() => {});
  };

  const handlePageChange = (page) => {
    const nextFilters = { ...instituteFilters, page };
    setInstituteFilters(nextFilters);
    fetchInstitutes(accessToken, nextFilters).catch(() => {});
  };

  const handleViewInstitute = async (instituteUserId) => {
    try {
      await fetchInstituteById(instituteUserId, accessToken);
    } catch (error) {
      toast.error(error?.message || "Unable to fetch institute details.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form
          onSubmit={handleCreateInstitute}
          className="rounded-xl border border-n-200 bg-white p-5 shadow-sm"
        >
          <div>
            <h3 className="text-base font-bold text-n-900">
              Create Institute Login
            </h3>
            <p className="mt-1 text-sm leading-6 text-n-500">
              Admin creates the login account. The institute completes its own
              profile after signing in.
            </p>
          </div>

          <div className="mt-5 space-y-4">
            <TextField
              label="Institute email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleFieldChange}
              placeholder="partner@institute.edu"
            />
            <TextField
              label="Phone number"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleFieldChange}
              placeholder="9876543210"
              minLength={10}
              maxLength={10}
            />
            <TextField
              label="Temporary password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleFieldChange}
              placeholder="Minimum 8 characters"
              minLength={8}
              maxLength={72}
            />

            <label className="flex items-center gap-3 rounded-lg border border-n-200 px-3 py-3 text-sm font-semibold text-n-700">
              <input
                type="checkbox"
                name="must_change_password"
                checked={formData.must_change_password}
                onChange={handleFieldChange}
                className="h-4 w-4 accent-sk-primary"
              />
              Require password change on first login
            </label>

            <button
              type="submit"
              disabled={isCreatingInstitute}
              className="h-11 w-full rounded-lg bg-sk-primary px-5 text-sm font-bold text-white transition hover:bg-sk-hover disabled:cursor-not-allowed disabled:bg-n-200 disabled:text-n-500"
            >
              {isCreatingInstitute ? "Creating..." : "Create Institute Account"}
            </button>
          </div>
        </form>

        <form
          onSubmit={handleFilterSubmit}
          className="grid content-start gap-3 rounded-xl border border-n-200 bg-white p-5 shadow-sm md:grid-cols-2 xl:grid-cols-3"
        >
          <div className="relative md:col-span-2 xl:col-span-3">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-n-400">
              search
            </span>
            <input
              value={localFilters.search}
              onChange={(event) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  search: event.target.value,
                }))
              }
              placeholder="Search email, phone, institute, city"
              className="h-11 w-full rounded-lg border border-n-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-sk-primary focus:ring-2 focus:ring-sk-primary/10"
            />
          </div>

          <SelectField
            value={localFilters.status}
            onChange={(value) =>
              setLocalFilters((prev) => ({ ...prev, status: value }))
            }
            options={[
              { label: "All accounts", value: "all" },
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ]}
            ariaLabel="Institute account status"
          />
          <SelectField
            value={localFilters.profile_status}
            onChange={(value) =>
              setLocalFilters((prev) => ({ ...prev, profile_status: value }))
            }
            options={[
              { label: "All profiles", value: "all" },
              { label: "Completed", value: "completed" },
              { label: "Pending", value: "pending" },
            ]}
            ariaLabel="Institute profile status"
          />
          <SelectField
            value={localFilters.sort_by}
            onChange={(value) =>
              setLocalFilters((prev) => ({ ...prev, sort_by: value }))
            }
            options={[
              { label: "Created date", value: "created_at" },
              { label: "Email", value: "email" },
              { label: "Phone", value: "phone_no" },
            ]}
            ariaLabel="Sort institutes by"
          />
          <SelectField
            value={localFilters.sort_order}
            onChange={(value) =>
              setLocalFilters((prev) => ({ ...prev, sort_order: value }))
            }
            options={[
              { label: "Newest first", value: "desc" },
              { label: "Oldest first", value: "asc" },
            ]}
            ariaLabel="Institute sort order"
          />
          <button className="h-11 rounded-lg bg-sk-primary px-5 text-sm font-bold text-white transition hover:bg-sk-hover md:col-span-2 xl:col-span-2">
            Apply Filters
          </button>
        </form>
      </div>

      {instituteError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {instituteError}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-n-200 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-n-100 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-base font-bold text-n-900">Institute Accounts</h3>
            <p className="mt-1 text-sm text-n-500">
              Track login status, profile completion, and course permissions.
            </p>
          </div>
          <button
            type="button"
            onClick={() => fetchInstitutes(accessToken, instituteFilters)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-n-200 bg-white px-4 text-sm font-semibold text-n-700 transition hover:border-sk-primary hover:text-sk-primary"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            Refresh
          </button>
        </div>

        <div className="admin-table-scroll overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse text-left">
            <thead>
              <tr className="border-b border-n-100 bg-n-50">
                {[
                  "Login",
                  "Account",
                  "Profile",
                  "Institute",
                  "Permissions",
                  "Created",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="whitespace-nowrap p-4 text-xs font-bold uppercase tracking-wider text-n-400"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isInstitutesLoading ? (
                <TableState colSpan={7} label="Loading institutes..." />
              ) : institutes.length ? (
                institutes.map((institute) => {
                  const profile = institute.institute_profile;

                  return (
                    <tr
                      key={institute.institute_user_id}
                      className="border-b border-n-100 last:border-0 hover:bg-n-50"
                    >
                      <td className="p-4">
                        <p className="font-semibold text-n-900">
                          {institute.email}
                        </p>
                        <p className="mt-1 text-xs text-n-500">
                          {institute.phone_no || "No phone"}
                        </p>
                      </td>
                      <td className="p-4">
                        <StatusBadge
                          status={institute.is_active ? "active" : "inactive"}
                        />
                        <p className="mt-2 text-xs text-n-500">
                          {institute.is_verified ? "Verified" : "Not verified"}
                        </p>
                      </td>
                      <td className="p-4">
                        <StatusBadge status={institute.profile_status} />
                      </td>
                      <td className="p-4 text-sm text-n-700">
                        <p className="font-semibold text-n-900">
                          {profile?.institute_name || "Profile pending"}
                        </p>
                        <p className="mt-1 text-xs text-n-500">
                          {[profile?.city, profile?.state].filter(Boolean).join(", ") ||
                            "Location pending"}
                        </p>
                      </td>
                      <td className="p-4 text-xs font-semibold text-n-600">
                        <p>Courses: {profile?.can_post_courses ? "Yes" : "No"}</p>
                        <p className="mt-1">
                          Export: {profile?.can_export_applicants ? "Yes" : "No"}
                        </p>
                      </td>
                      <td className="p-4 text-sm text-n-500">
                        {formatDate(institute.created_at)}
                      </td>
                      <td className="p-4">
                        <button
                          type="button"
                          onClick={() =>
                            handleViewInstitute(institute.institute_user_id)
                          }
                          className="inline-flex h-9 items-center justify-center rounded-lg border border-n-200 bg-white px-4 text-sm font-bold text-n-700 transition hover:border-sk-primary hover:text-sk-primary"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <TableState colSpan={7} label="No institute accounts found." />
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          pagination={institutePagination}
          onPageChange={handlePageChange}
        />
      </div>

      {selectedInstitute && (
        <InstituteDetailsModal
          institute={selectedInstitute}
          isLoading={isFetchingInstitute}
          onClose={clearSelectedInstitute}
        />
      )}
    </div>
  );
};

const TextField = ({ label, ...props }) => (
  <label className="block">
    <span className="text-xs font-bold uppercase tracking-wider text-n-500">
      {label}
    </span>
    <input
      required
      className="mt-2 h-11 w-full rounded-lg border border-n-200 bg-white px-3 text-sm outline-none transition focus:border-sk-primary focus:ring-2 focus:ring-sk-primary/10"
      {...props}
    />
  </label>
);

const SelectField = ({ ariaLabel, onChange, options, value }) => (
  <select
    aria-label={ariaLabel}
    value={value}
    onChange={(event) => onChange(event.target.value)}
    className="h-11 rounded-lg border border-n-200 bg-white px-3 text-sm font-semibold text-n-700 outline-none transition focus:border-sk-primary focus:ring-2 focus:ring-sk-primary/10"
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const StatusBadge = ({ status }) => {
  const normalizedStatus = status || "pending";
  const classes = {
    active: "bg-green-50 text-green-700",
    completed: "bg-green-50 text-green-700",
    inactive: "bg-red-50 text-red-700",
    pending: "bg-amber-50 text-amber-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${
        classes[normalizedStatus] || "bg-n-100 text-n-700"
      }`}
    >
      {normalizedStatus}
    </span>
  );
};

const TableState = ({ colSpan, label }) => (
  <tr>
    <td colSpan={colSpan} className="p-8 text-center text-sm font-semibold text-n-500">
      {label}
    </td>
  </tr>
);

const Pagination = ({ onPageChange, pagination }) => {
  const currentPage = pagination?.page || 1;
  const totalPages = pagination?.total_pages || 1;

  return (
    <div className="flex flex-col gap-3 border-t border-n-100 p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-n-500">
        Showing page {currentPage} of {totalPages} ({pagination?.total || 0} total)
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="h-9 rounded-lg border border-n-200 px-3 text-sm font-semibold text-n-700 transition hover:border-sk-primary hover:text-sk-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="h-9 rounded-lg border border-n-200 px-3 text-sm font-semibold text-n-700 transition hover:border-sk-primary hover:text-sk-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const InstituteDetailsModal = ({ institute, isLoading, onClose }) => {
  const profile = institute.institute_profile;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-n-900/50 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-n-100 p-5">
          <div>
            <h3 className="text-lg font-bold text-n-900">Institute Details</h3>
            <p className="mt-1 text-sm text-n-500">{institute.email}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-n-500 transition hover:bg-n-100 hover:text-n-900"
            aria-label="Close institute details"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-sm font-semibold text-n-500">
            Loading details...
          </div>
        ) : (
          <div className="grid gap-4 p-5 md:grid-cols-2">
            <Detail label="Login email" value={institute.email} />
            <Detail label="Phone" value={institute.phone_no} />
            <Detail
              label="Account status"
              value={institute.is_active ? "Active" : "Inactive"}
            />
            <Detail label="Profile status" value={institute.profile_status} />
            <Detail
              label="Institute name"
              value={profile?.institute_name || "Profile pending"}
            />
            <Detail label="Website" value={profile?.website || "Not provided"} />
            <Detail
              label="Contact person"
              value={profile?.contact_person_name || "Not provided"}
            />
            <Detail
              label="Contact email"
              value={profile?.contact_person_email || "Not provided"}
            />
            <Detail
              label="City"
              value={[profile?.city, profile?.state].filter(Boolean).join(", ") ||
                "Not provided"}
            />
            <Detail label="Country" value={profile?.country || "Not provided"} />
            <Detail
              label="Can post courses"
              value={profile?.can_post_courses ? "Yes" : "No"}
            />
            <Detail
              label="Can export applicants"
              value={profile?.can_export_applicants ? "Yes" : "No"}
            />
            <Detail
              label="Address"
              value={profile?.address || "Not provided"}
              className="md:col-span-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const Detail = ({ className = "", label, value }) => (
  <div className={`rounded-lg border border-n-200 bg-n-50 p-4 ${className}`}>
    <p className="text-xs font-bold uppercase tracking-wider text-n-400">
      {label}
    </p>
    <p className="mt-2 break-words text-sm font-semibold text-n-900">
      {value || "Not available"}
    </p>
  </div>
);

export default InstituteManagementTab;
