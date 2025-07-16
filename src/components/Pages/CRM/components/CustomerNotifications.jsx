import React, { useState, useEffect, useRef } from 'react';
import '../css/CustomerNotifications.css';
import { 
  FiBell, 
  FiX, 
  FiCheck, 
  FiInfo,
  FiShoppingBag,
  FiDollarSign,
  FiClock,
  FiUser,
  FiTruck,
  FiMail,
  FiMessageSquare,
  FiSettings,
  FiTrash2
} from 'react-icons/fi';

function CustomerNotifications({ onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    // Generate sample notifications
    const sampleNotifications = [
      {
        id: 1,
        type: 'order',
        title: 'New Order Received',
        message: 'ABC Dairy placed a new order worth ₹5,500',
        customer: 'ABC Dairy',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false,
        priority: 'high',
        icon: FiShoppingBag,
        color: '#4cc9f0',
        action: 'View Order'
      },
      {
        id: 2,
        type: 'payment',
        title: 'Payment Overdue',
        message: 'XYZ Restaurant has an overdue payment of ₹12,000',
        customer: 'XYZ Restaurant',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
        priority: 'high',
        icon: FiDollarSign,
        color: '#dc3545',
        action: 'Send Reminder'
      },
      {
        id: 3,
        type: 'delivery',
        title: 'Delivery Scheduled',
        message: 'Delivery scheduled for Mumbai Cafe at 10:00 AM',
        customer: 'Mumbai Cafe',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        read: true,
        priority: 'medium',
        icon: FiTruck,
        color: '#9c27b0',
        action: 'View Route'
      },
      {
        id: 4,
        type: 'customer',
        title: 'New Customer Registration',
        message: 'Delhi Sweets registered as a new customer',
        customer: 'Delhi Sweets',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        read: true,
        priority: 'low',
        icon: FiUser,
        color: '#28a745',
        action: 'View Profile'
      },
      {
        id: 5,
        type: 'reminder',
        title: 'Follow-up Reminder',
        message: 'Follow up with Kolkata Dairy about their inquiry',
        customer: 'Kolkata Dairy',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        read: false,
        priority: 'medium',
        icon: FiClock,
        color: '#f8961e',
        action: 'Call Now'
      },
      {
        id: 6,
        type: 'email',
        title: 'Email Campaign Sent',
        message: 'Monthly newsletter sent to 150 customers',
        customer: 'All Customers',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        read: true,
        priority: 'low',
        icon: FiMail,
        color: '#17a2b8',
        action: 'View Report'
      },
      {
        id: 7,
        type: 'chat',
        title: 'New Chat Message',
        message: 'Chennai Foods sent a message about delivery timing',
        customer: 'Chennai Foods',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: false,
        priority: 'medium',
        icon: FiMessageSquare,
        color: '#4361ee',
        action: 'Reply'
      },
      {
        id: 8,
        type: 'system',
        title: 'System Update',
        message: 'CRM system updated with new features',
        customer: 'System',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        read: true,
        priority: 'low',
        icon: FiInfo,
        color: '#6c757d',
        action: 'Learn More'
      }
    ];

    setNotifications(sampleNotifications);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#f8961e';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  return (
    <div className="notifications-overlay">
      <div className="notifications-panel" ref={panelRef}>
        <div className="notifications-header">
          <div className="header-left">
            <h3>
              <FiBell /> Notifications
              {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
            </h3>
          </div>
          <div className="header-actions">
            <button 
              className="icon-btn settings-btn"
              onClick={() => setShowSettings(!showSettings)}
              title="Settings"
            >
              <FiSettings />
            </button>
            <button className="icon-btn close-btn" onClick={onClose}>
              <FiX />
            </button>
          </div>
        </div>

        {showSettings && (
          <div className="notification-settings">
            <h4>Notification Settings</h4>
            <div className="settings-options">
              <label className="setting-item">
                <input type="checkbox" defaultChecked />
                <span>Order notifications</span>
              </label>
              <label className="setting-item">
                <input type="checkbox" defaultChecked />
                <span>Payment reminders</span>
              </label>
              <label className="setting-item">
                <input type="checkbox" defaultChecked />
                <span>Delivery updates</span>
              </label>
              <label className="setting-item">
                <input type="checkbox" defaultChecked />
                <span>Customer messages</span>
              </label>
              <label className="setting-item">
                <input type="checkbox" />
                <span>System updates</span>
              </label>
            </div>
          </div>
        )}

        <div className="notifications-filters">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({notifications.length})
            </button>
            <button 
              className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
              onClick={() => setFilter('unread')}
            >
              Unread ({unreadCount})
            </button>
            <button 
              className={`filter-btn ${filter === 'order' ? 'active' : ''}`}
              onClick={() => setFilter('order')}
            >
              Orders
            </button>
            <button 
              className={`filter-btn ${filter === 'payment' ? 'active' : ''}`}
              onClick={() => setFilter('payment')}
            >
              Payments
            </button>
          </div>
          
          <div className="bulk-actions">
            {unreadCount > 0 && (
              <button className="action-btn" onClick={markAllAsRead}>
                <FiCheck /> Mark All Read
              </button>
            )}
            {notifications.length > 0 && (
              <button className="action-btn danger" onClick={clearAllNotifications}>
                <FiTrash2 /> Clear All
              </button>
            )}
          </div>
        </div>

        <div className="notifications-list">
          {filteredNotifications.length === 0 ? (
            <div className="empty-notifications">
              <FiBell className="empty-icon" />
              <h4>No notifications</h4>
              <p>You're all caught up!</p>
            </div>
          ) : (
            filteredNotifications.map(notification => {
              const IconComponent = notification.icon;
              return (
                <div 
                  key={notification.id} 
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-icon" style={{ backgroundColor: notification.color }}>
                    <IconComponent />
                  </div>
                  
                  <div className="notification-content">
                    <div className="notification-header">
                      <h5>{notification.title}</h5>
                      <div className="notification-meta">
                        <span 
                          className="priority-indicator"
                          style={{ backgroundColor: getPriorityColor(notification.priority) }}
                        ></span>
                        <span className="timestamp">{formatTimestamp(notification.timestamp)}</span>
                      </div>
                    </div>
                    
                    <p className="notification-message">{notification.message}</p>
                    
                    <div className="notification-footer">
                      <span className="customer-name">{notification.customer}</span>
                      <button className="action-link">{notification.action}</button>
                    </div>
                  </div>
                  
                  <div className="notification-actions">
                    {!notification.read && (
                      <button 
                        className="mark-read-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                        title="Mark as read"
                      >
                        <FiCheck />
                      </button>
                    )}
                    <button 
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      title="Delete notification"
                    >
                      <FiX />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {filteredNotifications.length > 0 && (
          <div className="notifications-footer">
            <button className="view-all-btn">
              View All Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerNotifications;