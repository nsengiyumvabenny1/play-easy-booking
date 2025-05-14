
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import courtService, { Court } from "@/services/courtService";
import CourtList from "@/components/courts/CourtList";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Courts = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  
  const isAdmin = user?.roles?.includes("ADMIN");

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        setIsLoading(true);
        const courtsData = await courtService.getAllCourts();
        setCourts(courtsData);
      } catch (error) {
        console.error("Failed to fetch courts:", error);
        setError(error as Error);
        toast({
          title: "Error",
          description: "Failed to load courts. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tennis Courts</h1>
          <p className="text-gray-500 mt-1">
            Browse and book available courts
          </p>
        </div>
        
        {isAdmin && (
          <Button className="bg-tennis-600 hover:bg-tennis-700">
            Add New Court
          </Button>
        )}
      </div>

      <CourtList
        courts={courts}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default Courts;
