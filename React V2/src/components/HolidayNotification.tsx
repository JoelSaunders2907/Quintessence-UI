import React from 'react';

interface HolidayNotificationProps {
  holidays: string[];
  isLoading: boolean;
}

export function HolidayNotification({ holidays, isLoading }: HolidayNotificationProps) {
  if (isLoading) {
    return <div className="mt-2 text-sm text-gray-500">Checking holidays...</div>;
  }

  if (!holidays.length) return null;

  return (
    <div className="mt-2 space-y-1">
      {holidays.map((holiday, index) => (
        <div
          key={index}
          className="text-sm px-3 py-1 bg-amber-50 text-amber-700 rounded-md border border-amber-200"
        >
          {holiday}
        </div>
      ))}
    </div>
  );
}