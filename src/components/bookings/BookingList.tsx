
import React, { useState } from "react";
import { Booking } from "@/services/bookingService";
import BookingCard from "./BookingCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/shared/Spinner";

interface BookingListProps {
  bookings: Booking[];
  isLoading: boolean;
  error: Error | null;
  onCancelBooking?: (id: string) => void;
}

const BookingList: React.FC<BookingListProps> = ({ 
  bookings, 
  isLoading, 
  error,
  onCancelBooking 
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  
  // Get upcoming and past bookings
  const now = new Date().toISOString();
  const upcomingBookings = bookings.filter(b => b.startTime > now);
  const pastBookings = bookings.filter(b => b.startTime <= now);
  
  // Filter bookings based on search and status
  const filterBookings = (bookingList: Booking[]) => {
    return bookingList.filter(booking => {
      const matchesSearch = 
        booking.court?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.court?.courtType.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "" || booking.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };
  
  const filteredUpcoming = filterBookings(upcomingBookings);
  const filteredPast = filterBookings(pastBookings);
  
  const statuses = Array.from(new Set(bookings.map(b => b.status)));
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center my-12">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center my-12">
        <h3 className="text-xl font-semibold text-red-600">Error loading bookings</h3>
        <p className="mt-2 text-gray-600">{error.message}</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="font-medium mb-3">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              placeholder="Search courts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {(searchQuery || statusFilter) && (
          <div className="mt-3 flex justify-end">
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
      
      {/* Tabs for upcoming and past bookings */}
      <Tabs defaultValue="upcoming">
        <TabsList className="w-full sm:w-auto mb-6">
          <TabsTrigger value="upcoming" className="flex-1 sm:flex-auto">
            Upcoming ({upcomingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past" className="flex-1 sm:flex-auto">
            Past ({pastBookings.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          {filteredUpcoming.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
              <h3 className="text-lg font-medium text-gray-700">No upcoming bookings</h3>
              <p className="mt-1 text-gray-500">Book a court to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUpcoming.map((booking) => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking} 
                  type="upcoming"
                  onCancel={() => onCancelBooking && onCancelBooking(booking.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          {filteredPast.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
              <h3 className="text-lg font-medium text-gray-700">No past bookings</h3>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPast.map((booking) => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking} 
                  type="past" 
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingList;
