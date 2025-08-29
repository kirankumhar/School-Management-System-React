import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axios";
import Layout from "./Layout";

const EditStudent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        roll_number: '',
        class: '',
        section: '',
        date_of_birth: '',
        address: '',
        profile_image: null,
    });
    const [currentImage, setCurrentImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    const { id } = useParams(); // Get student ID from URL

    // Fetch student data
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await api.get(`/students/${id}`);
                const student = response.data;
                
                setFormData({
                    name: student.name || '',
                    email: student.email || '',
                    phone: student.phone || '',
                    roll_number: student.roll_number || '',
                    class: student.class || '',
                    section: student.section || '',
                    date_of_birth: student.date_of_birth ? student.date_of_birth.split('T')[0] : '',
                    address: student.address || '',
                    profile_image: null,
                });
                
                if (student.profile_image) {
                    setCurrentImage(`http://127.0.0.1:8000/storage/${student.profile_image}`);
                }
                
            } catch (error) {
                console.error('Error fetching student:', error);
                setError('Failed to load student data');
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [id]);

    const handleChange = (e) => {
        if (e.target.name === 'profile_image') {
            setFormData({ ...formData, profile_image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const data = new FormData();
        for (const key in formData) {
            if (formData[key] !== null && formData[key] !== '') {
                data.append(key, formData[key]);
            }
        }

        data.append('_method', 'PUT');

        try {
            const response = await api.post(`/students/${id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            
            alert('Student updated successfully!');
            navigate('/students');
        } catch (error) {
            console.error('Error updating student:', error);
            if (error.response?.data?.errors) {
                setError('Validation errors: ' + JSON.stringify(error.response.data.errors));
            } else {
                setError('Error updating student. Please try again.');
            }
        }
    };

    const removeProfileImage = () => {
        setFormData({ ...formData, profile_image: 'remove' });
        setCurrentImage('');
    };

    if (loading) {
        return (
            <Layout>
                <div className="p-4">
                    <div className="flex items-center justify-center h-64">
                        <p>Loading student data...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    if (error && !loading) {
        return (
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
    }

    return (
        <Layout>
            <div className="max-w-4xl p-4 mx-auto">
                <div className="flex items-center mb-6">
                    <button 
                        onClick={() => navigate('/students')}
                        className="px-4 py-2 mr-4 text-white bg-gray-500 rounded hover:bg-gray-600"
                    >
                        ← Back
                    </button>
                    <h2 className="text-2xl font-bold">Edit Student</h2>
                </div>

                {error && (
                    <div className="px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow">
                    <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                        <div>
                            <label className="block mb-2 font-medium">Name *</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                                className="w-full p-2 border rounded" 
                            />
                        </div>
                        
                        <div>
                            <label className="block mb-2 font-medium">Email *</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                                className="w-full p-2 border rounded" 
                            />
                        </div>
                        
                        <div>
                            <label className="block mb-2 font-medium">Phone</label>
                            <input 
                                type="text" 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded" 
                            />
                        </div>
                        
                        <div>
                            <label className="block mb-2 font-medium">Roll Number *</label>
                            <input 
                                type="text" 
                                name="roll_number" 
                                value={formData.roll_number} 
                                onChange={handleChange} 
                                required 
                                className="w-full p-2 border rounded" 
                            />
                        </div>
                        
                        <div>
                            <label className="block mb-2 font-medium">Class</label>
                            <input 
                                type="text" 
                                name="class" 
                                value={formData.class} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded" 
                            />
                        </div>
                        
                        <div>
                            <label className="block mb-2 font-medium">Section</label>
                            <input 
                                type="text" 
                                name="section" 
                                value={formData.section} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded" 
                            />
                        </div>
                        
                        <div>
                            <label className="block mb-2 font-medium">Date of Birth *</label>
                            <input 
                                type="date" 
                                name="date_of_birth" 
                                value={formData.date_of_birth} 
                                onChange={handleChange} 
                                required 
                                className="w-full p-2 border rounded" 
                            />
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Address</label>
                        <textarea 
                            name="address" 
                            value={formData.address} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded"
                            rows="3"
                        ></textarea>
                    </div>
                    
                    <div className="mb-6">
                        <label className="block mb-2 font-medium">Profile Image</label>
                        
                        {currentImage && (
                            <div className="mb-3">
                                <p className="mb-2">Current Image:</p>
                                <img 
                                    src={currentImage} 
                                    alt="Current profile" 
                                    className="object-cover w-24 h-24 mb-2 rounded-full"
                                />
                                <button 
                                    type="button"
                                    onClick={removeProfileImage}
                                    className="px-3 py-1 text-sm text-white bg-red-500 rounded"
                                >
                                    Remove Image
                                </button>
                            </div>
                        )}
                        
                        <input 
                            type="file" 
                            name="profile_image" 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded" 
                            accept="image/*"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Select a new image to replace the current one
                        </p>
                    </div>
                    
                    <div className="flex gap-4">
                        <button 
                            type="submit" 
                            className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            Update Student
                        </button>
                        
                        <button 
                            type="button"
                            onClick={() => navigate('/students')}
                            className="px-6 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default EditStudent;