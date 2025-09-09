import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays, Users, TrendingUp, AlertCircle, Eye, MoreHorizontal, User } from "lucide-react";

// Mock data
const stats = [
  { 
    title: "Total Events", 
    value: "1,247", 
    icon: CalendarDays, 
    color: "text-primary",
    tab: "event-management"
  },
  { 
    title: "Active Users", 
    value: "8,456", 
    icon: Users, 
    color: "text-success",
    tab: "user-management"
  },
  { 
    title: "Total Registrations", 
    value: "23,891", 
    icon: TrendingUp, 
    color: "text-secondary",
    tab: "registrations"
  },
  { 
    title: "Pending Reviews", 
    value: "12", 
    icon: AlertCircle, 
    color: "text-warning",
    tab: "overview"
  }
];

const recentEvents = [
  {
    id: 1,
    title: "Tech Innovation Hackathon 2024",
    organizer: "MIT Tech Club",
    date: "March 15-17, 2024",
    registrations: 342,
    status: "active"
  },
  {
    id: 2,
    title: "Spring Career Fair",
    organizer: "Career Services",
    date: "April 22, 2024",
    registrations: 856,
    status: "approved"
  },
  {
    id: 3,
    title: "AI Workshop Series",
    organizer: "CS Department",
    date: "February 28, 2024",
    registrations: 124,
    status: "completed"
  }
];

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@university.edu",
    role: "Student",
    college: "MIT",
    lastActive: "2 hours ago",
    status: "active"
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah.wilson@university.edu",
    role: "Organizer",
    college: "Stanford",
    lastActive: "1 day ago",
    status: "active"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@university.edu",
    role: "Admin",
    college: "Harvard",
    lastActive: "5 minutes ago",
    status: "active"
  }
];

const events = [
  {
    id: 1,
    title: "Tech Innovation Hackathon 2024",
    organizer: "MIT Tech Club",
    date: "March 15-17, 2024",
    participants: 342,
    status: "active"
  },
  {
    id: 2,
    title: "Spring Music Festival",
    organizer: "Music Department",
    date: "April 22, 2024",
    participants: 1200,
    status: "pending"
  },
  {
    id: 3,
    title: "Career Development Workshop",
    organizer: "Career Services",
    date: "March 8, 2024",
    participants: 156,
    status: "approved"
  }
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleStatClick = (tab: string) => {
    setActiveTab(tab);
  };

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
                <Link to="/admin-dashboard" className="text-primary font-medium">
                  Admin Dashboard
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive system management and oversight</p>
        </div>

        {/* Interactive Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card 
              key={stat.title} 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
              onClick={() => handleStatClick(stat.tab)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Click to view details
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabbed Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="user-management">User Management</TabsTrigger>
            <TabsTrigger value="event-management">Event Management</TabsTrigger>
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
            <TabsTrigger value="admin-logs">Admin Logs</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Events</CardTitle>
                  <CardDescription>Latest event activities across the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <p className="text-xs text-muted-foreground">{event.organizer}</p>
                        </div>
                        <Badge variant={
                          event.status === "active" ? "default" :
                          event.status === "approved" ? "secondary" : "outline"
                        }>
                          {event.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Current system status and metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Server Status</span>
                      <Badge className="bg-success text-success-foreground">Online</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Database</span>
                      <Badge className="bg-success text-success-foreground">Healthy</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">API Response</span>
                      <span className="text-sm font-medium">145ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Active Sessions</span>
                      <span className="text-sm font-medium">2,341</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="user-management">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage system users and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>College</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.college}</TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell>
                          <Badge className="bg-success text-success-foreground">
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Event Management Tab */}
          <TabsContent value="event-management">
            <Card>
              <CardHeader>
                <CardTitle>Event Management</CardTitle>
                <CardDescription>Oversee all events on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Organizer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>{event.organizer}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.participants}</TableCell>
                        <TableCell>
                          <Badge variant={
                            event.status === "active" ? "default" :
                            event.status === "approved" ? "secondary" : "outline"
                          }>
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Registrations Tab */}
          <TabsContent value="registrations">
            <Card>
              <CardHeader>
                <CardTitle>Registration Analytics</CardTitle>
                <CardDescription>Track event registrations and attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center p-6 border rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-2">23,891</div>
                    <div className="text-sm text-muted-foreground">Total Registrations</div>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <div className="text-2xl font-bold text-success mb-2">18,456</div>
                    <div className="text-sm text-muted-foreground">Attended Events</div>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <div className="text-2xl font-bold text-secondary mb-2">77%</div>
                    <div className="text-sm text-muted-foreground">Attendance Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Logs Tab */}
          <TabsContent value="admin-logs">
            <Card>
              <CardHeader>
                <CardTitle>Admin Activity Logs</CardTitle>
                <CardDescription>System administration and audit trail</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm">User account created</span>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Admin created new organizer account for MIT Tech Club
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm">Event approved</span>
                      <span className="text-xs text-muted-foreground">4 hours ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Spring Career Fair approved by system administrator
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm">System maintenance</span>
                      <span className="text-xs text-muted-foreground">1 day ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Scheduled database maintenance completed successfully
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;