/**
 * Parse event date string in DD.MM.YYYY format
 * @param {string} dateString - Date string in DD.MM.YYYY format
 * @returns {Date} Parsed date object
 */
export const parseEventDate = (dateString) => {
  const [day, month, year] = dateString.split('.').map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Calculate days until event
 * @param {string} eventDate - Event date string in DD.MM.YYYY format
 * @returns {number} Number of days until event (negative if past)
 */
export const calculateDaysUntil = (eventDate) => {
  const eventDateObj = parseEventDate(eventDate);
  const today = new Date();
  // Reset time to midnight for accurate day calculation
  today.setHours(0, 0, 0, 0);
  eventDateObj.setHours(0, 0, 0, 0);
  
  const diffTime = eventDateObj - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Get start of week (Monday)
 * @param {Date} date - Reference date
 * @returns {Date} Start of week
 */
export const getStartOfWeek = (date) => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Adjust when day is Sunday
  start.setDate(start.getDate() + diff);
  start.setHours(0, 0, 0, 0);
  return start;
};

/**
 * Get end of week (Sunday)
 * @param {Date} date - Reference date
 * @returns {Date} End of week
 */
export const getEndOfWeek = (date) => {
  const end = new Date(date);
  const day = end.getDay();
  const diff = day === 0 ? 0 : 7 - day;
  end.setDate(end.getDate() + diff);
  end.setHours(23, 59, 59, 999);
  return end;
};

/**
 * Check if event date matches the specified filter
 * @param {string} eventDateString - Event date string in DD.MM.YYYY format
 * @param {string} filterType - Filter type: 'today', 'tomorrow', 'thisweek', 'thismonth', 'all'
 * @returns {boolean} True if date matches filter
 */
export const matchesDateFilter = (eventDateString, filterType) => {
  const eventDate = parseEventDate(eventDateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  switch (filterType) {
    case 'today':
      return (
        eventDate.getDate() === today.getDate() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear()
      );
    
    case 'tomorrow': {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      return (
        eventDate.getDate() === tomorrow.getDate() &&
        eventDate.getMonth() === tomorrow.getMonth() &&
        eventDate.getFullYear() === tomorrow.getFullYear()
      );
    }
    
    case 'thisweek': {
      const startOfWeek = getStartOfWeek(today);
      const endOfWeek = getEndOfWeek(today);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    }
    
    case 'thismonth':
      return (
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear()
      );
    
    case 'all':
    default:
      return true;
  }
};
