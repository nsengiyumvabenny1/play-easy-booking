
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Landing from "./Landing";

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Landing />;
};

export default Index;
