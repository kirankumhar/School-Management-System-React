import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SchoolClassList from "./components/SchoolClassList";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentDetails from "./components/StudentDetails";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDetail from "./components/Teacherdetail";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherList from "./components/TeacherList";
import StudentList from "./components/StudentList";
import EditStudent from "./components/EditStudent";
import AddStudent from "./components/AddStudent";
import AddSchoolClass from "./components/AddSchoolClass";
import AddTeacher from "./components/AddTeacher";
import EditTeacher from"./components/EditTeacher";
import SchoolClassDetail from "./components/SchoolClassDetail";
import EditSchoolClass from "./components/EditSchoolClass";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Fallback general dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["super_admin","teacher","student"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["super_admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teachers"
          element={
            <ProtectedRoute allowedRoles={["super_admin"]}>
              <TeacherList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teachers/create"
          element={
            <ProtectedRoute allowedRoles={["super_admin"]}>
              <AddTeacher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teachers/:id" 
          element={
            <TeacherDetail />
          }
          />

          <Route 
            path="teachers/:id/edit"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <EditTeacher />
              </ProtectedRoute>
            }
          />

          <Route
            path="/Students"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <StudentList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/students/create"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <AddStudent />
              </ProtectedRoute>
            }
          />

          <Route 
          path="/students/:id"
          element={
            <ProtectedRoute allowedRoles={["super_admin"]}>
              <StudentDetails />
            </ProtectedRoute>
          }
          />

          <Route 
            path="/students/:id/edit"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <EditStudent></EditStudent>
              </ProtectedRoute>
            }
          />

          <Route
            path="/school-classes"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <SchoolClassList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/school-classes/created"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <AddSchoolClass />
              </ProtectedRoute>
            }
          />

          <Route 
          path="/school-classes/:id"
          element = {
            <ProtectedRoute allowedRoles={["super_admin"]}>
              <SchoolClassDetail />
            </ProtectedRoute>
          }
          />

          <Route
          path="/School-classes/:id/edit"
          element = {
            <ProtectedRoute allowedRoles={["super_admin"]}>
              <EditSchoolClass />
            </ProtectedRoute>
          }
          />

      </Routes>
    </Router>
  );
}

export default App;