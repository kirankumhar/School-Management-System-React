import React, { useEffect, useState } from "react";
import axios from "axios";

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
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

    fetchTeachers();
  }, [token]);

  if (loading) return <p>Loading teachers...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Teachers</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td className="border px-4 py-2">{teacher.id}</td>
              <td className="border px-4 py-2">{teacher.name}</td>
              <td className="border px-4 py-2">{teacher.email}</td>
              <td className="border px-4 py-2">{teacher.subject}</td>
              <td className="border px-4 py-2">{teacher.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherList;