import { useState, useEffect } from "react";
import api from "../axios";


function EditTeacher ({ teacher, onClose, onSuccess }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        phone: "",
    });

    useEffect(() => {
        if (teacher) {
        setForm({
            name: teacher.name || "",
            email: teacher.email || "",
            subject: teacher.subject || "",
            phone: teacher.phone || "",
        });
        }
    }, [teacher]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await api.put(`/teachers/${teacher.id}`, form);
            alert("Teacher update successfully!");
            onSuccess();
            onClose();
        }catch ( error) {
            console.error("Error updating teacher:", error.response?.data || error);
        }
    };

    return (
        <div className="p-4 bg-gray-100 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Edit Teacher</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Name"
                />
                <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Email"
                />
                <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Subject"
                />
                <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Phone"
                />
                <div className="flex gap-2">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                    Cancel
                </button>
                </div>
            </form>
            </div>
    );
}

export default EditTeacher;