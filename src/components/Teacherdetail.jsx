import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../axios";
import Layout from "./Layout";


function TeacherDetail (){

    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await api.get(`/teachers/${id}`);
                setTeacher(response.data);
            } catch (error) {
                console.error("Error fetching teacher:", error);
            }
        };
        fetchTeacher();
    }, [id]);

    if(!teacher) return <p>Loading...</p>

    return(
        <Layout>
            <div className="p-4 bg-white rounded shadow-md">
                <h2 className="text-xl font-bold mb-2">{teacher.name}</h2>
                <p>Email: {teacher.email}</p>
                <p>Subject: {teacher.subject}</p>
                <p>Phone: {teacher.phone}</p>
            </div>
        </Layout>
    );
}

export default TeacherDetail;