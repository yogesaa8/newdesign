import {
  FiBell,
  FiBookmark,
  FiBriefcase,
  FiClock,
  FiFilePlus,
  FiHelpCircle,
  FiLayout,
  FiLogOut,
  FiMessageCircle,
  FiSettings,
  FiUser,
  FiX,
} from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/seeker/login");
  };

  const navItems = [
    {
      title: "MAIN MENU",
      items: [
        {
          name: "Dashboard",
          icon: <FiLayout size={18} />,
          path: "/seeker/dashboard",
        },
        {
          name: "My Profile",
          icon: <FiUser size={18} />,
          path: "/seeker/dashboard/profile",
        },
        {
          name: "Applications",
          icon: <FiBriefcase size={18} />,
          path: "/seeker/dashboard/applications",
          badge: "NEW",
          badgeColor: "bg-[#FFF1E9] text-[#C84F1F]",
        },
        {
          name: "Saved Jobs",
          icon: <FiBookmark size={18} />,
          path: "/seeker/dashboard/saved-jobs",
        },
        {
          name: "Job Alerts",
          icon: <FiBell size={18} />,
          path: "/seeker/dashboard/job-alerts",
        },
        {
          name: "Interviews",
          icon: <FiClock size={18} />,
          path: "/seeker/dashboard/interviews",
        },
      ],
    },
    {
      title: "COMMUNICATION",
      items: [
        {
          name: "Messages",
          icon: <FiMessageCircle size={18} />,
          path: "/seeker/dashboard/messages",
          badge: "5",
          badgeColor: "bg-red-100 text-red-600",
        },
        {
          name: "Documents",
          icon: <FiFilePlus size={18} />,
          path: "/seeker/dashboard/documents",
        },
      ],
    },
    {
      title: "SETTINGS",
      items: [
        {
          name: "Support",
          icon: <FiHelpCircle size={18} />,
          path: "/seeker/dashboard/support",
        },
        {
          name: "Account Settings",
          icon: <FiSettings size={18} />,
          path: "/seeker/dashboard/settings",
        },
      ],
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-white border-r border-[#EADFD9] shadow-xl transition-transform duration-300 lg:static lg:translate-x-0
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-[#EFE7E1]">
        <NavLink to="/seeker/dashboard" className="flex items-center gap-3">
          <div className="p-2 bg-[#FFF1E9] rounded-[8px]">
            <img
              src="/images/logos/fji_orange.png"
              alt="FirstJobIndia"
              className="h-[22px] w-[22px] object-contain"
            />
          </div>
          <span className="text-xl font-bold text-[#0A0A0A]">
            <span>First</span>
            <span className="text-[#FF6B35]">Job</span>
            <span>India</span>
          </span>
        </NavLink>

        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-[#6F6F76] hover:text-[#0A0A0A]"
        >
          <FiX size={22} />
        </button>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {navItems.map((section, index) => (
          <div key={index} className="mb-8">
            <h3 className="px-3 mb-3 text-xs font-semibold uppercase tracking-wider text-[#8A8690]">
              {section.title}
            </h3>

            <ul className="space-y-2">
              {section.items.map((item, idx) => (
                <li key={idx}>
                  <NavLink
                    to={item.path}
                    end={item.path === "/seeker/dashboard"}
                    className={({ isActive }) =>
                      `group flex items-center justify-between rounded px-4 py-2 font-medium border transition-all duration-200
                        ${
                          isActive
                            ? "bg-[#FFF7F3] text-[#C84F1F] border-[#F3D3C4] shadow-sm"
                            : "text-[#6F6F76] border-transparent hover:bg-[#F7F5F2] hover:text-[#0A0A0A]"
                        }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-semibold ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom User Card */}
      <div className="border-t border-[#EFE7E1] p-4 space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-[8px] bg-[#F7F5F2]">
          <div className="w-10 h-10 rounded-full bg-[#FFF1E9] flex items-center justify-center font-bold text-[#C84F1F]">
            Y
          </div>
          <div>
            <p className="font-semibold text-sm text-[#0A0A0A]">Yogesh</p>
            <p className="text-xs text-[#6F6F76]">Job Seeker</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-[8px] border border-red-100 bg-red-50 py-3 text-red-600 font-medium hover:bg-red-100 transition"
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
