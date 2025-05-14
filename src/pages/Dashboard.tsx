
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, CreditCard, Award, Users } from "lucide-react";
import { Link } from "react-router-dom";
import bookingService, { Booking } from "@/services/bookingService";
import courtService, { Court } from "@/services/courtService";
import BookingCard from "@/components/bookings/BookingCard";
import CourtCard from "@/components/courts/CourtCard";
import { Spinner } from "@/components/shared/Spinner";

const Dashboard = () => {
  const { user } = useAuth();
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [availableCourts, setAvailableCourts] = useState<Court[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingCourts, setLoadingCourts] = useState(true);
  const [bookingError, setBookingError] = useState<Error | null>(null);
  const [courtError, setCourtError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch upcoming bookings
      try {
        setLoadingBookings(true);
        const bookingsData = await bookingService.getUserUpcomingBookings();
        setUpcomingBookings(bookingsData.slice(0, 3)); // Get only 3 upcoming
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookingError(error as Error);
      } finally {
        setLoadingBookings(false);
      }

      // Fetch available courts
      try {
        setLoadingCourts(true);
        const courtsData = await courtService.getAllCourts();
        // Filter only available courts
        const available = courtsData.filter((court: Court) => 
          court.status.toLowerCase() === "available"
        ).slice(0, 3); // Show only 3 courts
        setAvailableCourts(available);
      } catch (error) {
        console.error("Error fetching courts:", error);
        setCourtError(error as Error);
      } finally {
        setLoadingCourts(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user?.firstName}
          </h1>
          <p className="text-gray-500 mt-1">
            Here's what's happening with your tennis activities.
          </p>
        </div>
        <Button 
          className="bg-tennis-600 hover:bg-tennis-700"
          asChild
        >
          <Link to="/bookings/new">Book a court</Link>
        </Button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="h-12 w-12 rounded-full bg-tennis-100 flex items-center justify-center mr-4">
              <CalendarDays className="h-6 w-6 text-tennis-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Upcoming Bookings</p>
              <h4 className="text-3xl font-bold">
                {loadingBookings ? <Spinner size="sm" /> : upcomingBookings.length}
              </h4>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <h4 className="text-3xl font-bold">$120</h4>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
              <Award className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tournaments</p>
              <h4 className="text-3xl font-bold">0</h4>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Coaching Sessions</p>
              <h4 className="text-3xl font-bold">0</h4>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>Your scheduled court times</CardDescription>
          </div>
          
          <Button variant="outline" asChild>
            <Link to="/bookings">View all</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {loadingBookings ? (
            <div className="flex justify-center py-8">
              <Spinner size="lg" />
            </div>
          ) : bookingError ? (
            <div className="text-center py-8 text-red-600">
              Failed to load bookings
            </div>
          ) : upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking} 
                  type="upcoming" 
                  onCancel={() => {}} // We'll implement this later
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed">
              <h3 className="text-lg font-medium text-gray-700">No upcoming bookings</h3>
              <p className="mt-1 text-gray-500">Book a court to get started</p>
              <Button 
                className="mt-4 bg-tennis-600 hover:bg-tennis-700"
                asChild
              >
                <Link to="/bookings/new">Book Now</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available courts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Available Courts</CardTitle>
            <CardDescription>Find a court to book</CardDescription>
          </div>
          
          <Button variant="outline" asChild>
            <Link to="/courts">View all</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {loadingCourts ? (
            <div className="flex justify-center py-8">
              <Spinner size="lg" />
            </div>
          ) : courtError ? (
            <div className="text-center py-8 text-red-600">
              Failed to load courts
            </div>
          ) : availableCourts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCourts.map((court) => (
                <CourtCard key={court.id} court={court} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed">
              <h3 className="text-lg font-medium text-gray-700">No available courts</h3>
              <p className="mt-1 text-gray-500">Check back later</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
