import React from 'react';
import { Calendar, Gift } from 'lucide-react';
import { ImportantDate } from './AuthModal';

interface ImportantDatesReminderProps {
  importantDates: ImportantDate[];
}

export function ImportantDatesReminder({ importantDates }: ImportantDatesReminderProps) {
  const getUpcomingDates = () => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    return importantDates
      .map(date => {
        // Calculate days until this date
        let daysUntil = 0;
        const dateThisYear = new Date(today.getFullYear(), date.month - 1, date.day);
        
        if (dateThisYear < today) {
          // Date has passed this year, calculate for next year
          const dateNextYear = new Date(today.getFullYear() + 1, date.month - 1, date.day);
          daysUntil = Math.ceil((dateNextYear.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        } else {
          daysUntil = Math.ceil((dateThisYear.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        }

        return { ...date, daysUntil };
      })
      .filter(date => date.daysUntil <= 30) // Show dates within next 30 days
      .sort((a, b) => a.daysUntil - b.daysUntil);
  };

  const upcomingDates = getUpcomingDates();

  const getMonthName = (month: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1];
  };

  if (upcomingDates.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
          <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-base sm:text-lg mb-2">🎉 Special Occasions Coming Up!</h3>
          <div className="space-y-2">
            {upcomingDates.map((date) => (
              <div
                key={date.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-3 gap-2"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">{date.label}</p>
                    <p className="text-xs sm:text-sm text-white/90">
                      {getMonthName(date.month)} {date.day}
                    </p>
                  </div>
                </div>
                <div className="text-xs sm:text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm self-start sm:self-auto">
                  {date.daysUntil === 0 ? (
                    <span className="font-bold">Today!</span>
                  ) : date.daysUntil === 1 ? (
                    <span>Tomorrow</span>
                  ) : (
                    <span>In {date.daysUntil} days</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm mt-3 text-white/90">
            🎁 Check out our special occasion gift boxes and get exclusive offers!
          </p>
        </div>
      </div>
    </div>
  );
}
