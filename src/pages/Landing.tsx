
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Landing = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white border-b py-4">
        <div className="container px-4 mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-tennis-600 flex items-center justify-center text-white font-bold mr-2">
              T
            </div>
            <span className="font-semibold text-lg">TennisBookPro</span>
          </div>
          
          <div>
            {isAuthenticated ? (
              <Button 
                asChild
                className="bg-tennis-600 hover:bg-tennis-700"
              >
                <Link to="/dashboard">My Dashboard</Link>
              </Button>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login"
                  className="text-gray-600 hover:text-tennis-700 font-medium"
                >
                  Sign in
                </Link>
                <Button 
                  asChild
                  className="bg-tennis-600 hover:bg-tennis-700"
                >
                  <Link to="/register">Create account</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      {/* Hero section */}
      <div className="bg-gradient-to-b from-green-50 to-white py-16 lg:py-24">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Book Tennis Courts with Ease
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                The simplest way to reserve tennis courts, schedule coaching sessions, and join tournaments. All in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Button 
                    size="lg"
                    className="bg-tennis-600 hover:bg-tennis-700"
                    asChild
                  >
                    <Link to="/courts">Book a Court</Link>
                  </Button>
                ) : (
                  <>
                    <Button 
                      size="lg"
                      className="bg-tennis-600 hover:bg-tennis-700"
                      asChild
                    >
                      <Link to="/register">Get Started</Link>
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      asChild
                    >
                      <Link to="/login">Sign In</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            {/* Image */}
            <div className="lg:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://source.unsplash.com/random/900x600/?tennis,court" 
                  alt="Tennis Court" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-tennis-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tennis-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Court Booking</h3>
              <p className="text-gray-600">
                Browse available courts, check real-time availability, and book your preferred time slot in seconds.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-tennis-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tennis-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Manage Bookings</h3>
              <p className="text-gray-600">
                View your upcoming bookings, make changes, or cancel with automatic notifications.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-tennis-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tennis-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Coaching Sessions</h3>
              <p className="text-gray-600">
                Book sessions with professional coaches, track your progress, and improve your game.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-tennis-600 py-16">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Playing?
          </h2>
          <p className="text-tennis-100 mb-8 max-w-lg mx-auto">
            Join thousands of tennis players who book courts through our platform every day.
          </p>
          {isAuthenticated ? (
            <Button 
              size="lg" 
              asChild
              className="bg-white text-tennis-600 hover:bg-gray-100"
            >
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <Button 
              size="lg" 
              asChild
              className="bg-white text-tennis-600 hover:bg-gray-100"
            >
              <Link to="/register">Sign Up Now</Link>
            </Button>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-tennis-600 font-bold mr-2">
                  T
                </div>
                <span className="font-semibold text-lg text-white">TennisBookPro</span>
              </div>
              <p className="text-gray-400 mt-3 max-w-xs">
                The best way to book tennis courts and manage your tennis activities.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-medium mb-4">Product</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/courts" className="hover:text-white">Courts</Link></li>
                  <li><Link to="/coaches" className="hover:text-white">Coaching</Link></li>
                  <li><Link to="/tournaments" className="hover:text-white">Tournaments</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/support" className="hover:text-white">Help Center</Link></li>
                  <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                  <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
                  <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500 text-center">
              &copy; {new Date().getFullYear()} TennisBookPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
