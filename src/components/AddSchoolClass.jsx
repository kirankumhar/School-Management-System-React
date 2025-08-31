import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import Layout from "./Layout";

const AddSchoolClass = () => {
    const [loading, setLoading] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        numeric_name: "",
        description: "",
        capacity: 40,
        class_teacher_id: ""
    });
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await api.get('/teachers');
            setTeachers(response.data.data || response.data);
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

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
        setLoading(true);
        setErrors({});

        try {
            const response = await api.post('/school-classes', formData);
            alert('Class created successfully!');
            navigate('/school-classes');
        } catch (error) {
            console.error('Error creating class:', error);
            
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
                alert('Validation errors: ' + JSON.stringify(error.response.data.errors));
            } else if (error.response?.data?.message) {
                alert('Error: ' + error.response.data.message);
            } else {
                alert('Error creating class. Please check console for details.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center mb-6">
                    <button 
                        onClick={() => navigate('/school-classes')}
                        className="px-4 py-2 mr-4 text-white transition-colors bg-gray-500 rounded hover:bg-gray-600"
                    >
                        ← Back
                    </button>
                    <h2 className="text-2xl font-bold">Add New Class</h2>
                </div>

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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select a teacher (optional)</option>
                            {teachers.map((teacher) => (
                                <option key={teacher.id} value={teacher.id}>
                                    {teacher.name} - {teacher.subject || 'No subject'}
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
                            disabled={loading}
                            className="px-6 py-3 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating...' : 'Create Class'}
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

export default AddSchoolClass;