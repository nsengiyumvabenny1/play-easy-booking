
// Format a date string to a readable format
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Format a date string to a time format
export function formatTime(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  };
  
  return new Date(dateString).toLocaleTimeString(undefined, options);
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

// Format date range for display
export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // If same day
  if (start.toDateString() === end.toDateString()) {
    return `${formatDate(startDate)}, ${formatTime(startDate)} - ${formatTime(endDate)}`;
  }
  
  // Different days
  return `${formatDate(startDate)}, ${formatTime(startDate)} - ${formatDate(endDate)}, ${formatTime(endDate)}`;
}

// Calculate duration in hours between two dates
export function calculateDuration(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const durationMs = end.getTime() - start.getTime();
  const durationHours = durationMs / (1000 * 60 * 60);
  
  return Math.round(durationHours * 10) / 10; // Round to 1 decimal place
}

// Format a phone number
export function formatPhoneNumber(phoneNumber: string): string {
  // Handle different phone number formats
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
  }
  
  return phoneNumber; // Return original if can't format
}
