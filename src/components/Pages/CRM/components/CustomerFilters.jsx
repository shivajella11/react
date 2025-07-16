import React from 'react';
import '../css/CustomerFilters.css';
import { FiFilter, FiShoppingBag, FiMapPin, FiTrendingUp } from 'react-icons/fi';

function CustomerFilters({ filters, onFiltersChange, locations }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="customer-filters">
      <div className="filter-group" data-filter="status">
        <FiFilter className="filter-icon" />
        <label>Status:</label>
        <select 
          value={filters.status} 
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="premium">Premium</option>
        </select>
      </div>

      <div className="filter-group" data-filter="type">
        <FiShoppingBag className="filter-icon" />
        <label>Type:</label>
        <select 
          value={filters.type} 
          onChange={(e) => handleFilterChange('type', e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="wholesale">Wholesale</option>
          <option value="retail">Retail</option>
          <option value="institution">Institution</option>
          <option value="restaurant">Restaurant</option>
        </select>
      </div>

      <div className="filter-group" data-filter="location">
        <FiMapPin className="filter-icon" />
        <label>Location:</label>
        <select 
          value={filters.location} 
          onChange={(e) => handleFilterChange('location', e.target.value)}
        >
          <option value="all">All Locations</option>
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>

      <div className="filter-group" data-filter="sort">
        <FiTrendingUp className="filter-icon" />
        <label>Sort By:</label>
        <select 
          value={filters.sortBy} 
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
        >
          <option value="recent">Recent Activity</option>
          <option value="orders">Total Orders</option>
          <option value="value">Total Value</option>
          <option value="oldest">Oldest First</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>
    </div>
  );
}

export default CustomerFilters;