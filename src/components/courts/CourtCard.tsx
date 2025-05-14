
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Court } from "@/services/courtService";
import { useNavigate } from "react-router-dom";

interface CourtCardProps {
  court: Court;
  showBookButton?: boolean;
}

const CourtCard: React.FC<CourtCardProps> = ({ court, showBookButton = true }) => {
  const navigate = useNavigate();
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "maintenance":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "booked":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <div className="h-48 overflow-hidden relative">
          <img
            src={court.imageUrl || `https://source.unsplash.com/random/400x300/?tennis,court&id=${court.id}`}
            alt={court.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <Badge 
            className={`absolute top-3 right-3 ${getStatusBadgeVariant(court.status)}`}
          >
            {court.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold">{court.name}</h3>
          <p className="text-sm text-gray-600">
            {court.courtType} • {court.surfaceType} • {court.indoor ? "Indoor" : "Outdoor"}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {court.hasLighting && (
            <Badge variant="outline" className="text-xs">Lighting</Badge>
          )}
          {court.features?.map((feature, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
        
        <p className="text-lg font-semibold text-tennis-700">${court.pricePerHour}/hour</p>
      </CardContent>
      
      <CardFooter>
        <div className="flex space-x-2 w-full">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1"
            onClick={() => navigate(`/courts/${court.id}`)}
          >
            Details
          </Button>
          
          {showBookButton && court.status.toLowerCase() === "available" && (
            <Button 
              size="sm" 
              className="flex-1 bg-tennis-600 hover:bg-tennis-700"
              onClick={() => navigate(`/bookings/new?courtId=${court.id}`)}
            >
              Book Now
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourtCard;
