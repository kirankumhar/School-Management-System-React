import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../axios";
import Layout from "./Layout";
import EditTeacher from "./EditTeacher";
import {
  UserIcon,
  AcademicCapIcon,
  PhoneIcon,
  EnvelopeIcon,
  HomeIcon,
  CalendarIcon,
  BriefcaseIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";

// Base URL for the image
const BASE_URL = "http://127.0.0.1:8000/storage/";

function TeacherDetail() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
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
    } finally {
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
      navigate("/teachers");
    } catch (error) {
      console.error("Error deleting teacher:", error);
      alert("Error deleting teacher. Please try again.");
    }
  };

  useEffect(() => {
    fetchTeacher();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto border-b-2 border-blue-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading teacher details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!teacher) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <UserIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-700">Teacher Not Found</h3>
            <p className="mb-4 text-gray-600">The teacher you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate("/teachers")}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Back to Teachers
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // Calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Calculate years of service
  const calculateYearsOfService = (joiningDate) => {
    if (!joiningDate) return null;
    const joinDate = new Date(joiningDate);
    const today = new Date();
    return today.getFullYear() - joinDate.getFullYear();
  };

  return (
    <Layout>
      <div className="max-w-4xl p-6 mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Teacher Details</h2>
            <p className="text-gray-600">Complete information about the teacher</p>
          </div>
          <button
            onClick={() => navigate("/teachers")}
            className="px-4 py-2 text-white transition-colors bg-gray-500 rounded hover:bg-gray-600"
          >
            ← Back to List
          </button>
        </div>

        {!editing ? (
          <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
            {/* Profile Header */}
            <div className="p-6 text-white bg-gradient-to-r from-blue-600 to-blue-700">
              <div className="flex items-center space-x-6">
                {teacher.profile_picture ? (
                  <img
                    src={`${BASE_URL}${teacher.profile_picture}`}
                    alt={`Profile of ${teacher.first_name} ${teacher.last_name}`}
                    className="object-cover w-24 h-24 border-4 border-white rounded-full border-opacity-20"
                  />
                ) : (
                  <div className="flex items-center justify-center w-24 h-24 bg-white rounded-full bg-opacity-20">
                    <UserIcon className="w-12 h-12 text-white opacity-70" />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold">
                    {/* {teacher.first_name} {teacher.last_name} */}
                    {teacher.name}
                  </h1>
                  <p className="text-blue-100">{teacher.subject || 'Teacher'}</p>
                  <p className="text-sm text-blue-100">Employee ID: {teacher.employee_id}</p>
                </div>
              </div>
            </div>

            {/* Teacher Information */}
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="pb-2 text-lg font-semibold text-gray-900 border-b">
                    Personal Information
                  </h3>
                  
                  <div className="flex items-center space-x-3">
                    <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{teacher.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <PhoneIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{teacher.phone || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Date of Birth</p>
                      <p className="font-medium">
                        {teacher.date_of_birth ? 
                          `${new Date(teacher.date_of_birth).toLocaleDateString()} 
                          (${calculateAge(teacher.date_of_birth)} years)` : 
                          'Not provided'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <UserIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Gender</p>
                      <p className="font-medium capitalize">{teacher.gender || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-4">
                  <h3 className="pb-2 text-lg font-semibold text-gray-900 border-b">
                    Professional Information
                  </h3>

                  <div className="flex items-center space-x-3">
                    <AcademicCapIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Qualification</p>
                      <p className="font-medium">{teacher.qualification || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <BriefcaseIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Subject Specialization</p>
                      <p className="font-medium">{teacher.subject_specialization || 'Not specified'}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Experience</p>
                      <p className="font-medium">
                        {teacher.years_of_experience || teacher.years_of_experience === 0 ? 
                          `${teacher.years_of_experience} years` : 
                          'Not provided'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="font-medium capitalize">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          teacher.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {teacher.status || 'active'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="pb-2 text-lg font-semibold text-gray-900 border-b">
                  Additional Information
                </h3>

                {teacher.address && (
                  <div className="flex items-start space-x-3">
                    <HomeIcon className="w-5 h-5 mt-1 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium">{teacher.address}</p>
                    </div>
                  </div>
                )}

                {teacher.joining_date && (
                  <div className="flex items-center space-x-3">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Joining Date</p>
                      <p className="font-medium">
                        {new Date(teacher.joining_date).toLocaleDateString()}
                        {calculateYearsOfService(teacher.joining_date) && 
                          ` (${calculateYearsOfService(teacher.joining_date)} years of service)`
                        }
                      </p>
                    </div>
                  </div>
                )}

                {teacher.notes && (
                  <div className="flex items-start space-x-3">
                    <DocumentTextIcon className="w-5 h-5 mt-1 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Notes</p>
                      <p className="font-medium">{teacher.notes}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex pt-6 mt-8 space-x-4 border-t">
                <h3 className="mb-3 text-lg font-semibold">Quick Actions</h3>
                <div className="flex space-x-3">
                  <Link
                    to={`/teachers/${id}/edit`}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Edit Profile
                  </Link>
                    
                  <button
                    onClick={handleDelete}
                    className="px-6 py-2 text-white transition-colors bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete Teacher
                  </button>
                  <button
                    onClick={() => navigate("/teachers")}
                    className="px-6 py-2 text-white transition-colors bg-gray-500 rounded hover:bg-gray-600"
                  >
                    Back to List
                  </button>
                  </div>
              </div>
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