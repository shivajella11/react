import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  // Get time-based greeting
  const getTimeBasedGreeting = () => {
    const currentHour = new Date().getHours();
    
    if (currentHour >= 5 && currentHour < 12) {
      return {
        greeting: 'Good Morning',
        icon: '🌅',
        message: 'Start your day with fresh dairy operations!'
      };
    } else if (currentHour >= 12 && currentHour < 17) {
      return {
        greeting: 'Good Afternoon',
        icon: '☀️',
        message: 'Keep up the excellent work!'
      };
    } else {
      return {
        greeting: 'Good Evening',
        icon: '🌆',
        message: 'Review your day\'s achievements!'
      };
    }
  };

  const timeGreeting = getTimeBasedGreeting();

  // Chart period state
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  // Chart type state (bar or line)
  const [chartType, setChartType] = useState('bar');
  // Real-time data refresh state
  const [lastRefresh, setLastRefresh] = useState(new Date());
  // Export section state
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [selectedExportType, setSelectedExportType] = useState('pdf');
  const [exportDateRange, setExportDateRange] = useState('last-7-days');
  // Notification state
  const [notifications, setNotifications] = useState([]);
  // Performance insights state
  const [performanceInsights, setPerformanceInsights] = useState({
    efficiency: 87,
    growth: 12,
    satisfaction: 94
  });

  // Predictive Analytics state
  const [predictiveData, setPredictiveData] = useState({
    nextWeekProduction: '18,500L',
    forecastAccuracy: 94,
    recommendations: [
      {
        type: 'supply',
        priority: 'high',
        message: 'Increase raw milk procurement by 15% for next week due to expected demand surge',
        impact: 'Revenue increase of ₹45,000',
        actionRequired: 'Contact suppliers by tomorrow'
      },
      {
        type: 'quality',
        priority: 'medium',
        message: 'Monitor fat content levels - trending below optimal range',
        impact: 'Quality score improvement',
        actionRequired: 'Schedule quality check'
      },
      {
        type: 'logistics',
        priority: 'low',
        message: 'Optimize delivery routes for 12% fuel cost reduction',
        impact: 'Cost savings of ₹8,500/month',
        actionRequired: 'Review route planning'
      }
    ],
    demandForecast: {
      nextWeek: [
        { day: 'Mon', demand: 2650, confidence: 92 },
        { day: 'Tue', demand: 2800, confidence: 89 },
        { day: 'Wed', demand: 2450, confidence: 94 },
        { day: 'Thu', demand: 2900, confidence: 87 },
        { day: 'Fri', demand: 2750, confidence: 91 },
        { day: 'Sat', demand: 2600, confidence: 88 },
        { day: 'Sun', demand: 2500, confidence: 93 }
      ]
    },
    seasonalTrends: {
      currentSeason: 'Winter',
      expectedChange: '+12%',
      peakMonth: 'December',
      lowMonth: 'July'
    }
  });

  // Market Insights state
  const [marketInsights, setMarketInsights] = useState({
    priceIndex: 142.5,
    priceChange: '+2.3%',
    competitorAnalysis: {
      marketShare: 18.5,
      ranking: 3,
      growth: 8.2
    },
    opportunities: [
      {
        sector: 'Organic Dairy',
        potential: 'High',
        growth: '+25% YoY',
        investment: '₹2.5L',
        timeline: '6 months'
      },
      {
        sector: 'B2B Catering',
        potential: 'Medium',
        growth: '+15% YoY',
        investment: '₹1.8L',
        timeline: '3 months'
      },
      {
        sector: 'Premium Products',
        potential: 'High',
        growth: '+30% YoY',
        investment: '₹3.2L',
        timeline: '8 months'
      }
    ],
    marketTrends: [
      { trend: 'Organic demand rising', impact: 'positive', strength: 85 },
      { trend: 'Price competition increasing', impact: 'negative', strength: 70 },
      { trend: 'Health consciousness growing', impact: 'positive', strength: 92 }
    ]
  });

  // Weather Impact state
  const [weatherImpact, setWeatherImpact] = useState({
    current: {
      condition: 'Partly Cloudy',
      temperature: '18°C',
      humidity: '65%',
      impact: 'neutral'
    },
    weeklyOutlook: [
      { day: 'Mon', condition: '☀️', temp: '22°C', impact: 'positive', productionImpact: '+5%' },
      { day: 'Tue', condition: '⛅', temp: '19°C', impact: 'neutral', productionImpact: '0%' },
      { day: 'Wed', condition: '🌧️', temp: '16°C', impact: 'negative', productionImpact: '-8%' },
      { day: 'Thu', condition: '☀️', temp: '21°C', impact: 'positive', productionImpact: '+3%' },
      { day: 'Fri', condition: '⛅', temp: '18°C', impact: 'neutral', productionImpact: '0%' },
      { day: 'Sat', condition: '☀️', temp: '23°C', impact: 'positive', productionImpact: '+6%' },
      { day: 'Sun', condition: '🌤️', temp: '20°C', impact: 'positive', productionImpact: '+2%' }
    ],
    seasonalFactors: {
      temperature: 'Optimal range for cattle comfort',
      rainfall: 'Adequate for feed quality',
      humidity: 'Moderate - good for storage'
    },
    alerts: [
      {
        type: 'warning',
        message: 'Heavy rainfall expected Wednesday - prepare covered storage',
        priority: 'medium'
      }
    ]
  });

  // Analytics view state
  const [analyticsView, setAnalyticsView] = useState('forecast');
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  // B2B Operations toggle state
  const [b2bOperationsVisible, setB2bOperationsVisible] = useState(false);
  
  // Chart data for different periods
  const chartData = {
    weekly: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [60, 80, 45, 90, 70, 85, 95],
      displayValues: ['1.2k', '1.6k', '0.9k', '1.8k', '1.4k', '1.7k', '1.9k']
    },
    monthly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      values: [75, 65, 85, 90],
      displayValues: ['8.5k', '7.2k', '9.8k', '10.2k']
    },
    yearly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      values: [45, 52, 48, 61, 75, 82, 78, 85, 90, 88, 92, 95],
      displayValues: ['45k', '52k', '48k', '61k', '75k', '82k', '78k', '85k', '90k', '88k', '92k', '95k']
    }
  };

  // Dynamic pie chart data for sales distribution based on period
  const pieChartData = {
    weekly: [
      { label: 'Retail Sales', value: 35, color: '#3498db', amount: '₹43,750' },
      { label: 'B2B Wholesale', value: 28, color: '#2ecc71', amount: '₹35,000' },
      { label: 'Direct Supply', value: 20, color: '#f39c12', amount: '₹25,000' },
      { label: 'Online Orders', value: 17, color: '#e74c3c', amount: '₹21,250' }
    ],
    monthly: [
      { label: 'Retail Sales', value: 32, color: '#3498db', amount: '₹1,60,000' },
      { label: 'B2B Wholesale', value: 31, color: '#2ecc71', amount: '₹1,55,000' },
      { label: 'Direct Supply', value: 22, color: '#f39c12', amount: '₹1,10,000' },
      { label: 'Online Orders', value: 15, color: '#e74c3c', amount: '₹75,000' }
    ],
    yearly: [
      { label: 'B2B Wholesale', value: 38, color: '#2ecc71', amount: '₹22,80,000' },
      { label: 'Retail Sales', value: 29, color: '#3498db', amount: '₹17,40,000' },
      { label: 'Direct Supply', value: 18, color: '#f39c12', amount: '₹10,80,000' },
      { label: 'Online Orders', value: 15, color: '#e74c3c', amount: '₹9,00,000' }
    ]
  };

  // B2B Operations state
  const [b2bView, setB2bView] = useState('clients');
  
  // Form states for Add New Client and Add New Vendor
  const [showClientForm, setShowClientForm] = useState(false);
  const [showVendorForm, setShowVendorForm] = useState(false);
  
  // Form validation states
  const [clientFormErrors, setClientFormErrors] = useState({});
  const [vendorFormErrors, setVendorFormErrors] = useState({});
  const [isClientFormSubmitting, setIsClientFormSubmitting] = useState(false);
  const [isVendorFormSubmitting, setIsVendorFormSubmitting] = useState(false);
  
  // Client form data
  const [clientFormData, setClientFormData] = useState({
    name: '',
    type: '',
    volume: '',
    contact: '',
    email: '',
    contractValue: '',
    address: '',
    businessType: '',
    paymentTerms: '',
    deliverySchedule: ''
  });
  
  // Vendor form data
  const [vendorFormData, setVendorFormData] = useState({
    name: '',
    type: '',
    volume: '',
    contact: '',
    email: '',
    contractValue: '',
    address: '',
    farmSize: '',
    cattleCount: '',
    qualityGrade: '',
    pricePerLiter: '',
    certifications: '',
    geographicRegion: '',
    paymentTerms: '',
    collectionSchedule: ''
  });

  // Client Operations Form States
  const [showViewOrdersForm, setShowViewOrdersForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // View Orders Form Data
  const [viewOrdersData, setViewOrdersData] = useState({
    orderId: '',
    orderDate: '',
    deliveryDate: '',
    quantity: '',
    status: '',
    priority: '',
    specialInstructions: '',
    deliveryAddress: '',
    contactPerson: '',
    orderValue: ''
  });

  // Contact Form Data
  const [contactFormData, setContactFormData] = useState({
    subject: '',
    message: '',
    priority: '',
    contactMethod: '',
    followUpDate: '',
    category: '',
    attachments: ''
  });

  // Invoice Form Data
  const [invoiceFormData, setInvoiceFormData] = useState({
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    amount: '',
    taxAmount: '',
    totalAmount: '',
    paymentTerms: '',
    description: '',
    quantity: '',
    unitPrice: '',
    discount: '',
    notes: ''
  });

  // Form validation states for client operations
  const [viewOrdersFormErrors, setViewOrdersFormErrors] = useState({});
  const [contactFormErrors, setContactFormErrors] = useState({});
  const [invoiceFormErrors, setInvoiceFormErrors] = useState({});
  const [isViewOrdersFormSubmitting, setIsViewOrdersFormSubmitting] = useState(false);
  const [isContactFormSubmitting, setIsContactFormSubmitting] = useState(false);
  const [isInvoiceFormSubmitting, setIsInvoiceFormSubmitting] = useState(false);
  
  // B2B Clients data - now using state to allow dynamic additions
  const [b2bClients, setB2bClients] = useState([
    { 
      id: 'CL001',
      name: 'Metro Supermarkets',
      type: 'Wholesale Contract',
      volume: '2,500L/day',
      status: 'active',
      nextDelivery: 'Tomorrow 6:00 AM',
      contractValue: '₹1,25,000/month',
      paymentStatus: 'paid',
      lastOrder: '2024-01-15',
      icon: '🏪',
      bgColor: 'rgba(52, 152, 219, 0.1)',
      iconColor: '#3498db',
      contact: '+91 98765 43210',
      email: 'orders@metro.com'
    },
    { 
      id: 'CL002',
      name: 'Royal Bakery Chain',
      type: 'Bulk Supply',
      volume: '1,800L/day',
      status: 'active',
      nextDelivery: 'Today 4:00 PM',
      contractValue: '₹85,000/month',
      paymentStatus: 'paid',
      lastOrder: '2024-01-14',
      icon: '🍰',
      bgColor: 'rgba(46, 204, 113, 0.1)',
      iconColor: '#2ecc71',
      contact: '+91 98765 43211',
      email: 'supply@royalbakery.com'
    },
    { 
      id: 'CL003',
      name: 'Coffee House Network',
      type: 'Premium Milk',
      volume: '850L/day',
      status: 'pending',
      nextDelivery: 'Wed 8:00 AM',
      contractValue: '₹45,000/month',
      paymentStatus: 'overdue',
      lastOrder: '2024-01-10',
      icon: '☕',
      bgColor: 'rgba(241, 196, 15, 0.1)',
      iconColor: '#f1c40f',
      contact: '+91 98765 43212',
      email: 'orders@coffeehouse.com'
    },
    { 
      id: 'CL004',
      name: 'School Nutrition Program',
      type: 'Institutional Supply',
      volume: '3,200L/week',
      status: 'active',
      nextDelivery: 'Mon 5:00 AM',
      contractValue: '₹95,000/month',
      paymentStatus: 'paid',
      lastOrder: '2024-01-12',
      icon: '🎓',
      bgColor: 'rgba(155, 89, 182, 0.1)',
      iconColor: '#9b59b6',
      contact: '+91 98765 43213',
      email: 'nutrition@schoolboard.gov'
    },
    { 
      id: 'CL005',
      name: 'Hotel Grand Plaza',
      type: 'Premium Supply',
      volume: '1,200L/day',
      status: 'active',
      nextDelivery: 'Today 6:00 AM',
      contractValue: '₹65,000/month',
      paymentStatus: 'paid',
      lastOrder: '2024-01-15',
      icon: '🏨',
      bgColor: 'rgba(231, 76, 60, 0.1)',
      iconColor: '#e74c3c',
      contact: '+91 98765 43214',
      email: 'procurement@grandplaza.com'
    },
    { 
      id: 'CL006',
      name: 'Dairy Queen Franchise',
      type: 'Bulk Supply',
      volume: '2,800L/day',
      status: 'active',
      nextDelivery: 'Tomorrow 7:00 AM',
      contractValue: '₹1,35,000/month',
      paymentStatus: 'paid',
      lastOrder: '2024-01-14',
      icon: '🍦',
      bgColor: 'rgba(26, 188, 156, 0.1)',
      iconColor: '#1abc9c',
      contact: '+91 98765 43215',
      email: 'supply@dairyqueen.com'
    }
  ]);

  // Enhanced B2B Vendors/Suppliers data with comprehensive details - now using state
  const [b2bVendors, setB2bVendors] = useState([
    {
      id: 'VN001',
      name: 'Green Valley Dairy Farm',
      type: 'Raw Milk Supplier',
      volume: '5,000L/day',
      status: 'active',
      nextCollection: 'Tomorrow 5:00 AM',
      contractValue: '₹2,25,000/month',
      paymentStatus: 'paid',
      lastDelivery: '2024-01-15',
      icon: '🐄',
      bgColor: 'rgba(46, 204, 113, 0.1)',
      iconColor: '#2ecc71',
      contact: '+91 98765 54321',
      email: 'supply@greenvalley.com',
      rating: 4.8,
      quality: 'Premium',
      // Enhanced data
      contractStart: '2023-04-01',
      contractEnd: '2024-03-31',
      paymentTerms: 'Net 30 days',
      pricePerLiter: '₹45.00',
      qualityGrade: 'Grade A+',
      certifications: ['ISO 9001', 'HACCP', 'FSSAI'],
      farmSize: '150 acres',
      cattleCount: 250,
      avgFatContent: '4.2%',
      avgProteinContent: '3.4%',
      dailyCapacity: '6,000L',
      geographicRegion: 'Punjab',
      relationshipManager: 'Amit Sharma',
      managerContact: '+91 98765 11111',
      performanceScore: 94,
      renewalProbability: 92,
      sustainabilityScore: 88,
      complianceRecord: 'Excellent',
      transportationMode: 'Refrigerated truck',
      deliveryWindow: '4:00 AM - 6:00 AM',
      emergencyContact: '+91 98765 11112',
      backupSupplier: 'Mountain Fresh Dairy',
      seasonalVariation: 'Low',
      weatherDependency: 'Medium',
      technologyAdoption: 'High',
      digitalIntegration: 'API Connected',
      keyStrengths: ['Consistent quality', 'Timely delivery', 'Competitive pricing'],
      riskFactors: ['Seasonal variation', 'Weather dependency'],
      contractHistory: [
        { period: '2022-2023', performance: 'Excellent', renewal: 'Auto-renewed' },
        { period: '2023-2024', performance: 'Good', renewal: 'In progress' }
      ]
    },
    {
      id: 'VN002',
      name: 'Sunshine Organic Farms',
      type: 'Organic Milk Supplier',
      volume: '3,500L/day',
      status: 'active',
      nextCollection: 'Today 4:30 AM',
      contractValue: '₹1,85,000/month',
      paymentStatus: 'paid',
      lastDelivery: '2024-01-15',
      icon: '🌱',
      bgColor: 'rgba(52, 152, 219, 0.1)',
      iconColor: '#3498db',
      contact: '+91 98765 54322',
      email: 'organic@sunshine.com',
      rating: 4.9,
      quality: 'Organic Premium',
      // Enhanced data
      contractStart: '2023-06-01',
      contractEnd: '2024-05-31',
      paymentTerms: 'Net 15 days',
      pricePerLiter: '₹52.86',
      qualityGrade: 'Organic Grade A+',
      certifications: ['Organic India', 'USDA Organic', 'ISO 9001', 'HACCP'],
      farmSize: '120 acres',
      cattleCount: 180,
      avgFatContent: '4.5%',
      avgProteinContent: '3.6%',
      dailyCapacity: '4,000L',
      geographicRegion: 'Haryana',
      relationshipManager: 'Priya Patel',
      managerContact: '+91 98765 22222',
      performanceScore: 96,
      renewalProbability: 95,
      sustainabilityScore: 95,
      complianceRecord: 'Outstanding',
      transportationMode: 'Organic certified truck',
      deliveryWindow: '4:00 AM - 5:00 AM',
      emergencyContact: '+91 98765 22223',
      backupSupplier: 'Pure Pastures Ltd',
      seasonalVariation: 'Very Low',
      weatherDependency: 'Low',
      technologyAdoption: 'Medium',
      digitalIntegration: 'Manual reporting',
      keyStrengths: ['Organic certification', 'Premium quality', 'Sustainable practices'],
      riskFactors: ['Higher cost', 'Limited capacity'],
      contractHistory: [
        { period: '2022-2023', performance: 'Outstanding', renewal: 'Extended' },
        { period: '2023-2024', performance: 'Excellent', renewal: 'Confirmed' }
      ]
    },
    {
      id: 'VN003',
      name: 'Mountain Fresh Dairy',
      type: 'Bulk Milk Supplier',
      volume: '7,200L/day',
      status: 'active',
      nextCollection: 'Tomorrow 6:00 AM',
      contractValue: '₹3,15,000/month',
      paymentStatus: 'pending',
      lastDelivery: '2024-01-14',
      icon: '⛰️',
      bgColor: 'rgba(155, 89, 182, 0.1)',
      iconColor: '#9b59b6',
      contact: '+91 98765 54323',
      email: 'supply@mountainfresh.com',
      rating: 4.6,
      quality: 'Standard',
      // Enhanced data
      contractStart: '2023-01-01',
      contractEnd: '2024-12-31',
      paymentTerms: 'Net 45 days',
      pricePerLiter: '₹43.75',
      qualityGrade: 'Grade A',
      certifications: ['ISO 9001', 'FSSAI'],
      farmSize: '300 acres',
      cattleCount: 450,
      avgFatContent: '3.8%',
      avgProteinContent: '3.2%',
      dailyCapacity: '8,000L',
      geographicRegion: 'Himachal Pradesh',
      relationshipManager: 'Rajesh Kumar',
      managerContact: '+91 98765 33333',
      performanceScore: 86,
      renewalProbability: 75,
      sustainabilityScore: 78,
      complianceRecord: 'Good',
      transportationMode: 'Insulated tanker',
      deliveryWindow: '5:30 AM - 7:00 AM',
      emergencyContact: '+91 98765 33334',
      backupSupplier: 'Green Valley Dairy Farm',
      seasonalVariation: 'High',
      weatherDependency: 'High',
      technologyAdoption: 'Low',
      digitalIntegration: 'Email updates',
      keyStrengths: ['Large capacity', 'Competitive pricing', 'Reliable supply'],
      riskFactors: ['Weather dependency', 'Payment delays', 'Quality variations'],
      contractHistory: [
        { period: '2022-2023', performance: 'Good', renewal: 'Renewed' },
        { period: '2023-2024', performance: 'Average', renewal: 'Under review' }
      ]
    },
    {
      id: 'VN004',
      name: 'Golden Meadows Co-op',
      type: 'Cooperative Supplier',
      volume: '4,800L/day',
      status: 'active',
      nextCollection: 'Today 5:30 AM',
      contractValue: '₹2,45,000/month',
      paymentStatus: 'paid',
      lastDelivery: '2024-01-15',
      icon: '🌾',
      bgColor: 'rgba(241, 196, 15, 0.1)',
      iconColor: '#f1c40f',
      contact: '+91 98765 54324',
      email: 'coop@goldenmeadows.com',
      rating: 4.7,
      quality: 'Premium',
      // Enhanced data
      contractStart: '2023-03-01',
      contractEnd: '2024-02-29',
      paymentTerms: 'Net 20 days',
      pricePerLiter: '₹51.04',
      qualityGrade: 'Grade A+',
      certifications: ['Cooperative Society', 'ISO 9001', 'FSSAI'],
      farmSize: '200 acres (collective)',
      cattleCount: 320,
      avgFatContent: '4.1%',
      avgProteinContent: '3.5%',
      dailyCapacity: '5,500L',
      geographicRegion: 'Uttar Pradesh',
      relationshipManager: 'Sunita Verma',
      managerContact: '+91 98765 44444',
      performanceScore: 90,
      renewalProbability: 88,
      sustainabilityScore: 85,
      complianceRecord: 'Good',
      transportationMode: 'Cooperative vehicle',
      deliveryWindow: '5:00 AM - 6:30 AM',
      emergencyContact: '+91 98765 44445',
      backupSupplier: 'Riverside Dairy Collective',
      seasonalVariation: 'Medium',
      weatherDependency: 'Medium',
      technologyAdoption: 'Medium',
      digitalIntegration: 'Mobile app',
      keyStrengths: ['Cooperative model', 'Fair pricing', 'Community support'],
      riskFactors: ['Collective decision making', 'Seasonal variations'],
      contractHistory: [
        { period: '2022-2023', performance: 'Good', renewal: 'Renewed' },
        { period: '2023-2024', performance: 'Good', renewal: 'Likely' }
      ]
    },
    {
      id: 'VN005',
      name: 'Pure Pastures Ltd',
      type: 'Premium Milk Supplier',
      volume: '2,200L/day',
      status: 'active',
      nextCollection: 'Tomorrow 5:45 AM',
      contractValue: '₹1,35,000/month',
      paymentStatus: 'paid',
      lastDelivery: '2024-01-14',
      icon: '🏞️',
      bgColor: 'rgba(231, 76, 60, 0.1)',
      iconColor: '#e74c3c',
      contact: '+91 98765 54325',
      email: 'premium@purepastures.com',
      rating: 4.9,
      quality: 'Ultra Premium',
      // Enhanced data
      contractStart: '2023-09-01',
      contractEnd: '2024-08-31',
      paymentTerms: 'Net 10 days',
      pricePerLiter: '₹61.36',
      qualityGrade: 'Ultra Premium Grade',
      certifications: ['A2 Milk', 'Organic India', 'ISO 9001', 'HACCP'],
      farmSize: '80 acres',
      cattleCount: 120,
      avgFatContent: '4.8%',
      avgProteinContent: '3.8%',
      dailyCapacity: '2,500L',
      geographicRegion: 'Karnataka',
      relationshipManager: 'Neha Gupta',
      managerContact: '+91 98765 55555',
      performanceScore: 98,
      renewalProbability: 98,
      sustainabilityScore: 92,
      complianceRecord: 'Outstanding',
      transportationMode: 'Premium cold chain',
      deliveryWindow: '5:30 AM - 6:00 AM',
      emergencyContact: '+91 98765 55556',
      backupSupplier: 'Sunshine Organic Farms',
      seasonalVariation: 'Very Low',
      weatherDependency: 'Low',
      technologyAdoption: 'High',
      digitalIntegration: 'Real-time tracking',
      keyStrengths: ['Ultra premium quality', 'A2 milk', 'Consistent supply'],
      riskFactors: ['Premium pricing', 'Limited capacity'],
      contractHistory: [
        { period: '2023-2024', performance: 'Outstanding', renewal: 'Auto-renewal' }
      ]
    },
    {
      id: 'VN006',
      name: 'Riverside Dairy Collective',
      type: 'Bulk Supplier',
      volume: '6,500L/day',
      status: 'pending',
      nextCollection: 'Wed 4:00 AM',
      contractValue: '₹2,95,000/month',
      paymentStatus: 'overdue',
      lastDelivery: '2024-01-10',
      icon: '🏊',
      bgColor: 'rgba(26, 188, 156, 0.1)',
      iconColor: '#1abc9c',
      contact: '+91 98765 54326',
      email: 'collective@riverside.com',
      rating: 4.4,
      quality: 'Standard',
      // Enhanced data
      contractStart: '2023-10-01',
      contractEnd: '2024-09-30',
      paymentTerms: 'Net 30 days',
      pricePerLiter: '₹45.38',
      qualityGrade: 'Grade A',
      certifications: ['Collective Society', 'FSSAI'],
      farmSize: '180 acres (collective)',
      cattleCount: 280,
      avgFatContent: '3.9%',
      avgProteinContent: '3.3%',
      dailyCapacity: '7,000L',
      geographicRegion: 'West Bengal',
      relationshipManager: 'Vikram Singh',
      managerContact: '+91 98765 66666',
      performanceScore: 82,
      renewalProbability: 60,
      sustainabilityScore: 75,
      complianceRecord: 'Fair',
      transportationMode: 'Standard truck',
      deliveryWindow: '3:30 AM - 5:00 AM',
      emergencyContact: '+91 98765 66667',
      backupSupplier: 'Golden Meadows Co-op',
      seasonalVariation: 'High',
      weatherDependency: 'Very High',
      technologyAdoption: 'Very Low',
      digitalIntegration: 'Phone calls only',
      keyStrengths: ['Large volume', 'Collective support', 'Regional presence'],
      riskFactors: ['Payment delays', 'Quality inconsistency', 'Weather dependency'],
      contractHistory: [
        { period: '2022-2023', performance: 'Fair', renewal: 'Conditional' },
        { period: '2023-2024', performance: 'Below average', renewal: 'At risk' }
      ]
    }
  ]);

  // Enhanced B2B Analytics and KPIs
  const b2bAnalytics = {
    totalContracts: 27,
    activeClients: 6,
    activeVendors: 6,
    pendingContracts: 4,
    totalMonthlyValue: '₹23,85,000',
    avgContractValue: '₹1,98,750',
    paymentCollection: 89.3,
    renewalRate: 91.2,
    avgDeliveryTime: '42 mins',
    qualityCompliance: 94.8,
    clientSatisfaction: 4.62,
    vendorSatisfaction: 4.71,
    geographicCoverage: 12,
    businessGrowth: 18.7,
    riskAssessment: 'Medium',
    contractUtilization: 87.5,
    supplyChainEfficiency: 92.3,
    costOptimization: 15.2,
    digitalizationScore: 68.5,
    sustainabilityIndex: 84.2,
    complianceScore: 91.8,
    monthlyTrends: {
      contracts: [22, 24, 25, 26, 27, 28],
      revenue: [21.5, 22.8, 23.2, 23.5, 23.8, 24.2],
      satisfaction: [4.5, 4.55, 4.58, 4.62, 4.65, 4.68],
      performance: [88, 89, 91, 92, 93, 94]
    }
  };

  // Enhanced B2B Performance Metrics
  const b2bPerformanceMetrics = {
    topPerformers: [
      { name: 'Pure Pastures Ltd', score: 98, trend: 'up', category: 'vendor' },
      { name: 'Sunshine Organic Farms', score: 96, trend: 'up', category: 'vendor' },
      { name: 'Green Valley Dairy Farm', score: 94, trend: 'stable', category: 'vendor' },
      { name: 'Dairy Queen Franchise', score: 92, trend: 'up', category: 'client' },
      { name: 'Metro Supermarkets', score: 91, trend: 'stable', category: 'client' }
    ],
    riskAssessment: [
      { 
        entity: 'Riverside Dairy Collective', 
        risk: 'high', 
        reasons: ['Overdue payments', 'Quality inconsistency', 'Weather dependency'], 
        action: 'Immediate review meeting', 
        timeline: '48 hours',
        mitigation: 'Implement quality monitoring system'
      },
      { 
        entity: 'Mountain Fresh Dairy', 
        risk: 'medium', 
        reasons: ['Pending payment', 'Quality variations'], 
        action: 'Monitor closely', 
        timeline: '1 week',
        mitigation: 'Quality improvement plan'
      },
      { 
        entity: 'Coffee House Network', 
        risk: 'medium', 
        reasons: ['Overdue payment', 'Reduced volume'], 
        action: 'Payment follow-up', 
        timeline: '3 days',
        mitigation: 'Revised payment terms'
      }
    ],
    upcomingRenewals: [
      { entity: 'Golden Meadows Co-op', renewalDate: '2024-02-29', probability: 88, category: 'vendor' },
      { entity: 'Green Valley Dairy Farm', renewalDate: '2024-03-31', probability: 92, category: 'vendor' },
      { entity: 'Sunshine Organic Farms', renewalDate: '2024-05-31', probability: 95, category: 'vendor' },
      { entity: 'Pure Pastures Ltd', renewalDate: '2024-08-31', probability: 98, category: 'vendor' },
      { entity: 'Riverside Dairy Collective', renewalDate: '2024-09-30', probability: 60, category: 'vendor' }
    ],
    qualityMetrics: [
      { supplier: 'Pure Pastures Ltd', fatContent: '4.8%', proteinContent: '3.8%', grade: 'Ultra Premium' },
      { supplier: 'Sunshine Organic Farms', fatContent: '4.5%', proteinContent: '3.6%', grade: 'Organic Premium' },
      { supplier: 'Green Valley Dairy Farm', fatContent: '4.2%', proteinContent: '3.4%', grade: 'Premium' },
      { supplier: 'Golden Meadows Co-op', fatContent: '4.1%', proteinContent: '3.5%', grade: 'Premium' },
      { supplier: 'Mountain Fresh Dairy', fatContent: '3.8%', proteinContent: '3.2%', grade: 'Standard' },
      { supplier: 'Riverside Dairy Collective', fatContent: '3.9%', proteinContent: '3.3%', grade: 'Standard' }
    ]
  };

  // Enhanced Contract Management Data
  const contractManagement = {
    totalValue: '₹28,62,000',
    activeContracts: 12,
    pendingNegotiations: 3,
    expiringContracts: 5,
    renewalPipeline: '₹18,75,000',
    averageContractDuration: '14 months',
    contractGrowth: '+23.4%',
    riskExposure: '₹4,35,000',
    complianceRate: 94.2,
    digitalContracts: 8,
    paperContracts: 4,
    autoRenewalEligible: 6,
    contractTypes: [
      { type: 'Ultra Premium Supply', count: 2, value: '₹2,70,000', avgDuration: '12 months' },
      { type: 'Premium Supply', count: 4, value: '₹9,60,000', avgDuration: '15 months' },
      { type: 'Organic Supply', count: 2, value: '₹3,70,000', avgDuration: '18 months' },
      { type: 'Standard Supply', count: 3, value: '₹8,55,000', avgDuration: '12 months' },
      { type: 'Bulk Supply', count: 4, value: '₹6,30,000', avgDuration: '16 months' },
      { type: 'Cooperative Supply', count: 2, value: '₹4,90,000', avgDuration: '14 months' }
    ],
    paymentTerms: [
      { terms: 'Net 10 days', percentage: 16.7, avgAmount: '₹1,35,000' },
      { terms: 'Net 15 days', percentage: 16.7, avgAmount: '₹1,85,000' },
      { terms: 'Net 20 days', percentage: 16.7, avgAmount: '₹2,45,000' },
      { terms: 'Net 30 days', percentage: 33.3, avgAmount: '₹2,60,000' },
      { terms: 'Net 45 days', percentage: 16.7, avgAmount: '₹3,15,000' }
    ]
  };

  // Enhanced Supply Chain Optimization
  const supplyChainData = {
    routeOptimization: 91.2,
    deliveryEfficiency: 94.8,
    inventoryTurnover: 18.7,
    qualityConsistency: 92.3,
    costPerLiter: '₹2.85',
    fuelEfficiency: 16.2,
    vehicleUtilization: 87.9,
    warehouseCapacity: 82.5,
    orderFulfillment: 96.4,
    supplierDiversity: 15,
    coldChainCompliance: 98.2,
    transportationCost: '₹3.20/L',
    averageDeliveryTime: '42 mins',
    onTimeDelivery: 94.8,
    damageLoss: '0.3%',
    digitalTracking: 75.0,
    sustainabilityScore: 84.2,
    carbonFootprint: '2.1 kg CO2/L',
    energyEfficiency: 88.5,
    wasteReduction: 15.8,
    regionalCoverage: [
      { region: 'North India', suppliers: 4, volume: '18,500L/day', efficiency: 92.3 },
      { region: 'South India', suppliers: 2, volume: '2,200L/day', efficiency: 96.8 },
      { region: 'East India', suppliers: 1, volume: '6,500L/day', efficiency: 82.1 },
      { region: 'West India', suppliers: 0, volume: '0L/day', efficiency: 0 }
    ]
  };

  // Auto-remove newly added styling after 30 seconds
  useEffect(() => {
    const removeNewStyling = () => {
      setB2bClients(prev => prev.map(client => 
        client.isNewlyAdded && Date.now() - new Date(client.dateAdded).getTime() > 30000
          ? { ...client, isNewlyAdded: false }
          : client
      ));
      
      setB2bVendors(prev => prev.map(vendor => 
        vendor.isNewlyAdded && Date.now() - new Date(vendor.dateAdded).getTime() > 30000
          ? { ...vendor, isNewlyAdded: false }
          : vendor
      ));
    };

    const stylingInterval = setInterval(removeNewStyling, 5000); // Check every 5 seconds
    
    return () => clearInterval(stylingInterval);
  }, []);

  // Real-time data refresh effect
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      setLastRefresh(new Date());
      // Simulate real-time data updates
      setPerformanceInsights(prev => ({
        efficiency: Math.max(80, Math.min(95, prev.efficiency + (Math.random() - 0.5) * 2)),
        growth: Math.max(5, Math.min(20, prev.growth + (Math.random() - 0.5) * 1)),
        satisfaction: Math.max(85, Math.min(98, prev.satisfaction + (Math.random() - 0.5) * 1))
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(refreshInterval);
  }, []);

  // Get time-based greeting
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Good Morning';
    } else if (hour < 17) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  // Export functionality
  const exportData = () => {
    const exportConfig = {
      type: selectedExportType,
      dateRange: exportDateRange,
      timestamp: new Date().toISOString(),
      sections: ['overview', 'production', 'quality', 'b2b', 'analytics']
    };

    // Simulate export process
    console.log('Exporting data with config:', exportConfig);
    
    // Add notification
    const newNotification = {
      id: Date.now(),
      type: 'success',
      message: `${selectedExportType.toUpperCase()} export for ${exportDateRange} initiated successfully!`,
      timestamp: new Date()
    };
    
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    setExportModalOpen(false);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  // Enhanced export options
  const exportOptions = [
    { value: 'pdf', label: 'PDF Report', icon: '📄', description: 'Comprehensive PDF report' },
    { value: 'excel', label: 'Excel Spreadsheet', icon: '📊', description: 'Data in spreadsheet format' },
    { value: 'csv', label: 'CSV Data', icon: '📋', description: 'Raw data in CSV format' },
    { value: 'json', label: 'JSON Data', icon: '🔧', description: 'API-ready JSON format' }
  ];

  const dateRangeOptions = [
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-3-months', label: 'Last 3 Months' },
    { value: 'last-6-months', label: 'Last 6 Months' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#2ecc71';
      case 'pending': return '#f1c40f';
      case 'overdue': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  // Get payment status color
  const getPaymentStatusColor = (paymentStatus) => {
    switch(paymentStatus) {
      case 'paid': return '#2ecc71';
      case 'pending': return '#f39c12';
      case 'overdue': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  // Button action handlers
  const handleViewOrders = (entity) => {
    console.log(`Viewing orders for ${entity.name}`);
    setSelectedClient(entity);
    
    // Pre-populate form with client data
    setViewOrdersData({
      orderId: `ORD-${entity.id}-${Date.now().toString().slice(-6)}`,
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: '',
      quantity: entity.volume || '',
      status: 'pending',
      priority: 'medium',
      specialInstructions: '',
      deliveryAddress: entity.address || '',
      contactPerson: entity.name,
      orderValue: entity.contractValue || ''
    });
    
    setShowViewOrdersForm(true);
  };

  const handleContact = (entity) => {
    console.log(`Contacting ${entity.name} at ${entity.contact}`);
    setSelectedClient(entity);
    
    // Pre-populate form with client data
    setContactFormData({
      subject: `Contact regarding ${entity.name}`,
      message: '',
      priority: 'medium',
      contactMethod: 'email',
      followUpDate: '',
      category: 'general',
      attachments: ''
    });
    
    setShowContactForm(true);
  };

  const handleInvoice = (entity) => {
    console.log(`Generating invoice for ${entity.name}`);
    setSelectedClient(entity);
    
    // Pre-populate form with client data
    const invoiceNumber = `INV-${entity.id}-${Date.now().toString().slice(-6)}`;
    const today = new Date();
    const dueDate = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days from today
    
    setInvoiceFormData({
      invoiceNumber: invoiceNumber,
      invoiceDate: today.toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0],
      amount: entity.contractValue?.replace(/[^\d.,]/g, '') || '',
      taxAmount: '',
      totalAmount: '',
      paymentTerms: entity.paymentTerms || 'Net 30 days',
      description: `Monthly supply contract for ${entity.name}`,
      quantity: entity.volume || '',
      unitPrice: '',
      discount: '0',
      notes: ''
    });
    
    setShowInvoiceForm(true);
  };

  const handleAddClient = () => {
    setShowClientForm(true);
    const notification = {
      id: Date.now(),
      type: 'info',
      message: 'Opening Add New Client form...',
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    
    // Auto remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 3000);
  };

  const handleAddVendor = () => {
    setShowVendorForm(true);
    const notification = {
      id: Date.now(),
      type: 'info',
      message: 'Opening Add New Vendor form...',
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    
    // Auto remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 3000);
  };

  // Validation functions
  const validateClientForm = (data) => {
    const errors = {};
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
      errors.name = 'Client name must be at least 2 characters long';
    } else if (data.name.trim().length > 100) {
      errors.name = 'Client name must not exceed 100 characters';
    } else if (!/^[a-zA-Z0-9\s&.-]+$/.test(data.name.trim())) {
      errors.name = 'Client name contains invalid characters';
    }
    
    // Check for duplicate client names
    if (data.name && b2bClients.some(client => 
      client.name.toLowerCase() === data.name.trim().toLowerCase()
    )) {
      errors.name = 'A client with this name already exists';
    }
    
    // Business Type validation
    if (!data.businessType) {
      errors.businessType = 'Please select a business type';
    }
    
    // Contract Type validation
    if (!data.type) {
      errors.type = 'Please select a contract type';
    }
    
    // Volume validation
    if (!data.volume || data.volume.trim() === '') {
      errors.volume = 'Daily volume is required';
    } else if (!/^\d+([,.]?\d+)?\s*(L|l|liters?|Liters?)(\/day|\/Day)?$/i.test(data.volume.trim())) {
      errors.volume = 'Volume format should be like "2,500L/day" or "1500 liters/day"';
    }
    
    // Contact validation
    if (!data.contact || data.contact.trim() === '') {
      errors.contact = 'Contact number is required';
    } else if (!/^(\+91[\s-]?)?[6-9]\d{9}$/.test(data.contact.replace(/[\s-]/g, ''))) {
      errors.contact = 'Please enter a valid Indian mobile number';
    }
    
    // Email validation
    if (!data.email || data.email.trim() === '') {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.email = 'Please enter a valid email address';
    } else if (data.email.trim().length > 100) {
      errors.email = 'Email address is too long';
    }
    
    // Check for duplicate email
    if (data.email && b2bClients.some(client => 
      client.email.toLowerCase() === data.email.trim().toLowerCase()
    )) {
      errors.email = 'A client with this email already exists';
    }
    
    // Contract Value validation
    if (!data.contractValue || data.contractValue.trim() === '') {
      errors.contractValue = 'Contract value is required';
    } else if (!/^₹?\s*\d+([,.]?\d+)*\s*(\/month|\/Month|per month|Per Month)?$/i.test(data.contractValue.trim())) {
      errors.contractValue = 'Contract value format should be like "₹1,25,000/month"';
    }
    
    // Payment Terms validation
    if (!data.paymentTerms) {
      errors.paymentTerms = 'Please select payment terms';
    }
    
    // Delivery Schedule validation
    if (!data.deliverySchedule || data.deliverySchedule.trim() === '') {
      errors.deliverySchedule = 'Delivery schedule is required';
    } else if (data.deliverySchedule.trim().length < 5) {
      errors.deliverySchedule = 'Please provide a detailed delivery schedule';
    }
    
    // Address validation (optional but if provided, should be valid)
    if (data.address && data.address.trim().length > 0 && data.address.trim().length < 10) {
      errors.address = 'Address should be at least 10 characters if provided';
    } else if (data.address && data.address.trim().length > 500) {
      errors.address = 'Address is too long (max 500 characters)';
    }
    
    return errors;
  };

  const validateVendorForm = (data) => {
    const errors = {};
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
      errors.name = 'Vendor name must be at least 2 characters long';
    } else if (data.name.trim().length > 100) {
      errors.name = 'Vendor name must not exceed 100 characters';
    } else if (!/^[a-zA-Z0-9\s&.-]+$/.test(data.name.trim())) {
      errors.name = 'Vendor name contains invalid characters';
    }
    
    // Check for duplicate vendor names
    if (data.name && b2bVendors.some(vendor => 
      vendor.name.toLowerCase() === data.name.trim().toLowerCase()
    )) {
      errors.name = 'A vendor with this name already exists';
    }
    
    // Vendor Type validation
    if (!data.type) {
      errors.type = 'Please select a vendor type';
    }
    
    // Volume validation
    if (!data.volume || data.volume.trim() === '') {
      errors.volume = 'Daily volume is required';
    } else if (!/^\d+([,.]?\d+)?\s*(L|l|liters?|Liters?)(\/day|\/Day)?$/i.test(data.volume.trim())) {
      errors.volume = 'Volume format should be like "5,000L/day" or "3000 liters/day"';
    }
    
    // Quality Grade validation
    if (!data.qualityGrade) {
      errors.qualityGrade = 'Please select a quality grade';
    }
    
    // Contact validation
    if (!data.contact || data.contact.trim() === '') {
      errors.contact = 'Contact number is required';
    } else if (!/^(\+91[\s-]?)?[6-9]\d{9}$/.test(data.contact.replace(/[\s-]/g, ''))) {
      errors.contact = 'Please enter a valid Indian mobile number';
    }
    
    // Email validation
    if (!data.email || data.email.trim() === '') {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.email = 'Please enter a valid email address';
    } else if (data.email.trim().length > 100) {
      errors.email = 'Email address is too long';
    }
    
    // Check for duplicate email
    if (data.email && b2bVendors.some(vendor => 
      vendor.email.toLowerCase() === data.email.trim().toLowerCase()
    )) {
      errors.email = 'A vendor with this email already exists';
    }
    
    // Contract Value validation
    if (!data.contractValue || data.contractValue.trim() === '') {
      errors.contractValue = 'Contract value is required';
    } else if (!/^₹?\s*\d+([,.]?\d+)*\s*(\/month|\/Month|per month|Per Month)?$/i.test(data.contractValue.trim())) {
      errors.contractValue = 'Contract value format should be like "₹2,25,000/month"';
    }
    
    // Price per Liter validation
    if (!data.pricePerLiter || data.pricePerLiter.trim() === '') {
      errors.pricePerLiter = 'Price per liter is required';
    } else if (!/^₹?\s*\d+(\.\d{1,2})?$/.test(data.pricePerLiter.trim())) {
      errors.pricePerLiter = 'Price format should be like "₹45.00" or "45.50"';
    } else {
      const price = parseFloat(data.pricePerLiter.replace('₹', '').trim());
      if (price < 10 || price > 200) {
        errors.pricePerLiter = 'Price per liter should be between ₹10 and ₹200';
      }
    }
    
    // Farm Size validation (optional)
    if (data.farmSize && data.farmSize.trim() !== '') {
      if (!/^\d+(\.\d+)?\s*(acres?|hectares?|Acres?|Hectares?)$/i.test(data.farmSize.trim())) {
        errors.farmSize = 'Farm size format should be like "150 acres" or "60.5 hectares"';
      }
    }
    
    // Cattle Count validation (optional)
    if (data.cattleCount && data.cattleCount.trim() !== '') {
      const count = parseInt(data.cattleCount);
      if (isNaN(count) || count < 1 || count > 10000) {
        errors.cattleCount = 'Cattle count should be a number between 1 and 10,000';
      }
    }
    
    // Geographic Region validation
    if (!data.geographicRegion) {
      errors.geographicRegion = 'Please select a geographic region';
    }
    
    // Payment Terms validation
    if (!data.paymentTerms) {
      errors.paymentTerms = 'Please select payment terms';
    }
    
    // Collection Schedule validation
    if (!data.collectionSchedule || data.collectionSchedule.trim() === '') {
      errors.collectionSchedule = 'Collection schedule is required';
    } else if (data.collectionSchedule.trim().length < 5) {
      errors.collectionSchedule = 'Please provide a detailed collection schedule';
    }
    
    // Certifications validation (optional)
    if (data.certifications && data.certifications.trim() !== '') {
      const certs = data.certifications.split(',');
      if (certs.length > 10) {
        errors.certifications = 'Too many certifications listed (max 10)';
      }
      for (let cert of certs) {
        if (cert.trim().length < 2) {
          errors.certifications = 'Each certification should be at least 2 characters';
          break;
        }
      }
    }
    
    // Address validation (optional but if provided, should be valid)
    if (data.address && data.address.trim().length > 0 && data.address.trim().length < 10) {
      errors.address = 'Address should be at least 10 characters if provided';
    } else if (data.address && data.address.trim().length > 500) {
      errors.address = 'Address is too long (max 500 characters)';
    }
    
    return errors;
  };

  // Form handlers with validation
  const handleClientFormChange = (field, value) => {
    setClientFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear specific field error when user starts typing
    if (clientFormErrors[field]) {
      setClientFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleVendorFormChange = (field, value) => {
    setVendorFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear specific field error when user starts typing
    if (vendorFormErrors[field]) {
      setVendorFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleClientFormSubmit = (e) => {
    e.preventDefault();
    
    // Set submitting state
    setIsClientFormSubmitting(true);
    
    // Validate form
    const errors = validateClientForm(clientFormData);
    
    if (Object.keys(errors).length > 0) {
      setClientFormErrors(errors);
      setIsClientFormSubmitting(false);
      
      // Show validation error notification
      const notification = {
        id: Date.now(),
        type: 'error',
        message: 'Please fix the validation errors before submitting',
        timestamp: new Date()
      };
      setNotifications(prev => [notification, ...prev.slice(0, 4)]);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
      
      return;
    }
    
    // Clear any existing errors
    setClientFormErrors({});
    
    console.log('Submitting client form:', clientFormData);
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate unique ID for new client
      const newClientId = `CL${String(b2bClients.length + 1).padStart(3, '0')}`;
      
      // Get business type icon
      const getBusinessIcon = (businessType) => {
        const iconMap = {
          'Retail Chain': '🏪',
          'Restaurant': '🍽️',
          'Bakery': '🍰',
          'Hotel': '🏨',
          'Cafe': '☕',
          'Institutional': '🎓',
          'Wholesale': '📦'
        };
        return iconMap[businessType] || '🏢';
      };
      
      // Get business type colors
      const getBusinessColors = (businessType) => {
        const colorMap = {
          'Retail Chain': { bg: 'rgba(52, 152, 219, 0.1)', icon: '#3498db' },
          'Restaurant': { bg: 'rgba(231, 76, 60, 0.1)', icon: '#e74c3c' },
          'Bakery': { bg: 'rgba(46, 204, 113, 0.1)', icon: '#2ecc71' },
          'Hotel': { bg: 'rgba(155, 89, 182, 0.1)', icon: '#9b59b6' },
          'Cafe': { bg: 'rgba(241, 196, 15, 0.1)', icon: '#f1c40f' },
          'Institutional': { bg: 'rgba(52, 73, 94, 0.1)', icon: '#34495e' },
          'Wholesale': { bg: 'rgba(26, 188, 156, 0.1)', icon: '#1abc9c' }
        };
        return colorMap[businessType] || { bg: 'rgba(149, 165, 166, 0.1)', icon: '#95a5a6' };
      };
      
      const colors = getBusinessColors(clientFormData.businessType);
      
      // Create new client object with trimmed data
      const newClient = {
        id: newClientId,
        name: clientFormData.name.trim(),
        type: clientFormData.type,
        volume: clientFormData.volume.trim(),
        status: 'active',
        nextDelivery: 'Tomorrow 8:00 AM', // Default next delivery
        contractValue: clientFormData.contractValue.trim(),
        paymentStatus: 'paid', // Default status for new clients
        lastOrder: new Date().toISOString().split('T')[0], // Today's date
        icon: getBusinessIcon(clientFormData.businessType),
        bgColor: colors.bg,
        iconColor: colors.icon,
        contact: clientFormData.contact.trim(),
        email: clientFormData.email.trim().toLowerCase(),
        businessType: clientFormData.businessType,
        paymentTerms: clientFormData.paymentTerms,
        deliverySchedule: clientFormData.deliverySchedule.trim(),
        address: clientFormData.address.trim(),
        // Additional fields for new clients
        dateAdded: new Date().toISOString(),
        isNewlyAdded: true
      };
      
      // Add new client to the list
      setB2bClients(prev => [newClient, ...prev]);
      
      // Add success notification
      const notification = {
        id: Date.now(),
        type: 'success',
        message: `✅ Client "${clientFormData.name.trim()}" added successfully! ID: ${newClientId}`,
        timestamp: new Date()
      };
      setNotifications(prev => [notification, ...prev.slice(0, 4)]);
      
      // Reset form and close
      setClientFormData({
        name: '',
        type: '',
        volume: '',
        contact: '',
        email: '',
        contractValue: '',
        address: '',
        businessType: '',
        paymentTerms: '',
        deliverySchedule: ''
      });
      setClientFormErrors({});
      setShowClientForm(false);
      setIsClientFormSubmitting(false);
      
      // Auto remove notification after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
    }, 1000); // 1 second delay to simulate API call
  };

  const handleVendorFormSubmit = (e) => {
    e.preventDefault();
    
    // Set submitting state
    setIsVendorFormSubmitting(true);
    
    // Validate form
    const errors = validateVendorForm(vendorFormData);
    
    if (Object.keys(errors).length > 0) {
      setVendorFormErrors(errors);
      setIsVendorFormSubmitting(false);
      
      // Show validation error notification
      const notification = {
        id: Date.now(),
        type: 'error',
        message: 'Please fix the validation errors before submitting',
        timestamp: new Date()
      };
      setNotifications(prev => [notification, ...prev.slice(0, 4)]);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
      
      return;
    }
    
    // Clear any existing errors
    setVendorFormErrors({});
    
    console.log('Submitting vendor form:', vendorFormData);
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate unique ID for new vendor
      const newVendorId = `VN${String(b2bVendors.length + 1).padStart(3, '0')}`;
      
      // Get vendor type icon
      const getVendorIcon = (vendorType) => {
        const iconMap = {
          'Raw Milk Supplier': '🐄',
          'Organic Milk Supplier': '🌱',
          'Premium Milk Supplier': '⭐',
          'Bulk Milk Supplier': '🚛',
          'Specialty Supplier': '🏆'
        };
        return iconMap[vendorType] || '🚜';
      };
      
      // Get vendor type colors
      const getVendorColors = (vendorType) => {
        const colorMap = {
          'Raw Milk Supplier': { bg: 'rgba(46, 204, 113, 0.1)', icon: '#2ecc71' },
          'Organic Milk Supplier': { bg: 'rgba(52, 152, 219, 0.1)', icon: '#3498db' },
          'Premium Milk Supplier': { bg: 'rgba(241, 196, 15, 0.1)', icon: '#f1c40f' },
          'Bulk Milk Supplier': { bg: 'rgba(155, 89, 182, 0.1)', icon: '#9b59b6' },
          'Specialty Supplier': { bg: 'rgba(231, 76, 60, 0.1)', icon: '#e74c3c' }
        };
        return colorMap[vendorType] || { bg: 'rgba(149, 165, 166, 0.1)', icon: '#95a5a6' };
      };
      
      // Get quality rating based on grade
      const getQualityRating = (grade) => {
        const ratingMap = {
          'Grade A+': 4.9,
          'Grade A': 4.7,
          'Grade B+': 4.5,
          'Grade B': 4.2,
          'Organic Grade A+': 4.9,
          'Premium Grade': 4.8
        };
        return ratingMap[grade] || 4.5;
      };
      
      // Get quality label
      const getQualityLabel = (grade) => {
        if (grade.includes('Organic')) return 'Organic Premium';
        if (grade.includes('Premium')) return 'Premium';
        if (grade.includes('A+')) return 'Premium';
        if (grade.includes('A')) return 'Standard';
        return 'Standard';
      };
      
      const colors = getVendorColors(vendorFormData.type);
      
      // Create new vendor object with comprehensive data and trimmed values
      const newVendor = {
        id: newVendorId,
        name: vendorFormData.name.trim(),
        type: vendorFormData.type,
        volume: vendorFormData.volume.trim(),
        status: 'active',
        nextCollection: 'Tomorrow 5:00 AM', // Default next collection
        contractValue: vendorFormData.contractValue.trim(),
        paymentStatus: 'paid', // Default status for new vendors
        lastDelivery: new Date().toISOString().split('T')[0], // Today's date
        icon: getVendorIcon(vendorFormData.type),
        bgColor: colors.bg,
        iconColor: colors.icon,
        contact: vendorFormData.contact.trim(),
        email: vendorFormData.email.trim().toLowerCase(),
        rating: getQualityRating(vendorFormData.qualityGrade),
        quality: getQualityLabel(vendorFormData.qualityGrade),
        // Enhanced data
        contractStart: new Date().toISOString().split('T')[0],
        contractEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
        paymentTerms: vendorFormData.paymentTerms,
        pricePerLiter: vendorFormData.pricePerLiter.trim(),
        qualityGrade: vendorFormData.qualityGrade,
        certifications: vendorFormData.certifications ? vendorFormData.certifications.split(',').map(cert => cert.trim()).filter(cert => cert.length > 0) : [],
        farmSize: vendorFormData.farmSize.trim() || 'Not specified',
        cattleCount: parseInt(vendorFormData.cattleCount) || 0,
        avgFatContent: '4.0%', // Default values for new vendors
        avgProteinContent: '3.5%',
        dailyCapacity: vendorFormData.volume.trim(),
        geographicRegion: vendorFormData.geographicRegion,
        relationshipManager: 'New Assignment Pending',
        managerContact: '+91 98765 00000',
        performanceScore: 85, // Default score for new vendors
        renewalProbability: 90,
        sustainabilityScore: 80,
        complianceRecord: 'New - Under Review',
        transportationMode: 'Standard truck',
        deliveryWindow: vendorFormData.collectionSchedule.trim() || '5:00 AM - 7:00 AM',
        emergencyContact: vendorFormData.contact.trim(),
        backupSupplier: 'To be assigned',
        seasonalVariation: 'Low',
        weatherDependency: 'Medium',
        technologyAdoption: 'Medium',
        digitalIntegration: 'Manual reporting',
        keyStrengths: ['New partnership', 'Quality commitment', 'Reliable supply'],
        riskFactors: ['New vendor', 'Performance unproven'],
        contractHistory: [
          { period: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1), performance: 'New', renewal: 'Initial contract' }
        ],
        // Additional fields for new vendors
        dateAdded: new Date().toISOString(),
        isNewlyAdded: true,
        address: vendorFormData.address.trim(),
        collectionSchedule: vendorFormData.collectionSchedule.trim()
      };
      
      // Add new vendor to the list
      setB2bVendors(prev => [newVendor, ...prev]);
      
      // Add success notification
      const notification = {
        id: Date.now(),
        type: 'success',
        message: `✅ Vendor "${vendorFormData.name.trim()}" added successfully! ID: ${newVendorId}`,
        timestamp: new Date()
      };
      setNotifications(prev => [notification, ...prev.slice(0, 4)]);
      
      // Reset form and close
      setVendorFormData({
        name: '',
        type: '',
        volume: '',
        contact: '',
        email: '',
        contractValue: '',
        address: '',
        farmSize: '',
        cattleCount: '',
        qualityGrade: '',
        pricePerLiter: '',
        certifications: '',
        geographicRegion: '',
        paymentTerms: '',
        collectionSchedule: ''
      });
      setVendorFormErrors({});
      setShowVendorForm(false);
      setIsVendorFormSubmitting(false);
      
      // Auto remove notification after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
    }, 1000); // 1 second delay to simulate API call
  };

  const handleFormCancel = (formType) => {
    if (formType === 'client') {
      setShowClientForm(false);
      setClientFormData({
        name: '',
        type: '',
        volume: '',
        contact: '',
        email: '',
        contractValue: '',
        address: '',
        businessType: '',
        paymentTerms: '',
        deliverySchedule: ''
      });
      setClientFormErrors({});
      setIsClientFormSubmitting(false);
    } else {
      setShowVendorForm(false);
      setVendorFormData({
        name: '',
        type: '',
        volume: '',
        contact: '',
        email: '',
        contractValue: '',
        address: '',
        farmSize: '',
        cattleCount: '',
        qualityGrade: '',
        pricePerLiter: '',
        certifications: '',
        geographicRegion: '',
        paymentTerms: '',
        collectionSchedule: ''
      });
      setVendorFormErrors({});
      setIsVendorFormSubmitting(false);
    }
  };

  // Client Operations Form Handlers
  const handleViewOrdersFormChange = (field, value) => {
    setViewOrdersData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear specific field error when user starts typing
    if (viewOrdersFormErrors[field]) {
      setViewOrdersFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleContactFormChange = (field, value) => {
    setContactFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear specific field error when user starts typing
    if (contactFormErrors[field]) {
      setContactFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleInvoiceFormChange = (field, value) => {
    setInvoiceFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear specific field error when user starts typing
    if (invoiceFormErrors[field]) {
      setInvoiceFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Form validation functions for client operations
  const validateViewOrdersForm = (data) => {
    const errors = {};
    
    if (!data.orderId || data.orderId.trim().length < 3) {
      errors.orderId = 'Order ID must be at least 3 characters long';
    }
    
    if (!data.orderDate) {
      errors.orderDate = 'Order date is required';
    }
    
    if (!data.deliveryDate) {
      errors.deliveryDate = 'Delivery date is required';
    } else if (new Date(data.deliveryDate) <= new Date(data.orderDate)) {
      errors.deliveryDate = 'Delivery date must be after order date';
    }
    
    if (!data.quantity || data.quantity.trim() === '') {
      errors.quantity = 'Quantity is required';
    }
    
    if (!data.status) {
      errors.status = 'Please select order status';
    }
    
    if (!data.priority) {
      errors.priority = 'Please select priority level';
    }
    
    if (!data.contactPerson || data.contactPerson.trim().length < 2) {
      errors.contactPerson = 'Contact person name is required';
    }
    
    return errors;
  };

  const validateContactForm = (data) => {
    const errors = {};
    
    if (!data.subject || data.subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters long';
    }
    
    if (!data.message || data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }
    
    if (!data.priority) {
      errors.priority = 'Please select priority level';
    }
    
    if (!data.contactMethod) {
      errors.contactMethod = 'Please select contact method';
    }
    
    if (!data.category) {
      errors.category = 'Please select message category';
    }
    
    return errors;
  };

  const validateInvoiceForm = (data) => {
    const errors = {};
    
    if (!data.invoiceNumber || data.invoiceNumber.trim().length < 3) {
      errors.invoiceNumber = 'Invoice number is required';
    }
    
    if (!data.invoiceDate) {
      errors.invoiceDate = 'Invoice date is required';
    }
    
    if (!data.dueDate) {
      errors.dueDate = 'Due date is required';
    } else if (new Date(data.dueDate) <= new Date(data.invoiceDate)) {
      errors.dueDate = 'Due date must be after invoice date';
    }
    
    if (!data.amount || data.amount.trim() === '') {
      errors.amount = 'Amount is required';
    } else if (isNaN(parseFloat(data.amount.replace(/[^\d.]/g, '')))) {
      errors.amount = 'Please enter a valid amount';
    }
    
    if (!data.description || data.description.trim().length < 5) {
      errors.description = 'Description must be at least 5 characters long';
    }
    
    if (!data.quantity || data.quantity.trim() === '') {
      errors.quantity = 'Quantity is required';
    }
    
    return errors;
  };

  // Form submit handlers for client operations
  const handleViewOrdersFormSubmit = (e) => {
    e.preventDefault();
    setIsViewOrdersFormSubmitting(true);
    
    const errors = validateViewOrdersForm(viewOrdersData);
    
    if (Object.keys(errors).length > 0) {
      setViewOrdersFormErrors(errors);
      setIsViewOrdersFormSubmitting(false);
      
      const notification = {
        id: Date.now(),
        type: 'error',
        message: 'Please fix the validation errors before submitting',
        timestamp: new Date()
      };
      setNotifications(prev => [notification, ...prev.slice(0, 4)]);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
      
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      const notification = {
        id: Date.now(),
        type: 'success',
        message: `✅ Order ${viewOrdersData.orderId} created successfully for ${selectedClient?.name}!`,
        timestamp: new Date()
      };
      setNotifications(prev => [notification, ...prev.slice(0, 4)]);
      
      // Reset form and close
      setViewOrdersData({
        orderId: '',
        orderDate: '',
        deliveryDate: '',
        quantity: '',
        status: '',
        priority: '',
        specialInstructions: '',
        deliveryAddress: '',
        contactPerson: '',
        orderValue: ''
      });
      setViewOrdersFormErrors({});
      setIsViewOrdersFormSubmitting(false);
      setShowViewOrdersForm(false);
      setSelectedClient(null);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
    }, 1500);
  };

  const handleContactFormSubmit = (e) => {
    e.preventDefault();
    setIsContactFormSubmitting(true);
    
    const errors = validateContactForm(contactFormData);
    
    if (Object.keys(errors).length > 0) {
      setContactFormErrors(errors);
      setIsContactFormSubmitting(false);
      
      const notification = {
        id: Date.now(),
        type: 'error',
        message: 'Please fix the validation errors before submitting',
        timestamp: new Date()
      };
      setNotifications(prev => [notification, ...prev.slice(0, 4)]);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
      
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      const notification = {
        id: Date.now(),
        type: 'success',
        message: `✅ Message sent successfully to ${selectedClient?.name}!`,
        timestamp: new Date()
      };
      setNotifications(prev => [notification, ...prev.slice(0, 4)]);
      
      // Reset form and close
      setContactFormData({
        subject: '',
        message: '',
        priority: '',
        contactMethod: '',
        followUpDate: '',
        category: '',
        attachments: ''
      });
      setContactFormErrors({});
      setIsContactFormSubmitting(false);
      setShowContactForm(false);
      setSelectedClient(null);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
    }, 1500);
  };

  const handleInvoiceFormSubmit = (e) => {
    e.preventDefault();
    setIsInvoiceFormSubmitting(true);
    
    const errors = validateInvoiceForm(invoiceFormData);
    
    if (Object.keys(errors).length > 0) {
      setInvoiceFormErrors(errors);
      setIsInvoiceFormSubmitting(false);
      
      const notification = {
        id: Date.now(),
        type: 'error',
        message: 'Please fix the validation errors before submitting',
        timestamp: new Date()
      };
      setNotifications(prev => [notification, ...prev.slice(0, 4)]);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
      
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      const notification = {
        id: Date.now(),
        type: 'success',
        message: `✅ Invoice ${invoiceFormData.invoiceNumber} generated successfully for ${selectedClient?.name}!`,
        timestamp: new Date()
      };
      setNotifications(prev => [notification, ...prev.slice(0, 4)]);
      
      // Reset form and close
      setInvoiceFormData({
        invoiceNumber: '',
        invoiceDate: '',
        dueDate: '',
        amount: '',
        taxAmount: '',
        totalAmount: '',
        paymentTerms: '',
        description: '',
        quantity: '',
        unitPrice: '',
        discount: '',
        notes: ''
      });
      setInvoiceFormErrors({});
      setIsInvoiceFormSubmitting(false);
      setShowInvoiceForm(false);
      setSelectedClient(null);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
    }, 1500);
  };

  // Handle form cancellation for client operations
  const handleClientOperationFormCancel = (formType) => {
    switch(formType) {
      case 'viewOrders':
        setShowViewOrdersForm(false);
        setViewOrdersData({
          orderId: '',
          orderDate: '',
          deliveryDate: '',
          quantity: '',
          status: '',
          priority: '',
          specialInstructions: '',
          deliveryAddress: '',
          contactPerson: '',
          orderValue: ''
        });
        setViewOrdersFormErrors({});
        setIsViewOrdersFormSubmitting(false);
        break;
      case 'contact':
        setShowContactForm(false);
        setContactFormData({
          subject: '',
          message: '',
          priority: '',
          contactMethod: '',
          followUpDate: '',
          category: '',
          attachments: ''
        });
        setContactFormErrors({});
        setIsContactFormSubmitting(false);
        break;
      case 'invoice':
        setShowInvoiceForm(false);
        setInvoiceFormData({
          invoiceNumber: '',
          invoiceDate: '',
          dueDate: '',
          amount: '',
          taxAmount: '',
          totalAmount: '',
          paymentTerms: '',
          description: '',
          quantity: '',
          unitPrice: '',
          discount: '',
          notes: ''
        });
        setInvoiceFormErrors({});
        setIsInvoiceFormSubmitting(false);
        break;
    }
    setSelectedClient(null);
  };

  // Handle clicking outside forms to close them
  const handleOverlayClick = (e, formType) => {
    if (e.target.classList.contains('dashboard-form-overlay')) {
      if (['viewOrders', 'contact', 'invoice'].includes(formType)) {
        handleClientOperationFormCancel(formType);
      } else {
        handleFormCancel(formType);
      }
    }
  };

  // Key milk production metrics with beautiful light colors
  const milkStats = [
    { 
      title: 'Daily Milk Collection', 
      value: '1,245L', 
      change: '+8.2%', 
      icon: '🥛',
      description: 'Total milk collected today',
      trend: 'up',
      target: '1,500L',
      bgColor: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      iconColor: '#1976d2',
      borderColor: '#64b5f6'
    },
    { 
      title: 'Quality Rating', 
      value: '94.5%', 
      change: '+2.1%', 
      icon: '🏆',
      description: 'Average quality score',
      trend: 'up',
      target: '95%',
      bgColor: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
      iconColor: '#388e3c',
      borderColor: '#81c784'
    },
    { 
      title: 'Active Suppliers', 
      value: '248', 
      change: '+12', 
      icon: '👨‍🌾',
      description: 'Currently supplying farmers',
      trend: 'up',
      target: '300',
      bgColor: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
      iconColor: '#7b1fa2',
      borderColor: '#ba68c8'
    },
    { 
      title: 'Fat Content Average', 
      value: '3.8%', 
      change: '+0.3%', 
      icon: '🧪',
      description: 'Average fat percentage',
      trend: 'up',
      target: '4.0%',
      bgColor: 'linear-gradient(135deg, #fffde7 0%, #fff176 100%)',
      iconColor: '#f57f17',
      borderColor: '#ffeb3b'
    },
    { 
      title: 'Livestock Count', 
      value: '142', 
      change: '+2%', 
      icon: '🐄',
      description: '138 healthy animals (97%)',
      trend: 'up',
      target: '150',
      bgColor: 'linear-gradient(135deg, #fff3e0 0%, #ffcc80 100%)',
      iconColor: '#ef6c00',
      borderColor: '#ffb74d'
    },
    { 
      title: 'Storage Capacity', 
      value: '85%', 
      change: '-3%', 
      icon: '🏭',
      description: 'Cold storage utilization',
      trend: 'down',
      target: '80%',
      bgColor: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
      iconColor: '#424242',
      borderColor: '#9e9e9e'
    },
    { 
      title: 'Distribution Network', 
      value: '8', 
      change: '+1', 
      icon: '🚛',
      description: '26 active contracts',
      trend: 'up',
      target: '10',
      bgColor: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
      iconColor: '#d32f2f',
      borderColor: '#ef5350'
    },
    { 
      title: 'Daily Revenue', 
      value: '₹1,240', 
      change: '+12%', 
      icon: '💹',
      description: 'Monthly: ₹28,873',
      trend: 'up',
      target: '₹1,500',
      bgColor: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)',
      iconColor: '#00695c',
      borderColor: '#4db6ac'
    }
  ];



  // Enhanced analytics data
  const analyticsData = {
    productionTrends: {
      weekly: { trend: 'increasing', percentage: 8.2 },
      monthly: { trend: 'stable', percentage: 2.1 },
      quarterly: { trend: 'increasing', percentage: 15.7 }
    },
    qualityMetrics: {
      averageScore: 94.5,
      improvement: 2.1,
      compliance: 98.3,
      certifications: ['ISO 9001', 'HACCP', 'FDA Approved']
    },
    supplyChain: {
      efficiency: 87.3,
      onTimeDelivery: 96.8,
      supplierSatisfaction: 94.2,
      costOptimization: 12.5
    }
  };





  return (
    <div className="page-container milk-dashboard">
      {/* Notifications Bar */}
      {notifications.length > 0 && (
        <div className="notifications-bar">
          {notifications.map(notification => (
            <div key={notification.id} className={`notification ${notification.type}`}>
              <span className="notification-icon">
                {notification.type === 'success' ? '✅' : notification.type === 'warning' ? '⚠️' : 'ℹ️'}
              </span>
              <span className="notification-message">{notification.message}</span>
              <button 
                className="notification-close"
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Normal Welcome Section */}
      <div className="normal-welcome">
        <div className="welcome-header">
          <div className="welcome-info">
            <h1>Welcome back, Shivakumar!</h1>
            <p>{timeGreeting.greeting}! Have a productive day.</p>
          </div>
          <div className="welcome-actions">
            <div className="quick-actions">
              
            </div>
            <div className="last-refresh">
              <span className="refresh-text">Last updated: {lastRefresh.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Client Form */}
      {showClientForm && (
        <div className="dashboard-form-overlay" onClick={(e) => handleOverlayClick(e, 'client')}>
          <div className="dashboard-form-container client-form-container">
            <div className="dashboard-form-header">
              <h3 className="dashboard-form-title">
                <span className="dashboard-form-icon">🏢</span>
                Add New Client
              </h3>
              <button 
                className="dashboard-form-close-btn"
                onClick={() => handleFormCancel('client')}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleClientFormSubmit} className="dashboard-form-content">
              <div className="dashboard-form-grid">
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Client Name *</label>
                  <input
                    type="text"
                    className={`dashboard-form-input ${clientFormErrors.name ? 'error' : ''}`}
                    value={clientFormData.name}
                    onChange={(e) => handleClientFormChange('name', e.target.value)}
                    placeholder="Enter client name"
                    required
                  />
                  {clientFormErrors.name && (
                    <span className="dashboard-form-error">{clientFormErrors.name}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Business Type *</label>
                  <select
                    className={`dashboard-form-select ${clientFormErrors.businessType ? 'error' : ''}`}
                    value={clientFormData.businessType}
                    onChange={(e) => handleClientFormChange('businessType', e.target.value)}
                    required
                  >
                    <option value="">Select business type</option>
                    <option value="Retail Chain">Retail Chain</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Cafe">Cafe</option>
                    <option value="Institutional">Institutional</option>
                    <option value="Wholesale">Wholesale</option>
                  </select>
                  {clientFormErrors.businessType && (
                    <span className="dashboard-form-error">{clientFormErrors.businessType}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Contract Type *</label>
                  <select
                    className={`dashboard-form-select ${clientFormErrors.type ? 'error' : ''}`}
                    value={clientFormData.type}
                    onChange={(e) => handleClientFormChange('type', e.target.value)}
                    required
                  >
                    <option value="">Select contract type</option>
                    <option value="Wholesale Contract">Wholesale Contract</option>
                    <option value="Bulk Supply">Bulk Supply</option>
                    <option value="Premium Supply">Premium Supply</option>
                    <option value="Institutional Supply">Institutional Supply</option>
                    <option value="Regular Supply">Regular Supply</option>
                  </select>
                  {clientFormErrors.type && (
                    <span className="dashboard-form-error">{clientFormErrors.type}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Daily Volume *</label>
                  <input
                    type="text"
                    className={`dashboard-form-input ${clientFormErrors.volume ? 'error' : ''}`}
                    value={clientFormData.volume}
                    onChange={(e) => handleClientFormChange('volume', e.target.value)}
                    placeholder="e.g., 2,500L/day"
                    required
                  />
                  {clientFormErrors.volume && (
                    <span className="dashboard-form-error">{clientFormErrors.volume}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Contact Number *</label>
                  <input
                    type="tel"
                    className={`dashboard-form-input ${clientFormErrors.contact ? 'error' : ''}`}
                    value={clientFormData.contact}
                    onChange={(e) => handleClientFormChange('contact', e.target.value)}
                    placeholder="+91 98765 43210"
                    required
                  />
                  {clientFormErrors.contact && (
                    <span className="dashboard-form-error">{clientFormErrors.contact}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Email Address *</label>
                  <input
                    type="email"
                    className={`dashboard-form-input ${clientFormErrors.email ? 'error' : ''}`}
                    value={clientFormData.email}
                    onChange={(e) => handleClientFormChange('email', e.target.value)}
                    placeholder="client@example.com"
                    required
                  />
                  {clientFormErrors.email && (
                    <span className="dashboard-form-error">{clientFormErrors.email}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Contract Value *</label>
                  <input
                    type="text"
                    className={`dashboard-form-input ${clientFormErrors.contractValue ? 'error' : ''}`}
                    value={clientFormData.contractValue}
                    onChange={(e) => handleClientFormChange('contractValue', e.target.value)}
                    placeholder="₹1,25,000/month"
                    required
                  />
                  {clientFormErrors.contractValue && (
                    <span className="dashboard-form-error">{clientFormErrors.contractValue}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Payment Terms *</label>
                  <select
                    className={`dashboard-form-select ${clientFormErrors.paymentTerms ? 'error' : ''}`}
                    value={clientFormData.paymentTerms}
                    onChange={(e) => handleClientFormChange('paymentTerms', e.target.value)}
                    required
                  >
                    <option value="">Select payment terms</option>
                    <option value="Net 15 days">Net 15 days</option>
                    <option value="Net 30 days">Net 30 days</option>
                    <option value="Net 45 days">Net 45 days</option>
                    <option value="Advance Payment">Advance Payment</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                  </select>
                  {clientFormErrors.paymentTerms && (
                    <span className="dashboard-form-error">{clientFormErrors.paymentTerms}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group dashboard-form-group-full">
                  <label className="dashboard-form-label">Delivery Schedule *</label>
                  <input
                    type="text"
                    className={`dashboard-form-input ${clientFormErrors.deliverySchedule ? 'error' : ''}`}
                    value={clientFormData.deliverySchedule}
                    onChange={(e) => handleClientFormChange('deliverySchedule', e.target.value)}
                    placeholder="e.g., Daily 6:00 AM"
                    required
                  />
                  {clientFormErrors.deliverySchedule && (
                    <span className="dashboard-form-error">{clientFormErrors.deliverySchedule}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group dashboard-form-group-full">
                  <label className="dashboard-form-label">Address</label>
                  <textarea
                    className={`dashboard-form-textarea ${clientFormErrors.address ? 'error' : ''}`}
                    value={clientFormData.address}
                    onChange={(e) => handleClientFormChange('address', e.target.value)}
                    placeholder="Enter complete address"
                    rows="3"
                  />
                  {clientFormErrors.address && (
                    <span className="dashboard-form-error">{clientFormErrors.address}</span>
                  )}
                </div>
              </div>
              
              <div className="dashboard-form-actions">
                <button 
                  type="button" 
                  className="dashboard-form-btn dashboard-form-btn-cancel"
                  onClick={() => handleFormCancel('client')}
                  disabled={isClientFormSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={`dashboard-form-btn dashboard-form-btn-submit ${isClientFormSubmitting ? 'loading' : ''}`}
                  disabled={isClientFormSubmitting}
                >
                  <span className="dashboard-form-btn-icon">
                    {isClientFormSubmitting ? '⏳' : '✓'}
                  </span>
                  {isClientFormSubmitting ? 'Adding Client...' : 'Add Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Vendor Form */}
      {showVendorForm && (
        <div className="dashboard-form-overlay" onClick={(e) => handleOverlayClick(e, 'vendor')}>
          <div className="dashboard-form-container vendor-form-container">
            <div className="dashboard-form-header">
              <h3 className="dashboard-form-title">
                <span className="dashboard-form-icon">🚜</span>
                Add New Vendor
              </h3>
              <button 
                className="dashboard-form-close-btn"
                onClick={() => handleFormCancel('vendor')}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleVendorFormSubmit} className="dashboard-form-content">
              <div className="dashboard-form-grid">
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Vendor Name *</label>
                  <input
                    type="text"
                    className={`dashboard-form-input ${vendorFormErrors.name ? 'error' : ''}`}
                    value={vendorFormData.name}
                    onChange={(e) => handleVendorFormChange('name', e.target.value)}
                    placeholder="Enter vendor name"
                    required
                  />
                  {vendorFormErrors.name && (
                    <span className="dashboard-form-error">{vendorFormErrors.name}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Vendor Type *</label>
                  <select
                    className={`dashboard-form-select ${vendorFormErrors.type ? 'error' : ''}`}
                    value={vendorFormData.type}
                    onChange={(e) => handleVendorFormChange('type', e.target.value)}
                    required
                  >
                    <option value="">Select vendor type</option>
                    <option value="Raw Milk Supplier">Raw Milk Supplier</option>
                    <option value="Organic Milk Supplier">Organic Milk Supplier</option>
                    <option value="Premium Milk Supplier">Premium Milk Supplier</option>
                    <option value="Bulk Milk Supplier">Bulk Milk Supplier</option>
                    <option value="Specialty Supplier">Specialty Supplier</option>
                  </select>
                  {vendorFormErrors.type && (
                    <span className="dashboard-form-error">{vendorFormErrors.type}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Daily Volume *</label>
                  <input
                    type="text"
                    className={`dashboard-form-input ${vendorFormErrors.volume ? 'error' : ''}`}
                    value={vendorFormData.volume}
                    onChange={(e) => handleVendorFormChange('volume', e.target.value)}
                    placeholder="e.g., 5,000L/day"
                    required
                  />
                  {vendorFormErrors.volume && (
                    <span className="dashboard-form-error">{vendorFormErrors.volume}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Quality Grade *</label>
                  <select
                    className={`dashboard-form-select ${vendorFormErrors.qualityGrade ? 'error' : ''}`}
                    value={vendorFormData.qualityGrade}
                    onChange={(e) => handleVendorFormChange('qualityGrade', e.target.value)}
                    required
                  >
                    <option value="">Select quality grade</option>
                    <option value="Grade A+">Grade A+</option>
                    <option value="Grade A">Grade A</option>
                    <option value="Grade B+">Grade B+</option>
                    <option value="Grade B">Grade B</option>
                    <option value="Organic Grade A+">Organic Grade A+</option>
                    <option value="Premium Grade">Premium Grade</option>
                  </select>
                  {vendorFormErrors.qualityGrade && (
                    <span className="dashboard-form-error">{vendorFormErrors.qualityGrade}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Contact Number *</label>
                  <input
                    type="tel"
                    className={`dashboard-form-input ${vendorFormErrors.contact ? 'error' : ''}`}
                    value={vendorFormData.contact}
                    onChange={(e) => handleVendorFormChange('contact', e.target.value)}
                    placeholder="+91 98765 54321"
                    required
                  />
                  {vendorFormErrors.contact && (
                    <span className="dashboard-form-error">{vendorFormErrors.contact}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Email Address *</label>
                  <input
                    type="email"
                    className={`dashboard-form-input ${vendorFormErrors.email ? 'error' : ''}`}
                    value={vendorFormData.email}
                    onChange={(e) => handleVendorFormChange('email', e.target.value)}
                    placeholder="vendor@example.com"
                    required
                  />
                  {vendorFormErrors.email && (
                    <span className="dashboard-form-error">{vendorFormErrors.email}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Contract Value *</label>
                  <input
                    type="text"
                    className={`dashboard-form-input ${vendorFormErrors.contractValue ? 'error' : ''}`}
                    value={vendorFormData.contractValue}
                    onChange={(e) => handleVendorFormChange('contractValue', e.target.value)}
                    placeholder="₹2,25,000/month"
                    required
                  />
                  {vendorFormErrors.contractValue && (
                    <span className="dashboard-form-error">{vendorFormErrors.contractValue}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Price per Liter *</label>
                  <input
                    type="text"
                    className={`dashboard-form-input ${vendorFormErrors.pricePerLiter ? 'error' : ''}`}
                    value={vendorFormData.pricePerLiter}
                    onChange={(e) => handleVendorFormChange('pricePerLiter', e.target.value)}
                    placeholder="₹45.00"
                    required
                  />
                  {vendorFormErrors.pricePerLiter && (
                    <span className="dashboard-form-error">{vendorFormErrors.pricePerLiter}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Farm Size</label>
                  <input
                    type="text"
                    className={`dashboard-form-input ${vendorFormErrors.farmSize ? 'error' : ''}`}
                    value={vendorFormData.farmSize}
                    onChange={(e) => handleVendorFormChange('farmSize', e.target.value)}
                    placeholder="e.g., 150 acres"
                  />
                  {vendorFormErrors.farmSize && (
                    <span className="dashboard-form-error">{vendorFormErrors.farmSize}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Cattle Count</label>
                  <input
                    type="number"
                    className={`dashboard-form-input ${vendorFormErrors.cattleCount ? 'error' : ''}`}
                    value={vendorFormData.cattleCount}
                    onChange={(e) => handleVendorFormChange('cattleCount', e.target.value)}
                    placeholder="250"
                    min="1"
                    max="10000"
                  />
                  {vendorFormErrors.cattleCount && (
                    <span className="dashboard-form-error">{vendorFormErrors.cattleCount}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Geographic Region *</label>
                  <select
                    className={`dashboard-form-select ${vendorFormErrors.geographicRegion ? 'error' : ''}`}
                    value={vendorFormData.geographicRegion}
                    onChange={(e) => handleVendorFormChange('geographicRegion', e.target.value)}
                    required
                  >
                    <option value="">Select region</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                  {vendorFormErrors.geographicRegion && (
                    <span className="dashboard-form-error">{vendorFormErrors.geographicRegion}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Payment Terms *</label>
                  <select
                    className={`dashboard-form-select ${vendorFormErrors.paymentTerms ? 'error' : ''}`}
                    value={vendorFormData.paymentTerms}
                    onChange={(e) => handleVendorFormChange('paymentTerms', e.target.value)}
                    required
                  >
                    <option value="">Select payment terms</option>
                    <option value="Net 15 days">Net 15 days</option>
                    <option value="Net 30 days">Net 30 days</option>
                    <option value="Net 45 days">Net 45 days</option>
                    <option value="Advance Payment">Advance Payment</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                  </select>
                  {vendorFormErrors.paymentTerms && (
                    <span className="dashboard-form-error">{vendorFormErrors.paymentTerms}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group dashboard-form-group-full">
                  <label className="dashboard-form-label">Collection Schedule *</label>
                  <input
                    type="text"
                    className={`dashboard-form-input ${vendorFormErrors.collectionSchedule ? 'error' : ''}`}
                    value={vendorFormData.collectionSchedule}
                    onChange={(e) => handleVendorFormChange('collectionSchedule', e.target.value)}
                    placeholder="e.g., Daily 5:00 AM"
                    required
                  />
                  {vendorFormErrors.collectionSchedule && (
                    <span className="dashboard-form-error">{vendorFormErrors.collectionSchedule}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group dashboard-form-group-full">
                  <label className="dashboard-form-label">Certifications</label>
                  <input
                    type="text"
                    className={`dashboard-form-input ${vendorFormErrors.certifications ? 'error' : ''}`}
                    value={vendorFormData.certifications}
                    onChange={(e) => handleVendorFormChange('certifications', e.target.value)}
                    placeholder="e.g., ISO 9001, HACCP, FSSAI (comma separated)"
                  />
                  {vendorFormErrors.certifications && (
                    <span className="dashboard-form-error">{vendorFormErrors.certifications}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group dashboard-form-group-full">
                  <label className="dashboard-form-label">Address</label>
                  <textarea
                    className={`dashboard-form-textarea ${vendorFormErrors.address ? 'error' : ''}`}
                    value={vendorFormData.address}
                    onChange={(e) => handleVendorFormChange('address', e.target.value)}
                    placeholder="Enter complete address"
                    rows="3"
                  />
                  {vendorFormErrors.address && (
                    <span className="dashboard-form-error">{vendorFormErrors.address}</span>
                  )}
                </div>
              </div>
              
              <div className="dashboard-form-actions">
                <button 
                  type="button" 
                  className="dashboard-form-btn dashboard-form-btn-cancel"
                  onClick={() => handleFormCancel('vendor')}
                  disabled={isVendorFormSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={`dashboard-form-btn dashboard-form-btn-submit ${isVendorFormSubmitting ? 'loading' : ''}`}
                  disabled={isVendorFormSubmitting}
                >
                  <span className="dashboard-form-btn-icon">
                    {isVendorFormSubmitting ? '⏳' : '✓'}
                  </span>
                  {isVendorFormSubmitting ? 'Adding Vendor...' : 'Add Vendor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Orders Form */}
      {showViewOrdersForm && (
        <div className="dashboard-form-overlay" onClick={(e) => handleOverlayClick(e, 'viewOrders')}>
          <div className="dashboard-form-modal view-orders-form-modal">
            <div className="dashboard-form-header">
              <h3 className="dashboard-form-title">
                <span className="dashboard-form-icon">📋</span>
                View Orders - {selectedClient?.name}
              </h3>
              <button 
                className="dashboard-form-close-btn"
                onClick={() => handleClientOperationFormCancel('viewOrders')}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleViewOrdersFormSubmit} className="dashboard-form-content">
              <div className="dashboard-form-grid">
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Order ID *</label>
                  <input
                    type="text"
                    className={`dashboard-form-input ${viewOrdersFormErrors.orderId ? 'error' : ''}`}
                    value={viewOrdersData.orderId}
                    onChange={(e) => handleViewOrdersFormChange('orderId', e.target.value)}
                    placeholder="ORD-CL001-123456"
                    required
                  />
                  {viewOrdersFormErrors.orderId && (
                    <span className="dashboard-form-error">{viewOrdersFormErrors.orderId}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Order Date *</label>
                  <input
                    type="date"
                    className={`dashboard-form-input ${viewOrdersFormErrors.orderDate ? 'error' : ''}`}
                    value={viewOrdersData.orderDate}
                    onChange={(e) => handleViewOrdersFormChange('orderDate', e.target.value)}
                    required
                  />
                  {viewOrdersFormErrors.orderDate && (
                    <span className="dashboard-form-error">{viewOrdersFormErrors.orderDate}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Delivery Date *</label>
                  <input
                    type="date"
                    className={`dashboard-form-input ${viewOrdersFormErrors.deliveryDate ? 'error' : ''}`}
                    value={viewOrdersData.deliveryDate}
                    onChange={(e) => handleViewOrdersFormChange('deliveryDate', e.target.value)}
                    required
                  />
                  {viewOrdersFormErrors.deliveryDate && (
                    <span className="dashboard-form-error">{viewOrdersFormErrors.deliveryDate}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Quantity *</label>
                  <input
                    type="text"
                    className={`dashboard-form-input ${viewOrdersFormErrors.quantity ? 'error' : ''}`}
                    value={viewOrdersData.quantity}
                    onChange={(e) => handleViewOrdersFormChange('quantity', e.target.value)}
                    placeholder="e.g., 2,500L"
                    required
                  />
                  {viewOrdersFormErrors.quantity && (
                    <span className="dashboard-form-error">{viewOrdersFormErrors.quantity}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Order Status *</label>
                  <select
                    className={`dashboard-form-select ${viewOrdersFormErrors.status ? 'error' : ''}`}
                    value={viewOrdersData.status}
                    onChange={(e) => handleViewOrdersFormChange('status', e.target.value)}
                    required
                  >
                    <option value="">Select status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  {viewOrdersFormErrors.status && (
                    <span className="dashboard-form-error">{viewOrdersFormErrors.status}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Priority *</label>
                  <select
                    className={`dashboard-form-select ${viewOrdersFormErrors.priority ? 'error' : ''}`}
                    value={viewOrdersData.priority}
                    onChange={(e) => handleViewOrdersFormChange('priority', e.target.value)}
                    required
                  >
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                  {viewOrdersFormErrors.priority && (
                    <span className="dashboard-form-error">{viewOrdersFormErrors.priority}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Contact Person *</label>
                  <input
                    type="text"
                    className={`dashboard-form-input ${viewOrdersFormErrors.contactPerson ? 'error' : ''}`}
                    value={viewOrdersData.contactPerson}
                    onChange={(e) => handleViewOrdersFormChange('contactPerson', e.target.value)}
                    placeholder="Contact person name"
                    required
                  />
                  {viewOrdersFormErrors.contactPerson && (
                    <span className="dashboard-form-error">{viewOrdersFormErrors.contactPerson}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Order Value</label>
                  <input
                    type="text"
                    className="dashboard-form-input"
                    value={viewOrdersData.orderValue}
                    onChange={(e) => handleViewOrdersFormChange('orderValue', e.target.value)}
                    placeholder="₹1,25,000"
                  />
                </div>
                
                <div className="dashboard-form-group dashboard-form-group-full">
                  <label className="dashboard-form-label">Delivery Address</label>
                  <textarea
                    className="dashboard-form-textarea"
                    value={viewOrdersData.deliveryAddress}
                    onChange={(e) => handleViewOrdersFormChange('deliveryAddress', e.target.value)}
                    placeholder="Enter delivery address"
                    rows="2"
                  />
                </div>
                
                <div className="dashboard-form-group dashboard-form-group-full">
                  <label className="dashboard-form-label">Special Instructions</label>
                  <textarea
                    className="dashboard-form-textarea"
                    value={viewOrdersData.specialInstructions}
                    onChange={(e) => handleViewOrdersFormChange('specialInstructions', e.target.value)}
                    placeholder="Any special instructions for this order"
                    rows="3"
                  />
                </div>
              </div>
              
              <div className="dashboard-form-actions">
                <button 
                  type="button" 
                  className="dashboard-form-btn dashboard-form-btn-cancel"
                  onClick={() => handleClientOperationFormCancel('viewOrders')}
                  disabled={isViewOrdersFormSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={`dashboard-form-btn dashboard-form-btn-submit ${isViewOrdersFormSubmitting ? 'loading' : ''}`}
                  disabled={isViewOrdersFormSubmitting}
                >
                  <span className="dashboard-form-btn-icon">
                    {isViewOrdersFormSubmitting ? '⏳' : '📋'}
                  </span>
                  {isViewOrdersFormSubmitting ? 'Creating Order...' : 'Create Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contact Form */}
      {showContactForm && (
        <div className="dashboard-form-overlay" onClick={(e) => handleOverlayClick(e, 'contact')}>
          <div className="dashboard-form-modal contact-form-modal">
            <div className="dashboard-form-header">
              <h3 className="dashboard-form-title">
                <span className="dashboard-form-icon">📞</span>
                Contact - {selectedClient?.name}
              </h3>
              <button 
                className="dashboard-form-close-btn"
                onClick={() => handleClientOperationFormCancel('contact')}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleContactFormSubmit} className="dashboard-form-content">
              <div className="dashboard-form-grid">
                <div className="dashboard-form-group dashboard-form-group-full">
                  <label className="dashboard-form-label">Subject *</label>
                  <input
                    type="text"
                    className={`dashboard-form-input ${contactFormErrors.subject ? 'error' : ''}`}
                    value={contactFormData.subject}
                    onChange={(e) => handleContactFormChange('subject', e.target.value)}
                    placeholder="Enter message subject"
                    required
                  />
                  {contactFormErrors.subject && (
                    <span className="dashboard-form-error">{contactFormErrors.subject}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Priority *</label>
                  <select
                    className={`dashboard-form-select ${contactFormErrors.priority ? 'error' : ''}`}
                    value={contactFormData.priority}
                    onChange={(e) => handleContactFormChange('priority', e.target.value)}
                    required
                  >
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                  {contactFormErrors.priority && (
                    <span className="dashboard-form-error">{contactFormErrors.priority}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Contact Method *</label>
                  <select
                    className={`dashboard-form-select ${contactFormErrors.contactMethod ? 'error' : ''}`}
                    value={contactFormData.contactMethod}
                    onChange={(e) => handleContactFormChange('contactMethod', e.target.value)}
                    required
                  >
                    <option value="">Select method</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone Call</option>
                    <option value="sms">SMS</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="meeting">In-Person Meeting</option>
                  </select>
                  {contactFormErrors.contactMethod && (
                    <span className="dashboard-form-error">{contactFormErrors.contactMethod}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Category *</label>
                  <select
                    className={`dashboard-form-select ${contactFormErrors.category ? 'error' : ''}`}
                    value={contactFormData.category}
                    onChange={(e) => handleContactFormChange('category', e.target.value)}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Related</option>
                    <option value="payment">Payment Issue</option>
                    <option value="quality">Quality Concern</option>
                    <option value="delivery">Delivery Issue</option>
                    <option value="contract">Contract Discussion</option>
                    <option value="complaint">Complaint</option>
                    <option value="feedback">Feedback</option>
                  </select>
                  {contactFormErrors.category && (
                    <span className="dashboard-form-error">{contactFormErrors.category}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Follow-up Date</label>
                  <input
                    type="date"
                    className="dashboard-form-input"
                    value={contactFormData.followUpDate}
                    onChange={(e) => handleContactFormChange('followUpDate', e.target.value)}
                  />
                </div>
                
                <div className="dashboard-form-group dashboard-form-group-full">
                  <label className="dashboard-form-label">Message *</label>
                  <textarea
                    className={`dashboard-form-textarea ${contactFormErrors.message ? 'error' : ''}`}
                    value={contactFormData.message}
                    onChange={(e) => handleContactFormChange('message', e.target.value)}
                    placeholder="Enter your message here..."
                    rows="4"
                    required
                  />
                  {contactFormErrors.message && (
                    <span className="dashboard-form-error">{contactFormErrors.message}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group dashboard-form-group-full">
                  <label className="dashboard-form-label">Attachments</label>
                  <input
                    type="text"
                    className="dashboard-form-input"
                    value={contactFormData.attachments}
                    onChange={(e) => handleContactFormChange('attachments', e.target.value)}
                    placeholder="File names or URLs (comma separated)"
                  />
                </div>
              </div>
              
              <div className="dashboard-form-actions">
                <button 
                  type="button" 
                  className="dashboard-form-btn dashboard-form-btn-cancel"
                  onClick={() => handleClientOperationFormCancel('contact')}
                  disabled={isContactFormSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={`dashboard-form-btn dashboard-form-btn-submit ${isContactFormSubmitting ? 'loading' : ''}`}
                  disabled={isContactFormSubmitting}
                >
                  <span className="dashboard-form-btn-icon">
                    {isContactFormSubmitting ? '⏳' : '📞'}
                  </span>
                  {isContactFormSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Form */}
      {showInvoiceForm && (
        <div className="dashboard-form-overlay" onClick={(e) => handleOverlayClick(e, 'invoice')}>
          <div className="dashboard-form-modal invoice-form-modal">
            <div className="dashboard-form-header">
              <h3 className="dashboard-form-title">
                <span className="dashboard-form-icon">💰</span>
                Generate Invoice - {selectedClient?.name}
              </h3>
              <button 
                className="dashboard-form-close-btn"
                onClick={() => handleClientOperationFormCancel('invoice')}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleInvoiceFormSubmit} className="dashboard-form-content">
              <div className="dashboard-form-grid">
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Invoice Number *</label>
                  <input
                    type="text"
                    className={`dashboard-form-input ${invoiceFormErrors.invoiceNumber ? 'error' : ''}`}
                    value={invoiceFormData.invoiceNumber}
                    onChange={(e) => handleInvoiceFormChange('invoiceNumber', e.target.value)}
                    placeholder="INV-CL001-123456"
                    required
                  />
                  {invoiceFormErrors.invoiceNumber && (
                    <span className="dashboard-form-error">{invoiceFormErrors.invoiceNumber}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Invoice Date *</label>
                  <input
                    type="date"
                    className={`dashboard-form-input ${invoiceFormErrors.invoiceDate ? 'error' : ''}`}
                    value={invoiceFormData.invoiceDate}
                    onChange={(e) => handleInvoiceFormChange('invoiceDate', e.target.value)}
                    required
                  />
                  {invoiceFormErrors.invoiceDate && (
                    <span className="dashboard-form-error">{invoiceFormErrors.invoiceDate}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Due Date *</label>
                  <input
                    type="date"
                    className={`dashboard-form-input ${invoiceFormErrors.dueDate ? 'error' : ''}`}
                    value={invoiceFormData.dueDate}
                    onChange={(e) => handleInvoiceFormChange('dueDate', e.target.value)}
                    required
                  />
                  {invoiceFormErrors.dueDate && (
                    <span className="dashboard-form-error">{invoiceFormErrors.dueDate}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Payment Terms</label>
                  <select
                    className="dashboard-form-select"
                    value={invoiceFormData.paymentTerms}
                    onChange={(e) => handleInvoiceFormChange('paymentTerms', e.target.value)}
                  >
                    <option value="">Select payment terms</option>
                    <option value="Net 15 days">Net 15 days</option>
                    <option value="Net 30 days">Net 30 days</option>
                    <option value="Net 45 days">Net 45 days</option>
                    <option value="Due on receipt">Due on receipt</option>
                    <option value="Cash on delivery">Cash on delivery</option>
                  </select>
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Quantity *</label>
                  <input
                    type="text"
                    className={`dashboard-form-input ${invoiceFormErrors.quantity ? 'error' : ''}`}
                    value={invoiceFormData.quantity}
                    onChange={(e) => handleInvoiceFormChange('quantity', e.target.value)}
                    placeholder="e.g., 2,500L"
                    required
                  />
                  {invoiceFormErrors.quantity && (
                    <span className="dashboard-form-error">{invoiceFormErrors.quantity}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Unit Price</label>
                  <input
                    type="text"
                    className="dashboard-form-input"
                    value={invoiceFormData.unitPrice}
                    onChange={(e) => handleInvoiceFormChange('unitPrice', e.target.value)}
                    placeholder="₹50.00"
                  />
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Amount *</label>
                  <input
                    type="text"
                    className={`dashboard-form-input ${invoiceFormErrors.amount ? 'error' : ''}`}
                    value={invoiceFormData.amount}
                    onChange={(e) => handleInvoiceFormChange('amount', e.target.value)}
                    placeholder="₹1,25,000"
                    required
                  />
                  {invoiceFormErrors.amount && (
                    <span className="dashboard-form-error">{invoiceFormErrors.amount}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Tax Amount</label>
                  <input
                    type="text"
                    className="dashboard-form-input"
                    value={invoiceFormData.taxAmount}
                    onChange={(e) => handleInvoiceFormChange('taxAmount', e.target.value)}
                    placeholder="₹22,500"
                  />
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Discount</label>
                  <input
                    type="text"
                    className="dashboard-form-input"
                    value={invoiceFormData.discount}
                    onChange={(e) => handleInvoiceFormChange('discount', e.target.value)}
                    placeholder="₹0 or 5%"
                  />
                </div>
                
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Total Amount</label>
                  <input
                    type="text"
                    className="dashboard-form-input"
                    value={invoiceFormData.totalAmount}
                    onChange={(e) => handleInvoiceFormChange('totalAmount', e.target.value)}
                    placeholder="₹1,47,500"
                  />
                </div>
                
                <div className="dashboard-form-group dashboard-form-group-full">
                  <label className="dashboard-form-label">Description *</label>
                  <textarea
                    className={`dashboard-form-textarea ${invoiceFormErrors.description ? 'error' : ''}`}
                    value={invoiceFormData.description}
                    onChange={(e) => handleInvoiceFormChange('description', e.target.value)}
                    placeholder="Description of goods/services"
                    rows="2"
                    required
                  />
                  {invoiceFormErrors.description && (
                    <span className="dashboard-form-error">{invoiceFormErrors.description}</span>
                  )}
                </div>
                
                <div className="dashboard-form-group dashboard-form-group-full">
                  <label className="dashboard-form-label">Notes</label>
                  <textarea
                    className="dashboard-form-textarea"
                    value={invoiceFormData.notes}
                    onChange={(e) => handleInvoiceFormChange('notes', e.target.value)}
                    placeholder="Additional notes or terms"
                    rows="3"
                  />
                </div>
              </div>
              
              <div className="dashboard-form-actions">
                <button 
                  type="button" 
                  className="dashboard-form-btn dashboard-form-btn-cancel"
                  onClick={() => handleClientOperationFormCancel('invoice')}
                  disabled={isInvoiceFormSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={`dashboard-form-btn dashboard-form-btn-submit ${isInvoiceFormSubmitting ? 'loading' : ''}`}
                  disabled={isInvoiceFormSubmitting}
                >
                  <span className="dashboard-form-btn-icon">
                    {isInvoiceFormSubmitting ? '⏳' : '💰'}
                  </span>
                  {isInvoiceFormSubmitting ? 'Generating Invoice...' : 'Generate Invoice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enhanced Key Metrics Cards */}
      <div className="metrics-grid">
        {milkStats.map((stat, index) => {
          // Calculate progress percentage based on current value vs target
          const getProgressPercentage = (current, target) => {
            const currentNum = parseFloat(current.replace(/[^\d.]/g, ''));
            const targetNum = parseFloat(target.replace(/[^\d.]/g, ''));
            return Math.min((currentNum / targetNum) * 100, 100);
          };
          
          const progressPercentage = getProgressPercentage(stat.value, stat.target);
          
          return (
            <div 
              key={index} 
              className="dashboard-metric-card"
              style={{ 
                background: stat.bgColor,
                borderLeft: `4px solid ${stat.borderColor}`
              }}
            >
              {/* Icon Section */}
              <div className="dashboard-metric-icon-section">
                <div 
                  className="dashboard-metric-icon-wrapper" 
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: `2px solid ${stat.borderColor}`
                  }}
                >
                  <div className="dashboard-metric-icon" style={{ color: stat.iconColor }}>
                    {stat.icon}
                  </div>
                  </div>
            </div>

              {/* Main Content */}
              <div className="dashboard-metric-main-content">
                {/* Value Section */}
                <div className="dashboard-metric-value-section">
                  <div className="dashboard-metric-value">{stat.value}</div>
                  <div className="dashboard-metric-title">{stat.title}</div>
                  <div className="dashboard-metric-description">{stat.description}</div>
                </div>

                {/* Footer Section */}
                <div className="dashboard-metric-footer-section">
                  {/* Stats Row */}
                  <div className="dashboard-metric-stats-row">
                    <span className={`dashboard-metric-trend ${stat.trend}`}>
                      {stat.change}
                      {stat.trend === 'up' ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="17 11 12 6 7 11"></polyline>
                          <polyline points="17 18 12 13 7 18"></polyline>
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="7 13 12 18 17 13"></polyline>
                          <polyline points="7 6 12 11 17 6"></polyline>
                        </svg>
                      )}
                    </span>
                  </div>

                  {/* Progress Section */}
                  <div className="dashboard-metric-progress-section">
                    <div className="dashboard-metric-progress-bar">
                      <div 
                        className="dashboard-metric-progress-fill" 
                        style={{ 
                          width: `${progressPercentage}%`,
                          background: progressPercentage >= 90 ? 
                            'linear-gradient(90deg, #27ae60, #2ecc71)' : 
                            progressPercentage >= 70 ? 
                            'linear-gradient(90deg, #f39c12, #e67e22)' : 
                            'linear-gradient(90deg, #3498db, #2980b9)'
                        }}
                      ></div>
                    </div>
                    <div className="dashboard-metric-target-info">
                      <span className="dashboard-metric-target">Target: {stat.target}</span>
                      <span className="dashboard-metric-percentage">{progressPercentage.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Production Analytics & Sales Distribution - Positioned Above B2B Operations Management */}
      <div className="dashboard-charts-main-section">
        <div className="charts-section-header">
          <h3>📊 Production Analytics & Sales Distribution</h3>
          <div className="charts-period-controls">
            <div className="chart-period-selector">
              <button 
                className={`chart-period-btn ${selectedPeriod === 'weekly' ? 'active' : ''}`}
                onClick={() => setSelectedPeriod('weekly')}
              >
                Weekly
              </button>
              <button 
                className={`chart-period-btn ${selectedPeriod === 'monthly' ? 'active' : ''}`}
                onClick={() => setSelectedPeriod('monthly')}
              >
                Monthly
              </button>
              <button 
                className={`chart-period-btn ${selectedPeriod === 'yearly' ? 'active' : ''}`}
                onClick={() => setSelectedPeriod('yearly')}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        <div className="dashboard-charts-equal-grid">
          {/* Production Chart Card */}
          <div className="production-chart-main-card">
            <div className="production-chart-card-header">
              <h4>🏭 Production Trends</h4>
              <div className="production-chart-info">
                <span className="production-chart-period">{selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}</span>
                <div className="production-chart-type-toggle">
                  <button 
                    className={`production-chart-type-btn ${chartType === 'bar' ? 'active' : ''}`}
                    onClick={() => setChartType('bar')}
                    title="Bar Chart"
                  >
                    📊
                  </button>
                  <button 
                    className={`production-chart-type-btn ${chartType === 'line' ? 'active' : ''}`}
                    onClick={() => setChartType('line')}
                    title="Line Chart"
                  >
                    📈
                  </button>
                </div>
              </div>
            </div>
            <div className="production-chart-card-content">
              <div className="production-chart-container">
                <div className="production-chart-wrapper">
                  {chartType === 'bar' ? (
                    <div className={`production-bar-chart production-trends-bar-chart-${selectedPeriod}`}>
                      {chartData[selectedPeriod].labels.map((label, index) => {
                        // Define unique color schemes for each period
                        const getBarStyling = (period, index) => {
                          const colorSchemes = {
                            weekly: {
                              gradient: 'linear-gradient(135deg, #a8e6cf 0%, #7fcdcd 100%)',
                              shadow: 'rgba(127, 205, 205, 0.3)'
                            },
                            monthly: {
                              gradient: 'linear-gradient(135deg, #ffd3a5 0%, #fd9853 100%)',
                              shadow: 'rgba(253, 152, 83, 0.3)'
                            },
                            yearly: [
                              'linear-gradient(135deg, #e8f5e8 0%, #81c784 100%)', // Jan - Light Green
                              'linear-gradient(135deg, #fff3e0 0%, #ffb74d 100%)', // Feb - Light Orange
                              'linear-gradient(135deg, #f3e5f5 0%, #ba68c8 100%)', // Mar - Light Purple
                              'linear-gradient(135deg, #e3f2fd 0%, #64b5f6 100%)', // Apr - Light Blue
                              'linear-gradient(135deg, #fff8e1 0%, #ffcc02 100%)', // May - Light Yellow
                              'linear-gradient(135deg, #fce4ec 0%, #f06292 100%)', // Jun - Light Pink
                              'linear-gradient(135deg, #e0f2f1 0%, #4db6ac 100%)', // Jul - Light Teal
                              'linear-gradient(135deg, #f1f8e9 0%, #8bc34a 100%)', // Aug - Light Lime
                              'linear-gradient(135deg, #ede7f6 0%, #9575cd 100%)', // Sep - Light Deep Purple
                              'linear-gradient(135deg, #e8eaf6 0%, #7986cb 100%)', // Oct - Light Indigo
                              'linear-gradient(135deg, #fff9c4 0%, #f9a825 100%)', // Nov - Light Amber
                              'linear-gradient(135deg, #ffebee 0%, #ef5350 100%)'  // Dec - Light Red
                            ]
                          };
                          
                          if (period === 'yearly') {
                            return {
                              gradient: colorSchemes.yearly[index % colorSchemes.yearly.length],
                              shadow: 'rgba(129, 199, 132, 0.2)'
                            };
                          }
                          return colorSchemes[period];
                        };
                        
                        const barStyling = getBarStyling(selectedPeriod, index);
                        
                        // Define spacing based on period
                        const getItemSpacing = (period) => {
                          const spacing = {
                            weekly: { margin: '0 2px', minWidth: 'auto' },
                            monthly: { margin: '0 3px', minWidth: 'auto' },
                            yearly: { margin: '0 1px', minWidth: '28px' } // Smaller gaps for 12 months
                          };
                          return spacing[period];
                        };
                        
                        const itemSpacing = getItemSpacing(selectedPeriod);
                        
                        return (
                          <div 
                            key={index} 
                            className={`production-bar-item production-trends-bar-item-${selectedPeriod}`}
                            style={{
                              margin: itemSpacing.margin,
                              minWidth: itemSpacing.minWidth,
                              flex: selectedPeriod === 'yearly' ? '1' : 'auto'
                            }}
                          >
                            <div className="production-bar-container">
                              <div 
                                className={`production-bar production-trends-bar-${selectedPeriod}`}
                                style={{ 
                                  height: `${chartData[selectedPeriod].values[index]}%`,
                                  background: barStyling.gradient,
                                  boxShadow: `0 4px 8px ${barStyling.shadow}`,
                                  borderRadius: selectedPeriod === 'yearly' ? '6px 6px 2px 2px' : '4px 4px 2px 2px',
                                  transition: 'all 0.3s ease',
                                  minHeight: '20px'
                                }}
                              >
                                <span 
                                  className={`production-bar-value production-trends-bar-value-${selectedPeriod}`}
                                  style={{
                                    fontSize: selectedPeriod === 'yearly' ? '9px' : '11px',
                                    fontWeight: '600',
                                    color: '#2c3e50'
                                  }}
                                >
                                  {chartData[selectedPeriod].displayValues[index]}
                                </span>
                              </div>
                            </div>
                            <span 
                              className={`production-bar-label production-trends-bar-label-${selectedPeriod}`}
                              style={{
                                fontSize: selectedPeriod === 'yearly' ? '9px' : '11px',
                                fontWeight: '500',
                                color: '#34495e',
                                textAlign: 'center',
                                marginTop: '4px',
                                display: 'block'
                              }}
                            >
                              {label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className={`production-line-chart production-trends-line-chart-${selectedPeriod}`}>
                      <svg viewBox="0 0 400 200" className={`production-line-chart-svg production-trends-line-svg-${selectedPeriod}`}>
                        <defs>
                          {/* Weekly gradient */}
                          <linearGradient id="productionTrendsLineGradientWeekly" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#7fcdcd" />
                            <stop offset="100%" stopColor="#a8e6cf" />
                          </linearGradient>
                          {/* Monthly gradient */}
                          <linearGradient id="productionTrendsLineGradientMonthly" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#fd9853" />
                            <stop offset="100%" stopColor="#ffd3a5" />
                          </linearGradient>
                          {/* Yearly gradient */}
                          <linearGradient id="productionTrendsLineGradientYearly" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#81c784" />
                            <stop offset="50%" stopColor="#a5d6a7" />
                            <stop offset="100%" stopColor="#c8e6c9" />
                          </linearGradient>
                          {/* Area fill gradients */}
                          <linearGradient id="productionTrendsAreaGradientWeekly" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(127, 205, 205, 0.3)" />
                            <stop offset="100%" stopColor="rgba(168, 230, 207, 0.1)" />
                          </linearGradient>
                          <linearGradient id="productionTrendsAreaGradientMonthly" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(253, 152, 83, 0.3)" />
                            <stop offset="100%" stopColor="rgba(255, 211, 165, 0.1)" />
                          </linearGradient>
                          <linearGradient id="productionTrendsAreaGradientYearly" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(129, 199, 132, 0.3)" />
                            <stop offset="100%" stopColor="rgba(200, 230, 201, 0.1)" />
                          </linearGradient>
                        </defs>
                        
                        {/* Area fill under the line */}
                        <polygon
                          fill={`url(#productionTrendsAreaGradient${selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)})`}
                          points={`0,200 ${chartData[selectedPeriod].values.map((value, index) => 
                            `${(index * 400) / (chartData[selectedPeriod].values.length - 1)},${200 - (value * 2)}`
                          ).join(' ')} 400,200`}
                        />
                        
                        {/* Main line */}
                        <polyline
                          fill="none"
                          stroke={`url(#productionTrendsLineGradient${selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)})`}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={chartData[selectedPeriod].values.map((value, index) => 
                            `${(index * 400) / (chartData[selectedPeriod].values.length - 1)},${200 - (value * 2)}`
                          ).join(' ')}
                        />
                        
                        {/* Data points */}
                        {chartData[selectedPeriod].values.map((value, index) => {
                          const getPointColor = (period) => {
                            const colors = {
                              weekly: '#7fcdcd',
                              monthly: '#fd9853',
                              yearly: '#81c784'
                            };
                            return colors[period];
                          };
                          
                          return (
                            <circle
                              key={index}
                              cx={(index * 400) / (chartData[selectedPeriod].values.length - 1)}
                              cy={200 - (value * 2)}
                              r="5"
                              fill={getPointColor(selectedPeriod)}
                              stroke="#ffffff"
                              strokeWidth="2"
                              className={`production-line-point production-trends-line-point-${selectedPeriod}`}
                            />
                          );
                        })}
                      </svg>
                      <div className={`production-line-chart-labels production-trends-line-labels-${selectedPeriod}`}>
                        {chartData[selectedPeriod].labels.map((label, index) => (
                          <span 
                            key={index} 
                            className={`production-line-label production-trends-line-label-${selectedPeriod}`}
                            style={{
                              fontSize: selectedPeriod === 'yearly' ? '9px' : '11px',
                              fontWeight: '500',
                              color: '#34495e'
                            }}
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="production-chart-stats">
                <div className="production-chart-stat">
                  <span className="production-stat-label">Peak:</span>
                  <span className="production-stat-value">
                    {Math.max(...chartData[selectedPeriod].values)}%
                  </span>
                </div>
                <div className="production-chart-stat">
                  <span className="production-stat-label">Average:</span>
                  <span className="production-stat-value">
                    {Math.round(chartData[selectedPeriod].values.reduce((a, b) => a + b, 0) / chartData[selectedPeriod].values.length)}%
                  </span>
                </div>
                <div className="production-chart-stat">
                  <span className="production-stat-label">Trend:</span>
                  <span className="production-stat-value production-positive">↗️ +8.2%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sales Distribution Pie Chart Card */}
          <div className="sales-pie-chart-main-card">
            <div className="sales-pie-chart-card-header">
              <h4>🥧 Sales Distribution</h4>
              <div className="sales-pie-chart-info">
                <span className="sales-pie-chart-period">
                  {selectedPeriod === 'weekly' ? 'This Week' : 
                   selectedPeriod === 'monthly' ? 'This Month' : 'This Year'}
                </span>
                <span className="sales-pie-chart-type">🥧</span>
              </div>
            </div>
            <div className="sales-pie-chart-card-content">
              <div className="sales-pie-chart-container" style={{ height: '260px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginBottom: '4px', padding: '5px 0 0 0' }}>
                <div className="sales-pie-chart-wrapper" style={{ height: '250px', width: '250px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="sales-pie-chart" style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <svg viewBox="0 0 240 240" className="sales-pie-chart-svg" style={{ height: '250px', width: '250px', display: 'block' }}>
                      {(() => {
                        let cumulativePercentage = 0;
                        return pieChartData[selectedPeriod].map((segment, index) => {
                          const startAngle = cumulativePercentage * 3.6;
                          const endAngle = (cumulativePercentage + segment.value) * 3.6;
                          cumulativePercentage += segment.value;
                          
                          const startAngleRad = (startAngle - 90) * (Math.PI / 180);
                          const endAngleRad = (endAngle - 90) * (Math.PI / 180);
                          
                          const centerX = 120;
                          const centerY = 120;
                          const largeArcFlag = segment.value > 50 ? 1 : 0;
                          
                          const outerRadius = 100;
                          const innerRadius = 45;
                          
                          const x1 = centerX + outerRadius * Math.cos(startAngleRad);
                          const y1 = centerY + outerRadius * Math.sin(startAngleRad);
                          const x2 = centerX + outerRadius * Math.cos(endAngleRad);
                          const y2 = centerY + outerRadius * Math.sin(endAngleRad);
                          
                          const x3 = centerX + innerRadius * Math.cos(endAngleRad);
                          const y3 = centerY + innerRadius * Math.sin(endAngleRad);
                          const x4 = centerX + innerRadius * Math.cos(startAngleRad);
                          const y4 = centerY + innerRadius * Math.sin(startAngleRad);
                          
                          const pathData = [
                            `M ${x1} ${y1}`,
                            `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                            `L ${x3} ${y3}`,
                            `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
                            `Z`
                          ].join(' ');
                          
                          return (
                            <path
                              key={index}
                              d={pathData}
                              fill={segment.color}
                              stroke="#ffffff"
                              strokeWidth="2"
                              className="sales-pie-segment"
                            />
                          );
                        });
                      })()}
                    </svg>
                    <div className="sales-analytics-donut-center-container" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'transparent', zIndex: 10, borderRadius: '50%' }}>
                      <div className="sales-analytics-center-percentage" style={{ fontSize: '22px', fontWeight: 'bold', color: '#2c3e50', lineHeight: '1', marginBottom: '2px', whiteSpace: 'nowrap', textAlign: 'center', letterSpacing: '-0.5px' }}>100%</div>
                      <div className="sales-analytics-center-label" style={{ fontSize: '11px', color: '#7f8c8d', fontWeight: '500', lineHeight: '1', whiteSpace: 'nowrap', textAlign: 'center', letterSpacing: '0.2px' }}>Total Sales</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sales-pie-chart-details" style={{ padding: '8px 12px', fontSize: '11px', minHeight: '120px', height: 'auto', overflow: 'visible', marginTop: '8px' }}>
                <div className="sales-pie-legend" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '10px' }}>
                  {pieChartData[selectedPeriod].map((segment, index) => (
                    <div key={index} className="sales-legend-item" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', padding: '2px 0' }}>
                      <div 
                        className="sales-legend-color" 
                        style={{ backgroundColor: segment.color, width: '8px', height: '8px', borderRadius: '2px', flexShrink: 0 }}
                      ></div>
                      <div className="sales-legend-content" style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: '9px', fontWeight: '500', color: '#2c3e50', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{segment.label}</div>
                        <div style={{ fontSize: '8px', color: '#7f8c8d', display: 'flex', gap: '4px' }}>
                          <span>{segment.value}%</span>
                          <span>{segment.amount}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="sales-summary-stats" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', gap: '8px', marginTop: '4px', paddingBottom: '4px' }}>
                  <div className="sales-summary-item" style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ color: '#7f8c8d', fontSize: '8px', marginBottom: '1px' }}>Total Revenue</div>
                    <div style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '9px' }}>
                      {(() => {
                        const total = pieChartData[selectedPeriod].reduce((sum, segment) => {
                          const amount = parseInt(segment.amount.replace(/[₹,]/g, ''));
                          return sum + amount;
                        }, 0);
                        return `₹${total.toLocaleString()}`;
                      })()}
                    </div>
                  </div>
                  <div className="sales-summary-item" style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ color: '#7f8c8d', fontSize: '8px', marginBottom: '1px' }}>Best Performer</div>
                    <div style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '9px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {pieChartData[selectedPeriod].reduce((max, segment) => 
                        segment.value > max.value ? segment : max
                      ).label}
                    </div>
                  </div>
                  <div className="sales-summary-item" style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ color: '#7f8c8d', fontSize: '8px', marginBottom: '1px' }}>Growth</div>
                    <div style={{ color: '#27ae60', fontWeight: 'bold', fontSize: '9px' }}>
                      {selectedPeriod === 'weekly' ? '+8.5%' : 
                       selectedPeriod === 'monthly' ? '+12.5%' : '+15.8%'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive B2B Operations Management Section */}
      <div className="b2b-section enhanced" style={{ position: 'relative' }}>
        <div className="section-header">
          <h3>🏢 B2B Operations Management</h3>
          <div className="b2b-controls">
            <div className="b2b-toggle">
              <button 
                className={`b2b-toggle-btn ${b2bView === 'clients' ? 'active' : ''}`}
                onClick={() => setB2bView('clients')}
              >
                🏢 Clients ({b2bClients.length})
              </button>
              <button 
                className={`b2b-toggle-btn ${b2bView === 'vendors' ? 'active' : ''}`}
                onClick={() => setB2bView('vendors')}
              >
                🚛 Vendors ({b2bVendors.length})
              </button>
            </div>
          </div>
        </div>



        {/* B2B Analytics Overview - Ultra Compact 3-Card Row Design */}
        <div className="b2b-analytics-overview b2b-ops-ultra-compact-grid">
          <div className="analytics-card b2b-ops-ultra-contracts">
            <div className="b2b-ops-ultra-header">
              <div className="b2b-ops-ultra-icon">📊</div>
              <div className="b2b-ops-ultra-content">
                <h4 className="b2b-ops-ultra-title">Total Contracts</h4>
                <span className="b2b-ops-ultra-value">{b2bAnalytics.totalContracts}</span>
              </div>
            </div>
            <div className="b2b-ops-ultra-metrics">
              <div className="b2b-ops-ultra-metric">
                <span className="b2b-ops-ultra-label">Active:</span>
                <span className="b2b-ops-ultra-data">{b2bAnalytics.activeClients + b2bAnalytics.activeVendors}</span>
              </div>
              <div className="b2b-ops-ultra-metric">
                <span className="b2b-ops-ultra-label">Pending:</span>
                <span className="b2b-ops-ultra-data">{b2bAnalytics.pendingContracts}</span>
              </div>
            </div>
          </div>
          
          <div className="analytics-card b2b-ops-ultra-revenue">
            <div className="b2b-ops-ultra-header">
              <div className="b2b-ops-ultra-icon">💰</div>
              <div className="b2b-ops-ultra-content">
                <h4 className="b2b-ops-ultra-title">Monthly Value</h4>
                <span className="b2b-ops-ultra-value">{b2bAnalytics.totalMonthlyValue}</span>
              </div>
            </div>
            <div className="b2b-ops-ultra-metrics">
              <div className="b2b-ops-ultra-metric">
                <span className="b2b-ops-ultra-label">Growth:</span>
                <span className="b2b-ops-ultra-data positive">+{b2bAnalytics.businessGrowth}%</span>
              </div>
              <div className="b2b-ops-ultra-metric">
                <span className="b2b-ops-ultra-label">Avg Contract:</span>
                <span className="b2b-ops-ultra-data">{b2bAnalytics.avgContractValue}</span>
              </div>
            </div>
          </div>
          
          <div className="analytics-card b2b-ops-ultra-satisfaction">
            <div className="b2b-ops-ultra-header">
              <div className="b2b-ops-ultra-icon">⭐</div>
              <div className="b2b-ops-ultra-content">
                <h4 className="b2b-ops-ultra-title">Satisfaction</h4>
                <span className="b2b-ops-ultra-value">{b2bAnalytics.clientSatisfaction}/5</span>
              </div>
            </div>
            <div className="b2b-ops-ultra-metrics">
              <div className="b2b-ops-ultra-metric">
                <span className="b2b-ops-ultra-label">Clients:</span>
                <span className="b2b-ops-ultra-data">{b2bAnalytics.clientSatisfaction}</span>
              </div>
              <div className="b2b-ops-ultra-metric">
                <span className="b2b-ops-ultra-label">Vendors:</span>
                <span className="b2b-ops-ultra-data">{b2bAnalytics.vendorSatisfaction}</span>
              </div>
            </div>
          </div>
          
          <div className="analytics-card b2b-ops-ultra-renewal">
            <div className="b2b-ops-ultra-header">
              <div className="b2b-ops-ultra-icon">🔄</div>
              <div className="b2b-ops-ultra-content">
                <h4 className="b2b-ops-ultra-title">Renewal Rate</h4>
                <span className="b2b-ops-ultra-value">{b2bAnalytics.renewalRate}%</span>
              </div>
            </div>
            <div className="b2b-ops-ultra-metrics">
              <div className="b2b-ops-ultra-metric">
                <span className="b2b-ops-ultra-label">Collection:</span>
                <span className="b2b-ops-ultra-data">{b2bAnalytics.paymentCollection}%</span>
              </div>
              <div className="b2b-ops-ultra-metric">
                <span className="b2b-ops-ultra-label">Compliance:</span>
                <span className="b2b-ops-ultra-data">{b2bAnalytics.qualityCompliance}%</span>
              </div>
            </div>
          </div>
          
          <div className="analytics-card b2b-ops-ultra-efficiency">
            <div className="b2b-ops-ultra-header">
              <div className="b2b-ops-ultra-icon">🚛</div>
              <div className="b2b-ops-ultra-content">
                <h4 className="b2b-ops-ultra-title">Efficiency</h4>
                <span className="b2b-ops-ultra-value">{supplyChainData.deliveryEfficiency}%</span>
              </div>
            </div>
            <div className="b2b-ops-ultra-metrics">
              <div className="b2b-ops-ultra-metric">
                <span className="b2b-ops-ultra-label">On-Time:</span>
                <span className="b2b-ops-ultra-data">{supplyChainData.onTimeDelivery}%</span>
              </div>
              <div className="b2b-ops-ultra-metric">
                <span className="b2b-ops-ultra-label">Avg Time:</span>
                <span className="b2b-ops-ultra-data">{b2bAnalytics.avgDeliveryTime}</span>
              </div>
            </div>
          </div>
          
          <div className="analytics-card b2b-ops-ultra-risk">
            <div className="b2b-ops-ultra-header">
              <div className="b2b-ops-ultra-icon">⚠️</div>
              <div className="b2b-ops-ultra-content">
                <h4 className="b2b-ops-ultra-title">Risk Level</h4>
                <span className="b2b-ops-ultra-value risk-medium">{b2bAnalytics.riskAssessment}</span>
              </div>
            </div>
            <div className="b2b-ops-ultra-metrics">
              <div className="b2b-ops-ultra-metric">
                <span className="b2b-ops-ultra-label">High Risk:</span>
                <span className="b2b-ops-ultra-data">{b2bPerformanceMetrics.riskAssessment.filter(r => r.risk === 'high').length}</span>
              </div>
              <div className="b2b-ops-ultra-metric">
                <span className="b2b-ops-ultra-label">Medium Risk:</span>
                <span className="b2b-ops-ultra-data">{b2bPerformanceMetrics.riskAssessment.filter(r => r.risk === 'medium').length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* B2B Operations Collapsible Content - Everything from Action Button onwards */}
        <div className={`b2b-operations-collapsible-section ${b2bOperationsVisible ? 'section-visible' : 'section-hidden'}`}>
        {/* B2B Action Button */}
        <div className="b2b-content-actions">
          <button 
            className="content-action-btn primary"
            onClick={b2bView === 'clients' ? handleAddClient : handleAddVendor}
          >
            <span className="btn-icon">➕</span>
            {b2bView === 'clients' ? 'Add New Client' : 'Add New Vendor'}
          </button>
          
          {/* Show count of newly added items */}
          {((b2bView === 'clients' ? b2bClients : b2bVendors).filter(item => item.isNewlyAdded).length > 0) && (
            <div className="new-items-indicator">
              <span className="new-items-count">
                {(b2bView === 'clients' ? b2bClients : b2bVendors).filter(item => item.isNewlyAdded).length}
              </span>
              <span className="new-items-text">
                New {b2bView === 'clients' ? 'Client' : 'Vendor'}{(b2bView === 'clients' ? b2bClients : b2bVendors).filter(item => item.isNewlyAdded).length > 1 ? 's' : ''} Added
              </span>
            </div>
          )}
        </div>

        {/* B2B Cards Grid */}
        <div className="b2b-grid enhanced">
          {(b2bView === 'clients' ? b2bClients : b2bVendors).map((entity) => (
            <div 
              key={entity.id} 
              className={`b2b-card enhanced ${
                entity.isNewlyAdded 
                  ? (b2bView === 'clients' ? 'newly-added-client-card' : 'newly-added-vendor-card')
                  : ''
              }`}
            >
              <div className="b2b-header">
                <div className="b2b-icon-wrapper">
                  <div 
                    className="b2b-icon" 
                    style={{ 
                      backgroundColor: entity.bgColor,
                      color: entity.iconColor,
                      borderRadius: '12px',
                      padding: '12px',
                      fontSize: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '48px',
                      minHeight: '48px'
                    }}
                  >
                    {entity.icon}
                  </div>
                  {b2bView === 'vendors' && entity.rating && (
                    <div className="rating-badge">
                      ⭐ {entity.rating}
                    </div>
                  )}
                </div>
                <div className="b2b-status-group">
                  <span 
                    className="status-badge" 
                    style={{ 
                      color: getStatusColor(entity.status),
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: `${getStatusColor(entity.status)}20`,
                      padding: '4px 8px',
                      borderRadius: '12px',
                      border: `1px solid ${getStatusColor(entity.status)}`
                    }}
                  >
                    ● {entity.status.toUpperCase()}
                  </span>
                  <span 
                    className="payment-badge" 
                    style={{ 
                      color: getPaymentStatusColor(entity.paymentStatus),
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: `${getPaymentStatusColor(entity.paymentStatus)}20`,
                      padding: '4px 8px',
                      borderRadius: '12px',
                      border: `1px solid ${getPaymentStatusColor(entity.paymentStatus)}`
                    }}
                  >
                    💳 {entity.paymentStatus.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="b2b-content">
                <div className="b2b-main-info">
                  <h4 style={{ margin: '8px 0', fontSize: '18px', fontWeight: '600', color: '#2c3e50' }}>
                    {entity.name}
                  </h4>
                  <p className="b2b-type" style={{ margin: '4px 0', fontSize: '14px', color: '#7f8c8d', fontWeight: '500' }}>
                    {entity.type}
                  </p>
                  {b2bView === 'vendors' && entity.quality && (
                    <span className="quality-badge" style={{ 
                      backgroundColor: '#e8f5e8', 
                      color: '#27ae60', 
                      padding: '4px 8px', 
                      borderRadius: '8px', 
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {entity.quality}
                    </span>
                  )}
                </div>

                <div className="b2b-details" style={{ margin: '16px 0', flex: '1' }}>
                  <div className="detail-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div className="detail-item" style={{ flex: '1', marginRight: '8px' }}>
                      <div className="detail-label" style={{ fontSize: '12px', color: '#7f8c8d', marginBottom: '4px', display: 'block' }}>
                        📦 Volume:
                      </div>
                      <div className="detail-value" style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50', display: 'block' }}>
                        {entity.volume}
                      </div>
                    </div>
                    <div className="detail-item" style={{ flex: '1', marginLeft: '8px' }}>
                      <div className="detail-label" style={{ fontSize: '12px', color: '#7f8c8d', marginBottom: '4px', display: 'block' }}>
                        {b2bView === 'clients' ? '🚚 Next Delivery:' : '🕐 Next Collection:'}
                      </div>
                      <div className="detail-value" style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50', display: 'block' }}>
                        {b2bView === 'clients' ? entity.nextDelivery : entity.nextCollection}
                      </div>
                    </div>
                  </div>
                  
                  <div className="detail-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div className="detail-item" style={{ flex: '1', marginRight: '8px' }}>
                      <div className="detail-label" style={{ fontSize: '12px', color: '#7f8c8d', marginBottom: '4px', display: 'block' }}>
                        💰 Contract:
                      </div>
                      <div className="detail-value contract-value" style={{ fontSize: '14px', fontWeight: '600', color: '#27ae60', display: 'block' }}>
                        {entity.contractValue}
                      </div>
                    </div>
                    <div className="detail-item" style={{ flex: '1', marginLeft: '8px' }}>
                      <div className="detail-label" style={{ fontSize: '12px', color: '#7f8c8d', marginBottom: '4px', display: 'block' }}>
                        📅 Last Order:
                      </div>
                      <div className="detail-value" style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50', display: 'block' }}>
                        {b2bView === 'clients' ? entity.lastOrder : entity.lastDelivery}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="b2b-contact" style={{ margin: '16px 0', padding: '14px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                  <div className="contact-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="contact-icon" style={{ marginRight: '8px', fontSize: '14px' }}>📞</span>
                    <span className="contact-info" style={{ fontSize: '13px', color: '#2c3e50', fontWeight: '500' }}>{entity.contact}</span>
                  </div>
                  <div className="contact-item" style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="contact-icon" style={{ marginRight: '8px', fontSize: '14px' }}>📧</span>
                    <span className="contact-info" style={{ fontSize: '13px', color: '#2c3e50', wordBreak: 'break-all', fontWeight: '500' }}>
                      {entity.email}
                    </span>
                  </div>
                </div>

                <div className="b2b-actions" style={{ display: 'flex', gap: '8px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f3f4' }}>
                  <button 
                    className="action-btn-small primary"
                    onClick={() => handleViewOrders(entity)}
                    style={{
                      flex: '1',
                      padding: '8px 12px',
                      backgroundColor: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
                  >
                    {b2bView === 'clients' ? '📋 View Orders' : '📦 View Supplies'}
                  </button>
                  <button 
                    className="action-btn-small"
                    onClick={() => handleContact(entity)}
                    style={{
                      flex: '1',
                      padding: '8px 12px',
                      backgroundColor: '#2ecc71',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#27ae60'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#2ecc71'}
                  >
                    📞 Contact
                  </button>
                  <button 
                    className="action-btn-small"
                    onClick={() => handleInvoice(entity)}
                    style={{
                      flex: '1',
                      padding: '8px 12px',
                      backgroundColor: '#f39c12',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#e67e22'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#f39c12'}
                  >
                    {b2bView === 'clients' ? '💰 Invoice' : '💰 Payment'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Analytics View */}
        {b2bView === 'analytics' && (
          <div className="b2b-analytics-detailed">
            {/* Performance Metrics */}
            <div className="analytics-section">
              <h4>🎯 Performance Metrics</h4>
              <div className="performance-grid">
                <div className="performance-card">
                  <h5>🏆 Top Performers</h5>
                  <div className="performer-list">
                    {b2bPerformanceMetrics.topPerformers.map((performer, index) => (
                      <div key={index} className="performer-item">
                        <div className="performer-info">
                          <span className="performer-name">{performer.name}</span>
                          <span className={`performer-category ${performer.category}`}>
                            {performer.category}
                          </span>
                        </div>
                        <div className="performer-metrics">
                          <span className="performance-score">{performer.score}%</span>
                          <span className={`trend-indicator ${performer.trend}`}>
                            {performer.trend === 'up' ? '↗️' : performer.trend === 'down' ? '↘️' : '➡️'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="performance-card">
                  <h5>⚠️ Risk Assessment</h5>
                  <div className="risk-list">
                    {b2bPerformanceMetrics.riskAssessment.map((risk, index) => (
                      <div key={index} className={`risk-item ${risk.risk}`}>
                        <div className="risk-header">
                          <span className="risk-entity">{risk.entity}</span>
                          <span className={`risk-level ${risk.risk}`}>
                            {risk.risk.toUpperCase()}
                          </span>
                        </div>
                        <div className="risk-details">
                          <div className="risk-reasons">
                            <span className="risk-label">Issues:</span>
                            <span className="risk-value">{risk.reasons.join(', ')}</span>
                          </div>
                          <div className="risk-action">
                            <span className="action-label">Action:</span>
                            <span className="action-value">{risk.action}</span>
                          </div>
                          <div className="risk-timeline">
                            <span className="timeline-label">Timeline:</span>
                            <span className="timeline-value">{risk.timeline}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contract Management */}
            <div className="analytics-section">
              <h4>📋 Contract Management</h4>
              <div className="contract-grid">
                <div className="contract-card">
                  <h5>📊 Contract Overview</h5>
                  <div className="contract-stats">
                    <div className="stat-item">
                      <span className="stat-label">Total Value:</span>
                      <span className="stat-value">{contractManagement.totalValue}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Active Contracts:</span>
                      <span className="stat-value">{contractManagement.activeContracts}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Pending Negotiations:</span>
                      <span className="stat-value">{contractManagement.pendingNegotiations}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Avg Duration:</span>
                      <span className="stat-value">{contractManagement.averageContractDuration}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Growth:</span>
                      <span className="stat-value positive">{contractManagement.contractGrowth}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Compliance:</span>
                      <span className="stat-value">{contractManagement.complianceRate}%</span>
                    </div>
                  </div>
                </div>

                <div className="contract-card">
                  <h5>🔄 Upcoming Renewals</h5>
                  <div className="renewal-list">
                    {b2bPerformanceMetrics.upcomingRenewals.map((renewal, index) => (
                      <div key={index} className="renewal-item">
                        <div className="renewal-header">
                          <span className="renewal-entity">{renewal.entity}</span>
                          <span className={`renewal-category ${renewal.category}`}>
                            {renewal.category}
                          </span>
                        </div>
                        <div className="renewal-details">
                          <div className="renewal-date">
                            <span className="date-label">Renewal Date:</span>
                            <span className="date-value">{renewal.renewalDate}</span>
                          </div>
                          <div className="renewal-probability">
                            <span className="prob-label">Probability:</span>
                            <span className={`prob-value ${renewal.probability >= 90 ? 'high' : renewal.probability >= 70 ? 'medium' : 'low'}`}>
                              {renewal.probability}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Supply Chain Analytics */}
            <div className="analytics-section">
              <h4>🚛 Supply Chain Analytics</h4>
              <div className="supply-chain-grid">
                <div className="supply-chain-card">
                  <h5>📈 Efficiency Metrics</h5>
                  <div className="efficiency-metrics">
                    <div className="metric-item">
                      <span className="metric-label">Route Optimization:</span>
                      <span className="metric-value">{supplyChainData.routeOptimization}%</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Delivery Efficiency:</span>
                      <span className="metric-value">{supplyChainData.deliveryEfficiency}%</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">On-Time Delivery:</span>
                      <span className="metric-value">{supplyChainData.onTimeDelivery}%</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Cost per Liter:</span>
                      <span className="metric-value">{supplyChainData.costPerLiter}</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Fuel Efficiency:</span>
                      <span className="metric-value">{supplyChainData.fuelEfficiency} km/L</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Cold Chain Compliance:</span>
                      <span className="metric-value">{supplyChainData.coldChainCompliance}%</span>
                    </div>
                  </div>
                </div>

                <div className="supply-chain-card">
                  <h5>🌍 Regional Coverage</h5>
                  <div className="regional-coverage">
                    {supplyChainData.regionalCoverage.map((region, index) => (
                      <div key={index} className="region-item">
                        <div className="region-header">
                          <span className="region-name">{region.region}</span>
                          <span className="region-efficiency">{region.efficiency}%</span>
                        </div>
                        <div className="region-details">
                          <div className="region-stat">
                            <span className="stat-label">Suppliers:</span>
                            <span className="stat-value">{region.suppliers}</span>
                          </div>
                          <div className="region-stat">
                            <span className="stat-label">Daily Volume:</span>
                            <span className="stat-value">{region.volume}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Analytics */}
            <div className="analytics-section">
              <h4>🏆 Quality Analytics</h4>
              <div className="quality-grid">
                <div className="quality-card">
                  <h5>📊 Quality Metrics</h5>
                  <div className="quality-metrics">
                    {b2bPerformanceMetrics.qualityMetrics.map((metric, index) => (
                      <div key={index} className="quality-item">
                        <div className="quality-header">
                          <span className="supplier-name">{metric.supplier}</span>
                          <span className={`quality-grade ${metric.grade.toLowerCase().replace(/\s+/g, '-')}`}>
                            {metric.grade}
                          </span>
                        </div>
                        <div className="quality-details">
                          <div className="quality-stat">
                            <span className="stat-label">Fat Content:</span>
                            <span className="stat-value">{metric.fatContent}</span>
                          </div>
                          <div className="quality-stat">
                            <span className="stat-label">Protein:</span>
                            <span className="stat-value">{metric.proteinContent}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Quick Stats for selected view */}
        {b2bView !== 'analytics' && (
          <div className="b2b-quick-stats enhanced">
            <div className="quick-stat">
              <h5>
                {b2bView === 'clients' 
                  ? ' Top : Metro Supermarkets (2,500L/day)'
                  : 'Top : Mountain Fresh Dairy (7,200L/day)'
                }
              </h5>
            </div>
            <div className="quick-stat">
              <h5>
                {b2bView === 'clients' 
                  ? 'Average Order: 1,837L/day'
                  : 'Average Supply: 4,867L/day'
                }
              </h5>
            </div>
            <div className="quick-stat">
              <h5>
                {b2bView === 'clients' 
                  ? 'Revenue Growth: +12% this month'
                  : 'Supply Quality: 96.5% average'
                }
              </h5>
            </div>
            <div className="quick-stat">
              <h5>
                {b2bView === 'clients' 
                  ? 'Payment Collection: 94.2%'
                  : 'Avg Performance Score: 91.3%'
                }
              </h5>
            </div>
            <div className="quick-stat">
              <h5>
                {b2bView === 'clients' 
                  ? 'Contract Renewals: 89.2%'
                  : 'Sustainability Score: 84.2%'
                }
              </h5>
            </div>
          </div>
        )}
        </div>

        {/* B2B Operations Toggle Button - Positioned below cards section at complete right end */}
        <div className="b2b-risk-card-toggle-container">
          <button 
            className={`b2b-operations-hide-show-btn ${b2bOperationsVisible ? 'btn-active' : 'btn-inactive'}`}
            onClick={() => setB2bOperationsVisible(!b2bOperationsVisible)}
            title={b2bOperationsVisible ? 'Hide B2B Operations' : 'Show B2B Operations'}
          >
            <span className="btn-toggle-icon">
              {b2bOperationsVisible ? '👁️' : '👁️‍🗨️'}
            </span>
            <span className="btn-toggle-text">
              {b2bOperationsVisible ? 'Hide Operations' : 'Show Operations'}
            </span>
            <span className={`btn-toggle-arrow ${b2bOperationsVisible ? 'arrow-up' : 'arrow-down'}`}>
              {b2bOperationsVisible ? '▲' : '▼'}
            </span>
          </button>
        </div>
      </div>

      {/* Enhanced Analytics Section */}
      <div className="analytics-section">
        <div className="section-header">
          <h3>🔍 Advanced Analytics & Insights</h3>
          <div className="analytics-controls">
            <button className="analytics-btn">
              <span className="btn-icon">📈</span>
              Detailed Analytics
            </button>
            <button className="analytics-btn">
              <span className="btn-icon">🎯</span>
              Predictive Insights
            </button>
          </div>
        </div>

        <div className="analytics-grid">
          {/* Production Trends */}
          <div className="analytics-card">
            <div className="analytics-header">
              <h4>🏭 Production Trends</h4>
              <span className="trend-indicator positive">+{analyticsData.productionTrends.weekly.percentage}%</span>
            </div>
            <div className="analytics-content">
              <div className="trend-item">
                <span className="trend-label">Weekly Trend:</span>
                <span className={`trend-value ${analyticsData.productionTrends.weekly.trend}`}>
                  {analyticsData.productionTrends.weekly.trend} (+{analyticsData.productionTrends.weekly.percentage}%)
                </span>
              </div>
              <div className="trend-item">
                <span className="trend-label">Monthly Trend:</span>
                <span className={`trend-value ${analyticsData.productionTrends.monthly.trend}`}>
                  {analyticsData.productionTrends.monthly.trend} (+{analyticsData.productionTrends.monthly.percentage}%)
                </span>
              </div>
              <div className="trend-item">
                <span className="trend-label">Quarterly Trend:</span>
                <span className={`trend-value ${analyticsData.productionTrends.quarterly.trend}`}>
                  {analyticsData.productionTrends.quarterly.trend} (+{analyticsData.productionTrends.quarterly.percentage}%)
                </span>
              </div>
            </div>
          </div>

          {/* Quality Metrics */}
          <div className="analytics-card">
            <div className="analytics-header">
              <h4>🏆 Quality Excellence</h4>
              <span className="quality-score">{analyticsData.qualityMetrics.averageScore}%</span>
            </div>
            <div className="analytics-content">
              <div className="quality-item">
                <span className="quality-label">Average Score:</span>
                <span className="quality-value">{analyticsData.qualityMetrics.averageScore}%</span>
              </div>
              <div className="quality-item">
                <span className="quality-label">Improvement:</span>
                <span className="quality-value positive">+{analyticsData.qualityMetrics.improvement}%</span>
              </div>
              <div className="quality-item">
                <span className="quality-label">Compliance:</span>
                <span className="quality-value">{analyticsData.qualityMetrics.compliance}%</span>
              </div>
              <div className="certifications">
                <span className="cert-label">Certifications:</span>
                <div className="cert-list">
                  {analyticsData.qualityMetrics.certifications.map((cert, index) => (
                    <span key={index} className="cert-badge">{cert}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Supply Chain Efficiency */}
          <div className="analytics-card">
            <div className="analytics-header">
              <h4>🚛 Supply Chain</h4>
              <span className="efficiency-score">{analyticsData.supplyChain.efficiency}%</span>
            </div>
            <div className="analytics-content">
              <div className="supply-metrics">
                <div className="metric-row">
                  <span className="metric-label">On-Time Delivery:</span>
                  <span className="metric-value">{analyticsData.supplyChain.onTimeDelivery}%</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Supplier Satisfaction:</span>
                  <span className="metric-value">{analyticsData.supplyChain.supplierSatisfaction}%</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Cost Optimization:</span>
                  <span className="metric-value positive">+{analyticsData.supplyChain.costOptimization}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Analytics & Insights Section */}
      <div className="advanced-analytics-section">
        

        <div className="analytics-navigation-tabs">
          <button 
            className={`analytics-tab-btn ${analyticsView === 'forecast' ? 'analytics-tab-active' : ''}`}
            onClick={() => setAnalyticsView('forecast')}
          >
            <span className="analytics-tab-icon">📊</span>
            <span className="analytics-tab-text">Forecast</span>
          </button>
          <button 
            className={`analytics-tab-btn ${analyticsView === 'trends' ? 'analytics-tab-active' : ''}`}
            onClick={() => setAnalyticsView('trends')}
          >
            <span className="analytics-tab-icon">📈</span>
            <span className="analytics-tab-text">Trends</span>
          </button>
          <button 
            className={`analytics-tab-btn ${analyticsView === 'insights' ? 'analytics-tab-active' : ''}`}
            onClick={() => setAnalyticsView('insights')}
          >
            <span className="analytics-tab-icon">💡</span>
            <span className="analytics-tab-text">Insights</span>
          </button>
        </div>

        <div className="analytics-content-area">
          {analyticsView === 'forecast' && (
            <div className="forecast-content-section">
              <div className="forecast-cards-grid">
                <div className="forecast-main-card">
                  <div className="forecast-card-header">
                    <div className="forecast-header-left">
                      <h4 className="forecast-card-title">📊 Production Forecast</h4>
                      <p className="forecast-card-subtitle">Next 7 days prediction analysis</p>
                    </div>
                    <div className="forecast-header-right">
                      <div className="forecast-value-display">
                        <span className="forecast-main-value">{predictiveData.nextWeekProduction}</span>
                        <span className="forecast-value-label">Expected Production</span>
                      </div>
                      <div className="forecast-accuracy-display">
                        <span className="forecast-accuracy-value">{predictiveData.forecastAccuracy}%</span>
                        <span className="forecast-accuracy-label">Accuracy</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="forecast-chart-container">
                    <div className="forecast-chart-wrapper">
                      <div className="forecast-bars-container">
                        {predictiveData.demandForecast.nextWeek.map((day, index) => (
                          <div key={index} className="forecast-single-bar">
                            <div className="forecast-bar-wrapper">
                              <div 
                                className="forecast-bar-element" 
                                style={{ 
                                  height: `${(day.demand / 3000) * 100}%`,
                                  backgroundColor: day.confidence > 90 ? '#10b981' : day.confidence > 85 ? '#f59e0b' : '#ef4444'
                                }}
                                title={`${day.day}: ${day.demand}L (${day.confidence}% confidence)`}
                              ></div>
                              <span className="forecast-bar-value">{(day.demand / 1000).toFixed(1)}k</span>
                            </div>
                            <span className="forecast-bar-day">{day.day}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="forecast-card-actions">
                    <button className="forecast-btn forecast-btn-primary" onClick={() => alert('Detailed forecast opened')}>
                      View Details
                    </button>
                    <button className="forecast-btn forecast-btn-secondary" onClick={() => alert('Forecast exported')}>
                      Export Data
                    </button>
                  </div>
                </div>

                <div className="forecast-seasonal-card">
                  <div className="seasonal-card-header">
                    <h4 className="seasonal-card-title">🌱 Seasonal Analysis</h4>
                  </div>
                  
                  <div className="seasonal-metrics-container">
                    <div className="seasonal-metric-row">
                      <span className="seasonal-metric-label">Current Season</span>
                      <span className="seasonal-metric-value seasonal-highlight">{predictiveData.seasonalTrends.currentSeason}</span>
                    </div>
                    <div className="seasonal-metric-row">
                      <span className="seasonal-metric-label">Expected Change</span>
                      <span className="seasonal-metric-value seasonal-positive">{predictiveData.seasonalTrends.expectedChange}</span>
                    </div>
                    <div className="seasonal-metric-row">
                      <span className="seasonal-metric-label">Peak Period</span>
                      <span className="seasonal-metric-value">{predictiveData.seasonalTrends.peakMonth}</span>
                    </div>
                    <div className="seasonal-metric-row">
                      <span className="seasonal-metric-label">Low Period</span>
                      <span className="seasonal-metric-value">{predictiveData.seasonalTrends.lowMonth}</span>
                    </div>
                  </div>
                  
                  <div className="seasonal-card-actions">
                    <button className="seasonal-btn seasonal-btn-outline" onClick={() => alert('Seasonal report generated')}>
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {analyticsView === 'trends' && (
            <div className="trends-content-section">
              <div className="trends-cards-grid">
                <div className="trends-market-card">
                  <div className="trends-card-header">
                    <h4 className="trends-card-title">📈 Market Trends Analysis</h4>
                  </div>
                  
                  <div className="trends-list-container">
                    {marketInsights.marketTrends.map((trend, index) => (
                      <div key={index} className={`trends-item trends-${trend.impact}`}>
                        <div className="trends-item-content">
                          <div className="trends-item-header">
                            <span className="trends-item-text">{trend.trend}</span>
                            <span className={`trends-item-indicator trends-${trend.impact}`}>
                              {trend.impact === 'positive' ? '↗️' : '↘️'}
                            </span>
                          </div>
                          <div className="trends-strength-container">
                            <div className="trends-strength-bar">
                              <div 
                                className={`trends-strength-fill trends-fill-${trend.impact}`}
                                style={{ width: `${trend.strength}%` }}
                              ></div>
                            </div>
                            <span className="trends-strength-text">{trend.strength}% impact</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="trends-card-actions">
                    <button className="trends-btn trends-btn-primary" onClick={() => alert('Detailed trend analysis opened')}>
                      Analyze Trends
                    </button>
                  </div>
                </div>

                <div className="trends-performance-card">
                  <div className="performance-card-header">
                    <h4 className="performance-card-title">🎯 Performance Predictions</h4>
                  </div>
                  
                  <div className="performance-metrics-grid">
                    <div className="performance-metric-item">
                      <div className="performance-metric-icon">💰</div>
                      <div className="performance-metric-details">
                        <span className="performance-metric-label">Next Month Revenue</span>
                        <div className="performance-metric-values">
                          <span className="performance-metric-value">₹4,85,000</span>
                          <span className="performance-metric-change performance-positive">+12%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="performance-metric-item">
                      <div className="performance-metric-icon">⚡</div>
                      <div className="performance-metric-details">
                        <span className="performance-metric-label">Production Efficiency</span>
                        <div className="performance-metric-values">
                          <span className="performance-metric-value">91%</span>
                          <span className="performance-metric-change performance-positive">+4%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="performance-metric-item">
                      <div className="performance-metric-icon">😊</div>
                      <div className="performance-metric-details">
                        <span className="performance-metric-label">Customer Satisfaction</span>
                        <div className="performance-metric-values">
                          <span className="performance-metric-value">96%</span>
                          <span className="performance-metric-change performance-positive">+2%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="performance-card-actions">
                    <button className="performance-btn performance-btn-outline" onClick={() => alert('Performance report generated')}>
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {analyticsView === 'insights' && (
            <div className="insights-content-section">
              <div className="insights-header-section">
                <h4 className="insights-section-title"> Recommendations</h4>
                <p className="insights-section-subtitle">Smart suggestions to optimize your dairy operations</p>
              </div>
              
              <div className="insights-recommendations-grid">
                {predictiveData.recommendations.map((rec, index) => (
                  <div key={index} className={`insights-recommendation-card insights-priority-${rec.priority}`}>
                    <div className="insights-rec-header">
                      <div className="insights-rec-type">
                        <span className="insights-rec-icon">
                          {rec.type === 'supply' ? '📦' : rec.type === 'quality' ? '🔍' : '🚛'}
                        </span>
                        <span className="insights-rec-category">{rec.type.charAt(0).toUpperCase() + rec.type.slice(1)}</span>
                      </div>
                      <span className={`insights-priority-badge insights-badge-${rec.priority}`}>
                        {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                      </span>
                    </div>
                    
                    <div className="insights-rec-body">
                      <p className="insights-rec-message">{rec.message}</p>
                      <div className="insights-rec-metrics">
                        <div className="insights-rec-metric">
                          <span className="insights-metric-icon">💰</span>
                          <span className="insights-metric-text">{rec.impact}</span>
                        </div>
                        <div className="insights-rec-metric">
                          <span className="insights-metric-icon">⏰</span>
                          <span className="insights-metric-text">{rec.actionRequired}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="insights-rec-actions">
                      <button 
                        className="insights-btn insights-btn-primary insights-btn-sm"
                        onClick={() => alert(`Implementing: ${rec.message}`)}
                      >
                        Implement
                      </button>
                      <button 
                        className="insights-btn insights-btn-outline insights-btn-sm"
                        onClick={() => alert(`Details: ${rec.message}`)}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="insights-global-actions">
                <button 
                  className="insights-btn insights-btn-primary insights-btn-lg"
                  onClick={() => alert('All high priority recommendations will be implemented')}
                >
                  Implement High Priority Actions
                </button>
                <button 
                  className="insights-btn insights-btn-outline insights-btn-lg"
                  onClick={() => alert('Comprehensive insights report generated')}
                >
                  Generate Full Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Market Insights Section */}
      <div className="market-section">
        <div className="section-header">
          <h3>📈 Market Insights & Intelligence</h3>
          <div className="market-status">
            <div className="price-info">
              <span className="price-index">Price Index: {marketInsights.priceIndex}</span>
              <span className={`price-change ${marketInsights.priceChange.startsWith('+') ? 'positive' : 'negative'}`}>
                {marketInsights.priceChange}
              </span>
            </div>
            <button 
              className="refresh-btn"
              onClick={() => {
                setLastRefresh(new Date());
                alert('Market data refreshed successfully!');
              }}
            >
              🔄 Refresh Data
            </button>
          </div>
        </div>

        <div className="market-grid enhanced">
          <div className="market-card position-card">
            <div className="card-header">
              <h4>🎯 Market Position</h4>
              <span className="ranking-badge">Rank #{marketInsights.competitorAnalysis.ranking}</span>
            </div>
            <div className="market-metrics">
              <div className="market-metric featured">
                <span className="metric-label">Market Share</span>
                <div className="metric-display">
                  <span className="metric-value">{marketInsights.competitorAnalysis.marketShare}%</span>
                  <div className="metric-bar">
                    <div 
                      className="metric-fill" 
                      style={{ width: `${marketInsights.competitorAnalysis.marketShare}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="market-metric">
                <span className="metric-label">Industry Ranking</span>
                <span className="metric-value">#{marketInsights.competitorAnalysis.ranking}</span>
              </div>
              <div className="market-metric">
                <span className="metric-label">Growth Rate</span>
                <span className="metric-value positive">+{marketInsights.competitorAnalysis.growth}%</span>
              </div>
              <div className="market-metric">
                <span className="metric-label">Market Trend</span>
                <span className="metric-value positive">📈 Upward</span>
              </div>
              <div className="market-metric">
                <span className="metric-label">Competitive Edge</span>
                <span className="metric-value">Strong Position</span>
              </div>
            </div>
          </div>

          <div className="opportunities-card enhanced">
            <div className="card-header">
              <h4>🚀 Growth </h4>
              <span className="opportunities-count">{marketInsights.opportunities.length} Active</span>
            </div>
            <div className="opportunities-list">
              {marketInsights.opportunities.map((opp, index) => (
                <div key={index} className="opportunity-item clean">
                  <div className="opp-header">
                    <span className="opp-sector">{opp.sector}</span>
                    <span className={`opp-potential ${opp.potential.toLowerCase()}`}>
                      {opp.potential} Potential
                    </span>
                  </div>
                <div className="opp-details">
                      <div className="opp-metric">
                      <span className="growth-label">Growth:</span>
                      <span className="growth-value">{opp.growth}</span>
                    </div>
                    <div className="opp-metric">
                      <span className="investment-label">Investment:</span>
                      <span className="investment-value">{opp.investment}</span>
                    </div>
                    <div className="opp-metric">
                      <span className="timeline-label">Timeline:</span>
                      <span className="timeline-value">{opp.timeline}</span>
                  </div>
                  </div>
                  </div>
              ))}
            </div>
          </div>

          <div className="market-intelligence-card">
            <div className="card-header">
              <h4>🧠 Market Intelligence</h4>
              <span className="intelligence-status">Live Data</span>
            </div>
            <div className="intelligence-content">
              <div className="intelligence-metrics">
                <div className="intel-metric">
                  <span className="intel-label">Demand Trend</span>
                  <span className="intel-value positive">↗️ Rising</span>
                </div>
                <div className="intel-metric">
                  <span className="intel-label">Price Volatility</span>
                  <span className="intel-value neutral">➡️ Stable</span>
                </div>
                <div className="intel-metric">
                  <span className="intel-label">Competition Level</span>
                  <span className="intel-value negative">⚠️ High</span>
                </div>
                <div className="intel-metric">
                  <span className="intel-label">Market Sentiment</span>
                  <span className="intel-value positive">😊Optimistic</span>
                </div>
                <div className="intel-metric">
                  <span className="intel-label">Supply Chain</span>
                  <span className="intel-value neutral">🚛 Normal</span>
                </div>
              </div>
              <div className="market-alerts">
                <div className="alert-item">
                  <span className="alert-icon">📢</span>
                  <span className="alert-text">New competitor entered premium segment</span>
                </div>
                <div className="alert-item">
                  <span className="alert-icon">💡</span>
                  <span className="alert-text">Organic milk demand up 15% this month</span>
                </div>
                <div className="alert-item">
                  <span className="alert-icon">📊</span>
                  <span className="alert-text">Regional expansion opportunities identified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Impact Section */}
      <div className="weather-section">
        <div className="section-header">
          <h3>🌤️ Weather Impact Analysis</h3>
          <div className="weather-status">
            <div className="current-conditions">
              <span className="current-weather">{weatherImpact.current.condition}</span>
              <span className="weather-temp">{weatherImpact.current.temperature}</span>
              <span className="weather-humidity">💧 {weatherImpact.current.humidity}</span>
            </div>
            <button 
              className="weather-refresh-btn"
              onClick={() => alert('Weather data updated from meteorological service')}
            >
              🔄 Update Weather
            </button>
          </div>
        </div>

        <div className="weather-content enhanced">
          <div className="weather-forecast-card">
            <div className="card-header">
              <h4>📅 7-Day Production Impact Forecast</h4>
              <span className="forecast-accuracy">95% Accuracy</span>
            </div>
            <div className="forecast-grid enhanced">
              {weatherImpact.weeklyOutlook.map((day, index) => (
                <div key={index} className={`forecast-day ${day.impact}`}>
                  <div className="day-header">
                    <span className="day-name">{day.day}</span>
                    <span className="day-icon">{day.condition}</span>
                  </div>
                  <div className="day-details">
                    <span className="day-temp">{day.temp}</span>
                    <span className={`production-impact ${day.impact}`}>
                      {day.productionImpact}
                    </span>
                  </div>
                  <div className="day-indicator">
                    <span className={`day-impact ${day.impact}`}>
                      {day.impact === 'positive' ? '📈' : day.impact === 'negative' ? '📉' : '➡️'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="forecast-actions">
              <button 
                className="action-btn primary"
                onClick={() => alert('Detailed weather impact report generated')}
              >
                Generate Report
              </button>
              <button 
                className="action-btn outline"
                onClick={() => alert('Weather alerts configured')}
              >
                Set Alerts
              </button>
            </div>
          </div>

          

          <div className="weather-analytics-card">
            <h4>📊 Weather Analytics Dashboard</h4>
            <div className="analytics-summary">
              <div className="summary-metric">
                <span className="metric-label">Weekly Impact Score:</span>
                <span className="metric-value positive">+3.2%</span>
              </div>
              <div className="summary-metric">
                <span className="metric-label">Risk Level:</span>
                <span className="metric-value neutral">Medium</span>
              </div>
              <div className="summary-metric">
                <span className="metric-label">Preparation Status:</span>
                <span className="metric-value positive">Ready</span>
              </div>
            </div>
            <div className="analytics-actions">
              <button 
                className="action-btn primary"
                onClick={() => alert('Weather analytics dashboard opened')}
              >
                View Full Analytics
              </button>
              <button 
                className="action-btn secondary"
                onClick={() => alert('Weather contingency plan activated')}
              >
                Contingency Plan
              </button>
            </div>
          </div>
        </div>
      </div>



      {/* Enhanced Quick Actions */}
      <div className="enhanced-quick-actions">
        <div className="section-header">
          <h3>⚡ Quick Actions</h3>
          <div className="actions-filter">
            <button className="filter-btn active">All</button>
            <button className="filter-btn">Daily</button>
            <button className="filter-btn">Weekly</button>
            <button className="filter-btn">Monthly</button>
          </div>
        </div>
        
        <div className="actions-grid">
          <div className="action-category">
            <h4>📊 Data & Reports</h4>
            <div className="action-buttons">
              <button className="action-btn primary" onClick={() => navigate('/new-collection')}>
                <span className="btn-icon">➕</span>
                Record Collection
              </button>
              <button className="action-btn" onClick={() => navigate('/reports')}>
                <span className="btn-icon">📈</span>
                Generate Report
              </button>
            </div>
          </div>

          <div className="action-category">
            <h4>🔍 Quality & Testing</h4>
            <div className="action-buttons">
              <button className="action-btn" onClick={() => navigate('/quality-check')}>
                <span className="btn-icon">🔍</span>
                Quality Test
              </button>
              <button className="action-btn">
                <span className="btn-icon">🧪</span>
                Lab Analysis
              </button>
              <button className="action-btn">
                <span className="btn-icon">📋</span>
                Compliance Check
              </button>
            </div>
          </div>

          <div className="action-category">
            <h4>👥 People & Operations</h4>
            <div className="action-buttons">
              <button className="action-btn" onClick={() => navigate('/farmers')}>
                <span className="btn-icon">👨‍🌾</span>
                Manage Farmers
              </button>
              <button className="action-btn">
                <span className="btn-icon">🚛</span>
                Track Deliveries
              </button>
              <button className="action-btn">
                <span className="btn-icon">📞</span>
                Contact Support
              </button>
            </div>
          </div>


        </div>
      </div>


    </div>
  );
}

export default Dashboard;