
import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm";
import AuthLayout from "@/components/layout/AuthLayout";

const Register = () => {
  return (
    <AuthLayout
      title="Create an account"
      description="Sign up to start booking tennis courts and more."
      backLink={{ label: "Back to login", to: "/login" }}
      footer={
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-tennis-600 hover:text-tennis-700 font-medium">
            Sign in
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
