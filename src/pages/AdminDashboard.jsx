import Layout from "../components/Layout";

function AdminDashboard() {
  return (
    <Layout>
      <h2 className="mb-4 text-3xl font-extrabold text-gray-600 dark:text-gray md:text-5xl lg:text-3xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Super Admin</span> Dashboard</h2>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here you can manage teachers, students, etc.</p>
      
      <div className="mb-6">

      </div>
      <a href="/teachers" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Teachers</h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">3</p>
      </a>

    </Layout>
  );
}
export default AdminDashboard;