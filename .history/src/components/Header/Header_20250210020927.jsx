import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import NotificationMenu from "./NotificationMenu";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle Sidebar
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Close sidebar on Escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <>
      <header className="z-10 py-4 bg-white border-b dark:bg-gray-800">
        <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
          <button
            className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
            onClick={handleToggleSidebar}
          >
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 5h12a1 1 0 110 2H3a1 1 0 110-2zM3 10h12a1 1 0 110 2H3a1 1 0 110-2zM3 15h12a1 1 0 110 2H3a1 1 0 110-2z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          <div className="flex justify-center flex-1 lg:mr-32">
            <input
              className="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:shadow-outline-purple form-input"
              type="text"
              placeholder="Search for projects"
              aria-label="Search"
            />
          </div>

          <ul className="flex items-center flex-shrink-0 space-x-6">
            <NotificationMenu />
            <ProfileMenu onLogout={handleLogout} />
          </ul>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed inset-0 z-50 flex transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={handleToggleSidebar}
      >
        <div className="w-64 bg-white dark:bg-gray-800 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="py-4 text-gray-500 dark:text-gray-400">
            <Link className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" to="/dashboard">
              ইন্সপায়ার্ড আইটি
            </Link>
            <ul className="mt-6">
              <li className="relative px-2 py-3">
                <NavLink
                  className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 dark:hover:text-gray-200 dark:text-gray-100 p-3"
                  to="/dashboard"
                  activeClassName="bg-purple-600 text-white"
                >
                  <span className="ml-4">আমার কোর্স</span>
                </NavLink>
              </li>
              <li className="relative px-2 py-3">
                <NavLink
                  className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 dark:hover:text-gray-200 p-3"
                  to="/dashboard/performances"
                  activeClassName="bg-purple-600 text-white"
                >
                  <span className="ml-4">পারফর্মেন্স</span>
                </NavLink>
              </li>
              <li className="relative px-2 py-3">
                <button
                  className="w-full text-left text-sm font-semibold p-3 text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1 w-fit dark:text-white h-[10px] transition-transform duration-300 ease-in-out" onClick={handleToggleSidebar}>
          <X size={40} className="rounded-2xl mt-6 ml-2 transform transition-transform duration-300 ease-in-out hover:scale-110" />
        </div>
      </aside>
    </>
  );
};

export default Header;
