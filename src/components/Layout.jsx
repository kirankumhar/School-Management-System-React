import { useNavigate, useLocation } from "react-router-dom";
import { 
  HomeIcon, 
  AcademicCapIcon, 
  UserGroupIcon, 
  Cog6ToothIcon,
  BookOpenIcon,
  DocumentTextIcon,
  UserIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  // Sidebar menu with icons based on role
  const getMenu = () => {
    if (role === "super_admin") {
      return [
        { name: "Dashboard", path: "/admin/dashboard", icon: HomeIcon },
        { name: "Manage Teachers", path: "/teachers", icon: AcademicCapIcon },
        { name: "Manage Students", path: "/students", icon: UserGroupIcon },
        { name: "Manage Classes", path: "/school-classes", icon: BookOpenIcon },
        { name: "Settings", path: "/settings", icon: Cog6ToothIcon },
      ];
    } else if (role === "teacher") {
      return [
        { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
        { name: "My Classes", path: "/classes", icon: BookOpenIcon },
        { name: "Assignments", path: "/assignments", icon: DocumentTextIcon },
        { name: "Profile", path: "/profile", icon: UserIcon },
      ];
    } else if (role === "student") {
      return [
        { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
        { name: "My Courses", path: "/courses", icon: BookOpenIcon },
        { name: "Assignments", path: "/assignments", icon: DocumentTextIcon },
        { name: "Profile", path: "/profile", icon: UserIcon },
      ];
    } else {
      return [{ name: "Dashboard", path: "/dashboard", icon: HomeIcon }];
    }
  };

  const menu = getMenu();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="flex-shrink-0 w-64 text-white shadow-xl bg-gradient-to-b from-blue-900 to-blue-800">
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg">
              <AcademicCapIcon className="w-6 h-6 text-blue-800" />
            </div>
            <div>
              <h2 className="text-xl font-bold">SchoolApp</h2>
              <p className="text-sm text-blue-200">Management System</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {menu.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-700 text-white shadow-inner"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* <div className="absolute bottom-0 w-full p-4 border-t border-blue-700">
          <div className="flex items-center p-2 mb-4 space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
              <UserIcon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{name}</p>
              <p className="text-xs text-blue-200 capitalize">{role?.replace('_', ' ')}</p>
            </div>
          </div>
        </div> */}
      </aside>

      {/* Main Content */}
      <main className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                {menu.find(item => item.path === location.pathname)?.name || "Dashboard"}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="items-center hidden space-x-2 text-sm text-gray-600 sm:flex">
                <UserIcon className="w-4 h-4" />
                <span className="font-medium">{name}</span>
                <span className="px-2 py-1 text-xs text-blue-800 capitalize bg-blue-100 rounded-full">
                  {role?.replace('_', ' ')}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 space-x-2 text-white transition-colors duration-200 bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <div className="mx-auto max-w-7xl">
            <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
              {children}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-6 py-4 bg-white border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              © 2024 SchoolApp Management System. All rights reserved.
            </p>
            <p className="text-sm text-gray-600">
              v1.0.0
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Layout;