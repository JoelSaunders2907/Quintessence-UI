import React from 'react';
import { Calendar } from 'lucide-react';

interface DatePickerProps {
  selectedDate: string;
  onChange: (date: string) => void;
}

export function DatePicker({ selectedDate, onChange }: DatePickerProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onChange(e.target.value)}
          className="
            pl-10 pr-4 py-2 
            border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            text-gray-700
          "
        />
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
      </div>
    </div>
  );
}