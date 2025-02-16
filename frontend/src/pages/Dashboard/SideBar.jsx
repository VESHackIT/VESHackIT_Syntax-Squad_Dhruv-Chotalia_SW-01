import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ name, email }) => {
  // Extract initials for avatar
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "JD";

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg p-5 flex flex-col z-50">
      <h2 className="text-2xl font-bold text-purple-600 mb-6">Lumina</h2>
      <nav className="space-y-2 flex-grow">
        <Link
          to="/"
          className="flex items-center space-x-3 p-3 rounded-lg bg-purple-100 text-purple-700"
        >
          <i className="fas fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
        <Link
          to="/screening"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-purple-100"
        >
          <i className="fas fa-clipboard-check"></i>
          <span>Screening</span>
        </Link>
        <Link
          to="/wordtrails"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-purple-100"
        >
          <i className="fas fa-book"></i>
          <span>Word Trails</span>
        </Link>
        <Link
          to="/safari"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-purple-100"
        >
          <i className="fas fa-compass"></i>
          <span>Safari</span>
        </Link>
        <Link
          to="/storyweaver"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-purple-100"
        >
          <i className="fas fa-feather"></i>
          <span>Story Weaver</span>
        </Link>
      </nav>

      {/* User Info - positioned at bottom */}
      <div className="mt-auto pt-4 border-t">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center text-sm font-bold mr-3">
            {initials}
          </div>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-gray-500">{email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
