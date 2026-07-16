import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Edit3, Eye, FilePlus2, Trash2, Users } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { useAuthStore } from "../../../store";
import { deleteCourse, getProfile, listCourses, updateCourseStatus } from "../api/instituteApi";

const statuses = ["all", "draft", "published", "paused", "closed"];
const modes = ["all", "online", "offline", "hybrid"];

const statusClass = {
  draft: "bg-n-100 text-n-700",
  published: "bg-success-bg text-success",
  paused: "bg-yellow-50 text-yellow-700",
  closed: "bg-red-50 text-red-700",
};

const InstituteCourses = () => {
  const token = useAuthStore((state) => state.accessToken);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, total_pages: 1 });
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    mode: "all",
    page: 1,
    limit: 10,
  });
  const [canPostCourses, setCanPostCourses] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");

  const fetchCourses = async (nextFilters = filters) => {
    setLoading(true);
    try {
      const profileResponse = await getProfile(token);
      const profileData = profileResponse?.data || {};
      const profile = profileData.profile || {};
      const nextCanPost =
        profileData.profile_status === "completed" &&
        profile.status === "active" &&
        profile.can_post_courses !== false;
      setCanPostCourses(nextCanPost);

      if (profileData.profile_status !== "completed") {
        navigate("/institute/profile", { replace: true });
        return;
      }

      const coursesResponse = await listCourses(token, {
        ...nextFilters,
        sort_by: "created_at",
        sort_order: "desc",
      });
      setCourses(coursesResponse?.data?.courses || []);
      setPagination(coursesResponse?.data?.pagination || { page: 1, total_pages: 1 });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialCourses = async () => {
      setLoading(true);
      try {
        const profileResponse = await getProfile(token);
        const profileData = profileResponse?.data || {};
        const profile = profileData.profile || {};
        const nextCanPost =
          profileData.profile_status === "completed" &&
          profile.status === "active" &&
          profile.can_post_courses !== false;
        setCanPostCourses(nextCanPost);

        if (profileData.profile_status !== "completed") {
          navigate("/institute/profile", { replace: true });
          return;
        }

        const coursesResponse = await listCourses(token, {
          ...filters,
          sort_by: "created_at",
          sort_order: "desc",
        });
        setCourses(coursesResponse?.data?.courses || []);
        setPagination(coursesResponse?.data?.pagination || { page: 1, total_pages: 1 });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadInitialCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate]);

  const updateFilter = (key, value) => {
    const next = { ...filters, [key]: value, page: 1 };
    setFilters(next);
    fetchCourses(next);
  };

  const handleStatus = async (courseId, status) => {
    setBusyId(courseId);
    try {
      await updateCourseStatus(token, courseId, status);
      toast.success("Course status updated.");
      fetchCourses();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusyId("");
    }
  };

  const handleDelete = async (courseId) => {
    const confirmed = window.confirm("Delete this course? It will be hidden from listings.");
    if (!confirmed) return;

    setBusyId(courseId);
    try {
      await deleteCourse(token, courseId);
      toast.success("Course deleted.");
      fetchCourses();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusyId("");
    }
  };

  const goToPage = (page) => {
    const next = { ...filters, page };
    setFilters(next);
    fetchCourses(next);
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-co-primary">Courses</p>
          <h1 className="mt-1 text-2xl font-extrabold text-n-900">Manage institute courses</h1>
        </div>
        <Link
          to={canPostCourses ? "/institute/courses/create" : "/institute/profile"}
          className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
            canPostCourses
              ? "bg-co-primary hover:bg-co-hover"
              : "cursor-not-allowed bg-co-primary/50"
          }`}
        >
          <FilePlus2 className="h-4 w-4" />
          Create course
        </Link>
      </div>

      <div className="mb-4 grid gap-3 rounded-lg border border-n-200 bg-white p-4 md:grid-cols-[1fr_180px_180px_auto]">
        <Input
          audience="company"
          type="search"
          label="Search"
          value={filters.search}
          onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
          onKeyDown={(event) => {
            if (event.key === "Enter") fetchCourses({ ...filters, page: 1 });
          }}
          placeholder="Title, category, city"
        />
        <label className="text-sm font-medium text-n-700">
          Status
          <select
            value={filters.status}
            onChange={(event) => updateFilter("status", event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-n-200 bg-white px-3 py-3 text-sm font-semibold capitalize outline-none focus:border-co-primary"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-n-700">
          Mode
          <select
            value={filters.mode}
            onChange={(event) => updateFilter("mode", event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-n-200 bg-white px-3 py-3 text-sm font-semibold capitalize outline-none focus:border-co-primary"
          >
            {modes.map((mode) => (
              <option key={mode} value={mode}>{mode}</option>
            ))}
          </select>
        </label>
        <div className="flex items-end">
          <Button type="button" variant="outline-company" onClick={() => fetchCourses({ ...filters, page: 1 })}>
            Apply
          </Button>
        </div>
      </div>

      <section className="overflow-hidden rounded-lg border border-n-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead>
              <tr className="border-b border-n-100 text-xs font-bold uppercase tracking-[0.08em] text-n-500">
                <th className="px-5 py-3">Course</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Mode</th>
                <th className="px-5 py-3">Fees</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="px-5 py-8 text-center text-sm font-semibold text-n-500">Loading courses...</td></tr>
              ) : courses.length === 0 ? (
                <tr><td colSpan="6" className="px-5 py-8 text-center text-sm font-semibold text-n-500">No courses found.</td></tr>
              ) : (
                courses.map((course) => (
                  <tr key={course.id} className="border-b border-n-50 last:border-0 hover:bg-n-50">
                    <td className="px-5 py-4">
                      <Link to={`/institute/courses/${course.id}`} className="text-sm font-bold text-n-900 hover:text-co-primary">
                        {course.title}
                      </Link>
                      <p className="text-xs text-n-500">{course.city || "-"}, {course.state || "-"}</p>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold capitalize text-n-700">{course.course_type || "course"}</td>
                    <td className="px-5 py-4 text-sm font-semibold capitalize text-n-700">{course.mode}</td>
                    <td className="px-5 py-4 text-sm text-n-700">{course.fees ? `${course.currency || "INR"} ${course.fees}` : "Free"}</td>
                    <td className="px-5 py-4">
                      <select
                        value={course.status}
                        disabled={busyId === course.id}
                        onChange={(event) => handleStatus(course.id, event.target.value)}
                        className={`rounded-lg border-0 px-2.5 py-1 text-xs font-bold capitalize outline-none ${statusClass[course.status] || statusClass.draft}`}
                      >
                        <option value="draft">draft</option>
                        <option value="published">published</option>
                        <option value="paused">paused</option>
                        <option value="closed">closed</option>
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => navigate(`/institute/courses/${course.id}`)} className="rounded-lg p-2 text-n-500 hover:bg-n-100 hover:text-n-900" aria-label="View course"><Eye className="h-4 w-4" /></button>
                        <button type="button" onClick={() => navigate(`/institute/courses/${course.id}/edit`)} className="rounded-lg p-2 text-n-500 hover:bg-n-100 hover:text-n-900" aria-label="Edit course"><Edit3 className="h-4 w-4" /></button>
                        <button type="button" onClick={() => navigate(`/institute/courses/${course.id}/applicants`)} className="rounded-lg p-2 text-n-500 hover:bg-n-100 hover:text-n-900" aria-label="Applicants"><Users className="h-4 w-4" /></button>
                        <button type="button" onClick={() => handleDelete(course.id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50" aria-label="Delete course"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
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

export default InstituteCourses;
