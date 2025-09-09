import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-subtle">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/">
            <Button variant="gradient" size="lg" className="w-full">
              Return to Home
            </Button>
          </Link>
          <Link to="/events">
            <Button variant="outline" size="lg" className="w-full">
              Browse Events
            </Button>
          </Link>
        </div>
        
        <div className="mt-8">
          <Link to="/" className="text-primary hover:underline">
            ← Back to CampusEventHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
