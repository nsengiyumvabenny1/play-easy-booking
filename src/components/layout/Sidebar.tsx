
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router-dom";
import { Home, CalendarDays, User, Users, BookOpen, Award, CreditCard, Settings, MessageSquare, ChevronLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

type NavItem = {
  name: string;
  path: string;
  icon: React.ElementType;
  adminOnly?: boolean;
};

const navItems: NavItem[] = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "My Bookings", path: "/bookings", icon: CalendarDays },
  { name: "Courts", path: "/courts", icon: BookOpen },
  { name: "Coaches", path: "/coaches", icon: Users },
  { name: "Tournaments", path: "/tournaments", icon: Award },
  { name: "Payments", path: "/payments", icon: CreditCard },
  { name: "Support", path: "/support", icon: MessageSquare },
  // Admin routes
  { name: "User Management", path: "/admin/users", icon: User, adminOnly: true },
  { name: "System Settings", path: "/admin/settings", icon: Settings, adminOnly: true },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const isAdmin = user?.roles?.includes("ADMIN");
  
  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(item => !item.adminOnly || isAdmin);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:transform-none lg:translate-x-0",
          !isOpen && !isMobile && "lg:w-0"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-tennis-600 flex items-center justify-center text-white font-bold">T</div>
            <span className="font-semibold text-lg">TennisBookPro</span>
          </div>
          
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <nav className="py-4 px-2 flex flex-col h-[calc(100%-4rem)]">
          <div className="space-y-1 flex-1">
            {filteredNavItems.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                  isActive 
                    ? "bg-tennis-100 text-tennis-700 font-medium" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          {/* User info and logout */}
          <div className="mt-auto">
            <div className="px-3 py-2">
              <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            
            <Button
              variant="ghost"
              className="w-full justify-start px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={logout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
