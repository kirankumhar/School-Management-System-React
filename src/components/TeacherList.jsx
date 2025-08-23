import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateTeacher from "./CreateTeacher"; // import form
import Layout from "./Layout";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/teachers", {
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

  useEffect(() => {
    fetchTeachers();
  }, [token]);

  if (loading) return <p>Loading teachers...</p>;

  return (
    <Layout>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Teachers</h2>

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
                        <th scope="col" class="px-6 py-3">
                            Subject
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                      <tr key={teacher.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {teacher.name}
                        </th>
                        <td class="px-6 py-4">
                            {teacher.email}
                        </td>
                        <td class="px-6 py-4">
                            {teacher.subject}
                        </td>
                        <td class="px-6 py-4">
                            {teacher.phone}
                        </td>
                        <td class="px-6 py-4">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
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
