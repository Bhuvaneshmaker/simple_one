import React, { useState } from 'react';
import { Gift, Cake } from 'lucide-react';
import { useEmployees } from './hooks/useEmployees';
import { useDateFilters } from './hooks/useDateFilters';
import TodaysCelebrations from './components/TodaysCelebrations';
import Calendar from './components/Calendar';
import DateDetails from './components/DateDetails';
import Stats from './components/Stats';
import EmployeeForm from './components/EmployeeForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { employees, loading, addEmployee } = useEmployees();
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  
  const {
    selectedDate,
    setSelectedDate,
    currentMonth,
    setCurrentMonth,
    todaysBirthdays,
    todayJoin,
    birthdayEmployees,
    joinEmployee,
    calculateAge,
    getYearsOfService,
    formatDate,
    hasBirthdayOnDate,
    isJoinDate
  } = useDateFilters(employees);

  const handleAddEmployee = async (employeeData) => {
    setIsAddingEmployee(true);
    try {
      await addEmployee(employeeData);
    } finally {
      setIsAddingEmployee(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-600 font-medium">Loading to get the Celebraties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bhuvi">
  <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
    <div className="container mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-800 mb-2 flex items-center justify-center gap-3">
          <Gift className="text-pink-600" />
          Birthday & Joinday
          <Cake className="text-pink-600" />
        </h1>
        <p className="text-gray-600">Celebrating every milestone, every year! 🎉</p>
      </div>

      {/* Today's Celebrations */}
      <TodaysCelebrations
        todaysBirthdays={todaysBirthdays}
        todayJoin={todayJoin}
        calculateAge={calculateAge}
        getYearsOfService={getYearsOfService}
        formatDate={formatDate}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Calendar - spans 2 cols on md & lg screens */}
        <div className="md:col-span-2 lg:col-span-2">
          <Calendar
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setCurrentMonth={setCurrentMonth}
            hasBirthdayOnDate={hasBirthdayOnDate}
            isJoinDate={isJoinDate}
          />
        </div>

        {/* Stats */}
        <div className="md:col-span-1 lg:col-span-1">
          <Stats employees={employees} currentMonth={currentMonth} />
        </div>

        {/* Selected Date Details */}
        <div className="md:col-span-1 lg:col-span-1">
          <DateDetails
            selectedDate={selectedDate}
            birthdayEmployees={birthdayEmployees}
            joinEmployee={joinEmployee}
            calculateAge={calculateAge}
            getYearsOfService={getYearsOfService}
            formatDate={formatDate}
          />
        </div>

        {/* Add Employee Form - Full width on small, 2 cols on md */}
        <div className="md:col-span-2 lg:col-span-2">
          <EmployeeForm 
            onAddEmployee={handleAddEmployee}
            isLoading={isAddingEmployee}
          />
        </div>
      </div>

    </div>
  </div>
</div>
  );
}

export default App;
