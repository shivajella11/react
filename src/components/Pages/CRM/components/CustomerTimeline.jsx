import React, { useState, useEffect, useCallback } from 'react';
import '../css/CustomerTimeline.css';
import { 
  FiClock, 
  FiShoppingBag, 
  FiPhone, 
  FiMail, 
  FiMessageSquare,
  FiDollarSign,
  FiTruck,
  FiAlertCircle,
  FiStar,
  FiUser,
  FiEdit,
  FiCalendar,
  FiFilter,
  FiSearch,
  FiPlus,
  FiDownload,
  FiRefreshCw,
  FiChevronDown,
  FiChevronUp,
  FiSave,
  FiX,
  FiBarChart2,
  FiTrendingUp,
  FiActivity,
  FiEye,
  FiMoreHorizontal,
  FiFlag,
  FiUsers,
  FiSettings,
  FiPlay,
  FiPause,
  FiWifi,
  FiWifiOff
} from 'react-icons/fi';

function CustomerTimeline({ customer }) {
  // Enhanced State Management
  const [filterType, setFilterType] = useState('all');
  const [timeRange, setTimeRange] = useState('30days');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [expandedActivities, setExpandedActivities] = useState(new Set());
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [isRealTimeActive, setIsRealTimeActive] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('detailed'); // detailed, compact, cards
  const [showExportModal, setShowExportModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activityStats, setActivityStats] = useState({});
  
  // Advanced Features State
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showActivityDetails, setShowActivityDetails] = useState(null);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showTagManager, setShowTagManager] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds
  
  // Advanced Filtering State
  const [advancedFilters, setAdvancedFilters] = useState({
    priority: 'all',
    assignedTo: 'all',
    status: 'all',
    tags: [],
    dateRange: 'all',
    activityTypes: [],
    hasNotes: 'all',
    hasAttachments: 'all'
  });
  
  // Bulk Operations State
  const [bulkOperation, setBulkOperation] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  
  // Templates State
  const [activityTemplates, setActivityTemplates] = useState([
    {
      id: 1,
      name: 'Follow-up Call',
      type: 'call',
      title: 'Follow-up call with {customer}',
      description: 'Scheduled follow-up call to discuss {topic}',
      priority: 'medium',
      tags: ['follow-up', 'call']
    },
    {
      id: 2,
      name: 'Order Confirmation',
      type: 'order',
      title: 'Order confirmation for {customer}',
      description: 'Confirm order details and delivery schedule',
      priority: 'high',
      tags: ['order', 'confirmation']
    },
    {
      id: 3,
      name: 'Payment Reminder',
      type: 'email',
      title: 'Payment reminder for {customer}',
      description: 'Send payment reminder for outstanding invoice',
      priority: 'high',
      tags: ['payment', 'reminder']
    }
  ]);
  
  // Tags Management
  const [availableTags, setAvailableTags] = useState([
    'urgent', 'follow-up', 'payment', 'delivery', 'complaint', 'feedback',
    'order', 'call', 'email', 'meeting', 'reminder', 'confirmation'
  ]);
  
  // Activity Status Options
  const activityStatuses = ['pending', 'in-progress', 'completed', 'cancelled', 'on-hold'];
  const priorityLevels = ['low', 'medium', 'high', 'urgent'];
  const assigneeOptions = ['Sales Team', 'Customer Service', 'Account Manager', 'Delivery Team', 'Finance Team'];

  // New Activity Form State
  const [newActivity, setNewActivity] = useState({
    type: 'call',
    title: '',
    description: '',
    priority: 'medium',
    assignedTo: '',
    dueDate: '',
    notes: ''
  });

  // Activity Notes State
  const [activityNotes, setActivityNotes] = useState({});
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteText, setNoteText] = useState('');

  // Real-time simulation
  useEffect(() => {
    if (!isRealTimeActive) return;
    
    const interval = setInterval(() => {
      // Simulate real-time activity updates
      const shouldAddActivity = Math.random() < 0.1; // 10% chance every 5 seconds
      if (shouldAddActivity) {
        const newNotification = {
          id: Date.now(),
          message: 'New activity detected',
          timestamp: new Date(),
          type: 'info'
        };
        setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isRealTimeActive]);

  // Calculate activity statistics
  useEffect(() => {
    const timelineData = generateTimelineData();
    const stats = calculateActivityStats(timelineData);
    setActivityStats(stats);
  }, [customer, filterType, timeRange, searchTerm, startDate, endDate]);

  const calculateActivityStats = (activities) => {
    const stats = {
      totalActivities: activities.length,
      byType: {},
      byMonth: {},
      responseTime: 0,
      completionRate: 0
    };

    activities.forEach(activity => {
      // Count by type
      stats.byType[activity.type] = (stats.byType[activity.type] || 0) + 1;
      
      // Count by month
      const month = activity.timestamp.toISOString().slice(0, 7);
      stats.byMonth[month] = (stats.byMonth[month] || 0) + 1;
    });

    return stats;
  };

  // Enhanced Timeline Data Generation
  const generateTimelineData = useCallback(() => {
    if (!customer) return [];

    const activities = [
      {
        id: 1,
        type: 'order',
        title: 'New Order Placed',
        description: 'Order #ORD-2024-001 for ₹5,500',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        icon: FiShoppingBag,
        color: '#4cc9f0',
        priority: 'high',
        assignedTo: 'Sales Team',
        tags: ['urgent', 'bulk-order'],
        details: {
          orderId: 'ORD-2024-001',
          amount: 5500,
          items: ['Milk - 20L', 'Butter - 2kg', 'Cheese - 1kg'],
          status: 'Processing',
          estimatedDelivery: '2024-01-15',
          paymentStatus: 'Pending'
        }
      },
      {
        id: 2,
        type: 'payment',
        title: 'Payment Received',
        description: 'Payment of ₹8,200 received via UPI',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        icon: FiDollarSign,
        color: '#28a745',
        details: {
          amount: 8200,
          method: 'UPI',
          transactionId: 'TXN123456789',
          status: 'Completed'
        }
      },
      {
        id: 3,
        type: 'call',
        title: 'Phone Call',
        description: 'Outbound call - Discussed delivery schedule',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        icon: FiPhone,
        color: '#f8961e',
        details: {
          duration: '8 minutes',
          type: 'Outbound',
          purpose: 'Delivery Schedule Discussion',
          outcome: 'Positive'
        }
      },
      {
        id: 4,
        type: 'delivery',
        title: 'Order Delivered',
        description: 'Order #ORD-2024-002 delivered successfully',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        icon: FiTruck,
        color: '#9c27b0',
        details: {
          orderId: 'ORD-2024-002',
          deliveryTime: '10:30 AM',
          deliveredBy: 'Raj Kumar',
          signature: 'Received'
        }
      },
      {
        id: 5,
        type: 'email',
        title: 'Email Sent',
        description: 'Monthly invoice and product catalog sent',
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        icon: FiMail,
        color: '#17a2b8',
        details: {
          subject: 'Monthly Invoice & Product Catalog',
          status: 'Delivered',
          opened: true,
          clickedLinks: 2
        }
      },
      {
        id: 6,
        type: 'feedback',
        title: 'Feedback Received',
        description: '5-star rating with positive comments',
        timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
        icon: FiStar,
        color: '#ffc107',
        details: {
          rating: 5,
          comment: 'Excellent service and quality products. Very satisfied!',
          category: 'Product Quality'
        }
      },
      {
        id: 7,
        type: 'complaint',
        title: 'Complaint Logged',
        description: 'Late delivery complaint - Resolved',
        timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        icon: FiAlertCircle,
        color: '#dc3545',
        details: {
          issue: 'Late Delivery',
          priority: 'Medium',
          status: 'Resolved',
          resolution: 'Delivery process improved, compensation provided'
        }
      },
      {
        id: 8,
        type: 'profile',
        title: 'Profile Updated',
        description: 'Customer updated delivery address',
        timestamp: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
        icon: FiEdit,
        color: '#6c757d',
        details: {
          field: 'Delivery Address',
          oldValue: 'Old Address, Mumbai',
          newValue: 'New Address, Mumbai',
          updatedBy: 'Customer'
        }
      },
      {
        id: 9,
        type: 'chat',
        title: 'Live Chat Session',
        description: 'Customer inquiry about new products',
        timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        icon: FiMessageSquare,
        color: '#4361ee',
        details: {
          duration: '15 minutes',
          messages: 12,
          resolved: true,
          topic: 'Product Inquiry'
        }
      },
      {
        id: 10,
        type: 'registration',
        title: 'Customer Registered',
        description: 'New customer account created',
        timestamp: new Date(customer.customerSince),
        icon: FiUser,
        color: '#28a745',
        details: {
          source: 'Website',
          referral: 'Google Search',
          initialOrder: true
        }
      }
    ];

    // Filter by type
    let filteredActivities = activities;
    if (filterType !== 'all') {
      filteredActivities = activities.filter(activity => activity.type === filterType);
    }

    // Filter by time range
    const now = new Date();
    const daysAgo = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90;
    const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
    
    filteredActivities = filteredActivities.filter(activity => 
      activity.timestamp >= cutoffDate
    );

    // Apply search filter
    if (searchTerm) {
      filteredActivities = filteredActivities.filter(activity => 
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (activity.details && JSON.stringify(activity.details).toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply custom date range
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredActivities = filteredActivities.filter(activity => 
        activity.timestamp >= start && activity.timestamp <= end
      );
    }

    // Apply sorting
    filteredActivities.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.timestamp - a.timestamp;
        case 'oldest':
          return a.timestamp - b.timestamp;
        case 'type':
          return a.type.localeCompare(b.type);
        case 'priority':
          const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
        default:
          return b.timestamp - a.timestamp;
      }
    });

    return filteredActivities;
  }, [customer, filterType, timeRange, searchTerm, startDate, endDate, sortBy]);

  // Activity Management Functions
  const handleAddActivity = () => {
    if (!newActivity.title || !newActivity.description) return;
    
    const activity = {
      id: Date.now(),
      type: newActivity.type,
      title: newActivity.title,
      description: newActivity.description,
      timestamp: new Date(),
      priority: newActivity.priority,
      assignedTo: newActivity.assignedTo,
      dueDate: newActivity.dueDate,
      notes: newActivity.notes,
      icon: getIconForType(newActivity.type),
      color: getColorForType(newActivity.type),
      details: {
        createdBy: 'Current User',
        status: 'Pending',
        priority: newActivity.priority
      }
    };

    // In real implementation, this would be an API call
    console.log('Adding new activity:', activity);
    
    setNewActivity({
      type: 'call',
      title: '',
      description: '',
      priority: 'medium',
      assignedTo: '',
      dueDate: '',
      notes: ''
    });
    setShowAddActivity(false);
    
    // Show success notification
    setNotifications(prev => [{
      id: Date.now(),
      message: 'Activity added successfully',
      timestamp: new Date(),
      type: 'success'
    }, ...prev.slice(0, 4)]);
  };

  const getIconForType = (type) => {
    const icons = {
      'call': FiPhone,
      'email': FiMail,
      'meeting': FiUsers,
      'task': FiFlag,
      'note': FiEdit,
      'order': FiShoppingBag,
      'payment': FiDollarSign,
      'delivery': FiTruck,
      'feedback': FiStar,
      'complaint': FiAlertCircle,
      'chat': FiMessageSquare,
      'profile': FiUser,
      'registration': FiUser
    };
    return icons[type] || FiActivity;
  };

  const getColorForType = (type) => {
    const colors = {
      'call': '#f8961e',
      'email': '#17a2b8',
      'meeting': '#9c27b0',
      'task': '#28a745',
      'note': '#6c757d',
      'order': '#4cc9f0',
      'payment': '#28a745',
      'delivery': '#9c27b0',
      'feedback': '#ffc107',
      'complaint': '#dc3545',
      'chat': '#4361ee',
      'profile': '#6c757d',
      'registration': '#28a745'
    };
    return colors[type] || '#6c757d';
  };

  const toggleActivityExpansion = (activityId) => {
    const newExpanded = new Set(expandedActivities);
    if (newExpanded.has(activityId)) {
      newExpanded.delete(activityId);
    } else {
      newExpanded.add(activityId);
    }
    setExpandedActivities(newExpanded);
  };

  const handleAddNote = (activityId) => {
    if (!noteText.trim()) return;
    
    setActivityNotes(prev => ({
      ...prev,
      [activityId]: [...(prev[activityId] || []), {
        id: Date.now(),
        text: noteText,
        timestamp: new Date(),
        author: 'Current User'
      }]
    }));
    
    setNoteText('');
    setEditingNoteId(null);
  };

  const handleExportData = (format) => {
    setLoading(true);
    const timelineData = generateTimelineData();
    
    setTimeout(() => {
      if (format === 'csv') {
        exportToCSV(timelineData);
      } else if (format === 'pdf') {
        exportToPDF(timelineData);
      } else if (format === 'json') {
        exportToJSON(timelineData);
      }
      setLoading(false);
      setShowExportModal(false);
    }, 1000);
  };

  const exportToCSV = (data) => {
    const csvContent = [
      ['Date', 'Type', 'Title', 'Description', 'Status'],
      ...data.map(activity => [
        activity.timestamp.toLocaleDateString(),
        activity.type,
        activity.title,
        activity.description,
        activity.details?.status || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${customer.name}-timeline-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = (data) => {
    // PDF export implementation would go here
    console.log('Exporting to PDF:', data);
  };

  const exportToJSON = (data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${customer.name}-timeline-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  // Enhanced Utility Functions
  const formatFullTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const generateActivityId = () => {
    return `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const validateActivity = (activity) => {
    const errors = [];
    if (!activity.title?.trim()) errors.push('Title is required');
    if (!activity.description?.trim()) errors.push('Description is required');
    if (!activity.type) errors.push('Activity type is required');
    return errors;
  };

  const applyTemplate = (template) => {
    const customerName = customer.name || 'Customer';
    setNewActivity({
      ...newActivity,
      type: template.type,
      title: template.title.replace('{customer}', customerName),
      description: template.description.replace('{customer}', customerName).replace('{topic}', 'recent inquiry'),
      priority: template.priority,
      tags: template.tags || []
    });
    setShowTemplates(false);
  };

  // Bulk Operations Functions
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedActivities([]);
    } else {
      setSelectedActivities(timelineData.map(activity => activity.id));
    }
    setSelectAll(!selectAll);
  };

  const handleBulkOperation = (operation) => {
    if (selectedActivities.length === 0) return;
    
    switch (operation) {
      case 'delete':
        console.log('Bulk delete:', selectedActivities);
        setNotifications(prev => [{
          id: Date.now(),
          message: `${selectedActivities.length} activities deleted`,
          timestamp: new Date(),
          type: 'success'
        }, ...prev.slice(0, 4)]);
        break;
      case 'export':
        const selectedData = timelineData.filter(activity => selectedActivities.includes(activity.id));
        exportToCSV(selectedData);
        break;
      case 'archive':
        console.log('Bulk archive:', selectedActivities);
        setNotifications(prev => [{
          id: Date.now(),
          message: `${selectedActivities.length} activities archived`,
          timestamp: new Date(),
          type: 'info'
        }, ...prev.slice(0, 4)]);
        break;
      default:
        break;
    }
    
    setSelectedActivities([]);
    setSelectAll(false);
    setShowBulkActions(false);
  };

  // Advanced Filtering Functions
  const applyAdvancedFilters = (filters) => {
    setAdvancedFilters(filters);
    setShowAdvancedFilters(false);
  };

  const resetFilters = () => {
    setFilterType('all');
    setTimeRange('30days');
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
    setAdvancedFilters({
      priority: 'all',
      assignedTo: 'all',
      status: 'all',
      tags: [],
      dateRange: 'all',
      activityTypes: [],
      hasNotes: 'all',
      hasAttachments: 'all'
    });
  };

  // Follow-up and Reminder Functions
  const scheduleFollowUp = (activityId, followUpData) => {
    console.log('Scheduling follow-up for activity:', activityId, followUpData);
    setNotifications(prev => [{
      id: Date.now(),
      message: 'Follow-up scheduled successfully',
      timestamp: new Date(),
      type: 'success'
    }, ...prev.slice(0, 4)]);
    setShowFollowUpModal(false);
  };

  const setReminder = (activityId, reminderData) => {
    console.log('Setting reminder for activity:', activityId, reminderData);
    setNotifications(prev => [{
      id: Date.now(),
      message: 'Reminder set successfully',
      timestamp: new Date(),
      type: 'success'
    }, ...prev.slice(0, 4)]);
    setShowReminderModal(false);
  };

  // Tag Management Functions
  const addTag = (tag) => {
    if (!availableTags.includes(tag)) {
      setAvailableTags(prev => [...prev, tag]);
    }
  };

  const removeTag = (tag) => {
    setAvailableTags(prev => prev.filter(t => t !== tag));
  };

  const timelineData = generateTimelineData();

  if (!customer) {
    return (
      <div className="timeline-empty">
        <FiClock className="empty-icon" />
        <h4>No Customer Selected</h4>
        <p>Select a customer to view their activity timeline</p>
      </div>
    );
  }

  return (
    <div className="customer-timeline">
      {/* Enhanced Header with Real-time Status */}
      <div className="timeline-header">
        <div className="header-info">
          <div className="header-title">
            <h3>Activity Timeline</h3>
            <div className="realtime-status">
              {isRealTimeActive ? (
                <span className="status-active">
                  <FiWifi className="status-icon" />
                  Live
                </span>
              ) : (
                <span className="status-inactive">
                  <FiWifiOff className="status-icon" />
                  Offline
                </span>
              )}
            </div>
          </div>
          <p>Track all interactions and activities for {customer.name}</p>
        </div>
        
        <div className="header-actions">
          <button 
            className="action-btn analytics-btn"
            onClick={() => setShowAnalytics(!showAnalytics)}
            title="View Analytics"
          >
            <FiBarChart2 />
            Analytics
          </button>
          
          <button 
            className="action-btn export-btn"
            onClick={() => setShowExportModal(true)}
            title="Export Timeline"
          >
            <FiDownload />
            Export
          </button>
          
          <button 
            className="action-btn add-btn"
            onClick={() => setShowAddActivity(true)}
            title="Add Activity"
          >
            <FiPlus />
            Add Activity
          </button>

          <button 
            className="action-btn templates-btn"
            onClick={() => setShowTemplates(true)}
            title="Activity Templates"
          >
            <FiSettings />
            Templates
          </button>

          {selectedActivities.length > 0 && (
            <button 
              className="action-btn bulk-btn"
              onClick={() => setShowBulkActions(true)}
              title="Bulk Actions"
            >
              <FiMoreHorizontal />
              Bulk ({selectedActivities.length})
            </button>
          )}
          
          <button 
            className="action-btn refresh-btn"
            onClick={() => window.location.reload()}
            title="Refresh Timeline"
          >
            <FiRefreshCw />
          </button>
        </div>
      </div>

      {/* Real-time Notifications */}
      {notifications.length > 0 && (
        <div className="timeline-notifications">
          {notifications.map(notification => (
            <div key={notification.id} className={`notification ${notification.type}`}>
              <FiActivity className="notification-icon" />
              <span>{notification.message}</span>
              <button 
                className="close-notification"
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
              >
                <FiX />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Filters and Search */}
      <div className="timeline-controls">
        <div className="controls-row">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-group">
            <FiFilter />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Activities</option>
              <option value="order">Orders</option>
              <option value="payment">Payments</option>
              <option value="call">Calls</option>
              <option value="delivery">Deliveries</option>
              <option value="email">Emails</option>
              <option value="feedback">Feedback</option>
              <option value="complaint">Complaints</option>
              <option value="chat">Chats</option>
              <option value="meeting">Meetings</option>
              <option value="task">Tasks</option>
              <option value="note">Notes</option>
            </select>
          </div>
          
          <div className="filter-group">
            <FiCalendar />
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          <div className="filter-group">
            <FiTrendingUp />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="type">By Type</option>
              <option value="priority">By Priority</option>
            </select>
          </div>
        </div>
        
        {timeRange === 'custom' && (
          <div className="custom-date-range">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
            />
            <span>to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
            />
          </div>
        )}
        
        <div className="view-controls">
          <div className="view-modes">
            <button 
              className={`view-mode ${viewMode === 'detailed' ? 'active' : ''}`}
              onClick={() => setViewMode('detailed')}
            >
              <FiEye /> Detailed
            </button>
            <button 
              className={`view-mode ${viewMode === 'compact' ? 'active' : ''}`}
              onClick={() => setViewMode('compact')}
            >
              <FiActivity /> Compact
            </button>
          </div>
          
          <div className="realtime-toggle">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={isRealTimeActive}
                onChange={(e) => setIsRealTimeActive(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
            <span>Real-time Updates</span>
          </div>

          <div className="advanced-controls">
            <button 
              className="action-btn advanced-filter-btn"
              onClick={() => setShowAdvancedFilters(true)}
              title="Advanced Filters"
            >
              <FiFilter />
              Advanced Filters
            </button>

            <button 
              className="action-btn reset-btn"
              onClick={resetFilters}
              title="Reset All Filters"
            >
              <FiRefreshCw />
              Reset
            </button>

            {selectedActivities.length > 0 && (
              <div className="selection-info">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                <span>{selectedActivities.length} selected</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      {showAnalytics && (
        <div className="analytics-panel">
          <div className="analytics-header">
            <h4>Activity Analytics</h4>
            <button 
              className="close-analytics"
              onClick={() => setShowAnalytics(false)}
            >
              <FiX />
            </button>
          </div>
          
          <div className="analytics-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <FiActivity />
              </div>
              <div className="stat-info">
                <div className="stat-number">{activityStats.totalActivities}</div>
                <div className="stat-label">Total Activities</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <FiTrendingUp />
              </div>
              <div className="stat-info">
                <div className="stat-number">
                  {Object.keys(activityStats.byType || {}).length}
                </div>
                <div className="stat-label">Activity Types</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <FiBarChart2 />
              </div>
              <div className="stat-info">
                <div className="stat-number">
                  {Math.round(activityStats.totalActivities / 30 * 10) / 10}
                </div>
                <div className="stat-label">Avg per Day</div>
              </div>
            </div>
          </div>
          
          <div className="activity-breakdown">
            <h5>Activity Breakdown</h5>
            <div className="breakdown-chart">
              {Object.entries(activityStats.byType || {}).map(([type, count]) => (
                <div key={type} className="breakdown-item">
                  <span className="breakdown-type">{type}</span>
                  <div className="breakdown-bar">
                    <div 
                      className="breakdown-fill"
                      style={{ 
                        width: `${(count / activityStats.totalActivities) * 100}%`,
                        backgroundColor: getColorForType(type)
                      }}
                    ></div>
                  </div>
                  <span className="breakdown-count">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Timeline Content */}
      <div className="timeline-content">
        {timelineData.length === 0 ? (
          <div className="timeline-empty">
            <FiClock className="empty-icon" />
            <h4>No Activities Found</h4>
            <p>No activities match your current filter criteria</p>
          </div>
        ) : (
          <div className="timeline-list">
            {timelineData.map((activity, index) => {
              const IconComponent = activity.icon;
              const isExpanded = expandedActivities.has(activity.id);
              const isSelected = selectedActivities.includes(activity.id);
              
              return (
                <div 
                  key={activity.id} 
                  className={`timeline-item ${viewMode} ${isSelected ? 'selected' : ''}`}
                  data-type={activity.type}
                >
                  <div className="timeline-marker">
                    <div 
                      className="timeline-icon"
                      style={{ backgroundColor: activity.color }}
                    >
                      <IconComponent />
                    </div>
                    {index < timelineData.length - 1 && <div className="timeline-line"></div>}
                  </div>
                  
                  <div className="timeline-content-item">
                    <div className="timeline-header-item">
                      <div className="header-left">
                        <div className="activity-selection">
                          <input
                            type="checkbox"
                            checked={selectedActivities.includes(activity.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedActivities(prev => [...prev, activity.id]);
                              } else {
                                setSelectedActivities(prev => prev.filter(id => id !== activity.id));
                              }
                            }}
                          />
                        </div>
                        <div className="activity-title-section">
                          <h4 onClick={() => setShowActivityDetails(activity)}>{activity.title}</h4>
                          {activity.priority && (
                            <span className={`priority-badge ${activity.priority}`}>
                              {activity.priority}
                            </span>
                          )}
                          {activity.tags && activity.tags.length > 0 && (
                            <div className="activity-tags">
                              {activity.tags.map((tag, idx) => (
                                <span key={idx} className="activity-tag">{tag}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="header-right">
                        <span className="timeline-time">
                          <FiClock />
                          {formatTimestamp(activity.timestamp)}
                        </span>
                        
                        <div className="activity-actions">
                          <button 
                            className="action-btn expand-btn"
                            onClick={() => toggleActivityExpansion(activity.id)}
                            title={isExpanded ? 'Collapse' : 'Expand'}
                          >
                            {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                          </button>
                          
                          <button 
                            className="action-btn note-btn"
                            onClick={() => setEditingNoteId(activity.id)}
                            title="Add Note"
                          >
                            <FiEdit />
                          </button>

                          <button 
                            className="action-btn follow-up-btn"
                            onClick={() => setShowFollowUpModal(true)}
                            title="Schedule Follow-up"
                          >
                            <FiCalendar />
                          </button>

                          <button 
                            className="action-btn reminder-btn"
                            onClick={() => setShowReminderModal(true)}
                            title="Set Reminder"
                          >
                            <FiClock />
                          </button>
                          
                          <button 
                            className="action-btn more-btn"
                            title="More Options"
                            onClick={() => setShowActivityDetails(activity)}
                          >
                            <FiMoreHorizontal />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <p className="timeline-description">{activity.description}</p>
                    
                    {activity.assignedTo && (
                      <div className="assigned-to">
                        <FiUser className="assigned-icon" />
                        <span>Assigned to: {activity.assignedTo}</span>
                      </div>
                    )}
                    
                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="expanded-content">
                        {/* Enhanced Details Section */}
                    {activity.details && (
                      <div className="timeline-details">
                        <div className="detail-grid">
                          {Object.entries(activity.details).map(([key, value]) => (
                            <div key={key} className="detail-item">
                              <span className="detail-label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                              <span className={`detail-value ${key === 'status' ? 'status' : ''}`}>
                                {typeof value === 'object' ? JSON.stringify(value) : value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Activity Notes Section */}
                    {activityNotes[activity.id] && activityNotes[activity.id].length > 0 && (
                      <div className="activity-notes">
                        <h5>Notes:</h5>
                        {activityNotes[activity.id].map(note => (
                          <div key={note.id} className="note-item">
                            <div className="note-header">
                              <span className="note-author">{note.author}</span>
                              <span className="note-timestamp">
                                {formatTimestamp(note.timestamp)}
                              </span>
                            </div>
                            <p className="note-text">{note.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Add Note Section */}
                    {editingNoteId === activity.id && (
                      <div className="add-note-section">
                        <textarea
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          placeholder="Add a note..."
                          className="note-textarea"
                        />
                        <div className="note-actions">
                          <button 
                            className="save-note-btn"
                            onClick={() => handleAddNote(activity.id)}
                          >
                            <FiSave /> Save Note
                          </button>
                          <button 
                            className="cancel-note-btn"
                            onClick={() => {
                              setEditingNoteId(null);
                              setNoteText('');
                            }}
                          >
                            <FiX /> Cancel
                          </button>
                        </div>
                      </div>
                    )}
                      </div>
                    )}
                    
                    <div className="timeline-timestamp">
                      {activity.timestamp.toLocaleDateString()} at {activity.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Activity Modal */}
      {showAddActivity && (
        <div className="modal-overlay">
          <div className="modal-content add-activity-modal">
            <div className="modal-header">
              <h3>Add New Activity</h3>
              <button 
                className="close-modal"
                onClick={() => setShowAddActivity(false)}
              >
                <FiX />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Activity Type</label>
                <select 
                  value={newActivity.type}
                  onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
                >
                  <option value="call">Phone Call</option>
                  <option value="email">Email</option>
                  <option value="meeting">Meeting</option>
                  <option value="task">Task</option>
                  <option value="note">Note</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                  placeholder="Enter activity title"
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                  placeholder="Enter activity description"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select 
                    value={newActivity.priority}
                    onChange={(e) => setNewActivity({...newActivity, priority: e.target.value})}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Assigned To</label>
                  <input
                    type="text"
                    value={newActivity.assignedTo}
                    onChange={(e) => setNewActivity({...newActivity, assignedTo: e.target.value})}
                    placeholder="Assign to team member"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="datetime-local"
                  value={newActivity.dueDate}
                  onChange={(e) => setNewActivity({...newActivity, dueDate: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={newActivity.notes}
                  onChange={(e) => setNewActivity({...newActivity, notes: e.target.value})}
                  placeholder="Additional notes"
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowAddActivity(false)}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={handleAddActivity}
              >
                <FiSave /> Add Activity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="modal-overlay">
          <div className="modal-content export-modal">
            <div className="modal-header">
              <h3>Export Timeline Data</h3>
              <button 
                className="close-modal"
                onClick={() => setShowExportModal(false)}
              >
                <FiX />
              </button>
            </div>
            
            <div className="modal-body">
              <p>Choose export format:</p>
              <div className="export-options">
                <button 
                  className="export-option"
                  onClick={() => handleExportData('csv')}
                  disabled={loading}
                >
                  <FiDownload />
                  CSV Format
                </button>
                <button 
                  className="export-option"
                  onClick={() => handleExportData('json')}
                  disabled={loading}
                >
                  <FiDownload />
                  JSON Format
                </button>
                <button 
                  className="export-option"
                  onClick={() => handleExportData('pdf')}
                  disabled={loading}
                >
                  <FiDownload />
                  PDF Report
                </button>
              </div>
              
              {loading && (
                <div className="export-loading">
                  <FiRefreshCw className="spinner" />
                  <span>Preparing export...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Templates Modal */}
      {showTemplates && (
        <div className="modal-overlay">
          <div className="modal-content templates-modal">
            <div className="modal-header">
              <h3>Activity Templates</h3>
              <button 
                className="close-modal"
                onClick={() => setShowTemplates(false)}
              >
                <FiX />
              </button>
            </div>
            
            <div className="modal-body">
              <p>Choose a template to quickly create activities:</p>
              <div className="templates-grid">
                {activityTemplates.map(template => (
                  <div 
                    key={template.id} 
                    className="template-card"
                    onClick={() => applyTemplate(template)}
                  >
                    <div className="template-header">
                      <h4>{template.name}</h4>
                      <span className={`priority-badge ${template.priority}`}>
                        {template.priority}
                      </span>
                    </div>
                    <p>{template.description}</p>
                    <div className="template-tags">
                      {template.tags.map(tag => (
                        <span key={tag} className="template-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Filters Modal */}
      {showAdvancedFilters && (
        <div className="modal-overlay">
          <div className="modal-content advanced-filters-modal">
            <div className="modal-header">
              <h3>Advanced Filters</h3>
              <button 
                className="close-modal"
                onClick={() => setShowAdvancedFilters(false)}
              >
                <FiX />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="filter-grid">
                <div className="form-group">
                  <label>Priority Level</label>
                  <select 
                    value={advancedFilters.priority}
                    onChange={(e) => setAdvancedFilters({...advancedFilters, priority: e.target.value})}
                  >
                    <option value="all">All Priorities</option>
                    {priorityLevels.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Assigned To</label>
                  <select 
                    value={advancedFilters.assignedTo}
                    onChange={(e) => setAdvancedFilters({...advancedFilters, assignedTo: e.target.value})}
                  >
                    <option value="all">All Assignees</option>
                    {assigneeOptions.map(assignee => (
                      <option key={assignee} value={assignee}>{assignee}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select 
                    value={advancedFilters.status}
                    onChange={(e) => setAdvancedFilters({...advancedFilters, status: e.target.value})}
                  >
                    <option value="all">All Statuses</option>
                    {activityStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Has Notes</label>
                  <select 
                    value={advancedFilters.hasNotes}
                    onChange={(e) => setAdvancedFilters({...advancedFilters, hasNotes: e.target.value})}
                  >
                    <option value="all">All Activities</option>
                    <option value="yes">With Notes</option>
                    <option value="no">Without Notes</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Tags</label>
                <div className="tags-selector">
                  {availableTags.map(tag => (
                    <label key={tag} className="tag-checkbox">
                      <input
                        type="checkbox"
                        checked={advancedFilters.tags.includes(tag)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAdvancedFilters({
                              ...advancedFilters,
                              tags: [...advancedFilters.tags, tag]
                            });
                          } else {
                            setAdvancedFilters({
                              ...advancedFilters,
                              tags: advancedFilters.tags.filter(t => t !== tag)
                            });
                          }
                        }}
                      />
                      <span>{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowAdvancedFilters(false)}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={() => applyAdvancedFilters(advancedFilters)}
              >
                <FiFilter /> Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Actions Modal */}
      {showBulkActions && (
        <div className="modal-overlay">
          <div className="modal-content bulk-actions-modal">
            <div className="modal-header">
              <h3>Bulk Actions</h3>
              <button 
                className="close-modal"
                onClick={() => setShowBulkActions(false)}
              >
                <FiX />
              </button>
            </div>
            
            <div className="modal-body">
              <p>{selectedActivities.length} activities selected</p>
              <div className="bulk-options">
                <button 
                  className="bulk-option delete-option"
                  onClick={() => handleBulkOperation('delete')}
                >
                  <FiX />
                  <div>
                    <strong>Delete Activities</strong>
                    <span>Permanently remove selected activities</span>
                  </div>
                </button>

                <button 
                  className="bulk-option export-option"
                  onClick={() => handleBulkOperation('export')}
                >
                  <FiDownload />
                  <div>
                    <strong>Export Selected</strong>
                    <span>Export selected activities to CSV</span>
                  </div>
                </button>

                <button 
                  className="bulk-option archive-option"
                  onClick={() => handleBulkOperation('archive')}
                >
                  <FiSettings />
                  <div>
                    <strong>Archive Activities</strong>
                    <span>Move selected activities to archive</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity Details Modal */}
      {showActivityDetails && (
        <div className="modal-overlay">
          <div className="modal-content activity-details-modal">
            <div className="modal-header">
              <h3>Activity Details</h3>
              <button 
                className="close-modal"
                onClick={() => setShowActivityDetails(null)}
              >
                <FiX />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="activity-detail-content">
                <div className="detail-header">
                  <h4>{showActivityDetails.title}</h4>
                  <span className={`priority-badge ${showActivityDetails.priority}`}>
                    {showActivityDetails.priority}
                  </span>
                </div>
                
                <div className="detail-info">
                  <div className="detail-row">
                    <strong>Type:</strong>
                    <span>{showActivityDetails.type}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Date:</strong>
                    <span>{formatFullTimestamp(showActivityDetails.timestamp)}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Assigned To:</strong>
                    <span>{showActivityDetails.assignedTo || 'Unassigned'}</span>
                  </div>
                </div>

                <div className="detail-description">
                  <h5>Description</h5>
                  <p>{showActivityDetails.description}</p>
                </div>

                {showActivityDetails.details && (
                  <div className="detail-additional">
                    <h5>Additional Details</h5>
                    <div className="details-grid">
                      {Object.entries(showActivityDetails.details).map(([key, value]) => (
                        <div key={key} className="detail-item">
                          <strong>{key}:</strong>
                          <span>{typeof value === 'object' ? JSON.stringify(value) : value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowActivityDetails(null)}
              >
                Close
              </button>
              <button 
                className="save-btn"
                onClick={() => setShowFollowUpModal(true)}
              >
                <FiPlus /> Schedule Follow-up
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Follow-up Modal */}
      {showFollowUpModal && (
        <div className="modal-overlay">
          <div className="modal-content follow-up-modal">
            <div className="modal-header">
              <h3>Schedule Follow-up</h3>
              <button 
                className="close-modal"
                onClick={() => setShowFollowUpModal(false)}
              >
                <FiX />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Follow-up Type</label>
                <select>
                  <option value="call">Phone Call</option>
                  <option value="email">Email</option>
                  <option value="meeting">Meeting</option>
                  <option value="task">Task</option>
                </select>
              </div>

              <div className="form-group">
                <label>Due Date</label>
                <input type="datetime-local" />
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea placeholder="Follow-up notes..."></textarea>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowFollowUpModal(false)}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={() => scheduleFollowUp(null, {})}
              >
                <FiCalendar /> Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerTimeline;