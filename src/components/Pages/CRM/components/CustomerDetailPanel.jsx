import React, { useState, useEffect } from 'react';
import '../css/CustomerDetailPanel.css';
import { 
  FiMessageSquare, 
  FiPhone, 
  FiMail, 
  FiEdit, 
  FiClock, 
  FiShoppingBag,
  FiMapPin,
  FiDollarSign,
  FiCreditCard,
  FiTruck,
  FiStar,
  FiAlertCircle,
  FiSave,
  FiX,
  FiTrash2,
  FiUser
} from 'react-icons/fi';

function CustomerDetailPanel({ 
  customer, 
  onStartChat, 
  activeTab, 
  setActiveTab, 
  onUpdateCustomer,
  onDeleteCustomer 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(customer);

  useEffect(() => {
    setEditedCustomer(customer);
  }, [customer]);

  if (!customer) {
    return (
      <div className="crm-detail-panel empty">
        <div className="empty-state">
          <FiUser className="empty-icon" />
          <h3>Select a customer to view details</h3>
          <p>Choose a customer from the list to see their complete information</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    onUpdateCustomer(editedCustomer);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedCustomer(customer);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer(prev => ({ ...prev, [name]: value }));
  };

  const getAverageRating = () => {
    if (!customer.feedback || customer.feedback.length === 0) return 0;
    const sum = customer.feedback.reduce((acc, fb) => acc + fb.rating, 0);
    return (sum / customer.feedback.length).toFixed(1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#28a745';
      case 'premium': return '#9c27b0';
      case 'inactive': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const renderDetailsTab = () => (
    <div className="customer-details">
      <div className="crm-detail-section">
        <h4>Contact Information</h4>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">
              <FiPhone /> Phone
            </span>
            {isEditing ? (
              <input
                type="text"
                name="contact"
                value={editedCustomer.contact}
                onChange={handleChange}
                className="edit-input"
              />
            ) : (
              <span className="detail-value">{customer.contact}</span>
            )}
          </div>
          <div className="detail-item">
            <span className="detail-label">
              <FiMail /> Email
            </span>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedCustomer.email}
                onChange={handleChange}
                className="edit-input"
              />
            ) : (
              <span className="detail-value">{customer.email}</span>
            )}
          </div>
          <div className="detail-item">
            <span className="detail-label">
              <FiMapPin /> Location
            </span>
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={editedCustomer.location}
                onChange={handleChange}
                className="edit-input"
              />
            ) : (
              <span className="detail-value">{customer.location}</span>
            )}
          </div>
          <div className="detail-item">
            <span className="detail-label">Status</span>
            {isEditing ? (
              <select
                name="status"
                value={editedCustomer.status}
                onChange={handleChange}
                className="edit-input"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="premium">Premium</option>
              </select>
            ) : (
              <span 
                className="detail-value status-badge"
                style={{ color: getStatusColor(customer.status) }}
              >
                {customer.status}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="crm-detail-section">
        <h4>Business Information</h4>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Customer Type</span>
            {isEditing ? (
              <select
                name="type"
                value={editedCustomer.type}
                onChange={handleChange}
                className="edit-input"
              >
                <option value="wholesale">Wholesale</option>
                <option value="retail">Retail</option>
                <option value="institution">Institution</option>
                <option value="restaurant">Restaurant</option>
              </select>
            ) : (
              <span className="detail-value">{customer.type}</span>
            )}
          </div>
          <div className="detail-item">
            <span className="detail-label">
              <FiCreditCard /> Credit Limit
            </span>
            {isEditing ? (
              <input
                type="number"
                name="creditLimit"
                value={editedCustomer.creditLimit}
                onChange={handleChange}
                className="edit-input"
              />
            ) : (
              <span className="detail-value">₹{customer.creditLimit?.toLocaleString()}</span>
            )}
          </div>
          <div className="detail-item">
            <span className="detail-label">
              <FiDollarSign /> Outstanding
            </span>
            <span className="detail-value">₹{customer.outstandingAmount?.toLocaleString() || '0'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">
              <FiTruck /> Delivery Schedule
            </span>
            {isEditing ? (
              <select
                name="deliverySchedule"
                value={editedCustomer.deliverySchedule}
                onChange={handleChange}
                className="edit-input"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Bi-weekly">Bi-weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            ) : (
              <span className="detail-value">{customer.deliverySchedule}</span>
            )}
          </div>
        </div>
      </div>

      <div className="crm-detail-section">
        <h4>Order Statistics</h4>
        <div className="stats-grid">
          <div className="stat-card">
            <FiShoppingBag className="stat-icon" />
            <div>
              <span className="stat-value">{customer.totalOrders}</span>
              <span className="stat-label">Total Orders</span>
            </div>
          </div>
          <div className="stat-card">
            <FiDollarSign className="stat-icon" />
            <div>
              <span className="stat-value">₹{customer.totalValue?.toLocaleString() || '0'}</span>
              <span className="stat-label">Total Value</span>
            </div>
          </div>
          <div className="stat-card">
            <FiClock className="stat-icon" />
            <div>
              <span className="stat-value">
                {new Date(customer.lastOrderDate).toLocaleDateString()}
              </span>
              <span className="stat-label">Last Order</span>
            </div>
          </div>
          <div className="stat-card">
            <FiStar className="stat-icon" />
            <div>
              <span className="stat-value">{getAverageRating()}</span>
              <span className="stat-label">Avg Rating</span>
            </div>
          </div>
        </div>
      </div>

      {customer.feedback && customer.feedback.length > 0 && (
        <div className="crm-detail-section">
          <h4>Recent Feedback</h4>
          <div className="feedback-list">
            {customer.feedback.slice(0, 3).map(feedback => (
              <div key={feedback.id} className="feedback-item">
                <div className="feedback-header">
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={i < feedback.rating ? 'star-filled' : 'star-empty'} />
                    ))}
                    <span className="rating-text">{feedback.rating}/5</span>
                  </div>
                  <span className="date">{new Date(feedback.date).toLocaleDateString()}</span>
                </div>
                <p className="comment">{feedback.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {customer.complaints && customer.complaints.length > 0 && (
        <div className="crm-detail-section">
          <h4>Complaints & Issues</h4>
          <div className="complaints-list">
            {customer.complaints.map(complaint => (
              <div key={complaint.id} className="complaint-item">
                <div className="complaint-header">
                  <FiAlertCircle className="complaint-icon" />
                  <span className="complaint-issue">{complaint.issue}</span>
                  <span className={`complaint-status ${complaint.status}`}>
                    {complaint.status}
                  </span>
                </div>
                <div className="complaint-date">
                  Date: {new Date(complaint.date).toLocaleDateString()}
                </div>
                {complaint.notes && (
                  <div className="complaint-notes">
                    Notes: {complaint.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderNotesTab = () => (
    <div className="customer-notes">
      <div className="crm-notes-section">
        <h4>Customer Notes</h4>
        {isEditing ? (
          <textarea
            name="notes"
            value={editedCustomer.notes}
            onChange={handleChange}
            className="edit-textarea"
            rows="8"
            placeholder="Add notes about this customer..."
          />
        ) : (
          <div className="notes-content">
            {customer.notes || 'No notes available for this customer.'}
          </div>
        )}
      </div>
      
      {customer.tags && customer.tags.length > 0 && (
        <div className="crm-tags-section">
          <h4>Customer Tags</h4>
          <div className="tags-list">
            {customer.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="crm-detail-panel">
      <div className="crm-customer-header">
        <div className="customer-avatar large">
          {customer.name.charAt(0)}
        </div>
        
        <div className="customer-title">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedCustomer.name}
              onChange={handleChange}
              className="edit-input large"
            />
          ) : (
            <h2>{customer.name}</h2>
          )}
          <p className="customer-since">
            <FiClock /> Customer since {new Date(customer.customerSince).toLocaleDateString()}
          </p>
        </div>
        
        <div className="customer-actions">
          <button 
            className="icon-btn chat-btn"
            onClick={() => onStartChat(customer)}
            title="Start Chat"
            aria-label="Start chat with customer"
          >
            <FiMessageSquare />
          </button>
          {isEditing ? (
            <>
              <button 
                className="icon-btn save-btn"
                onClick={handleSave}
                title="Save Changes"
                aria-label="Save customer changes"
              >
                <FiSave />
              </button>
              <button 
                className="icon-btn cancel-btn"
                onClick={handleCancel}
                title="Cancel Edit"
                aria-label="Cancel editing customer"
              >
                <FiX />
              </button>
            </>
          ) : (
            <button 
              className="icon-btn edit-btn"
              onClick={() => setIsEditing(true)}
              title="Edit Customer"
              aria-label="Edit customer information"
            >
              <FiEdit />
            </button>
          )}
          <button 
            className="icon-btn delete-btn"
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete ${customer.name}?`)) {
                onDeleteCustomer(customer.id);
              }
            }}
            title="Delete Customer"
            aria-label="Delete customer permanently"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
        <button 
          className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          Notes
        </button>
      </div>

      <div className="crm-tab-content">
        {activeTab === 'details' && renderDetailsTab()}
        {activeTab === 'notes' && renderNotesTab()}
      </div>
    </div>
  );
}

export default CustomerDetailPanel;