import React, { useState, useEffect } from 'react';
import './MilkCollection.css';

function MilkCollection() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQualityModal, setShowQualityModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showTrendModal, setShowTrendModal] = useState(false);
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showQualityTestModal, setShowQualityTestModal] = useState(false);
  const [showRegionTestModal, setShowRegionTestModal] = useState(false);
  const [showTestSampleModal, setShowTestSampleModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [activeTestTab, setActiveTestTab] = useState('basic');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('daily');
  // Removed activeTab state as we're not using tabs anymore

  // Sample data for milk collections from farmers
  const [collections, setCollections] = useState([
    {
      id: 1,
      farmerName: 'Rajesh Kumar',
      farmerId: 'F001',
      location: 'Village Dairy Center - Route 1',
      milkType: 'Cow Milk',
      quantity: 45.5,
      time: '06:30 AM',
      quality: 'A+',
      temperature: 4.2,
      fat: 4.1,
      snf: 8.7,
      rate: 32.50,
      amount: 1478.75,
      status: 'collected'
    },
    {
      id: 2,
      farmerName: 'Suresh Patel',
      farmerId: 'F002',
      location: 'Village Dairy Center - Route 1',
      milkType: 'Buffalo Milk',
      quantity: 28.2,
      time: '06:45 AM',
      quality: 'A+',
      temperature: 4.0,
      fat: 6.2,
      snf: 9.1,
      rate: 38.75,
      amount: 1092.75,
      status: 'collected'
    },
    {
      id: 3,
      farmerName: 'Lakshmi Devi',
      farmerId: 'F003',
      location: 'Village Dairy Center - Route 2',
      milkType: 'Cow Milk',
      quantity: 38.8,
      time: '07:00 AM',
      quality: 'A',
      temperature: 4.3,
      fat: 3.8,
      snf: 8.5,
      rate: 31.25,
      amount: 1212.50,
      status: 'collected'
    },
    {
      id: 4,
      farmerName: 'Mohan Singh',
      farmerId: 'F004',
      location: 'Village Dairy Center - Route 2',
      milkType: 'Buffalo Milk',
      quantity: 52.1,
      time: '07:15 AM',
      quality: 'A+',
      temperature: 4.1,
      fat: 6.5,
      snf: 9.3,
      rate: 39.50,
      amount: 2057.95,
      status: 'collected'
    },
    {
      id: 5,
      farmerName: 'Sunita Sharma',
      farmerId: 'F005',
      location: 'Village Dairy Center - Route 3',
      milkType: 'Mixed Milk',
      quantity: 33.7,
      time: '07:30 AM',
      quality: 'A',
      temperature: 4.2,
      fat: 4.5,
      snf: 8.8,
      rate: 34.00,
      amount: 1145.80,
      status: 'pending'
    }
  ]);

  const [newCollection, setNewCollection] = useState({
    farmerName: '',
    farmerId: '',
    location: '',
    milkType: '',
    quantity: '',
    quality: '',
    temperature: '',
    fat: '',
    snf: '',
    rate: ''
  });

  const locations = [
    'Village Dairy Center - Route 1',
    'Village Dairy Center - Route 2', 
    'Village Dairy Center - Route 3',
    'Village Dairy Center - Route 4',
    'Mobile Collection Unit - A',
    'Mobile Collection Unit - B'
  ];

  // Regional data structure for quality testing
  const [regions] = useState([
    {
      id: 'north',
      name: 'North Region',
      locations: ['Village Dairy Center - Route 1', 'Village Dairy Center - Route 2'],
      totalCollections: 156,
      avgQuality: 'A+',
      avgFat: 4.2,
      avgSNF: 8.7,
      avgProtein: 3.2,
      testingSamples: 24,
      passedTests: 22,
      rejectedTests: 2
    },
    {
      id: 'south',
      name: 'South Region',
      locations: ['Village Dairy Center - Route 3', 'Village Dairy Center - Route 4'],
      totalCollections: 142,
      avgQuality: 'A',
      avgFat: 4.0,
      avgSNF: 8.5,
      avgProtein: 3.0,
      testingSamples: 20,
      passedTests: 18,
      rejectedTests: 2
    },
    {
      id: 'mobile',
      name: 'Mobile Units',
      locations: ['Mobile Collection Unit - A', 'Mobile Collection Unit - B'],
      totalCollections: 98,
      avgQuality: 'A',
      avgFat: 3.9,
      avgSNF: 8.3,
      avgProtein: 2.9,
      testingSamples: 16,
      passedTests: 15,
      rejectedTests: 1
    }
  ]);

  // Quality test parameters and samples
  const [qualityTestData] = useState({
    basicTests: {
      fatContent: { min: 3.0, max: 6.0, unit: '%' },
      proteinContent: { min: 2.8, max: 4.0, unit: '%' },
      snfContent: { min: 8.0, max: 10.0, unit: '%' },
      temperature: { min: 2.0, max: 4.5, unit: '°C' },
      phLevel: { min: 6.4, max: 6.8, unit: 'pH' }
    },
    advancedTests: {
      lactose: { min: 4.0, max: 5.5, unit: '%' },
      solidsNotFat: { min: 8.2, max: 9.0, unit: '%' },
      totalSolids: { min: 11.5, max: 14.0, unit: '%' },
      specificGravity: { min: 1.028, max: 1.035, unit: 'g/ml' },
      freezingPoint: { min: -0.540, max: -0.520, unit: '°C' }
    },
    microbiologicalTests: {
      totalBacterialCount: { max: 100000, unit: 'CFU/ml' },
      coliformCount: { max: 10, unit: 'CFU/ml' },
      somatic_cells: { max: 400000, unit: 'cells/ml' },
      yeastMoldCount: { max: 500, unit: 'CFU/ml' }
    },
    additiveTests: {
      waterAdded: { max: 0, unit: '%' },
      saltAdded: { max: 0, unit: 'ppm' },
      preservatives: { status: 'absent' },
      antibiotics: { status: 'absent' }
    }
  });

  // Test samples by region
  const [testSamples, setTestSamples] = useState([
    {
      id: 'TS001',
      region: 'North Region',
      sampleDate: '2024-01-15',
      testType: 'Complete',
      farmerId: 'F001',
      farmerName: 'Rajesh Kumar',
      batchId: 'B001',
      quantity: 45.5,
      status: 'passed',
      results: {
        fatContent: 4.1,
        proteinContent: 3.2,
        snfContent: 8.7,
        temperature: 4.2,
        phLevel: 6.6,
        lactose: 4.8,
        totalBacterialCount: 85000
      },
      testerId: 'QT001',
      testerName: 'Dr. Priya Sharma',
      notes: 'Excellent quality milk, all parameters within acceptable range'
    },
    {
      id: 'TS002',
      region: 'South Region',
      sampleDate: '2024-01-15',
      testType: 'Basic',
      farmerId: 'F003',
      farmerName: 'Lakshmi Devi',
      batchId: 'B003',
      quantity: 38.8,
      status: 'passed',
      results: {
        fatContent: 3.8,
        proteinContent: 3.0,
        snfContent: 8.5,
        temperature: 4.3,
        phLevel: 6.5
      },
      testerId: 'QT002',
      testerName: 'Dr. Ravi Kumar',
      notes: 'Good quality, minor variation in fat content'
    },
    {
      id: 'TS003',
      region: 'Mobile Units',
      sampleDate: '2024-01-15',
      testType: 'Advanced',
      farmerId: 'F005',
      farmerName: 'Sunita Sharma',
      batchId: 'B005',
      quantity: 33.7,
      status: 'pending',
      results: {
        fatContent: 4.5,
        proteinContent: 2.9,
        snfContent: 8.3,
        temperature: 4.2,
        phLevel: 6.4,
        lactose: 4.5,
        specificGravity: 1.030
      },
      testerId: 'QT001',
      testerName: 'Dr. Priya Sharma',
      notes: 'Under review - awaiting microbiological test results'
    }
  ]);

  const milkTypes = [
    'Cow Milk',
    'Buffalo Milk',
    'Mixed Milk',
    'Goat Milk',
    'Organic Cow Milk',
    'Organic Buffalo Milk'
  ];

  // Collection trends data for different time periods
  const collectionDataSets = {
    daily: [
      { period: 'Monday', collection: 2450, farmers: 45, avgFat: 4.2, avgRate: 34.25, totalRevenue: 83362.5 },
      { period: 'Tuesday', collection: 2678, farmers: 48, avgFat: 4.3, avgRate: 34.50, totalRevenue: 92391.0 },
      { period: 'Wednesday', collection: 2892, farmers: 52, avgFat: 4.1, avgRate: 33.75, totalRevenue: 97605.0 },
      { period: 'Thursday', collection: 2565, farmers: 46, avgFat: 4.4, avgRate: 34.80, totalRevenue: 89262.0 },
      { period: 'Friday', collection: 2910, farmers: 54, avgFat: 4.2, avgRate: 34.20, totalRevenue: 99522.0 },
      { period: 'Saturday', collection: 2345, farmers: 42, avgFat: 4.0, avgRate: 33.50, totalRevenue: 78557.5 },
      { period: 'Sunday', collection: 2123, farmers: 38, avgFat: 4.1, avgRate: 33.80, totalRevenue: 71757.4 }
    ],
    weekly: [
      { period: 'Week 1', collection: 18450, farmers: 48, avgFat: 4.3, avgRate: 34.15, totalRevenue: 630067.5 },
      { period: 'Week 2', collection: 19678, farmers: 52, avgFat: 4.2, avgRate: 34.25, totalRevenue: 673971.5 },
      { period: 'Week 3', collection: 17892, farmers: 45, avgFat: 4.4, avgRate: 34.60, totalRevenue: 619063.2 },
      { period: 'Week 4', collection: 20565, farmers: 55, avgFat: 4.1, avgRate: 33.95, totalRevenue: 698181.75 },
      { period: 'Week 5', collection: 19210, farmers: 51, avgFat: 4.3, avgRate: 34.30, totalRevenue: 658903.0 },
      { period: 'Week 6', collection: 18345, farmers: 47, avgFat: 4.0, avgRate: 33.75, totalRevenue: 619143.75 }
    ],
    monthly: [
      { period: 'Jan 2024', collection: 125450, farmers: 52, avgFat: 4.2, avgRate: 34.25, totalRevenue: 4296661.25 },
      { period: 'Feb 2024', collection: 118678, farmers: 49, avgFat: 4.3, avgRate: 34.50, totalRevenue: 4094391.0 },
      { period: 'Mar 2024', collection: 132892, farmers: 55, avgFat: 4.1, avgRate: 33.75, totalRevenue: 4485105.0 },
      { period: 'Apr 2024', collection: 128565, farmers: 53, avgFat: 4.4, avgRate: 34.80, totalRevenue: 4474062.0 },
      { period: 'May 2024', collection: 139210, farmers: 58, avgFat: 4.2, avgRate: 34.20, totalRevenue: 4760982.0 },
      { period: 'Jun 2024', collection: 133345, farmers: 56, avgRate: 4.0, avgFat: 33.50, totalRevenue: 4467057.5 },
      { period: 'Jul 2024', collection: 142123, farmers: 60, avgFat: 4.1, avgRate: 33.80, totalRevenue: 4803757.4 },
      { period: 'Aug 2024', collection: 145890, farmers: 62, avgFat: 4.3, avgRate: 34.10, totalRevenue: 4974849.0 },
      { period: 'Sep 2024', collection: 138567, farmers: 57, avgFat: 4.2, avgRate: 34.25, totalRevenue: 4746169.75 },
      { period: 'Oct 2024', collection: 141234, farmers: 59, avgFat: 4.4, avgRate: 34.75, totalRevenue: 4907881.5 },
      { period: 'Nov 2024', collection: 137456, farmers: 56, avgFat: 4.1, avgRate: 33.95, totalRevenue: 4666431.2 },
      { period: 'Dec 2024', collection: 144789, farmers: 61, avgFat: 4.3, avgRate: 34.40, totalRevenue: 4980781.6 }
    ],
    yearly: [
      { period: '2021', collection: 1250000, farmers: 45, avgFat: 4.0, avgRate: 32.50, totalRevenue: 40625000 },
      { period: '2022', collection: 1380000, farmers: 50, avgFat: 4.1, avgRate: 33.25, totalRevenue: 45885000 },
      { period: '2023', collection: 1520000, farmers: 55, avgFat: 4.2, avgRate: 33.80, totalRevenue: 51376000 },
      { period: '2024', collection: 1650000, farmers: 58, avgFat: 4.3, avgRate: 34.15, totalRevenue: 56347500 }
    ]
  };

  // Get current collection data based on selected time period
  const getCurrentCollectionData = () => {
    return collectionDataSets[selectedTimePeriod];
  };

  // Get period label based on selected time period
  const getPeriodLabel = () => {
    switch(selectedTimePeriod) {
      case 'daily': return 'Last 7 Days';
      case 'weekly': return 'Last 6 Weeks';
      case 'monthly': return 'Last 12 Months';
      case 'yearly': return 'Last 4 Years';
      default: return 'Period';
    }
  };

  // Get max collection value for chart scaling
  const getMaxCollection = () => {
    const data = getCurrentCollectionData();
    return Math.max(...data.map(item => item.collection));
  };

  // Collection center equipment and vehicles
  const [collectionEquipment] = useState([
    { id: 1, name: 'Milk Collection Tank - Route 1', capacity: '5000L', current: '3450L', status: 'Active', temperature: '4.2°C' },
    { id: 2, name: 'Milk Collection Tank - Route 2', capacity: '5000L', current: '4200L', status: 'Active', temperature: '4.1°C' },
    { id: 3, name: 'Fat Testing Machine', status: 'Active', lastService: '2024-01-15', accuracy: '99.5%' },
    { id: 4, name: 'SNF Testing Machine', status: 'Maintenance', lastService: '2024-01-10', accuracy: '98.8%' },
    { id: 5, name: 'Collection Vehicle - MH12AB1234', route: 'Route 1', status: 'On Route', capacity: '2000L' },
    { id: 6, name: 'Collection Vehicle - MH12CD5678', route: 'Route 2', status: 'Active', capacity: '2000L' }
  ]);

  // Milk type distribution data
  const [milkTypeStats] = useState([
    { type: 'Cow Milk', percentage: 65, color: '#c8e6c9', volume: '1580L', farmers: 28 },
    { type: 'Buffalo Milk', percentage: 25, color: '#b3e5fc', volume: '610L', farmers: 12 },
    { type: 'Mixed Milk', percentage: 8, color: '#fff3e0', volume: '195L', farmers: 6 },
    { type: 'Goat Milk', percentage: 2, color: '#fce4ec', volume: '49L', farmers: 3 }
  ]);

  // Farmer statistics
  const [farmerStats] = useState({
    totalFarmers: 148,
    activeFarmers: 49,
    newRegistrations: 8,
    pendingPayments: 12,
    topFarmer: 'Mohan Singh',
    avgDailyCollection: 52.3
  });

  const [alerts] = useState([
    { id: 1, type: 'warning', message: 'SNF Testing Machine under maintenance - Route 2 delayed', time: '10:30 AM', severity: 'medium' },
    { id: 2, type: 'info', message: 'Quality tests completed for Route 1 collections', time: '09:45 AM', severity: 'low' },
    { id: 3, type: 'error', message: 'Collection Tank B nearing capacity - requires emptying', time: '08:15 AM', severity: 'high' },
    { id: 4, type: 'success', message: 'Daily collection target of 2500L achieved', time: '07:30 AM', severity: 'low' }
  ]);

  // Today's testing samples data
  const [todaysSamples] = useState([
    {
      sampleId: 'TS-001',
      testTime: '06:30 AM',
      farmerName: 'Rajesh Kumar',
      farmerId: 'F001',
      farmerPhone: '+91-9876543210',
      location: 'Village Center North',
      cattleCount: 8,
      avgProduction: 45.5,
      collectionTime: '06:30 AM',
      quantity: 45.5,
      milkType: 'Cow Milk',
      testType: 'Complete',
      testDuration: '25 min',
      fatContent: 4.1,
      proteinContent: 3.2,
      snfContent: 8.7,
      phLevel: 6.6,
      status: 'Passed',
      grade: 'A+'
    },
    {
      sampleId: 'TS-002',
      testTime: '06:45 AM',
      farmerName: 'Suresh Patel',
      farmerId: 'F002',
      farmerPhone: '+91-9876543211',
      location: 'Village Center North',
      cattleCount: 12,
      avgProduction: 28.2,
      collectionTime: '06:45 AM',
      quantity: 28.2,
      milkType: 'Buffalo Milk',
      testType: 'Advanced',
      testDuration: '20 min',
      fatContent: 6.2,
      proteinContent: 3.5,
      snfContent: 9.1,
      phLevel: 6.5,
      status: 'Passed',
      grade: 'A+'
    },
    {
      sampleId: 'TS-003',
      testTime: '07:00 AM',
      farmerName: 'Lakshmi Devi',
      farmerId: 'F003',
      farmerPhone: '+91-9876543212',
      location: 'Village Center South',
      cattleCount: 6,
      avgProduction: 38.8,
      collectionTime: '07:00 AM',
      quantity: 38.8,
      milkType: 'Cow Milk',
      testType: 'Basic',
      testDuration: '15 min',
      fatContent: 3.8,
      proteinContent: 3.0,
      snfContent: 8.5,
      phLevel: 6.7,
      status: 'Passed',
      grade: 'A'
    },
    {
      sampleId: 'TS-004',
      testTime: '07:15 AM',
      farmerName: 'Mohan Singh',
      farmerId: 'F004',
      farmerPhone: '+91-9876543213',
      location: 'Village Center South',
      cattleCount: 10,
      avgProduction: 52.1,
      collectionTime: '07:15 AM',
      quantity: 52.1,
      milkType: 'Buffalo Milk',
      testType: 'Complete',
      testDuration: '30 min',
      fatContent: 6.5,
      proteinContent: 3.8,
      snfContent: 9.3,
      phLevel: 6.4,
      status: 'Passed',
      grade: 'A+'
    },
    {
      sampleId: 'TS-005',
      testTime: '07:30 AM',
      farmerName: 'Sunita Sharma',
      farmerId: 'F005',
      farmerPhone: '+91-9876543214',
      location: 'Mobile Route A',
      cattleCount: 5,
      avgProduction: 33.7,
      collectionTime: '07:30 AM',
      quantity: 33.7,
      milkType: 'Mixed Milk',
      testType: 'Basic',
      testDuration: '18 min',
      fatContent: 4.5,
      proteinContent: 3.1,
      snfContent: 8.8,
      phLevel: 6.6,
      status: 'Pending',
      grade: 'A'
    },
    {
      sampleId: 'TS-006',
      testTime: '07:45 AM',
      farmerName: 'Ramesh Gupta',
      farmerId: 'F006',
      farmerPhone: '+91-9876543215',
      location: 'Mobile Route B',
      cattleCount: 7,
      avgProduction: 41.2,
      collectionTime: '07:45 AM',
      quantity: 41.2,
      milkType: 'Cow Milk',
      testType: 'Advanced',
      testDuration: '22 min',
      fatContent: 3.9,
      proteinContent: 3.0,
      snfContent: 8.4,
      phLevel: 6.8,
      status: 'Failed',
      grade: 'B+'
    }
  ]);

  // Update date every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Filter collections by location
  const filteredCollections = selectedLocation === 'all' 
    ? collections 
    : collections.filter(collection => collection.location === selectedLocation);

  // Calculate milk collection stats
  const todayStats = {
    totalQuantity: collections.reduce((sum, col) => sum + col.quantity, 0),
    totalFarmers: collections.length,
    avgPerFarmer: collections.length > 0 ? (collections.reduce((sum, col) => sum + col.quantity, 0) / collections.length).toFixed(1) : 0,
    totalAmount: collections.reduce((sum, col) => sum + col.amount, 0),
    avgRate: collections.length > 0 ? (collections.reduce((sum, col) => sum + col.rate, 0) / collections.length).toFixed(2) : 0
  };

  const handleAddCollection = () => {
    if (newCollection.location && newCollection.farmerId && newCollection.quantity) {
      const collection = {
        id: Date.now(),
        ...newCollection,
        quantity: parseFloat(newCollection.quantity),
        temperature: parseFloat(newCollection.temperature),
        fat: parseFloat(newCollection.fat),
        snf: parseFloat(newCollection.snf),
        rate: parseFloat(newCollection.rate),
        amount: parseFloat(newCollection.quantity) * parseFloat(newCollection.rate),
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        status: 'pending'
      };
      setCollections([...collections, collection]);
      setNewCollection({
        farmerName: '',
        farmerId: '',
        location: '',
        milkType: '',
        quantity: '',
        quality: '',
        temperature: '',
        fat: '',
        snf: '',
        rate: ''
      });
      setShowAddModal(false);
    }
  };

  const handleQualityCheck = (collection) => {
    setSelectedRecord(collection);
    setShowQualityModal(true);
  };

  const updateQualityStatus = (status) => {
    if (selectedRecord) {
      setCollections(collections.map(col => 
        col.id === selectedRecord.id 
          ? { ...col, status } 
          : col
      ));
      setShowQualityModal(false);
      setSelectedRecord(null);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'collected': return '#28a745';
      case 'pending': return '#ffc107';
      case 'rejected': return '#dc3545';
      case 'paid': return '#17a2b8';
      default: return '#6c757d';
    }
  };

  const getQualityColor = (quality) => {
    switch(quality) {
      case 'A+': return '#28a745';
      case 'A': return '#20c997';
      case 'B+': return '#ffc107';
      case 'B': return '#fd7e14';
      case 'C': return '#dc3545';
      default: return '#6c757d';
    }
  };

  // Handler functions for testing samples
  const handleViewSampleDetails = (sample) => {
    console.log('Viewing sample details:', sample);
    // Implement sample details modal
  };

  const handleRetestSample = (sample) => {
    console.log('Retesting sample:', sample);
    // Implement retest functionality
  };

  const handleGenerateReport = (sample) => {
    console.log('Generating report for sample:', sample);
    // Implement report generation
  };

  return (
    <div className="page-container milk-collection">
      {/* Header Section */}
      <div className="milk-collection-banner">
        <div className="milk-collection-banner-content">
          <div className="milk-collection-banner-title">
            <h1>🥛 Milk Collection Center</h1>
            <p>Farmer milk collection, quality testing & payment management</p>
          </div>
          <div className="milk-collection-banner-actions">
            <div className="milk-collection-date-time">
              <span className="milk-collection-date">{currentDate.toLocaleDateString()}</span>
              <span className="milk-collection-time">{currentDate.toLocaleTimeString()}</span>
            </div>
            <button className="milk-collection-btn-primary" onClick={() => setShowAddModal(true)}>
              <span className="milk-collection-btn-icon">➕</span>
              Add Farmer Collection
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats-bar">
        <div className="quick-stat">
          <span className="stat-number">{todayStats.totalQuantity.toFixed(1)}L</span>
          <span className="stat-label">Total Collection</span>
        </div>
        <div className="quick-stat">
          <span className="stat-number">{todayStats.totalFarmers}</span>
          <span className="stat-label">Active Farmers</span>
        </div>
        <div className="quick-stat">
          <span className="stat-number">₹{todayStats.totalAmount.toFixed(0)}</span>
          <span className="stat-label">Total Amount</span>
        </div>
        <div className="quick-stat">
          <span className="stat-number">₹{todayStats.avgRate}</span>
          <span className="stat-label">Avg Rate/L</span>
        </div>
      </div>

      {/* Quality Testing Dashboard */}
      <div className="section-container">
        <div className="content-card">
          <div className="section-header">
            <h2>🧪 Regional Quality Testing Center</h2>
            <div className="section-actions">
              <button className="btn-primary" onClick={() => setShowQualityTestModal(true)}>
                <span className="btn-icon">🔬</span>
                Start Quality Test
              </button>
              <button className="btn-secondary" onClick={() => setShowTestSampleModal(true)}>
                <span className="btn-icon">📋</span>
                View Test Samples
              </button>
            </div>
          </div>
          
          <div className="region-testing-grid">
            {regions.map(region => (
              <div key={region.id} className="region-test-card">
                <div className="region-header">
                  <h3>{region.name}</h3>
                  <span className={`quality-badge grade-${region.avgQuality.toLowerCase().replace('+', '-plus')}`}>
                    {region.avgQuality}
                  </span>
                </div>
                
                <div className="region-stats">
                  <div className="stat-row">
                    <span className="stat-label">Collections:</span>
                    <span className="stat-value">{region.totalCollections}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Test Samples:</span>
                    <span className="stat-value">{region.testingSamples}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Success Rate:</span>
                    <span className="stat-value success-rate">
                      {((region.passedTests / region.testingSamples) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                
                <div className="quality-metrics">
                  <div className="metric-item">
                    <span className="metric-label">Fat:</span>
                    <span className="metric-value">{region.avgFat}%</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">SNF:</span>
                    <span className="metric-value">{region.avgSNF}%</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Protein:</span>
                    <span className="metric-value">{region.avgProtein}%</span>
                  </div>
                </div>
                
                <div className="region-actions">
                  <button 
                    className="btn-action" 
                    onClick={() => {
                      setSelectedRegion(region);
                      setShowRegionTestModal(true);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="testing-summary">
            <h3>📊 Today's Testing Summary</h3>
            <div className="summary-stats">
              <div className="summary-item">
                <span className="summary-number">24</span>
                <span className="summary-label">Total Samples</span>
              </div>
              <div className="summary-item">
                <span className="summary-number">18</span>
                <span className="summary-label">Completed Tests</span>
              </div>
              <div className="summary-item">
                <span className="summary-number">16</span>
                <span className="summary-label">Passed</span>
              </div>
              <div className="summary-item">
                <span className="summary-number">2</span>
                <span className="summary-label">Failed</span>
              </div>
              <div className="summary-item">
                <span className="summary-number">6</span>
                <span className="summary-label">Pending</span>
              </div>
              <div className="summary-item">
                <span className="summary-number">88.9%</span>
                <span className="summary-label">Pass Rate</span>
              </div>
            </div>

            {/* Testing Procedure Section */}
            <div className="testing-procedure-section">
              <h4>🔬 Standard Testing Procedure</h4>
              <div className="procedure-steps">
                <div className="procedure-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h5>Sample Collection</h5>
                    <p>Collect 250ml milk sample from each farmer using sterile sampling equipment. Label with unique sample ID.</p>
                  </div>
                </div>
                <div className="procedure-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h5>Initial Inspection</h5>
                    <p>Visual inspection for color, odor, and foreign matter. Check temperature and record initial observations.</p>
                  </div>
                </div>
                <div className="procedure-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h5>Basic Testing</h5>
                    <p>Conduct fat content, protein, SNF, pH, and temperature tests using calibrated equipment.</p>
                  </div>
                </div>
                <div className="procedure-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h5>Advanced Analysis</h5>
                    <p>For random samples, perform lactose, specific gravity, and freezing point tests as per schedule.</p>
                  </div>
                </div>
                <div className="procedure-step">
                  <div className="step-number">5</div>
                  <div className="step-content">
                    <h5>Result Recording</h5>
                    <p>Record all test results, compare with standards, assign quality grade, and update database.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Sample Details */}
            <div className="todays-samples-section">
              <h4>📋 Today's Sample Details</h4>
              <div className="samples-table-container">
                <div className="samples-table-header">
                  <div className="table-row">
                    <div className="table-cell">Sample ID</div>
                    <div className="table-cell">Farmer Details</div>
                    <div className="table-cell">Collection</div>
                    <div className="table-cell">Test Type</div>
                    <div className="table-cell">Results</div>
                    <div className="table-cell">Status</div>
                    <div className="table-cell">Action</div>
                  </div>
                </div>
                <div className="samples-table-body">
                  {todaysSamples.map((sample, index) => (
                    <div key={index} className="table-row sample-detail-row">
                      <div className="table-cell">
                        <div className="sample-id-info">
                          <span className="sample-id-badge">{sample.sampleId}</span>
                          <span className="sample-time">{sample.testTime}</span>
                        </div>
                      </div>
                      <div className="table-cell">
                        <div className="farmer-details">
                          <div className="farmer-primary">
                            <span className="farmer-name">{sample.farmerName}</span>
                            <span className="farmer-id">ID: {sample.farmerId}</span>
                          </div>
                          <div className="farmer-secondary">
                            <span className="farmer-phone">📞 {sample.farmerPhone}</span>
                            <span className="farmer-location">📍 {sample.location}</span>
                          </div>
                          <div className="farmer-stats">
                            <span className="cattle-count">🐄 {sample.cattleCount} cattle</span>
                            <span className="avg-production">📊 {sample.avgProduction}L/day</span>
                          </div>
                        </div>
                      </div>
                      <div className="table-cell">
                        <div className="collection-info">
                          <span className="collection-time">{sample.collectionTime}</span>
                          <span className="milk-quantity">{sample.quantity}L</span>
                          <span className="milk-type-badge">{sample.milkType}</span>
                        </div>
                      </div>
                      <div className="table-cell">
                        <div className="test-type-info">
                          <span className="test-type-badge">{sample.testType}</span>
                          <span className="test-duration">{sample.testDuration}</span>
                        </div>
                      </div>
                      <div className="table-cell">
                        <div className="test-results">
                          <div className="result-item">
                            <span className="result-label">Fat:</span>
                            <span className="result-value">{sample.fatContent}%</span>
                          </div>
                          <div className="result-item">
                            <span className="result-label">Protein:</span>
                            <span className="result-value">{sample.proteinContent}%</span>
                          </div>
                          <div className="result-item">
                            <span className="result-label">SNF:</span>
                            <span className="result-value">{sample.snfContent}%</span>
                          </div>
                          <div className="result-item">
                            <span className="result-label">pH:</span>
                            <span className="result-value">{sample.phLevel}</span>
                          </div>
                        </div>
                      </div>
                      <div className="table-cell">
                        <span className={`status-badge ${sample.status.toLowerCase()}`}>
                          {sample.status}
                        </span>
                        <div className="grade-badge">
                          <span className={`quality-grade grade-${sample.grade.toLowerCase().replace('+', '-plus')}`}>
                            {sample.grade}
                          </span>
                        </div>
                      </div>
                      <div className="table-cell">
                        <div className="sample-actions">
                          <button 
                            className="btn-small btn-view"
                            onClick={() => handleViewSampleDetails(sample)}
                          >
                            View
                          </button>
                          {sample.status === 'Pending' && (
                            <button 
                              className="btn-small btn-retest"
                              onClick={() => handleRetestSample(sample)}
                            >
                              Retest
                            </button>
                          )}
                          <button 
                            className="btn-small btn-report"
                            onClick={() => handleGenerateReport(sample)}
                          >
                            Report
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="location-filter">Filter by Location:</label>
          <select 
            id="location-filter"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
        <div className="collection-count">
          Showing {filteredCollections.length} collections
        </div>
      </div>

      {/* Collection Records Section */}
      <div className="section-container">
        <div className="content-card">
          <h2>Today's Farmer Collections</h2>
          <div className="collection-table">
            <div className="table-header">
              <div className="table-row">
                  <div className="table-cell">Farmer Name</div>
                  <div className="table-cell">Farmer ID</div>
                  <div className="table-cell">Milk Type</div>
                  <div className="table-cell">Quantity (L)</div>
                  <div className="table-cell">Fat %</div>
                  <div className="table-cell">SNF %</div>
                  <div className="table-cell">Rate (₹/L)</div>
                  <div className="table-cell">Amount (₹)</div>
                  <div className="table-cell">Status</div>
                </div>
              </div>
              <div className="table-body">
                {filteredCollections.length === 0 ? (
                  <div className="no-data">No collections found for selected filters</div>
                ) : (
                  filteredCollections.map(collection => (
                    <div key={collection.id} className="table-row">
                      <div className="table-cell" data-label="Farmer Name">{collection.farmerName}</div>
                      <div className="table-cell" data-label="Farmer ID">{collection.farmerId}</div>
                      <div className="table-cell" data-label="Milk Type">
                        <span className="milk-type-badge">{collection.milkType}</span>
                      </div>
                      <div className="table-cell" data-label="Quantity">{collection.quantity}L</div>
                      <div className="table-cell" data-label="Fat">{collection.fat}%</div>
                      <div className="table-cell" data-label="SNF">{collection.snf}%</div>
                      <div className="table-cell" data-label="Rate">₹{collection.rate}</div>
                      <div className="table-cell" data-label="Amount">₹{collection.amount.toFixed(2)}</div>
                      <div className="table-cell" data-label="Status">
                        <span 
                          className="status-badge"
                          style={{backgroundColor: getStatusColor(collection.status)}}
                        >
                          {collection.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

      {/* Collection Overview */}
      <div className="section-container">
        <div className="content-card">
          <div className="section-header-with-controls">
            <h2>📊 Collection Analytics Overview</h2>
            <div className="time-period-controls">
              <button 
                className={`time-period-btn ${selectedTimePeriod === 'daily' ? 'active' : ''}`}
                onClick={() => setSelectedTimePeriod('daily')}
              >
                Daily
              </button>
              <button 
                className={`time-period-btn ${selectedTimePeriod === 'weekly' ? 'active' : ''}`}
                onClick={() => setSelectedTimePeriod('weekly')}
              >
                Weekly
              </button>
              <button 
                className={`time-period-btn ${selectedTimePeriod === 'monthly' ? 'active' : ''}`}
                onClick={() => setSelectedTimePeriod('monthly')}
              >
                Monthly
              </button>
              <button 
                className={`time-period-btn ${selectedTimePeriod === 'yearly' ? 'active' : ''}`}
                onClick={() => setSelectedTimePeriod('yearly')}
              >
                Yearly
              </button>
            </div>
          </div>
          
          <div className="collection-overview-container">
            <div className="collection-summary">
              <div className="summary-stats">
                <div className="summary-item">
                  <span className="summary-number">
                    {getCurrentCollectionData().reduce((sum, item) => sum + item.collection, 0).toLocaleString()}L
                  </span>
                  <span className="summary-label">
                    {selectedTimePeriod === 'daily' ? 'Weekly' : 
                     selectedTimePeriod === 'weekly' ? 'Total (6 Weeks)' :
                     selectedTimePeriod === 'monthly' ? 'Yearly' : 'Total (4 Years)'} Collection
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-number">
                    {Math.round(getCurrentCollectionData().reduce((sum, item) => sum + item.farmers, 0) / getCurrentCollectionData().length)}
                  </span>
                  <span className="summary-label">Avg Farmers</span>
                </div>
                <div className="summary-item">
                  <span className="summary-number">
                    ₹{getCurrentCollectionData().reduce((sum, item) => sum + item.totalRevenue, 0).toLocaleString()}
                  </span>
                  <span className="summary-label">Total Revenue</span>
                </div>
                <div className="summary-item">
                  <span className="summary-number">
                    {(getCurrentCollectionData().reduce((sum, item) => sum + item.avgFat, 0) / getCurrentCollectionData().length).toFixed(1)}%
                  </span>
                  <span className="summary-label">Avg Fat Content</span>
                </div>
                <div className="summary-item">
                  <span className="summary-number">
                    ₹{(getCurrentCollectionData().reduce((sum, item) => sum + item.avgRate, 0) / getCurrentCollectionData().length).toFixed(2)}
                  </span>
                  <span className="summary-label">Avg Rate/L</span>
                </div>
                <div className="summary-item">
                  <span className="summary-number">
                    {(getCurrentCollectionData().reduce((sum, item) => sum + item.collection, 0) / getCurrentCollectionData().length / 1000).toFixed(1)}K
                  </span>
                  <span className="summary-label">
                    Avg per {selectedTimePeriod === 'yearly' ? 'Year' : selectedTimePeriod === 'monthly' ? 'Month' : selectedTimePeriod === 'weekly' ? 'Week' : 'Day'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="collection-chart">
              <div className="chart-header">
                <h3>
                  {selectedTimePeriod === 'daily' ? '📅 Daily' : 
                   selectedTimePeriod === 'weekly' ? '📊 Weekly' :
                   selectedTimePeriod === 'monthly' ? '📈 Monthly' : '📉 Yearly'} Collection Trends
                </h3>
                <span className="chart-period">{getPeriodLabel()}</span>
              </div>
              <div className="collection-bars">
                {getCurrentCollectionData().map((item, index) => (
                  <div key={index} className="collection-day">
                    <div className="day-bar-container">
                      <div 
                        className="day-bar" 
                        style={{ 
                          height: `${Math.max((item.collection / getMaxCollection()) * 100, 8)}%`,
                          background: selectedTimePeriod === 'daily' ? 
                            `linear-gradient(135deg, #a8e6cf 0%, #7fcdcd 100%)` :
                            selectedTimePeriod === 'weekly' ?
                            `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` :
                            selectedTimePeriod === 'monthly' ?
                            `linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)` :
                            `linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)`,
                          boxShadow: selectedTimePeriod === 'daily' ? 
                            '0 3px 10px rgba(127, 205, 205, 0.4)' :
                            selectedTimePeriod === 'weekly' ?
                            '0 3px 10px rgba(102, 126, 234, 0.4)' :
                            selectedTimePeriod === 'monthly' ?
                            '0 3px 10px rgba(252, 182, 159, 0.4)' :
                            '0 3px 10px rgba(255, 154, 158, 0.4)'
                        }}
                        title={`${item.period}: ${item.collection.toLocaleString()}L from ${item.farmers} farmers`}
                      ></div>
                    </div>
                    <div className="day-info">
                      <span className="day-name">
                        {selectedTimePeriod === 'daily' ? item.period.slice(0, 3) :
                         selectedTimePeriod === 'weekly' ? item.period.replace('Week ', 'W') :
                         selectedTimePeriod === 'monthly' ? item.period.slice(0, 3) :
                         item.period}
                      </span>
                      <span className="day-collection">
                        {item.collection >= 1000000 ? 
                          `${(item.collection / 1000000).toFixed(1)}M L` :
                          item.collection >= 1000 ? 
                          `${(item.collection / 1000).toFixed(1)}K L` :
                          `${item.collection}L`}
                      </span>
                      <span className="day-farmers">{item.farmers} farmers</span>
                      <span className="day-revenue">₹{item.totalRevenue >= 1000000 ? 
                        `${(item.totalRevenue / 1000000).toFixed(1)}M` :
                        item.totalRevenue >= 1000 ? 
                        `${(item.totalRevenue / 1000).toFixed(0)}K` :
                        item.totalRevenue.toFixed(0)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Milk Types & Farmer Management */}
      <div className="section-container">
        <div className="content-card">
          <h2>Milk Types & Farmer Statistics</h2>
          <div className="milk-farmer-grid">
            <div className="milk-types-section">
              <h3>Milk Type Distribution</h3>
              <div className="milk-type-stats">
                {milkTypeStats.map((type, index) => (
                  <div key={index} className="milk-type-item">
                    <div className="type-header">
                      <span className="type-name">{type.type}</span>
                      <span className="type-percentage">{type.percentage}%</span>
                    </div>
                    <div className="type-bar">
                      <div 
                        className="type-fill" 
                        style={{ 
                          width: `${type.percentage}%`,
                          background: `linear-gradient(90deg, ${type.color} 0%, ${type.color}CC 100%)`,
                          boxShadow: `0 2px 8px ${type.color}40`
                        }}
                      ></div>
                    </div>
                    <div className="type-details">
                      <span className="type-volume">{type.volume}</span>
                      <span className="type-farmers">{type.farmers} farmers</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="farmer-management-section">
              <h3>Farmer Management</h3>
              <div className="farmer-stats-grid">
                <div className="farmer-stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <span className="stat-number">{farmerStats.totalFarmers}</span>
                    <span className="stat-label">Total Farmers</span>
                  </div>
                </div>
                <div className="farmer-stat-card">
                  <div className="stat-icon">✅</div>
                  <div className="stat-info">
                    <span className="stat-number">{farmerStats.activeFarmers}</span>
                    <span className="stat-label">Active Today</span>
                  </div>
                </div>
                <div className="farmer-stat-card">
                  <div className="stat-icon">🆕</div>
                  <div className="stat-info">
                    <span className="stat-number">{farmerStats.newRegistrations}</span>
                    <span className="stat-label">New This Month</span>
                  </div>
                </div>
                <div className="farmer-stat-card">
                  <div className="stat-icon">💰</div>
                  <div className="stat-info">
                    <span className="stat-number">{farmerStats.pendingPayments}</span>
                    <span className="stat-label">Pending Payments</span>
                  </div>
                </div>
                <div className="farmer-stat-card top-farmer">
                  <div className="stat-icon">🏆</div>
                  <div className="stat-info">
                    <span className="stat-number">{farmerStats.topFarmer}</span>
                    <span className="stat-label">Top Farmer</span>
                  </div>
                </div>
                <div className="farmer-stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-info">
                    <span className="stat-number">{farmerStats.avgDailyCollection}L</span>
                    <span className="stat-label">Avg Daily/Farmer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics & Quality Section */}
      <div className="section-container">
        <div className="content-card">
          <h2>Quality Analytics & Temperature Monitoring</h2>
          <div className="analytics-grid-updated">
              
              <div className="quality-analysis">
                <h3>Quality Distribution</h3>
                <div className="quality-stats">
                  <div className="quality-item">
                    <div className="quality-header">
                      <span className="quality-grade grade-a-plus">A+</span>
                      <span className="quality-percent">45%</span>
                    </div>
                    <div className="quality-bar">
                      <div className="quality-fill" style={{ 
                        width: '45%', 
                        background: 'linear-gradient(90deg, #c8e6c9 0%, #a5d6a7 100%)',
                        boxShadow: '0 2px 4px rgba(165, 214, 167, 0.3)'
                      }}></div>
                    </div>
                    <span className="quality-description">Premium Quality</span>
                  </div>
                  <div className="quality-item">
                    <div className="quality-header">
                      <span className="quality-grade grade-a">A</span>
                      <span className="quality-percent">35%</span>
                    </div>
                    <div className="quality-bar">
                      <div className="quality-fill" style={{ 
                        width: '35%', 
                        background: 'linear-gradient(90deg, #b3e5fc 0%, #81d4fa 100%)',
                        boxShadow: '0 2px 4px rgba(129, 212, 250, 0.3)'
                      }}></div>
                    </div>
                    <span className="quality-description">High Quality</span>
                  </div>
                  <div className="quality-item">
                    <div className="quality-header">
                      <span className="quality-grade grade-b-plus">B+</span>
                      <span className="quality-percent">15%</span>
                    </div>
                    <div className="quality-bar">
                      <div className="quality-fill" style={{ 
                        width: '15%', 
                        background: 'linear-gradient(90deg, #fff3e0 0%, #ffcc02 100%)',
                        boxShadow: '0 2px 4px rgba(255, 204, 2, 0.3)'
                      }}></div>
                    </div>
                    <span className="quality-description">Good Quality</span>
                  </div>
                  <div className="quality-item">
                    <div className="quality-header">
                      <span className="quality-grade grade-b">B</span>
                      <span className="quality-percent">5%</span>
                    </div>
                    <div className="quality-bar">
                      <div className="quality-fill" style={{ 
                        width: '5%', 
                        background: 'linear-gradient(90deg, #ffe0b2 0%, #ffb74d 100%)',
                        boxShadow: '0 2px 4px rgba(255, 183, 77, 0.3)'
                      }}></div>
                    </div>
                    <span className="quality-description">Standard Quality</span>
                  </div>
                </div>
              </div>

              <div className="temperature-monitoring">
                <h3>Temperature Monitoring</h3>
                <div className="temp-stats">
                  <div className="temp-item optimal">
                    <div className="temp-icon-container" style={{ background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
                      <span className="temp-icon">❄️</span>
                    </div>
                    <div className="temp-info">
                      <span className="temp-label">Optimal Range</span>
                      <span className="temp-value">2-4°C</span>
                      <span className="temp-count">85% of collections</span>
                     <div className="temp-progress-bar">
                        <div className="temp-progress-fill" style={{ 
                          width: '85%', 
                          background: 'linear-gradient(90deg, #b3e5fc 0%, #81d4fa 100%)'
                        }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="temp-item warning">
                    <div className="temp-icon-container" style={{ background: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)' }}>
                       <span className="temp-icon">⚠️</span>
                    </div>
                    <div className="temp-info">
                      <span className="temp-label">Above Optimal</span>
                      <span className="temp-value">4-6°C</span>
                      <span className="temp-count">12% of collections</span>
                     <div className="temp-progress-bar">
                        <div className="temp-progress-fill" style={{ 
                          width: '12%', 
                          background: 'linear-gradient(90deg, #fff3e0 0%, #ffcc02 100%)'
                        }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="temp-item critical">
                    <div className="temp-icon-container" style={{ background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)' }}>
                       <span className="temp-icon">🔥</span>
                    </div>
                    <div className="temp-info">
                      <span className="temp-label">Critical</span>
                      <span className="temp-value">6°C</span>
                      <span className="temp-count">3% of collections</span>
                      <div className="temp-progress-bar">
                        <div className="temp-progress-fill" style={{ 
                          width: '3%', 
                          background: 'linear-gradient(90deg, #ffcdd2 0%, #ef9a9a 100%)'
                        }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



      {/* Reports & Alerts Section */}
      <div className="section-container">
        <div className="content-card">
          <h2>Reports & System Alerts</h2>
            
            <div className="reports-section">
              <div className="report-actions">
                <button className="btn-primary" onClick={() => setShowReportModal(true)}>
                  📊 Generate Daily Report
                </button>
                <button className="btn-secondary" onClick={() => setShowAnalyticsModal(true)}>
                  📈 Export Analytics
                </button>
                <button className="btn-info" onClick={() => setShowTrendModal(true)}>
                  📋 Quality Summary
                </button>
              </div>

              <div className="alerts-container">
                <h3>Recent Alerts & Notifications</h3>
                <div className="alerts-list">
                  {alerts.map(alert => (
                    <div key={alert.id} className={`alert-item ${alert.type} ${alert.severity}`}>
                      <div className="alert-icon">
                        {alert.type === 'error' && '❌'}
                        {alert.type === 'warning' && '⚠️'}
                        {alert.type === 'info' && 'ℹ️'}
                        {alert.type === 'success' && '✅'}
                      </div>
                      <div className="alert-content">
                        <span className="alert-message">{alert.message}</span>
                        <span className="alert-time">{alert.time}</span>
                      </div>
                      <div className="alert-actions">
                        <button className="btn-small">Dismiss</button>
                        {alert.severity === 'high' && (
                          <button className="btn-small btn-urgent">Take Action</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Add Collection Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Record New Collection</h3>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Location</label>
                <select 
                  value={newCollection.location}
                  onChange={(e) => setNewCollection({...newCollection, location: e.target.value})}
                >
                  <option value="">Select Location</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Cow ID</label>
                  <input 
                    type="text"
                    value={newCollection.cowId}
                    onChange={(e) => setNewCollection({...newCollection, cowId: e.target.value})}
                    placeholder="e.g., COW006"
                  />
                </div>
                <div className="form-group">
                  <label>Cow Name</label>
                  <input 
                    type="text"
                    value={newCollection.cowName}
                    onChange={(e) => setNewCollection({...newCollection, cowName: e.target.value})}
                    placeholder="e.g., Buttercup"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Quantity (L)</label>
                  <input 
                    type="number"
                    step="0.1"
                    value={newCollection.quantity}
                    onChange={(e) => setNewCollection({...newCollection, quantity: e.target.value})}
                    placeholder="0.0"
                  />
                </div>
                <div className="form-group">
                  <label>Quality Grade</label>
                  <select 
                    value={newCollection.quality}
                    onChange={(e) => setNewCollection({...newCollection, quality: e.target.value})}
                  >
                    <option value="">Select Grade</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Temperature (°C)</label>
                  <input 
                    type="number"
                    step="0.1"
                    value={newCollection.temperature}
                    onChange={(e) => setNewCollection({...newCollection, temperature: e.target.value})}
                    placeholder="4.0"
                  />
                </div>
                <div className="form-group">
                  <label>Fat Content (%)</label>
                  <input 
                    type="number"
                    step="0.1"
                    value={newCollection.fat}
                    onChange={(e) => setNewCollection({...newCollection, fat: e.target.value})}
                    placeholder="3.5"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Protein Content (%)</label>
                <input 
                  type="number"
                  step="0.1"
                  value={newCollection.protein}
                  onChange={(e) => setNewCollection({...newCollection, protein: e.target.value})}
                  placeholder="3.0"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleAddCollection}>Add Collection</button>
            </div>
          </div>
        </div>
      )}

      {/* Quality Check Modal */}
      {showQualityModal && selectedRecord && (
        <div className="modal-overlay" onClick={() => setShowQualityModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Quality Check - {selectedRecord.cowName}</h3>
              <button className="close-btn" onClick={() => setShowQualityModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="quality-check-details">
                <div className="basic-info">
                  <h4>Collection Details</h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Location:</span>
                      <span className="info-value">{selectedRecord.location}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Quantity:</span>
                      <span className="info-value">{selectedRecord.quantity}L</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Collection Time:</span>
                      <span className="info-value">{selectedRecord.time}</span>
                    </div>
                  </div>
                </div>
                <div className="quality-details">
                  <h4>Quality Metrics</h4>
                  <div className="metrics-grid">
                    <div className="metric-item">
                      <span className="metric-label">Quality Grade</span>
                      <span 
                        className="metric-value quality-badge"
                        style={{backgroundColor: getQualityColor(selectedRecord.quality)}}
                      >
                        {selectedRecord.quality}
                      </span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Temperature</span>
                      <span className={selectedRecord.temperature <= 4.5 ? 'metric-good' : 'metric-warning'}>
                        {selectedRecord.temperature}°C
                      </span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Fat Content</span>
                      <span className={selectedRecord.fat >= 3.5 ? 'metric-good' : 'metric-warning'}>
                        {selectedRecord.fat}%
                      </span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Protein Content</span>
                      <span className={selectedRecord.protein >= 3.0 ? 'metric-good' : 'metric-warning'}>
                        {selectedRecord.protein}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-danger" 
                onClick={() => updateQualityStatus('rejected')}
              >
                Reject
              </button>
              <button 
                className="btn-warning" 
                onClick={() => updateQualityStatus('pending')}
              >
                Pending Review
              </button>
              <button 
                className="btn-success" 
                onClick={() => updateQualityStatus('approved')}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalyticsModal && (
        <div className="modal-overlay" onClick={() => setShowAnalyticsModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Export Analytics Report</h3>
              <button className="close-btn" onClick={() => setShowAnalyticsModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="export-options">
                <h4>Select Report Type:</h4>
                <div className="checkbox-group">
                  <label><input type="checkbox" defaultChecked /> Production Summary</label>
                  <label><input type="checkbox" defaultChecked /> Quality Analysis</label>
                  <label><input type="checkbox" /> Temperature Logs</label>
                  <label><input type="checkbox" /> Equipment Status</label>
                </div>
                <div className="date-range">
                  <h4>Date Range:</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>From:</label>
                      <input type="date" defaultValue="2024-01-01" />
                    </div>
                    <div className="form-group">
                      <label>To:</label>
                      <input type="date" defaultValue="2024-01-31" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowAnalyticsModal(false)}>Cancel</button>
              <button className="btn-primary">Export to PDF</button>
              <button className="btn-success">Export to Excel</button>
            </div>
          </div>
        </div>
      )}

      {/* Trend Modal */}
      {showTrendModal && (
        <div className="modal-overlay" onClick={() => setShowTrendModal(false)}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Quality Summary & Trends</h3>
              <button className="close-btn" onClick={() => setShowTrendModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="trend-summary">
                <div className="summary-cards">
                  <div className="summary-card">
                    <h4>This Week</h4>
                    <div className="metric">
                      <span className="metric-value">3,263L</span>
                      <span className="metric-label">Total Production</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value grade-a-plus">A+</span>
                      <span className="metric-label">Average Quality</span>
                    </div>
                  </div>
                  <div className="summary-card">
                    <h4>This Month</h4>
                    <div className="metric">
                      <span className="metric-value">14,250L</span>
                      <span className="metric-label">Total Production</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value grade-a">A</span>
                      <span className="metric-label">Average Quality</span>
                    </div>
                  </div>
                </div>
                <div className="trend-insights">
                  <h4>Key Insights</h4>
                  <ul>
                    <li>✅ Production increased by 12% compared to last week</li>
                    <li>✅ Quality consistency improved by 8%</li>
                    <li>⚠️ Temperature variations noticed in Farm B - East Section</li>
                    <li>🎯 On track to meet monthly target of 18,000L</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowTrendModal(false)}>Close</button>
              <button className="btn-primary">Generate Full Report</button>
            </div>
          </div>
        </div>
      )}

      {/* Equipment Modal */}
      {showEquipmentModal && (
        <div className="modal-overlay" onClick={() => setShowEquipmentModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Equipment Details</h3>
              <button className="close-btn" onClick={() => setShowEquipmentModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="equipment-details-modal">
                <div className="detail-section">
                  <h4>Operating Status</h4>
                  <div className="status-grid">
                    <div className="status-item">
                      <span className="status-label">Current Status:</span>
                      <span className="status-value active">Active</span>
                    </div>
                    <div className="status-item">
                      <span className="status-label">Uptime:</span>
                      <span className="status-value">98.5%</span>
                    </div>
                    <div className="status-item">
                      <span className="status-label">Last Service:</span>
                      <span className="status-value">15 Jan 2024</span>
                    </div>
                  </div>
                </div>
                <div className="detail-section">
                  <h4>Performance Metrics</h4>
                  <div className="performance-metrics">
                    <div className="metric-item">
                      <span className="metric-name">Efficiency</span>
                      <div className="metric-bar">
                        <div className="metric-fill" style={{ width: '95%' }}></div>
                      </div>
                      <span className="metric-percentage">95%</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-name">Reliability</span>
                      <div className="metric-bar">
                        <div className="metric-fill" style={{ width: '88%' }}></div>
                      </div>
                      <span className="metric-percentage">88%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowEquipmentModal(false)}>Close</button>
              <button className="btn-warning">Schedule Maintenance</button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="modal-overlay" onClick={() => setShowReportModal(false)}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Daily Collection Report</h3>
              <button className="close-btn" onClick={() => setShowReportModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="report-content">
                <div className="report-header">
                  <h4>Collection Summary - {currentDate.toDateString()}</h4>
                </div>
                <div className="report-stats">
                  <div className="stat-row">
                    <span className="stat-label">Total Collections:</span>
                    <span className="stat-value">{collections.length}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Total Volume:</span>
                    <span className="stat-value">{collections.reduce((sum, c) => sum + parseFloat(c.quantity), 0).toFixed(1)}L</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Average Quality:</span>
                    <span className="stat-value">A</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Approved Collections:</span>
                    <span className="stat-value">{collections.filter(c => c.status === 'approved').length}</span>
                  </div>
                </div>
                <div className="report-breakdown">
                  <h4>Location Breakdown</h4>
                  <div className="location-stats">
                    {locations.map(location => {
                      const locationCollections = collections.filter(c => c.location === location);
                      const totalVolume = locationCollections.reduce((sum, c) => sum + parseFloat(c.quantity), 0);
                      return (
                        <div key={location} className="location-stat">
                          <span className="location-name">{location}</span>
                          <span className="location-volume">{totalVolume.toFixed(1)}L</span>
                          <span className="location-count">({locationCollections.length} collections)</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowReportModal(false)}>Close</button>
              <button className="btn-primary">Download PDF</button>
              <button className="btn-success">Email Report</button>
            </div>
          </div>
        </div>
      )}

      {/* Quality Test Modal */}
      {showQualityTestModal && (
        <div className="modal-overlay" onClick={() => setShowQualityTestModal(false)}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🧪 Complete Milk Quality Test</h3>
              <button className="close-btn" onClick={() => setShowQualityTestModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="test-navigation">
                <div className="test-tabs">
                  <button 
                    className={`test-tab ${activeTestTab === 'basic' ? 'active' : ''}`}
                    onClick={() => setActiveTestTab('basic')}
                  >
                    Basic Tests
                  </button>
                  <button 
                    className={`test-tab ${activeTestTab === 'advanced' ? 'active' : ''}`}
                    onClick={() => setActiveTestTab('advanced')}
                  >
                    Advanced Tests
                  </button>
                  <button 
                    className={`test-tab ${activeTestTab === 'microbiological' ? 'active' : ''}`}
                    onClick={() => setActiveTestTab('microbiological')}
                  >
                    Microbiological
                  </button>
                  <button 
                    className={`test-tab ${activeTestTab === 'additive' ? 'active' : ''}`}
                    onClick={() => setActiveTestTab('additive')}
                  >
                    Additive Tests
                  </button>
                </div>
              </div>

              <div className="test-content">
                {activeTestTab === 'basic' && (
                  <div className="test-section">
                    <h4>Basic Quality Parameters</h4>
                    <div className="test-parameters">
                      {Object.entries(qualityTestData.basicTests).map(([key, param]) => (
                        <div key={key} className="parameter-item">
                          <label className="parameter-label">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </label>
                          <div className="parameter-input-group">
                            <input 
                              type="number" 
                              step="0.1"
                              placeholder={`${param.min} - ${param.max}`}
                              className="parameter-input"
                            />
                            <span className="parameter-unit">{param.unit}</span>
                          </div>
                          <div className="parameter-range">
                            Range: {param.min} - {param.max} {param.unit}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTestTab === 'advanced' && (
                  <div className="test-section">
                    <h4>Advanced Quality Parameters</h4>
                    <div className="test-parameters">
                      {Object.entries(qualityTestData.advancedTests).map(([key, param]) => (
                        <div key={key} className="parameter-item">
                          <label className="parameter-label">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </label>
                          <div className="parameter-input-group">
                            <input 
                              type="number" 
                              step="0.001"
                              placeholder={`${param.min} - ${param.max}`}
                              className="parameter-input"
                            />
                            <span className="parameter-unit">{param.unit}</span>
                          </div>
                          <div className="parameter-range">
                            Range: {param.min} - {param.max} {param.unit}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTestTab === 'microbiological' && (
                  <div className="test-section">
                    <h4>Microbiological Tests</h4>
                    <div className="test-parameters">
                      {Object.entries(qualityTestData.microbiologicalTests).map(([key, param]) => (
                        <div key={key} className="parameter-item">
                          <label className="parameter-label">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </label>
                          <div className="parameter-input-group">
                            <input 
                              type="number" 
                              step="1"
                              placeholder={`Max: ${param.max}`}
                              className="parameter-input"
                            />
                            <span className="parameter-unit">{param.unit}</span>
                          </div>
                          <div className="parameter-range">
                            Maximum: {param.max} {param.unit}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTestTab === 'additive' && (
                  <div className="test-section">
                    <h4>Additive & Contamination Tests</h4>
                    <div className="test-parameters">
                      {Object.entries(qualityTestData.additiveTests).map(([key, param]) => (
                        <div key={key} className="parameter-item">
                          <label className="parameter-label">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </label>
                          <div className="parameter-input-group">
                            {param.status ? (
                              <select className="parameter-select">
                                <option value="absent">Absent</option>
                                <option value="present">Present</option>
                              </select>
                            ) : (
                              <>
                                <input 
                                  type="number" 
                                  step="0.1"
                                  placeholder={`Max: ${param.max}`}
                                  className="parameter-input"
                                />
                                <span className="parameter-unit">{param.unit}</span>
                              </>
                            )}
                          </div>
                          <div className="parameter-range">
                            {param.status ? `Expected: ${param.status}` : `Maximum: ${param.max} ${param.unit}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="test-sample-info">
                <h4>Sample Information</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Sample ID</label>
                    <input type="text" placeholder="Auto-generated" readOnly />
                  </div>
                  <div className="form-group">
                    <label>Region</label>
                    <select>
                      <option value="">Select Region</option>
                      {regions.map(region => (
                        <option key={region.id} value={region.id}>{region.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Farmer ID</label>
                    <input type="text" placeholder="Enter Farmer ID" />
                  </div>
                  <div className="form-group">
                    <label>Batch ID</label>
                    <input type="text" placeholder="Enter Batch ID" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Testing Notes</label>
                  <textarea 
                    placeholder="Enter any observations or notes about the sample..."
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowQualityTestModal(false)}>Cancel</button>
              <button className="btn-warning">Save as Draft</button>
              <button className="btn-success">Complete Test</button>
            </div>
          </div>
        </div>
      )}

      {/* Region Test Details Modal */}
      {showRegionTestModal && selectedRegion && (
        <div className="modal-overlay" onClick={() => setShowRegionTestModal(false)}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📊 {selectedRegion.name} Quality Analysis</h3>
              <button className="close-btn" onClick={() => setShowRegionTestModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="region-analysis">
                <div className="analysis-overview">
                  <div className="overview-stats">
                    <div className="overview-stat">
                      <span className="stat-number">{selectedRegion.totalCollections}</span>
                      <span className="stat-label">Total Collections</span>
                    </div>
                    <div className="overview-stat">
                      <span className="stat-number">{selectedRegion.testingSamples}</span>
                      <span className="stat-label">Samples Tested</span>
                    </div>
                    <div className="overview-stat">
                      <span className="stat-number">{((selectedRegion.passedTests / selectedRegion.testingSamples) * 100).toFixed(1)}%</span>
                      <span className="stat-label">Pass Rate</span>
                    </div>
                  </div>
                </div>

                <div className="quality-breakdown">
                  <h4>Quality Metrics Breakdown</h4>
                  <div className="metrics-chart">
                    <div className="metric-bar-item">
                      <span className="metric-name">Fat Content</span>
                      <div className="metric-bar-container">
                        <div 
                          className="metric-bar-fill" 
                          style={{ 
                            width: `${(selectedRegion.avgFat / 6.0) * 100}%`,
                            background: 'linear-gradient(90deg, #a8e6cf 0%, #7fcdcd 100%)'
                          }}
                        ></div>
                      </div>
                      <span className="metric-value">{selectedRegion.avgFat}%</span>
                    </div>
                    <div className="metric-bar-item">
                      <span className="metric-name">SNF Content</span>
                      <div className="metric-bar-container">
                        <div 
                          className="metric-bar-fill" 
                          style={{ 
                            width: `${(selectedRegion.avgSNF / 10.0) * 100}%`,
                            background: 'linear-gradient(90deg, #b3e5fc 0%, #81d4fa 100%)'
                          }}
                        ></div>
                      </div>
                      <span className="metric-value">{selectedRegion.avgSNF}%</span>
                    </div>
                    <div className="metric-bar-item">
                      <span className="metric-name">Protein Content</span>
                      <div className="metric-bar-container">
                        <div 
                          className="metric-bar-fill" 
                          style={{ 
                            width: `${(selectedRegion.avgProtein / 4.0) * 100}%`,
                            background: 'linear-gradient(90deg, #fff3e0 0%, #ffcc02 100%)'
                          }}
                        ></div>
                      </div>
                      <span className="metric-value">{selectedRegion.avgProtein}%</span>
                    </div>
                  </div>
                </div>

                <div className="region-locations">
                  <h4>Collection Centers</h4>
                  <div className="locations-list">
                    {selectedRegion.locations.map((location, index) => (
                      <div key={index} className="location-item">
                        <span className="location-name">{location}</span>
                        <span className="location-status active">Active</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="recent-samples">
                  <h4>Recent Test Samples</h4>
                  <div className="samples-table">
                    {testSamples
                      .filter(sample => sample.region === selectedRegion.name)
                      .map(sample => (
                        <div key={sample.id} className="sample-row">
                          <div className="sample-info">
                            <span className="sample-id">{sample.id}</span>
                            <span className="sample-farmer">{sample.farmerName}</span>
                          </div>
                          <div className="sample-results">
                            <span className="sample-fat">Fat: {sample.results.fatContent}%</span>
                            <span className="sample-protein">Protein: {sample.results.proteinContent}%</span>
                          </div>
                          <div className="sample-status">
                            <span className={`status-badge ${sample.status}`}>{sample.status}</span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowRegionTestModal(false)}>Close</button>
              <button className="btn-primary">Generate Report</button>
              <button className="btn-success">Export Data</button>
            </div>
          </div>
        </div>
      )}

      {/* Test Samples Modal */}
      {showTestSampleModal && (
        <div className="modal-overlay" onClick={() => setShowTestSampleModal(false)}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📋 Test Samples Database</h3>
              <button className="close-btn" onClick={() => setShowTestSampleModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="samples-database">
                <div className="samples-filters">
                  <div className="filter-group">
                    <label>Filter by Region:</label>
                    <select>
                      <option value="all">All Regions</option>
                      {regions.map(region => (
                        <option key={region.id} value={region.name}>{region.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Filter by Status:</label>
                    <select>
                      <option value="all">All Status</option>
                      <option value="passed">Passed</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                </div>

                <div className="samples-table-detailed">
                  <div className="table-header">
                    <div className="table-row">
                      <div className="table-cell">Sample ID</div>
                      <div className="table-cell">Date</div>
                      <div className="table-cell">Region</div>
                      <div className="table-cell">Farmer</div>
                      <div className="table-cell">Test Type</div>
                      <div className="table-cell">Status</div>
                      <div className="table-cell">Results</div>
                      <div className="table-cell">Actions</div>
                    </div>
                  </div>
                  <div className="table-body">
                    {testSamples.map(sample => (
                      <div key={sample.id} className="table-row">
                        <div className="table-cell">
                          <span className="sample-id-badge">{sample.id}</span>
                        </div>
                        <div className="table-cell">{sample.sampleDate}</div>
                        <div className="table-cell">{sample.region}</div>
                        <div className="table-cell">
                          <div className="farmer-info">
                            <span className="farmer-name">{sample.farmerName}</span>
                            <span className="farmer-id">({sample.farmerId})</span>
                          </div>
                        </div>
                        <div className="table-cell">
                          <span className="test-type-badge">{sample.testType}</span>
                        </div>
                        <div className="table-cell">
                          <span className={`status-badge ${sample.status}`}>
                            {sample.status}
                          </span>
                        </div>
                        <div className="table-cell">
                          <div className="results-summary">
                            <span>Fat: {sample.results.fatContent}%</span>
                            <span>Protein: {sample.results.proteinContent}%</span>
                          </div>
                        </div>
                        <div className="table-cell">
                          <button className="btn-small">View Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowTestSampleModal(false)}>Close</button>
              <button className="btn-primary">Export All Samples</button>
              <button className="btn-success">Generate Summary Report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MilkCollection;