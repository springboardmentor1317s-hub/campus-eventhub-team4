import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Navbar */}
      <header className="navbar">
        <h2 className="logo">Campus Event Hub</h2>
        
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Campus Event Hub 🎉</h1>
          <p>Discover, join, and manage exciting events happening around campus.</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn primary">Get Started</Link>
            <Link to="/login" className="btn secondary">Login</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h3>🎭 Cultural Events</h3>
          <p>Find music, dance, and art events hosted by your peers.</p>
        </div>
        <div className="feature-card">
          <h3>📚 Workshops</h3>
          <p>Learn new skills and enhance your knowledge with workshops.</p>
        </div>
        <div className="feature-card">
          <h3>🏆 Competitions</h3>
          <p>Showcase your talent in hackathons, quizzes, and contests.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Campus Event Hub | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default Home;
