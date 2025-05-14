
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import bookingService, { Booking } from "@/services/bookingService";
import BookingList from "@/components/bookings/BookingList";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);
  const [isCanceling, setIsCanceling] = useState<boolean>(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const bookingsData = await bookingService.getUserBookings();
        setBookings(bookingsData);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setError(error as Error);
        toast({
          title: "Error",
          description: "Failed to load bookings. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async () => {
    if (!bookingToCancel) return;

    try {
      setIsCanceling(true);
      await bookingService.cancelBooking(bookingToCancel);
      
      // Update bookings state - mark the booking as cancelled
      setBookings(bookings.map(booking => 
        booking.id === bookingToCancel 
          ? { ...booking, status: "CANCELLED" } 
          : booking
      ));
      
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been successfully cancelled.",
      });
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      toast({
        title: "Error",
        description: "Failed to cancel booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCanceling(false);
      setBookingToCancel(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
          <p className="text-gray-500 mt-1">
            Manage your court reservations
          </p>
        </div>
        
        <Button 
          className="bg-tennis-600 hover:bg-tennis-700"
          asChild
        >
          <Link to="/bookings/new">Book a Court</Link>
        </Button>
      </div>

      <BookingList
        bookings={bookings}
        isLoading={isLoading}
        error={error}
        onCancelBooking={(id) => setBookingToCancel(id)}
      />

      <AlertDialog open={!!bookingToCancel} onOpenChange={(open) => !open && setBookingToCancel(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isCanceling}>Keep Booking</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelBooking}
              disabled={isCanceling}
              className="bg-red-600 hover:bg-red-700"
            >
              {isCanceling ? "Canceling..." : "Yes, Cancel Booking"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Bookings;
