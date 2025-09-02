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
    profile_image: '',
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
            profile_image: null,
        });
        
        if (teacher.profile_image) {
          setCurrentImage(`http://127.0.0.1:8000/storage/${teacher.profile_image}`);
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
                        onClick={() => navigate('/students')}
                        className="px-4 py-2 mt-4 text-white bg-gray-500 rounded hover:bg-gray-600"
                    >
                        Back to Students
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

          <form className="p-6 bg-white rounded">
            
          </form>
        </div>
      </Layout>
    );
}
export default EditTeacher