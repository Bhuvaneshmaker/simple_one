import React from 'react';
import { Star, Heart } from 'lucide-react';

const TodaysCelebrations = ({ todaysBirthdays, todayJoin, calculateAge, getYearsOfService, formatDate }) => {
  return (
    <>
      {/* Today's Birthdays */}
      {todaysBirthdays.length > 0 && (
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
            <Star className="text-yellow-300" />
            🎉 Today's Birthday Celebrations! 🎉  <Heart className='text-red-300'/>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todaysBirthdays.map((emp, index) => (
              <div key={index} className="bg-black bg-opacity-20 rounded-lg p-4">
                <h4 className="font-bold text-xl">{emp.name}</h4>
                <p className="text-pink-100">🎂 Turning {calculateAge(emp.birthday)} years old!</p>
                <div className="mt-2 p-2 bg-white bg-opacity-10 rounded">
                  <p className="text-sm">
                    🎊 "Wishing you a fantastic birthday filled with joy, laughter, and wonderful memories!"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's Work Anniversaries */}
      {todayJoin.length > 0 && (
        <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
            <Star className="text-yellow-300" />
            🎉 Work Anniversary Celebrations! 🎉
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todayJoin.map((emp, index) => (
              <div key={index} className="bg-white bg-opacity-20 rounded-lg p-4">
                <h4 className="font-bold text-xl-black">{emp.name}</h4>
                <p className="text-green-700">🎉 Stepping to {getYearsOfService(emp.joinDate)} years!</p>
                <div className="mt-2 p-2 bg-white bg-opacity-10 rounded">
                  <p className="text-sm-black">
                    🎊 "{emp.name} Congratulations on {getYearsOfService(emp.joinDate)} amazing years with us since {formatDate(emp.joinDate)}!"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TodaysCelebrations;
