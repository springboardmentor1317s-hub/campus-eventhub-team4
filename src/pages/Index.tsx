import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import campusBackgroundImage from "@/assets/campus-background.jpg";

const Index = () => {
  return (
    <div 
      className="min-h-screen bg-background text-foreground relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${campusBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                CampusEventHub
              </h1>
            </div>
            
            {/* Center Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#students" className="text-muted-foreground hover:text-foreground transition-colors">
                For Students
              </a>
              <a href="#organizers" className="text-muted-foreground hover:text-foreground transition-colors">
                For Organizers
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="gradient" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Single Column Layout */}
      <section className="pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="min-h-[80vh] flex items-center">
            
            {/* Text Content - Left Aligned */}
            <div className="space-y-8 max-w-2xl">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="text-foreground">Extraordinary</span>
                  <br />
                  <span className="bg-gradient-hero bg-clip-text text-transparent">
                    Campus Events,
                  </span>
                  <br />
                  <span className="text-foreground">Every Day.</span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Plan, manage, and discover unforgettable events. Connect students and colleges seamlessly on one centralized platform.
                </p>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/events">
                  <Button size="lg" variant="gradient" className="text-lg px-8 py-4 w-full sm:w-auto">
                    Explore Events
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 w-full sm:w-auto">
                  Request a Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need for Campus Events
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Streamlined event management and discovery for the modern campus
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "📅", title: "Event Discovery", desc: "Find events that match your interests and schedule" },
              { icon: "👥", title: "Community", desc: "Connect with like-minded students and build networks" },
              { icon: "🏆", title: "Competitions", desc: "Participate in hackathons, contests, and challenges" },
              { icon: "🏫", title: "Campus Wide", desc: "Events from all departments and organizations" }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-card rounded-xl border hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students already using CampusEventHub to discover and manage amazing campus experiences.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;