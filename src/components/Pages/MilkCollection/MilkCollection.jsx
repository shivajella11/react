import React, { useState, useEffect } from 'react';
import './MilkCollection.css';
import { 
  FiPlus, FiTrash2, FiEdit, FiPrinter, FiDownload, FiMapPin, FiActivity, 
  FiBarChart, FiTrendingUp, FiTrendingDown, FiAlertTriangle, FiCheckCircle, FiSettings,
  FiCalendar, FiClock, FiFilter, FiSearch, FiRefreshCw, FiEye,
  FiUser, FiList, FiX, FiSave, FiUsers, FiAlertCircle, FiInfo, FiPhone, FiShare2
} from 'react-icons/fi';
import { 
  FaTemperatureLow, FaWeight, FaFlask, FaMicroscope, FaClipboardCheck, 
  FaIndustry, FaChartLine, FaChartBar, FaChartPie, FaCertificate,
  FaAward, FaBalanceScale, FaVial, FaShieldAlt, FaServer
} from 'react-icons/fa';
import { 
  GiMilkCarton, GiTestTubes, GiChemicalDrop, GiDroplets
} from 'react-icons/gi';
import { 
  MdScience, MdHealthAndSafety, MdBiotech, MdAnalytics, MdLocationOn, 
  MdAssessment, MdVerified, MdSecurity, MdLab
} from 'react-icons/md';

const MilkCollectionCenter = () => {
  const [formData, setFormData] = useState({
    id: Date.now(),
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    region: '',
    farmerId: '',
    farmerName: '',
    quantity: '',
    fat: '',
    snf: '',
    temperature: '',
    bacterialCount: '',
    antibioticsCheck: '',
    proteinContent: '',
    lactoseContent: '',
    ph: '',
    density: '',
    freezingPoint: '',
    adulteration: '',
    remarks: ''
  });

  // Sample data for demonstration
  const generateSampleData = () => {
    const sampleData = [
      {
        id: 1,
        date: '2025-07-22',
        time: '06:30',
        region: 'North Region',
        farmerId: 'F005',
        farmerName: 'Ramesh Patel',
        quantity: '60.4',
        fat: '4.33',
        snf: '9.62',
        proteinContent: '3.43',
        lactoseContent: '4.7',
        ph: '6.62',
        density: '1.030',
        temperature: '5.0',
        bacterialCount: 45000,
        antibioticsCheck: 'Pass',
        adulteration: 'Not Detected',
        freezingPoint: '-0.520',
        remarks: 'Excellent quality milk'
      },
      {
        id: 2,
        date: '2025-07-18',
        time: '07:15',
        region: 'West Region',
        farmerId: 'F003',
        farmerName: 'Mohan Singh',
        quantity: '24.7',
        fat: '4.73',
        snf: '8.83',
        proteinContent: '3.69',
        lactoseContent: '4.6',
        ph: '6.82',
        density: '1.029',
        temperature: '7.8',
        bacterialCount: 38000,
        antibioticsCheck: 'Pass',
        adulteration: 'Not Detected',
        freezingPoint: '-0.515',
        remarks: 'Good quality'
      },
      {
        id: 3,
        date: '2025-07-18',
        time: '06:45',
        region: 'South Region',
        farmerId: 'F002',
        farmerName: 'Priya Sharma',
        quantity: '24.2',
        fat: '5.15',
        snf: '8.73',
        proteinContent: '2.91',
        lactoseContent: '4.8',
        ph: '6.75',
        density: '1.031',
        temperature: '7.0',
        bacterialCount: 42000,
        antibioticsCheck: 'Pass',
        adulteration: 'Not Detected',
        freezingPoint: '-0.518',
        remarks: 'Good quality'
      },
      {
        id: 4,
        date: '2025-07-18',
        time: '08:00',
        region: 'East Region',
        farmerId: 'F001',
        farmerName: 'Rajesh Kumar',
        quantity: '63.2',
        fat: '4.37',
        snf: '9.53',
        proteinContent: '3.56',
        lactoseContent: '4.9',
        ph: '6.56',
        density: '1.032',
        temperature: '7.8',
        bacterialCount: 35000,
        antibioticsCheck: 'Pass',
        adulteration: 'Not Detected',
        freezingPoint: '-0.525',
        remarks: 'Excellent quality milk'
      },
      {
        id: 5,
        date: '2025-07-23',
        time: '07:30',
        region: 'South Region',
        farmerId: 'F002',
        farmerName: 'Priya Sharma',
        quantity: '53.1',
        fat: '4.88',
        snf: '8.15',
        proteinContent: '3.54',
        lactoseContent: '4.5',
        ph: '6.59',
        density: '1.028',
        temperature: '7.5',
        bacterialCount: 41000,
        antibioticsCheck: 'Pass',
        adulteration: 'Not Detected',
        freezingPoint: '-0.512',
        remarks: 'Good quality'
      },
      {
        id: 6,
        date: '2025-07-22',
        time: '06:00',
        region: 'South Region',
        farmerId: 'F003',
        farmerName: 'Mohan Singh',
        quantity: '83.7',
        fat: '3.93',
        snf: '8.86',
        proteinContent: '3.05',
        lactoseContent: '4.4',
        ph: '6.64',
        density: '1.029',
        temperature: '5.5',
        bacterialCount: 250000,
        antibioticsCheck: 'Fail',
        adulteration: 'Detected',
        freezingPoint: '-0.480',
        remarks: 'Failed quality tests'
      },
      {
        id: 7,
        date: '2025-07-19',
        time: '07:45',
        region: 'North Region',
        farmerId: 'F002',
        farmerName: 'Priya Sharma',
        quantity: '51.1',
        fat: '5.27',
        snf: '8.31',
        proteinContent: '3.72',
        lactoseContent: '4.3',
        ph: '6.61',
        density: '1.030',
        temperature: '4.1',
        bacterialCount: 180000,
        antibioticsCheck: 'Fail',
        adulteration: 'Not Detected',
        freezingPoint: '-0.495',
        remarks: 'Antibiotic residue detected'
      },
      {
        id: 8,
        date: '2025-07-18',
        time: '08:15',
        region: 'North Region',
        farmerId: 'F002',
        farmerName: 'Priya Sharma',
        quantity: '60.1',
        fat: '4.48',
        snf: '8.46',
        proteinContent: '2.99',
        lactoseContent: '4.6',
        ph: '6.71',
        density: '1.029',
        temperature: '7.4',
        bacterialCount: 52000,
        antibioticsCheck: 'Pass',
        adulteration: 'Not Detected',
        freezingPoint: '-0.522',
        remarks: 'Good quality'
      }
    ];
    return sampleData;
  };

  const [collections, setCollections] = useState(() => {
    // Load from localStorage or generate sample data
    const saved = localStorage.getItem('milkCollections');
    return saved ? JSON.parse(saved) : generateSampleData();
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  const [filterQuality, setFilterQuality] = useState('');
  const [activeTab, setActiveTab] = useState('collection');
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [activeRankingTab, setActiveRankingTab] = useState('volume');
  const [stats, setStats] = useState({
    totalQuantity: 0,
    avgFat: 0,
    avgSnf: 0,
    avgProtein: 0,
    passedTests: 0,
    totalFarmers: 0,
    totalRegions: 0,
    premiumGrade: 0,
    rejectedSamples: 0,
    dailyCollection: 0,
    weeklyGrowth: 0,
    monthlyGrowth: 0
  });

  // Sample regions for dropdown
  const regions = [
    'North Region', 'South Region', 'East Region', 'West Region',
    'Central Region', 'Coastal Region', 'Mountain Region', 'Valley Region'
  ];

  // Enhanced quality standards
  const qualityStandards = {
    fat: { premium: 4.0, good: 3.0, poor: 2.5 },
    snf: { premium: 8.5, good: 8.0, poor: 7.5 },
    protein: { premium: 3.2, good: 2.8, poor: 2.5 },
    temperature: { excellent: 6, good: 8, poor: 10 },
    bacterial: { excellent: 50000, good: 100000, poor: 200000 },
    ph: { optimal: { min: 6.6, max: 6.8 }, acceptable: { min: 6.4, max: 7.0 } }
  };

  // Save to localStorage whenever collections change
  useEffect(() => {
    localStorage.setItem('milkCollections', JSON.stringify(collections));
  }, [collections]);

  // Enhanced statistics calculation
  useEffect(() => {
    if (collections.length > 0) {
      const totalQuantity = collections.reduce((sum, item) => sum + parseFloat(item.quantity || 0), 0);
      const avgFat = collections.reduce((sum, item) => sum + parseFloat(item.fat || 0), 0) / collections.length;
      const avgSnf = collections.reduce((sum, item) => sum + parseFloat(item.snf || 0), 0) / collections.length;
      const avgProtein = collections.reduce((sum, item) => sum + parseFloat(item.proteinContent || 0), 0) / collections.length;
      const passedTests = collections.filter(item => item.antibioticsCheck === 'Pass').length;
      const totalFarmers = new Set(collections.map(item => item.farmerId)).size;
      const totalRegions = new Set(collections.map(item => item.region)).size;
      const premiumGrade = collections.filter(item => qualityStatus(item) === 'Premium').length;
      const rejectedSamples = collections.filter(item => qualityStatus(item) === 'Rejected').length;
      
      // Daily collection (today's entries)
      const today = new Date().toISOString().split('T')[0];
      const dailyCollection = collections.filter(item => item.date === today).length;
      
      // Calculate growth percentages (mock data for demonstration)
      const weeklyGrowth = Math.floor(Math.random() * 15) + 5; // 5-20% growth
      const monthlyGrowth = Math.floor(Math.random() * 25) + 10; // 10-35% growth
      
      setStats({
        totalQuantity: totalQuantity.toFixed(2),
        avgFat: avgFat.toFixed(2),
        avgSnf: avgSnf.toFixed(2),
        avgProtein: avgProtein.toFixed(2),
        passedTests,
        totalFarmers,
        totalRegions,
        premiumGrade,
        rejectedSamples,
        dailyCollection,
        weeklyGrowth,
        monthlyGrowth
      });
    } else {
      setStats({
        totalQuantity: 0,
        avgFat: 0,
        avgSnf: 0,
        avgProtein: 0,
        passedTests: 0,
        totalFarmers: 0,
        totalRegions: 0,
        premiumGrade: 0,
        rejectedSamples: 0,
        dailyCollection: 0,
        weeklyGrowth: 0,
        monthlyGrowth: 0
      });
    }
  }, [collections]);

  // Notification system
  const addNotification = (type, message) => {
    const id = Date.now();
    const notification = { id, type, message };
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-calculate quality indicators
    if (['fat', 'snf', 'proteinContent', 'temperature', 'bacterialCount', 'ph'].includes(name)) {
      // Trigger quality preview update
      setTimeout(() => {
        const updatedData = { ...formData, [name]: value };
        const quality = qualityStatus(updatedData);
        // You can add visual feedback here
      }, 100);
    }
  };

  // Form validation helper
  const getFieldValidation = (fieldName, value) => {
    const validations = {
      fat: { min: 0, max: 10, optimal: { min: 3.0, max: 5.5 } },
      snf: { min: 0, max: 15, optimal: { min: 8.0, max: 10.0 } },
      proteinContent: { min: 0, max: 6, optimal: { min: 2.8, max: 3.8 } },
      lactoseContent: { min: 0, max: 8, optimal: { min: 4.5, max: 5.0 } },
      temperature: { min: -10, max: 50, optimal: { min: 4, max: 6 } },
      ph: { min: 6.0, max: 7.5, optimal: { min: 6.4, max: 7.0 } },
      density: { min: 1.025, max: 1.035, optimal: { min: 1.028, max: 1.033 } },
      bacterialCount: { min: 0, max: 1000000, optimal: { min: 0, max: 100000 } }
    };

    const validation = validations[fieldName];
    if (!validation || !value) return 'neutral';

    const numValue = parseFloat(value);
    if (numValue < validation.min || numValue > validation.max) return 'error';
    if (validation.optimal && (numValue < validation.optimal.min || numValue > validation.optimal.max)) return 'warning';
    return 'success';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form data
    const quantity = parseFloat(formData.quantity);
    const fat = parseFloat(formData.fat);
    const snf = parseFloat(formData.snf);
    const temp = parseFloat(formData.temperature);
    const bacterial = parseFloat(formData.bacterialCount);

    setTimeout(() => {
      const newEntry = { ...formData, id: editingId || Date.now() };
      
      if (editingId) {
        setCollections(prev => prev.map(item => 
          item.id === editingId ? newEntry : item
        ));
        addNotification('success', `Collection entry updated successfully for Farmer ${formData.farmerId}`);
        setEditingId(null);
      } else {
        setCollections(prev => [...prev, newEntry]);
        addNotification('success', `New collection entry added for Farmer ${formData.farmerId}`);
      }

      // Quality check notifications
      const quality = qualityStatus(newEntry);
      if (quality === 'Premium') {
        addNotification('success', `Excellent! Premium quality milk received from ${formData.farmerId}`);
      } else if (quality === 'Rejected') {
        addNotification('error', `Warning! Milk from ${formData.farmerId} failed quality tests`);
      }

      // Volume notification
      if (quantity > 100) {
        addNotification('info', `Large volume collection: ${quantity}L from ${formData.farmerId}`);
      }

      // Reset form
      setFormData({
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        region: '',
        farmerId: '',
        farmerName: '',
        quantity: '',
        fat: '',
        snf: '',
        temperature: '',
        bacterialCount: '',
        antibioticsCheck: '',
        proteinContent: '',
        lactoseContent: '',
        ph: '',
        density: '',
        freezingPoint: '',
        adulteration: '',
        remarks: ''
      });
      
      setLoading(false);
    }, 1000);
  };

  const handleEdit = (id) => {
    const entry = collections.find(item => item.id === id);
    if (entry) {
      setFormData(entry);
      setEditingId(id);
      setActiveTab('collection');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setCollections(prev => prev.filter(item => item.id !== id));
    }
  };

  const qualityStatus = (entry) => {
    const fat = parseFloat(entry.fat || 0);
    const snf = parseFloat(entry.snf || 0);
    const protein = parseFloat(entry.proteinContent || 0);
    const temp = parseFloat(entry.temperature || 0);
    const bacterial = parseFloat(entry.bacterialCount || 0);
    const ph = parseFloat(entry.ph || 6.7);
    
    // Check for rejection criteria first
    if (entry.antibioticsCheck === 'Fail' || bacterial > qualityStandards.bacterial.poor || entry.adulteration === 'Detected') {
      return 'Rejected';
    }
    
    // Premium quality criteria
    if (fat >= qualityStandards.fat.premium && 
        snf >= qualityStandards.snf.premium && 
        protein >= qualityStandards.protein.premium &&
        temp <= qualityStandards.temperature.excellent && 
        bacterial <= qualityStandards.bacterial.excellent && 
        ph >= qualityStandards.ph.optimal.min && 
        ph <= qualityStandards.ph.optimal.max &&
        entry.antibioticsCheck === 'Pass') {
      return 'Premium';
    }
    
    // Good quality criteria
    else if (fat >= qualityStandards.fat.good && 
             snf >= qualityStandards.snf.good && 
             protein >= qualityStandards.protein.good &&
             temp <= qualityStandards.temperature.good && 
             bacterial <= qualityStandards.bacterial.good && 
             ph >= qualityStandards.ph.acceptable.min && 
             ph <= qualityStandards.ph.acceptable.max &&
             entry.antibioticsCheck === 'Pass') {
      return 'Good';
    }
    
    // Low quality (acceptable but not premium)
    else if (fat >= qualityStandards.fat.poor && 
             snf >= qualityStandards.snf.poor && 
             temp <= qualityStandards.temperature.poor && 
             bacterial <= qualityStandards.bacterial.poor && 
             entry.antibioticsCheck === 'Pass') {
      return 'Fair';
    }
    
    // Poor quality
    else {
      return 'Poor';
    }
  };

  // Price calculation based on quality
  const calculatePrice = (entry) => {
    const quantity = parseFloat(entry.quantity || 0);
    const quality = qualityStatus(entry);
    
    const basePrice = 47.25; // Base price per liter
    const qualityMultipliers = {
      'Premium': 1.0,
      'Good': 1.0,
      'Fair': 1.0,
      'Poor': 0.85,
      'Rejected': 0.0
    };
    
    const pricePerLiter = basePrice * qualityMultipliers[quality];
    const totalPrice = quantity * pricePerLiter;
    
    return {
      pricePerLiter: pricePerLiter.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      quality
    };
  };

  // Duplicate entry function
  const duplicateEntry = (id) => {
    const entry = collections.find(item => item.id === id);
    if (entry) {
      const duplicatedEntry = {
        ...entry,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setCollections(prev => [...prev, duplicatedEntry]);
      addNotification('info', `Entry duplicated for Farmer ${entry.farmerId}`);
    }
  };

  // Helper function to sort farmer data based on active ranking tab
  const sortFarmerData = (farmerEntries, sortBy) => {
    return farmerEntries.sort((a, b) => {
      switch (sortBy) {
        case 'volume':
          return b[1].totalQuantity - a[1].totalQuantity;
        case 'quality':
          const aQualityRate = a[1].totalEntries > 0 ? (a[1].premiumCount / a[1].totalEntries) * 100 : 0;
          const bQualityRate = b[1].totalEntries > 0 ? (b[1].premiumCount / b[1].totalEntries) * 100 : 0;
          return bQualityRate - aQualityRate;
        case 'value':
          return b[1].totalValue - a[1].totalValue;
        case 'consistency':
          return b[1].consistencyScore - a[1].consistencyScore;
        default:
          return b[1].totalQuantity - a[1].totalQuantity;
      }
    });
  };

  const filteredCollections = collections.filter(entry => {
    const matchesSearch = searchTerm === '' || 
      entry.farmerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.region.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = filterRegion === '' || entry.region === filterRegion;
    
    const matchesQuality = filterQuality === '' || qualityStatus(entry) === filterQuality;
    
    return matchesSearch && matchesRegion && matchesQuality;
  });

  return (
    <div className="milk-collection-main-container">
      {/* Enhanced Notification System */}
      <div className="notification-container fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-card p-4 rounded-lg shadow-lg border-l-4 max-w-sm transform transition-all duration-300 ${
              notification.type === 'success' ? 'bg-green-50 border-green-500 text-green-800' :
              notification.type === 'error' ? 'bg-red-50 border-red-500 text-red-800' :
              notification.type === 'warning' ? 'bg-yellow-50 border-yellow-500 text-yellow-800' :
              'bg-blue-50 border-blue-500 text-blue-800'
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {notification.type === 'success' && <FiCheckCircle className="h-5 w-5" />}
                {notification.type === 'error' && <FiAlertTriangle className="h-5 w-5" />}
                {notification.type === 'warning' && <FiAlertTriangle className="h-5 w-5" />}
                {notification.type === 'info' && <FiActivity className="h-5 w-5" />}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{notification.message}</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                    className="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    <span className="sr-only">Dismiss</span>
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Header */}
      <div className="milk-collection-header">
        <div className="milk-collection-header-content">
          <div className="milk-collection-title-section">
            <h1 className="milk-collection-main-title">
              <GiMilkCarton />
              Milk Collection Management System
            </h1>
            <p className="milk-collection-subtitle">
              Comprehensive dairy collection and quality management platform
            </p>
          </div>
          
          <div className="milk-collection-header-actions">
            <div className="milk-collection-search-container">
              <FiSearch />
              <input
                type="text"
                placeholder="Search by Farmer ID, Name or Region..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="milk-collection-search-input"
              />
            </div>
            
            {activeTab === 'records' && (
              <>
                <div className="filter-dropdown">
                  <select
                    value={filterRegion}
                    onChange={(e) => setFilterRegion(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">All Regions</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
                
                <div className="filter-dropdown">
                  <select
                    value={filterQuality}
                    onChange={(e) => setFilterQuality(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">All Quality</option>
                    <option value="Premium">Premium</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="milk-collection-nav-tabs">
          <button
            onClick={() => setActiveTab('collection')}
            className={`milk-collection-nav-tab ${activeTab === 'collection' ? 'active' : ''}`}
          >
            <FiPlus />
            Collection Entry
          </button>
          <button
            onClick={() => setActiveTab('records')}
            className={`milk-collection-nav-tab ${activeTab === 'records' ? 'active' : ''}`}
          >
            <FiList />
            Collection Records
          </button>
          <button
            onClick={() => setActiveTab('quality')}
            className={`milk-collection-nav-tab ${activeTab === 'quality' ? 'active' : ''}`}
          >
            <FaFlask />
            Quality Testing
          </button>
          <button
            onClick={() => setActiveTab('laboratory')}
            className={`milk-collection-nav-tab ${activeTab === 'laboratory' ? 'active' : ''}`}
          >
            <FaMicroscope />
            Laboratory Analysis
          </button>
          <button
            onClick={() => setActiveTab('regional')}
            className={`milk-collection-nav-tab ${activeTab === 'regional' ? 'active' : ''}`}
          >
            <FiMapPin />
            Regional Statistics
          </button>
          <button
            onClick={() => setActiveTab('farmers')}
            className={`milk-collection-nav-tab ${activeTab === 'farmers' ? 'active' : ''}`}
          >
            <FiUser />
            Farmer Management
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="milk-collection-content">
        
        {/* Enhanced Collection Form Tab */}
        {activeTab === 'collection' && (
          <div className="enhanced-collection-form-section">
            <div className="enhanced-form-container">
              {/* Compact Header Banner */}
              <div className="enhanced-form-banner">
                <div className="banner-content">
                  <div className="banner-icon-wrapper">
                    <GiMilkCarton className="banner-main-icon" />
                  </div>
                  <div className="banner-text-content">
                    <h3 className="banner-title">
                      {editingId ? 'Edit Collection Entry' : 'New Milk Collection'}
                    </h3>
                    <p className="banner-subtitle">
                      {editingId ? 'Update collection details' : 'Enter milk collection information'}
                    </p>
                  </div>
                  <div className="banner-status-indicator">
                    <div className={`status-dot ${editingId ? 'edit-mode' : 'add-mode'}`}></div>
                    <span className="status-text">{editingId ? 'Edit Mode' : 'Add Mode'}</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Form with Sections */}
              <form onSubmit={handleSubmit} className="enhanced-collection-form">
                
                {/* Basic Information Section */}
                <div className="form-section basic-info-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <FiInfo />
                    </div>
                    <h4 className="section-title">Basic Information</h4>
                    <div className="section-divider"></div>
                  </div>
                  
                  <div className="form-fields-grid">
                    <div className="enhanced-form-field">
                      <label className="enhanced-field-label">
                        <FiCalendar className="label-icon" />
                        <span className="label-text">Collection Date</span>
                        <span className="required-indicator">*</span>
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="date" 
                          name="date" 
                          value={formData.date} 
                          onChange={handleChange} 
                          required 
                          className="enhanced-form-input date-input" 
                        />
                      </div>
                    </div>
                    
                    <div className="enhanced-form-field">
                      <label className="enhanced-field-label">
                        <FiClock className="label-icon" />
                        <span className="label-text">Collection Time</span>
                        <span className="required-indicator">*</span>
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="time" 
                          name="time" 
                          value={formData.time} 
                          onChange={handleChange} 
                          required 
                          className="enhanced-form-input time-input" 
                        />
                      </div>
                    </div>
                    
                    <div className="enhanced-form-field">
                      <label className="enhanced-field-label">
                        <FiMapPin className="label-icon" />
                        <span className="label-text">Region</span>
                        <span className="required-indicator">*</span>
                      </label>
                      <div className="input-wrapper">
                        <select 
                          name="region" 
                          value={formData.region} 
                          onChange={handleChange} 
                          required 
                          className="enhanced-form-input select-input"
                        >
                          <option value="">Select Region</option>
                          {regions.map(region => (
                            <option key={region} value={region}>{region}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Farmer Information Section */}
                <div className="form-section farmer-info-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <FiUsers />
                    </div>
                    <h4 className="section-title">Farmer Details</h4>
                    <div className="section-divider"></div>
                  </div>
                  
                  <div className="form-fields-grid">
                    <div className="enhanced-form-field">
                      <label className="enhanced-field-label">
                        <FiUser className="label-icon" />
                        <span className="label-text">Farmer ID</span>
                        <span className="required-indicator">*</span>
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="text" 
                          name="farmerId" 
                          placeholder="Enter farmer ID (e.g., F001)" 
                          value={formData.farmerId} 
                          onChange={handleChange} 
                          required 
                          className="enhanced-form-input text-input" 
                        />
                      </div>
                    </div>
                    
                    <div className="enhanced-form-field">
                      <label className="enhanced-field-label">
                        <FiUser className="label-icon" />
                        <span className="label-text">Farmer Name</span>
                        <span className="required-indicator">*</span>
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="text" 
                          name="farmerName" 
                          placeholder="Enter full name" 
                          value={formData.farmerName} 
                          onChange={handleChange} 
                          required 
                          className="enhanced-form-input text-input" 
                        />
                      </div>
                    </div>
                    
                    <div className="enhanced-form-field">
                      <label className="enhanced-field-label">
                        <GiMilkCarton className="label-icon" />
                        <span className="label-text">Quantity (Liters)</span>
                        <span className="required-indicator">*</span>
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          name="quantity" 
                          placeholder="0.00" 
                          value={formData.quantity} 
                          onChange={handleChange} 
                          required 
                          step="0.01"
                          min="0"
                          className="enhanced-form-input number-input" 
                        />
                        <span className="input-unit">L</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quality Parameters Section */}
                <div className="form-section quality-params-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <FaFlask />
                    </div>
                    <h4 className="section-title">Quality Parameters</h4>
                    <div className="section-divider"></div>
                  </div>
                  
                  <div className="form-fields-grid quality-grid">
                    <div className="enhanced-form-field">
                      <label className="enhanced-field-label">
                        <GiDroplets className="label-icon" />
                        <span className="label-text">Fat Content</span>
                        <span className="required-indicator">*</span>
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          name="fat" 
                          placeholder="0.00" 
                          value={formData.fat} 
                          onChange={handleChange} 
                          required 
                          step="0.01"
                          min="0"
                          max="10"
                          className={`enhanced-form-input number-input ${getFieldValidation('fat', formData.fat)}`}
                        />
                        <span className="input-unit">%</span>
                        {formData.fat && (
                          <div className={`validation-indicator ${getFieldValidation('fat', formData.fat)}`}>
                            {getFieldValidation('fat', formData.fat) === 'success' && <FiCheckCircle />}
                            {getFieldValidation('fat', formData.fat) === 'warning' && <FiAlertTriangle />}
                            {getFieldValidation('fat', formData.fat) === 'error' && <FiAlertCircle />}
                          </div>
                        )}
                      </div>
                      <div className="field-hint">Normal range: 3.0-5.5%</div>
                    </div>
                    
                    <div className="enhanced-form-field">
                      <label className="enhanced-field-label">
                        <GiChemicalDrop className="label-icon" />
                        <span className="label-text">SNF Content</span>
                        <span className="required-indicator">*</span>
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          name="snf" 
                          placeholder="0.00" 
                          value={formData.snf} 
                          onChange={handleChange} 
                          required 
                          step="0.01"
                          min="0"
                          max="15"
                          className="enhanced-form-input number-input" 
                        />
                        <span className="input-unit">%</span>
                      </div>
                      <div className="field-hint">Normal range: 8.0-10.0%</div>
                    </div>
                    
                    <div className="enhanced-form-field">
                      <label className="enhanced-field-label">
                        <MdBiotech className="label-icon" />
                        <span className="label-text">Protein Content</span>
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          name="proteinContent" 
                          placeholder="0.00" 
                          value={formData.proteinContent} 
                          onChange={handleChange} 
                          step="0.01"
                          min="0"
                          max="6"
                          className="enhanced-form-input number-input" 
                        />
                        <span className="input-unit">%</span>
                      </div>
                      <div className="field-hint">Normal range: 2.8-3.8%</div>
                    </div>
                    
                    <div className="enhanced-form-field">
                      <label className="enhanced-field-label">
                        <GiChemicalDrop className="label-icon" />
                        <span className="label-text">Lactose Content</span>
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          name="lactoseContent" 
                          placeholder="0.00" 
                          value={formData.lactoseContent} 
                          onChange={handleChange} 
                          step="0.01"
                          min="0"
                          max="8"
                          className="enhanced-form-input number-input" 
                        />
                        <span className="input-unit">%</span>
                      </div>
                      <div className="field-hint">Normal range: 4.5-5.0%</div>
                    </div>
                  </div>
                </div>

                {/* Physical & Chemical Tests Section */}
                <div className="form-section tests-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <FaMicroscope />
                    </div>
                    <h4 className="section-title">Physical & Chemical Tests</h4>
                    <div className="section-divider"></div>
                  </div>
                  
                  <div className="form-fields-grid tests-grid">
                    <div className="enhanced-form-field">
                      <label className="enhanced-field-label">
                        <FaTemperatureLow className="label-icon" />
                        <span className="label-text">Temperature</span>
                        <span className="required-indicator">*</span>
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          name="temperature" 
                          placeholder="0.0" 
                          value={formData.temperature} 
                          onChange={handleChange} 
                          required 
                          step="0.1"
                          className="enhanced-form-input number-input" 
                        />
                        <span className="input-unit">°C</span>
                      </div>
                      <div className="field-hint">Ideal: 4-6°C</div>
                    </div>
                    
                    <div className="enhanced-form-field">
                      <label className="enhanced-field-label">
                        <MdScience className="label-icon" />
                        <span className="label-text">pH Level</span>
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          name="ph" 
                          placeholder="6.70" 
                          value={formData.ph} 
                          onChange={handleChange} 
                          step="0.01"
                          min="6.0"
                          max="7.5"
                          className="enhanced-form-input number-input" 
                        />
                      </div>
                      <div className="field-hint">Normal: 6.4-7.0</div>
                    </div>
                    
                    <div className="enhanced-form-field">
                      <label className="enhanced-field-label">
                        <FaBalanceScale className="label-icon" />
                        <span className="label-text">Density</span>
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          name="density" 
                          placeholder="1.030" 
                          value={formData.density} 
                          onChange={handleChange} 
                          step="0.001"
                          min="1.025"
                          max="1.035"
                          className="enhanced-form-input number-input" 
                        />
                        <span className="input-unit">g/ml</span>
                      </div>
                      <div className="field-hint">Range: 1.028-1.033</div>
                    </div>
                    
                    <div className="enhanced-form-field">
                      <label className="enhanced-field-label">
                        <FaTemperatureLow className="label-icon" />
                        <span className="label-text">Freezing Point</span>
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          name="freezingPoint" 
                          placeholder="-0.520" 
                          value={formData.freezingPoint} 
                          onChange={handleChange} 
                          step="0.001"
                          max="-0.40"
                          min="-0.60"
                          className="enhanced-form-input number-input" 
                        />
                        <span className="input-unit">°C</span>
                      </div>
                      <div className="field-hint">Range: -0.50 to -0.56</div>
                    </div>
                  </div>
                </div>

                {/* Safety & Quality Checks Section */}
                <div className="form-section safety-checks-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <MdHealthAndSafety />
                    </div>
                    <h4 className="section-title">Safety & Quality Checks</h4>
                    <div className="section-divider"></div>
                  </div>
                  
                  <div className="form-fields-grid safety-grid">
                    <div className="enhanced-form-field">
                      <label className="enhanced-field-label">
                        <MdScience className="label-icon" />
                        <span className="label-text">Bacterial Count</span>
                        <span className="required-indicator">*</span>
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          name="bacterialCount" 
                          placeholder="50000" 
                          value={formData.bacterialCount} 
                          onChange={handleChange} 
                          required 
                          min="0"
                          className="enhanced-form-input number-input" 
                        />
                        <span className="input-unit">CFU/ml</span>
                      </div>
                      <div className="field-hint">Good: &lt;100,000 CFU/ml</div>
                    </div>
                    
                    <div className="enhanced-form-field">
                      <label className="enhanced-field-label">
                        <MdHealthAndSafety className="label-icon" />
                        <span className="label-text">Antibiotics Test</span>
                        <span className="required-indicator">*</span>
                      </label>
                      <div className="input-wrapper">
                        <select 
                          name="antibioticsCheck" 
                          value={formData.antibioticsCheck} 
                          onChange={handleChange} 
                          required 
                          className="enhanced-form-input select-input"
                        >
                          <option value="">Select Result</option>
                          <option value="Pass">✓ Pass - No Detection</option>
                          <option value="Fail">✗ Fail - Detected</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="enhanced-form-field">
                      <label className="enhanced-field-label">
                        <MdSecurity className="label-icon" />
                        <span className="label-text">Adulteration Test</span>
                      </label>
                      <div className="input-wrapper">
                        <select 
                          name="adulteration" 
                          value={formData.adulteration} 
                          onChange={handleChange} 
                          className="enhanced-form-input select-input"
                        >
                          <option value="">Select Result</option>
                          <option value="Not Detected">✓ Not Detected - Pure</option>
                          <option value="Detected">✗ Detected - Adulterated</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quality Preview Section */}
                {(formData.fat || formData.snf || formData.proteinContent || formData.temperature || formData.bacterialCount) && (
                  <div className="form-section quality-preview-section">
                    <div className="section-header">
                      <div className="section-icon">
                        <FaAward />
                      </div>
                      <h4 className="section-title">Quality Assessment Preview</h4>
                      <div className="section-divider"></div>
                    </div>
                    
                    <div className="quality-preview-content">
                      <div className="quality-status-card">
                        <div className={`quality-badge ${qualityStatus(formData).toLowerCase()}`}>
                          <div className="quality-icon">
                            {qualityStatus(formData) === 'Premium' && <FaAward />}
                            {qualityStatus(formData) === 'Good' && <FiCheckCircle />}
                            {qualityStatus(formData) === 'Fair' && <FiInfo />}
                            {qualityStatus(formData) === 'Poor' && <FiAlertTriangle />}
                            {qualityStatus(formData) === 'Rejected' && <FiAlertCircle />}
                          </div>
                          <div className="quality-text">
                            <span className="quality-grade">{qualityStatus(formData)}</span>
                            <span className="quality-label">Quality Grade</span>
                          </div>
                        </div>
                        
                        {formData.quantity && (
                          <div className="price-preview">
                            <div className="price-info">
                              <span className="price-label">Estimated Price</span>
                              <span className="price-value">₹{calculatePrice(formData).totalPrice}</span>
                            </div>
                            <div className="price-details">
                              <span className="price-per-liter">₹{calculatePrice(formData).pricePerLiter}/L</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="quality-indicators-grid">
                        {formData.fat && (
                          <div className={`quality-indicator ${getFieldValidation('fat', formData.fat)}`}>
                            <GiDroplets />
                            <span>Fat: {formData.fat}%</span>
                          </div>
                        )}
                        {formData.snf && (
                          <div className={`quality-indicator ${getFieldValidation('snf', formData.snf)}`}>
                            <GiChemicalDrop />
                            <span>SNF: {formData.snf}%</span>
                          </div>
                        )}
                        {formData.proteinContent && (
                          <div className={`quality-indicator ${getFieldValidation('proteinContent', formData.proteinContent)}`}>
                            <MdBiotech />
                            <span>Protein: {formData.proteinContent}%</span>
                          </div>
                        )}
                        {formData.temperature && (
                          <div className={`quality-indicator ${getFieldValidation('temperature', formData.temperature)}`}>
                            <FaTemperatureLow />
                            <span>Temp: {formData.temperature}°C</span>
                          </div>
                        )}
                        {formData.bacterialCount && (
                          <div className={`quality-indicator ${getFieldValidation('bacterialCount', formData.bacterialCount)}`}>
                            <MdScience />
                            <span>Bacterial: {parseInt(formData.bacterialCount).toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Notes Section */}
                <div className="form-section notes-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <FiEdit />
                    </div>
                    <h4 className="section-title">Additional Information</h4>
                    <div className="section-divider"></div>
                  </div>
                  
                  <div className="enhanced-form-field full-width-field">
                    <label className="enhanced-field-label">
                      <FiEdit className="label-icon" />
                      <span className="label-text">Remarks & Observations</span>
                    </label>
                    <div className="input-wrapper">
                      <textarea 
                        name="remarks" 
                        placeholder="Enter any additional notes, observations, or special conditions..." 
                        value={formData.remarks} 
                        onChange={handleChange} 
                        rows="4"
                        className="enhanced-form-input textarea-input" 
                      />
                    </div>
                    <div className="field-hint">Optional: Add any relevant observations or special notes</div>
                  </div>
                </div>

                {/* Enhanced Form Actions */}
                <div className="enhanced-form-actions">
                  <div className="actions-left">
                    {editingId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setFormData({
                            id: Date.now(),
                            date: new Date().toISOString().split('T')[0],
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            region: '',
                            farmerId: '',
                            farmerName: '',
                            quantity: '',
                            fat: '',
                            snf: '',
                            temperature: '',
                            bacterialCount: '',
                            antibioticsCheck: '',
                            proteinContent: '',
                            lactoseContent: '',
                            ph: '',
                            density: '',
                            freezingPoint: '',
                            adulteration: '',
                            remarks: ''
                          });
                        }}
                        className="enhanced-btn-cancel"
                      >
                        <FiX className="btn-icon" />
                        <span>Cancel Edit</span>
                      </button>
                    )}
                  </div>
                  
                  <div className="actions-right">
                    <button 
                      type="button"
                      onClick={() => {
                        setFormData({
                          id: Date.now(),
                          date: new Date().toISOString().split('T')[0],
                          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                          region: '',
                          farmerId: '',
                          farmerName: '',
                          quantity: '',
                          fat: '',
                          snf: '',
                          temperature: '',
                          bacterialCount: '',
                          antibioticsCheck: '',
                          proteinContent: '',
                          lactoseContent: '',
                          ph: '',
                          density: '',
                          freezingPoint: '',
                          adulteration: '',
                          remarks: ''
                        });
                      }}
                      className="enhanced-btn-reset"
                    >
                      <FiRefreshCw className="btn-icon" />
                      <span>Reset Form</span>
                    </button>
                    
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="enhanced-btn-submit"
                    >
                      {loading ? (
                        <>
                          <div className="enhanced-loading-spinner"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <FiSave className="btn-icon" />
                          <span>{editingId ? 'Update Collection' : 'Save Collection'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Records Tab */}
        {activeTab === 'records' && (
          <div className="milk-collection-records-main-section">
            <div className="milk-collection-records-compact-banner">
              <div className="milk-collection-records-banner-content">
                <div className="milk-collection-records-banner-icon">
                  <FiList />
                </div>
                <div className="milk-collection-records-banner-text">
                  <h3 className="milk-collection-records-banner-title">
                    Collection Records Management
                  </h3>
                  <p className="milk-collection-records-banner-subtitle">View, manage, and analyze all milk collection records</p>
                </div>
              </div>
            </div>

            {/* Enhanced Statistics Grid */}
            <div className="milk-collection-enhanced-stats-grid">
              <div className="milk-collection-enhanced-stat-card primary-card">
                <div className="milk-collection-enhanced-stat-icon primary">
                  <GiMilkCarton />
                </div>
                <div className="milk-collection-enhanced-stat-content">
                  <div className="milk-collection-enhanced-stat-number">{stats.totalQuantity}L</div>
                  <div className="milk-collection-enhanced-stat-label">Total Quantity</div>
                  <div className="milk-collection-enhanced-stat-trend positive">
                    <FiTrendingUp />
                    <span>Collection active</span>
                  </div>
                </div>
              </div>
              
              <div className="milk-collection-enhanced-stat-card success-card">
                <div className="milk-collection-enhanced-stat-icon success">
                  <MdScience />
                </div>
                <div className="milk-collection-enhanced-stat-content">
                  <div className="milk-collection-enhanced-stat-number">{stats.avgFat}%</div>
                  <div className="milk-collection-enhanced-stat-label">Avg. Fat Content</div>
                  <div className="milk-collection-enhanced-stat-trend positive">
                    <FiTrendingUp />
                    <span>+0.3% improvement</span>
                  </div>
                </div>
              </div>
              
              <div className="milk-collection-enhanced-stat-card info-card">
                <div className="milk-collection-enhanced-stat-icon info">
                  <GiChemicalDrop />
                </div>
                <div className="milk-collection-enhanced-stat-content">
                  <div className="milk-collection-enhanced-stat-number">{stats.avgSnf}%</div>
                  <div className="milk-collection-enhanced-stat-label">Avg. SNF Content</div>
                  <div className="milk-collection-enhanced-stat-trend positive">
                    <FiTrendingUp />
                    <span>+0.5% improvement</span>
                  </div>
                </div>
              </div>
              
              <div className="milk-collection-enhanced-stat-card warning-card">
                <div className="milk-collection-enhanced-stat-icon warning">
                  <MdHealthAndSafety />
                </div>
                <div className="milk-collection-enhanced-stat-content">
                  <div className="milk-collection-enhanced-stat-number">{stats.passedTests}/{collections.length}</div>
                  <div className="milk-collection-enhanced-stat-label">Quality Pass Rate</div>
                  <div className="milk-collection-enhanced-stat-trend positive">
                    <FiCheckCircle />
                    <span>{collections.length > 0 ? ((stats.passedTests / collections.length) * 100).toFixed(1) : 0}% success</span>
                  </div>
                </div>
              </div>

              <div className="milk-collection-enhanced-stat-card success-card">
                <div className="milk-collection-enhanced-stat-icon success">
                  <FiUser />
                </div>
                <div className="milk-collection-enhanced-stat-content">
                  <div className="milk-collection-enhanced-stat-number">{stats.totalFarmers}</div>
                  <div className="milk-collection-enhanced-stat-label">Active Farmers</div>
                  <div className="milk-collection-enhanced-stat-trend positive">
                    <FiTrendingUp />
                    <span>{stats.totalRegions} regions</span>
                  </div>
                </div>
              </div>

              <div className="milk-collection-enhanced-stat-card info-card">
                <div className="milk-collection-enhanced-stat-icon info">
                  <FaCertificate />
                </div>
                <div className="milk-collection-enhanced-stat-content">
                  <div className="milk-collection-enhanced-stat-number">{stats.premiumGrade}</div>
                  <div className="milk-collection-enhanced-stat-label">Premium Grade</div>
                  <div className="milk-collection-enhanced-stat-trend positive">
                    <FaAward />
                    <span>{collections.length > 0 ? ((stats.premiumGrade / collections.length) * 100).toFixed(1) : 0}% premium</span>
                  </div>
                </div>
              </div>

              <div className="milk-collection-enhanced-stat-card primary-card">
                <div className="milk-collection-enhanced-stat-icon primary">
                  <MdBiotech />
                </div>
                <div className="milk-collection-enhanced-stat-content">
                  <div className="milk-collection-enhanced-stat-number">{stats.avgProtein}%</div>
                  <div className="milk-collection-enhanced-stat-label">Avg. Protein</div>
                  <div className="milk-collection-enhanced-stat-trend positive">
                    <FiActivity />
                    <span>Quality metric</span>
                  </div>
                </div>
              </div>

              <div className="milk-collection-enhanced-stat-card warning-card">
                <div className="milk-collection-enhanced-stat-icon warning">
                  <FiAlertTriangle />
                </div>
                <div className="milk-collection-enhanced-stat-content">
                  <div className="milk-collection-enhanced-stat-number">{stats.rejectedSamples}</div>
                  <div className="milk-collection-enhanced-stat-label">Rejected Samples</div>
                  <div className="milk-collection-enhanced-stat-trend negative">
                    <FiTrendingDown />
                    <span>{collections.length > 0 ? ((stats.rejectedSamples / collections.length) * 100).toFixed(1) : 0}% rejected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Performance Overview */}
            <div className="performance-overview-section">
              <h4>Performance Overview</h4>
              <div className="performance-metrics">
                <div className="performance-metric">
                  <div className="metric-header">
                    <h5>
                      <FiCalendar />
                      Daily Collection
                    </h5>
                    <span className="metric-value">{stats.dailyCollection} entries</span>
                  </div>
                  <div className="metric-description">
                    Collections received today
                  </div>
                </div>

                <div className="performance-metric">
                  <div className="metric-header">
                    <h5>
                      <FiTrendingUp />
                      Weekly Growth
                    </h5>
                    <span className="metric-value positive">+{stats.weeklyGrowth}%</span>
                  </div>
                  <div className="metric-description">
                    Growth compared to last week
                  </div>
                </div>

                <div className="performance-metric">
                  <div className="metric-header">
                    <h5>
                      <FiBarChart />
                      Monthly Trend
                    </h5>
                    <span className="metric-value positive">+{stats.monthlyGrowth}%</span>
                  </div>
                  <div className="metric-description">
                    Growth compared to last month
                  </div>
                </div>

                <div className="performance-metric">
                  <div className="metric-header">
                    <h5>
                      <MdAnalytics />
                      Total Value
                    </h5>
                    <span className="metric-value">
                      ₹{collections.reduce((sum, entry) => sum + parseFloat(calculatePrice(entry).totalPrice || 0), 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="metric-description">
                    Total collection value
                  </div>
                </div>
              </div>
            </div>

            {/* Records List */}
            <div className="milk-collection-records-list-container">
              <div className="milk-collection-records-list-header">
                <h4>Collection Entries ({filteredCollections.length} of {collections.length})</h4>
                <div className="milk-collection-records-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      setActiveTab('collection');
                      addNotification('info', 'Switched to collection entry form');
                    }}
                    title="Add new milk collection entry"
                  >
                    <FiPlus />
                    Add New Entry
                  </button>
                </div>
              </div>

              {filteredCollections.length === 0 ? (
                <div className="no-records">
                  <GiMilkCarton className="no-records-icon" />
                  <h3>No Collection Records Found</h3>
                  <p>Start by adding your first milk collection entry using the form above.</p>
                  <button 
                    onClick={() => setActiveTab('collection')}
                    className="btn btn-primary"
                  >
                    <FiPlus />
                    Add First Entry
                  </button>
                </div>
              ) : (
                <div className="milk-collection-entries-grid-container">
                  {filteredCollections.map((entry) => (
                    <div key={entry.id} className="milk-collection-entry-card-wrapper">
                      <div className="milk-collection-entry-card-header-section">
                        <div className="milk-collection-entry-farmer-id">
                          <strong>#{entry.farmerId}</strong>
                        </div>
                        <div className={`milk-collection-entry-quality-badge ${qualityStatus(entry).toLowerCase()}`}>
                          {qualityStatus(entry)}
                        </div>
                      </div>
                      
                      <div className="milk-collection-entry-details-container">
                        <div className="milk-collection-entry-detail-item">
                          <span className="milk-collection-entry-detail-label">Date:</span>
                          <span className="milk-collection-entry-detail-value">{entry.date}</span>
                        </div>
                        <div className="milk-collection-entry-detail-item">
                          <span className="milk-collection-entry-detail-label">Region:</span>
                          <span className="milk-collection-entry-detail-value">{entry.region}</span>
                        </div>
                        <div className="milk-collection-entry-detail-item">
                          <span className="milk-collection-entry-detail-label">Quantity:</span>
                          <span className="milk-collection-entry-detail-value">{entry.quantity}L</span>
                        </div>
                        <div className="milk-collection-entry-detail-item">
                          <span className="milk-collection-entry-detail-label">Fat:</span>
                          <span className="milk-collection-entry-detail-value">{entry.fat}%</span>
                        </div>
                        <div className="milk-collection-entry-detail-item">
                          <span className="milk-collection-entry-detail-label">SNF:</span>
                          <span className="milk-collection-entry-detail-value">{entry.snf}%</span>
                        </div>
                        <div className="milk-collection-entry-detail-item">
                          <span className="milk-collection-entry-detail-label">Temperature:</span>
                          <span className="milk-collection-entry-detail-value">{entry.temperature}°C</span>
                        </div>
                        <div className="milk-collection-entry-detail-item">
                          <span className="milk-collection-entry-detail-label">Protein:</span>
                          <span className="milk-collection-entry-detail-value">{entry.proteinContent}%</span>
                        </div>
                        <div className="milk-collection-entry-detail-item">
                          <span className="milk-collection-entry-detail-label">pH Level:</span>
                          <span className="milk-collection-entry-detail-value">{entry.ph}</span>
                        </div>
                        <div className="milk-collection-entry-detail-item">
                          <span className="milk-collection-entry-detail-label">Price/L:</span>
                          <span className="milk-collection-entry-detail-value milk-collection-entry-price-value">₹{calculatePrice(entry).pricePerLiter}</span>
                        </div>
                        <div className="milk-collection-entry-detail-item milk-collection-entry-total-row">
                          <span className="milk-collection-entry-detail-label">Total Value:</span>
                          <span className="milk-collection-entry-detail-value milk-collection-entry-total-price">₹{calculatePrice(entry).totalPrice}</span>
                        </div>
                      </div>
                      
                      <div className="milk-collection-entry-actions-container">
                        <button
                          onClick={() => handleEdit(entry.id)}
                          className="milk-collection-entry-action-btn milk-collection-entry-edit-btn"
                          title="Edit this entry"
                        >
                          <FiEdit />
                          Edit
                        </button>
                        <button
                          onClick={() => duplicateEntry(entry.id)}
                          className="milk-collection-entry-action-btn milk-collection-entry-copy-btn"
                          title="Duplicate this entry"
                        >
                          <FiShare2 />
                          Copy
                        </button>
                        <button
                          onClick={() => {
                            alert(`
Collection Details:
Farmer: ${entry.farmerId} (${entry.farmerName || 'Unknown'})
Region: ${entry.region}
Date: ${entry.date} at ${entry.time}
Quantity: ${entry.quantity}L
Quality: ${qualityStatus(entry)}
Fat: ${entry.fat}%, SNF: ${entry.snf}%
Price: ₹${calculatePrice(entry).totalPrice}
            `);
                          }}
                          className="milk-collection-entry-action-btn milk-collection-entry-view-btn"
                          title="View full details"
                        >
                          <FiEye />
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="milk-collection-entry-action-btn milk-collection-entry-delete-btn"
                          title="Delete this entry"
                        >
                          <FiTrash2 />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quality Testing Tab */}
        {activeTab === 'quality' && (
          <div className="milk-quality-testing-main-section">
            <div className="milk-quality-testing-compact-banner">
              <div className="milk-quality-testing-banner-content">
                <div className="milk-quality-testing-banner-icon">
                  <FaFlask />
                </div>
                <div className="milk-quality-testing-banner-text">
                  <h3 className="milk-quality-testing-banner-title">
                    Quality Testing & Standards
                  </h3>
                  <p className="milk-quality-testing-banner-subtitle">Comprehensive milk quality analysis and testing results</p>
                </div>
              </div>
            </div>

            {/* Enhanced Quality Metrics Single Line Dashboard */}
            <div className="milk-quality-enhanced-metrics-dashboard">
              <div className="milk-quality-enhanced-metrics-single-row">
                <div className="milk-quality-enhanced-metric-card premium-card">
                  <div className="milk-quality-enhanced-metric-icon premium">
                    <FaAward />
                  </div>
                  <div className="milk-quality-enhanced-metric-content">
                    <div className="milk-quality-enhanced-metric-value">{collections.filter(c => qualityStatus(c) === 'Premium').length}</div>
                    <div className="milk-quality-enhanced-metric-label">Premium Quality</div>
                    <div className="milk-quality-enhanced-metric-percentage premium">
                      {collections.length > 0 ? ((collections.filter(c => qualityStatus(c) === 'Premium').length / collections.length) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                </div>

                <div className="milk-quality-enhanced-metric-card antibiotic-card">
                  <div className="milk-quality-enhanced-metric-icon antibiotic">
                    <FaClipboardCheck />
                  </div>
                  <div className="milk-quality-enhanced-metric-content">
                    <div className="milk-quality-enhanced-metric-value">{collections.filter(c => c.antibioticsCheck === 'Pass').length}</div>
                    <div className="milk-quality-enhanced-metric-label">Antibiotic Free</div>
                    <div className="milk-quality-enhanced-metric-percentage antibiotic">
                      {collections.length > 0 ? ((collections.filter(c => c.antibioticsCheck === 'Pass').length / collections.length) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                </div>

                <div className="milk-quality-enhanced-metric-card pure-card">
                  <div className="milk-quality-enhanced-metric-icon pure">
                    <FaShieldAlt />
                  </div>
                  <div className="milk-quality-enhanced-metric-content">
                    <div className="milk-quality-enhanced-metric-value">{collections.filter(c => c.adulteration === 'Not Detected').length}</div>
                    <div className="milk-quality-enhanced-metric-label">Pure Samples</div>
                    <div className="milk-quality-enhanced-metric-percentage pure">
                      {collections.length > 0 ? ((collections.filter(c => c.adulteration === 'Not Detected').length / collections.length) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                </div>

                <div className="milk-quality-enhanced-metric-card rejected-card">
                  <div className="milk-quality-enhanced-metric-icon rejected">
                    <FiAlertTriangle />
                  </div>
                  <div className="milk-quality-enhanced-metric-content">
                    <div className="milk-quality-enhanced-metric-value">{collections.filter(c => qualityStatus(c) === 'Rejected').length}</div>
                    <div className="milk-quality-enhanced-metric-label">Rejected</div>
                    <div className="milk-quality-enhanced-metric-percentage rejected">
                      {collections.length > 0 ? ((collections.filter(c => qualityStatus(c) === 'Rejected').length / collections.length) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Distribution Chart */}
            <div className="quality-distribution-section">
              <h4>Quality Distribution Analysis</h4>
              <div className="distribution-chart">
                {['Premium', 'Good', 'Fair', 'Poor', 'Rejected'].map(grade => {
                  const count = collections.filter(c => qualityStatus(c) === grade).length;
                  const percentage = collections.length > 0 ? (count / collections.length) * 100 : 0;
                  return (
                    <div key={grade} className="distribution-bar">
                      <div className="bar-header">
                        <span className="grade-name">{grade}</span>
                        <span className="grade-count">{count} ({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="bar-container">
                        <div 
                          className={`bar-fill ${grade.toLowerCase()}`} 
                          style={{width: `${percentage}%`}}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="quality-standards">
              <div className="standards-grid">
                <div className="standard-card">
                  <div className="standard-icon">
                    <GiDroplets />
                  </div>
                  <h4>Fat Content</h4>
                  <div className="standard-range">
                    <div className="range-item premium">Premium: ≥4.0%</div>
                    <div className="range-item good">Good: 3.0-3.9%</div>
                    <div className="range-item poor">Poor: &lt;3.0%</div>
                  </div>
                </div>

                <div className="standard-card">
                  <div className="standard-icon">
                    <GiChemicalDrop />
                  </div>
                  <h4>SNF Content</h4>
                  <div className="standard-range">
                    <div className="range-item premium">Premium: ≥8.5%</div>
                    <div className="range-item good">Good: 8.0-8.4%</div>
                    <div className="range-item poor">Poor: &lt;8.0%</div>
                  </div>
                </div>

                <div className="standard-card">
                  <div className="standard-icon">
                    <FaTemperatureLow />
                  </div>
                  <h4>Temperature</h4>
                  <div className="standard-range">
                    <div className="range-item premium">Excellent: ≤6°C</div>
                    <div className="range-item good">Good: 6-7°C</div>
                    <div className="range-item poor">Poor: &gt;7°C</div>
                  </div>
                </div>

                <div className="standard-card">
                  <div className="standard-icon">
                    <MdScience />
                  </div>
                  <h4>Bacterial Count</h4>
                  <div className="standard-range">
                    <div className="range-item premium">Excellent: ≤50k CFU/ml</div>
                    <div className="range-item good">Acceptable: 50k-100k CFU/ml</div>
                    <div className="range-item poor">Reject: &gt;200k CFU/ml</div>
                  </div>
                </div>

                <div className="standard-card">
                  <div className="standard-icon">
                    <MdBiotech />
                  </div>
                  <h4>Protein Content</h4>
                  <div className="standard-range">
                    <div className="range-item premium">Premium: ≥3.2%</div>
                    <div className="range-item good">Good: 2.8-3.1%</div>
                    <div className="range-item poor">Poor: &lt;2.8%</div>
                  </div>
                </div>

                <div className="standard-card">
                  <div className="standard-icon">
                    <MdHealthAndSafety />
                  </div>
                  <h4>pH Level</h4>
                  <div className="standard-range">
                    <div className="range-item premium">Optimal: 6.6-6.8</div>
                    <div className="range-item good">Acceptable: 6.4-7.0</div>
                    <div className="range-item poor">Poor: &lt;6.4 or &gt;7.0</div>
                  </div>
                </div>

                <div className="standard-card">
                  <div className="standard-icon">
                    <FaBalanceScale />
                  </div>
                  <h4>Density</h4>
                  <div className="standard-range">
                    <div className="range-item premium">Normal: 1.028-1.032 g/ml</div>
                    <div className="range-item good">Acceptable: 1.026-1.034 g/ml</div>
                    <div className="range-item poor">Abnormal: &lt;1.026 or &gt;1.034</div>
                  </div>
                </div>

                <div className="standard-card">
                  <div className="standard-icon">
                    <MdSecurity />
                  </div>
                  <h4>Adulteration Tests</h4>
                  <div className="standard-range">
                    <div className="range-item premium">Water: Not Detected</div>
                    <div className="range-item premium">Starch: Not Detected</div>
                    <div className="range-item poor">Any Detection: Reject</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Quality Analysis */}
            <div className="quality-analysis">
              <h4>Recent Quality Test Results</h4>
              {filteredCollections.length === 0 ? (
                <div className="no-data">
                  <div className="no-data-icon">
                    <FaFlask />
                  </div>
                  <h4>No Quality Test Data Available</h4>
                  <p>Start adding collection entries to see quality analysis results here.</p>
                </div>
              ) : (
                <div className="analysis-grid">
                  {filteredCollections.slice(0, 6).map((entry) => (
                    <div key={entry.id} className="analysis-card">
                      <div className="analysis-header">
                        <div className="farmer-id">
                          <strong>Farmer: {entry.farmerId}</strong>
                          <small>{entry.farmerName}</small>
                        </div>
                        <div className={`quality-status ${qualityStatus(entry).toLowerCase()}`}>
                          {qualityStatus(entry)}
                        </div>
                      </div>
                      
                      <div className="analysis-metrics">
                        <div className="metric">
                          <span>Fat Content</span>
                          <span className={parseFloat(entry.fat) >= 4.0 ? 'good' : parseFloat(entry.fat) >= 3.0 ? 'okay' : 'poor'}>
                            {entry.fat}%
                          </span>
                        </div>
                        <div className="metric">
                          <span>SNF Content</span>
                          <span className={parseFloat(entry.snf) >= 8.5 ? 'good' : parseFloat(entry.snf) >= 8.0 ? 'okay' : 'poor'}>
                            {entry.snf}%
                          </span>
                        </div>
                        <div className="metric">
                          <span>Temperature</span>
                          <span className={parseFloat(entry.temperature) <= 6 ? 'good' : parseFloat(entry.temperature) <= 8 ? 'okay' : 'poor'}>
                            {entry.temperature}°C
                          </span>
                        </div>
                        <div className="metric">
                          <span>Bacterial Count</span>
                          <span className={parseFloat(entry.bacterialCount) <= 50000 ? 'good' : parseFloat(entry.bacterialCount) <= 100000 ? 'okay' : 'poor'}>
                            {parseInt(entry.bacterialCount).toLocaleString()} CFU/ml
                          </span>
                        </div>
                        {entry.proteinContent && (
                          <div className="metric">
                            <span>Protein</span>
                            <span className={parseFloat(entry.proteinContent) >= 3.2 ? 'good' : parseFloat(entry.proteinContent) >= 2.8 ? 'okay' : 'poor'}>
                              {entry.proteinContent}%
                            </span>
                          </div>
                        )}
                        {entry.ph && (
                          <div className="metric">
                            <span>pH Level</span>
                            <span className={parseFloat(entry.ph) >= 6.6 && parseFloat(entry.ph) <= 6.8 ? 'good' : parseFloat(entry.ph) >= 6.4 && parseFloat(entry.ph) <= 7.0 ? 'okay' : 'poor'}>
                              {entry.ph}
                            </span>
                          </div>
                        )}
                        <div className="metric">
                          <span>Antibiotics</span>
                          <span className={entry.antibioticsCheck === 'Pass' ? 'good' : 'poor'}>
                            {entry.antibioticsCheck}
                          </span>
                        </div>
                        <div className="metric">
                          <span>Total Value</span>
                          <span className="good">₹{calculatePrice(entry).totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>


          </div>
        )}

        {/* Laboratory Analysis Tab */}
        {activeTab === 'laboratory' && (
          <div className="milk-laboratory-analysis-main-section">
            <div className="milk-laboratory-analysis-compact-banner">
              <div className="milk-laboratory-analysis-banner-content">
                <div className="milk-laboratory-analysis-banner-icon">
                  <FaMicroscope />
                </div>
                <div className="milk-laboratory-analysis-banner-text">
                  <h3 className="milk-laboratory-analysis-banner-title">
                    Laboratory Analysis Reports
                  </h3>
                  <p className="milk-laboratory-analysis-banner-subtitle">Detailed microbiological and chemical analysis results</p>
                </div>
              </div>
            </div>

            {/* Enhanced Lab Metrics Single Line Dashboard */}
            <div className="milk-laboratory-enhanced-metrics-dashboard">
              <div className="milk-laboratory-enhanced-metrics-single-row">
                <div className="milk-laboratory-enhanced-metric-card samples-card">
                  <div className="milk-laboratory-enhanced-metric-icon samples">
                    <FaVial />
                  </div>
                  <div className="milk-laboratory-enhanced-metric-content">
                    <div className="milk-laboratory-enhanced-metric-value">{collections.length}</div>
                    <div className="milk-laboratory-enhanced-metric-label">Total Samples Tested</div>
                    <div className="milk-laboratory-enhanced-metric-trend positive">
                      <FiTrendingUp />
                      <span>+12% this week</span>
                    </div>
                  </div>
                </div>

                <div className="milk-laboratory-enhanced-metric-card premium-card">
                  <div className="milk-laboratory-enhanced-metric-icon premium">
                    <FaAward />
                  </div>
                  <div className="milk-laboratory-enhanced-metric-content">
                    <div className="milk-laboratory-enhanced-metric-value">{collections.filter(c => qualityStatus(c) === 'Premium').length}</div>
                    <div className="milk-laboratory-enhanced-metric-label">Premium Grade</div>
                    <div className="milk-laboratory-enhanced-metric-trend positive">
                      <FiTrendingUp />
                      <span>{collections.length > 0 ? ((collections.filter(c => qualityStatus(c) === 'Premium').length / collections.length) * 100).toFixed(1) : 0}% Pass Rate</span>
                    </div>
                  </div>
                </div>

                <div className="milk-laboratory-enhanced-metric-card clean-card">
                  <div className="milk-laboratory-enhanced-metric-icon clean">
                    <FaClipboardCheck />
                  </div>
                  <div className="milk-laboratory-enhanced-metric-content">
                    <div className="milk-laboratory-enhanced-metric-value">{collections.filter(c => c.antibioticsCheck === 'Pass').length}</div>
                    <div className="milk-laboratory-enhanced-metric-label">Antibiotic Free</div>
                    <div className="milk-laboratory-enhanced-metric-trend positive">
                      <FaShieldAlt />
                      <span>{collections.length > 0 ? ((collections.filter(c => c.antibioticsCheck === 'Pass').length / collections.length) * 100).toFixed(1) : 0}% Clean</span>
                    </div>
                  </div>
                </div>

                <div className="milk-laboratory-enhanced-metric-card rejected-card">
                  <div className="milk-laboratory-enhanced-metric-icon rejected">
                    <FiAlertTriangle />
                  </div>
                  <div className="milk-laboratory-enhanced-metric-content">
                    <div className="milk-laboratory-enhanced-metric-value">{collections.filter(c => qualityStatus(c) === 'Rejected').length}</div>
                    <div className="milk-laboratory-enhanced-metric-label">Rejected Samples</div>
                    <div className="milk-laboratory-enhanced-metric-trend negative">
                      <FiTrendingDown />
                      <span>{collections.length > 0 ? ((collections.filter(c => qualityStatus(c) === 'Rejected').length / collections.length) * 100).toFixed(1) : 0}% Rejection Rate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lab Equipment Status */}
            <div className="lab-equipment-section">
              <h4>Laboratory Equipment Status</h4>
              <div className="equipment-grid">
                <div className="equipment-card">
                  <div className="equipment-icon">
                    <FaMicroscope />
                  </div>
                  <div className="equipment-info">
                    <h5>Microscope Unit</h5>
                    <div className="equipment-status online">Online</div>
                    <div className="equipment-details">
                      <span>Last Calibration: 2 days ago</span>
                      <span>Next Service: 28 days</span>
                    </div>
                  </div>
                </div>

                <div className="equipment-card">
                  <div className="equipment-icon">
                    <FaVial />
                  </div>
                  <div className="equipment-info">
                    <h5>Chemical Analyzer</h5>
                    <div className="equipment-status online">Online</div>
                    <div className="equipment-details">
                      <span>Last Calibration: 1 day ago</span>
                      <span>Next Service: 15 days</span>
                    </div>
                  </div>
                </div>

                <div className="equipment-card">
                  <div className="equipment-icon">
                    <FaTemperatureLow />
                  </div>
                  <div className="equipment-info">
                    <h5>Temperature Controller</h5>
                    <div className="equipment-status online">Online</div>
                    <div className="equipment-details">
                      <span>Current Temp: 4°C</span>
                      <span>Status: Optimal</span>
                    </div>
                  </div>
                </div>

                <div className="equipment-card">
                  <div className="equipment-icon">
                    <FaBalanceScale />
                  </div>
                  <div className="equipment-info">
                    <h5>Precision Scale</h5>
                    <div className="equipment-status maintenance">Maintenance</div>
                    <div className="equipment-details">
                      <span>Last Calibration: 7 days ago</span>
                      <span>Service Due: Today</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="milk-laboratory-analysis-content-section">
              <div className="milk-laboratory-enhanced-analysis-summary">
                <div className="milk-laboratory-summary-header">
                  <h4 className="milk-laboratory-summary-title">
                    <MdAnalytics />
                    Analysis Summary
                  </h4>
                </div>
                <div className="milk-laboratory-analysis-summary-single-line-container">
                  <div className="milk-laboratory-analysis-summary-card total-samples-card">
                    <div className="milk-laboratory-analysis-summary-icon">
                      <FaVial />
                    </div>
                    <div className="milk-laboratory-analysis-summary-content">
                      <div className="milk-laboratory-analysis-summary-number">{collections.length}</div>
                      <div className="milk-laboratory-analysis-summary-label">Total Samples</div>
                      <div className="milk-laboratory-analysis-summary-trend">
                        <FiActivity />
                        <span>Laboratory tested</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="milk-laboratory-analysis-summary-card clean-samples-card">
                    <div className="milk-laboratory-analysis-summary-icon">
                      <FaShieldAlt />
                    </div>
                    <div className="milk-laboratory-analysis-summary-content">
                      <div className="milk-laboratory-analysis-summary-number">{collections.filter(c => c.antibioticsCheck === 'Pass').length}</div>
                      <div className="milk-laboratory-analysis-summary-label">Clean Samples</div>
                      <div className="milk-laboratory-analysis-summary-trend">
                        <FiCheckCircle />
                        <span>Antibiotic free</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="milk-laboratory-analysis-summary-card rejected-samples-card">
                    <div className="milk-laboratory-analysis-summary-icon">
                      <FiAlertTriangle />
                    </div>
                    <div className="milk-laboratory-analysis-summary-content">
                      <div className="milk-laboratory-analysis-summary-number">{collections.filter(c => qualityStatus(c) === 'Rejected').length}</div>
                      <div className="milk-laboratory-analysis-summary-label">Rejected</div>
                      <div className="milk-laboratory-analysis-summary-trend">
                        <FiTrendingDown />
                        <span>Quality issues</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="milk-laboratory-analysis-summary-card fat-content-card">
                    <div className="milk-laboratory-analysis-summary-icon">
                      <GiDroplets />
                    </div>
                    <div className="milk-laboratory-analysis-summary-content">
                      <div className="milk-laboratory-analysis-summary-number">{collections.length > 0 ? (collections.reduce((sum, c) => sum + parseFloat(c.fat || 0), 0) / collections.length).toFixed(2) : 0}%</div>
                      <div className="milk-laboratory-analysis-summary-label">Avg Fat Content</div>
                      <div className="milk-laboratory-analysis-summary-trend">
                        <MdScience />
                        <span>Chemical analysis</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="milk-laboratory-analysis-summary-card snf-content-card">
                    <div className="milk-laboratory-analysis-summary-icon">
                      <GiChemicalDrop />
                    </div>
                    <div className="milk-laboratory-analysis-summary-content">
                      <div className="milk-laboratory-analysis-summary-number">{collections.length > 0 ? (collections.reduce((sum, c) => sum + parseFloat(c.snf || 0), 0) / collections.length).toFixed(2) : 0}%</div>
                      <div className="milk-laboratory-analysis-summary-label">Avg SNF Content</div>
                      <div className="milk-laboratory-analysis-summary-trend">
                        <MdBiotech />
                        <span>Solids analysis</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {collections.length > 0 && (
                <div className="detailed-analysis">
                  <h4>Recent Laboratory Reports</h4>
                  <div className="lab-reports">
                    {collections.slice(0, 3).map((entry) => (
                      <div key={entry.id} className="lab-report-card">
                        <div className="report-header">
                          <div className="report-id">
                            <strong>Lab Report #LAB-{entry.id}</strong>
                            <span className="sample-date">{entry.date}</span>
                          </div>
                          <div className={`report-status ${qualityStatus(entry).toLowerCase().replace(' ', '-')}`}>
                            {qualityStatus(entry)}
                          </div>
                        </div>
                        
                        <div className="report-content">
                          <div className="test-section">
                            <h5>Physical Tests</h5>
                            <div className="test-results">
                              <div className="test-result">
                                <span>Appearance:</span>
                                <span className="result-value">Normal</span>
                              </div>
                              <div className="test-result">
                                <span>Color:</span>
                                <span className="result-value">White</span>
                              </div>
                              <div className="test-result">
                                <span>Odor:</span>
                                <span className="result-value">Fresh</span>
                              </div>
                            </div>
                          </div>

                          <div className="test-section">
                            <h5>Chemical Analysis</h5>
                            <div className="test-results">
                              <div className="test-result">
                                <span>Fat Content:</span>
                                <span className={`result-value ${parseFloat(entry.fat) >= 4.0 ? 'good' : 'poor'}`}>
                                  {entry.fat}%
                                </span>
                              </div>
                              <div className="test-result">
                                <span>SNF Content:</span>
                                <span className={`result-value ${parseFloat(entry.snf) >= 8.5 ? 'good' : 'poor'}`}>
                                  {entry.snf}%
                                </span>
                              </div>
                              <div className="test-result">
                                <span>Total Solids:</span>
                                <span className="result-value">
                                  {(parseFloat(entry.fat) + parseFloat(entry.snf)).toFixed(2)}%
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="test-section">
                            <h5>Microbiological Tests</h5>
                            <div className="test-results">
                              <div className="test-result">
                                <span>Total Bacterial Count:</span>
                                <span className={`result-value ${parseFloat(entry.bacterialCount) <= 100000 ? 'good' : 'poor'}`}>
                                  {parseInt(entry.bacterialCount).toLocaleString()} CFU/ml
                                </span>
                              </div>
                              <div className="test-result">
                                <span>Antibiotics:</span>
                                <span className={`result-value ${entry.antibioticsCheck === 'Pass' ? 'good' : 'poor'}`}>
                                  {entry.antibioticsCheck === 'Pass' ? 'Not Detected' : 'Detected'}
                                </span>
                              </div>
                              <div className="test-result">
                                <span>Temperature:</span>
                                <span className={`result-value ${parseFloat(entry.temperature) <= 7 ? 'good' : 'poor'}`}>
                                  {entry.temperature}°C
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="report-footer">
                            <div className="analyst-info">
                              <span>Analyzed by: Lab Technician</span>
                              <span>Certified: {qualityStatus(entry) === 'Premium' ? 'Yes' : 'Conditional'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Regional Statistics Tab */}
        {activeTab === 'regional' && (
          <div className="milk-regional-statistics-main-section">
            {/* Compact Regional Statistics Banner */}
            <div className="milk-regional-statistics-compact-banner">
              <div className="milk-regional-banner-content">
                <div className="milk-regional-banner-icon">
                  <FiMapPin />
                </div>
                <div className="milk-regional-banner-text">
                  <h3 className="milk-regional-banner-title">Regional Statistics & Performance</h3>
                  <p className="milk-regional-banner-subtitle">Comprehensive area-wise collection data and performance analytics</p>
                </div>
              </div>
            </div>

            {/* Enhanced Regional Overview Dashboard - Single Line */}
            <div className="milk-regional-enhanced-dashboard">
              <div className="milk-regional-metrics-single-line-container">
                <div className="milk-regional-enhanced-metric-card active-regions-card">
                  <div className="milk-regional-enhanced-metric-icon active-regions">
                    <FiMapPin />
                  </div>
                  <div className="milk-regional-enhanced-metric-content">
                    <div className="milk-regional-enhanced-metric-value">{new Set(collections.map(c => c.region)).size}</div>
                    <div className="milk-regional-enhanced-metric-label">Active Regions</div>
                    <div className="milk-regional-enhanced-metric-detail">Covering all major areas</div>
                    <div className="milk-regional-enhanced-metric-trend">
                      <FiActivity />
                      <span>{collections.length > 0 ? `${Math.round((new Set(collections.map(c => c.region)).size / 4) * 100)}% coverage` : '0% coverage'}</span>
                    </div>
                  </div>
                </div>

                <div className="milk-regional-enhanced-metric-card top-performing-card">
                  <div className="milk-regional-enhanced-metric-icon top-performing">
                    <FiTrendingUp />
                  </div>
                  <div className="milk-regional-enhanced-metric-content">
                    <div className="milk-regional-enhanced-metric-value">
                      {collections.length > 0 ? 
                        Object.entries(collections.reduce((acc, c) => {
                          acc[c.region] = (acc[c.region] || 0) + parseFloat(c.quantity);
                          return acc;
                        }, {})).sort((a, b) => b[1] - a[1])[0]?.[0] || 'East Region' 
                        : 'East Region'}
                    </div>
                    <div className="milk-regional-enhanced-metric-label">Top Performing Region</div>
                    <div className="milk-regional-enhanced-metric-detail">Highest collection volume</div>
                    <div className="milk-regional-enhanced-metric-trend">
                      <FiBarChart />
                      <span>{collections.length > 0 ? 
                        `${Object.entries(collections.reduce((acc, c) => {
                          acc[c.region] = (acc[c.region] || 0) + parseFloat(c.quantity);
                          return acc;
                        }, {})).sort((a, b) => b[1] - a[1])[0]?.[1]?.toFixed(1) || '0'}L total` 
                        : '0L total'}</span>
                    </div>
                  </div>
                </div>

                <div className="milk-regional-enhanced-metric-card best-quality-card">
                  <div className="milk-regional-enhanced-metric-icon best-quality">
                    <FaAward />
                  </div>
                  <div className="milk-regional-enhanced-metric-content">
                    <div className="milk-regional-enhanced-metric-value">
                      {collections.length > 0 ? 
                        Object.entries(collections.reduce((acc, c) => {
                          if (!acc[c.region]) acc[c.region] = { premium: 0, total: 0 };
                          if (qualityStatus(c) === 'Premium') acc[c.region].premium++;
                          acc[c.region].total++;
                          return acc;
                        }, {})).sort((a, b) => (b[1].premium/b[1].total) - (a[1].premium/a[1].total))[0]?.[0] || 'South Region'
                        : 'South Region'}
                    </div>
                    <div className="milk-regional-enhanced-metric-label">Best Quality Region</div>
                    <div className="milk-regional-enhanced-metric-detail">Highest premium rate</div>
                    <div className="milk-regional-enhanced-metric-trend">
                      <FaCertificate />
                      <span>{collections.length > 0 ? 
                        `${(Object.entries(collections.reduce((acc, c) => {
                          if (!acc[c.region]) acc[c.region] = { premium: 0, total: 0 };
                          if (qualityStatus(c) === 'Premium') acc[c.region].premium++;
                          acc[c.region].total++;
                          return acc;
                        }, {})).sort((a, b) => (b[1].premium/b[1].total) - (a[1].premium/a[1].total))[0]?.[1]?.premium/Object.entries(collections.reduce((acc, c) => {
                          if (!acc[c.region]) acc[c.region] = { premium: 0, total: 0 };
                          if (qualityStatus(c) === 'Premium') acc[c.region].premium++;
                          acc[c.region].total++;
                          return acc;
                        }, {})).sort((a, b) => (b[1].premium/b[1].total) - (a[1].premium/a[1].total))[0]?.[1]?.total * 100)?.toFixed(1) || '0'}% premium` 
                        : '0% premium'}</span>
                    </div>
                  </div>
                </div>

                <div className="milk-regional-enhanced-metric-card avg-collections-card">
                  <div className="milk-regional-enhanced-metric-icon avg-collections">
                    <FiUsers />
                  </div>
                  <div className="milk-regional-enhanced-metric-content">
                    <div className="milk-regional-enhanced-metric-value">
                      {collections.length > 0 ? 
                        Math.round(collections.length / new Set(collections.map(c => c.region)).size)
                        : 4}
                    </div>
                    <div className="milk-regional-enhanced-metric-label">Avg Collections per Region</div>
                    <div className="milk-regional-enhanced-metric-detail">Distribution balance</div>
                    <div className="milk-regional-enhanced-metric-trend">
                      <FiActivity />
                      <span>{collections.length > 0 ? 
                        `${collections.length} total collections` 
                        : '0 total collections'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Regional Performance Comparison */}
            <div className="milk-regional-enhanced-performance-section">
              <div className="milk-regional-performance-header">
                <div className="milk-regional-performance-title-wrapper">
                  <div className="milk-regional-performance-icon">
                    <FiBarChart />
                  </div>
                  <div className="milk-regional-performance-title-content">
                    <h4 className="milk-regional-performance-title">Regional Performance Comparison</h4>
                    <p className="milk-regional-performance-subtitle">Comprehensive analysis of collection metrics across all regions</p>
                  </div>
                </div>
              </div>
              
              <div className="milk-regional-enhanced-performance-chart">
                {Object.entries(
                  collections.reduce((acc, entry) => {
                    if (!acc[entry.region]) {
                      acc[entry.region] = {
                        totalQuantity: 0,
                        totalEntries: 0,
                        premiumCount: 0,
                        totalValue: 0,
                        avgFat: 0,
                        avgSnf: 0,
                        avgProtein: 0,
                        avgLactose: 0,
                        avgPh: 0,
                        avgDensity: 0,
                        cleanSamples: 0,
                        rejectedSamples: 0
                      };
                    }
                    acc[entry.region].totalQuantity += parseFloat(entry.quantity || 0);
                    acc[entry.region].totalEntries += 1;
                    acc[entry.region].avgFat += parseFloat(entry.fat || 0);
                    acc[entry.region].avgSnf += parseFloat(entry.snf || 0);
                    acc[entry.region].avgProtein += parseFloat(entry.proteinContent || 0);
                    acc[entry.region].avgLactose += parseFloat(entry.lactoseContent || 0);
                    acc[entry.region].avgPh += parseFloat(entry.ph || 0);
                    acc[entry.region].avgDensity += parseFloat(entry.density || 0);
                    acc[entry.region].totalValue += parseFloat(calculatePrice(entry).totalPrice) || 0;
                    
                    if (qualityStatus(entry) === 'Premium') {
                      acc[entry.region].premiumCount += 1;
                    }
                    if (entry.antibioticsCheck === 'Pass') {
                      acc[entry.region].cleanSamples += 1;
                    }
                    if (qualityStatus(entry) === 'Rejected') {
                      acc[entry.region].rejectedSamples += 1;
                    }
                    return acc;
                  }, {})
                ).map(([region, data]) => (
                  <div key={region} className="milk-regional-enhanced-performance-card">
                    <div className="milk-regional-performance-card-header">
                      <div className="milk-regional-performance-region-info">
                        <div className="milk-regional-performance-region-name">{region}</div>
                        <div className="milk-regional-performance-region-summary">
                          {data.totalEntries} collections • {(data.totalQuantity || 0).toFixed(1)}L • ₹{(data.totalValue || 0).toFixed(0)}
                        </div>
                      </div>
                      <div className="milk-regional-performance-quality-badge">
                        <span className={`milk-regional-quality-indicator ${
                          data.totalEntries > 0 && (data.premiumCount / data.totalEntries) > 0.7 ? 'excellent' :
                          data.totalEntries > 0 && (data.premiumCount / data.totalEntries) > 0.4 ? 'good' : 'average'
                        }`}>
                          {data.totalEntries > 0 ? 
                            (data.premiumCount / data.totalEntries) > 0.7 ? 'Excellent' :
                            (data.premiumCount / data.totalEntries) > 0.4 ? 'Good' : 'Average'
                            : 'No Data'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="milk-regional-enhanced-performance-metrics">
                      <div className="milk-regional-performance-metric-row">
                        <div className="milk-regional-performance-metric-item">
                          <span className="milk-regional-metric-label">Volume</span>
                          <div className="milk-regional-metric-bar-container">
                            <div className="milk-regional-metric-bar-track">
                              <div 
                                className="milk-regional-metric-bar-fill volume-bar" 
                                style={{
                                  width: `${Math.min((data.totalQuantity / Math.max(...Object.values(collections.reduce((acc, c) => {
                                    acc[c.region] = (acc[c.region] || 0) + parseFloat(c.quantity || 0);
                                    return acc;
                                  }, {})))) * 100, 100)}%`
                                }}
                              ></div>
                            </div>
                            <span className="milk-regional-metric-value">{(data.totalQuantity || 0).toFixed(1)}L</span>
                          </div>
                        </div>
                        
                        <div className="milk-regional-performance-metric-item">
                          <span className="milk-regional-metric-label">Premium Quality</span>
                          <div className="milk-regional-metric-bar-container">
                            <div className="milk-regional-metric-bar-track">
                              <div 
                                className="milk-regional-metric-bar-fill quality-bar" 
                                style={{width: `${data.totalEntries > 0 ? (data.premiumCount / data.totalEntries) * 100 : 0}%`}}
                              ></div>
                            </div>
                            <span className="milk-regional-metric-value">{(data.totalEntries > 0 ? (data.premiumCount / data.totalEntries) * 100 : 0).toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="milk-regional-performance-metric-row">
                        <div className="milk-regional-performance-metric-item">
                          <span className="milk-regional-metric-label">Revenue</span>
                          <div className="milk-regional-metric-bar-container">
                            <div className="milk-regional-metric-bar-track">
                              <div 
                                className="milk-regional-metric-bar-fill value-bar" 
                                style={{
                                  width: `${Math.min((data.totalValue / Math.max(...Object.values(collections.reduce((acc, c) => {
                                    acc[c.region] = (acc[c.region] || 0) + (parseFloat(calculatePrice(c).totalPrice) || 0);
                                    return acc;
                                  }, {})))) * 100, 100)}%`
                                }}
                              ></div>
                            </div>
                            <span className="milk-regional-metric-value">₹{(data.totalValue || 0).toFixed(0)}</span>
                          </div>
                        </div>
                        
                        <div className="milk-regional-performance-metric-item">
                          <span className="milk-regional-metric-label">Clean Samples</span>
                          <div className="milk-regional-metric-bar-container">
                            <div className="milk-regional-metric-bar-track">
                              <div 
                                className="milk-regional-metric-bar-fill clean-bar" 
                                style={{width: `${data.totalEntries > 0 ? (data.cleanSamples / data.totalEntries) * 100 : 0}%`}}
                              ></div>
                            </div>
                            <span className="milk-regional-metric-value">{(data.totalEntries > 0 ? (data.cleanSamples / data.totalEntries) * 100 : 0).toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="milk-regional-performance-detailed-stats">
                        <div className="milk-regional-detailed-stat-item">
                          <span className="milk-regional-stat-label">Avg Fat</span>
                          <span className="milk-regional-stat-value">{data.totalEntries > 0 ? (data.avgFat / data.totalEntries).toFixed(2) : '0.00'}%</span>
                        </div>
                        <div className="milk-regional-detailed-stat-item">
                          <span className="milk-regional-stat-label">Avg SNF</span>
                          <span className="milk-regional-stat-value">{data.totalEntries > 0 ? (data.avgSnf / data.totalEntries).toFixed(2) : '0.00'}%</span>
                        </div>
                        <div className="milk-regional-detailed-stat-item">
                          <span className="milk-regional-stat-label">Avg Protein</span>
                          <span className="milk-regional-stat-value">{data.totalEntries > 0 ? (data.avgProtein / data.totalEntries).toFixed(2) : '0.00'}%</span>
                        </div>
                        <div className="milk-regional-detailed-stat-item">
                          <span className="milk-regional-stat-label">Avg pH</span>
                          <span className="milk-regional-stat-value">{data.totalEntries > 0 ? (data.avgPh / data.totalEntries).toFixed(2) : '0.00'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="regional-content">
              {collections.length === 0 ? (
                <div className="no-data">
                  <MdLocationOn className="no-data-icon" />
                  <h4>No Regional Data Available</h4>
                  <p>Add collection entries to view regional statistics and performance metrics.</p>
                </div>
              ) : (
                <div className="regional-analysis">
                  <div className="regional-overview">
                    <h4>Regional Overview</h4>
                    <div className="overview-stats">
                      <div className="overview-card">
                        <div className="overview-number">
                          {new Set(collections.map(c => c.region)).size}
                        </div>
                        <div className="overview-label">Active Regions</div>
                      </div>
                      <div className="overview-card">
                        <div className="overview-number">
                          {(collections.reduce((sum, c) => sum + parseFloat(c.quantity), 0) / new Set(collections.map(c => c.region)).size).toFixed(1)}L
                        </div>
                        <div className="overview-label">Avg per Region</div>
                      </div>
                      <div className="overview-card">
                        <div className="overview-number">
                          {Math.max(...Object.entries(collections.reduce((acc, c) => {
                            acc[c.region] = (acc[c.region] || 0) + parseFloat(c.quantity);
                            return acc;
                          }, {})).map(([, qty]) => qty)).toFixed(1)}L
                        </div>
                        <div className="overview-label">Highest Collection</div>
                      </div>
                    </div>
                  </div>

                  <div className="regional-breakdown">
                    <h4>Regional Performance Breakdown</h4>
                    <div className="regions-grid">
                      {Object.entries(
                        collections.reduce((acc, entry) => {
                          if (!acc[entry.region]) {
                            acc[entry.region] = {
                              totalQuantity: 0,
                              totalEntries: 0,
                              totalFat: 0,
                              totalSnf: 0,
                              passedTests: 0,
                              qualityGrades: { Premium: 0, Conditional: 0, 'Low Quality': 0, Rejected: 0 }
                            };
                          }
                          acc[entry.region].totalQuantity += parseFloat(entry.quantity);
                          acc[entry.region].totalEntries += 1;
                          acc[entry.region].totalFat += parseFloat(entry.fat);
                          acc[entry.region].totalSnf += parseFloat(entry.snf);
                          if (entry.antibioticsCheck === 'Pass') acc[entry.region].passedTests += 1;
                          acc[entry.region].qualityGrades[qualityStatus(entry)] += 1;
                          return acc;
                        }, {})
                      ).map(([region, data]) => (
                        <div key={region} className="region-card">
                          <div className="region-header">
                            <h5>{region}</h5>
                            <span className="entries-count">{data.totalEntries} entries</span>
                          </div>
                          
                          <div className="region-stats">
                            <div className="region-stat">
                              <span className="stat-label">Total Collection:</span>
                              <span className="stat-value">{data.totalQuantity.toFixed(2)}L</span>
                            </div>
                            <div className="region-stat">
                              <span className="stat-label">Avg Fat:</span>
                              <span className="stat-value">{(data.totalFat / data.totalEntries).toFixed(2)}%</span>
                            </div>
                            <div className="region-stat">
                              <span className="stat-label">Avg SNF:</span>
                              <span className="stat-value">{(data.totalSnf / data.totalEntries).toFixed(2)}%</span>
                            </div>
                            <div className="region-stat">
                              <span className="stat-label">Pass Rate:</span>
                              <span className="stat-value">{((data.passedTests / data.totalEntries) * 100).toFixed(1)}%</span>
                            </div>
                          </div>

                          <div className="quality-distribution">
                            <h6>Quality Distribution</h6>
                            <div className="quality-bars">
                              {Object.entries(data.qualityGrades).map(([grade, count]) => (
                                <div key={grade} className="quality-bar">
                                  <span className="grade-label">{grade}:</span>
                                  <div className="bar-container">
                                    <div 
                                      className={`bar ${grade.toLowerCase().replace(' ', '-')}`} 
                                      style={{width: `${(count / data.totalEntries) * 100}%`}}
                                    ></div>
                                    <span className="count">{count}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Farmer Management Tab */}
        {activeTab === 'farmers' && (
          <div className="milk-farmer-management-main-section">
            {/* Compact Banner */}
            <div className="milk-farmer-management-compact-banner">
              <div className="milk-farmer-banner-content">
                <div className="milk-farmer-banner-icon">
                  <FiUser />
                </div>
                <div className="milk-farmer-banner-text">
                  <h3 className="milk-farmer-banner-title">Farmer Management & Performance</h3>
                  <p className="milk-farmer-banner-subtitle">Individual farmer profiles and performance tracking</p>
                </div>
              </div>
            </div>

            {/* Single Line 4-Card Dashboard */}
            <div className="milk-farmer-metrics-dashboard">
              <div className="milk-farmer-metrics-single-row">
                <div className="milk-farmer-metric-card total-farmers-card">
                  <div className="milk-farmer-metric-icon total-farmers">
                    <FiUsers />
                  </div>
                  <div className="milk-farmer-metric-content">
                    <div className="milk-farmer-metric-value">{new Set(collections.map(c => c.farmerId)).size}</div>
                    <div className="milk-farmer-metric-label">Total Farmers</div>
                    <div className="milk-farmer-metric-description">Active in system</div>
                  </div>
                </div>

                <div className="milk-farmer-metric-card top-performers-card">
                  <div className="milk-farmer-metric-icon top-performers">
                    <FaAward />
                  </div>
                  <div className="milk-farmer-metric-content">
                    <div className="milk-farmer-metric-value">
                      {collections.length > 0 ? 
                        Object.entries(collections.reduce((acc, c) => {
                          if (!acc[c.farmerId]) acc[c.farmerId] = { premium: 0, total: 0 };
                          if (qualityStatus(c) === 'Premium') acc[c.farmerId].premium++;
                          acc[c.farmerId].total++;
                          return acc;
                        }, {})).filter(([_, data]) => (data.premium / data.total) >= 0.8).length
                        : 1}
                    </div>
                    <div className="milk-farmer-metric-label">Top Performers</div>
                    <div className="milk-farmer-metric-description">≥80% Premium Rate</div>
                  </div>
                </div>

                <div className="milk-farmer-metric-card avg-collections-card">
                  <div className="milk-farmer-metric-icon avg-collections">
                    <FiActivity />
                  </div>
                  <div className="milk-farmer-metric-content">
                    <div className="milk-farmer-metric-value">
                      {collections.length > 0 ? 
                        (collections.length / new Set(collections.map(c => c.farmerId)).size).toFixed(1)
                        : '2.0'}
                    </div>
                    <div className="milk-farmer-metric-label">Avg Collections/Farmer</div>
                    <div className="milk-farmer-metric-description">Per farmer activity</div>
                  </div>
                </div>

                <div className="milk-farmer-metric-card need-attention-card">
                  <div className="milk-farmer-metric-icon need-attention">
                    <FiAlertCircle />
                  </div>
                  <div className="milk-farmer-metric-content">
                    <div className="milk-farmer-metric-value">
                      {collections.length > 0 ? 
                        Object.entries(collections.reduce((acc, c) => {
                          if (!acc[c.farmerId]) acc[c.farmerId] = { rejected: 0, total: 0 };
                          if (qualityStatus(c) === 'Rejected') acc[c.farmerId].rejected++;
                          acc[c.farmerId].total++;
                          return acc;
                        }, {})).filter(([_, data]) => (data.rejected / data.total) > 0.2).length
                        : 2}
                    </div>
                    <div className="milk-farmer-metric-label">Need Attention</div>
                    <div className="milk-farmer-metric-description">20% Rejection Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Farmer Performance Rankings */}
            <div className="enhanced-farmer-performance-rankings-section">
              <div className="enhanced-rankings-simple-header">
                <h4 className="enhanced-rankings-simple-title">Farmer Performance Rankings</h4>
              </div>

              <div className="enhanced-rankings-main-container">
                <div className="enhanced-ranking-tabs-container">
                  <div className="enhanced-ranking-tabs-wrapper">
                    <button 
                      className={`enhanced-ranking-tab ${activeRankingTab === 'volume' ? 'enhanced-ranking-tab-active' : ''}`}
                      onClick={() => setActiveRankingTab('volume')}
                    >
                      <FiBarChart className="enhanced-tab-icon" />
                      <span className="enhanced-tab-text">By Volume</span>
                      <div className="enhanced-tab-indicator"></div>
                    </button>
                    <button 
                      className={`enhanced-ranking-tab ${activeRankingTab === 'quality' ? 'enhanced-ranking-tab-active' : ''}`}
                      onClick={() => setActiveRankingTab('quality')}
                    >
                      <FaAward className="enhanced-tab-icon" />
                      <span className="enhanced-tab-text">By Quality</span>
                      <div className="enhanced-tab-indicator"></div>
                    </button>
                    <button 
                      className={`enhanced-ranking-tab ${activeRankingTab === 'value' ? 'enhanced-ranking-tab-active' : ''}`}
                      onClick={() => setActiveRankingTab('value')}
                    >
                      <FiTrendingUp className="enhanced-tab-icon" />
                      <span className="enhanced-tab-text">By Value</span>
                      <div className="enhanced-tab-indicator"></div>
                    </button>
                    <button 
                      className={`enhanced-ranking-tab ${activeRankingTab === 'consistency' ? 'enhanced-ranking-tab-active' : ''}`}
                      onClick={() => setActiveRankingTab('consistency')}
                    >
                      <MdVerified className="enhanced-tab-icon" />
                      <span className="enhanced-tab-text">By Consistency</span>
                      <div className="enhanced-tab-indicator"></div>
                    </button>
                  </div>
                </div>

                <div className="enhanced-rankings-content-container">
                  <div className="enhanced-rankings-table-header">
                    <div className="enhanced-header-cell enhanced-header-rank">
                      <FaCertificate className="enhanced-header-icon" />
                      <span className="enhanced-header-text">Rank</span>
                    </div>
                    <div className="enhanced-header-cell enhanced-header-farmer">
                      <FiUser className="enhanced-header-icon" />
                      <span className="enhanced-header-text">Farmer Details</span>
                    </div>
                    <div className="enhanced-header-cell enhanced-header-volume">
                      <GiMilkCarton className="enhanced-header-icon" />
                      <span className="enhanced-header-text">Volume (L)</span>
                    </div>
                    <div className="enhanced-header-cell enhanced-header-quality">
                      <FaFlask className="enhanced-header-icon" />
                      <span className="enhanced-header-text">Quality Rate</span>
                    </div>
                    <div className="enhanced-header-cell enhanced-header-value">
                      <FiTrendingUp className="enhanced-header-icon" />
                      <span className="enhanced-header-text">Total Value</span>
                    </div>
                    <div className="enhanced-header-cell enhanced-header-consistency">
                      <FaChartLine className="enhanced-header-icon" />
                      <span className="enhanced-header-text">Consistency</span>
                    </div>
                    <div className="enhanced-header-cell enhanced-header-actions">
                      <FiSettings className="enhanced-header-icon" />
                      <span className="enhanced-header-text">Actions</span>
                    </div>
                  </div>

                  <div className="enhanced-rankings-list-container">
                    {sortFarmerData(
                      Object.entries(
                        collections.reduce((acc, entry) => {
                          if (!acc[entry.farmerId]) {
                            acc[entry.farmerId] = {
                              name: entry.farmerName || `Farmer ${entry.farmerId}`,
                              region: entry.region,
                              totalQuantity: 0,
                              totalEntries: 0,
                              premiumCount: 0,
                              goodCount: 0,
                              fairCount: 0,
                              rejectedCount: 0,
                              totalValue: 0,
                              avgFat: 0,
                              avgSnf: 0,
                              avgProtein: 0,
                              lastCollection: entry.date,
                              firstCollection: entry.date,
                              consistencyScore: 0
                            };
                          }
                          acc[entry.farmerId].totalQuantity += parseFloat(entry.quantity || 0);
                          acc[entry.farmerId].totalEntries += 1;
                          acc[entry.farmerId].avgFat += parseFloat(entry.fat || 0);
                          acc[entry.farmerId].avgSnf += parseFloat(entry.snf || 0);
                          acc[entry.farmerId].avgProtein += parseFloat(entry.proteinContent || 0);
                          acc[entry.farmerId].totalValue += parseFloat(calculatePrice(entry).totalPrice) || 0;
                          
                          const quality = qualityStatus(entry);
                          if (quality === 'Premium') acc[entry.farmerId].premiumCount++;
                          else if (quality === 'Good') acc[entry.farmerId].goodCount++;
                          else if (quality === 'Fair') acc[entry.farmerId].fairCount++;
                          else if (quality === 'Rejected') acc[entry.farmerId].rejectedCount++;
                          
                          if (entry.date > acc[entry.farmerId].lastCollection) {
                            acc[entry.farmerId].lastCollection = entry.date;
                          }
                          if (entry.date < acc[entry.farmerId].firstCollection) {
                            acc[entry.farmerId].firstCollection = entry.date;
                          }
                          return acc;
                        }, {})
                      )
                      .map(([farmerId, data]) => {
                        // Calculate consistency score based on quality distribution and regularity
                        const qualityScore = ((data.premiumCount * 4 + data.goodCount * 3 + data.fairCount * 2) / (data.totalEntries * 4)) * 100;
                        const regularityScore = Math.min(data.totalEntries * 10, 100); // More entries = more consistent
                        data.consistencyScore = (qualityScore * 0.7 + regularityScore * 0.3);
                        return [farmerId, data];
                      }),
                      activeRankingTab
                    )
                    .slice(0, 15)
                    .map(([farmerId, data], index) => {
                      const premiumRate = data.totalEntries > 0 ? (data.premiumCount / data.totalEntries) * 100 : 0;
                      const avgFat = data.totalEntries > 0 ? data.avgFat / data.totalEntries : 0;
                      const avgSnf = data.totalEntries > 0 ? data.avgSnf / data.totalEntries : 0;
                      const avgProtein = data.totalEntries > 0 ? data.avgProtein / data.totalEntries : 0;
                      
                      return (
                        <div key={farmerId} className={`enhanced-ranking-item-row ${index < 3 ? 'enhanced-top-performer' : ''}`}>
                          <div className="enhanced-ranking-cell enhanced-cell-rank">
                            <div className={`enhanced-position-badge ${
                              index === 0 ? 'enhanced-rank-gold' : 
                              index === 1 ? 'enhanced-rank-silver' : 
                              index === 2 ? 'enhanced-rank-bronze' : 
                              'enhanced-rank-standard'
                            }`}>
                              <span className="enhanced-position-number">{index + 1}</span>
                              {index < 3 && (
                                <div className="enhanced-medal-icon">
                                  {index === 0 && <FaAward className="enhanced-gold-medal" />}
                                  {index === 1 && <FaAward className="enhanced-silver-medal" />}
                                  {index === 2 && <FaAward className="enhanced-bronze-medal" />}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="enhanced-ranking-cell enhanced-cell-farmer">
                            <div className="enhanced-farmer-info-container">
                              <div className="enhanced-farmer-avatar">
                                <FiUser className="enhanced-avatar-icon" />
                              </div>
                              <div className="enhanced-farmer-details">
                                <div className="enhanced-farmer-name">{data.name}</div>
                                <div className="enhanced-farmer-meta">
                                  <span className="enhanced-farmer-id">ID: {farmerId}</span>
                                  <span className="enhanced-farmer-region">
                                    <FiMapPin className="enhanced-region-icon" />
                                    {data.region}
                                  </span>
                                </div>
                                <div className="enhanced-farmer-activity">
                                  <span className="enhanced-collections-count">{data.totalEntries} collections</span>
                                  <span className="enhanced-last-activity">Last: {data.lastCollection}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="enhanced-ranking-cell enhanced-cell-volume">
                            <div className="enhanced-volume-container">
                              <div className="enhanced-volume-main">
                                <span className="enhanced-volume-number">{data.totalQuantity.toFixed(1)}</span>
                                <span className="enhanced-volume-unit">L</span>
                              </div>
                              <div className="enhanced-volume-average">
                                <span className="enhanced-avg-label">Avg:</span>
                                <span className="enhanced-avg-value">{(data.totalQuantity / data.totalEntries).toFixed(1)}L</span>
                              </div>
                              <div className="enhanced-volume-progress">
                                <div 
                                  className="enhanced-volume-bar" 
                                  style={{
                                    width: `${Math.min((data.totalQuantity / Math.max(...Object.values(collections.reduce((acc, c) => {
                                      acc[c.farmerId] = (acc[c.farmerId] || 0) + parseFloat(c.quantity || 0);
                                      return acc;
                                    }, {})))) * 100, 100)}%`
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          <div className="enhanced-ranking-cell enhanced-cell-quality">
                            <div className="enhanced-quality-container">
                              <div className="enhanced-quality-rate">
                                <span className={`enhanced-quality-percentage ${
                                  premiumRate >= 80 ? 'enhanced-excellent' : 
                                  premiumRate >= 60 ? 'enhanced-good' : 
                                  premiumRate >= 40 ? 'enhanced-average' : 
                                  'enhanced-poor'
                                }`}>
                                  {premiumRate.toFixed(1)}%
                                </span>
                                <span className="enhanced-quality-label">Premium</span>
                              </div>
                              <div className="enhanced-quality-breakdown">
                                <div className="enhanced-quality-metrics">
                                  <span className="enhanced-metric-item">
                                    <span className="enhanced-metric-label">Fat:</span>
                                    <span className={`enhanced-metric-value ${avgFat >= 4.0 ? 'enhanced-good' : 'enhanced-average'}`}>
                                      {avgFat.toFixed(2)}%
                                    </span>
                                  </span>
                                  <span className="enhanced-metric-item">
                                    <span className="enhanced-metric-label">SNF:</span>
                                    <span className={`enhanced-metric-value ${avgSnf >= 8.5 ? 'enhanced-good' : 'enhanced-average'}`}>
                                      {avgSnf.toFixed(2)}%
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="enhanced-ranking-cell enhanced-cell-value">
                            <div className="enhanced-value-container">
                              <div className="enhanced-total-value">
                                <span className="enhanced-currency-symbol">₹</span>
                                <span className="enhanced-value-amount">{data.totalValue.toFixed(0)}</span>
                              </div>
                              <div className="enhanced-value-per-liter">
                                <span className="enhanced-per-liter-label">Per L:</span>
                                <span className="enhanced-per-liter-value">₹{(data.totalValue / data.totalQuantity).toFixed(2)}</span>
                              </div>
                              <div className="enhanced-value-trend">
                                <FiTrendingUp className="enhanced-trend-icon enhanced-trend-positive" />
                                <span className="enhanced-trend-text">Growing</span>
                              </div>
                            </div>
                          </div>

                          <div className="enhanced-ranking-cell enhanced-cell-consistency">
                            <div className="enhanced-consistency-container">
                              <div className="enhanced-consistency-score">
                                <span className={`enhanced-score-number ${
                                  data.consistencyScore >= 80 ? 'enhanced-excellent' : 
                                  data.consistencyScore >= 60 ? 'enhanced-good' : 
                                  data.consistencyScore >= 40 ? 'enhanced-average' : 
                                  'enhanced-poor'
                                }`}>
                                  {data.consistencyScore.toFixed(0)}
                                </span>
                                <span className="enhanced-score-label">Score</span>
                              </div>
                              <div className="enhanced-consistency-bar">
                                <div 
                                  className={`enhanced-consistency-fill ${
                                    data.consistencyScore >= 80 ? 'enhanced-excellent' : 
                                    data.consistencyScore >= 60 ? 'enhanced-good' : 
                                    data.consistencyScore >= 40 ? 'enhanced-average' : 
                                    'enhanced-poor'
                                  }`}
                                  style={{width: `${data.consistencyScore}%`}}
                                ></div>
                              </div>
                              <div className="enhanced-consistency-details">
                                <span className="enhanced-consistency-text">
                                  {data.consistencyScore >= 80 ? 'Excellent' : 
                                   data.consistencyScore >= 60 ? 'Good' : 
                                   data.consistencyScore >= 40 ? 'Average' : 
                                   'Needs Improvement'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="enhanced-ranking-cell enhanced-cell-actions">
                            <div className="enhanced-actions-container">
                              <button className="enhanced-action-btn enhanced-view-btn" title="View Details">
                                <FiEye className="enhanced-action-icon" />
                                <span className="enhanced-action-text">View</span>
                              </button>
                              <button className="enhanced-action-btn enhanced-contact-btn" title="Contact Farmer">
                                <FiPhone className="enhanced-action-icon" />
                                <span className="enhanced-action-text">Call</span>
                              </button>
                              <button className="enhanced-action-btn enhanced-share-btn" title="Share Report">
                                <FiShare2 className="enhanced-action-icon" />
                                <span className="enhanced-action-text">Share</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {collections.length === 0 && (
                  <div className="enhanced-rankings-empty-state">
                    <div className="enhanced-empty-icon">
                      <FaChartBar />
                    </div>
                    <h4 className="enhanced-empty-title">No Performance Data Available</h4>
                    <p className="enhanced-empty-description">
                      Add collection entries to view farmer performance rankings and detailed analytics.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="farmers-content">
              {collections.length === 0 ? (
                <div className="no-data">
                  <FiUser className="no-data-icon" />
                  <h4>No Farmer Data Available</h4>
                  <p>Add collection entries to view farmer profiles and performance metrics.</p>
                </div>
              ) : (
                <div className="farmers-analysis">
                  <div className="farmers-overview">
                    <h4>Farmers Overview</h4>
                    <div className="overview-stats">
                      <div className="overview-card">
                        <div className="overview-number">
                          {new Set(collections.map(c => c.farmerId)).size}
                        </div>
                        <div className="overview-label">Active Farmers</div>
                      </div>
                      <div className="overview-card">
                        <div className="overview-number">
                          {(collections.length / new Set(collections.map(c => c.farmerId)).size).toFixed(1)}
                        </div>
                        <div className="overview-label">Avg Collections per Farmer</div>
                      </div>
                      <div className="overview-card">
                        <div className="overview-number">
                          {Math.max(...Object.values(collections.reduce((acc, c) => {
                            acc[c.farmerId] = (acc[c.farmerId] || 0) + 1;
                            return acc;
                          }, {})))}
                        </div>
                        <div className="overview-label">Most Active Farmer</div>
                      </div>
                    </div>
                  </div>

                  <div className="farmers-list">
                    <h4>Farmer Performance Profiles</h4>
                    <div className="farmers-grid">
                      {Object.entries(
                        collections.reduce((acc, entry) => {
                          if (!acc[entry.farmerId]) {
                            acc[entry.farmerId] = {
                              totalQuantity: 0,
                              totalEntries: 0,
                              totalFat: 0,
                              totalSnf: 0,
                              passedTests: 0,
                              region: entry.region,
                              lastCollection: entry.date,
                              qualityGrades: { Premium: 0, Conditional: 0, 'Low Quality': 0, Rejected: 0 }
                            };
                          }
                          acc[entry.farmerId].totalQuantity += parseFloat(entry.quantity);
                          acc[entry.farmerId].totalEntries += 1;
                          acc[entry.farmerId].totalFat += parseFloat(entry.fat);
                          acc[entry.farmerId].totalSnf += parseFloat(entry.snf);
                          if (entry.antibioticsCheck === 'Pass') acc[entry.farmerId].passedTests += 1;
                          acc[entry.farmerId].qualityGrades[qualityStatus(entry)] += 1;
                          if (entry.date > acc[entry.farmerId].lastCollection) {
                            acc[entry.farmerId].lastCollection = entry.date;
                          }
                          return acc;
                        }, {})
                      ).map(([farmerId, data]) => (
                        <div key={farmerId} className="farmer-card">
                          <div className="farmer-header">
                            <div className="farmer-id">
                              <strong>#{farmerId}</strong>
                              <span className="region-badge">{data.region}</span>
                            </div>
                            <div className="farmer-status">
                              <span className="last-collection">Last: {data.lastCollection}</span>
                              <div className={`performance-badge ${data.qualityGrades.Premium > data.qualityGrades.Rejected ? 'good' : 'average'}`}>
                                {data.qualityGrades.Premium > data.qualityGrades.Rejected ? 'High Performer' : 'Standard'}
                              </div>
                            </div>
                          </div>

                          <div className="farmer-metrics">
                            <div className="metrics-row">
                              <div className="metric">
                                <span className="metric-label">Total Collections:</span>
                                <span className="metric-value">{data.totalEntries}</span>
                              </div>
                              <div className="metric">
                                <span className="metric-label">Total Volume:</span>
                                <span className="metric-value">{data.totalQuantity.toFixed(2)}L</span>
                              </div>
                            </div>
                            
                            <div className="metrics-row">
                              <div className="metric">
                                <span className="metric-label">Avg Fat:</span>
                                <span className={`metric-value ${(data.totalFat / data.totalEntries) >= 4.0 ? 'good' : 'average'}`}>
                                  {(data.totalFat / data.totalEntries).toFixed(2)}%
                                </span>
                              </div>
                              <div className="metric">
                                <span className="metric-label">Avg SNF:</span>
                                <span className={`metric-value ${(data.totalSnf / data.totalEntries) >= 8.5 ? 'good' : 'average'}`}>
                                  {(data.totalSnf / data.totalEntries).toFixed(2)}%
                                </span>
                              </div>
                            </div>

                            <div className="metrics-row">
                              <div className="metric">
                                <span className="metric-label">Quality Pass Rate:</span>
                                <span className={`metric-value ${((data.passedTests / data.totalEntries) * 100) >= 90 ? 'good' : 'average'}`}>
                                  {((data.passedTests / data.totalEntries) * 100).toFixed(1)}%
                                </span>
                              </div>
                              <div className="metric">
                                <span className="metric-label">Avg per Collection:</span>
                                <span className="metric-value">{(data.totalQuantity / data.totalEntries).toFixed(1)}L</span>
                              </div>
                            </div>
                          </div>

                          <div className="farmer-quality-summary">
                            <h6>Quality Summary</h6>
                            <div className="quality-summary-grid">
                              <div className="summary-item premium">
                                <span className="count">{data.qualityGrades.Premium}</span>
                                <span className="label">Premium</span>
                              </div>
                              <div className="summary-item conditional">
                                <span className="count">{data.qualityGrades.Conditional}</span>
                                <span className="label">Good</span>
                              </div>
                              <div className="summary-item low-quality">
                                <span className="count">{data.qualityGrades['Low Quality']}</span>
                                <span className="label">Low</span>
                              </div>
                              <div className="summary-item rejected">
                                <span className="count">{data.qualityGrades.Rejected}</span>
                                <span className="label">Rejected</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="system-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>System Status</h4>
            <div className="status-indicators">
              <div className="status-item">
                <span className="indicator online"></span>
                <span>System Online</span>
              </div>
              <div className="status-item">
                <span className="indicator secure"></span>
                <span>Secure Connection</span>
              </div>
              <div className="status-item">
                <span className="indicator synced"></span>
                <span>Data Synced</span>
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Stats</h4>
            <div className="quick-stats">
              <div className="quick-stat">
                <span>Total Entries: {collections.length}</span>
              </div>
              <div className="quick-stat">
                <span>Total Volume: {stats.totalQuantity}L</span>
              </div>
              <div className="quick-stat">
                <span>Quality Pass Rate: {collections.length > 0 ? ((stats.passedTests / collections.length) * 100).toFixed(1) : 0}%</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4>Data Management</h4>
            <div className="data-management-actions">
              <button 
                className="btn btn-small btn-outline"
                onClick={() => {
                  const confirmClear = window.confirm('Are you sure you want to clear all data? This action cannot be undone.');
                  if (confirmClear) {
                    setCollections([]);
                    localStorage.removeItem('milkCollections');
                    addNotification('warning', 'All collection data cleared successfully');
                  }
                }}
                title="Clear all collection data"
              >
                <FiTrash2 />
                Clear Data
              </button>
              <button 
                className="btn btn-small btn-primary"
                onClick={() => {
                  const sampleData = generateSampleData();
                  setCollections(sampleData);
                  addNotification('success', `Added ${sampleData.length} sample records for demonstration`);
                }}
                title="Load sample data"
              >
                <FiRefreshCw />
                Load Sample Data
              </button>
            </div>
          </div>

          <div className="footer-section">
            <div className="system-info">
              <p>Milk Collection Management System v2.0</p>
              <p>Last updated: {new Date().toLocaleString()}</p>
              <p>Total Records: {collections.length}</p>
              <div className="system-health">
                <span className="health-indicator good">System Healthy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilkCollectionCenter;
