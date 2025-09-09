import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Trophy, MapPin } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">CampusEventHub</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/events" className="text-muted-foreground hover:text-primary transition-colors">
                Events
              </Link>
              <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">
                Sign In
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="gradient">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Discover Amazing
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Campus Events
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Connect with your campus community through exciting events, competitions, and networking opportunities. Join thousands of students in making unforgettable memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events">
              <Button size="lg" variant="hero" className="text-lg px-8 py-4">
                Explore Events
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need for Campus Events
            </h2>
            <p className="text-xl text-muted-foreground">
              Streamlined event management and discovery for the modern campus
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Event Discovery</h3>
              <p className="text-muted-foreground">
                Find events that match your interests and schedule
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">
                Connect with like-minded students and build networks
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Competitions</h3>
              <p className="text-muted-foreground">
                Participate in hackathons, contests, and challenges
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Campus Wide</h3>
              <p className="text-muted-foreground">
                Events from all departments and organizations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students already using CampusEventHub
          </p>
          <Link to="/register">
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;