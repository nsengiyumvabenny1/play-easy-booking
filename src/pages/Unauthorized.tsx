
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10 text-red-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-8 max-w-sm mx-auto">
          You don't have permission to access this page. Please contact an administrator if you believe this is an error.
        </p>
        
        <div className="space-y-2">
          <Button 
            className="w-full bg-tennis-600 hover:bg-tennis-700"
            asChild
          >
            <Link to="/dashboard">Return to Dashboard</Link>
          </Button>
          
          <p className="text-sm text-gray-500">
            Need help? <Link to="/support" className="text-tennis-600 hover:underline">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
