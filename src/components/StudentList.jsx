import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axios";
import Layout from "./Layout";

const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await api.get('/students');
            setStudents(response.data.data || response.data); // Handle both formats
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await api.delete(`/students/${id}`);
                alert('Student deleted successfully!');
                fetchStudents(); // Refresh the list
            } catch (error) {
                console.error('Error deleting student:', error);
                alert('Error deleting student.');
            }
        }
    };

    return (
        <Layout>
            <div className="p-4">
                <h2 className="mb-4 text-xl font-bold">Students</h2>
                <Link 
                    to="/students/create" 
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    + Add New Student
                </Link>
                <div>
                    <br />
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Student Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Class
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Section
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Roll Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <tr key={student.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {student.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {student.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {student.class || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {student.section || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {student.roll_number}
                                        </td>
                                        <td className="px-6 py-4">
                                            {student.phone || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to={`/students/${student.id}`}>
                                                <button className="mr-2 text-green-600 hover:underline">View</button>
                                            </Link>
                                            
                                            <Link 
                                                to={`/students/${student.id}/edit`}
                                                className="mr-3 text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(student.id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-4 text-center">
                                        No students found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};
export default StudentList;