import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Download } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { useAuthStore } from "../../../store";
import { exportApplicants, getProfile, listApplicants } from "../api/instituteApi";

const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const InstituteApplicants = () => {
  const { courseId } = useParams();
  const token = useAuthStore((state) => state.accessToken);
  const [course, setCourse] = useState(null);
  const [applications, setApplications] = useState([]);
  const [canExportApplicants, setCanExportApplicants] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, total_pages: 1 });
  const [filters, setFilters] = useState({ search: "", page: 1, limit: 10 });
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  const fetchApplicants = async (nextFilters = filters) => {
    setLoading(true);
    try {
      const [applicantsResponse, profileResponse] = await Promise.all([
        listApplicants(token, courseId, {
          ...nextFilters,
          sort_by: "applied_at",
          sort_order: "desc",
        }),
        getProfile(token),
      ]);
      const profile = profileResponse?.data?.profile || {};
      setCanExportApplicants(profile.can_export_applicants === true);
      setCourse(applicantsResponse?.data?.course || null);
      setApplications(applicantsResponse?.data?.applications || []);
      setPagination(applicantsResponse?.data?.pagination || { page: 1, total_pages: 1 });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialApplicants = async () => {
      setLoading(true);
      try {
        const [applicantsResponse, profileResponse] = await Promise.all([
          listApplicants(token, courseId, {
            ...filters,
            sort_by: "applied_at",
            sort_order: "desc",
          }),
          getProfile(token),
        ]);
        const profile = profileResponse?.data?.profile || {};
        setCanExportApplicants(profile.can_export_applicants === true);
        setCourse(applicantsResponse?.data?.course || null);
        setApplications(applicantsResponse?.data?.applications || []);
        setPagination(applicantsResponse?.data?.pagination || { page: 1, total_pages: 1 });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token && courseId) {
      loadInitialApplicants();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, courseId]);

  const handleExport = async () => {
    setExporting(true);
    try {
      const blob = await exportApplicants(token, courseId);
      downloadBlob(blob, `course-applicants-${courseId}.csv`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setExporting(false);
    }
  };

  const goToPage = (page) => {
    const next = { ...filters, page };
    setFilters(next);
    fetchApplicants(next);
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-co-primary">Applicants</p>
          <h1 className="mt-1 text-2xl font-extrabold text-n-900">{course?.title || "Course applicants"}</h1>
          <p className="mt-2 text-sm font-medium text-n-500">Only minimal applicant contact data is shown.</p>
        </div>
        {canExportApplicants && (
          <Button variant="primary-company" onClick={handleExport} loading={exporting}>
          <Download className="h-4 w-4" />
          Export CSV
          </Button>
        )}
      </div>

      <div className="mb-4 grid gap-3 rounded-lg border border-n-200 bg-white p-4 md:grid-cols-[1fr_auto]">
        <Input
          audience="company"
          type="search"
          label="Search applicants"
          value={filters.search}
          onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
          onKeyDown={(event) => {
            if (event.key === "Enter") fetchApplicants({ ...filters, page: 1 });
          }}
          placeholder="Name, email, phone, city, college"
        />
        <div className="flex items-end">
          <Button type="button" variant="outline-company" onClick={() => fetchApplicants({ ...filters, page: 1 })}>
            Apply
          </Button>
        </div>
      </div>

      <section className="overflow-hidden rounded-lg border border-n-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] text-left">
            <thead>
              <tr className="border-b border-n-100 text-xs font-bold uppercase tracking-[0.08em] text-n-500">
                <th className="px-5 py-3">Applicant</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">City</th>
                <th className="px-5 py-3">College</th>
                <th className="px-5 py-3">Degree</th>
                <th className="px-5 py-3">Year</th>
                <th className="px-5 py-3">Applied At</th>
                <th className="px-5 py-3">Note</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8" className="px-5 py-8 text-center text-sm font-semibold text-n-500">Loading applicants...</td></tr>
              ) : applications.length === 0 ? (
                <tr><td colSpan="8" className="px-5 py-8 text-center text-sm font-semibold text-n-500">No applicants found.</td></tr>
              ) : (
                applications.map((application) => (
                  <tr key={application.id} className="border-b border-n-50 last:border-0 hover:bg-n-50">
                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-n-900">{application.applicant_name}</p>
                      <p className="text-xs text-n-500">{application.applicant_email}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-n-700">{application.applicant_phone || "-"}</td>
                    <td className="px-5 py-4 text-sm text-n-700">{application.applicant_city || "-"}</td>
                    <td className="px-5 py-4 text-sm text-n-700">{application.applicant_college || "-"}</td>
                    <td className="px-5 py-4 text-sm text-n-700">{application.applicant_degree || "-"}</td>
                    <td className="px-5 py-4 text-sm text-n-700">{application.applicant_graduation_year || "-"}</td>
                    <td className="px-5 py-4 text-sm text-n-700">{application.applied_at ? new Date(application.applied_at).toLocaleString() : "-"}</td>
                    <td className="max-w-xs px-5 py-4 text-sm text-n-700">{application.applicant_note || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-4 flex items-center justify-between text-sm font-semibold text-n-500">
        <span>Page {pagination.page || 1} of {pagination.total_pages || 1}</span>
        <div className="flex gap-2">
          <Button variant="ghost" disabled={(pagination.page || 1) <= 1} onClick={() => goToPage((pagination.page || 1) - 1)}>Previous</Button>
          <Button variant="ghost" disabled={(pagination.page || 1) >= (pagination.total_pages || 1)} onClick={() => goToPage((pagination.page || 1) + 1)}>Next</Button>
        </div>
      </div>
    </section>
  );
};

export default InstituteApplicants;
