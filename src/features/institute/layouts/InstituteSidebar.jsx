import { BookOpen, FilePlus2, GraduationCap, LayoutDashboard, LogOut, UserRound } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store";

const navItems = [
  { label: "Overview", path: "/institute/dashboard", icon: LayoutDashboard },
  { label: "Courses", path: "/institute/courses", icon: BookOpen },
  { label: "Create Course", path: "/institute/courses/create", icon: FilePlus2 },
  { label: "Profile", path: "/institute/profile", icon: UserRound },
];

const InstituteSidebar = ({ sidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const isActive = (path) => {
    if (path === "/institute/courses") {
      return (
        location.pathname === path ||
        (location.pathname.startsWith("/institute/courses/") &&
          location.pathname !== "/institute/courses/create")
      );
    }
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-dvh w-64 flex-col border-r border-white/10 bg-n-800 px-2 py-5 transition-transform duration-300 md:sticky md:z-30 md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <Link to="/institute/dashboard" className="mb-6 flex items-center gap-3 px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-co-primary text-white">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <p className="text-base font-extrabold tracking-tight text-white">
            First<span className="text-sk-primary">Job</span>India
          </p>
          <p className="text-xs font-medium text-n-400">Institute</p>
        </div>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`mx-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                isActive(item.path)
                  ? "bg-co-primary text-white"
                  : "text-n-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 pt-3">
        <button
          type="button"
          onClick={handleLogout}
          className="mx-2 flex w-[calc(100%-1rem)] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-300 transition-colors hover:bg-white/5 hover:text-red-200"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default InstituteSidebar;
