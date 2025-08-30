import Layout from "../components/Layout";
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

function AdminDashboard() {
  // Mock data - replace with actual data from your API
  const stats = [
    { label: "Total Teachers", value: "24", icon: AcademicCapIcon, change: "+12%", trend: "up", color: "blue" },
    { label: "Total Students", value: "486", icon: UserGroupIcon, change: "+8%", trend: "up", color: "green" },
    { label: "Attendance Rate", value: "94%", icon: ChartBarIcon, change: "+2%", trend: "up", color: "purple" },
    { label: "Pending Tasks", value: "8", icon: ClockIcon, change: "-3", trend: "down", color: "orange" }
  ];

  const recentActivities = [
    { action: "New teacher registered", time: "2 mins ago", user: "Sarah Johnson" },
    { action: "Student attendance marked", time: "15 mins ago", user: "John Doe" },
    { action: "Exam results uploaded", time: "1 hour ago", user: "Math Department" },
    { action: "Fee payment received", time: "2 hours ago", user: "Mike Wilson" }
  ];

  const quickActions = [
    { label: "Add New Teacher", path: "/teachers", icon: AcademicCapIcon, color: "blue" },
    { label: "Manage Students", path: "/students", icon: UserGroupIcon, color: "green" },
    { label: "View Reports", path: "/reports", icon: ChartBarIcon, color: "purple" },
    { label: "Schedule Events", path: "/calendar", icon: CalendarIcon, color: "orange" }
  ];

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h2 className="mb-2 text-3xl font-bold text-gray-900">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Super Admin
          </span> Dashboard
        </h2>
        <p className="text-lg text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: "bg-blue-500",
            green: "bg-green-500",
            purple: "bg-purple-500",
            orange: "bg-orange-500"
          };
          
          return (
            <div key={index} className="p-6 transition-shadow bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last week
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[stat.color]} bg-opacity-10`}>
                  <Icon className={`w-6 h-6 ${colorClasses[stat.color].replace('bg-', 'text-')}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Quick Actions */}
        <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              const colorClasses = {
                blue: "bg-blue-100 text-blue-600 hover:bg-blue-200",
                green: "bg-green-100 text-green-600 hover:bg-green-200",
                purple: "bg-purple-100 text-purple-600 hover:bg-purple-200",
                orange: "bg-orange-100 text-orange-600 hover:bg-orange-200"
              };
              
              return (
                <button
                  key={index}
                  onClick={() => window.location.href = action.path}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${colorClasses[action.color]}`}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium text-center">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="p-6 mt-8 bg-white border border-gray-200 shadow-sm rounded-xl">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Performance Overview</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Attendance Chart (mock) */}
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-700">Attendance Rate</h4>
              <ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div className="h-3 bg-green-500 rounded-full" style={{ width: '94%' }}></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>0%</span>
              <span>94%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Student Growth (mock) */}
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-700">Student Growth</h4>
              <ArrowTrendingUpIcon className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600">+8%</div>
            <p className="text-sm text-gray-600">Since last month</p>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="p-6 mt-8 bg-white border border-gray-200 shadow-sm rounded-xl">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Upcoming Events</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
            <div>
              <p className="font-medium text-blue-900">Annual Sports Day</p>
              <p className="text-sm text-blue-700">Tomorrow • 9:00 AM</p>
            </div>
            <CalendarIcon className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
            <div>
              <p className="font-medium text-green-900">Parent-Teacher Meeting</p>
              <p className="text-sm text-green-700">Dec 20 • 2:00 PM</p>
            </div>
            <CalendarIcon className="w-5 h-5 text-green-500" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;