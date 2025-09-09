import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users, TrendingUp, Plus, FileDown, Eye, User } from "lucide-react";

// Mock data
const stats = [
  { title: "Total Events", value: "24", icon: CalendarDays, color: "text-primary" },
  { title: "Active Events", value: "8", icon: TrendingUp, color: "text-success" },
  { title: "Total Registrations", value: "1,247", icon: Users, color: "text-secondary" },
  { title: "Average Participants", value: "156", icon: Users, color: "text-warning" }
];

const recentEvents = [
  {
    id: 1,
    title: "Tech Innovation Hackathon 2024",
    date: "March 15-17, 2024",
    registrations: 342,
    status: "active"
  },
  {
    id: 2,
    title: "Spring Career Fair",
    date: "April 22, 2024",
    registrations: 856,
    status: "active"
  },
  {
    id: 3,
    title: "AI Workshop Series",
    date: "February 28, 2024",
    registrations: 124,
    status: "completed"
  },
  {
    id: 4,
    title: "Student Networking Night",
    date: "March 5, 2024",
    registrations: 78,
    status: "upcoming"
  }
];

const OrganizerDashboard = () => {
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
                <Link to="/events" className="text-muted-foreground hover:text-primary transition-colors">
                  All Events
                </Link>
                <Link to="/organizer-dashboard" className="text-primary font-medium">
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Event Organizer Dashboard</h1>
          <p className="text-muted-foreground">Manage your events and track performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Events */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Events</CardTitle>
                <CardDescription>Your latest event activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{event.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{event.date}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.registrations} registered
                          </span>
                          <Badge variant={
                            event.status === "active" ? "default" :
                            event.status === "completed" ? "secondary" : "outline"
                          }>
                            {event.status}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="gradient" size="lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Event
                </Button>
                
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="w-5 h-5 mr-2" />
                  View All Registrations
                </Button>
                
                <Button className="w-full justify-start" variant="outline">
                  <FileDown className="w-5 h-5 mr-2" />
                  Export Event Data
                </Button>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Event Management</h4>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      Manage Categories
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      Email Templates
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      Analytics & Reports
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Performance</CardTitle>
              <CardDescription>This month's overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Views</span>
                  <span className="font-medium">12,456</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Registration Rate</span>
                  <span className="font-medium">68%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg. Attendance</span>
                  <span className="font-medium">156 people</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Categories</CardTitle>
              <CardDescription>Most registered event types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Technology</span>
                  <Badge>342 registrations</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Career Development</span>
                  <Badge variant="secondary">287 registrations</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Networking</span>
                  <Badge variant="outline">156 registrations</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;