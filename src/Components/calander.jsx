import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarComponent = ({ onClose, onApply }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [activePreset, setActivePreset] = useState(null);

  // Get current date info
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const today = now.getDate();

  // Get calendar month info
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Day abbreviations
  const dayAbbrevs = ['Dim', 'Lun', 'Mar', 'Merc', 'Jeu', 'Ven', 'Sam'];

  // Navigate months
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Handle date selection
  const handleDateClick = (day) => {
    const clickedDate = new Date(year, month, day);
    
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // Start new selection
      setSelectedStartDate(clickedDate);
      setSelectedEndDate(null);
      setActivePreset(null);
    } else if (selectedStartDate && !selectedEndDate) {
      // Complete the range
      if (clickedDate >= selectedStartDate) {
        setSelectedEndDate(clickedDate);
      } else {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(clickedDate);
      }
    }
  };

  // Handle preset selections
  const handlePresetClick = (preset) => {
    setActivePreset(preset);
    const today = new Date();
    
    switch (preset) {
      case 'Today':
        setSelectedStartDate(today);
        setSelectedEndDate(today);
        break;
      case 'This week':
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
        setSelectedStartDate(startOfWeek);
        setSelectedEndDate(endOfWeek);
        break;
      case 'This month':
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        setSelectedStartDate(startOfMonth);
        setSelectedEndDate(endOfMonth);
        break;
      case 'This year':
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        const endOfYear = new Date(today.getFullYear(), 11, 31);
        setSelectedStartDate(startOfYear);
        setSelectedEndDate(endOfYear);
        break;
    }
  };

  // Check if a date is in the selected range
  const isDateInRange = (day) => {
    if (!selectedStartDate) return false;
    const date = new Date(year, month, day);
    
    if (selectedEndDate) {
      return date >= selectedStartDate && date <= selectedEndDate;
    } else {
      return date.toDateString() === selectedStartDate.toDateString();
    }
  };

  // Check if a date is the start or end of range
  const isRangeStart = (day) => {
    if (!selectedStartDate) return false;
    const date = new Date(year, month, day);
    return date.toDateString() === selectedStartDate.toDateString();
  };

  const isRangeEnd = (day) => {
    if (!selectedEndDate) return false;
    const date = new Date(year, month, day);
    return date.toDateString() === selectedEndDate.toDateString();
  };

  // Check if date is today
  const isToday = (day) => {
    return year === currentYear && month === currentMonth && day === today;
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    
    // Previous month's trailing days
    const prevMonth = new Date(year, month - 1, 0);
    const prevMonthDays = prevMonth.getDate();
    
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${prevMonthDays - i}`} className="text-gray-400 p-2 text-center">
          {prevMonthDays - i}
        </div>
      );
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const inRange = isDateInRange(day);
      const rangeStart = isRangeStart(day);
      const rangeEnd = isRangeEnd(day);
      const todayClass = isToday(day) ? 'font-bold' : '';
      
      let dayClass = `p-2 text-center cursor-pointer hover:bg-gray-100 ${todayClass}`;
      
      if (inRange) {
        if (rangeStart && rangeEnd) {
          dayClass += ' bg-green-500 text-white rounded-full';
        } else if (rangeStart) {
          dayClass += ' bg-green-500 text-white rounded-l-full';
        } else if (rangeEnd) {
          dayClass += ' bg-green-500 text-white rounded-r-full';
        } else {
          dayClass += ' bg-green-100';
        }
      }
      
      days.push(
        <div
          key={day}
          className={dayClass}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleApply = () => {
    if (onApply) {
      onApply({
        start: selectedStartDate,
        end: selectedEndDate,
        preset: activePreset
      });
    }
    if (onClose) onClose();
  };
  const handleCancel = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setActivePreset(null);
    // Close the calendar popup
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-6 text-center">Filter by Date</h2>
        
        {/* Horizontal Layout Container */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Side - Preset Options */}
          <div className="lg:w-48 flex-shrink-0">
            <h3 className="font-medium mb-3 text-gray-700">Quick Select</h3>
            <div className="space-y-2">
              {["Aujourd'hui", 'Cette Semaine', 'Ce Mois ', 'Cette Année'].map((preset) => (
                <div
                  key={preset}
                  className={`px-4 py-3 cursor-pointer rounded-lg border transition-colors ${
                    activePreset === preset 
                      ? 'bg-green-50 border-green-200 text-green-700' 
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => handlePresetClick(preset)}
                >
                  {preset}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Calendar */}
          <div className="flex-1">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={previousMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronLeft size={24} />
              </button>
              <h3 className="text-2xl font-semibold">
                {monthNames[month]} {year}
              </h3>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 mb-3">
              {dayAbbrevs.map(day => (
                <div key={day} className="text-center text-sm font-semibold text-gray-600 p-3">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1 mb-6">
              {generateCalendarDays()}
            </div>

            {/* Selected Range Display */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
              <div className="text-sm text-gray-600 mb-1">Selected Range</div>
              <div className="text-lg font-medium">
                {selectedStartDate ? (
                  selectedEndDate ? (
                    `${formatDate(selectedStartDate)} - ${formatDate(selectedEndDate)}`
                  ) : (
                    formatDate(selectedStartDate)
                  )
                ) : (
                  'No dates selected'
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleCancel}
                className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;