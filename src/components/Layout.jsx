import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name")
    navigate("/login");
  };

  // Sidebar menu based on role
  const getMenu = () => {
    if (role === "super_admin") {
      return [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Manage Teachers", path: "/teachers" },
        { name: "Manage Students", path: "/students" },
        { name: "Settings", path: "/settings" },
      ];
    } else if (role === "teacher") {
      return [
        { name: "Dashboard", path: "/dashboard" },
        { name: "My Classes", path: "/classes" },
        { name: "Assignments", path: "/assignments" },
        { name: "Profile", path: "/profile" },
      ];
    } else if (role === "student") {
      return [
        { name: "Dashboard", path: "/dashboard" },
        { name: "My Courses", path: "/courses" },
        { name: "Assignments", path: "/assignments" },
        { name: "Profile", path: "/profile" },
      ];
    } else {
      return [{ name: "Dashboard", path: "/dashboard" }];
    }
  };

  const menu = getMenu();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0 p-6">
        <h2 className="text-2xl font-bold mb-6">School App</h2>
        <nav>
          <ul className="space-y-2">
            {menu.map((item) => (
              <li key={item.path}>
                <a href={item.path} style={{ color: "white" }}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="h-16 bg-white shadow-md flex items-center justify-between p-4 flex-shrink-0">
          <span className="font-semibold text-gray-800">Welcome, {name}!</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
