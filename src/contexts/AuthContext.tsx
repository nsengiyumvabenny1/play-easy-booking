import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import userService, { PlayerRegistrationRequest } from '@/services/userService';

// Define types
type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  profileImageUrl?: string;
};

type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  registerPlayer: (playerData: PlayerRegistrationRequest) => Promise<void>;
};

// API config
const API_URL = 'http://localhost:8080/api';
axios.defaults.baseURL = API_URL;

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Session storage keys
const TOKEN_KEY = 'tennis_auth_token';
const USER_KEY = 'tennis_user_data';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Load user data from session storage on initial load
  useEffect(() => {
    const loadUserFromSession = () => {
      try {
        const storedToken = sessionStorage.getItem(TOKEN_KEY);
        const storedUser = sessionStorage.getItem(USER_KEY);
        
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          // Set axios authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          console.log('User loaded from session storage');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // Clear potentially corrupt data
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(USER_KEY);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserFromSession();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/auth/login', { email, password });
      console.log('Login response:', response.data);
      
      // Extract token and user data
      const { accessToken, ...userData } = response.data;
      
      // Save to state and session storage
      setToken(accessToken);
      setUser(userData);
      
      // Set authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      // Store in session storage
      sessionStorage.setItem(TOKEN_KEY, accessToken);
      sessionStorage.setItem(USER_KEY, JSON.stringify(userData));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.firstName}!`,
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'Failed to login. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast({
        variant: "destructive",
        title: "Login failed",
        description: errorMessage,
      });
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear state
    setUser(null);
    setToken(null);
    
    // Clear session storage
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    
    // Clear axios header
    delete axios.defaults.headers.common['Authorization'];
    
    toast({
      title: "Logged out",
      description: "You've been successfully logged out",
    });
    
    navigate('/login');
  };

  // Register function
  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/auth/register/player', userData);
      console.log('Registration response:', response.data);
      
      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account.",
      });
      
      navigate('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: errorMessage,
      });
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register player function (using userService)
  const registerPlayer = async (playerData: PlayerRegistrationRequest) => {
    try {
      setIsLoading(true);
      const response = await userService.registerPlayer(playerData);
      console.log('Player registration response:', response);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please check your email for verification.",
      });
      
      navigate('/login');
    } catch (error: any) {
      console.error('Player registration error:', error);
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: errorMessage,
      });
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    registerPlayer,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
