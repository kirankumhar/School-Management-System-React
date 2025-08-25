import React, { useEffect, useState } from "react";
import api from "../axios";
import CreateTeacher from "./CreateTeacher";
import EditTeacher from './EditTeacher';
import Layout from "./Layout";
import { Link } from "react-router-dom";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const token = localStorage.getItem("token");

  const fetchTeachers = async () => {
    try {
      const response = await api.get("/teachers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          search,
          page,
        },
      });
      setTeachers(response.data.data);
      setLastPage(response.data.last_page);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
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

  if (loading) return <p>Loading teachers...</p>;

  return (
    <Layout>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Teachers</h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search teacher..."
          className="border p-2 rounded mb-4"
        />

        {/* Create Teacher form */}
        <CreateTeacher onSuccess={fetchTeachers} />

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                      <tr key={teacher.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
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
                            <button className="font-medium mr-3 text-blue-600 dark:text-blue-500 hover:underline" onClick={() => setEditingTeacher(teacher)}>Edit</button>
                            <button onClick={() => handleDelete(teacher.id)} className="bg-red-600 text-white px-3 py-1 mr-3 rounded">Delete</button>
                            <Link to={`/teachers/${teacher.id}`}
                            className="bg-green-600 text-white px-3 py-1 rounded">View</Link>
                        </td>

                      </tr>
                  ))}
                </tbody>
            </table>

            <div className="flex gap-2 mt-4">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Prev
              </button>
              <span>Page {page} of {lastPage}</span>
              <button
                disabled={page === lastPage}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Next
              </button>
            </div>

            {editingTeacher && (
              <EditTeacher teacher ={editingTeacher} onClose={() => setEditingTeacher(null)} onSuccess={fetchTeachers} />
            )}
        </div>
      </div>

      
    </Layout>
  );
}

export default TeacherList;
