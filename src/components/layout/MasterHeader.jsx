import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FiBell,
  FiChevronDown,
  FiHelpCircle,
  FiLogOut,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { getRoleHomePath, normalizeRole } from "../../lib/authRoutes";
import { useAuthStore } from "../../store";

const pickFirst = (...values) =>
  values.find((value) => typeof value === "string" && value.trim())?.trim();

const pickName = (...values) =>
  values
    .find(
      (value) =>
        typeof value === "string" && value.trim() && !value.trim().includes("@"),
    )
    ?.trim();

const navItems = [
  { name: "Jobs", link: "/jobs", roles: ["public", "seeker"] },
  { name: "Resume", link: "/resume", roles: ["public", "seeker"] },
  {
    name: "Services",
    roles: ["public", "seeker", "company", "college"],
    children: [
      { name: "Company", link: "/company/login", roles: ["public"] },
      { name: "Institute", link: "/institute", roles: ["public"] },
      { name: "College", link: "/college", roles: ["public", "college"] },
      { name: "Career GPS", link: "/career-gps", roles: ["public", "seeker"] },
      { name: "Ebook", link: "/e-book", roles: ["public", "seeker"] },
      { name: "Employer dashboard", link: "/company/dashboard", roles: ["company"] },
      { name: "Post job", link: "/company/jobs/new", roles: ["company"] },
    ],
  },
  { name: "Feedback", link: "/reviews", roles: ["public"] },
  { name: "Dashboard", link: "/company/dashboard", roles: ["company"] },
  { name: "Jobs", link: "/company/jobs", roles: ["company"] },
];

const roleDropdownItems = {
  seeker: [
    { label: "My Profile", to: "/seeker/dashboard/profile", icon: FiUser },
    { label: "Account Settings", to: "/seeker/dashboard/settings", icon: FiSettings },
    { label: "Support", to: "/seeker/dashboard/support", icon: FiHelpCircle },
  ],
  company: [
    { label: "Company profile", to: "/company/profile", icon: FiUser },
    { label: "Settings", to: "/company/settings/security", icon: FiSettings },
  ],
  college: [{ label: "College page", to: "/college", icon: FiUser }],
};

const profileAccent = {
  company: "bg-co-surface text-co-primary",
  college: "bg-co-surface text-co-primary",
  seeker: "bg-sk-surface text-sk-primary",
};

const profileFallbackName = {
  college: "College",
  company: "Company",
  seeker: "Job Seeker",
};

const getProfile = (user, role) => {
  const profile = user?.profile ?? {};
  const company = user?.company ?? {};
  const normalizedRole = normalizeRole(role);

  if (normalizedRole === "company") {
    const recruiterName = pickName(
      [user?.first_name, user?.last_name].filter(Boolean).join(" "),
      [profile?.first_name, profile?.last_name].filter(Boolean).join(" "),
      profile?.full_name,
      profile?.name,
      user?.full_name,
      user?.name,
      company?.contact_person,
    );
    const name = pickFirst(
      recruiterName,
      company?.company_name,
      company?.companyName,
      company?.name,
      user?.company_name,
      user?.companyName,
      profile?.company_name,
      profile?.companyName,
      user?.email,
      "Company",
    );

    return {
      name,
      email: pickFirst(user?.email, company?.email, profile?.email, ""),
      subtitle: pickFirst(
        user?.designation,
        user?.position,
        user?.contact_designation,
        company?.contact_designation,
        profile?.designation,
        "Recruiter",
      ),
      avatar: pickFirst(
        company?.logo,
        company?.logo_url,
        company?.logoUrl,
        user?.logo,
        user?.logo_url,
        user?.avatar,
        user?.avatar_url,
        user?.profile_picture,
        profile?.logo,
        profile?.avatar,
        profile?.profile_picture,
      ),
      initial: name.charAt(0).toUpperCase(),
    };
  }

  const name = pickFirst(
    user?.name,
    user?.full_name,
    user?.fullName,
    user?.instituteName,
    profile?.name,
    profile?.full_name,
    profile?.fullName,
    user?.email,
    profileFallbackName[normalizedRole] || "User",
  );

  return {
    name,
    email: pickFirst(user?.email, profile?.email, ""),
    subtitle: pickFirst(
      user?.position,
      user?.designation,
      profile?.position,
      profile?.designation,
      profile?.headline,
      normalizedRole
        ? normalizedRole.charAt(0).toUpperCase() + normalizedRole.slice(1)
        : "User",
    ),
    avatar: pickFirst(
      user?.avatar,
      user?.avatar_url,
      user?.profile_picture,
      user?.profilePicture,
      profile?.avatar,
      profile?.avatar_url,
      profile?.profile_picture,
      profile?.profilePicture,
    ),
    initial: name.charAt(0).toUpperCase(),
  };
};

const getNavItems = (role, isAuthenticated) => {
  const currentRole = isAuthenticated ? normalizeRole(role) : "public";

  return navItems
    .map((item) => {
      if (!item.roles.includes(currentRole)) return null;
      if (!item.children) return item;

      const children = item.children.filter((child) =>
        child.roles.includes(currentRole),
      );

      return children.length ? { ...item, children } : null;
    })
    .filter(Boolean);
};

const isActivePath = (pathname, link) => {
  if (!link || link === "#") return false;
  if (link === "/") return pathname === "/";
  return pathname === link || pathname.startsWith(`${link}/`);
};

const ArrowIcon = () => (
  <svg
    width="12"
    height="10"
    viewBox="0 0 12 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M.6 4.602h10m-4-4 4 4-4 4"
      stroke="#3f3f47"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GetStartedButton = ({ onClick }) => (
  <Link
    to="/seeker/signup"
    onClick={onClick}
    className="hidden items-center gap-2.5 rounded-full border-0 bg-linear-to-r from-n-900 to-n-500 py-2 pl-5 pr-2 text-sm font-medium text-n-50 transition hover:text-n-200 md:flex"
  >
    Get started
    <span className="flex size-7 items-center justify-center rounded-full bg-white">
      <ArrowIcon />
    </span>
  </Link>
);

const MobileGetStartedButton = ({ onClick }) => (
  <Link
    to="/seeker/signup"
    onClick={onClick}
    className="mt-3 flex w-fit items-center justify-center gap-2.5 rounded-full border-0 bg-linear-to-r from-n-900 to-n-500 px-5 py-2.5 text-sm font-medium text-n-50"
  >
    Get started
    <span className="flex size-7 items-center justify-center rounded-full bg-white">
      <ArrowIcon />
    </span>
  </Link>
);

const HeaderActions = ({ compact = false, onNavigate }) => {
  const navigate = useNavigate();
  const { user, role, isAuthenticated, isInitializing, logout } = useAuthStore();
  const normalizedRole = normalizeRole(role);
  const profile = getProfile(user, normalizedRole);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const close = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }

      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = async () => {
    setProfileOpen(false);
    onNavigate?.();
    await logout();
    navigate("/", { replace: true });
  };

  if (isInitializing) {
    return <div className="h-10 w-28 rounded-full bg-n-100" />;
  }

  if (!isAuthenticated) {
    return compact ? (
      <MobileGetStartedButton onClick={onNavigate} />
    ) : (
      <GetStartedButton onClick={onNavigate} />
    );
  }

  const dropdownItems = roleDropdownItems[normalizedRole] || [
    { label: "Dashboard", to: getRoleHomePath(normalizedRole), icon: FiUser },
  ];
  const showNotifications = normalizedRole === "seeker";

  return (
    <div className={compact ? "flex w-full flex-col gap-3" : "flex items-center gap-2"}>
      {showNotifications && !compact && (
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotifOpen((value) => !value)}
            className="relative flex size-10 items-center justify-center rounded-full border border-n-200 bg-white text-n-800 transition hover:bg-n-50"
            aria-label="Notifications"
          >
            <FiBell size={18} />
            <span className="absolute right-2 top-2 size-2.5 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 z-50 mt-3 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-n-200 bg-white shadow-xl">
              <div className="border-b border-n-100 px-5 py-4">
                <h4 className="font-semibold text-n-900">Notifications</h4>
              </div>
              <div className="space-y-3 p-4">
                <div className="rounded-xl bg-n-50 p-3">
                  <p className="text-sm font-medium text-n-900">
                    New job alert matched your profile
                  </p>
                  <span className="text-xs text-n-500">2 min ago</span>
                </div>
                <div className="rounded-xl bg-n-50 p-3">
                  <p className="text-sm font-medium text-n-900">
                    Recruiter viewed your profile
                  </p>
                  <span className="text-xs text-n-500">1 hour ago</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="relative" ref={profileRef}>
        <button
          type="button"
          onClick={() => setProfileOpen((value) => !value)}
          className="flex w-full items-center gap-2.5 rounded-full border border-n-200 bg-white py-1.5 pl-3 pr-1.5 text-left transition hover:bg-n-50 md:w-auto"
        >
          <div className="hidden min-w-0 lg:block">
            <p className="max-w-36 truncate text-sm font-semibold text-n-900">
              {profile.name}
            </p>
            <p className="text-xs text-n-500">{profile.subtitle}</p>
          </div>
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="size-8 rounded-full object-cover"
            />
          ) : (
            <span
              className={`flex size-8 items-center justify-center rounded-full text-xs font-bold ${
                profileAccent[normalizedRole] || profileAccent.seeker
              }`}
            >
              {profile.initial}
            </span>
          )}
        </button>

        {profileOpen && (
          <div className="absolute right-0 z-50 mt-3 w-[min(18rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-n-200 bg-white shadow-xl">
            <div className="border-b border-n-100 px-5 py-4">
              <h4 className="font-semibold text-n-900">{profile.name}</h4>
              {profile.email && (
                <p className="truncate text-sm text-n-500">{profile.email}</p>
              )}
            </div>

            <div className="space-y-1 p-3">
              {dropdownItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => {
                      setProfileOpen(false);
                      onNavigate?.();
                    }}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-n-500 hover:bg-n-50 hover:text-n-900"
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="border-t border-n-100 p-3">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <FiLogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DesktopNav = ({ items, pathname }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const close = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div
      ref={menuRef}
      className="hidden items-center gap-2 rounded-full border border-n-200 bg-n-50 px-1 py-1 md:flex"
    >
      {items.map((item) => {
        const childActive = item.children?.some((child) =>
          isActivePath(pathname, child.link),
        );
        const active = isActivePath(pathname, item.link) || childActive;

        if (item.children) {
          return (
            <div key={item.name} className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenMenu((current) => (current === item.name ? null : item.name))
                }
                className={`flex items-center gap-1 rounded-full px-4 py-1.5 text-sm transition-colors ${
                  active
                    ? "border border-n-200 bg-white font-medium text-n-800 hover:text-n-500"
                    : "text-n-500 hover:text-n-400"
                }`}
              >
                {item.name}
                <FiChevronDown
                  size={14}
                  className={`transition ${openMenu === item.name ? "rotate-180" : ""}`}
                />
              </button>

              {openMenu === item.name && (
                <div className="absolute left-1/2 z-50 mt-3 w-52 -translate-x-1/2 overflow-hidden rounded-2xl border border-n-200 bg-white p-1 shadow-xl">
                  {item.children.map((child) => (
                    <Link
                      key={child.link}
                      to={child.link}
                      onClick={() => setOpenMenu(null)}
                      className={`block rounded-xl px-4 py-2.5 text-sm transition ${
                        isActivePath(pathname, child.link)
                          ? "bg-n-50 font-medium text-n-800"
                          : "text-n-500 hover:bg-n-50 hover:text-n-800"
                      }`}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        }

        return (
          <NavLink
            key={item.link}
            to={item.link}
            className={({ isActive }) =>
              `rounded-full px-4 py-1.5 text-sm transition-colors ${
                isActive || active
                  ? "border border-n-200 bg-white font-medium text-n-800 hover:text-n-500"
                  : "text-n-500 hover:text-n-400"
              }`
            }
          >
            {item.name}
          </NavLink>
        );
      })}
    </div>
  );
};

const MobileMenu = ({
  items,
  pathname,
  open,
  onNavigate,
  onSidebarToggle,
  showSidebarToggle,
}) => {
  if (!open) return null;

  return (
    <div className="absolute left-0 top-full z-50 flex w-full flex-col gap-1 border-t border-n-200 bg-white p-5 md:hidden">
      {showSidebarToggle && (
        <button
          type="button"
          onClick={() => {
            onSidebarToggle?.();
            onNavigate();
          }}
          className="rounded-lg px-4 py-2.5 text-left text-sm font-medium text-n-800 hover:bg-n-50"
        >
          Dashboard menu
        </button>
      )}

      {items.map((item) => {
        const childActive = item.children?.some((child) =>
          isActivePath(pathname, child.link),
        );
        const active = isActivePath(pathname, item.link) || childActive;

        if (item.children) {
          return (
            <div key={item.name} className="flex flex-col gap-1">
              <span
                className={`rounded-lg px-4 py-2.5 text-sm ${
                  active
                    ? "bg-n-50 font-medium text-n-800"
                    : "font-medium text-n-500"
                }`}
              >
                {item.name}
              </span>
              <div className="flex flex-col gap-1 pl-4">
                {item.children.map((child) => (
                  <Link
                    key={child.link}
                    to={child.link}
                    onClick={onNavigate}
                    className={`rounded-lg px-4 py-2.5 text-sm ${
                      isActivePath(pathname, child.link)
                        ? "bg-n-50 font-medium text-n-800"
                        : "text-n-500 hover:bg-n-50"
                    }`}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            </div>
          );
        }

        return (
          <Link
            key={item.link}
            to={item.link}
            onClick={onNavigate}
            className={`rounded-lg px-4 py-2.5 text-sm ${
              active
                ? "bg-n-50 font-medium text-n-800"
                : "text-n-500 hover:bg-n-50"
            }`}
          >
            {item.name}
          </Link>
        );
      })}

      <HeaderActions compact onNavigate={onNavigate} />
    </div>
  );
};

const MasterHeader = ({
  sidebarOpen = false,
  onSidebarToggle,
  showSidebarToggle = false,
}) => {
  const { isAuthenticated, role } = useAuthStore();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const items = getNavItems(role, isAuthenticated);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between bg-white px-4 py-4 md:px-12 lg:px-24 xl:px-40">
      <Link
        to="/"
        onClick={closeMenu}
        className="flex shrink-0 items-center gap-2"
        aria-label="FirstJobIndia home"
      >
        <img
          src="/images/logos/fji_orange.png"
          alt="FirstJobIndia"
          className="size-8 object-contain"
        />
        <span className="hidden text-sm font-medium text-n-900 sm:inline">
          <span>First</span>
          <span className="text-sk-primary">Job</span>
          <span>India</span>
        </span>
      </Link>

      <DesktopNav items={items} pathname={pathname} />

      <div className="hidden md:block">
        <HeaderActions />
      </div>

      <button
        type="button"
        onClick={() => setMenuOpen((value) => !value)}
        className="flex cursor-pointer flex-col gap-1.5 border-0 bg-transparent p-1 md:hidden"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <span
          className={`block h-0.5 w-6 bg-n-800 transition-transform ${
            menuOpen ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-n-800 transition-opacity ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-n-800 transition-transform ${
            menuOpen ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      <MobileMenu
        items={items}
        pathname={pathname}
        open={menuOpen}
        onNavigate={closeMenu}
        onSidebarToggle={onSidebarToggle}
        showSidebarToggle={showSidebarToggle && !sidebarOpen}
      />
    </nav>
  );
};

export default MasterHeader;
