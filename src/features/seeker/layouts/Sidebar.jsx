import { useState } from 'react';
import { FiBell, FiBookmark, FiBriefcase, FiClock, FiFilePlus, FiHelpCircle, FiLayout, FiLogOut, FiMessageCircle, FiSettings, FiUser, FiX } from 'react-icons/fi';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';


const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pathname } = location;

    const [openMenus, setOpenMenus] = useState({
        dashboard: true,
        jobs: false,
        forms: false,
        tables: false,
        pages: false,
        support: false,
        others: false,
    });

    const toggleMenu = (menu) => {
        setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
    };

    const navItems = [
        {
            title: 'MENU',
            items: [
                {
                    name: 'Dashboard',
                    icon: <FiLayout size={20} />,
                    path: '/dashboard',
                },
                {
                    name: 'My Profile',
                    icon: <FiUser size={20} />,
                    path: '/dashboard/profile',
                },
                {
                    name: 'Job Applications',
                    icon: <FiBriefcase size={20} />,
                    path: '/dashboard/applications',
                    badge: 'NEW',
                    badgeColor: 'bg-primary-container'
                },
                {
                    name: 'Saved Jobs',
                    icon: <FiBookmark size={20} />,
                    path: '/dashboard/saved',
                },
                {
                    name: 'Job Alerts',
                    icon: <FiBell size={20} />,
                    path: '/dashboard/alerts',
                },
                {
                    name: 'Interviews',
                    icon: <FiClock size={20} />,
                    path: '/dashboard/interviews',
                },
            ]
        },
        {
            title: 'COMMUNICATION',
            items: [
                {
                    name: 'Messages',
                    icon: <FiMessageCircle size={20} />,
                    path: '/dashboard/messages',
                    badge: '5',
                    badgeColor: 'bg-primary'
                },
                {
                    name: 'Documents',
                    icon: <FiFilePlus size={20} />,
                    path: '/dashboard/documents',
                }
            ]
        },
        {
            title: 'SUPPORT',
            items: [
                {
                    name: 'Support Ticket',
                    icon: <FiHelpCircle size={20} />,
                    path: '/dashboard/support',
                    badge: 'NEW',
                    badgeColor: 'bg-primary-container'
                },
                {
                    name: 'Account Settings',
                    icon: <FiSettings size={20} />,
                    path: '/dashboard/settings',
                }
            ]
        }
    ];

    const activeLink = "group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-primary duration-300 ease-in-out bg-primary/5 dark:bg-primary/20";
    const inactiveLink = "group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-outline duration-300 ease-in-out hover:bg-primary/5 dark:hover:bg-primary/10 hover:text-primary";

    return (
        <aside
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white dark:bg-inverse-surface border-r border-outline-variant dark:border-outline-variant/30 duration-300 ease-linear lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <NavLink to="/dashboard" className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded-lg">
                        <FiBriefcase className="text-white" size={24} />
                    </div>
                    <span className="text-on-surface dark:text-white text-2xl font-bold tracking-tight">JobPortal</span>
                </NavLink>

                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    className="block lg:hidden"
                >
                    <FiX size={20} className="" />
                </button>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                    {navItems.map((category, index) => (
                        <div key={index}>
                            <h3 className="mb-4 ml-4 text-sm font-semibold text-outline">
                                {category.title}
                            </h3>

                            <ul className="mb-6 flex flex-col gap-1.5">
                                {category.items.map((item, itemIdx) => (
                                    <li key={itemIdx}>
                                        {item.hasSub ? (
                                            <div>
                                                <button
                                                    className={`group relative flex w-full items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:bg-surface-container dark:hover:bg-on-surface-variant/20`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        toggleMenu(item.key);
                                                    }}
                                                >
                                                    {item.icon}
                                                    {item.name}
                                                </button>
                                            </div>
                                        ) : (
                                            <NavLink
                                                to={item.path}
                                                end={item.path === '/dashboard'}
                                                className={({ isActive }) =>
                                                    isActive ? activeLink : inactiveLink
                                                }
                                            >
                                                {item.icon}
                                                {item.name}
                                                {item.badge && (
                                                    <span className={`absolute right-4 top-1/2 -translate-y-1/2 rounded-full py-1 px-2 text-xs font-medium text-white ${item.badgeColor}`}>
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </NavLink>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="mt-10 mb-10">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2.5 py-2 px-4 font-medium text-outline duration-300 ease-in-out hover:text-error w-full"
                        >
                            <FiLogOut size={20} />
                            Logout
                        </button>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
