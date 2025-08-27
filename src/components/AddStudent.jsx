import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import Layout from "./Layout";

const AddStudent = () => {
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
    const navigate = useNavigate();

    const handleChange = (e) => { // Removed async
        if(e.target.name === 'profile_image') {
            setFormData({ ...formData, profile_image: e.target.files[0] });
        }else{
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const data = new FormData();
        for (const key in formData) {
            if (formData[key] !== null) { // Avoid appending null values
                data.append(key, formData[key]);
            }
        }

        try{
            const response = await api.post('/students', data, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            alert('Student created successfully!');
            // Reset form after success
            setFormData({
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

        }catch(error){
            console.error('Error creating student:', error);
            if (error.response?.data?.errors) {
                alert('Validation errors: ' + JSON.stringify(error.response.data.errors));
            } else {
                alert('Error creating student. Please try again.');
            }
        }
    };

    return (
        <Layout>
            <div className="p-4 max-w-4xl mx-auto">
                <div className="flex items-center mb-6">
                    <button 
                        onClick={() => navigate('/students')}
                        className="bg-gray-500 text-white px-4 py-2 rounded mr-4 hover:bg-gray-600"
                    >
                        ← Back
                    </button>
                    <h2 className="text-2xl font-bold">Add New Student</h2>
                </div>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
                    <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="p-2 border rounded" />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="p-2 border rounded" />
                        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="p-2 border rounded" />
                        <input type="text" name="roll_number" placeholder="Roll Number" value={formData.roll_number} onChange={handleChange} required className="p-2 border rounded" />
                        <input type="text" name="class" placeholder="Class" value={formData.class} onChange={handleChange} className="p-2 border rounded" />
                        <input type="text" name="section" placeholder="Section" value={formData.section} onChange={handleChange} className="p-2 border rounded" />
                        <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required className="p-2 border rounded" />
                    </div>
                    
                    <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded mb-4"></textarea>
                    
                    <div className="mb-4">
                        <label className="block mb-2">Profile Image</label>
                        <input type="file" name="profile_image" onChange={handleChange} className="p-2 border rounded" />
                    </div>
                    
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Student</button>
                </form>
            </div>

        </Layout>
        
    );
};
export default AddStudent;