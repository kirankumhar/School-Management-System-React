import { useNavigate, useParams, Link } from "react-router-dom";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import api from "../axios";

const StudentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await api.get(`/students/${id}`);
                setStudent(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching student:', error);
                setError('Failed to load student details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchStudent();
        }
    }, [id]); // Fixed: Only id as dependency

    const handleDelete = async () => {
        if(!window.confirm("Are you sure you want to delete this student?")) return;

        try {
            await api.delete(`/students/${id}`);
            alert('Student deleted successfully');
            navigate(`/students`);
        } catch (error) {
            console.error("Error deleting student:", error);
            alert('Error deleting student. Please try again')
            
        }
    };

    
    if (loading) return (
        <Layout>
            <div className="p-4">
                <div className="flex items-center justify-center h-64">
                    <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                </div>
            </div>
        </Layout>
    );

    if (error) return (
        <Layout>
            <div className="p-4">
                <div className="px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded">
                    {error}
                </div>
                <button 
                    onClick={() => navigate('/students')}
                    className="px-4 py-2 mt-4 text-white bg-gray-500 rounded hover:bg-gray-600"
                >
                    Back to Students
                </button>
            </div>
        </Layout>
    );

    if (!student) return (
        <Layout>
            <div className="p-4">
                <div className="px-4 py-3 text-yellow-700 bg-yellow-100 border border-yellow-400 rounded">
                    Student not found
                </div>
            </div>
        </Layout>
    );
     
    return(
        <Layout>
            <div className="max-w-4xl p-4 mx-auto">
                {/* Header with Back Button */}
                <div className="flex items-center justify-between mb-6">
                    <button 
                        onClick={() => navigate('/students')}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                        ← Back to Students
                    </button>
                    <div className="flex space-x-2">
                        <Link
                            to={`/students/${id}/edit`}
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            Edit Student
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                        >
                            Delete Student
                        </button>
                    </div>
                </div>

                {/* Student Profile Card */}
                <div className="overflow-hidden bg-white rounded-lg shadow-md">
                    {/* Profile Header */}
                    <div className="p-6 text-white bg-gradient-to-r from-blue-500 to-blue-600">
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                {student.profile_image ? (
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${student.profile_image}`}
                                        alt={student.name}
                                        className="object-cover w-24 h-24 border-4 border-white rounded-full"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-24 h-24 bg-gray-300 border-4 border-white rounded-full">
                                        <span className="text-2xl font-bold text-gray-600">
                                            {student.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">{student.name}</h1>
                                <p className="text-blue-100">{student.email}</p>
                                <p className="text-blue-100">Roll Number: {student.roll_number}</p>
                            </div>
                        </div>
                    </div>

                    {/* Student Details */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Personal Information */}
                            <div>
                                <h2 className="mb-4 text-lg font-semibold text-gray-700">Personal Information</h2>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Full Name</label>
                                        <p className="text-gray-900">{student.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Email</label>
                                        <p className="text-gray-900">{student.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Phone</label>
                                        <p className="text-gray-900">{student.phone || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                                        <p className="text-gray-900">
                                            {new Date(student.date_of_birth).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Academic Information */}
                            <div>
                                <h2 className="mb-4 text-lg font-semibold text-gray-700">Academic Information</h2>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Roll Number</label>
                                        <p className="text-gray-900">{student.roll_number}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Class</label>
                                        <p className="text-gray-900">{student.class || 'Not assigned'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Section</label>
                                        <p className="text-gray-900">{student.section || 'Not assigned'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Student ID</label>
                                        <p className="text-gray-900">#{student.id}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        {student.address && (
                            <div className="mt-6">
                                <h2 className="mb-2 text-lg font-semibold text-gray-700">Address</h2>
                                <p className="p-3 text-gray-900 rounded bg-gray-50">{student.address}</p>
                            </div>
                        )}

                        {/* Additional Information */}
                        <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Created At</label>
                                <p className="text-gray-900">
                                    {new Date(student.created_at).toLocaleDateString()} at{' '}
                                    {new Date(student.created_at).toLocaleTimeString()}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Last Updated</label>
                                <p className="text-gray-900">
                                    {new Date(student.updated_at).toLocaleDateString()} at{' '}
                                    {new Date(student.updated_at).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="p-4 mt-6 rounded-lg bg-gray-50">
                    <h3 className="mb-3 text-lg font-semibold">Quick Actions</h3>
                    <div className="flex space-x-3">
                        <Link
                            to={`/students/${id}/edit`}
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            Edit Profile
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                        >
                            Delete Student
                        </button>
                        <button className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600">
                            Print Profile
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default StudentDetails;