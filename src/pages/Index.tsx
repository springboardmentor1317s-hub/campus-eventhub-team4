import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroStudentsImage from "@/assets/hero-students.jpg";
import campusBackgroundImage from "@/assets/campus-background.jpg";

const Index = () => {
  return (
    <div 
      className="min-h-screen bg-dark text-dark-text relative"
      style={{
        backgroundImage: `linear-gradient(rgba(34, 40, 49, 0.8), rgba(34, 40, 49, 0.8)), url(${campusBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header */}
      <header className="bg-dark-surface/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                CampusEventHub
              </h1>
            </div>
            
            {/* Center Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <a href="#features" className="text-dark-text-secondary hover:text-dark-text transition-colors">
                Features
              </a>
              <a href="#students" className="text-dark-text-secondary hover:text-dark-text transition-colors">
                For Students
              </a>
              <a href="#organizers" className="text-dark-text-secondary hover:text-dark-text transition-colors">
                For Organizers
              </a>
              <a href="#contact" className="text-dark-text-secondary hover:text-dark-text transition-colors">
                Contact
              </a>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-dark-text-secondary hover:text-dark-text">
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

      {/* Hero Section - Two Column Layout */}
      <section className="pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            
            {/* Left Column - Text Content */}
            <div className="space-y-8 lg:pr-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="text-dark-text">Extraordinary</span>
                  <br />
                  <span className="bg-gradient-hero bg-clip-text text-transparent">
                    Campus Events,
                  </span>
                  <br />
                  <span className="text-dark-text">Every Day.</span>
                </h1>
                
                <p className="text-xl text-dark-text-secondary leading-relaxed max-w-lg">
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
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 w-full sm:w-auto border-dark-text-secondary text-dark-text-secondary hover:bg-white/10">
                  Request a Demo
                </Button>
              </div>
            </div>

            {/* Right Column - Visual Content */}
            <div className="relative">
              <div className="bg-hero-accent rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                <img 
                  src={heroStudentsImage} 
                  alt="Students engaged in campus events" 
                  className="w-full h-[500px] object-cover rounded-xl"
                />
                
                {/* Overlay UI Elements */}
                <div className="absolute top-12 left-12">
                  <Badge className="bg-red-500 text-white px-3 py-1 animate-pulse">
                    LIVE
                  </Badge>
                </div>
                
                <div className="absolute bottom-12 right-12 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        Sarah M.
                      </p>
                      <p className="text-xs text-gray-600">
                        "Amazing hackathon experience! 🚀"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-surface/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-text mb-4">
              Everything You Need for Campus Events
            </h2>
            <p className="text-xl text-dark-text-secondary max-w-2xl mx-auto">
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
              <div key={index} className="text-center p-6 bg-dark-surface/80 rounded-xl backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-dark-text">{feature.title}</h3>
                <p className="text-dark-text-secondary">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students already using CampusEventHub to discover and manage amazing campus experiences.
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