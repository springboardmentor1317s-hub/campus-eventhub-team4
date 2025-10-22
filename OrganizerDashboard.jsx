import React from "react";
import "./OrganizerDashboard.css";

function OrganizerDashboard() {
  return (
    <div className="dashboard-wrapper">
      {/* ===== Top Navbar ===== */}
      <header className="navbar">
        <div className="top-bar">
          <div className="logo">📅 CampusEventHub</div>

          {/* Profile Section */}
          <div className="profile-section">
            <span className="notif">🔔</span>
            <div className="profile">
              <img
                src="https://via.placeholder.com/35"
                alt="profile"
                className="profile-pic"
              />
              <div>
                <strong>Sarah Wilson</strong>
                <p className="role">College Admin</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Bottom Navigation ===== */}
        <nav className="bottom-nav">
          <a href="/events">All Events</a>
          <a href="/dashboard" className="active">Dashboard</a>
        </nav>
      </header>

      {/* ===== Dashboard Content ===== */}
      <main className="dashboard">
        <div className="dashboard-header">
          <h2>Event Organizer Dashboard</h2>
          <p>Manage your events and track performance</p>
          <button className="create-btn">+ Create Event</button>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card blue">
            <span>📅</span>
            <h3>Total Events</h3>
            <p>0</p>
          </div>
          <div className="stat-card green">
            <span>📈</span>
            <h3>Active Events</h3>
            <p>0</p>
          </div>
          <div className="stat-card purple">
            <span>👥</span>
            <h3>Total Registrations</h3>
            <p>0</p>
          </div>
          <div className="stat-card orange">
            <span>📊</span>
            <h3>Average Participants</h3>
            <p>0</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button className="active">Overview</button>
          <button>My Events</button>
          <button>Analytics</button>
        </div>

        {/* Recent + Quick Actions */}
        <div className="grid-2">
          <div className="box">
            <h4>Recent Events</h4>
            <p>No events yet</p>
          </div>
          <div className="box">
            <h4>Quick Actions</h4>
            <button className="create-btn full">+ Create New Event</button>
            <button className="secondary-btn full">View All Registrations</button>
            <button className="secondary-btn full">Export Event Data</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrganizerDashboard;
