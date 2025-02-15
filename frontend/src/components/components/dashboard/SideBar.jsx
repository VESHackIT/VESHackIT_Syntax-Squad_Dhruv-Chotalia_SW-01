import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-white shadow-lg p-5 flex flex-col">
      <h2 className="text-2xl font-bold text-purple-600 mb-6">Lumina</h2>
      <nav className="space-y-2">
        <Link
          to="/"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-purple-200"
        >
          <i className="fas fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
        <Link
          to="/screening"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-purple-200"
        >
          <i className="fas fa-clipboard-check"></i>
          <span>Screening</span>
        </Link>
        <Link
          to="/wordtrails"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-purple-200"
        >
          <i className="fas fa-book"></i>
          <span>Word Trails</span>
        </Link>
        <Link
          to="/safari"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-purple-200"
        >
          <i className="fas fa-compass"></i>
          <span>Safari</span>
        </Link>
        <Link
          to="/storyweaver"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-purple-200"
        >
          <i className="fas fa-feather"></i>
          <span>Story Weaver</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
