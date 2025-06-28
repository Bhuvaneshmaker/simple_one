import React, { useState } from 'react';
import { Users, Trash2, Search, } from 'lucide-react';
import { employeeService } from "../services/firebase"

const EmployeeList = ({ employees, removeEmployee }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');


  // Filter and sort employees
const filteredEmployees = employees
  .filter(emp => {
    const name = emp.name || '';
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ""
    );
  })
  .sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return (a.name || '').localeCompare(b.name || '');
      case 'joinDate':
        return new Date(a.joinDate) - new Date(b.joinDate);
      case 'birthday':
        return new Date(a.birthday) - new Date(b.birthday);
      default:
        return 0;
    }
  });

  const handleRemove = async (employee) => {
  try {
    await employeeService.removeEmployee(employee);
    // Optionally refresh the employee list or update the state
    if (window.confirm(`Are you sure you want to remove ${employee.name}?`))
  } catch (error) {
    console.error("Failed to delete employee:", error);
  }
};

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg">
          <Users className="w-6 h-6 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Employee Directory</h2>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
          {filteredEmployees.length} of {employees.length}
        </span>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>


        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="name">Sort by Name</option>
          <option value="joinDate">Sort by Join Date</option>
          <option value="birthday">Sort by Birthday</option>
        </select>
      </div>

      {/* Employee List */}
      {filteredEmployees.length === 0 ? (
        <div className="text-center py-8">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No employees found</p>
          <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredEmployees.map(employee => (
            <div
              key={employee.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{employee.name}</h3>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                      {employee.id}
                    </span>
                  </div>
                  
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-500">
                    <div>
                      <span className="font-medium">Birthday:</span> {formatDate(employee.birthday)} (Age {calculateAge(employee.birthday)})
                    </div>
                    <div>
                      <span className="font-medium">Joined:</span> {formatDate(employee.joinDate)}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleRemove(employee)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  title="Remove employee"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
