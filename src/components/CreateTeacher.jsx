import api from "../axios";
import { useState } from "react";

function CreateTeacher({ onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", phone: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("subject", form.subject);
    formData.append("phone", form.phone);
    if (form.profile_picture) {
      formData.append("profile_picture", form.profile_picture);
    }

    try {
      await api.post("/teachers", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Teacher created successfully");
      onSuccess();
    } catch (error) {
      console.error("Validation Errors:", error.response.data);
      alert("Error: " + JSON.stringify(error.response.data.errors));
    }
  };


  return (
    <form className="max-w-md mx-auto mb-6" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
        <input 
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
        <input 
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="subject" className="block mb-2 text-sm font-medium">Subject</label>
        <input 
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="phone" className="block mb-2 text-sm font-medium">Phone</label>
        <input 
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>

      <input
        type="file"
        name="profile_picture"
        accept="image/*"
        onChange={(e) => setForm({ ...form, profile_picture: e.target.files[0] })}
      />


      <button 
        type="submit" 
        className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5"
      >
        Create
      </button>
    </form>
  );
}

export default CreateTeacher;
