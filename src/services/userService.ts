
import api from './api';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  profileImageUrl?: string;
  status: string;
  roles: string[];
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
  twoFactorEnabled?: boolean;
}

export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
}

const userService = {
  // Get current user profile
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
  
  // Update current user profile
  updateProfile: async (userData: UserUpdateRequest) => {
    const userId = JSON.parse(sessionStorage.getItem('tennis_user_data') || '{}').id;
    if (!userId) throw new Error('User not authenticated');
    
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  },
  
  // Change password
  changePassword: async (passwordData: PasswordChangeRequest) => {
    const userId = JSON.parse(sessionStorage.getItem('tennis_user_data') || '{}').id;
    if (!userId) throw new Error('User not authenticated');
    
    const response = await api.patch(`/users/${userId}/password`, passwordData);
    return response.data;
  },
  
  // Admin: Get user by ID
  getUserById: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  
  // Admin: Get all users
  getAllUsers: async (page = 0, size = 10) => {
    const response = await api.get('/users', {
      params: { page, size }
    });
    return response.data;
  },
  
  // Admin: Create user
  createUser: async (userData: any) => {
    const response = await api.post('/users', userData);
    return response.data;
  },
  
  // Admin: Update user
  updateUser: async (id: string, userData: any) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },
  
  // Admin: Update user status
  updateUserStatus: async (id: string, status: string) => {
    const response = await api.patch(`/users/${id}/status`, { status });
    return response.data;
  },
  
  // Admin: Delete user
  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
  
  // Admin: Approve player
  approvePlayer: async (id: string) => {
    const response = await api.patch(`/users/${id}/approve`);
    return response.data;
  },
  
  // Admin: Get players pending approval
  getPendingApprovalPlayers: async () => {
    const response = await api.get('/users/pending-approval');
    return response.data;
  },
  
  // Admin: Register coach
  registerCoach: async (coachData: any) => {
    const response = await api.post('/users/register/coach', coachData);
    return response.data;
  },
};

export default userService;
