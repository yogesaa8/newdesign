import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Download, Edit3, Users } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { useAuthStore } from "../../../store";
import { exportApplicants, getCourse, getProfile, updateCourseStatus } from "../api/instituteApi";

const statusClass = {
  draft: "bg-n-100 text-n-700",
  published: "bg-success-bg text-success",
  paused: "bg-yellow-50 text-yellow-700",
  closed: "bg-red-50 text-red-700",
};

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-xs font-bold uppercase tracking-[0.08em] text-n-400">{label}</p>
    <p className="mt-1 text-sm font-semibold text-n-800">{value || "-"}</p>
  </div>
);

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

const InstituteCourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.accessToken);
  const [course, setCourse] = useState(null);
  const [canExportApplicants, setCanExportApplicants] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const loadCourse = async () => {
    setLoading(true);
    try {
      const [courseResponse, profileResponse] = await Promise.all([
        getCourse(token, courseId),
        getProfile(token),
      ]);
      const profile = profileResponse?.data?.profile || {};
      setCanExportApplicants(profile.can_export_applicants === true);
      setCourse(courseResponse?.data?.course || null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialCourse = async () => {
      setLoading(true);
      try {
        const [courseResponse, profileResponse] = await Promise.all([
          getCourse(token, courseId),
          getProfile(token),
        ]);
        const profile = profileResponse?.data?.profile || {};
        setCanExportApplicants(profile.can_export_applicants === true);
        setCourse(courseResponse?.data?.course || null);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token && courseId) {
      loadInitialCourse();
    }
  }, [token, courseId]);

  const handleStatus = async (status) => {
    setBusy(true);
    try {
      await updateCourseStatus(token, courseId, status);
      toast.success("Course status updated.");
      loadCourse();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  };

  const handleExport = async () => {
    setBusy(true);
    try {
      const blob = await exportApplicants(token, courseId);
      downloadBlob(blob, `course-applicants-${courseId}.csv`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-sm font-semibold text-n-500">Loading course detail...</div>;
  }

  if (!course) {
    return <div className="p-6 text-sm font-semibold text-n-500">Course not found.</div>;
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-co-primary">Course detail</p>
          <h1 className="mt-1 text-2xl font-extrabold text-n-900">{course.title}</h1>
          <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-n-500">{course.short_description || course.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline-company" onClick={() => navigate(`/institute/courses/${courseId}/edit`)}>
            <Edit3 className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline-company" onClick={() => navigate(`/institute/courses/${courseId}/applicants`)}>
            <Users className="h-4 w-4" />
            Applicants
          </Button>
          {canExportApplicants && (
            <Button variant="primary-company" onClick={handleExport} loading={busy}>
            <Download className="h-4 w-4" />
            Export CSV
            </Button>
          )}
        </div>
      </div>

      <div className="mb-5 rounded-lg border border-n-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <span className={`w-fit rounded-lg px-3 py-1.5 text-xs font-bold capitalize ${statusClass[course.status] || statusClass.draft}`}>
            {course.status}
          </span>
          <div className="flex flex-wrap gap-2">
            {["draft", "published", "paused", "closed"].map((status) => (
              <Button
                key={status}
                type="button"
                variant={course.status === status ? "primary-company" : "ghost"}
                size="sm"
                disabled={busy || course.status === status}
                onClick={() => handleStatus(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <article className="rounded-lg border border-n-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-extrabold text-n-900">Course information</h2>
          <p className="mt-4 whitespace-pre-line text-sm font-medium leading-7 text-n-700">{course.description}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <DetailItem label="Eligibility" value={course.eligibility} />
            <DetailItem label="Skills covered" value={course.skills_covered} />
            <DetailItem label="Outcomes" value={course.outcomes} />
            <DetailItem label="Duration" value={course.duration} />
          </div>
        </article>

        <aside className="space-y-5">
          <div className="rounded-lg border border-n-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-extrabold text-n-900">Schedule</h2>
            <div className="mt-4 space-y-4">
              <DetailItem label="Start date" value={course.start_date} />
              <DetailItem label="End date" value={course.end_date} />
              <DetailItem label="Application deadline" value={course.application_deadline} />
              <DetailItem label="Max applications" value={course.max_applications} />
            </div>
          </div>

          <div className="rounded-lg border border-n-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-extrabold text-n-900">Location and fees</h2>
            <div className="mt-4 space-y-4">
              <DetailItem label="Mode" value={course.mode} />
              <DetailItem label="Location" value={[course.city, course.state, course.country].filter(Boolean).join(", ")} />
              <DetailItem label="Fees" value={course.fees ? `${course.currency || "INR"} ${course.fees}` : "Free"} />
              {course.brochure_url && (
                <a className="block text-sm font-bold text-co-primary hover:underline" href={course.brochure_url} target="_blank" rel="noreferrer">
                  Open brochure
                </a>
              )}
              {course.syllabus_url && (
                <a className="block text-sm font-bold text-co-primary hover:underline" href={course.syllabus_url} target="_blank" rel="noreferrer">
                  Open syllabus
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default InstituteCourseDetail;
