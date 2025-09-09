import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Grid, Calendar, MapPin, Clock, Users, Trophy, MessageCircle, User } from "lucide-react";
import EventDetailModal from "@/components/EventDetailModal";

// Mock event data
const mockEvents = [
  {
    id: 1,
    title: "Tech Innovation Hackathon 2024",
    description: "48-hour coding competition with amazing prizes and networking opportunities",
    college: "MIT Technology Institute",
    date: "March 15-17, 2024",
    location: "Campus Innovation Center",
    participants: "342 / 500",
    image: "/placeholder.svg",
    tags: ["hackathon", "technology", "prizes"],
    status: "active",
    startTime: "9:00 AM",
    requirements: "Bring your laptop and creativity",
    prizes: "$10,000 in total prizes"
  },
  {
    id: 2,
    title: "Spring Music Festival",
    description: "Annual campus music festival featuring local and student bands",
    college: "State University",
    date: "April 22, 2024",
    location: "Main Quad",
    participants: "1,200 / 2,000",
    image: "/placeholder.svg",
    tags: ["music", "festival", "entertainment"],
    status: "active",
    startTime: "2:00 PM",
    requirements: "Free for all students",
    prizes: "Performance opportunities"
  },
  {
    id: 3,
    title: "Career Fair 2024",
    description: "Connect with top employers and explore career opportunities",
    college: "Business College",
    date: "February 28, 2024",
    location: "Student Center",
    participants: "856 / 1,000",
    image: "/placeholder.svg",
    tags: ["career", "networking", "completed"],
    status: "completed",
    startTime: "10:00 AM",
    requirements: "Business attire recommended",
    prizes: "Job opportunities"
  }
];

const EventListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [eventType, setEventType] = useState("all");
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [viewMode, setViewMode] = useState<"card" | "calendar">("card");
  const [selectedEvent, setSelectedEvent] = useState<typeof mockEvents[0] | null>(null);

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = eventType === "all" || event.tags.includes(eventType);
    const matchesStatus = status === "all" || event.status === status;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/">
                <h1 className="text-xl font-bold text-primary">CampusEventHub</h1>
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link to="/events" className="text-primary font-medium">
                  All Events
                </Link>
                <Link to="/organizer-dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">All Events</h1>
          <p className="text-muted-foreground">Discover exciting events happening on your campus</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filters:</span>
            </div>
            
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="hackathon">Hackathon</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="career">Career</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
              </SelectContent>
            </Select>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === "card" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("card")}
              className="rounded-md"
            >
              <Grid className="w-4 h-4 mr-2" />
              Card View
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("calendar")}
              className="rounded-md"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Calendar View
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        {viewMode === "card" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedEvent(event)}>
                <div className="aspect-video bg-gradient-primary rounded-t-lg"></div>
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant={tag === "completed" ? "secondary" : "default"}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.college}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Calendar View Placeholder */}
        {viewMode === "calendar" && (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Calendar View</h3>
            <p className="text-muted-foreground">Calendar view functionality will be implemented here</p>
          </div>
        )}

        {/* Event Detail Modal */}
        {selectedEvent && (
          <EventDetailModal 
            event={selectedEvent} 
            isOpen={!!selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </div>
  );
};

export default EventListing;