import { useNavigate, useParams } from "react-router-dom";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import api from "../axios";

const EditTeacher = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    profile_picture: '',
  });

  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await api.get(`/teachers/${id}`);
        const teacher = response.data;
        
        setFormData({
            name: teacher.name || '',
            email: teacher.email || '',
            phone: teacher.phone || '',
            subject: teacher.subject || '',
            profile_picture: null,
        });
        
        if (teacher.profile_picture) {
          setCurrentImage(`http://127.0.0.1:8000/storage/${teacher.profile_picture}`);
        }
      } catch (error) {
        console.error('Error fetching teacher:', error);
        setError('Failed to load teacher data');
      }finally {
        setLoading(false);  
      }
    };
    fetchTeacher();
  }, [id]);

  const handleChange = (e) => {
      if (e.target.name === 'profile_picture') {
          setFormData({ ...formData, profile_picture: e.target.files[0] });
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
            const response = await api.post(`/teachers/${id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            
            alert('teachers updated successfully!');
            navigate('/teachers');
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
                        onClick={() => navigate('/teachers')}
                        className="px-4 py-2 mt-4 text-white bg-gray-500 rounded hover:bg-gray-600"
                    >
                        Back to teachers
                    </button>
                </div>
            </Layout>
        );
    }
    
  
    return(
      <Layout>
        <div className="max-w-4xl p-4 mx-auto">
          <div className="flex mb-6 item-center">
            <button
              onClick={() => navigate('/teachers')}
              className="px-4 py-2 mr-2 text-white bg-gray-500 rounded hover:bg-gray-600">
                ← Back
              </button>
              <h2 className="mt-3 mb-3 text-2xl font-bold"> Edit Teacher </h2>
          </div>

          {error && (
              <div className="px-4 py-3 mb-4 text-red-700 bg-red-100 border-red-400 rounded">
                {error}
              </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 bg-white rounded">
            <div className="">
              <label className="block mb-2 font-medium">Name *</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className="w-full p-2 border rounded" 
              />
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
                  <label className="block mb-2 font-medium">Subject *</label>
                  <input 
                      type="text" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      required 
                      className="w-full p-2 border rounded" 
                  />
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
                      name="profile_picture" 
                      onChange={handleChange} 
                      className="w-full p-2 border rounded" 
                      accept="image/*"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                      Select a new image to replace the current one
                  </p>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                      Update Teacher
                    </button>
                    
                    <button 
                            type="button"
                            onClick={() => navigate('/teachers')}
                            className="px-6 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                  </div>
                  
              </div>
            </div>
          </form>
        </div>
      </Layout>
    );
}
export default EditTeacher