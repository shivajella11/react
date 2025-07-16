import React from 'react';
import '../css/EnhancedCustomerList.css';
import { 
  FiMessageSquare, 
  FiUser, 
  FiTrash2, 
  FiCheckSquare,
  FiSquare,
  FiMail,
  FiPhone,
  FiMapPin
} from 'react-icons/fi';

function EnhancedCustomerList({ 
  customers, 
  onSelectCustomer, 
  selectedId, 
  onStartChat,
  selectedCustomers = [],
  onSelectCustomers,
  onDeleteCustomer
}) {
  const handleSelectCustomer = (customerId) => {
    const newSelected = selectedCustomers.includes(customerId)
      ? selectedCustomers.filter(id => id !== customerId)
      : [...selectedCustomers, customerId];
    onSelectCustomers(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedCustomers.length === customers.length) {
      onSelectCustomers([]);
    } else {
      onSelectCustomers(customers.map(c => c.id));
    }
  };

  const getCustomerAvatar = (customer) => {
    return customer.name.charAt(0).toUpperCase();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#28a745';
      case 'premium': return '#9c27b0';
      case 'inactive': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div className="crm-customer-list-container">
      <div className="crm-customer-list-header">
        <div className="customer-header-content">
          <h3>Customer Directory</h3>
          <span className="count-badge">{customers.length} customers</span>
          <button 
            className="select-all"
            onClick={handleSelectAll}
            title={selectedCustomers.length === customers.length ? 'Deselect All' : 'Select All'}
          >
            {selectedCustomers.length === customers.length ? <FiCheckSquare /> : <FiSquare />}
          </button>
        </div>
      </div>
      
      <div className="crm-customer-list">
        {customers.length === 0 ? (
          <div className="empty-state">
            <FiUser className="empty-icon" />
            <h4>No customers found</h4>
            <p>No customers match your current search criteria</p>
          </div>
        ) : (
          customers.map(customer => (
            <div 
              key={customer.id}
              className={`crm-customer-card ${selectedId === customer.id ? 'active' : ''} ${
                selectedCustomers.includes(customer.id) ? 'selected' : ''
              }`}
            >
              <div className="card-header">
                <div className="selection-area">
                  <button 
                    className="icon-btn select-checkbox"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCustomer(customer.id);
                    }}
                  >
                    {selectedCustomers.includes(customer.id) ? <FiCheckSquare /> : <FiSquare />}
                  </button>
                </div>
                
                <div 
                  className="customer-info-area"
                  onClick={() => onSelectCustomer(customer)}
                >
                  <div className="customer-avatar">
                    {getCustomerAvatar(customer)}
                  </div>
                  
                  <div className="customer-info">
                    <h4>{customer.name}</h4>
                    <div className="customer-meta">
                      <span className="contact-info">
                        <FiPhone className="meta-icon" />
                        {customer.contact}
                      </span>
                      <span className="email-info">
                        <FiMail className="meta-icon" />
                        {customer.email}
                      </span>
                      <span className="location-info">
                        <FiMapPin className="meta-icon" />
                        {customer.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card-body">
                <div className="crm-customer-stats">
                  <div className="crm-stat-item">
                    <span className="crm-stat-value">{customer.totalOrders}</span>
                    <span className="crm-stat-label">Orders</span>
                  </div>
                  <div className="crm-stat-item">
                    <span className="crm-stat-value">₹{customer.totalValue?.toLocaleString() || '0'}</span>
                    <span className="crm-stat-label">Value</span>
                  </div>
                  <div className="crm-stat-item">
                    <span 
                      className="crm-stat-value status-indicator"
                      style={{ backgroundColor: getStatusColor(customer.status) }}
                    >
                      {customer.status === 'active' ? '✅' : customer.status === 'inactive' ? '❌' : '⭐'} {customer.status}
                    </span>
                    <span className="crm-stat-label">Status</span>
                  </div>
                </div>
                
                <div className="crm-customer-details">
                  <div className="crm-detail-row">
                    <span className="crm-detail-label">Type:</span>
                    <span className="crm-detail-value">{customer.type}</span>
                  </div>
                  <div className="crm-detail-row">
                    <span className="crm-detail-label">Credit:</span>
                    <span className="crm-detail-value">₹{customer.creditLimit?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="crm-detail-row">
                    <span className="crm-detail-label">Outstanding:</span>
                    <span className="crm-detail-value">₹{customer.outstandingAmount?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="crm-detail-row">
                    <span className="crm-detail-label">Schedule:</span>
                    <span className="crm-detail-value">{customer.deliverySchedule}</span>
                  </div>
                  <div className="crm-detail-row">
                    <span className="crm-detail-label">Since:</span>
                    <span className="crm-detail-value">{new Date(customer.customerSince).toLocaleDateString()}</span>
                  </div>
                  <div className="crm-detail-row">
                    <span className="crm-detail-label">Last Order:</span>
                    <span className="crm-detail-value">{new Date(customer.lastOrderDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {customer.tags && customer.tags.length > 0 && (
                  <div className="crm-customer-tags">
                    {customer.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="crm-tag">{tag}</span>
                    ))}
                    {customer.tags.length > 3 && (
                      <span className="crm-tag more">+{customer.tags.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="crm-card-actions">
                <button 
                  className="icon-btn chat-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartChat(customer);
                  }}
                  title="Start Chat"
                >
                  <FiMessageSquare />
                </button>
                <button 
                  className="icon-btn delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`Are you sure you want to delete ${customer.name}?`)) {
                      onDeleteCustomer(customer.id);
                    }
                  }}
                  title="Delete Customer"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EnhancedCustomerList;