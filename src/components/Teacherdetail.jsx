import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../axios";
import Layout from "./Layout";
import EditTeacher from "./EditTeacher";

// Base URL for the image
const BASE_URL = "http://127.0.0.1:8000/storage/";

function TeacherDetail (){
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const fetchTeacher = async () => {
        try {
            const response = await api.get(`/teachers/${id}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            setTeacher(response.data);
        } catch (error) {
            console.error("Error fetching teacher:", error);
        }finally{
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this teacher?")) return;
        try {
        await api.delete(`/teachers/${id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        alert("Teacher deleted successfully!");
        navigate("/teachers"); // go back to list
        } catch (error) {
        console.error("Error deleting teacher:", error);
        }
    };

    useEffect(() => {
        fetchTeacher();
    }, [id]);
        
    if(loading) return <p>Loading teacher details...</p>;
    if(!teacher) return <p>teacher not found</p>;

    return(
        <Layout>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Teacher Details</h2>

                {!editing ? (
                <div className="border p-4 rounded shadow flex flex-col items-center">
                    {/* Display the image if it exists */}
                    {teacher.profile_picture && (
                        <div className="mb-4">
                            <img 
                                src={`${BASE_URL}${teacher.profile_picture}`} 
                                alt={`Profile picture of ${teacher.name}`} 
                                className="w-32 h-32 object-cover rounded-full border-2 border-gray-300" 
                            />
                        </div>
                    )}
                    
                    <div className="text-center">
                        <p className="text-lg"><strong>Name:</strong> {teacher.name}</p>
                        <p className="text-gray-700"><strong>Email:</strong> {teacher.email}</p>
                        <p className="text-gray-700"><strong>Subject:</strong> {teacher.subject}</p>
                        <p className="text-gray-700"><strong>Phone:</strong> {teacher.phone}</p>
                    </div>

                    <div className="mt-4 flex gap-3">
                        <button
                            onClick={() => setEditing(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => navigate("/teachers")}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Back
                        </button>
                    </div>
                </div>
                ) : (
                <EditTeacher
                    teacher={teacher}
                    onClose={() => setEditing(false)}
                    onSuccess={() => {
                    fetchTeacher();
                    setEditing(false);
                    }}
                />
                )}
            </div>
            </Layout>
    );
}

export default TeacherDetail;