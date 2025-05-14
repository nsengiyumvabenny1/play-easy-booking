
import api from './api';

export interface Court {
  id: string;
  name: string;
  courtType: string;
  indoor: boolean;
  hasLighting: boolean;
  pricePerHour: number;
  description: string;
  status: string;
  courtNumber: number;
  surfaceType: string;
  features: string[];
  imageUrl?: string;
}

export interface CourtAvailability {
  courtId: string;
  availableSlots: {
    startTime: string;
    endTime: string;
  }[];
}

const courtService = {
  // Get all courts
  getAllCourts: async () => {
    const response = await api.get('/courts');
    return response.data;
  },
  
  // Get court by ID
  getCourtById: async (id: string) => {
    const response = await api.get(`/courts/${id}`);
    return response.data;
  },
  
  // Get available courts for a time slot
  getAvailableCourts: async (startTime: string, endTime: string) => {
    const response = await api.get('/courts/available', {
      params: { startTime, endTime }
    });
    return response.data;
  },
  
  // Get court availability for a date range
  getCourtAvailability: async (courtId: string, startDate: string, endDate: string) => {
    const response = await api.get(`/courts/${courtId}/availability`, {
      params: { startDate, endDate }
    });
    return response.data;
  },
  
  // Admin: Create court
  createCourt: async (courtData: Omit<Court, 'id'>) => {
    const response = await api.post('/courts', courtData);
    return response.data;
  },
  
  // Admin: Update court
  updateCourt: async (id: string, courtData: Partial<Court>) => {
    const response = await api.put(`/courts/${id}`, courtData);
    return response.data;
  },
  
  // Admin: Update court status
  updateCourtStatus: async (id: string, status: string) => {
    const response = await api.patch(`/courts/${id}/status`, { status });
    return response.data;
  },
  
  // Admin: Delete court
  deleteCourt: async (id: string) => {
    const response = await api.delete(`/courts/${id}`);
    return response.data;
  },
};

export default courtService;
