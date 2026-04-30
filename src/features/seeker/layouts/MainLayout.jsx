import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import useLocalStorage from '../../../hooks/useLocalStorage';

const MainLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);
    return (
        <div className="bg-surface dark:bg-inverse-surface dark:text-on-surface-variant min-h-screen">
            <div className="flex h-screen overflow-hidden">
                {/* <!-- Sidebar --> */}
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* <!-- Content Area --> */}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    {/* <!-- Header --> */}
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    />

                    {/* <!-- Main Content --> */}
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default MainLayout
