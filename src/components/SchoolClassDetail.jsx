import { useNavigate, useParams } from "react-router-dom";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import api from "../axios";
import {
  AcademicCapIcon,
  UserGroupIcon,
  UserIcon,
  CalendarIcon,
  ChartBarIcon,
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon
} from "@heroicons/react/24/outline";

const SchoolClassDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await api.get(`/school-classes/${id}`);
        setClassData(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching class: ', error);
        setError('Failed to load class details. Please try again');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchClass();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this class? This action cannot be undone.")) return;
    
    try {
      await api.delete(`/school-classes/${id}`);
      alert('Class deleted successfully!');
      navigate('/school-classes');
    } catch (error) {
      console.error('Error deleting class:', error);
      alert('Error deleting class. Please try again.');
    }
  };

  const calculateCapacityPercentage = () => {
    if (!classData || !classData.total_students || !classData.capacity) return 0;
    return Math.round((classData.total_students / classData.capacity) * 100);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto border-b-2 border-blue-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading class details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !classData) {
    return (
      <Layout>
        <div className="max-w-4xl p-6 mx-auto">
          <div className="p-6 border border-yellow-200 rounded-lg bg-yellow-50">
            <div className="flex items-center">
              <AcademicCapIcon className="w-8 h-8 mr-3 text-yellow-600" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800">Class Not Found</h3>
                <p className="text-yellow-700">{error || 'The requested class could not be found.'}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/school-classes')}
              className="px-4 py-2 mt-4 text-white transition-colors bg-yellow-500 rounded hover:bg-yellow-600"
            >
              Back to Classes
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl p-6 mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/school-classes')}
              className="p-2 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{classData.name}</h1>
              <p className="text-gray-600">Class ID: {classData.employee_id || `CLS-${id}`}</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => navigate(`/school-classes/${id}/edit`)}
              className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              <PencilIcon className="w-4 h-4" />
              <span>Edit Class</span>
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
            >
              <TrashIcon className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            {['overview', 'sections', 'students', 'attendance', 'performance'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Class Information Card */}
            <div className="p-6 bg-white border border-gray-200 shadow-sm lg:col-span-2 rounded-xl">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Class Information</h2>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <AcademicCapIcon className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Class Name</p>
                      <p className="font-medium">{classData.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <ChartBarIcon className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600">Capacity</p>
                      <p className="font-medium">{classData.capacity} students</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <UserGroupIcon className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-600">Total Students</p>
                      <p className="font-medium">{classData.total_students || 0} students</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {classData.class_teacher && (
                    <div className="flex items-center space-x-3">
                      <UserIcon className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-600">Class Teacher</p>
                        <p className="font-medium">{classData.class_teacher.name}</p>
                        {classData.class_teacher.subject && (
                          <p className="text-sm text-gray-500">{classData.class_teacher.subject}</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-3">
                    <CalendarIcon className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-600">Sections</p>
                      <p className="font-medium">{classData.sections_count || 0} sections</p>
                    </div>
                  </div>

                  {classData.description && (
                    <div>
                      <p className="mb-1 text-sm text-gray-600">Description</p>
                      <p className="text-gray-700">{classData.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Class Statistics</h2>
              
              <div className="space-y-4">
                {/* Capacity Progress Bar */}
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-600">Capacity Usage</span>
                    <span className="font-medium">{calculateCapacityPercentage()}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-2 rounded-full ${
                        calculateCapacityPercentage() >= 90 ? 'bg-red-500' :
                        calculateCapacityPercentage() >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${calculateCapacityPercentage()}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {classData.total_students || 0} of {classData.capacity} students
                  </p>
                </div>

                {/* Attendance Rate (mock) */}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Attendance Rate</span>
                    <span className="font-medium text-green-600">94%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>

                {/* Sections Overview */}
                <div className="pt-4 border-t">
                  <h3 className="mb-2 text-sm font-medium text-gray-900">Sections Overview</h3>
                  {classData.sections && classData.sections.length > 0 ? (
                    <div className="space-y-2">
                      {classData.sections.slice(0, 3).map((section) => (
                        <div key={section.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">Section {section.name}</span>
                          <span className="font-medium">{section.student_count || 0} students</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">No sections created yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Tabs Placeholder */}
        {activeTab !== 'overview' && (
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="py-12 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
                {activeTab === 'sections' && <UserGroupIcon className="w-8 h-8 text-gray-400" />}
                {activeTab === 'students' && <UserIcon className="w-8 h-8 text-gray-400" />}
                {activeTab === 'attendance' && <ChartBarIcon className="w-8 h-8 text-gray-400" />}
                {activeTab === 'performance' && <AcademicCapIcon className="w-8 h-8 text-gray-400" />}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
              </h3>
              <p className="mb-4 text-gray-600">
                This feature is coming soon. You'll be able to manage {activeTab} for this class here.
              </p>
              <button
                onClick={() => navigate('/school-classes')}
                className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
              >
                Back to Classes
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SchoolClassDetail;