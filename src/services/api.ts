
import axios from 'axios';
import { toast } from "@/hooks/use-toast";

const API_URL = 'http://localhost:8080';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor for adding token
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('tennis_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 (unauthorized) and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh the token
        const refreshToken = sessionStorage.getItem('tennis_refresh_token');
        
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/api/auth/refresh-token`, { refreshToken });
          const newToken = response.data.accessToken;
          
          // Update stored token and header
          sessionStorage.setItem('tennis_auth_token', newToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
          
          // Retry failed request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        
        // Clear session storage on refresh failure
        sessionStorage.removeItem('tennis_auth_token');
        sessionStorage.removeItem('tennis_user_data');
        sessionStorage.removeItem('tennis_refresh_token');
        
        // Show toast notification
        toast({
          variant: "destructive",
          title: "Session expired",
          description: "Please login again to continue",
        });
        
        // Redirect to login page
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
