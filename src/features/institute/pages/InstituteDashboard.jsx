import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BookOpen, FilePlus2, GraduationCap, Users } from "lucide-react";
import { useAuthStore } from "../../../store";
import { getProfile, listCourses } from "../api/instituteApi";

const statusStyles = {
  draft: "bg-n-100 text-n-700",
  published: "bg-success-bg text-success",
  paused: "bg-yellow-50 text-yellow-700",
  closed: "bg-red-50 text-red-700",
};

const InstituteDashboard = () => {
  const token = useAuthStore((state) => state.accessToken);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      try {
        const profileResponse = await getProfile(token);
        const nextProfileData = profileResponse?.data || null;
        setProfileData(nextProfileData);

        if (nextProfileData?.profile_status !== "completed") {
          navigate("/institute/profile", { replace: true });
          return;
        }

        const coursesResponse = await listCourses(token, {
          limit: 5,
          sort_by: "created_at",
          sort_order: "desc",
        });
        setCourses(coursesResponse?.data?.courses || []);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadDashboard();
    }
  }, [token, navigate]);

  const stats = useMemo(() => {
    const published = courses.filter((course) => course.status === "published").length;
    const drafts = courses.filter((course) => course.status === "draft").length;
    return [
      { label: "Loaded Courses", value: courses.length, icon: BookOpen },
      { label: "Published", value: published, icon: GraduationCap },
      { label: "Drafts", value: drafts, icon: FilePlus2 },
      { label: "Profile", value: profileData?.profile_status || "pending", icon: Users },
    ];
  }, [courses, profileData]);

  if (loading) {
    return <div className="p-6 text-sm font-semibold text-n-500">Loading institute dashboard...</div>;
  }

  const profile = profileData?.profile;
  const needsProfile = profileData?.profile_status !== "completed";
  const canPostCourses = profile?.can_post_courses !== false && !needsProfile;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-co-primary">
            Institute Workspace
          </p>
          <h1 className="mt-1 text-2xl font-extrabold text-n-900">
            {profile?.institute_name || "Institute dashboard"}
          </h1>
          <p className="mt-2 text-sm font-medium text-n-500">
            Manage profile, courses, publishing, and applicant exports.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/institute/profile"
            className="inline-flex items-center justify-center rounded-lg border border-co-primary px-4 py-2 text-sm font-semibold text-co-primary transition hover:bg-co-surface"
          >
            {needsProfile ? "Complete profile" : "Edit profile"}
          </Link>
          <Link
            to={canPostCourses ? "/institute/courses/create" : "/institute/profile"}
            className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
              canPostCourses
                ? "bg-co-primary hover:bg-co-hover"
                : "cursor-not-allowed bg-co-primary/50"
            }`}
          >
            <FilePlus2 className="h-4 w-4" />
            New course
          </Link>
        </div>
      </div>

      {needsProfile && (
        <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-semibold text-yellow-800">
          Complete the institute profile before creating and publishing courses.
        </div>
      )}

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className="rounded-lg border border-n-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-n-500">{item.label}</p>
                  <p className="mt-3 text-2xl font-extrabold capitalize text-n-900">{item.value}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-co-surface text-co-primary">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <section className="overflow-hidden rounded-lg border border-n-200 bg-white">
        <div className="flex items-center justify-between border-b border-n-100 px-5 py-4">
          <h2 className="text-lg font-extrabold text-n-900">Recent courses</h2>
          <Link to="/institute/courses" className="text-sm font-bold text-co-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-n-100 text-xs font-bold uppercase tracking-[0.08em] text-n-500">
                <th className="px-5 py-3">Course</th>
                <th className="px-5 py-3">Mode</th>
                <th className="px-5 py-3">Fees</th>
                <th className="px-5 py-3">Deadline</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-5 py-8 text-center text-sm font-semibold text-n-500">
                    No courses found.
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course.id} className="border-b border-n-50 last:border-0 hover:bg-n-50">
                    <td className="px-5 py-4">
                      <Link to={`/institute/courses/${course.id}`} className="text-sm font-bold text-n-900 hover:text-co-primary">
                        {course.title}
                      </Link>
                      <p className="text-xs text-n-500">{course.category || "Uncategorized"}</p>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold capitalize text-n-700">{course.mode || "-"}</td>
                    <td className="px-5 py-4 text-sm text-n-700">{course.fees ? `${course.currency || "INR"} ${course.fees}` : "Free"}</td>
                    <td className="px-5 py-4 text-sm text-n-700">{course.application_deadline || "-"}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${statusStyles[course.status] || statusStyles.draft}`}>
                        {course.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

export default InstituteDashboard;
