import React from 'react';
import Navbar from './Navbar';
import '../css/Dashboard.css';

interface DashboardProps {
  username: string;
}

const Dashboard: React.FC<DashboardProps> = ({ username }) => {
  return (
    <div className="dashboard">
      <Navbar username={username} />
      <div className="dashboard-content">
        <h2>Dashboard</h2>
        <p>Welcome to your dashboard, {username}!</p>
        {/* Add more dashboard content here */}
      </div>
    </div>
  );
};

export default Dashboard;
