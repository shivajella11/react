import React from 'react';
import CustomerReports from './components/CustomerReports';

// Test data for the analytics cards
const testCustomers = [
  { 
    id: 1, 
    name: 'Ramesh Dairy', 
    email: 'ramesh@example.com', 
    contact: '9876543210', 
    location: 'Mumbai', 
    totalOrders: 23,
    totalValue: 45000,
    lastOrderDate: '2023-05-15',
    customerSince: '2020-03-12',
    status: 'active',
    type: 'wholesale',
    averageOrderValue: 1956,
    joinDate: '2020-03-12',
    feedback: [
      { id: 1, date: '2023-05-10', rating: 4, comment: 'Good service' },
      { id: 2, date: '2023-04-22', rating: 5, comment: 'Excellent quality' }
    ]
  },
  { 
    id: 2, 
    name: 'Sharma Milk Center', 
    email: 'sharma@example.com', 
    contact: '9876543211', 
    location: 'Delhi', 
    totalOrders: 45,
    totalValue: 89000,
    lastOrderDate: '2023-05-20',
    customerSince: '2019-08-15',
    status: 'premium',
    type: 'retail',
    averageOrderValue: 1978,
    joinDate: '2019-08-15',
    feedback: [
      { id: 1, date: '2023-05-18', rating: 5, comment: 'Always satisfied' }
    ]
  },
  { 
    id: 3, 
    name: 'Patel Dairy Farm', 
    email: 'patel@example.com', 
    contact: '9876543212', 
    location: 'Bangalore', 
    totalOrders: 12,
    totalValue: 23000,
    lastOrderDate: '2023-03-10',
    customerSince: '2021-01-20',
    status: 'inactive',
    type: 'wholesale',
    averageOrderValue: 1917,
    joinDate: '2021-01-20',
    feedback: [
      { id: 1, date: '2023-03-08', rating: 3, comment: 'Service could be better' }
    ]
  },
  { 
    id: 4, 
    name: 'Krishna Milk Products', 
    email: 'krishna@example.com', 
    contact: '9876543213', 
    location: 'Mumbai', 
    totalOrders: 67,
    totalValue: 134000,
    lastOrderDate: '2023-05-22',
    customerSince: '2018-11-05',
    status: 'premium',
    type: 'wholesale',
    averageOrderValue: 2000,
    joinDate: '2018-11-05',
    feedback: [
      { id: 1, date: '2023-05-20', rating: 5, comment: 'Excellent partnership' }
    ]
  },
  { 
    id: 5, 
    name: 'Gupta Dairy Store', 
    email: 'gupta@example.com', 
    contact: '9876543214', 
    location: 'Delhi', 
    totalOrders: 34,
    totalValue: 67000,
    lastOrderDate: '2023-05-18',
    customerSince: '2020-07-12',
    status: 'active',
    type: 'retail',
    averageOrderValue: 1971,
    joinDate: '2020-07-12',
    feedback: [
      { id: 1, date: '2023-05-16', rating: 4, comment: 'Good quality products' }
    ]
  }
];

function TestAnalyticsCards() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f7fafc', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#2d3748' }}>
        Enhanced CRM Analytics Cards Test
      </h1>
      <CustomerReports customers={testCustomers} />
    </div>
  );
}

export default TestAnalyticsCards;