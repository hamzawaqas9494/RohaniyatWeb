import React from "react";

import ProfileDropdown from "../ui/ProfileDropdown";

const Navbar = ({ handleSideBarStatus }) => {
  const toggleSidebar = () => {
    handleSideBarStatus();
  };

  return (
    <nav className="w-full fixed top-0 z-50 bg-[#6C472D]">
      <div className="px-2 md:px-4 min-h-[8vh] sm:min-h-[10vh] flex items-center justify-between">
        <div className="flex items-center">
          <button
            id="toggleSidebar"
            aria-expanded="true"
            aria-controls="sidebar"
            onClick={toggleSidebar}
            className="cursor-pointer rounded lg:p-2 text-[#6C472D] bg-gray-100"
          >
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex items-center text-white">
          <p className="mr-2 text-xl font-semibold font-urdu">
          حافظ محمد عثمان
          </p>
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
