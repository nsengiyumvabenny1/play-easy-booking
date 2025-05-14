
import api from './api';

export interface Booking {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
  totalPrice: number;
  numberOfPlayers: number;
  specialRequests?: string;
  courtId: string;
  court?: {
    id: string;
    name: string;
    courtType: string;
  };
  userId: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  recurring?: boolean;
  recurrencePattern?: string;
  recurrenceEndDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BookingRequest {
  courtId: string;
  startTime: string;
  endTime: string;
  numberOfPlayers: number;
  specialRequests?: string;
  recurring?: boolean;
  recurrencePattern?: string;
  recurrenceEndDate?: string;
}

const bookingService = {
  // Get booking by ID
  getBookingById: async (id: string) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },
  
  // Get current user's bookings
  getUserBookings: async () => {
    const response = await api.get('/bookings/user');
    return response.data;
  },
  
  // Get current user's upcoming bookings
  getUserUpcomingBookings: async () => {
    const response = await api.get('/bookings/user/upcoming');
    return response.data;
  },
  
  // Get current user's past bookings
  getUserPastBookings: async () => {
    const response = await api.get('/bookings/user/past');
    return response.data;
  },
  
  // Create a booking
  createBooking: async (bookingData: BookingRequest) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },
  
  // Update a booking
  updateBooking: async (id: string, bookingData: Partial<BookingRequest>) => {
    const response = await api.put(`/bookings/${id}`, bookingData);
    return response.data;
  },
  
  // Cancel a booking
  cancelBooking: async (id: string) => {
    const response = await api.patch(`/bookings/${id}/cancel`);
    return response.data;
  },
  
  // Check court availability
  checkCourtAvailability: async (courtId: string, date: string) => {
    const response = await api.get(`/bookings/check-availability/${courtId}`, {
      params: { date }
    });
    return response.data;
  },
  
  // Calculate booking price
  calculateBookingPrice: async (courtId: string, startTime: string, endTime: string) => {
    const response = await api.get(`/bookings/calculate-price/${courtId}`, {
      params: { startTime, endTime }
    });
    return response.data.price;
  },
  
  // Admin: Get all bookings
  getAllBookings: async (page = 0, size = 10) => {
    const response = await api.get('/bookings', {
      params: { page, size }
    });
    return response.data;
  },
  
  // Admin: Get bookings by user ID
  getBookingsByUserId: async (userId: string) => {
    const response = await api.get(`/bookings/user/${userId}`);
    return response.data;
  },
  
  // Admin: Mark booking as complete
  completeBooking: async (id: string) => {
    const response = await api.patch(`/bookings/${id}/complete`);
    return response.data;
  },
  
  // Admin: Delete a booking
  deleteBooking: async (id: string) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  },
};

export default bookingService;
