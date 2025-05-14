
import React from "react";
import { formatDate, formatTime, formatCurrency } from "@/lib/formatters";
import { Booking } from "@/services/bookingService";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BookingCardProps {
  booking: Booking;
  type: "upcoming" | "past";
  onCancel?: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, type, onCancel }) => {
  const navigate = useNavigate();
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "pending":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "completed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-semibold mr-3">{booking.court?.name}</h3>
              <Badge className={getStatusBadgeVariant(booking.status)}>
                {booking.status}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600 mb-1">
              {booking.court?.courtType}
            </p>
            
            <div className="flex items-center space-x-2 text-sm text-gray-700 mb-3">
              <div className="font-medium">
                {formatDate(booking.startTime)}
              </div>
              <div>•</div>
              <div>
                {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
              </div>
            </div>
            
            {booking.specialRequests && (
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Special requests:</span> {booking.specialRequests}
              </p>
            )}
            
            <p className="text-sm">
              <span className="font-medium">Players:</span> {booking.numberOfPlayers}
            </p>
          </div>
          
          <div className="flex flex-col items-start sm:items-end">
            <div className="text-lg font-semibold text-tennis-700 mb-2">
              {formatCurrency(booking.totalPrice)}
            </div>
            
            <div className="flex space-x-2 mt-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/bookings/${booking.id}`)}
              >
                Details
              </Button>
              
              {type === "upcoming" && booking.status.toLowerCase() !== "cancelled" && onCancel && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
