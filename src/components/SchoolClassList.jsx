import { useEffect, useState } from "react";
import api from "../axios";
import { Link } from "react-router-dom"; // ✅ Add this import
import Layout from "./Layout";

const SchoolClassList = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await api.get('/school-classes');
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p>Loading classes...</p>
            </div>
        );
    }

    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">School Classes</h2>
                    <Link 
                        to="/school-classes/created" 
                        className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                    >
                        + Add New Class
                    </Link>
                </div>

                {classes.length === 0 ? (
                    <div className="p-8 text-center bg-white rounded-lg shadow">
                        <p className="mb-4 text-gray-600">No classes found.</p>
                        <Link 
                            to="/school-classes/created" 
                            className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            Create Your First Class
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {classes.map((schoolClass) => (
                            <div key={schoolClass.id} className="p-6 transition-shadow bg-white border rounded-lg shadow hover:shadow-md">
                                <h3 className="mb-2 text-xl font-semibold text-gray-800">{schoolClass.name}</h3>
                                <div className="mb-4 space-y-2">
                                    <p className="text-gray-600">
                                        <span className="font-medium">Capacity:</span> {schoolClass.capacity} students
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Class Teacher:</span> {schoolClass.class_teacher?.name || 'Not assigned'}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Sections:</span> {schoolClass.sections?.length || 0}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Total Students:</span> {schoolClass.total_students || 0}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <Link 
                                        to={`/school-classes/${schoolClass.id}/sections`}
                                        className="px-3 py-2 text-sm text-white transition-colors bg-green-500 rounded hover:bg-green-600"
                                    >
                                        View Sections
                                    </Link>
                                    <Link 
                                        to={`/school-classes/${schoolClass.id}/edit`}
                                        className="px-3 py-2 text-sm text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </Link>
                                    <Link 
                                        to={`/school-classes/${schoolClass.id}`}
                                        className="px-3 py-2 text-sm text-white transition-colors bg-gray-500 rounded hover:bg-gray-600"
                                    >
                                        Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default SchoolClassList;