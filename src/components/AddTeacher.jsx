import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import api from "../axios";

const AddTeacher = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "", 
        subject: "", 
        phone: "",
        profile_image:null
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
        for(const key in formData){
            if (formData[key] !== null) { 
                data.append(key, formData[key]);
            }
        }

        try{
            const response = await api.post('/teachers', data, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            alert('Teacher created successfully!');
            // Reset form after success
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                profile_image: null,
            });

        }catch(error){
            console.error('Error creating teacher:', error);
            if (error.response?.data?.errors) {
                alert('Validation errors: ' + JSON.stringify(error.response.data.errors));
            } else {
                alert('Error creating Teacher. Please try again.');
            }
        }

    }; 

    return (
        <Layout>
            <div className="max-w-4xl p-4 max-auto">
                <div className="flex mb-6 item-center">
                    <button
                        onClick={() => navigate('/teachers')}
                        className="px-4 py-2 mr-4 text-white bg-gray-500 rounded hover:bg-gray-600"
                    >
                        ← Back
                    </button>
                    <h2 className="text-2xl font-bold">Add New Teacher</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="max-w-lg p-4 mx-auto">
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
                        <input 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        />
                        
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                        <input 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                        />
                        
                    </div>

                    <div className="mb-5">
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium">Subject</label>
                        <input 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        />
                        
                    </div>

                    <div className="mb-5">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium">Phone</label>
                        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="p-2 border rounded" />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Profile Image</label>
                        <input type="file" name="profile_image" onChange={handleChange} className="p-2 border rounded" />
                    </div>
                    <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Add Teacher</button>
                </form>
            </div>
        </Layout>
    );
}
export default AddTeacher;