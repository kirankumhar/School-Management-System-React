import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // store this at login

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
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
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#2c3e50",
          color: "#ecf0f1",
          padding: "20px",
        }}
      >
        <h2>School App</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {menu.map((item) => (
            <li key={item.path}>
              <a href={item.path} style={{ color: "white" }}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Topbar */}
        <div
          style={{
            height: "60px",
            background: "#34495e",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 20px",
          }}
        >
          <button onClick={handleLogout} style={{ padding: "6px 12px" }}>
            Logout
          </button>
        </div>

        {/* Page Content */}
        <div style={{ flex: 1, padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
