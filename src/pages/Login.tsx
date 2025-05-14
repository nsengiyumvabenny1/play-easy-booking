
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import AuthLayout from "@/components/layout/AuthLayout";

const Login = () => {
  return (
    <AuthLayout
      title="Sign in to your account"
      description="Enter your credentials to access the tennis court booking system."
      footer={
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-tennis-600 hover:text-tennis-700 font-medium">
            Create an account
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
