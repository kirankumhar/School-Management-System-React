import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axios";
import Layout from "./Layout";
import CreateTeacher from "./CreateTeacher";
import EditTeacher from "./EditTeacher";

const BASE_URL = "http://127.0.0.1:8000/storage/";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMode, setCurrentMode] = useState("list"); // 'list', 'create', 'edit'
  const [editingTeacher, setEditingTeacher] = useState(null);
  const token = localStorage.getItem("token");

  const fetchTeachers = async () => {
    try {
      const response = await api.get("/teachers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (teacherId) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await api.delete(`/teachers/${teacherId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchTeachers(); // Re-fetch the list after deletion
        alert("Teacher deleted successfully!");
      } catch (error) {
        console.error("Error deleting teacher:", error);
      }
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [token]);

  if (loading) return <p>Loading teachers...</p>;

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Teachers</h2>
          {currentMode === "list" && (
            <button
              onClick={() => setCurrentMode("create")}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Add New Teacher
            </button>
          )}
        </div>

        {/* --- Conditionally Render Forms --- */}
        {currentMode === "create" && (
          <CreateTeacher
            onSuccess={() => {
              fetchTeachers();
              setCurrentMode("list");
            }}
            onCancel={() => setCurrentMode("list")}
          />
        )}

        {currentMode === "edit" && (
          <EditTeacher
            teacher={editingTeacher}
            onSuccess={() => {
              fetchTeachers();
              setCurrentMode("list");
            }}
            onClose={() => setCurrentMode("list")}
          />
        )}

        {/* --- Teachers List Table --- */}
        {currentMode === "list" && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Picture</th>
                  <th scope="col" className="px-6 py-3">Teacher Name</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Subject</th>
                  <th scope="col" className="px-6 py-3">Phone</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">
                      {teacher.profile_picture && (
                        <img 
                          src={`${BASE_URL}${teacher.profile_picture}`} 
                          alt={teacher.name} 
                          className="w-10 h-10 object-cover rounded-full" 
                        />
                      )}
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <Link to={`/teacher/${teacher.id}`} className="hover:underline">{teacher.name}</Link>
                    </th>
                    <td className="px-6 py-4">{teacher.email}</td>
                    <td className="px-6 py-4">{teacher.subject}</td>
                    <td className="px-6 py-4">{teacher.phone}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => {
                          setEditingTeacher(teacher);
                          setCurrentMode("edit");
                        }}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(teacher.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default TeacherList;