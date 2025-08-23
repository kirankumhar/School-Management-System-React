import axios from "../axios";
import { useState } from "react";

function CreateTeacher({ onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", phone: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/teachers", form);   // ✅ use `form` not `formData`
      alert("Teacher created successfully!");
      if (onSuccess) onSuccess(); // refresh list after create
      setForm({ name: "", email: "", subject: "", phone: "" }); // reset form
    } catch (error) {
      console.error("Error creating teacher:", error.response?.data || error);
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
