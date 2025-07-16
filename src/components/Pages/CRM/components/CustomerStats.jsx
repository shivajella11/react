import React from 'react';
import '../css/CustomerStats.css';
import { 
  FiUsers, 
  FiDollarSign, 
  FiStar, 
  FiClock,
  FiShoppingBag,
  FiAlertCircle
} from 'react-icons/fi';

function CustomerStats({ customers }) {
  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    premium: customers.filter(c => c.status === 'premium').length,
    inactive: customers.filter(c => c.status === 'inactive').length,
    totalOrders: customers.reduce((sum, c) => sum + c.totalOrders, 0),
    totalRevenue: customers.reduce((sum, c) => sum + (c.totalValue || 0), 0),
    avgOrderValue: customers.length > 0 ? 
      customers.reduce((sum, c) => sum + (c.averageOrderValue || 0), 0) / customers.length : 0,
    avgRating: customers.length > 0 ? 
      customers.reduce((sum, c) => {
        const avgRating = c.feedback.length > 0 ? 
          c.feedback.reduce((rSum, f) => rSum + f.rating, 0) / c.feedback.length : 0;
        return sum + avgRating;
      }, 0) / customers.length : 0,
    pendingComplaints: customers.reduce((sum, c) => 
      sum + c.complaints.filter(comp => comp.status === 'pending').length, 0),
    recentActivity: customers.filter(c => {
      const lastOrderDate = new Date(c.lastOrderDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return lastOrderDate >= thirtyDaysAgo;
    }).length
  };

  return (
    <div className="customer-stats">
      <div className="customer-stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">
            <FiUsers />
          </div>
          <div className="stat-content">
            <div className="stat-main">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Customers</div>
            </div>
            <div className="stat-breakdown">
              <span className="active-count">{stats.active} Active</span>
              <span className="premium-count">{stats.premium} Premium</span>
              <span className="inactive-count">{stats.inactive} Inactive</span>
            </div>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">
            <FiShoppingBag />
          </div>
          <div className="stat-content">
            <div className="stat-main">
              <div className="stat-value">{stats.totalOrders}</div>
              <div className="stat-label">Total Orders</div>
            </div>
            <div className="stat-breakdown">
              <span>Avg: {Math.round(stats.totalOrders / (stats.total || 1))} per customer</span>
            </div>
          </div>
        </div>

        <div className="stat-card revenue">
          <div className="stat-icon">
            <FiDollarSign />
          </div>
          <div className="stat-content">
            <div className="stat-main">
              <div className="stat-value">₹{stats.totalRevenue.toLocaleString()}</div>
              <div className="stat-label">Total Revenue</div>
            </div>
            <div className="stat-breakdown">
              <span>Avg Order: ₹{Math.round(stats.avgOrderValue)}</span>
            </div>
          </div>
        </div>

        <div className="stat-card rating">
          <div className="stat-icon">
            <FiStar />
          </div>
          <div className="stat-content">
            <div className="stat-main">
              <div className="stat-value">{stats.avgRating.toFixed(1)}</div>
              <div className="stat-label">Avg Rating</div>
            </div>
            <div className="stat-breakdown">
              <span>Customer Satisfaction</span>
            </div>
          </div>
        </div>

        <div className="stat-card activity">
          <div className="stat-icon">
            <FiClock />
          </div>
          <div className="stat-content">
            <div className="stat-main">
              <div className="stat-value">{stats.recentActivity}</div>
              <div className="stat-label">Active (30 days)</div>
            </div>
            <div className="stat-breakdown">
              <span>{Math.round((stats.recentActivity / stats.total) * 100)}% of customers</span>
            </div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <FiAlertCircle />
          </div>
          <div className="stat-content">
            <div className="stat-main">
              <div className="stat-value">{stats.pendingComplaints}</div>
              <div className="stat-label">Pending Issues</div>
            </div>
            <div className="stat-breakdown">
              <span>Require attention</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerStats;