import React, { useState, useEffect } from 'react';
import './css/CRM.css';
import CustomerStats from './components/CustomerStats';
import EnhancedCustomerList from './components/EnhancedCustomerList';
import CustomerDetailPanel from './components/CustomerDetailPanel';
import CustomerModal from './components/CustomerModal';
import LiveChatPanel from './components/LiveChatPanel';
import CustomerFilters from './components/CustomerFilters';
import BulkActions from './components/BulkActions';
import CustomerReports from './components/CustomerReports';

import CustomerTimeline from './components/CustomerTimeline';
import CustomerNotifications from './components/CustomerNotifications';
import { 
  FiSearch, 
  FiPlus, 
  FiClock, 
  FiUsers,
  FiBarChart2,
  FiBell
} from 'react-icons/fi';

const dummyCustomers = [
  { 
    id: 1, 
    name: 'Ramesh Dairy', 
    email: 'ramesh@example.com', 
    contact: '9876543210', 
    location: 'Hyderabad', 
    totalOrders: 23,
    totalValue: 45000,
    lastOrderDate: '2023-05-15',
    customerSince: '2020-03-12',
    status: 'active',
    type: 'wholesale',
    creditLimit: 50000,
    outstandingAmount: 12000,
    preferredPaymentMethod: 'UPI',
    deliverySchedule: 'Daily',
    averageOrderValue: 1956,
    feedback: [
      { id: 1, date: '2023-05-10', rating: 4, comment: 'Good service, but delivery was 30 mins late' },
      { id: 2, date: '2023-04-22', rating: 5, comment: 'Excellent product quality' }
    ],
    complaints: [
      { id: 1, date: '2023-03-05', issue: 'Late delivery', status: 'resolved', notes: 'Compensated with discount' }
    ],
    notes: 'Prefers early morning deliveries. Pays via UPI. Important client - priority treatment.',
    tags: ['VIP', 'Bulk Orders', 'Timely Payments']
  },
  { 
    id: 2, 
    name: 'Anjali Milk Depot', 
    email: 'anjali@example.com', 
    contact: '9876543211', 
    location: 'Bangalore', 
    totalOrders: 12,
    totalValue: 18000,
    lastOrderDate: '2023-05-18',
    customerSince: '2021-07-22',
    status: 'active',
    type: 'retail',
    creditLimit: 25000,
    outstandingAmount: 3500,
    preferredPaymentMethod: 'Cash',
    deliverySchedule: 'Weekly',
    averageOrderValue: 1500,
    feedback: [
      { id: 1, date: '2023-05-12', rating: 3, comment: 'Average experience, milk packets sometimes leak' }
    ],
    complaints: [],
    notes: 'Bulk order every Thursday. Contact before 4pm.',
    tags: ['Regular', 'Weekly Orders']
  },
  { 
    id: 3, 
    name: 'Krishnan Milk Centre', 
    email: 'krishnan@example.com', 
    contact: '9876543212', 
    location: 'Chennai', 
    totalOrders: 35,
    totalValue: 67000,
    lastOrderDate: '2023-05-20',
    customerSince: '2019-11-08',
    status: 'premium',
    type: 'wholesale',
    creditLimit: 75000,
    outstandingAmount: 8000,
    preferredPaymentMethod: 'Bank Transfer',
    deliverySchedule: 'Daily',
    averageOrderValue: 1914,
    feedback: [
      { id: 1, date: '2023-05-15', rating: 5, comment: 'Excellent service and product quality' },
      { id: 2, date: '2023-05-01', rating: 4, comment: 'Good overall experience' }
    ],
    complaints: [],
    notes: 'Premium customer with excellent payment history. Prefers premium products.',
    tags: ['Premium', 'Loyal', 'High Value']
  },
  { 
    id: 4, 
    name: 'Priya Sweets & Dairy', 
    email: 'priya@example.com', 
    contact: '9876543213', 
    location: 'Pune', 
    totalOrders: 8,
    totalValue: 12000,
    lastOrderDate: '2023-05-12',
    customerSince: '2022-01-15',
    status: 'inactive',
    type: 'retail',
    creditLimit: 20000,
    outstandingAmount: 0,
    preferredPaymentMethod: 'UPI',
    deliverySchedule: 'Bi-weekly',
    averageOrderValue: 1500,
    feedback: [
      { id: 1, date: '2023-04-20', rating: 2, comment: 'Had quality issues with last order' }
    ],
    complaints: [
      { id: 1, date: '2023-04-18', issue: 'Quality issue', status: 'pending', notes: 'Investigating quality concerns' }
    ],
    notes: 'Recently inactive. Last complaint regarding quality needs follow-up.',
    tags: ['Inactive', 'Quality Issues']
  }
];

function CRM() {
  const [selectedCustomer, setSelectedCustomer] = useState(dummyCustomers[0]);
  const [customers, setCustomers] = useState(dummyCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState(dummyCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    location: 'all',
    sortBy: 'recent'
  });
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [chatActive, setChatActive] = useState(false);
  const [activeChatCustomer, setActiveChatCustomer] = useState(null);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState('customers'); // 'customers', 'reports', 'timeline'
  const [showNotifications, setShowNotifications] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Filter and search effect
  useEffect(() => {
    let filtered = [...customers];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.contact.includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(customer => customer.status === filters.status);
    }

    // Apply type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(customer => customer.type === filters.type);
    }

    // Apply location filter
    if (filters.location !== 'all') {
      filtered = filtered.filter(customer => customer.location === filters.location);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'orders':
          return b.totalOrders - a.totalOrders;
        case 'value':
          return b.totalValue - a.totalValue;
        case 'recent':
          return new Date(b.lastOrderDate) - new Date(a.lastOrderDate);
        case 'oldest':
          return new Date(a.customerSince) - new Date(b.customerSince);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredCustomers(filtered);
  }, [customers, searchTerm, filters]);

  const handleAddCustomer = (newCustomer) => {
    const customerWithId = {
      ...newCustomer,
      id: Math.max(...customers.map(c => c.id)) + 1,
      totalOrders: 0,
      totalValue: 0,
      lastOrderDate: new Date().toISOString().split('T')[0],
      customerSince: new Date().toISOString().split('T')[0],
      status: 'active',
      feedback: [],
      complaints: [],
      notes: '',
      tags: [],
      averageOrderValue: 0,
      outstandingAmount: 0
    };
    setCustomers([...customers, customerWithId]);
    setShowModal(false);
  };

  const handleUpdateCustomer = (updatedCustomer) => {
    setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
    setSelectedCustomer(updatedCustomer);
  };

  const handleDeleteCustomer = (customerId) => {
    setCustomers(customers.filter(c => c.id !== customerId));
    if (selectedCustomer?.id === customerId) {
      setSelectedCustomer(customers[0]);
    }
  };

  const startChat = (customer) => {
    setActiveChatCustomer(customer);
    setChatActive(true);
  };

  const handleBulkAction = (action) => {
    setLoading(true);
    setTimeout(() => {
      switch (action) {
        case 'delete':
          setCustomers(customers.filter(c => !selectedCustomers.includes(c.id)));
          break;
        case 'activate':
          setCustomers(customers.map(c => 
            selectedCustomers.includes(c.id) ? { ...c, status: 'active' } : c
          ));
          break;
        case 'deactivate':
          setCustomers(customers.map(c => 
            selectedCustomers.includes(c.id) ? { ...c, status: 'inactive' } : c
          ));
          break;
        case 'message':
          // Message functionality would go here
          console.log('Sending message to selected customers');
          break;
        default:
          break;
      }
      setSelectedCustomers([]);
      setShowBulkActions(false);
      setLoading(false);
    }, 1000);
  };



  const getUniqueLocations = () => {
    return [...new Set(customers.map(c => c.location))];
  };



  return (
    <div className="crm-container">
      <header className="crm-header">
        <div className="header-content">
          <div className="title-section">
            <h1><FiUsers className="header-icon" /> Customer Relationship Management</h1>
            <p className="subtitle">Manage and nurture your customer relationships effectively</p>
          </div>
          <div className="header-actions">
            <button 
              className={`view-btn ${currentView === 'customers' ? 'active' : ''}`}
              onClick={() => setCurrentView('customers')}
              title="View customer directory"
            >
              <FiUsers /> Customers
            </button>
            <button 
              className={`view-btn ${currentView === 'reports' ? 'active' : ''}`}
              onClick={() => setCurrentView('reports')}
              title="View customer reports"
            >
              <FiBarChart2 /> Reports
            </button>
            <button 
              className={`view-btn ${currentView === 'timeline' ? 'active' : ''}`}
              onClick={() => setCurrentView('timeline')}
              title="View customer timeline"
            >
              <FiClock /> Timeline
            </button>
            <button 
              className="notification-btn" 
              onClick={() => setShowNotifications(true)}
              title="View notifications"
            >
              <FiBell /> 
              <span className="notification-badge">3</span>
            </button>

            <button 
              className="primary-btn" 
              onClick={() => setShowModal(true)}
              title="Add new customer"
            >
              <FiPlus /> Add Customer
            </button>
          </div>
        </div>
      </header>

      {currentView === 'customers' ? (
        <>
          <div className="crm-controls">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <CustomerFilters 
              filters={filters}
              onFiltersChange={setFilters}
              locations={getUniqueLocations()}
            />
          </div>

          <CustomerStats customers={filteredCustomers} />

          {selectedCustomers.length > 0 && (
            <BulkActions
              selectedCount={selectedCustomers.length}
              onBulkAction={handleBulkAction}
              loading={loading}
            />
          )}
          
          <div className="crm-main-layout">
            <EnhancedCustomerList 
              customers={filteredCustomers} 
              onSelectCustomer={setSelectedCustomer}
              selectedId={selectedCustomer?.id}
              onStartChat={startChat}
              selectedCustomers={selectedCustomers}
              onSelectCustomers={setSelectedCustomers}
              onDeleteCustomer={handleDeleteCustomer}
            />
            
            <CustomerDetailPanel 
              customer={selectedCustomer} 
              onStartChat={startChat}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onUpdateCustomer={handleUpdateCustomer}
              onDeleteCustomer={handleDeleteCustomer}
            />
          </div>
        </>
      ) : currentView === 'reports' ? (
        <CustomerReports customers={customers} />
      ) : currentView === 'timeline' ? (
        <CustomerTimeline customer={selectedCustomer} />
      ) : null}

      {showModal && (
        <CustomerModal 
          onClose={() => setShowModal(false)}
          onSave={handleAddCustomer}
        />
      )}



      {showNotifications && (
        <CustomerNotifications 
          onClose={() => setShowNotifications(false)}
        />
      )}
      
      {chatActive && (
        <LiveChatPanel 
          customer={activeChatCustomer}
          onClose={() => setChatActive(false)}
        />
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className="scroll-to-top-btn"
          onClick={scrollToTop}
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18,15 12,9 6,15"></polyline>
          </svg>
        </button>
      )}
    </div>
  );
}

export default CRM;