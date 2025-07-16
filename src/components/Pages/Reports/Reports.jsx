import React, { useState, useEffect } from 'react';
import './Reports.css';

function Reports() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState('month');
  const [refreshing, setRefreshing] = useState(false);
  
  // Custom report builder state
  const [customConfig, setCustomConfig] = useState({
    title: '',
    metrics: [],
    dateRange: 'month',
    format: 'pdf'
  });

  // Quick report modal state
  const [showQuickReport, setShowQuickReport] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState(null);

  // Enhanced report data with comprehensive metrics and real-time analytics
  const reportData = {
    milkProduction: {
      daily: '2,450 L',
      weekly: '17,150 L',
      monthly: '73,500 L',
      yearly: '882,000 L',
      trend: '+12%',
      avgPerCow: '15.7 L',
      qualityGrade: 'A+',
      fatContent: '4.2%',
      proteinContent: '3.4%',
      historicalData: [
        { period: 'Jan', value: 68500, quality: 89, efficiency: 84, temperature: 26, humidity: 68 },
        { period: 'Feb', value: 71200, quality: 91, efficiency: 86, temperature: 28, humidity: 65 },
        { period: 'Mar', value: 69800, quality: 88, efficiency: 83, temperature: 32, humidity: 72 },
        { period: 'Apr', value: 72100, quality: 92, efficiency: 87, temperature: 35, humidity: 70 },
        { period: 'May', value: 73500, quality: 94, efficiency: 89, temperature: 38, humidity: 75 },
        { period: 'Jun', value: 75200, quality: 96, efficiency: 91, temperature: 40, humidity: 78 }
      ],
      dailyBreakdown: [
        { time: '05:00', session: 'Morning', volume: 1200, quality: 94, cows: 78 },
        { time: '17:00', session: 'Evening', volume: 1250, quality: 92, cows: 78 }
      ],
      weeklyTrend: [
        { day: 'Mon', volume: 2380, quality: 93, efficiency: 88 },
        { day: 'Tue', volume: 2420, quality: 94, efficiency: 89 },
        { day: 'Wed', volume: 2450, quality: 95, efficiency: 90 },
        { day: 'Thu', volume: 2480, quality: 93, efficiency: 89 },
        { day: 'Fri', volume: 2500, quality: 96, efficiency: 91 },
        { day: 'Sat', volume: 2460, quality: 94, efficiency: 88 },
        { day: 'Sun', volume: 2440, quality: 92, efficiency: 87 }
      ],
      seasonalAnalysis: {
        spring: { avgProduction: 71200, quality: 91, efficiency: 86 },
        summer: { avgProduction: 74900, quality: 94, efficiency: 89 },
        monsoon: { avgProduction: 69800, quality: 88, efficiency: 84 },
        winter: { avgProduction: 68500, quality: 89, efficiency: 85 }
      },
      benchmarks: {
        industryAverage: 65000,
        topPerformers: 78000,
        ourPerformance: 73500,
        percentile: 78
      }
    },
    cattle: {
      total: 156,
      healthy: 142,
      pregnant: 23,
      newBorn: 8,
      sick: 3,
      vaccinated: 148,
      healthDistribution: [
        { status: 'Healthy', count: 142, percentage: 91, trend: '+2%' },
        { status: 'Pregnant', count: 23, percentage: 15, trend: '+8%' },
        { status: 'Sick', count: 3, percentage: 2, trend: '-15%' },
        { status: 'Treatment', count: 5, percentage: 3, trend: '-10%' }
      ],
      ageDistribution: [
        { ageGroup: '0-1 years', count: 18, percentage: 11.5, productivity: 'Low' },
        { ageGroup: '1-3 years', count: 45, percentage: 28.8, productivity: 'Medium' },
        { ageGroup: '3-6 years', count: 67, percentage: 43.0, productivity: 'High' },
        { ageGroup: '6-10 years', count: 21, percentage: 13.5, productivity: 'Medium' },
        { ageGroup: '10+ years', count: 5, percentage: 3.2, productivity: 'Low' }
      ],
      breedDistribution: [
        { breed: 'Holstein Friesian', count: 45, avgProduction: 18.5, percentage: 28.8 },
        { breed: 'Jersey', count: 38, avgProduction: 16.2, percentage: 24.4 },
        { breed: 'Gir', count: 32, avgProduction: 14.8, percentage: 20.5 },
        { breed: 'Sahiwal', count: 25, avgProduction: 13.5, percentage: 16.0 },
        { breed: 'Cross Breed', count: 16, avgProduction: 15.8, percentage: 10.3 }
      ],
      healthMetrics: {
        vaccinationRate: 94.9,
        mortalityRate: 1.2,
        fertilityRate: 78.5,
        avgCalvingInterval: 13.2,
        diseaseIncidence: 2.8,
        treatmentSuccessRate: 92.3
      },
      performanceAnalysis: {
        topPerformers: [
          { id: 'C001', name: 'Ganga', breed: 'Holstein', dailyProduction: 22.5, quality: 96 },
          { id: 'C045', name: 'Lakshmi', breed: 'Jersey', dailyProduction: 20.8, quality: 94 },
          { id: 'C089', name: 'Saraswati', breed: 'Gir', dailyProduction: 19.2, quality: 93 }
        ],
        underPerformers: [
          { id: 'C134', name: 'Kamala', breed: 'Cross', dailyProduction: 8.5, quality: 78, issue: 'Health' },
          { id: 'C167', name: 'Meera', breed: 'Sahiwal', dailyProduction: 9.2, quality: 82, issue: 'Age' }
        ]
      }
    },
    revenue: {
      daily: '₹24,500',
      weekly: '₹1,71,500',
      monthly: '₹7,35,000',
      yearly: '₹88,20,000',
      trend: '+8%',
      profitMargin: '32%',
      revenueStreams: [
        { source: 'Milk Sales', amount: 578000, percentage: 78.9, trend: '+12%', growth: 'High' },
        { source: 'Cattle Sales', amount: 98000, percentage: 13.3, trend: '+5%', growth: 'Medium' },
        { source: 'Dairy Products', amount: 45000, percentage: 6.1, trend: '+18%', growth: 'High' },
        { source: 'Organic Fertilizer', amount: 8000, percentage: 1.1, trend: '+25%', growth: 'High' },
        { source: 'Other', amount: 6000, percentage: 0.8, trend: '+3%', growth: 'Low' }
      ],
      expenses: {
        feed: { amount: 200000, percentage: 40, trend: '+8%', category: 'Variable' },
        labor: { amount: 120000, percentage: 24, trend: '+12%', category: 'Fixed' },
        veterinary: { amount: 50000, percentage: 10, trend: '+5%', category: 'Variable' },
        utilities: { amount: 80000, percentage: 16, trend: '+15%', category: 'Fixed' },
        maintenance: { amount: 30000, percentage: 6, trend: '+3%', category: 'Variable' },
        insurance: { amount: 15000, percentage: 3, trend: '+7%', category: 'Fixed' },
        other: { amount: 5000, percentage: 1, trend: '+2%', category: 'Variable' }
      },
      profitability: {
        grossProfit: 235000,
        netProfit: 185000,
        ebitda: 220000,
        roi: 18.5,
        paybackPeriod: 4.2,
        breakEvenPoint: 45000
      },
      cashFlow: {
        operating: 195000,
        investing: -45000,
        financing: -25000,
        netCashFlow: 125000
      },
      financialRatios: {
        currentRatio: 2.4,
        debtToEquity: 0.35,
        assetTurnover: 1.8,
        profitMargin: 32.1,
        liquidityRatio: 1.9
      }
    },
    quality: {
      avgFatContent: '4.2%',
      avgProteinContent: '3.4%',
      gradeA: '92%',
      gradeB: '7%',
      gradeC: '1%',
      qualityTrend: '+5%',
      rejectionRate: '0.8%',
      detailedMetrics: {
        fatContent: { min: 3.8, max: 4.6, avg: 4.2, std: 0.15, target: 4.0 },
        proteinContent: { min: 3.1, max: 3.7, avg: 3.4, std: 0.12, target: 3.2 },
        lactose: { min: 4.6, max: 5.2, avg: 4.9, std: 0.08, target: 4.8 },
        solidNotFat: { min: 8.2, max: 9.1, avg: 8.6, std: 0.18, target: 8.5 },
        totalSolids: { min: 12.5, max: 13.8, avg: 13.1, std: 0.22, target: 12.8 }
      },
      microbiological: {
        totalBacterialCount: { value: 45000, unit: 'CFU/ml', limit: 100000, status: 'Good' },
        somaticCellCount: { value: 180000, unit: 'cells/ml', limit: 400000, status: 'Excellent' },
        coliformCount: { value: 15, unit: 'CFU/ml', limit: 100, status: 'Excellent' },
        yeastMoldCount: { value: 25, unit: 'CFU/ml', limit: 500, status: 'Excellent' }
      },
      physicalProperties: {
        temperature: { value: 4.2, unit: '°C', range: '2-6', status: 'Good' },
        ph: { value: 6.7, unit: 'pH', range: '6.6-6.8', status: 'Excellent' },
        density: { value: 1.032, unit: 'g/ml', range: '1.028-1.034', status: 'Good' },
        freezingPoint: { value: -0.525, unit: '°C', range: '-0.520 to -0.530', status: 'Good' }
      },
      qualityTrends: [
        { month: 'Jan', gradeA: 88, gradeB: 10, gradeC: 2, avgScore: 87.5 },
        { month: 'Feb', gradeA: 90, gradeB: 8, gradeC: 2, avgScore: 89.2 },
        { month: 'Mar', gradeA: 89, gradeB: 9, gradeC: 2, avgScore: 88.8 },
        { month: 'Apr', gradeA: 91, gradeB: 8, gradeC: 1, avgScore: 90.1 },
        { month: 'May', gradeA: 92, gradeB: 7, gradeC: 1, avgScore: 91.3 },
        { month: 'Jun', gradeA: 94, gradeB: 5, gradeC: 1, avgScore: 93.2 }
      ]
    },
    efficiency: {
      feedConversionRatio: '1.4',
      laborEfficiency: '85%',
      equipmentUtilization: '78%',
      energyConsumption: '45 kWh/day',
      detailedMetrics: {
        milkingEfficiency: { current: 89, target: 92, trend: '+3%' },
        feedUtilization: { current: 78, target: 85, trend: '+5%' },
        waterUsage: { current: 125, unit: 'L/cow/day', target: 120, trend: '-2%' },
        laborProductivity: { current: 15.7, unit: 'L/hour', target: 18, trend: '+8%' },
        equipmentDowntime: { current: 4.2, unit: 'hours/week', target: 3, trend: '-15%' },
        energyEfficiency: { current: 2.8, unit: 'kWh/L', target: 2.5, trend: '-8%' }
      },
      operationalKPIs: {
        milkingTime: { morning: 2.5, evening: 2.8, unit: 'hours', target: 2.2 },
        cleaningTime: { daily: 1.5, weekly: 4, unit: 'hours', efficiency: 85 },
        maintenanceSchedule: { adherence: 92, overdue: 2, upcoming: 5 },
        staffUtilization: { optimal: 78, current: 85, overtime: 12 }
      }
    },
    predictions: {
      nextMonthProduction: '76,200 L',
      expectedRevenue: '₹7,65,000',
      optimalCattleCount: 165,
      seasonalTrend: 'Increasing',
      confidence: '87%',
      recommendations: [
        'Increase feed quality for higher production',
        'Consider expanding cattle count by 9 heads',
        'Monitor weather patterns for seasonal adjustments',
        'Optimize milking schedule for peak efficiency'
      ],
      advancedAnalytics: {
        demandForecasting: {
          nextWeek: { demand: 17500, confidence: 92 },
          nextMonth: { demand: 76200, confidence: 87 },
          nextQuarter: { demand: 235000, confidence: 78 }
        },
        priceProjections: {
          milkPrice: { current: 32, projected: 34, change: '+6.25%', timeframe: '3 months' },
          feedCost: { current: 28, projected: 30, change: '+7.14%', timeframe: '3 months' },
          laborCost: { current: 450, projected: 485, change: '+7.78%', timeframe: '6 months' }
        },
        riskAnalysis: {
          weatherRisk: { level: 'Medium', impact: 'Production -8%', mitigation: 'Covered sheds' },
          diseaseRisk: { level: 'Low', impact: 'Production -3%', mitigation: 'Vaccination program' },
          marketRisk: { level: 'Medium', impact: 'Revenue -5%', mitigation: 'Diversification' },
          feedRisk: { level: 'High', impact: 'Cost +12%', mitigation: 'Contract farming' }
        },
        optimizationSuggestions: [
          { category: 'Production', suggestion: 'Implement precision feeding system', impact: '+8% efficiency' },
          { category: 'Quality', suggestion: 'Upgrade cooling system', impact: '+5% grade A milk' },
          { category: 'Cost', suggestion: 'Solar power installation', impact: '-15% energy cost' },
          { category: 'Health', suggestion: 'Automated health monitoring', impact: '-20% vet costs' }
        ]
      }
    },
    // New comprehensive analytics sections
    marketAnalysis: {
      currentPrices: {
        localMarket: { price: 32, trend: '+5%', volume: 2200 },
        cooperativeRate: { price: 34, trend: '+3%', volume: 1800 },
        directSales: { price: 38, trend: '+8%', volume: 450 },
        processingPlant: { price: 31, trend: '+2%', volume: 1500 }
      },
      competitorAnalysis: {
        averageProduction: 65000,
        averageQuality: 88,
        averagePrice: 33,
        marketShare: 12.5,
        competitiveAdvantage: ['Higher quality', 'Consistent supply', 'Organic certification']
      },
      seasonalPatterns: {
        peak: { months: ['Dec', 'Jan', 'Feb'], multiplier: 1.15 },
        normal: { months: ['Mar', 'Apr', 'May', 'Sep', 'Oct', 'Nov'], multiplier: 1.0 },
        low: { months: ['Jun', 'Jul', 'Aug'], multiplier: 0.85 }
      }
    },
    sustainability: {
      carbonFootprint: {
        total: 2.8,
        unit: 'kg CO2/L milk',
        breakdown: {
          feed: 1.2,
          energy: 0.6,
          transport: 0.4,
          processing: 0.3,
          packaging: 0.2,
          waste: 0.1
        },
        reduction: '-12% from last year'
      },
      waterUsage: {
        total: 125,
        unit: 'L/cow/day',
        breakdown: {
          drinking: 45,
          cleaning: 35,
          cooling: 25,
          washing: 20
        },
        efficiency: '+8% improvement'
      },
      wasteManagement: {
        organicWaste: { amount: 450, unit: 'kg/day', utilization: 85, revenue: 2500 },
        biogas: { production: 25, unit: 'm³/day', energyValue: 180, savings: 1200 },
        compost: { production: 200, unit: 'kg/day', sales: 8000, profit: 3500 }
      }
    }
  };

  // Quick Reports Data
  const quickReportsData = {
    daily: {
      title: "Daily Report - Today's Summary",
      icon: "📊",
      date: new Date().toLocaleDateString('en-IN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      summary: {
        milkProduction: "2,450 L",
        revenue: "₹24,500",
        cattleCount: 156,
        healthyCount: 142,
        qualityGrade: "A+",
        efficiency: "89%"
      },
      details: {
        production: {
          morning: "1,200 L",
          evening: "1,250 L",
          avgPerCow: "15.7 L",
          qualityScore: 94
        },
        weather: {
          temperature: "28°C",
          humidity: "65%",
          condition: "Partly Cloudy"
        },
        activities: [
          { time: "05:30", activity: "Morning milking started", status: "completed" },
          { time: "07:45", activity: "Feed distribution", status: "completed" },
          { time: "09:00", activity: "Health checkup - Batch A", status: "completed" },
          { time: "12:30", activity: "Cattle grazing", status: "in-progress" },
          { time: "17:00", activity: "Evening milking", status: "scheduled" },
          { time: "19:30", activity: "Feed distribution", status: "scheduled" }
        ],
        alerts: [
          { type: "info", message: "Milk quality excellent today" },
          { type: "warning", message: "Cow #47 needs attention" },
          { type: "success", message: "Production target achieved" }
        ]
      }
    },
    health: {
      title: "Health Report - Cattle Health Analysis",
      icon: "🏥",
      date: new Date().toLocaleDateString('en-IN'),
      summary: {
        totalCattle: 156,
        healthy: 142,
        sick: 3,
        pregnant: 23,
        vaccinated: 148,
        healthScore: "91%"
      },
      details: {
        healthDistribution: [
          { status: "Healthy", count: 142, percentage: 91, color: "#27ae60" },
          { status: "Pregnant", count: 23, percentage: 15, color: "#3498db" },
          { status: "Under Treatment", count: 5, percentage: 3, color: "#f39c12" },
          { status: "Sick", count: 3, percentage: 2, color: "#e74c3c" }
        ],
        recentCheckups: [
          { id: "C001", name: "Ganga", status: "Healthy", lastCheckup: "2024-01-15", nextDue: "2024-02-15" },
          { id: "C047", name: "Lakshmi", status: "Treatment", lastCheckup: "2024-01-14", nextDue: "2024-01-21" },
          { id: "C089", name: "Saraswati", status: "Pregnant", lastCheckup: "2024-01-13", nextDue: "2024-01-27" },
          { id: "C123", name: "Durga", status: "Healthy", lastCheckup: "2024-01-12", nextDue: "2024-02-12" }
        ],
        vaccinations: {
          completed: 148,
          pending: 8,
          nextScheduled: "2024-01-25",
          vaccineType: "FMD Booster"
        },
        alerts: [
          { type: "urgent", message: "3 cattle need immediate attention" },
          { type: "info", message: "Vaccination due for 8 cattle next week" },
          { type: "success", message: "Overall herd health is excellent" }
        ]
      }
    },
    financial: {
      title: "Financial Report - Revenue & Expenses",
      icon: "💰",
      date: new Date().toLocaleDateString('en-IN'),
      summary: {
        totalRevenue: "₹7,35,000",
        totalExpenses: "₹5,00,000",
        netProfit: "₹2,35,000",
        profitMargin: "32%",
        roi: "18.5%"
      },
      details: {
        revenue: {
          milkSales: { amount: 578000, percentage: 78.9 },
          cattleSales: { amount: 98000, percentage: 13.3 },
          dairyProducts: { amount: 45000, percentage: 6.1 },
          other: { amount: 14000, percentage: 1.9 }
        },
        expenses: {
          feed: { amount: 200000, percentage: 40 },
          labor: { amount: 120000, percentage: 24 },
          veterinary: { amount: 50000, percentage: 10 },
          utilities: { amount: 80000, percentage: 16 },
          maintenance: { amount: 30000, percentage: 6 },
          other: { amount: 20000, percentage: 4 }
        },
        monthlyTrend: [
          { month: "Jan", revenue: 735000, expenses: 500000, profit: 235000 },
          { month: "Feb", revenue: 720000, expenses: 485000, profit: 235000 },
          { month: "Mar", revenue: 750000, expenses: 510000, profit: 240000 },
          { month: "Apr", revenue: 780000, expenses: 520000, profit: 260000 },
          { month: "May", revenue: 765000, expenses: 505000, profit: 260000 },
          { month: "Jun", revenue: 735000, expenses: 500000, profit: 235000 }
        ],
        alerts: [
          { type: "success", message: "Revenue target exceeded by 8%" },
          { type: "info", message: "Feed costs increased by 5% this month" },
          { type: "warning", message: "Utility expenses higher than expected" }
        ]
      }
    },
    breeding: {
      title: "Breeding Report - Reproductive Management",
      icon: "💕",
      date: new Date().toLocaleDateString('en-IN'),
      summary: {
        totalFemales: 89,
        pregnant: 23,
        breedingAge: 45,
        calvedThisMonth: 8,
        conceptionRate: "78%",
        avgCalvingInterval: "13.2 months"
      },
      details: {
        pregnancyStatus: [
          { stage: "1st Trimester", count: 8, percentage: 35, color: "#3498db" },
          { stage: "2nd Trimester", count: 9, percentage: 39, color: "#2ecc71" },
          { stage: "3rd Trimester", count: 6, percentage: 26, color: "#e67e22" }
        ],
        upcomingCalving: [
          { id: "C089", name: "Saraswati", dueDate: "2024-02-15", stage: "3rd Trimester" },
          { id: "C156", name: "Parvati", dueDate: "2024-02-22", stage: "3rd Trimester" },
          { id: "C078", name: "Radha", dueDate: "2024-03-05", stage: "2nd Trimester" },
          { id: "C134", name: "Sita", dueDate: "2024-03-12", stage: "2nd Trimester" }
        ],
        breedingSchedule: [
          { id: "C045", name: "Kamala", nextBreeding: "2024-01-28", status: "Ready" },
          { id: "C067", name: "Meera", nextBreeding: "2024-02-03", status: "Scheduled" },
          { id: "C098", name: "Tulsi", nextBreeding: "2024-02-10", status: "Scheduled" }
        ],
        recentCalving: [
          { id: "C023", name: "Gita", calvingDate: "2024-01-10", calfGender: "Female", status: "Healthy" },
          { id: "C145", name: "Uma", calvingDate: "2024-01-08", calfGender: "Male", status: "Healthy" },
          { id: "C167", name: "Devi", calvingDate: "2024-01-05", calfGender: "Female", status: "Healthy" }
        ],
        alerts: [
          { type: "info", message: "6 cattle due for calving this month" },
          { type: "success", message: "Conception rate improved by 5%" },
          { type: "warning", message: "Schedule breeding for 3 cattle" }
        ]
      }
    }
  };

  // KPI data for enhanced dashboard
  const kpiData = [
    {
      id: 'production',
      title: 'Total Production',
      value: '73,500L',
      trend: '+12%',
      trendDirection: 'positive',
      icon: '🥛',
      color: 'blue'
    },
    {
      id: 'revenue',
      title: 'Monthly Revenue',
      value: '₹7,35,000',
      trend: '+8%',
      trendDirection: 'positive',
      icon: '💰',
      color: 'green'
    },
    {
      id: 'efficiency',
      title: 'Farm Efficiency',
      value: '85%',
      trend: '+3%',
      trendDirection: 'positive',
      icon: '⚡',
      color: 'orange'
    },
    {
      id: 'quality',
      title: 'Quality Grade',
      value: '92%',
      trend: '+5%',
      trendDirection: 'positive',
      icon: '🏆',
      color: 'purple'
    }
  ];

  // Utility functions
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleExport = (type, format) => {
    setIsLoading(true);
    // Simulate export process
    setTimeout(() => {
      setIsLoading(false);
      alert(`${type} report exported as ${format}`);
    }, 2000);
  };

  // Handle quick report click
  const handleQuickReportClick = (reportType) => {
    setSelectedReportType(reportType);
    setShowQuickReport(true);
    document.body.classList.add('modal-open');
  };

  // Close quick report modal
  const closeQuickReport = () => {
    setShowQuickReport(false);
    setSelectedReportType(null);
    document.body.classList.remove('modal-open');
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  // Quick Report Modal Component
  const renderQuickReportModal = () => {
    if (!showQuickReport || !selectedReportType) return null;

    const reportData = quickReportsData[selectedReportType];
    
    // Determine modal positioning based on screen size
    const getModalOverlayClass = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
        return "reports-modal-overlay"; // Mobile - no sidebar
      } else if (screenWidth <= 1024) {
        return "reports-modal-overlay"; // Tablet - smaller sidebar
      } else {
        return "reports-modal-overlay"; // Desktop - full sidebar
      }
    };
    
    return (
      <div className={getModalOverlayClass()} onClick={closeQuickReport}>
        <div className="reports-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="reports-modal-header">
            <div className="reports-modal-title">
              <span className="reports-modal-icon">{reportData.icon}</span>
              <div>
                <h2>{reportData.title}</h2>
                <p className="reports-modal-date">{reportData.date}</p>
              </div>
            </div>
            <button className="reports-modal-close" onClick={closeQuickReport}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="reports-modal-body">
            {/* Summary Section */}
            <div className="reports-modal-section">
              <h3>Summary</h3>
              <div className="reports-summary-grid">
                {Object.entries(reportData.summary).map(([key, value]) => (
                  <div key={key} className="reports-summary-item">
                    <span className="reports-summary-label">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <span className="reports-summary-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Content Based on Report Type */}
            {selectedReportType === 'daily' && renderDailyReportDetails(reportData.details)}
            {selectedReportType === 'health' && renderHealthReportDetails(reportData.details)}
            {selectedReportType === 'financial' && renderFinancialReportDetails(reportData.details)}
            {selectedReportType === 'breeding' && renderBreedingReportDetails(reportData.details)}
          </div>

          <div className="reports-modal-footer">
            <button 
              className="reports-modal-btn reports-btn-secondary" 
              onClick={closeQuickReport}
            >
              Close
            </button>
            <button 
              className="reports-modal-btn reports-btn-primary" 
              onClick={() => handleExport(selectedReportType, 'pdf')}
            >
              Export PDF
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Daily Report Details
  const renderDailyReportDetails = (details) => (
    <div className="reports-daily-details">
      <div className="reports-detail-section">
        <h4>Production Details</h4>
        <div className="reports-production-stats">
          <div className="reports-stat-card">
            <span className="reports-stat-label">Morning Production</span>
            <span className="reports-stat-value">{details.production.morning}</span>
          </div>
          <div className="reports-stat-card">
            <span className="reports-stat-label">Evening Production</span>
            <span className="reports-stat-value">{details.production.evening}</span>
          </div>
          <div className="reports-stat-card">
            <span className="reports-stat-label">Quality Score</span>
            <span className="reports-stat-value">{details.production.qualityScore}/100</span>
          </div>
        </div>
      </div>

      <div className="reports-detail-section">
        <h4>Today's Activities</h4>
        <div className="reports-activities-list">
          {details.activities.map((activity, index) => (
            <div key={index} className={`reports-activity-item reports-status-${activity.status}`}>
              <span className="reports-activity-time">{activity.time}</span>
              <span className="reports-activity-text">{activity.activity}</span>
              <span className={`reports-activity-status reports-status-${activity.status}`}>
                {activity.status.replace('-', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="reports-detail-section">
        <h4>Weather Conditions</h4>
        <div className="reports-weather-info">
          <div className="reports-weather-item">
            <span>Temperature: {details.weather.temperature}</span>
          </div>
          <div className="reports-weather-item">
            <span>Humidity: {details.weather.humidity}</span>
          </div>
          <div className="reports-weather-item">
            <span>Condition: {details.weather.condition}</span>
          </div>
        </div>
      </div>

      <div className="reports-detail-section">
        <h4>Alerts & Notifications</h4>
        <div className="reports-alerts-list">
          {details.alerts.map((alert, index) => (
            <div key={index} className={`reports-alert-item reports-alert-${alert.type}`}>
              <span className="reports-alert-message">{alert.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Health Report Details
  const renderHealthReportDetails = (details) => (
    <div className="reports-health-details">
      <div className="reports-detail-section">
        <h4>Health Distribution</h4>
        <div className="reports-health-chart">
          {details.healthDistribution.map((item, index) => (
            <div key={index} className="reports-health-item">
              <div className="reports-health-label">
                <span className="reports-health-status">{item.status}</span>
                <span className="reports-health-count">{item.count} cattle</span>
              </div>
              <div className="reports-health-bar">
                <div 
                  className="reports-bar-fill"
                  style={{ 
                    width: `${item.percentage}%`,
                    backgroundColor: item.color
                  }}
                ></div>
              </div>
              <span className="reports-health-percentage">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="reports-detail-section">
        <h4>Recent Checkups</h4>
        <div className="reports-checkups-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Last Checkup</th>
                <th>Next Due</th>
              </tr>
            </thead>
            <tbody>
              {details.recentCheckups.map((checkup, index) => (
                <tr key={index}>
                  <td>{checkup.id}</td>
                  <td>{checkup.name}</td>
                  <td className={`reports-status-${checkup.status.toLowerCase()}`}>
                    {checkup.status}
                  </td>
                  <td>{checkup.lastCheckup}</td>
                  <td>{checkup.nextDue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="reports-detail-section">
        <h4>Vaccination Status</h4>
        <div className="reports-vaccination-info">
          <div className="reports-vaccination-stats">
            <div className="reports-stat-card">
              <span className="reports-stat-label">Completed</span>
              <span className="reports-stat-value">{details.vaccinations.completed}</span>
            </div>
            <div className="reports-stat-card">
              <span className="reports-stat-label">Pending</span>
              <span className="reports-stat-value">{details.vaccinations.pending}</span>
            </div>
            <div className="reports-stat-card">
              <span className="reports-stat-label">Next Scheduled</span>
              <span className="reports-stat-value">{details.vaccinations.nextScheduled}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Financial Report Details
  const renderFinancialReportDetails = (details) => (
    <div className="reports-financial-details">
      <div className="reports-detail-section">
        <h4>Revenue Breakdown</h4>
        <div className="reports-revenue-chart">
          {Object.entries(details.revenue).map(([key, value]) => (
            <div key={key} className="reports-revenue-item">
              <div className="reports-revenue-label">
                <span className="reports-revenue-source">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
                <span className="reports-revenue-amount">₹{value.amount.toLocaleString()}</span>
              </div>
              <div className="reports-revenue-bar">
                <div 
                  className="reports-bar-fill"
                  style={{ width: `${value.percentage}%` }}
                ></div>
              </div>
              <span className="reports-revenue-percentage">{value.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="reports-detail-section">
        <h4>Expense Breakdown</h4>
        <div className="reports-expense-chart">
          {Object.entries(details.expenses).map(([key, value]) => (
            <div key={key} className="reports-expense-item">
              <div className="reports-expense-label">
                <span className="reports-expense-category">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
                <span className="reports-expense-amount">₹{value.amount.toLocaleString()}</span>
              </div>
              <div className="reports-expense-bar">
                <div 
                  className="reports-bar-fill reports-expense-fill"
                  style={{ width: `${value.percentage}%` }}
                ></div>
              </div>
              <span className="reports-expense-percentage">{value.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="reports-detail-section">
        <h4>Monthly Trend</h4>
        <div className="reports-trend-chart">
          <div className="reports-trend-header">
            <span>Month</span>
            <span>Revenue</span>
            <span>Expenses</span>
            <span>Profit</span>
          </div>
          {details.monthlyTrend.map((month, index) => (
            <div key={index} className="reports-trend-row">
              <span className="reports-trend-month">{month.month}</span>
              <span className="reports-trend-revenue">₹{month.revenue.toLocaleString()}</span>
              <span className="reports-trend-expenses">₹{month.expenses.toLocaleString()}</span>
              <span className="reports-trend-profit">₹{month.profit.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Breeding Report Details
  const renderBreedingReportDetails = (details) => (
    <div className="reports-breeding-details">
      <div className="reports-detail-section">
        <h4>Pregnancy Status</h4>
        <div className="reports-pregnancy-chart">
          {details.pregnancyStatus.map((stage, index) => (
            <div key={index} className="reports-pregnancy-item">
              <div className="reports-pregnancy-label">
                <span className="reports-pregnancy-stage">{stage.stage}</span>
                <span className="reports-pregnancy-count">{stage.count} cattle</span>
              </div>
              <div className="reports-pregnancy-bar">
                <div 
                  className="reports-bar-fill"
                  style={{ 
                    width: `${stage.percentage}%`,
                    backgroundColor: stage.color
                  }}
                ></div>
              </div>
              <span className="reports-pregnancy-percentage">{stage.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="reports-detail-section">
        <h4>Upcoming Calving</h4>
        <div className="reports-calving-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Due Date</th>
                <th>Stage</th>
              </tr>
            </thead>
            <tbody>
              {details.upcomingCalving.map((cattle, index) => (
                <tr key={index}>
                  <td>{cattle.id}</td>
                  <td>{cattle.name}</td>
                  <td>{cattle.dueDate}</td>
                  <td className="reports-pregnancy-stage">{cattle.stage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="reports-detail-section">
        <h4>Recent Calving</h4>
        <div className="reports-recent-calving">
          {details.recentCalving.map((cattle, index) => (
            <div key={index} className="reports-calving-item">
              <div className="reports-calving-info">
                <span className="reports-calving-name">{cattle.name} ({cattle.id})</span>
                <span className="reports-calving-date">{cattle.calvingDate}</span>
              </div>
              <div className="reports-calving-details">
                <span className="reports-calf-gender">Calf: {cattle.calfGender}</span>
                <span className={`reports-calving-status reports-status-${cattle.status.toLowerCase()}`}>
                  {cattle.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="reports-detail-section">
        <h4>Breeding Schedule</h4>
        <div className="reports-breeding-schedule">
          {details.breedingSchedule.map((cattle, index) => (
            <div key={index} className="reports-breeding-item">
              <div className="reports-breeding-info">
                <span className="reports-breeding-name">{cattle.name} ({cattle.id})</span>
                <span className="reports-breeding-date">{cattle.nextBreeding}</span>
              </div>
              <span className={`reports-breeding-status reports-status-${cattle.status.toLowerCase()}`}>
                {cattle.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Enhanced state for milk production analytics
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('volume');
  const [showDetails, setShowDetails] = useState(false);
  const [hoveredBar, setHoveredBar] = useState(null);

  // Enhanced milk production data with more metrics
  const enhancedProductionData = {
    periods: {
      '3months': [
        { period: 'Apr', value: 72100, quality: 91, efficiency: 87 },
        { period: 'May', value: 73500, quality: 92, efficiency: 89 },
        { period: 'Jun', value: 75200, quality: 94, efficiency: 91 }
      ],
      '6months': reportData.milkProduction.historicalData.map(item => ({
        ...item,
        quality: Math.floor(Math.random() * 10) + 85,
        efficiency: Math.floor(Math.random() * 15) + 80
      })),
      '12months': [
        { period: 'Jul 23', value: 65200, quality: 88, efficiency: 82 },
        { period: 'Aug 23', value: 67800, quality: 89, efficiency: 84 },
        { period: 'Sep 23', value: 66500, quality: 87, efficiency: 83 },
        { period: 'Oct 23', value: 68900, quality: 90, efficiency: 85 },
        { period: 'Nov 23', value: 70200, quality: 91, efficiency: 86 },
        { period: 'Dec 23', value: 69800, quality: 89, efficiency: 85 },
        { period: 'Jan 24', value: 68500, quality: 91, efficiency: 87 },
        { period: 'Feb 24', value: 71200, quality: 92, efficiency: 88 },
        { period: 'Mar 24', value: 69800, quality: 90, efficiency: 86 },
        { period: 'Apr 24', value: 72100, quality: 91, efficiency: 87 },
        { period: 'May 24', value: 73500, quality: 92, efficiency: 89 },
        { period: 'Jun 24', value: 75200, quality: 94, efficiency: 91 }
      ]
    },
    metrics: {
      volume: { label: 'Volume (L)', color: '#3498db', format: 'L' },
      quality: { label: 'Quality (%)', color: '#27ae60', format: '%' },
      efficiency: { label: 'Efficiency (%)', color: '#f39c12', format: '%' }
    },
    insights: {
      peak: { month: 'June', value: '75,200L' },
      growth: '+12%',
      avgDaily: '2,450L',
      bestQuality: 'June (94%)',
      efficiency: '89%'
    }
  };

  const getCurrentData = () => enhancedProductionData.periods[selectedPeriod] || enhancedProductionData.periods['6months'];
  const getCurrentMetric = () => enhancedProductionData.metrics[selectedMetric];
  
  const getPeriodLabel = () => {
    switch(selectedPeriod) {
      case '3months': return '3 Months';
      case '6months': return '6 Months';
      case '12months': return '12 Months';
      default: return '6 Months';
    }
  };

  const getBarValue = (item) => {
    switch(selectedMetric) {
      case 'quality': return item.quality;
      case 'efficiency': return item.efficiency;
      default: return item.value;
    }
  };

  const getMaxValue = () => {
    const data = getCurrentData();
    switch(selectedMetric) {
      case 'quality': return 100;
      case 'efficiency': return 100;
      default: return Math.max(...data.map(item => item.value));
    }
  };

  // Enhanced KPI Section
  const renderKPISection = () => (
    <div className="reports-kpi-section">
      <h3 className="reports-section-title">Key Performance Indicators</h3>
      <div className="reports-kpi-grid">
        {kpiData.map((kpi) => (
          <div key={kpi.id} className={`reports-kpi-card reports-kpi-${kpi.color}`}>
            <div className="reports-kpi-icon">{kpi.icon}</div>
            <div className="reports-kpi-content">
              <div className="reports-kpi-value">{kpi.value}</div>
              <div className="reports-kpi-label">{kpi.title}</div>
              <div className={`reports-kpi-trend reports-trend-${kpi.trendDirection}`}>
                {kpi.trend}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Enhanced Report Cards with Mini Charts
  const renderEnhancedReportCards = () => (
    <div className="reports-enhanced-cards">
      <div className="reports-card-grid">
        {/* Enhanced Milk Production Analytics Card */}
        <div className="reports-enhanced-card reports-production-card">
          <div className="reports-card-header">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '0.5rem'}}>
                <path d="M8 2h8l2 4v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6l2-4z"></path>
                <path d="M16 8a4 4 0 0 1-8 0"></path>
                <circle cx="12" cy="14" r="2"></circle>
              </svg>
              Milk Production Analytics
            </h3>
            <div className="reports-card-actions">
              <button 
                className="reports-action-btn" 
                onClick={() => setShowDetails(!showDetails)}
                title="Toggle Details"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
              <button 
                className="reports-action-btn" 
                onClick={() => handleExport('production', 'pdf')}
                title="Export PDF"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7,10 12,15 17,10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Enhanced Stats Section */}
          <div className="reports-card-stats reports-enhanced-stats">
            <div className="reports-stat-item">
              <span className="reports-stat-value">{reportData.milkProduction.monthly}</span>
              <span className="reports-stat-label">This Month</span>
              <div className="reports-stat-change reports-positive">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
                  <polyline points="17,6 23,6 23,12"></polyline>
                </svg>
                {reportData.milkProduction.trend}
              </div>
            </div>
            <div className="reports-stat-item">
              <span className="reports-stat-value">{reportData.milkProduction.avgPerCow}</span>
              <span className="reports-stat-label">Avg per Cow</span>
              <div className="reports-stat-change reports-positive">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
                  <polyline points="17,6 23,6 23,12"></polyline>
                </svg>
                +8%
              </div>
            </div>
            <div className="reports-stat-item">
              <span className="reports-stat-value">{reportData.milkProduction.qualityGrade}</span>
              <span className="reports-stat-label">Quality Grade</span>
              <div className="reports-stat-change reports-positive">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
                  <polyline points="17,6 23,6 23,12"></polyline>
                </svg>
                +5%
              </div>
            </div>
            <div className="reports-stat-item">
              <span className="reports-stat-value">{enhancedProductionData.insights.efficiency}</span>
              <span className="reports-stat-label">Efficiency</span>
              <div className="reports-stat-change reports-positive">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
                  <polyline points="17,6 23,6 23,12"></polyline>
                </svg>
                +3%
              </div>
            </div>
          </div>

          {/* Interactive Chart Controls */}
          <div className="reports-chart-controls">
            <div className="reports-control-group">
              <label>Period:</label>
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="reports-control-select"
              >
                <option value="3months">3 Months</option>
                <option value="6months">6 Months</option>
                <option value="12months">12 Months</option>
              </select>
            </div>
            <div className="reports-control-group">
              <label>Metric:</label>
              <select 
                value={selectedMetric} 
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="reports-control-select"
              >
                <option value="volume">Volume</option>
                <option value="quality">Quality</option>
                <option value="efficiency">Efficiency</option>
              </select>
            </div>
          </div>

          {/* Enhanced Interactive Chart */}
          <div className="reports-mini-chart reports-interactive-chart">
            <div className="reports-chart-title">
              {getCurrentMetric().label} - {getPeriodLabel()} Trend
              {hoveredBar && (
                <div className="reports-chart-tooltip">
                  {hoveredBar.period}: {formatNumber(getBarValue(hoveredBar))}{getCurrentMetric().format}
                </div>
              )}
            </div>
            <div className="reports-chart-bars">
              {getCurrentData().map((item, index) => (
                <div 
                  key={index} 
                  className="reports-chart-bar reports-interactive-bar"
                  onMouseEnter={() => setHoveredBar(item)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div 
                    className="reports-bar-fill reports-production-bar" 
                    style={{ 
                      height: `${(getBarValue(item) / getMaxValue()) * 100}%`,
                      background: getCurrentMetric().color,
                      opacity: hoveredBar === item ? 0.8 : 1
                    }}
                  ></div>
                  <span className="reports-bar-label">{item.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <div className="reports-production-insights">
            <div className="reports-insight-grid">
              <div className="reports-insight-item">
                <span className="reports-insight-icon">📈</span>
                <div>
                  <div className="reports-insight-label">Peak Month</div>
                  <div className="reports-insight-value">{enhancedProductionData.insights.peak.month}</div>
                </div>
              </div>
              <div className="reports-insight-item">
                <span className="reports-insight-icon">⚡</span>
                <div>
                  <div className="reports-insight-label">Daily Average</div>
                  <div className="reports-insight-value">{enhancedProductionData.insights.avgDaily}</div>
                </div>
              </div>
              <div className="reports-insight-item">
                <span className="reports-insight-icon">🏆</span>
                <div>
                  <div className="reports-insight-label">Best Quality</div>
                  <div className="reports-insight-value">{enhancedProductionData.insights.bestQuality}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Analytics (Expandable) */}
          {showDetails && (
            <div className="reports-detailed-analytics">
              <div className="reports-details-header">
                <h4>Detailed Analytics</h4>
              </div>
              <div className="reports-details-grid">
                <div className="reports-detail-section">
                  <h5>Quality Metrics</h5>
                  <div className="reports-metric-row">
                    <span>Fat Content:</span>
                    <span className="reports-metric-value">{reportData.milkProduction.fatContent}</span>
                  </div>
                  <div className="reports-metric-row">
                    <span>Protein Content:</span>
                    <span className="reports-metric-value">{reportData.milkProduction.proteinContent}</span>
                  </div>
                  <div className="reports-metric-row">
                    <span>Grade A Percentage:</span>
                    <span className="reports-metric-value">92%</span>
                  </div>
                </div>
                <div className="reports-detail-section">
                  <h5>Performance Indicators</h5>
                  <div className="reports-metric-row">
                    <span>Yearly Target:</span>
                    <span className="reports-metric-value">900,000L</span>
                  </div>
                  <div className="reports-metric-row">
                    <span>Current Progress:</span>
                    <span className="reports-metric-value reports-positive">98%</span>
                  </div>
                  <div className="reports-metric-row">
                    <span>Efficiency Score:</span>
                    <span className="reports-metric-value reports-positive">89/100</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="reports-card-trend">
            <span className="reports-trend-positive">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
                <polyline points="17,6 23,6 23,12"></polyline>
              </svg>
              {reportData.milkProduction.trend} from last month • Excellent performance
            </span>
          </div>
        </div>

        {/* Cattle Health Card */}
        <div className="reports-enhanced-card reports-cattle-card">
          <div className="reports-card-header">
            <h3>Cattle Health Overview</h3>
            <div className="reports-card-actions">
              <button className="reports-action-btn" onClick={() => handleExport('cattle', 'excel')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                </svg>
              </button>
            </div>
          </div>
          <div className="reports-card-stats reports-enhanced-stats">
            <div className="reports-stat-item">
              <span className="reports-stat-value">{reportData.cattle.total}</span>
              <span className="reports-stat-label">Total Cattle</span>
            </div>
            <div className="reports-stat-item">
              <span className="reports-stat-value">{reportData.cattle.healthy}</span>
              <span className="reports-stat-label">Healthy</span>
            </div>
          </div>
          <div className="reports-health-distribution">
            <div className="reports-distribution-title">Health Distribution</div>
            <div className="reports-distribution-chart">
              {reportData.cattle.healthDistribution.map((item, index) => (
                <div key={index} className="reports-distribution-item">
                  <div className="reports-distribution-label">
                    <span className="reports-status">{item.status}</span>
                    <span className="reports-count">{item.count}</span>
                  </div>
                  <div className="reports-distribution-bar">
                    <div 
                      className={`reports-bar-fill reports-health-${item.status.toLowerCase()}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Analysis Card */}
        <div className="reports-enhanced-card reports-revenue-card">
          <div className="reports-card-header">
            <h3>Revenue Analysis</h3>
            <div className="reports-card-actions">
              <button className="reports-action-btn" onClick={() => handleExport('revenue', 'pdf')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="reports-card-stats reports-enhanced-stats">
            <div className="reports-stat-item">
              <span className="reports-stat-value">{reportData.revenue.monthly}</span>
              <span className="reports-stat-label">Monthly Revenue</span>
            </div>
            <div className="reports-stat-item">
              <span className="reports-stat-value">{reportData.revenue.profitMargin}</span>
              <span className="reports-stat-label">Profit Margin</span>
            </div>
          </div>
          <div className="reports-revenue-breakdown">
            <div className="reports-breakdown-title">Revenue Sources</div>
            <div className="reports-breakdown-chart">
              {reportData.revenue.revenueStreams.map((stream, index) => (
                <div key={index} className="reports-breakdown-item">
                  <div className="reports-breakdown-label">
                    <span className="reports-source">{stream.source}</span>
                    <span className="reports-amount">₹{formatNumber(stream.amount)}</span>
                  </div>
                  <div className="reports-breakdown-bar">
                    <div 
                      className="reports-bar-fill"
                      style={{ width: `${stream.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reports-card-trend">
            <span className="reports-trend-positive">{reportData.revenue.trend} from last month</span>
          </div>
        </div>

        {/* Quality Metrics Card */}
        <div className="reports-enhanced-card reports-quality-card">
          <div className="reports-card-header">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '0.5rem'}}>
                <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4m6-6h4a2 2 0 0 1 2 2v3c0 1.1-.9 2-2 2h-4m-6 0V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z"></path>
                <circle cx="9" cy="9" r="2"></circle>
                <path d="M19 9v6"></path>
                <path d="M5 9v6"></path>
              </svg>
              Quality Metrics
            </h3>
            <div className="reports-card-actions">
              <button 
                className="reports-action-btn" 
                onClick={() => handleExport('quality', 'pdf')}
                title="Export Quality Report"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7,10 12,15 17,10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="reports-card-stats reports-enhanced-stats">
            <div className="reports-stat-item">
              <span className="reports-stat-value">{reportData.quality.avgFatContent}</span>
              <span className="reports-stat-label">Avg Fat Content</span>
              <div className="reports-stat-change reports-positive">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
                  <polyline points="17,6 23,6 23,12"></polyline>
                </svg>
                +0.2%
              </div>
            </div>
            <div className="reports-stat-item">
              <span className="reports-stat-value">{reportData.quality.avgProteinContent}</span>
              <span className="reports-stat-label">Avg Protein</span>
              <div className="reports-stat-change reports-positive">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
                  <polyline points="17,6 23,6 23,12"></polyline>
                </svg>
                +0.1%
              </div>
            </div>
            <div className="reports-stat-item">
              <span className="reports-stat-value">{reportData.quality.gradeA}</span>
              <span className="reports-stat-label">Grade A</span>
              <div className="reports-stat-change reports-positive">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
                  <polyline points="17,6 23,6 23,12"></polyline>
                </svg>
                +3%
              </div>
            </div>
            <div className="reports-stat-item">
              <span className="reports-stat-value">{reportData.quality.rejectionRate}</span>
              <span className="reports-stat-label">Rejection Rate</span>
              <div className="reports-stat-change reports-negative">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="7,18 13.5,8.5 18.5,13.5 22,6"></polyline>
                  <polyline points="17,18 22,18 22,12"></polyline>
                </svg>
                -0.4%
              </div>
            </div>
          </div>

          <div className="reports-quality-breakdown">
            <div className="reports-breakdown-title">Quality Distribution</div>
            <div className="reports-quality-chart">
              <div className="reports-quality-item">
                <div className="reports-quality-label">
                  <span className="reports-grade">Grade A</span>
                  <span className="reports-percentage">{reportData.quality.gradeA}</span>
                </div>
                <div className="reports-quality-bar">
                  <div 
                    className="reports-bar-fill reports-grade-a"
                    style={{ width: reportData.quality.gradeA }}
                  ></div>
                </div>
              </div>
              <div className="reports-quality-item">
                <div className="reports-quality-label">
                  <span className="reports-grade">Grade B</span>
                  <span className="reports-percentage">{reportData.quality.gradeB}</span>
                </div>
                <div className="reports-quality-bar">
                  <div 
                    className="reports-bar-fill reports-grade-b"
                    style={{ width: reportData.quality.gradeB }}
                  ></div>
                </div>
              </div>
              <div className="reports-quality-item">
                <div className="reports-quality-label">
                  <span className="reports-grade">Grade C</span>
                  <span className="reports-percentage">{reportData.quality.gradeC}</span>
                </div>
                <div className="reports-quality-bar">
                  <div 
                    className="reports-bar-fill reports-grade-c"
                    style={{ width: reportData.quality.gradeC }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="reports-quality-insights">
            <div className="reports-insight-grid">
              <div className="reports-insight-item">
                <span className="reports-insight-icon">🏆</span>
                <div>
                  <div className="reports-insight-label">Quality Score</div>
                  <div className="reports-insight-value">94/100</div>
                </div>
              </div>
              <div className="reports-insight-item">
                <span className="reports-insight-icon">📈</span>
                <div>
                  <div className="reports-insight-label">Trend</div>
                  <div className="reports-insight-value">{reportData.quality.qualityTrend}</div>
                </div>
              </div>
              <div className="reports-insight-item">
                <span className="reports-insight-icon">🎯</span>
                <div>
                  <div className="reports-insight-label">Target Met</div>
                  <div className="reports-insight-value">98%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="reports-card-trend">
            <span className="reports-trend-positive">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
                <polyline points="17,6 23,6 23,12"></polyline>
              </svg>
              {reportData.quality.qualityTrend} improvement in quality standards
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Quick Actions Section
  const renderQuickActions = () => (
    <div className="reports-quick-actions-section">
      <h3 className="reports-section-title">Quick Actions</h3>
      <div className="reports-quick-actions-grid">
        <button className="reports-quick-action-btn reports-action-primary" onClick={() => handleQuickReportClick('daily')}>
          <div className="reports-action-icon">📊</div>
          <div className="reports-action-content">
            <div className="reports-action-title">Daily Report</div>
            <div className="reports-action-desc">Generate today's summary</div>
          </div>
        </button>
        <button className="reports-quick-action-btn reports-action-secondary" onClick={() => handleQuickReportClick('health')}>
          <div className="reports-action-icon">🏥</div>
          <div className="reports-action-content">
            <div className="reports-action-title">Health Report</div>
            <div className="reports-action-desc">Cattle health analysis</div>
          </div>
        </button>
        <button className="reports-quick-action-btn reports-action-tertiary" onClick={() => handleQuickReportClick('financial')}>
          <div className="reports-action-icon">💰</div>
          <div className="reports-action-content">
            <div className="reports-action-title">Financial Report</div>
            <div className="reports-action-desc">Revenue & expenses</div>
          </div>
        </button>
        <button className="reports-quick-action-btn reports-action-quaternary" onClick={() => handleQuickReportClick('breeding')}>
          <div className="reports-action-icon">💕</div>
          <div className="reports-action-content">
            <div className="reports-action-title">Breeding Report</div>
            <div className="reports-action-desc">Reproductive management</div>
          </div>
        </button>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="reports-overview">
      {renderKPISection()}
      {renderEnhancedReportCards()}
      {renderQuickActions()}
    </div>
  );

  // Advanced Analytics Dashboard with comprehensive data analysis
  const renderAnalytics = () => (
    <div className="reports-analytics-dashboard">
      <div className="reports-analytics-header">
        <h3 className="reports-section-title">Advanced Analytics & Intelligence</h3>
        <div className="reports-analytics-controls">
          <select 
            className="reports-date-range-select" 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button 
            className={`reports-refresh-btn ${refreshing ? 'reports-refreshing' : ''}`}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23,4 23,10 17,10"></polyline>
              <polyline points="1,20 1,14 7,14"></polyline>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
            </svg>
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button className="reports-ai-insights-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4"></path>
              <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
              <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
            </svg>
            AI Insights
          </button>
        </div>
      </div>

      {/* Real-time Performance Dashboard */}
      <div className="reports-realtime-dashboard">
        <h4 className="reports-subsection-title">Real-time Performance Dashboard</h4>
        <div className="reports-realtime-grid">
          <div className="reports-realtime-card reports-production-card">
            <div className="reports-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 2h8l2 4v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6l2-4z"></path>
                <path d="M16 8a4 4 0 0 1-8 0"></path>
                <circle cx="12" cy="14" r="2"></circle>
              </svg>
            </div>
            <div className="reports-realtime-header">
              <h5>Live Production</h5>
              <span className="reports-live-indicator">🔴 LIVE</span>
            </div>
            <div className="reports-realtime-value">2,450 L</div>
            <div className="reports-realtime-change reports-positive">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
                <polyline points="17,6 23,6 23,12"></polyline>
              </svg>
              +12% vs yesterday
            </div>
            <div className="reports-realtime-chart">
              {reportData.milkProduction.weeklyTrend.map((day, index) => (
                <div key={index} className="reports-mini-bar">
                  <div 
                    className="reports-bar-fill"
                    style={{ height: `${(day.volume / 2500) * 100}%` }}
                    title={`${day.day}: ${day.volume}L`}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          <div className="reports-realtime-card reports-quality-card">
            <div className="reports-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            </div>
            <div className="reports-realtime-header">
              <h5>Quality Score</h5>
              <span className="reports-quality-badge reports-grade-a">Grade A</span>
            </div>
            <div className="reports-realtime-value">94/100</div>
            <div className="reports-realtime-change reports-positive">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
                <polyline points="17,6 23,6 23,12"></polyline>
              </svg>
              +5% improvement
            </div>
            <div className="reports-quality-breakdown-mini">
              <div className="reports-quality-metric">
                <span>Fat: {reportData.quality.avgFatContent}</span>
                <div className="reports-metric-bar">
                  <div className="reports-bar-fill" style={{ width: '84%' }}></div>
                </div>
              </div>
              <div className="reports-quality-metric">
                <span>Protein: {reportData.quality.avgProteinContent}</span>
                <div className="reports-metric-bar">
                  <div className="reports-bar-fill" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="reports-realtime-card reports-efficiency-card">
            <div className="reports-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
            </div>
            <div className="reports-realtime-header">
              <h5>Efficiency Index</h5>
              <span className="reports-efficiency-status reports-good">Good</span>
            </div>
            <div className="reports-realtime-value">89%</div>
            <div className="reports-realtime-change reports-positive">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
                <polyline points="17,6 23,6 23,12"></polyline>
              </svg>
              +3% this week
            </div>
            <div className="reports-efficiency-meters">
              <div className="reports-meter">
                <div className="reports-meter-label">Feed</div>
                <div className="reports-meter-bar">
                  <div className="reports-meter-fill" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div className="reports-meter">
                <div className="reports-meter-label">Labor</div>
                <div className="reports-meter-bar">
                  <div className="reports-meter-fill" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="reports-realtime-card reports-revenue-card">
            <div className="reports-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div className="reports-realtime-header">
              <h5>Revenue Today</h5>
              <span className="reports-revenue-trend">📈 Trending Up</span>
            </div>
            <div className="reports-realtime-value">₹24,500</div>
            <div className="reports-realtime-change reports-positive">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
                <polyline points="17,6 23,6 23,12"></polyline>
              </svg>
              +8% vs target
            </div>
            <div className="reports-revenue-sources-mini">
              {reportData.revenue.revenueStreams.slice(0, 3).map((stream, index) => (
                <div key={index} className="reports-revenue-source-mini">
                  <span>{stream.source}</span>
                  <span>₹{(stream.amount / 30).toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Analytics Grid */}
      <div className="reports-analytics-grid">
        {/* Production Trend Analysis with Enhanced Metrics */}
        <div className="reports-analytics-card reports-production-analytics">
          <div className="reports-card-header">
            <h4>Production Trend Analysis</h4>
            <div className="reports-analytics-controls-mini">
              <select className="reports-mini-select">
                <option value="volume">Volume</option>
                <option value="quality">Quality</option>
                <option value="efficiency">Efficiency</option>
              </select>
            </div>
          </div>
          <div className="reports-trend-chart">
            <div className="reports-chart-container">
              {reportData.milkProduction.historicalData.map((item, index) => (
                <div key={index} className="reports-trend-bar">
                  <div 
                    className="reports-bar-fill reports-production-bar"
                    style={{ height: `${(item.value / 80000) * 100}%` }}
                    title={`${item.period}: ${formatNumber(item.value)}L, Quality: ${item.quality}%, Efficiency: ${item.efficiency}%`}
                  ></div>
                  <span className="reports-bar-label">{item.period}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="reports-trend-insights">
            <div className="reports-insight">
              <span className="reports-insight-label">Peak Month</span>
              <span className="reports-insight-value">June (75,200L)</span>
            </div>
            <div className="reports-insight">
              <span className="reports-insight-label">Growth Rate</span>
              <span className="reports-insight-value reports-positive">+12%</span>
            </div>
            <div className="reports-insight">
              <span className="reports-insight-label">Avg Quality</span>
              <span className="reports-insight-value">91.5%</span>
            </div>
            <div className="reports-insight">
              <span className="reports-insight-label">Efficiency</span>
              <span className="reports-insight-value">87.2%</span>
            </div>
          </div>
          <div className="reports-seasonal-analysis">
            <h5>Seasonal Performance</h5>
            <div className="reports-seasonal-grid">
              {Object.entries(reportData.milkProduction.seasonalAnalysis).map(([season, data]) => (
                <div key={season} className="reports-seasonal-item">
                  <div className="reports-season-name">{season.charAt(0).toUpperCase() + season.slice(1)}</div>
                  <div className="reports-season-production">{formatNumber(data.avgProduction)}L</div>
                  <div className="reports-season-quality">Q: {data.quality}%</div>
                  <div className="reports-season-efficiency">E: {data.efficiency}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Analysis & Benchmarking */}
        <div className="reports-analytics-card reports-market-analysis">
          <h4>Market Analysis & Benchmarking</h4>
          <div className="reports-benchmark-comparison">
            <div className="reports-benchmark-item">
              <div className="reports-benchmark-label">Industry Average</div>
              <div className="reports-benchmark-bar">
                <div className="reports-bar-fill reports-industry-bar" style={{ width: '65%' }}></div>
                <span className="reports-benchmark-value">{formatNumber(reportData.milkProduction.benchmarks.industryAverage)}L</span>
              </div>
            </div>
            <div className="reports-benchmark-item">
              <div className="reports-benchmark-label">Top Performers</div>
              <div className="reports-benchmark-bar">
                <div className="reports-bar-fill reports-top-performers-bar" style={{ width: '78%' }}></div>
                <span className="reports-benchmark-value">{formatNumber(reportData.milkProduction.benchmarks.topPerformers)}L</span>
              </div>
            </div>
            <div className="reports-benchmark-item">
              <div className="reports-benchmark-label">Our Performance</div>
              <div className="reports-benchmark-bar">
                <div className="reports-bar-fill reports-our-performance-bar" style={{ width: '73.5%' }}></div>
                <span className="reports-benchmark-value">{formatNumber(reportData.milkProduction.benchmarks.ourPerformance)}L</span>
              </div>
            </div>
          </div>
          <div className="reports-market-insights">
            <div className="reports-market-metric">
              <span className="reports-metric-label">Market Percentile</span>
              <span className="reports-metric-value">{reportData.milkProduction.benchmarks.percentile}th</span>
            </div>
            <div className="reports-market-metric">
              <span className="reports-metric-label">Competitive Position</span>
              <span className="reports-metric-value reports-positive">Above Average</span>
            </div>
          </div>
          <div className="reports-price-analysis">
            <h5>Price Analysis</h5>
            <div className="reports-price-grid">
              {Object.entries(reportData.marketAnalysis.currentPrices).map(([market, data]) => (
                <div key={market} className="reports-price-item">
                  <div className="reports-price-market">{market.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                  <div className="reports-price-value">₹{data.price}/L</div>
                  <div className={`reports-price-trend ${data.trend.startsWith('+') ? 'reports-positive' : 'reports-negative'}`}>
                    {data.trend}
                  </div>
                  <div className="reports-price-volume">{data.volume}L/day</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Quality Analytics */}
        <div className="reports-analytics-card reports-quality-analytics">
          <h4>Advanced Quality Analytics</h4>
          <div className="reports-quality-gauges">
            <div className="reports-gauge">
              <div className="reports-gauge-circle" style={{'--percentage': '92%'}}>
                <div className="reports-gauge-center">
                  <span className="reports-gauge-value">92%</span>
                  <span className="reports-gauge-label">Grade A</span>
                </div>
              </div>
            </div>
            <div className="reports-gauge">
              <div className="reports-gauge-circle" style={{'--percentage': '84%'}}>
                <div className="reports-gauge-center">
                  <span className="reports-gauge-value">4.2%</span>
                  <span className="reports-gauge-label">Fat Content</span>
                </div>
              </div>
            </div>
            <div className="reports-gauge">
              <div className="reports-gauge-circle" style={{'--percentage': '68%'}}>
                <div className="reports-gauge-center">
                  <span className="reports-gauge-value">3.4%</span>
                  <span className="reports-gauge-label">Protein</span>
                </div>
              </div>
            </div>
          </div>
          <div className="reports-quality-detailed">
            <h5>Detailed Quality Metrics</h5>
            <div className="reports-quality-metrics-grid">
              {Object.entries(reportData.quality.detailedMetrics).map(([metric, data]) => (
                <div key={metric} className="reports-quality-metric-item">
                  <div className="reports-metric-name">{metric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                  <div className="reports-metric-values">
                    <span className="reports-metric-current">{data.avg}%</span>
                    <span className="reports-metric-target">Target: {data.target}%</span>
                  </div>
                  <div className="reports-metric-range">
                    <div className="reports-range-bar">
                      <div className="reports-range-fill" style={{ 
                        left: `${((data.min - data.target + 1) / 2) * 100}%`,
                        width: `${((data.max - data.min) / 2) * 100}%`
                      }}></div>
                      <div className="reports-current-marker" style={{ 
                        left: `${((data.avg - data.target + 1) / 2) * 100}%`
                      }}></div>
                    </div>
                    <div className="reports-range-labels">
                      <span>{data.min}</span>
                      <span>{data.max}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reports-microbiological">
            <h5>Microbiological Analysis</h5>
            <div className="reports-micro-grid">
              {Object.entries(reportData.quality.microbiological).map(([test, data]) => (
                <div key={test} className="reports-micro-item">
                  <div className="reports-micro-name">{test.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                  <div className="reports-micro-value">{formatNumber(data.value)} {data.unit}</div>
                  <div className="reports-micro-limit">Limit: {formatNumber(data.limit)} {data.unit}</div>
                  <div className={`reports-micro-status reports-status-${data.status.toLowerCase()}`}>{data.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI-Powered Predictive Analytics */}
        <div className="reports-analytics-card reports-predictions-card">
          <h4>AI-Powered Predictive Analytics</h4>
          <div className="reports-predictions">
            <div className="reports-prediction-item">
              <div className="reports-prediction-icon">📈</div>
              <div className="reports-prediction-content">
                <div className="reports-prediction-title">Next Month Production</div>
                <div className="reports-prediction-value">{reportData.predictions.nextMonthProduction}</div>
                <div className="reports-prediction-confidence">Confidence: {reportData.predictions.confidence}</div>
                <div className="reports-prediction-factors">
                  <span>Key factors: Weather, Feed quality, Cattle health</span>
                </div>
              </div>
            </div>
            <div className="reports-prediction-item">
              <div className="reports-prediction-icon">💰</div>
              <div className="reports-prediction-content">
                <div className="reports-prediction-title">Expected Revenue</div>
                <div className="reports-prediction-value">{reportData.predictions.expectedRevenue}</div>
                <div className="reports-prediction-confidence">Confidence: 82%</div>
                <div className="reports-prediction-factors">
                  <span>Based on: Market trends, Production forecast</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="reports-demand-forecasting">
            <h5>Demand Forecasting</h5>
            <div className="reports-forecast-grid">
              {Object.entries(reportData.predictions.advancedAnalytics.demandForecasting).map(([period, data]) => (
                <div key={period} className="reports-forecast-item">
                  <div className="reports-forecast-period">{period.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                  <div className="reports-forecast-demand">{formatNumber(data.demand)}L</div>
                  <div className="reports-forecast-confidence">{data.confidence}% confidence</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reports-price-projections">
            <h5>Price Projections</h5>
            <div className="reports-projections-grid">
              {Object.entries(reportData.predictions.advancedAnalytics.priceProjections).map(([item, data]) => (
                <div key={item} className="reports-projection-item">
                  <div className="reports-projection-name">{item.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                  <div className="reports-projection-values">
                    <span className="reports-current-price">₹{data.current}</span>
                    <span className="reports-projected-price">→ ₹{data.projected}</span>
                  </div>
                  <div className={`reports-projection-change ${data.change.startsWith('+') ? 'reports-positive' : 'reports-negative'}`}>
                    {data.change}
                  </div>
                  <div className="reports-projection-timeframe">{data.timeframe}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reports-recommendations">
            <h5>AI Recommendations</h5>
            <div className="reports-recommendations-grid">
              {reportData.predictions.advancedAnalytics.optimizationSuggestions.map((suggestion, index) => (
                <div key={index} className="reports-recommendation-item">
                  <div className="reports-recommendation-category">{suggestion.category}</div>
                  <div className="reports-recommendation-text">{suggestion.suggestion}</div>
                  <div className="reports-recommendation-impact">{suggestion.impact}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Analysis Dashboard */}
        <div className="reports-analytics-card reports-risk-analysis">
          <h4>Risk Analysis Dashboard</h4>
          <div className="reports-risk-grid">
            {Object.entries(reportData.predictions.advancedAnalytics.riskAnalysis).map(([risk, data]) => (
              <div key={risk} className="reports-risk-item">
                <div className="reports-risk-header">
                  <div className="reports-risk-name">{risk.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                  <div className={`reports-risk-level reports-risk-${data.level.toLowerCase()}`}>{data.level}</div>
                </div>
                <div className="reports-risk-impact">{data.impact}</div>
                <div className="reports-risk-mitigation">
                  <strong>Mitigation:</strong> {data.mitigation}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability Metrics */}
        <div className="reports-analytics-card reports-sustainability">
          <h4>Sustainability Metrics</h4>
          <div className="reports-sustainability-overview">
            <div className="reports-carbon-footprint">
              <h5>Carbon Footprint</h5>
              <div className="reports-carbon-total">
                <span className="reports-carbon-value">{reportData.sustainability.carbonFootprint.total}</span>
                <span className="reports-carbon-unit">{reportData.sustainability.carbonFootprint.unit}</span>
                <span className="reports-carbon-trend reports-positive">{reportData.sustainability.carbonFootprint.reduction}</span>
              </div>
              <div className="reports-carbon-breakdown">
                {Object.entries(reportData.sustainability.carbonFootprint.breakdown).map(([source, value]) => (
                  <div key={source} className="reports-carbon-item">
                    <span className="reports-carbon-source">{source.charAt(0).toUpperCase() + source.slice(1)}</span>
                    <div className="reports-carbon-bar">
                      <div className="reports-bar-fill" style={{ width: `${(value / 1.5) * 100}%` }}></div>
                    </div>
                    <span className="reports-carbon-amount">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="reports-water-usage">
              <h5>Water Usage Efficiency</h5>
              <div className="reports-water-total">
                <span className="reports-water-value">{reportData.sustainability.waterUsage.total}</span>
                <span className="reports-water-unit">{reportData.sustainability.waterUsage.unit}</span>
                <span className="reports-water-trend reports-positive">{reportData.sustainability.waterUsage.efficiency}</span>
              </div>
              <div className="reports-water-breakdown">
                {Object.entries(reportData.sustainability.waterUsage.breakdown).map(([usage, value]) => (
                  <div key={usage} className="reports-water-item">
                    <span className="reports-water-usage">{usage.charAt(0).toUpperCase() + usage.slice(1)}</span>
                    <div className="reports-water-bar">
                      <div className="reports-bar-fill" style={{ width: `${(value / 50) * 100}%` }}></div>
                    </div>
                    <span className="reports-water-amount">{value}L</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reports-waste-management">
              <h5>Waste Management & Revenue</h5>
              <div className="reports-waste-grid">
                {Object.entries(reportData.sustainability.wasteManagement).map(([waste, data]) => (
                  <div key={waste} className="reports-waste-item">
                    <div className="reports-waste-type">{waste.charAt(0).toUpperCase() + waste.slice(1)}</div>
                    <div className="reports-waste-amount">{data.production || data.amount} {data.unit}</div>
                    <div className="reports-waste-utilization">
                      {data.utilization && `${data.utilization}% utilized`}
                    </div>
                    <div className="reports-waste-revenue">₹{data.revenue || data.sales || data.profit}/month</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Detailed Reports Section
  const renderDetailedReports = () => (
    <div className="reports-detailed-reports">
      <div className="reports-reports-header">
        <h3 className="reports-section-title">Detailed Reports</h3>
        <div className="reports-report-filters">
          <input type="date" className="reports-date-input" />
          <select className="reports-category-filter">
            <option value="all">All Categories</option>
            <option value="production">Production</option>
            <option value="cattle">Cattle</option>
            <option value="financial">Financial</option>
            <option value="quality">Quality</option>
          </select>
          <button className="reports-filter-btn">Apply Filters</button>
        </div>
      </div>

      <div className="reports-reports-grid">
        {/* Production Analysis */}
        <div className="reports-report-section">
          <div className="reports-section-header">
            <h4>Production Analysis</h4>
            <button className="reports-export-btn" onClick={() => handleExport('production-detailed', 'pdf')}>
              Export PDF
            </button>
          </div>
          <div className="reports-metrics-table">
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Current</th>
                  <th>Previous</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Daily Average</td>
                  <td>2,450 L</td>
                  <td>2,180 L</td>
                  <td className="reports-positive">+12.4%</td>
                </tr>
                <tr>
                  <td>Quality Grade A</td>
                  <td>92%</td>
                  <td>87%</td>
                  <td className="reports-positive">+5.7%</td>
                </tr>
                <tr>
                  <td>Fat Content</td>
                  <td>4.2%</td>
                  <td>4.1%</td>
                  <td className="reports-positive">+2.4%</td>
                </tr>
                <tr>
                  <td>Rejection Rate</td>
                  <td>0.8%</td>
                  <td>1.2%</td>
                  <td className="reports-positive">-33.3%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Financial Performance */}
        <div className="reports-report-section">
          <div className="reports-section-header">
            <h4>Financial Performance</h4>
            <button className="reports-export-btn" onClick={() => handleExport('financial-detailed', 'excel')}>
              Export Excel
            </button>
          </div>
          <div className="reports-financial-summary">
            <div className="reports-summary-item">
              <span className="reports-label">Total Revenue</span>
              <span className="reports-value">₹7,35,000</span>
            </div>
            <div className="reports-summary-item">
              <span className="reports-label">Total Expenses</span>
              <span className="reports-value">₹5,00,000</span>
            </div>
            <div className="reports-summary-item">
              <span className="reports-label">Net Profit</span>
              <span className="reports-value reports-positive">₹2,35,000</span>
            </div>
            <div className="reports-summary-item">
              <span className="reports-label">Profit Margin</span>
              <span className="reports-value reports-positive">32%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Available metrics for custom reports
  const availableMetrics = [
    { id: 'production', label: 'Milk Production' },
    { id: 'revenue', label: 'Revenue Analysis' },
    { id: 'cattle', label: 'Cattle Management' },
    { id: 'quality', label: 'Quality Metrics' },
    { id: 'efficiency', label: 'Operational Efficiency' }
  ];

  const handleMetricToggle = (metricId) => {
    setCustomConfig(prev => ({
      ...prev,
      metrics: prev.metrics.includes(metricId)
        ? prev.metrics.filter(id => id !== metricId)
        : [...prev.metrics, metricId]
    }));
  };

  // Custom Reports Builder
  const renderCustomReports = () => {

    return (
      <div className="reports-custom-reports">
        <div className="reports-custom-header">
          <h3 className="reports-section-title">Custom Report Builder</h3>
          <p>Create personalized reports with your preferred metrics and format</p>
        </div>

        <div className="reports-report-builder">
          <div className="reports-builder-section">
            <h4>Report Configuration</h4>
            <div className="reports-config-form">
              <div className="reports-form-group">
                <label>Report Title</label>
                <input 
                  type="text" 
                  value={customConfig.title}
                  onChange={(e) => setCustomConfig(prev => ({...prev, title: e.target.value}))}
                  placeholder="Enter report title"
                />
              </div>

              <div className="reports-form-group">
                <label>Select Metrics</label>
                <div className="reports-metrics-selector">
                  {availableMetrics.map(metric => (
                    <label key={metric.id} className="reports-checkbox-label">
                      <input 
                        type="checkbox"
                        checked={customConfig.metrics.includes(metric.id)}
                        onChange={() => handleMetricToggle(metric.id)}
                      />
                      <span className="reports-checkmark"></span>
                      {metric.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="reports-form-group">
                <label>Date Range</label>
                <select 
                  value={customConfig.dateRange}
                  onChange={(e) => setCustomConfig(prev => ({...prev, dateRange: e.target.value}))}
                >
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="year">Last Year</option>
                </select>
              </div>

              <div className="reports-form-group">
                <label>Export Format</label>
                <div className="reports-format-selector">
                  {['pdf', 'excel', 'csv'].map(format => (
                    <label key={format} className="reports-radio-label">
                      <input 
                        type="radio"
                        name="format"
                        value={format}
                        checked={customConfig.format === format}
                        onChange={(e) => setCustomConfig(prev => ({...prev, format: e.target.value}))}
                      />
                      <span className="reports-radio-mark"></span>
                      {format.toUpperCase()}
                    </label>
                  ))}
                </div>
              </div>

              <div className="reports-form-actions">
                <button className="reports-preview-btn">Preview Report</button>
                <button 
                  className="reports-generate-btn"
                  onClick={() => handleExport('custom', customConfig.format)}
                >
                  Generate Report
                </button>
              </div>
            </div>
          </div>

          <div className="reports-preview-section">
            <h4>Report Preview</h4>
            <div className="reports-preview-container">
              {customConfig.title ? (
                <div className="reports-preview-content">
                  <div className="reports-preview-header">
                    <h5>{customConfig.title}</h5>
                    <p>Date Range: {customConfig.dateRange}</p>
                  </div>
                  <div className="reports-preview-metrics">
                    {customConfig.metrics.length > 0 ? (
                      customConfig.metrics.map(metricId => {
                        const metric = availableMetrics.find(m => m.id === metricId);
                        return (
                          <div key={metricId} className="reports-preview-metric">
                            <h6>{metric.label}</h6>
                            <p>Sample data for {metric.label.toLowerCase()}</p>
                          </div>
                        );
                      })
                    ) : (
                      <p className="reports-no-metrics">Select metrics to see preview</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="reports-no-preview">
                  <p>Enter a report title to see preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Tab navigation data
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'detailed', label: 'Detailed Reports', icon: '📋' },
    { id: 'custom', label: 'Custom Reports', icon: '🛠️' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'analytics':
        return renderAnalytics();
      case 'detailed':
        return renderDetailedReports();
      case 'custom':
        return renderCustomReports();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="page-container reports reports-enhanced">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="reports-loading-overlay">
          <div className="reports-loading-spinner"></div>
          <p>Generating report...</p>
        </div>
      )}

      {/* Enhanced Header */}
      <div className="page-header reports-enhanced-header">
        <div className="header-content">
          <div className="reports-header-title">
            <h1>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10,9 9,9 8,9"></polyline>
              </svg>
              Reports & Analytics
            </h1>
            <p>Comprehensive insights and analytics for your dairy farm operations</p>
          </div>
          <div className="reports-header-actions">
            <button className="reports-header-btn" onClick={handleRefresh}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23,4 23,10 17,10"></polyline>
                <polyline points="1,20 1,14 7,14"></polyline>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
              </svg>
              Refresh
            </button>
            <button className="reports-header-btn" onClick={() => handleExport('summary', 'pdf')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7,10 12,15 17,10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="reports-navigation">
        <div className="reports-nav-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`reports-nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="reports-tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="reports-tab-content">
        {renderTabContent()}
      </div>

      {/* Quick Report Modal */}
      {renderQuickReportModal()}
    </div>
  );
}

export default Reports;