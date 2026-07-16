import { useEffect, useState } from "react";
import toast from "@/lib/toast";
import { useAuthStore, useAdminStore } from "../../../../../store";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
];

const formatDate = (value) => {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const CompanyManagementTab = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const {
    approveCompany,
    companies,
    companyError,
    companyFilters,
    companyPagination,
    fetchCompanies,
    isApprovingCompany,
    isCompaniesLoading,
    setCompanyFilters,
  } = useAdminStore();

  const [localFilters, setLocalFilters] = useState({
    search: companyFilters.search || "",
    status: companyFilters.status || "all",
    sort_by: companyFilters.sort_by || "created_at",
    sort_order: companyFilters.sort_order || "desc",
  });

  useEffect(() => {
    if (!accessToken) return;
    fetchCompanies(accessToken, companyFilters).catch(() => {});
  }, [accessToken, fetchCompanies]);

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    const nextFilters = { ...companyFilters, ...localFilters, page: 1 };
    setCompanyFilters(nextFilters);
    fetchCompanies(accessToken, nextFilters).catch(() => {});
  };

  const handlePageChange = (page) => {
    const nextFilters = { ...companyFilters, page };
    setCompanyFilters(nextFilters);
    fetchCompanies(accessToken, nextFilters).catch(() => {});
  };

  const handleApprove = async (company) => {
    try {
      await approveCompany(company.company_id, accessToken);
      toast.success("Company approved successfully.");
    } catch (error) {
      toast.error(error?.message || "Unable to approve company.");
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleFilterSubmit}
        className="grid gap-3 rounded-xl border border-n-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_160px_160px_160px_auto]"
      >
        <div className="relative">
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
            placeholder="Search company, email, industry"
            className="h-11 w-full rounded-lg border border-n-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-sk-primary focus:ring-2 focus:ring-sk-primary/10"
          />
        </div>

        <SelectField
          value={localFilters.status}
          onChange={(value) =>
            setLocalFilters((prev) => ({ ...prev, status: value }))
          }
          options={statusOptions}
          ariaLabel="Company status"
        />

        <SelectField
          value={localFilters.sort_by}
          onChange={(value) =>
            setLocalFilters((prev) => ({ ...prev, sort_by: value }))
          }
          options={[
            { label: "Created date", value: "created_at" },
            { label: "Company name", value: "company_name" },
            { label: "Email", value: "email" },
          ]}
          ariaLabel="Sort companies by"
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
          ariaLabel="Company sort order"
        />

        <button className="h-11 rounded-lg bg-sk-primary px-5 text-sm font-bold text-white transition hover:bg-sk-hover">
          Apply
        </button>
      </form>

      {companyError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {companyError}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-n-200 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-n-100 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-base font-bold text-n-900">Company Accounts</h3>
            <p className="mt-1 text-sm text-n-500">
              Review company profiles and approve pending employer accounts.
            </p>
          </div>
          <button
            type="button"
            onClick={() => fetchCompanies(accessToken, companyFilters)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-n-200 bg-white px-4 text-sm font-semibold text-n-700 transition hover:border-sk-primary hover:text-sk-primary"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            Refresh
          </button>
        </div>

        <div className="admin-table-scroll overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left">
            <thead>
              <tr className="border-b border-n-100 bg-n-50">
                {[
                  "Company",
                  "Contact",
                  "Industry",
                  "Status",
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
              {isCompaniesLoading ? (
                <TableState colSpan={6} label="Loading companies..." />
              ) : companies.length ? (
                companies.map((company) => (
                  <tr
                    key={company.company_id}
                    className="border-b border-n-100 last:border-0 hover:bg-n-50"
                  >
                    <td className="p-4">
                      <p className="font-semibold text-n-900">
                        {company.company_name || "Unnamed company"}
                      </p>
                      <p className="mt-1 text-xs text-n-500">{company.email}</p>
                    </td>
                    <td className="p-4 text-sm text-n-700">
                      <p>{company.contact_person || "Not provided"}</p>
                      <p className="mt-1 text-xs text-n-500">
                        {company.phone_no || "No phone"}
                      </p>
                    </td>
                    <td className="p-4 text-sm text-n-700">
                      {company.industry || "Not provided"}
                    </td>
                    <td className="p-4">
                      <StatusBadge
                        status={
                          company.approval_status ||
                          (company.is_approved ? "approved" : "pending")
                        }
                      />
                    </td>
                    <td className="p-4 text-sm text-n-500">
                      {formatDate(company.created_at)}
                    </td>
                    <td className="p-4">
                      <button
                        type="button"
                        disabled={company.is_approved || isApprovingCompany}
                        onClick={() => handleApprove(company)}
                        className="inline-flex h-9 items-center justify-center rounded-lg bg-sk-primary px-4 text-sm font-bold text-white transition hover:bg-sk-hover disabled:cursor-not-allowed disabled:bg-n-200 disabled:text-n-500"
                      >
                        {company.is_approved ? "Approved" : "Approve"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <TableState colSpan={6} label="No companies found." />
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          pagination={companyPagination}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

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
  const classes =
    normalizedStatus === "approved"
      ? "bg-green-50 text-green-700"
      : "bg-amber-50 text-amber-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${classes}`}>
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

export default CompanyManagementTab;
