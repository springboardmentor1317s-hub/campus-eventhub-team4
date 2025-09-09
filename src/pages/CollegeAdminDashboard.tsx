import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, User } from "lucide-react";

const CollegeAdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/">
              <h1 className="text-xl font-bold text-primary">CampusEventHub</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Event Organizer Dashboard</h1>
          <p className="text-muted-foreground">Create and manage your campus events</p>
        </div>

        {/* Create New Event Button */}
        <div className="mb-8">
          <Button className="w-full sm:w-auto" variant="gradient" size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Create New Event
          </Button>
        </div>

        {/* Your Published Events Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Published Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-8 0h8m-8 0V19a2 2 0 002 2h4a2 2 0 002-2V7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No active events</h3>
              <p className="text-muted-foreground">You have no active events.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollegeAdminDashboard;