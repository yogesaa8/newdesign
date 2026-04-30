import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FiSearch,
    FiBell,
    FiMoon,
    FiSun,
    FiChevronDown,
    FiUser,
    FiSettings,
    FiHelpCircle,
    FiLogOut,
    FiMenu,
} from "react-icons/fi";
import { profileData } from "../../../data/mockData";

const Header = ({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    const trigger = useRef(null);
    const dropdown = useRef(null);

    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    return (
        <header className="sticky top-0 z-999 flex w-full bg-white dark:bg-inverse-surface border-b border-outline-variant dark:border-outline-variant/30">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    <button
                        aria-controls="sidebar"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSidebarOpen(!sidebarOpen);
                        }}
                        className="z-99999 block rounded-lg border border-outline-variant bg-white p-1.5 dark:border-outline-variant/30 dark:bg-inverse-surface lg:hidden shadow-sm"
                    >
                        <FiMenu size={20} />
                    </button>
                </div>

                <div className="hidden sm:block">
                    <form action="#" method="POST">
                        <div className="relative">
                            <button className="absolute left-0 top-1/2 -translate-y-1/2">
                                <FiSearch
                                    size={20}
                                    className="text-outline hover:text-primary"
                                />
                            </button>

                            <input
                                type="text"
                                placeholder="Type to search..."
                                className="w-full bg-surface-container-low dark:bg-primary/10 rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 xl:w-125"
                            />

                            <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 text-xs text-outline border border-outline-variant rounded px-1.5 py-0.5 dark:border-outline-variant/30">
                                <span>⌘</span>
                                <span>K</span>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        <li>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant bg-surface-container-low hover:text-primary transition-all dark:border-outline-variant/30 dark:bg-primary/10 dark:text-white shadow-sm"
                            >
                                {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                            </button>
                        </li>

                        <li className="relative">
                            <button
                                onClick={() => setNotifOpen(!notifOpen)}
                                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant bg-surface-container-low hover:text-primary transition-all dark:border-outline-variant/30 dark:bg-primary/10 dark:text-white shadow-sm"
                            >
                                <span className="absolute top-0 right-0 z-1 h-2 w-2 rounded-full bg-error">
                                    <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-error opacity-75"></span>
                                </span>
                                <FiBell size={18} />
                            </button>
                        </li>
                    </ul>

                    <div className="relative">
                        <button
                            ref={trigger}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-4"
                        >
                            <span className="hidden text-right lg:block">
                                <span className="block text-sm font-medium text-on-surface dark:text-white">
                                    {profileData.name}
                                </span>
                                <span className="block text-xs font-medium text-outline">
                                    {profileData.position}
                                </span>
                            </span>

                            <span className="h-12 w-12 rounded-full overflow-hidden">
                                <img
                                    src={profileData.avatar}
                                    alt="User"
                                    className="h-full w-full object-cover"
                                />
                            </span>

                            <FiChevronDown
                                size={18}
                                className={`hidden fill-current sm:block ${dropdownOpen && "rotate-180"}`}
                            />
                        </button>

                        <div
                            ref={dropdown}
                            onFocus={() => setDropdownOpen(true)}
                            onBlur={() => setDropdownOpen(false)}
                            className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-2xl border border-outline-variant bg-white shadow-2xl dark:border-outline-variant/30 dark:bg-inverse-surface overflow-hidden ${dropdownOpen === true ? "block" : "hidden"
                                }`}
                        >
                            <div className="border-b border-outline-variant px-6 py-4.5 dark:border-outline-variant/30">
                                <h4 className="font-medium text-on-surface dark:text-white truncate">
                                    {profileData.name}
                                </h4>
                                <p className="text-xs text-outline truncate">
                                    {profileData.email}
                                </p>
                            </div>
                            <ul className="flex flex-col gap-5 border-b border-outline-variant px-6 py-7.5 dark:border-outline-variant/30">
                                <li>
                                    <Link
                                        to="/dashboard/profile"
                                        className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                                    >
                                        <FiUser size={22} />
                                        My Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/settings"
                                        className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                                    >
                                        <FiSettings size={22} />
                                        Account Settings
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/support"
                                        className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                                    >
                                        <FiHelpCircle size={22} />
                                        Support
                                    </Link>
                                </li>
                            </ul>
                            <Link
                                to="/"
                                className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                            >
                                <FiLogOut size={22} />
                                Sign Out
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
