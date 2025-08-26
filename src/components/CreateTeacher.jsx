import api from "../axios";
import {  useState } from "react";

function CreateTeacher({ onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({...errors, [e.target.name]: ""});
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
      setSuccess(" ✅ Teacher created successfully");
      setForm({ name: "", email: "", subject:"", phone:""});
      setErrors({});
      setGeneralError("");
      onSuccess();

      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      if(error.response && error.response.data.errors){
        setErrors(error.response.data.errors);
      }else{
        setGeneralError("⚠️ Something went wrong. Please try again.");
      }
    }
  };


  return (
    <form className="max-w-md mx-auto mb-6" onSubmit={handleSubmit}>
      {success && (
        <div className="mb-4 p-3 text-green-800 bg-green-100 border border-green-300 rounded-lg">
          {success}
        </div>
      )}
      {/* ❌ General error */}
      {generalError && (
        <div className="mb-4 p-3 text-red-800 bg-red-100 border border-red-300 rounded-lg">
          {generalError}
        </div>
      )}
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
        <input 
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
        <input 
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className={`bg-gray-50 border ${errors.email ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
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
        {errors.subject && <p className="text-red-500 text-sm">{errors.subject[0]}</p>}
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
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone[0]}</p>}
      </div>

      <input
        type="file"
        name="profile_picture"
        accept="image/*"
        onChange={(e) => setForm({ ...form, profile_picture: e.target.files[0] })}
      />
      {errors.profile_picture && <p className="text-red-500 text-sm">{errors.profile_picture[0]}</p>}

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
