import { useState, useEffect } from 'react';
import { employeeService } from '../services/firebase';
import { sampleEmployees } from '../data/sampleData';

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load employees from Firebase or use sample data
  const loadEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const firebaseEmployees = await employeeService.getEmployee();
      
      if (firebaseEmployees.length === 0) {
        console.warn('No employees in Firebase, using sample data');
        setEmployees(sampleEmployees);
      } else {
        setEmployees(firebaseEmployees);
      }
    } catch (err) {
      console.error('Error loading employees from Firebase:', err);
      setEmployees(sampleEmployees);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new employee to Firebase or locally if it fails
  const addEmployee = async (employeeData) => {
    try {
      const newEmployee = await employeeService.addEmployee(employeeData);
      setEmployees(prev => [...prev, newEmployee]);
      return newEmployee;
    } catch (err) {
      // Fallback if Firebase fails
      const fallbackEmployee = {
        ...employeeData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      console.error('Error adding employee to Firebase, adding locally:', err);
      setEmployees(prev => [...prev, fallbackEmployee]);
      return fallbackEmployee;
    }
  };

  // Remove employee
  const removeEmployee = async (employee) => {
    try {
      await employeeService.removeEmployees(employee);
      setEmployees(prev => prev.filter(emp => emp.id !== employee.id));
    } catch (err) {
      console.error('Error removing employee:', err);
      // Remove locally even if Firebase fails
      setEmployees(prev => prev.filter(emp => emp.id !== employee.id));
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return {
    employees,
    setEmployees,
    loading,
    error,
    addEmployee,
    removeEmployee,
    refreshEmployees: loadEmployees
  };
};
