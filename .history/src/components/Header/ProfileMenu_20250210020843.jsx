import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast"; // Ensure you have this library installed

const ProfileMenu = ({ onLogout }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    onLogout(); // Assuming onLogout is passed as a prop for logout functionality
    toast.success("Logout Successfully");
    setIsProfileMenuOpen(false); // Close the menu after logout
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  return (
    <li className="relative" ref={menuRef}>
      <div className="relative">
        <button
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="text-gray-600 dark:text-gray-300 focus:shadow-outline-purple"
        >
          <img
            className="object-cover w-8 h-8 rounded-full focus:shadow-outline-purple"
            src="https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1719878400&semt=sph"
            alt="Profile"
            aria-hidden="true"
          />
        </button>
        {isProfileMenuOpen && (
          <ul
            className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
            aria-label="submenu"
          >
            <li className="flex">
              <div
                onClick={handleLogout}
                className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200 cursor-pointer"
              >
                <svg
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                </svg>
                <span>Log out</span>
              </div>
            </li>
          </ul>
        )}
      </div>
    </li>
  );
};

export default ProfileMenu;
