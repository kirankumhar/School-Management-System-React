import { useEffect, useState } from "react";
import Layout from "./Layout";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axios";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const EditSchoolClass = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        numeric_name: '',
        description: '',
        capacity: '',
        class_teacher_id: '',
    });

    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    
    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch class data
                const classResponse = await api.get(`/school-classes/${id}`);
                const classData = classResponse.data;
                
                // Fetch teachers for dropdown
                const teachersResponse = await api.get('/teachers');
                setTeachers(teachersResponse.data.data || teachersResponse.data);

                setFormData({
                    name: classData.name || '',
                    numeric_name: classData.numeric_name || '',
                    description: classData.description || '',
                    capacity: classData.capacity || '',
                    class_teacher_id: classData.class_teacher_id || ''
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                setErrors({ general: 'Failed to load class data' });
            } finally {
                setLoading(false);
            }
        };
        
        if (id) {
            fetchData();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});

        try {
            await api.put(`/school-classes/${id}`, formData);

            alert('Class updated successfully!');
            navigate('/school-classes');
        } catch (error) {
            console.error('Error updating class:', error);
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: 'Error updating class. Please try again.' });
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="w-12 h-12 mx-auto border-b-2 border-blue-500 rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600">Loading class data...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-2xl p-6 mx-auto">
                <div className="flex items-center mb-6">
                    <button 
                        onClick={() => navigate('/school-classes')}
                        className="flex items-center px-4 py-2 mr-4 text-white transition-colors bg-gray-500 rounded hover:bg-gray-600"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-2" />
                        Back
                    </button>
                    <h2 className="text-2xl font-bold">Edit Class</h2>
                </div>

                {errors.general && (
                    <div className="p-4 mb-6 text-red-700 bg-red-100 border border-red-400 rounded">
                        {errors.general}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-6 bg-white border rounded-lg shadow">
                    {/* Class Name */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Class Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="e.g., Grade 1, Class 2"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">{errors.name[0]}</p>
                        )}
                    </div>

                    {/* Numeric Name (for sorting) */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Numeric Name *
                        </label>
                        <input
                            type="number"
                            name="numeric_name"
                            value={formData.numeric_name}
                            onChange={handleChange}
                            required
                            min="1"
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                errors.numeric_name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="e.g., 1, 2, 3 (for sorting)"
                        />
                        {errors.numeric_name && (
                            <p className="mt-1 text-sm text-red-500">{errors.numeric_name[0]}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Optional class description..."
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">{errors.description[0]}</p>
                        )}
                    </div>

                    {/* Capacity */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Capacity *
                        </label>
                        <input
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            required
                            min="1"
                            max="100"
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                errors.capacity ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.capacity && (
                            <p className="mt-1 text-sm text-red-500">{errors.capacity[0]}</p>
                        )}
                    </div>

                    {/* Class Teacher */}
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Class Teacher
                        </label>
                        <select
                            name="class_teacher_id"
                            value={formData.class_teacher_id}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                errors.class_teacher_id ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                            <option value="">Select a teacher (optional)</option>
                            {teachers.map((teacher) => (
                                <option key={teacher.id} value={teacher.id}>
                                    {teacher.name} &nbsp;
                                    {teacher.subject}
                                </option>
                            ))}
                        </select>
                        {errors.class_teacher_id && (
                            <p className="mt-1 text-sm text-red-500">{errors.class_teacher_id[0]}</p>
                        )}
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-6 py-3 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? 'Updating...' : 'Update Class'}
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => navigate('/school-classes')}
                            className="px-6 py-3 text-white transition-colors bg-gray-500 rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default EditSchoolClass;