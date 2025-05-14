
import React, { useState } from "react";
import { Court } from "@/services/courtService";
import CourtCard from "./CourtCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/shared/Spinner";

interface CourtListProps {
  courts: Court[];
  isLoading: boolean;
  error: Error | null;
}

const CourtList: React.FC<CourtListProps> = ({ courts, isLoading, error }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [courtTypeFilter, setCourtTypeFilter] = useState("");
  const [surfaceFilter, setSurfaceFilter] = useState("");
  
  // Extract unique court types and surface types for filters
  const courtTypes = Array.from(new Set(courts.map(court => court.courtType)));
  const surfaceTypes = Array.from(new Set(courts.map(court => court.surfaceType)));
  
  // Filter courts based on search query and filters
  const filteredCourts = courts.filter(court => {
    const matchesSearch = court.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          court.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCourtType = courtTypeFilter === "" || court.courtType === courtTypeFilter;
    const matchesSurface = surfaceFilter === "" || court.surfaceType === surfaceFilter;
    
    return matchesSearch && matchesCourtType && matchesSurface;
  });
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setCourtTypeFilter("");
    setSurfaceFilter("");
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
        <h3 className="text-xl font-semibold text-red-600">Error loading courts</h3>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              placeholder="Search courts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <Select value={courtTypeFilter} onValueChange={setCourtTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Court Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Court Types</SelectItem>
              {courtTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={surfaceFilter} onValueChange={setSurfaceFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Surface Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Surfaces</SelectItem>
              {surfaceTypes.map((surface) => (
                <SelectItem key={surface} value={surface}>{surface}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {(searchQuery || courtTypeFilter || surfaceFilter) && (
          <div className="mt-3 flex justify-end">
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
      
      {/* Courts grid */}
      {filteredCourts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
          <h3 className="text-lg font-medium text-gray-700">No courts found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourts.map((court) => (
            <CourtCard key={court.id} court={court} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourtList;
