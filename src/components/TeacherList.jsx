import { useEffect, useState } from "react";
import api from "../axios";
import Layout from "./Layout";
import { Link } from "react-router-dom";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const token = localStorage.getItem("token");
  const fetchTeachers = async () => {
        try {
            const response = await api.get('/teachers');
            setTeachers(response.data.data || response.data); // Handle both formats
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

  const handleDelete = async(id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;
    try {
      await api.delete(`/teachers/${id}`);
      alert("Teacher deleted successfully!");
      fetchTeachers(); // refresh list
    } catch (error) {
      console.error("Error deleting teacher:", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [token]);

  return (
    <Layout>
      <div className="p-4">
        <h2 className="mb-4 text-xl font-bold">Teachers</h2>
        <Link 
          to="/teachers/create"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            + Add Teacher
        </Link>
        <div>
            <br />
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                    Teacher name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Subject
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {teacher.name}
                  </th>
                  <td className="px-6 py-4">
                      {teacher.email}
                  </td>
                  <td className="px-6 py-4">
                      {teacher.subject}
                  </td>
                  <td className="px-6 py-4">
                      {teacher.phone}
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/teachers/${teacher.id}/edit`}
                    className="mr-3 text-blue-600 hover:underline">
                      Edit
                    </Link>
                      
                      <button onClick={() => handleDelete(teacher.id)} className="px-3 py-1 mr-3 text-white bg-red-600 rounded">Delete</button>
                      <Link to={`/teachers/${teacher.id}`}
                      className="px-3 py-1 text-white bg-green-600 rounded">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default TeacherList;
