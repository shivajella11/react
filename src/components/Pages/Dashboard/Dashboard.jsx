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

  // Pie chart data for market distribution
  const pieChartData = [
    { label: 'Retail Sales', value: 35, color: '#3498db' },
    { label: 'B2B Wholesale', value: 28, color: '#2ecc71' },
    { label: 'Direct Supply', value: 20, color: '#f39c12' },
    { label: 'Online Orders', value: 17, color: '#e74c3c' }
  ];

  // B2B Operations state
  const [b2bView, setB2bView] = useState('clients');
  
  // B2B Clients data
  const b2bClients = [
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
  ];

  // Enhanced B2B Vendors/Suppliers data with comprehensive details
  const b2bVendors = [
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
  ];

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
    // Add navigation to orders page or open modal
    const notification = {
      id: Date.now(),
      type: 'info',
      message: `Opening orders for ${entity.name}...`,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    
    // Auto remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 3000);
  };

  const handleContact = (entity) => {
    console.log(`Contacting ${entity.name} at ${entity.contact}`);
    // Open contact modal or initiate call
    const notification = {
      id: Date.now(),
      type: 'info',
      message: `Initiating contact with ${entity.name}...`,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    
    // Auto remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 3000);
  };

  const handleInvoice = (entity) => {
    console.log(`Generating invoice for ${entity.name}`);
    // Generate or view invoice
    const notification = {
      id: Date.now(),
      type: 'success',
      message: `Invoice generated for ${entity.name}`,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    
    // Auto remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 3000);
  };

  const handleAddClient = () => {
    console.log('Adding new client');
    // Open add client modal
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
    console.log('Adding new vendor');
    // Open add vendor modal
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
            <div className="last-refresh">
              <span className="refresh-text">Last updated: {lastRefresh.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

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

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {/* Advanced Collection Chart */}
        <div className="chart-section">
          <div className="chart-card">
            <div className="card-header">
              <h3>Milk Collection Analytics</h3>
              <div className="chart-controls">
                {/* Chart Type Toggle */}
                <div className="chart-toggle">
                  <button 
                    className={`toggle-btn ${chartType === 'bar' ? 'active' : ''}`}
                    onClick={() => setChartType('bar')}
                  >
                    📊 Bar
                  </button>
                  <button 
                    className={`toggle-btn ${chartType === 'line' ? 'active' : ''}`}
                    onClick={() => setChartType('line')}
                  >
                    📈 Line
                  </button>
                </div>
                {/* Period Selector */}
                <select 
                  className="period-selector"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
            <div className="chart-container">
              {chartType === 'bar' ? (
                // Bar Chart
                <div className="chart-view">
                  <div className="chart-bars">
                    {chartData[selectedPeriod].values.map((height, index) => (
                      <div key={index} className="bar" style={{ height: `${height}%` }}>
                        <div className="bar-value">{chartData[selectedPeriod].displayValues[index]}</div>
                      </div>
                    ))}
                  </div>
                  <div className="chart-labels">
                    {chartData[selectedPeriod].labels.map((label, index) => (
                      <span key={index}>{label}</span>
                    ))}
                  </div>
                </div>
              ) : (
                // Line Chart
                <div className="chart-view">
                  <div className="line-chart-wrapper">
                    <svg width="100%" height="280" viewBox="0 0 500 280">
                      {/* Grid lines */}
                      <defs>
                        <pattern id="grid" width="50" height="35" patternUnits="userSpaceOnUse">
                          <path d="M 50 0 L 0 0 0 35" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="220" fill="url(#grid)" />
                      
                      {/* Y-axis labels */}
                      <g>
                        <text x="15" y="30" fontSize="10" fill="#7f8c8d" textAnchor="middle">Max</text>
                        <text x="15" y="120" fontSize="10" fill="#7f8c8d" textAnchor="middle">Avg</text>
                        <text x="15" y="210" fontSize="10" fill="#7f8c8d" textAnchor="middle">Min</text>
                      </g>
                      
                      {/* Line path */}
                      <path
                        d={chartData[selectedPeriod].values.map((value, index) => {
                          const x = (index * 420) / (chartData[selectedPeriod].values.length - 1) + 40;
                          const y = 200 - ((value / 100) * 160);
                          return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="#3498db"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      
                      {/* Area under line */}
                      <path
                        d={`M 40 200 ${chartData[selectedPeriod].values.map((value, index) => {
                          const x = (index * 420) / (chartData[selectedPeriod].values.length - 1) + 40;
                          const y = 200 - ((value / 100) * 160);
                          return `L ${x} ${y}`;
                        }).join(' ')} L ${(chartData[selectedPeriod].values.length - 1) * 420 / (chartData[selectedPeriod].values.length - 1) + 40} 200 Z`}
                        fill="rgba(52, 152, 219, 0.1)"
                      />
                      
                      {/* Data points */}
                      {chartData[selectedPeriod].values.map((value, index) => {
                        const x = (index * 420) / (chartData[selectedPeriod].values.length - 1) + 40;
                        const y = 200 - ((value / 100) * 160);
                        return (
                          <g key={index}>
                            <circle cx={x} cy={y} r="5" fill="#3498db" stroke="#ffffff" strokeWidth="2"/>
                            <text x={x} y={y - 15} textAnchor="middle" fontSize="11" fill="#2c3e50" fontWeight="600">
                              {chartData[selectedPeriod].displayValues[index]}
                            </text>
                          </g>
                        );
                      })}
                      
                      {/* X-axis labels */}
                      {chartData[selectedPeriod].labels.map((label, index) => {
                        const x = (index * 420) / (chartData[selectedPeriod].labels.length - 1) + 40;
                        return (
                          <text key={index} x={x} y={240} textAnchor="middle" fontSize="12" fill="#7f8c8d">
                            {label}
                          </text>
                        );
                      })}
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pie Chart for Market Distribution */}
        <div className="pie-chart-section">
          <div className="chart-card">
            <div className="card-header">
              <h3>Market Distribution</h3>
              <span className="chart-subtitle">Sales by Channel</span>
            </div>
            <div className="pie-chart-container">
              <div className="pie-chart">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {pieChartData.map((segment, index) => {
                    const total = pieChartData.reduce((sum, item) => sum + item.value, 0);
                    const percentage = (segment.value / total) * 100;
                    const angle = (segment.value / total) * 360;
                    const startAngle = pieChartData.slice(0, index).reduce((sum, item) => sum + (item.value / total) * 360, 0);
                    
                    const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
                    const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
                    const x2 = 100 + 80 * Math.cos((startAngle + angle - 90) * Math.PI / 180);
                    const y2 = 100 + 80 * Math.sin((startAngle + angle - 90) * Math.PI / 180);
                    
                    const largeArcFlag = angle > 180 ? 1 : 0;
                    
                    const pathData = [
                      `M 100 100`,
                      `L ${x1} ${y1}`,
                      `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      'Z'
                    ].join(' ');
                    
                    return (
                      <path
                        key={index}
                        d={pathData}
                        fill={segment.color}
                        stroke="white"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
              </div>
              <div className="pie-chart-legend">
                {pieChartData.map((segment, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: segment.color }}></div>
                    <span className="legend-label">{segment.label}</span>
                    <span className="legend-value">{segment.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive B2B Operations Management Section */}
      <div className="b2b-section enhanced">
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

        {/* B2B Analytics Overview */}
        <div className="b2b-analytics-overview">
          <div className="analytics-card contracts-card">
            <div className="analytics-header">
              <h4>📊 Total Contracts</h4>
              <span className="analytics-value">{b2bAnalytics.totalContracts}</span>
            </div>
            <div className="analytics-details">
              <div className="detail-item">
                <span className="detail-label">Active:</span>
                <span className="detail-value">{b2bAnalytics.activeClients + b2bAnalytics.activeVendors}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Pending:</span>
                <span className="detail-value">{b2bAnalytics.pendingContracts}</span>
              </div>
            </div>
          </div>
          
          <div className="analytics-card revenue-card">
            <div className="analytics-header">
              <h4>💰 Monthly Value</h4>
              <span className="analytics-value">{b2bAnalytics.totalMonthlyValue}</span>
            </div>
            <div className="analytics-details">
              <div className="detail-item">
                <span className="detail-label">Growth:</span>
                <span className="detail-value positive">+{b2bAnalytics.businessGrowth}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Avg Contract:</span>
                <span className="detail-value">{b2bAnalytics.avgContractValue}</span>
              </div>
            </div>
          </div>
          
          <div className="analytics-card satisfaction-card">
            <div className="analytics-header">
              <h4>⭐ Satisfaction</h4>
              <span className="analytics-value">{b2bAnalytics.clientSatisfaction}/5</span>
            </div>
            <div className="analytics-details">
              <div className="detail-item">
                <span className="detail-label">Clients:</span>
                <span className="detail-value">{b2bAnalytics.clientSatisfaction}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Vendors:</span>
                <span className="detail-value">{b2bAnalytics.vendorSatisfaction}</span>
              </div>
            </div>
          </div>
          
          <div className="analytics-card renewal-card">
            <div className="analytics-header">
              <h4>🔄 Renewal Rate</h4>
              <span className="analytics-value">{b2bAnalytics.renewalRate}%</span>
            </div>
            <div className="analytics-details">
              <div className="detail-item">
                <span className="detail-label">Collection:</span>
                <span className="detail-value">{b2bAnalytics.paymentCollection}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Compliance:</span>
                <span className="detail-value">{b2bAnalytics.qualityCompliance}%</span>
              </div>
            </div>
          </div>
          
          <div className="analytics-card efficiency-card">
            <div className="analytics-header">
              <h4>🚛 Efficiency</h4>
              <span className="analytics-value">{supplyChainData.deliveryEfficiency}%</span>
            </div>
            <div className="analytics-details">
              <div className="detail-item">
                <span className="detail-label">On-Time:</span>
                <span className="detail-value">{supplyChainData.onTimeDelivery}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Avg Time:</span>
                <span className="detail-value">{b2bAnalytics.avgDeliveryTime}</span>
              </div>
            </div>
          </div>
          
          <div className="analytics-card risk-card">
            <div className="analytics-header">
              <h4>⚠️ Risk Level</h4>
              <span className="analytics-value risk-medium">{b2bAnalytics.riskAssessment}</span>
            </div>
            <div className="analytics-details">
              <div className="detail-item">
                <span className="detail-label">High Risk:</span>
                <span className="detail-value">{b2bPerformanceMetrics.riskAssessment.filter(r => r.risk === 'high').length}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Medium Risk:</span>
                <span className="detail-value">{b2bPerformanceMetrics.riskAssessment.filter(r => r.risk === 'medium').length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* B2B Action Button */}
        <div className="b2b-content-actions">
          <button 
            className="content-action-btn primary"
            onClick={b2bView === 'clients' ? handleAddClient : handleAddVendor}
          >
            <span className="btn-icon">➕</span>
            {b2bView === 'clients' ? 'Add New Client' : 'Add New Vendor'}
          </button>
        </div>

        {/* B2B Cards Grid */}
        <div className="b2b-grid enhanced">
          {(b2bView === 'clients' ? b2bClients : b2bVendors).map((entity) => (
            <div key={entity.id} className="b2b-card enhanced">
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
                  ? 'Top Client: Metro Supermarkets (2,500L/day)'
                  : 'Top Vendor: Mountain Fresh Dairy (7,200L/day)'
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
        <div className="advanced-analytics-header">
          <div className="analytics-title-wrapper">
            <h3 className="analytics-main-title">🔮 Advanced Analytics & Insights</h3>
            <p className="analytics-subtitle">AI-powered predictions and intelligent business insights</p>
          </div>
          <div className="analytics-time-control">
            <select 
              value={selectedTimeframe} 
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="analytics-timeframe-select"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
        </div>

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
                <h4 className="insights-section-title">🤖 AI-Powered Recommendations</h4>
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
              <h4>🚀 Growth Opportunities</h4>
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
                  <span className="intel-value positive">😊 Optimistic</span>
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

          <div className="weather-insights-grid">
            <div className="seasonal-factors-card">
              <h4>🌱 Seasonal Factors</h4>
              <div className="factors-list">
                <div className="factor-item">
                  <span className="factor-label">Temperature:</span>
                  <span className="factor-value">{weatherImpact.seasonalFactors.temperature}</span>
                  <span className="factor-status positive">✅</span>
                </div>
                <div className="factor-item">
                  <span className="factor-label">Rainfall:</span>
                  <span className="factor-value">{weatherImpact.seasonalFactors.rainfall}</span>
                  <span className="factor-status positive">✅</span>
                </div>
                <div className="factor-item">
                  <span className="factor-label">Humidity:</span>
                  <span className="factor-value">{weatherImpact.seasonalFactors.humidity}</span>
                  <span className="factor-status neutral">⚠️</span>
                </div>
              </div>
            </div>

            <div className="weather-recommendations enhanced">
              <h4>📋 Smart Recommendations</h4>
              <div className="weather-rec-list">
                {weatherImpact.alerts.map((alert, index) => (
                  <div key={index} className={`weather-rec-item ${alert.priority}`}>
                    <span className="rec-icon">
                      {alert.type === 'warning' ? '⚠️' : alert.type === 'info' ? 'ℹ️' : '✅'}
                    </span>
                    <div className="rec-content">
                      <span className="rec-text">{alert.message}</span>
                      <span className={`rec-priority ${alert.priority}`}>
                        {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)} Priority
                      </span>
                    </div>
                    <button 
                      className="action-btn small primary"
                      onClick={() => alert(`Action taken for: ${alert.message}`)}
                    >
                      Take Action
                    </button>
                  </div>
                ))}
                <div className="weather-rec-item low">
                  <span className="rec-icon">🌡️</span>
                  <div className="rec-content">
                    <span className="rec-text">Optimal temperature for milk collection: Continue normal operations</span>
                    <span className="rec-priority low">Low Priority</span>
                  </div>
                  <button className="action-btn small outline">Monitor</button>
                </div>
                <div className="weather-rec-item low">
                  <span className="rec-icon">💧</span>
                  <div className="rec-content">
                    <span className="rec-text">Humidity levels stable: No impact on storage conditions</span>
                    <span className="rec-priority low">Low Priority</span>
                  </div>
                  <button className="action-btn small outline">Monitor</button>
                </div>
              </div>
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