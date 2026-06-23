import { Link } from "react-router-dom";
import {
  BookOpen,
  CalendarCheck,
  FileText,
  GraduationCap,
  LogOut,
  Search,
  Users,
} from "lucide-react";

const stats = [
  {
    label: "Total Students",
    value: "248",
    note: "22 joined this month",
    icon: Users,
  },
  {
    label: "Total Courses",
    value: "12",
    note: "4 drone tracks live",
    icon: BookOpen,
  },
  {
    label: "Total Applications",
    value: "86",
    note: "18 pending review",
    icon: FileText,
  },
  {
    label: "Active Batches",
    value: "07",
    note: "3 field batches",
    icon: CalendarCheck,
  },
];

const students = [
  {
    id: "ST-1042",
    name: "Aarav Sharma",
    course: "Drone Operations Foundation",
    batch: "Morning A",
    status: "Active",
    progress: "78%",
  },
  {
    id: "ST-1043",
    name: "Priya Nair",
    course: "UAV Mapping Basics",
    batch: "Weekend B",
    status: "Review",
    progress: "64%",
  },
  {
    id: "ST-1044",
    name: "Kabir Mehta",
    course: "Drone Maintenance Lab",
    batch: "Evening C",
    status: "Active",
    progress: "91%",
  },
  {
    id: "ST-1045",
    name: "Neha Shah",
    course: "Aerial Survey Projects",
    batch: "Weekend B",
    status: "New",
    progress: "24%",
  },
];

const courses = [
  "Drone operations and safety",
  "UAV mapping and payload handling",
  "Maintenance lab practice",
];

const statusClass = {
  Active: "bg-green-50 text-green-700",
  Review: "bg-[#F1E7FF] text-[#8500FA]",
  New: "bg-[#FFF1E9] text-[#C84F1F]",
};

const InstituteDashboard = () => {
  return (
    <main className="min-h-screen bg-[#F7F5F2] text-[#111114]">
      <header className="border-b border-[#E7DDD6] bg-black text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/10 bg-white/10 text-violet-200">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-200">
                Institute workspace
              </p>
              <h1 className="mt-1 text-xl font-extrabold tracking-tight md:text-2xl">
                Arcanum Academic Partner Institute
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link
              to="/institute"
              className="rounded-[8px] border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/20"
            >
              Institute page
            </Link>
            <Link
              to="/institute/login"
              className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-violet-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-violet-700"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8">
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.label}
                className="rounded-[8px] border border-[#E7DDD6] bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#77737D]">
                      {item.label}
                    </p>
                    <p className="mt-3 text-3xl font-extrabold text-[#111114]">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#77737D]">
                      {item.note}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F1E7FF] text-[#8500FA]">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <section className="overflow-hidden rounded-[8px] border border-[#E7DDD6] bg-white">
            <div className="flex flex-col gap-4 border-b border-[#EFE7E1] px-5 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8500FA]">
                  Students
                </p>
                <h2 className="mt-1 text-lg font-extrabold text-[#111114]">
                  Current student list
                </h2>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9F9FA9]" />
                <input
                  type="search"
                  placeholder="Search students"
                  className="w-full rounded-[8px] border border-[#E7DDD6] bg-[#FDFBF9] px-3 py-2 pl-9 text-sm font-semibold text-[#111114] outline-none focus:border-[#8500FA] md:w-64"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr className="border-b border-[#EFE7E1] text-xs font-bold uppercase tracking-[0.08em] text-[#77737D]">
                    <th className="px-5 py-3">Student</th>
                    <th className="px-5 py-3">Course</th>
                    <th className="px-5 py-3">Batch</th>
                    <th className="px-5 py-3">Progress</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-[#F2ECE7] transition-colors last:border-0 hover:bg-[#FDFBF9]"
                    >
                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-[#111114]">
                          {student.name}
                        </p>
                        <p className="text-xs text-[#77737D]">{student.id}</p>
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold text-[#4F4D55]">
                        {student.course}
                      </td>
                      <td className="px-5 py-4 text-sm text-[#4F4D55]">
                        {student.batch}
                      </td>
                      <td className="px-5 py-4 text-sm font-bold text-[#111114]">
                        {student.progress}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-[8px] px-2.5 py-1 text-xs font-bold ${
                            statusClass[student.status]
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[8px] border border-[#E7DDD6] bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8500FA]">
                Active courses
              </p>
              <h2 className="mt-1 text-lg font-extrabold text-[#111114]">
                Training tracks
              </h2>
              <div className="mt-4 space-y-3">
                {courses.map((course, index) => (
                  <div
                    key={course}
                    className="rounded-[8px] border border-[#E7DDD6] bg-[#FDFBF9] px-4 py-3"
                  >
                    <p className="text-sm font-bold text-[#111114]">
                      {course}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-[#77737D]">
                      Batch {index + 1} scheduled this week
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[8px] border border-violet-100 bg-[#F1E7FF] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8500FA]">
                Mock preview
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#4F4D55]">
                This dashboard is a static institute UI preview. Student,
                course, batch, and application counts are sample data only.
              </p>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default InstituteDashboard;
