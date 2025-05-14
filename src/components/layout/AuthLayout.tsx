
import React from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  footer?: React.ReactNode;
  backLink?: { label: string; to: string };
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  description,
  footer,
  backLink,
}) => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-tennis-700 tennis-gradient items-center justify-center">
        <div className="max-w-md text-center px-8">
          <div className="h-20 w-20 rounded-full bg-white mx-auto mb-8 flex items-center justify-center">
            <span className="text-tennis-700 text-3xl font-bold">T</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">TennisBookPro</h1>
          <p className="text-tennis-100 mb-8 text-lg">
            The simplest way to book tennis courts, schedule coaching sessions, and join tournaments.
          </p>
          
          {/* Tennis court pattern */}
          <div className="w-full h-64 court-pattern rounded-lg opacity-30"></div>
        </div>
      </div>
      
      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {backLink && (
            <Link
              to={backLink.to}
              className="inline-flex items-center text-sm text-tennis-600 hover:text-tennis-700 mb-6"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {backLink.label}
            </Link>
          )}
          
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            {description && <p className="text-gray-600">{description}</p>}
          </div>
          
          {children}
          
          {footer && <div className="mt-8 text-center">{footer}</div>}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
