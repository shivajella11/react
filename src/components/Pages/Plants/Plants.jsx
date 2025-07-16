import React, { useState, useEffect, useCallback } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  ReferenceLine
} from 'recharts';
import './Plants.css';

function Plants() {
  // State Management
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [plantData, setPlantData] = useState({
    efficiency: 87.5,
    alerts: 2,
    uptime: 94.2,
    quality: 96.8
  });
  const [preferences, setPreferences] = useState({
    alertThreshold: 85,
    autoRefresh: true
  });
  const [activeAlerts, setActiveAlerts] = useState([
    { 
      id: 1, 
      severity: 'critical', 
      message: 'Pasteurizer Unit temperature exceeding safe limits', 
      time: '5 minutes ago',
      plant: 'Central Processing Plant',
      equipment: 'Pasteurizer Unit',
      action: 'immediate',
      resolved: false
    },
    { 
      id: 2, 
      severity: 'warning', 
      message: 'Separator Unit requires maintenance within 24 hours', 
      time: '2 hours ago',
      plant: 'North Valley Plant',
      equipment: 'Separator Unit',
      action: 'schedule',
      resolved: false
    },
    { 
      id: 3, 
      severity: 'info', 
      message: 'Scheduled maintenance completed successfully', 
      time: '1 day ago',
      plant: 'Mountain View Plant',
      equipment: 'Packaging Line',
      action: 'none',
      resolved: true
    },
    { 
      id: 4, 
      severity: 'warning', 
      message: 'Quality metrics below target threshold', 
      time: '3 hours ago',
      plant: 'Central Processing Plant',
      equipment: 'Quality Control',
      action: 'review',
      resolved: false
    },
    { 
      id: 5, 
      severity: 'info', 
      message: 'Butter Churning System operating at optimal efficiency', 
      time: '25 minutes ago',
      plant: 'Butter & Cream Production Plant',
      equipment: 'Butter Churning System',
      action: 'none',
      resolved: false
    },
    { 
      id: 6, 
      severity: 'warning', 
      message: 'Temperature Control System requires calibration', 
      time: '45 minutes ago',
      plant: 'Butter & Cream Production Plant',
      equipment: 'Temperature Control System',
      action: 'calibrate',
      resolved: false
    },

  ]);
  const [timeFilter, setTimeFilter] = useState('Week');
  const [inputOutputTimeFilter, setInputOutputTimeFilter] = useState('Month');
  const [activeChartSection, setActiveChartSection] = useState('inputOutput');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingPlant, setEditingPlant] = useState(null);
  const [showMonitorModal, setShowMonitorModal] = useState(false);
  const [monitoringPlant, setMonitoringPlant] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [updatedPlantId, setUpdatedPlantId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showQuickActionModal, setShowQuickActionModal] = useState(false);
  const [selectedQuickAction, setSelectedQuickAction] = useState(null);
  const [equipmentFilter, setEquipmentFilter] = useState('all');
  const [alertFilter, setAlertFilter] = useState('all');
  const [showAlertDetails, setShowAlertDetails] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Sample Data - Now using state so changes can be reflected
  const [plants, setPlants] = useState([
    {
      id: 1,
      name: 'Main Processing Plant',
      location: 'Industrial Area, Zone A',
      capacity: 50000,
      currentProduction: 42000,
      efficiency: 84,
      status: 'operational',
      equipment: [
        { name: 'Pasteurizer Unit 1', status: 'operational', efficiency: 92 },
        { name: 'Pasteurizer Unit 2', status: 'operational', efficiency: 88 },
        { name: 'Separator Unit', status: 'maintenance', efficiency: 0 },
        { name: 'Packaging Line A', status: 'operational', efficiency: 95 },
        { name: 'Packaging Line B', status: 'operational', efficiency: 91 }
      ],
      metrics: {
        powerConsumption: 2400,
        waterUsage: 15000,
        wasteGenerated: 800,
        qualityScore: 94
      }
    },
    {
      id: 2,
      name: 'Secondary Plant',
      location: 'Green Valley, Zone B',
      capacity: 30000,
      currentProduction: 28500,
      efficiency: 95,
      status: 'operational',
      equipment: [
        { name: 'Pasteurizer Unit', status: 'operational', efficiency: 96 },
        { name: 'Cream Separator', status: 'operational', efficiency: 94 },
        { name: 'Packaging Line', status: 'operational', efficiency: 98 }
      ],
      metrics: {
        powerConsumption: 1800,
        waterUsage: 12000,
        wasteGenerated: 600,
        qualityScore: 96
      }
    },
    {
      id: 3,
      name: 'Cheese Production Plant',
      location: 'Farm District, Zone C',
      capacity: 15000,
      currentProduction: 12000,
      efficiency: 80,
      status: 'maintenance',
      equipment: [
        { name: 'Cheese Vat 1', status: 'operational', efficiency: 85 },
        { name: 'Cheese Vat 2', status: 'maintenance', efficiency: 0 },
        { name: 'Aging Chamber', status: 'operational', efficiency: 90 },
        { name: 'Packaging Unit', status: 'operational', efficiency: 88 }
      ],
      metrics: {
        powerConsumption: 1200,
        waterUsage: 8000,
        wasteGenerated: 400,
        qualityScore: 89
      }
    },
    {
      id: 4,
      name: 'Butter & Cream Production Plant',
      location: 'Farm District, Zone D',
      capacity: 20000,
      currentProduction: 18500,
      efficiency: 92,
      status: 'operational',
      equipment: [
        { name: 'Cream Separator Unit', status: 'operational', efficiency: 94 },
        { name: 'Butter Churning System', status: 'operational', efficiency: 91 },
        { name: 'Whipped Cream Line', status: 'operational', efficiency: 88 },
        { name: 'Temperature Control System', status: 'operational', efficiency: 96 },
        { name: 'Packaging & Sealing Unit', status: 'operational', efficiency: 89 }
      ],
      metrics: {
        powerConsumption: 1600,
        waterUsage: 9800,
        wasteGenerated: 350,
        qualityScore: 94
      }
    },

  ]);

  // Chart Data with time filtering
  const getPerformanceData = () => {
    const dailyData = [
      { period: 'Mon', input: 120, output: 110, efficiency: 91.7, waste: 10, quality: 94.2, uptime: 98.5, target: 90 },
      { period: 'Tue', input: 135, output: 125, efficiency: 92.6, waste: 10, quality: 95.1, uptime: 97.8, target: 90 },
      { period: 'Wed', input: 140, output: 128, efficiency: 91.4, waste: 12, quality: 93.8, uptime: 96.2, target: 90 },
      { period: 'Thu', input: 125, output: 115, efficiency: 92.0, waste: 10, quality: 94.7, uptime: 98.1, target: 90 },
      { period: 'Fri', input: 150, output: 138, efficiency: 92.0, waste: 12, quality: 95.3, uptime: 97.5, target: 90 },
      { period: 'Sat', input: 110, output: 102, efficiency: 92.7, waste: 8, quality: 96.1, uptime: 99.2, target: 90 },
      { period: 'Sun', input: 100, output: 92, efficiency: 92.0, waste: 8, quality: 94.9, uptime: 98.8, target: 90 }
    ];

    const weeklyData = [
      { period: 'Week 1', input: 850, output: 780, efficiency: 91.8, waste: 70, quality: 94.5, uptime: 97.8, target: 92 },
      { period: 'Week 2', input: 920, output: 845, efficiency: 91.8, waste: 75, quality: 95.2, uptime: 98.1, target: 92 },
      { period: 'Week 3', input: 880, output: 810, efficiency: 92.0, waste: 70, quality: 94.8, uptime: 97.5, target: 92 },
      { period: 'Week 4', input: 950, output: 875, efficiency: 92.1, waste: 75, quality: 95.7, uptime: 98.3, target: 92 }
    ];

    const monthlyData = [
      { period: 'Jan', input: 3600, output: 3310, efficiency: 91.9, waste: 290, quality: 94.2, uptime: 97.8, target: 93 },
      { period: 'Feb', input: 3400, output: 3130, efficiency: 92.1, waste: 270, quality: 95.1, uptime: 98.2, target: 93 },
      { period: 'Mar', input: 3800, output: 3500, efficiency: 92.1, waste: 300, quality: 94.8, uptime: 97.9, target: 93 },
      { period: 'Apr', input: 3650, output: 3360, efficiency: 92.1, waste: 290, quality: 95.3, uptime: 98.1, target: 93 },
      { period: 'May', input: 3750, output: 3450, efficiency: 92.0, waste: 300, quality: 94.7, uptime: 97.6, target: 93 },
      { period: 'Jun', input: 3550, output: 3270, efficiency: 92.1, waste: 280, quality: 95.5, uptime: 98.4, target: 93 },
      { period: 'Jul', input: 3900, output: 3590, efficiency: 92.1, waste: 310, quality: 94.9, uptime: 97.8, target: 93 },
      { period: 'Aug', input: 3700, output: 3410, efficiency: 92.2, waste: 290, quality: 95.8, uptime: 98.6, target: 93 },
      { period: 'Sep', input: 3650, output: 3360, efficiency: 92.1, waste: 290, quality: 94.6, uptime: 97.7, target: 93 },
      { period: 'Oct', input: 3800, output: 3500, efficiency: 92.1, waste: 300, quality: 95.2, uptime: 98.0, target: 93 },
      { period: 'Nov', input: 3600, output: 3310, efficiency: 91.9, waste: 290, quality: 94.4, uptime: 97.5, target: 93 },
      { period: 'Dec', input: 3750, output: 3450, efficiency: 92.0, waste: 300, quality: 95.0, uptime: 98.2, target: 93 }
    ];

    const yearlyData = [
      { period: '2020', input: 42000, output: 38640, efficiency: 92.0, waste: 3360, quality: 93.8, uptime: 96.5, target: 94 },
      { period: '2021', input: 44500, output: 41005, efficiency: 92.1, waste: 3495, quality: 94.2, uptime: 97.1, target: 94 },
      { period: '2022', input: 43800, output: 40314, efficiency: 92.0, waste: 3486, quality: 94.8, uptime: 97.8, target: 94 },
      { period: '2023', input: 45200, output: 41684, efficiency: 92.2, waste: 3516, quality: 95.1, uptime: 98.2, target: 94 },
      { period: '2024', input: 44100, output: 40652, efficiency: 92.2, waste: 3448, quality: 95.4, uptime: 98.5, target: 94 }
    ];

    switch(timeFilter) {
      case 'Day': return dailyData;
      case 'Week': return weeklyData;
      case 'Month': return monthlyData;
      case 'Year': return yearlyData;
      default: return dailyData;
    }
  };

  const getInputOutputData = () => {
    const dailyData = [
      { period: 'Mon', input: 120, output: 110, efficiency: 91.7, waste: 10 },
      { period: 'Tue', input: 135, output: 125, efficiency: 92.6, waste: 10 },
      { period: 'Wed', input: 140, output: 128, efficiency: 91.4, waste: 12 },
      { period: 'Thu', input: 125, output: 115, efficiency: 92.0, waste: 10 },
      { period: 'Fri', input: 150, output: 138, efficiency: 92.0, waste: 12 },
      { period: 'Sat', input: 110, output: 102, efficiency: 92.7, waste: 8 },
      { period: 'Sun', input: 100, output: 92, efficiency: 92.0, waste: 8 }
    ];

    const weeklyData = [
      { period: 'Week 1', input: 850, output: 780, efficiency: 91.8, waste: 70 },
      { period: 'Week 2', input: 920, output: 845, efficiency: 91.8, waste: 75 },
      { period: 'Week 3', input: 880, output: 810, efficiency: 92.0, waste: 70 },
      { period: 'Week 4', input: 950, output: 875, efficiency: 92.1, waste: 75 }
    ];

    const monthlyData = [
      { period: 'Jan', input: 3600, output: 3310, efficiency: 91.9, waste: 290 },
      { period: 'Feb', input: 3400, output: 3130, efficiency: 92.1, waste: 270 },
      { period: 'Mar', input: 3800, output: 3500, efficiency: 92.1, waste: 300 },
      { period: 'Apr', input: 3650, output: 3360, efficiency: 92.1, waste: 290 },
      { period: 'May', input: 3750, output: 3450, efficiency: 92.0, waste: 300 },
      { period: 'Jun', input: 3550, output: 3270, efficiency: 92.1, waste: 280 },
      { period: 'Jul', input: 3900, output: 3590, efficiency: 92.1, waste: 310 },
      { period: 'Aug', input: 3700, output: 3410, efficiency: 92.2, waste: 290 },
      { period: 'Sep', input: 3650, output: 3360, efficiency: 92.1, waste: 290 },
      { period: 'Oct', input: 3800, output: 3500, efficiency: 92.1, waste: 300 },
      { period: 'Nov', input: 3600, output: 3310, efficiency: 91.9, waste: 290 },
      { period: 'Dec', input: 3750, output: 3450, efficiency: 92.0, waste: 300 }
    ];

    switch(inputOutputTimeFilter) {
      case 'Day': return dailyData;
      case 'Week': return weeklyData;
      case 'Month': return monthlyData;
      default: return monthlyData;
    }
  };

  const getProductData = () => {
    const dailyProducts = [
      { name: 'Whole Milk', output: 450, color: '#4FC3F7' },
      { name: 'Skim Milk', output: 320, color: '#81C784' },
      { name: 'Cheese', output: 180, color: '#FFB74D' },
      { name: 'Yogurt', output: 150, color: '#F06292' },
      { name: 'Butter', output: 80, color: '#BA68C8' }
    ];

    const weeklyProducts = [
      { name: 'Whole Milk', output: 3150, color: '#4FC3F7' },
      { name: 'Skim Milk', output: 2240, color: '#81C784' },
      { name: 'Cheese', output: 1260, color: '#FFB74D' },
      { name: 'Yogurt', output: 1050, color: '#F06292' },
      { name: 'Butter', output: 560, color: '#BA68C8' }
    ];

    const monthlyProducts = [
      { name: 'Whole Milk', output: 13500, color: '#4FC3F7' },
      { name: 'Skim Milk', output: 9600, color: '#81C784' },
      { name: 'Cheese', output: 5400, color: '#FFB74D' },
      { name: 'Yogurt', output: 4500, color: '#F06292' },
      { name: 'Butter', output: 2400, color: '#BA68C8' }
    ];

    switch(timeFilter) {
      case 'Day': return dailyProducts;
      case 'Week': return weeklyProducts;
      case 'Month': return monthlyProducts;
      default: return dailyProducts;
    }
  };

  const performanceData = getPerformanceData();
  const inputOutputData = getInputOutputData();
  const productTypes = getProductData();

  const equipmentStatus = [
    { name: 'Pasteurizer A', status: 'operational', efficiency: 95 },
    { name: 'Pasteurizer B', status: 'operational', efficiency: 92 },
    { name: 'Separator', status: 'maintenance', efficiency: 0 },
    { name: 'Packaging Line 1', status: 'operational', efficiency: 98 },
    { name: 'Packaging Line 2', status: 'operational', efficiency: 94 },
    { name: 'Cooling System', status: 'operational', efficiency: 89 }
  ];

  // Helper Functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return '#27ae60';
      case 'maintenance': return '#f39c12';
      case 'offline': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return '#27ae60';
    if (efficiency >= 70) return '#f39c12';
    return '#e74c3c';
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#e74c3c';
      case 'warning': return '#f39c12';
      case 'info': return '#3498db';
      default: return '#95a5a6';
    }
  };

  const getEfficiencyStatus = (efficiency) => {
    if (efficiency >= 95) return { status: 'excellent', color: '#27ae60' };
    if (efficiency >= 85) return { status: 'good', color: '#2ecc71' };
    if (efficiency >= 70) return { status: 'average', color: '#f39c12' };
    return { status: 'poor', color: '#e74c3c' };
  };

  const calculateTotalProduction = () => {
    return getProductData().reduce((sum, product) => sum + product.output, 0);
  };

  // Event Handlers
  const handleTimeFilterChange = useCallback((filter) => {
    setTimeFilter(filter);
  }, []);

  const handleInputOutputTimeFilterChange = useCallback((filter) => {
    setInputOutputTimeFilter(filter);
  }, []);

  const handleChartSectionChange = useCallback((section) => {
    setActiveChartSection(section);
  }, []);

  const handleEditPlant = useCallback((plant) => {
    setEditingPlant(plant);
    setEditFormData({
      name: plant.name,
      location: plant.location,
      capacity: plant.capacity,
      status: plant.status
    });
    setShowEditForm(true);
  }, []);

  const handleMonitorPlant = useCallback((plant) => {
    setMonitoringPlant(plant);
    setShowMonitorModal(true);
  }, []);

  const handleSaveEdit = useCallback(() => {
    // Validation
    if (!editFormData.name || !editFormData.location || !editFormData.capacity || !editFormData.status) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    if (editFormData.capacity < 1000) {
      showNotification('Capacity must be at least 1000 liters', 'error');
      return;
    }

    // Update the plants state with the new data
    setPlants(prevPlants => 
      prevPlants.map(plant => 
        plant.id === editingPlant.id 
          ? { 
              ...plant, 
              name: editFormData.name,
              location: editFormData.location,
              capacity: editFormData.capacity,
              status: editFormData.status
            }
          : plant
      )
    );

    // Show update animation
    setUpdatedPlantId(editingPlant.id);
    setTimeout(() => setUpdatedPlantId(null), 2000);

    // Here you would typically make an API call to save the changes
    console.log('Saving plant data:', editFormData);
    
    // Show success notification
    showNotification(`✅ Plant "${editFormData.name}" updated successfully!`, 'success');
    
    setShowEditForm(false);
    setEditingPlant(null);
    setEditFormData({});
  }, [editFormData, editingPlant]);

  const handleFormChange = useCallback((field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const handleRefreshData = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setPlantData(prev => ({
        ...prev,
        efficiency: Math.random() * 10 + 85,
        alerts: Math.floor(Math.random() * 5),
        uptime: Math.random() * 5 + 90,
        quality: Math.random() * 5 + 92
      }));
      setLoading(false);
    }, 1000);
  }, []);

  // Alert Management Functions
  const dismissAlert = useCallback((alertId) => {
    setActiveAlerts(prev => prev.filter(alert => alert.id !== alertId));
    showNotification('Alert dismissed successfully', 'success');
  }, []);

  const resolveAlert = useCallback((alertId) => {
    setActiveAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
    showNotification('Alert marked as resolved', 'success');
  }, []);

  const viewAlertDetails = useCallback((alert) => {
    setSelectedAlert(alert);
    setShowAlertDetails(true);
  }, []);

  const addNewAlert = useCallback((severity, message, plant, equipment) => {
    const newAlert = {
      id: Date.now(),
      severity,
      message,
      time: 'Just now',
      plant,
      equipment,
      action: severity === 'critical' ? 'immediate' : severity === 'warning' ? 'schedule' : 'none',
      resolved: false
    };
    setActiveAlerts(prev => [newAlert, ...prev]);
    showNotification(`New ${severity} alert added`, 'info');
  }, []);

  // Quick Actions Functions
  const handleQuickAction = useCallback((actionType) => {
    setSelectedQuickAction(actionType);
    setShowQuickActionModal(true);
  }, []);

  const executeQuickAction = useCallback((actionType, data) => {
    switch(actionType) {
      case 'generateReport':
        console.log('Generating report...', data);
        showNotification('📊 Report generation started', 'success');
        break;
      case 'scheduleMaintenance':
        console.log('Scheduling maintenance...', data);
        addNewAlert('info', `Maintenance scheduled for ${data.equipment} on ${data.date}`, data.plant, data.equipment);
        showNotification('🔧 Maintenance scheduled successfully', 'success');
        break;
      case 'adjustTargets':
        console.log('Adjusting targets...', data);
        setPreferences(prev => ({ ...prev, alertThreshold: data.threshold }));
        showNotification('🎯 Targets adjusted successfully', 'success');
        break;
      case 'viewInventory':
        console.log('Opening inventory...', data);
        showNotification('📦 Opening inventory management', 'info');
        break;
      case 'teamOverview':
        console.log('Opening team overview...', data);
        showNotification('👥 Opening team overview', 'info');
        break;
      case 'preferences':
        console.log('Opening preferences...', data);
        showNotification('⚙️ Opening preferences', 'info');
        break;
      default:
        showNotification('Action not implemented yet', 'warning');
    }
    setShowQuickActionModal(false);
    setSelectedQuickAction(null);
  }, [addNewAlert]);

  // Equipment Status Functions
  const getEquipmentByStatus = useCallback((status) => {
    const allEquipment = plants.flatMap(plant => 
      plant.equipment.map(equip => ({
        ...equip,
        plantName: plant.name,
        plantId: plant.id
      }))
    );
    
    if (status === 'all') return allEquipment;
    return allEquipment.filter(equip => equip.status === status);
  }, [plants]);

  const updateEquipmentStatus = useCallback((plantId, equipmentName, newStatus, newEfficiency) => {
    setPlants(prev => prev.map(plant => 
      plant.id === plantId ? {
        ...plant,
        equipment: plant.equipment.map(equip =>
          equip.name === equipmentName ? {
            ...equip,
            status: newStatus,
            efficiency: newEfficiency || equip.efficiency
          } : equip
        )
      } : plant
    ));
    
    showNotification(`Equipment status updated: ${equipmentName}`, 'success');
    
    // Add alert if equipment goes to maintenance or offline
    if (newStatus === 'maintenance' || newStatus === 'offline') {
      const plant = plants.find(p => p.id === plantId);
      addNewAlert(
        newStatus === 'offline' ? 'critical' : 'warning',
        `${equipmentName} is now ${newStatus}`,
        plant?.name || 'Unknown Plant',
        equipmentName
      );
    }
  }, [plants, addNewAlert]);

  const getEquipmentStatusSummary = useCallback(() => {
    const allEquipment = plants.flatMap(plant => plant.equipment);
    const total = allEquipment.length;
    const operational = allEquipment.filter(e => e.status === 'operational').length;
    const maintenance = allEquipment.filter(e => e.status === 'maintenance').length;
    const offline = allEquipment.filter(e => e.status === 'offline').length;
    const avgEfficiency = allEquipment.reduce((sum, e) => sum + e.efficiency, 0) / total;
    
    return { total, operational, maintenance, offline, avgEfficiency };
  }, [plants]);

  const toggleDarkMode = useCallback(() => {
    setPreferences(prev => ({ ...prev, darkMode: !prev.darkMode }));
  }, []);

  // Effects
  useEffect(() => {
    if (preferences.autoRefresh) {
      const interval = setInterval(() => {
        setPlantData(prev => ({
          ...prev,
          efficiency: Math.max(80, Math.min(100, prev.efficiency + (Math.random() - 0.5) * 2))
        }));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [preferences.autoRefresh]);

  // Calculations
  const totalCapacity = plants.reduce((sum, plant) => sum + plant.capacity, 0);
  const totalProduction = plants.reduce((sum, plant) => sum + plant.currentProduction, 0);
  const averageEfficiency = plants.reduce((sum, plant) => sum + plant.efficiency, 0) / plants.length;

  if (error) {
    return (
      <div className="plants-error-container">
        <div className="plants-error-message">
          <h2>⚠️ Error Loading Plants Data</h2>
          <p>{error}</p>
          <button className="plants-retry-btn" onClick={() => setError(null)}>
            🔄 Retry
          </button>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`plants-notification plants-notification-${notification.type}`}>
            <span>{notification.message}</span>
            <button 
              className="plants-notification-close"
              onClick={() => setNotification(null)}
            >
              ✕
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="plants-container">
      {loading && (
        <div className="plants-loading-overlay">
          <div className="plants-loading-spinner">
            <div className="plants-spinner"></div>
            <p>Loading plant data...</p>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="plants-header">
        <div className="plants-header-content">
          <div className="plants-title-section">
            <h1 className="plants-title">🏭 Plant Management</h1>
            <p className="plants-subtitle">Monitor and manage all dairy processing plants</p>
          </div>
          <div className="plants-header-controls">
            <button 
              className="plants-refresh-btn"
              onClick={handleRefreshData}
              disabled={loading}
            >
              🔄 Refresh
            </button>

          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="plants-summary">
        <div className="plants-summary-card">
          <div className="plants-summary-icon">🏭</div>
          <div className="plants-summary-content">
            <h3>{plants.length}</h3>
            <p>Total Plants</p>
          </div>
        </div>
        
        <div className="plants-summary-card">
          <div className="plants-summary-icon">⚡</div>
          <div className="plants-summary-content">
            <h3>{totalCapacity.toLocaleString()}L</h3>
            <p>Total Capacity</p>
          </div>
        </div>
        
        <div className="plants-summary-card">
          <div className="plants-summary-icon">📊</div>
          <div className="plants-summary-content">
            <h3>{totalProduction.toLocaleString()}L</h3>
            <p>Current Production</p>
          </div>
        </div>
        
        <div className="plants-summary-card">
          <div className="plants-summary-icon">📈</div>
          <div className="plants-summary-content">
            <h3>{averageEfficiency.toFixed(1)}%</h3>
            <p>Avg. Efficiency</p>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="plants-dashboard-content">
        <div className="plants-main-content">
          {/* Plant Cards */}
          <div className="plants-cards-grid">
            {plants.map(plant => (
              <div 
                key={plant.id} 
                className={`plants-card ${updatedPlantId === plant.id ? 'plants-card-updated' : ''}`}
              >
                <div className="plants-card-header">
                  <div className="plants-card-info">
                    <h3>{plant.name}</h3>
                    <p className="plants-card-location">📍 {plant.location}</p>
                  </div>
                  <div className="plants-card-status">
                    <span 
                      className="plants-status-indicator"
                      style={{ backgroundColor: getStatusColor(plant.status) }}
                    ></span>
                    <span className="plants-status-text">{plant.status}</span>
                  </div>
                </div>

                <div className="plants-card-metrics">
                  <div className="plants-metric">
                    <span className="plants-metric-label">Capacity</span>
                    <span className="plants-metric-value">{plant.capacity.toLocaleString()}L</span>
                  </div>
                  <div className="plants-metric">
                    <span className="plants-metric-label">Production</span>
                    <span className="plants-metric-value">{plant.currentProduction.toLocaleString()}L</span>
                  </div>
                  <div className="plants-metric">
                    <span className="plants-metric-label">Efficiency</span>
                    <span 
                      className="plants-metric-value"
                      style={{ color: getEfficiencyColor(plant.efficiency) }}
                    >
                      {plant.efficiency}%
                    </span>
                  </div>
                </div>

                <div className="plants-efficiency-bar">
                  <div className="plants-efficiency-label">Efficiency</div>
                  <div className="plants-progress-bar">
                    <div 
                      className="plants-progress-fill"
                      style={{ 
                        width: `${plant.efficiency}%`,
                        backgroundColor: getEfficiencyColor(plant.efficiency)
                      }}
                    ></div>
                  </div>
                  <div className="plants-efficiency-percentage">{plant.efficiency}%</div>
                </div>

                <div className="plants-card-equipment">
                  <h4>Equipment Status</h4>
                  <div className="plants-equipment-list">
                    {plant.equipment.slice(0, 3).map((equipment, index) => (
                      <div key={index} className="plants-equipment-item">
                        <span className="plants-equipment-name">{equipment.name}</span>
                        <span 
                          className="plants-equipment-status"
                          style={{ color: getStatusColor(equipment.status) }}
                        >
                          {equipment.status}
                        </span>
                      </div>
                    ))}
                    {plant.equipment.length > 3 && (
                      <div className="plants-equipment-more">
                        +{plant.equipment.length - 3} more
                      </div>
                    )}
                  </div>
                </div>

                <div className="plants-card-actions">
                  <button 
                    className="plants-action-btn plants-view-btn"
                    onClick={() => setSelectedPlant(plant)}
                  >
                    📄 View Details
                  </button>
                  <button 
                    className="plants-action-btn plants-edit-btn"
                    onClick={() => handleEditPlant(plant)}
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    className="plants-action-btn plants-monitor-btn"
                    onClick={() => handleMonitorPlant(plant)}
                  >
                    📊 Monitor
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section Navigation */}
          <div className="plants-chart-navigation">
            <div className="plants-chart-nav-buttons">
              <button 
                className={`plants-nav-btn ${activeChartSection === 'inputOutput' ? 'plants-active' : ''}`}
                onClick={() => handleChartSectionChange('inputOutput')}
              >
                📊 Input vs Output
              </button>
              <button 
                className={`plants-nav-btn ${activeChartSection === 'productDistribution' ? 'plants-active' : ''}`}
                onClick={() => handleChartSectionChange('productDistribution')}
              >
                📊 Product Distribution
              </button>
              <button 
                className={`plants-nav-btn ${activeChartSection === 'efficiency' ? 'plants-active' : ''}`}
                onClick={() => handleChartSectionChange('efficiency')}
              >
                📈 Efficiency
              </button>
            </div>
          </div>

          {/* Charts Section */}
          <div className="plants-charts-row">
            {activeChartSection === 'inputOutput' && (
              <div className="plants-chart-section plants-chart-section-single">
                <div className="plants-chart-header">
                  <h2>📊 {inputOutputTimeFilter === 'Day' ? 'Daily' : inputOutputTimeFilter === 'Week' ? 'Weekly' : 'Monthly'} Input vs Output</h2>
                  <div className="plants-header-controls">
                    <div className="plants-time-filter">
                      {['Day', 'Week', 'Month'].map(filter => (
                        <button 
                          key={filter}
                          className={`plants-filter-btn ${inputOutputTimeFilter === filter ? 'plants-active' : ''}`}
                          onClick={() => handleInputOutputTimeFilterChange(filter)}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                    <div className="plants-chart-legend">
                      <div className="plants-legend-item">
                        <div className="plants-legend-color plants-input-color"></div>
                        <span>Input</span>
                      </div>
                      <div className="plants-legend-item">
                        <div className="plants-legend-color plants-output-color"></div>
                        <span>Output</span>
                      </div>
                      <div className="plants-legend-item">
                        <div className="plants-legend-color plants-waste-color"></div>
                        <span>Waste</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="plants-chart-stats-summary">
                  <div className="plants-stat-summary-item">
                    <span className="plants-stat-summary-label">Avg Input</span>
                    <span className="plants-stat-summary-value">
                      {(inputOutputData.reduce((sum, d) => sum + d.input, 0) / inputOutputData.length).toFixed(0)} tons
                    </span>
                  </div>
                  <div className="plants-stat-summary-item">
                    <span className="plants-stat-summary-label">Avg Output</span>
                    <span className="plants-stat-summary-value">
                      {(inputOutputData.reduce((sum, d) => sum + d.output, 0) / inputOutputData.length).toFixed(0)} tons
                    </span>
                  </div>
                  <div className="plants-stat-summary-item">
                    <span className="plants-stat-summary-label">Efficiency</span>
                    <span className="plants-stat-summary-value">
                      {((inputOutputData.reduce((sum, d) => sum + d.output, 0) / inputOutputData.reduce((sum, d) => sum + d.input, 0)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="plants-chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={inputOutputData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis 
                        dataKey="period" 
                        tick={{ fill: '#333', fontSize: 12 }}
                        axisLine={{ stroke: '#ccc' }}
                      />
                      <YAxis 
                        tick={{ fill: '#333', fontSize: 12 }}
                        axisLine={{ stroke: '#ccc' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#fff',
                          borderColor: '#ddd',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                        cursor={{ fill: 'rgba(46, 204, 113, 0.1)' }}
                      />
                      <Bar 
                        dataKey="input" 
                        fill="#4FC3F7" 
                        name="Input (tons)" 
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="output" 
                        fill="#81C784" 
                        name="Output (tons)" 
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="waste" 
                        fill="#FF8A65" 
                        name="Waste (tons)" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeChartSection === 'productDistribution' && (
              <div className="plants-chart-section plants-chart-section-single">
                <div className="plants-chart-header">
                  <h2>📊 Product Output Distribution</h2>
                  <div className="plants-time-filter">
                    {['Day', 'Week', 'Month'].map(filter => (
                      <button 
                        key={filter}
                        className={`plants-filter-btn ${timeFilter === filter ? 'plants-active' : ''}`}
                        onClick={() => handleTimeFilterChange(filter)}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="plants-pie-chart-container">
                  <div className="plants-pie-chart-wrapper">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={productTypes}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
                          labelStyle={{ 
                            fontSize: '12px', 
                            fontWeight: 'bold',
                            fill: '#333'
                          }}
                          outerRadius={140}
                          innerRadius={60}
                          fill="#8884d8"
                          dataKey="output"
                          paddingAngle={2}
                        >
                          {productTypes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value} tons`, 'Output']}
                          contentStyle={{
                            backgroundColor: '#fff',
                            borderColor: '#ddd',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="plants-pie-chart-center">
                      <div className="plants-total-production">
                        <span className="plants-total-value">{calculateTotalProduction().toLocaleString()}</span>
                        <span className="plants-total-label">Total Tons</span>
                      </div>
                    </div>
                  </div>
                <div className="plants-product-legend">
                    {productTypes.map((product, index) => (
                      <div key={index} className="plants-legend-item-detailed">
                        <div 
                          className="plants-legend-color-dot" 
                          style={{ backgroundColor: product.color }}
                        ></div>
                        <div className="plants-legend-info">
                          <span className="plants-legend-name">{product.name}</span>
                          <span className="plants-legend-value">{product.output.toLocaleString()} tons</span>
                          <span className="plants-legend-percentage">
                            {((product.output / calculateTotalProduction()) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeChartSection === 'efficiency' && (
              <div className="plants-chart-section plants-chart-section-single">
                <div className="plants-chart-header">
                  <h2>📈 Production Efficiency & Performance Metrics</h2>
                  <div className="plants-header-controls">
                    <div className="plants-time-filter">
                      {['Day', 'Week', 'Month', 'Year'].map(filter => (
                        <button 
                          key={filter}
                          className={`plants-filter-btn ${timeFilter === filter ? 'plants-active' : ''}`}
                          onClick={() => handleTimeFilterChange(filter)}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                    <div className="plants-efficiency-indicator">
                      <span className="plants-current-efficiency">
                        Current: {plantData.efficiency.toFixed(1)}%
                      </span>
                      <div className={`plants-efficiency-status plants-${getEfficiencyStatus(plantData.efficiency).status}`}>
                        {getEfficiencyStatus(plantData.efficiency).status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="plants-efficiency-metrics">
                  <div className="plants-efficiency-metric">
                    <span className="plants-metric-label">Period Avg Efficiency</span>
                    <span className="plants-metric-value">
                      {(performanceData.reduce((sum, d) => sum + d.efficiency, 0) / performanceData.length).toFixed(1)}%
                    </span>
                  </div>
                  <div className="plants-efficiency-metric">
                    <span className="plants-metric-label">Period Avg Quality</span>
                    <span className="plants-metric-value">
                      {(performanceData.reduce((sum, d) => sum + d.quality, 0) / performanceData.length).toFixed(1)}%
                    </span>
                  </div>
                  <div className="plants-efficiency-metric">
                    <span className="plants-metric-label">Period Avg Uptime</span>
                    <span className="plants-metric-value">
                      {(performanceData.reduce((sum, d) => sum + d.uptime, 0) / performanceData.length).toFixed(1)}%
                    </span>
                  </div>
                  <div className="plants-efficiency-metric">
                    <span className="plants-metric-label">Target</span>
                    <span className="plants-metric-value">
                      {performanceData.length > 0 ? performanceData[0].target : preferences.alertThreshold}%
                    </span>
                  </div>
                </div>

                <div className="plants-chart-legend">
                  <div className="plants-legend-item">
                    <div className="plants-legend-color" style={{ backgroundColor: '#FF7043' }}></div>
                    <span>Production Efficiency</span>
                  </div>
                  <div className="plants-legend-item">
                    <div className="plants-legend-color" style={{ backgroundColor: '#4FC3F7' }}></div>
                    <span>Quality Score</span>
                  </div>
                  <div className="plants-legend-item">
                    <div className="plants-legend-color" style={{ backgroundColor: '#81C784' }}></div>
                    <span>Uptime</span>
                  </div>
                  <div className="plants-legend-item">
                    <div className="plants-legend-color" style={{ backgroundColor: '#f39c12', opacity: 0.7 }}></div>
                    <span>Target Line</span>
                  </div>
                  <div className="plants-legend-item">
                    <div className="plants-legend-color" style={{ backgroundColor: '#e74c3c', opacity: 0.7 }}></div>
                    <span>Critical Line</span>
                  </div>
                  <div className="plants-legend-item">
                    <div className="plants-legend-color" style={{ backgroundColor: '#27ae60', opacity: 0.7 }}></div>
                    <span>Optimal Line</span>
                  </div>
                </div>

                <div className="plants-chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke="#eee" 
                      />
                      <XAxis 
                        dataKey="period" 
                        tick={{ fill: '#333', fontSize: 12 }}
                        axisLine={{ stroke: '#ccc' }}
                      />
                      <YAxis 
                        unit="%" 
                        domain={[80, 100]} 
                        tick={{ fill: '#333' }}
                        axisLine={{ stroke: '#ccc' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#fff',
                          borderColor: '#ddd',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                        formatter={(value, name) => [
                          `${value}%`, 
                          name === 'efficiency' ? 'Production Efficiency' :
                          name === 'quality' ? 'Quality Score' :
                          name === 'uptime' ? 'Uptime' : name
                        ]}
                      />
                      
                      {/* Main Performance Lines */}
                      <Line 
                        type="monotone" 
                        dataKey="efficiency" 
                        stroke="#FF7043" 
                        name="efficiency"
                        strokeWidth={3}
                        dot={{ r: 5, fill: '#FF7043' }}
                        activeDot={{ r: 7, fill: '#FF7043' }}
                        connectNulls={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="quality" 
                        stroke="#4FC3F7" 
                        name="quality"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#4FC3F7' }}
                        activeDot={{ r: 6, fill: '#4FC3F7' }}
                        connectNulls={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="uptime" 
                        stroke="#81C784" 
                        name="uptime"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#81C784' }}
                        activeDot={{ r: 6, fill: '#81C784' }}
                        connectNulls={false}
                      />
                      
                      {/* Target Reference Lines */}
                      <ReferenceLine 
                        y={performanceData.length > 0 ? performanceData[0].target : preferences.alertThreshold} 
                        stroke="#f39c12" 
                        strokeDasharray="5 5" 
                        strokeWidth={2}
                        label={{
                          value: `Target: ${performanceData.length > 0 ? performanceData[0].target : preferences.alertThreshold}%`, 
                          position: 'topRight',
                          fill: '#333',
                          fontSize: 11
                        }} 
                      />
                      
                      {/* Critical Threshold Line */}
                      <ReferenceLine 
                        y={85} 
                        stroke="#e74c3c" 
                        strokeDasharray="3 3" 
                        strokeWidth={1}
                        label={{
                          value: "Critical: 85%", 
                          position: 'bottomRight',
                          fill: '#e74c3c',
                          fontSize: 10
                        }} 
                      />
                      
                      {/* Optimal Performance Line */}
                      <ReferenceLine 
                        y={95} 
                        stroke="#27ae60" 
                        strokeDasharray="3 3" 
                        strokeWidth={1}
                        label={{
                          value: "Optimal: 95%", 
                          position: 'topLeft',
                          fill: '#27ae60',
                          fontSize: 10
                        }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>


        </div>

        {/* Sidebar */}
        <div className="plants-sidebar">
          <div className="plants-sidebar-section">
            <div className="plants-section-header">
              <h3>🚨 Active Alerts ({activeAlerts.filter(a => !a.resolved).length})</h3>
              <div className="plants-alert-filters">
                <select 
                  value={alertFilter} 
                  onChange={(e) => setAlertFilter(e.target.value)}
                  className="plants-filter-select"
                >
                  <option value="all">All Alerts</option>
                  <option value="critical">Critical</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                  <option value="unresolved">Unresolved</option>
                </select>
              </div>
            </div>
            
            <div className="plants-alerts-summary">
              <div className="plants-alert-stat">
                <span className="plants-stat-number" style={{ color: '#e74c3c' }}>
                  {activeAlerts.filter(a => a.severity === 'critical' && !a.resolved).length}
                </span>
                <span className="plants-stat-label">Critical</span>
              </div>
              <div className="plants-alert-stat">
                <span className="plants-stat-number" style={{ color: '#f39c12' }}>
                  {activeAlerts.filter(a => a.severity === 'warning' && !a.resolved).length}
                </span>
                <span className="plants-stat-label">Warning</span>
              </div>
              <div className="plants-alert-stat">
                <span className="plants-stat-number" style={{ color: '#3498db' }}>
                  {activeAlerts.filter(a => a.severity === 'info' && !a.resolved).length}
                </span>
                <span className="plants-stat-label">Info</span>
              </div>
            </div>

            <div className="plants-alerts-list">
              {activeAlerts
                .filter(alert => {
                  if (alertFilter === 'all') return true;
                  if (alertFilter === 'unresolved') return !alert.resolved;
                  return alert.severity === alertFilter;
                })
                .slice(0, 5)
                .map(alert => (
                  <div 
                    key={alert.id} 
                    className={`plants-alert-item ${alert.resolved ? 'plants-alert-resolved' : ''}`}
                    style={{ borderLeftColor: getSeverityColor(alert.severity) }}
                  >
                    <div className="plants-alert-header">
                      <div className="plants-alert-severity-badge">
                        <span 
                          className={`plants-severity-dot plants-${alert.severity}`}
                          style={{ backgroundColor: getSeverityColor(alert.severity) }}
                        ></span>
                        <span className="plants-alert-severity" style={{ color: getSeverityColor(alert.severity) }}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                      <div className="plants-alert-actions">
                        <button 
                          className="plants-alert-action-btn"
                          onClick={() => viewAlertDetails(alert)}
                          title="View Details"
                        >
                          👁️
                        </button>
                        {!alert.resolved && (
                          <button 
                            className="plants-alert-action-btn"
                            onClick={() => resolveAlert(alert.id)}
                            title="Mark as Resolved"
                          >
                            ✅
                          </button>
                        )}
                        <button 
                          className="plants-alert-dismiss"
                          onClick={() => dismissAlert(alert.id)}
                          title="Dismiss Alert"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                    <p className="plants-alert-message">{alert.message}</p>
                    <div className="plants-alert-meta">
                      <span className="plants-alert-plant">📍 {alert.plant}</span>
                      <span className="plants-alert-equipment">⚙️ {alert.equipment}</span>
                    </div>
                    <div className="plants-alert-footer">
                      <span className="plants-alert-time">🕒 {alert.time}</span>
                      {alert.action !== 'none' && (
                        <span className={`plants-alert-action-required plants-action-${alert.action}`}>
                          {alert.action === 'immediate' ? '🚨 Immediate Action' : 
                           alert.action === 'schedule' ? '📅 Schedule Action' : 
                           '👀 Review Required'}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              }
              
              {activeAlerts.filter(alert => {
                if (alertFilter === 'all') return true;
                if (alertFilter === 'unresolved') return !alert.resolved;
                return alert.severity === alertFilter;
              }).length === 0 && (
                <div className="plants-no-alerts">
                  <span>🎉 No alerts found</span>
                  <p>All systems operating normally</p>
                </div>
              )}
              
              {activeAlerts.filter(alert => {
                if (alertFilter === 'all') return true;
                if (alertFilter === 'unresolved') return !alert.resolved;
                return alert.severity === alertFilter;
              }).length > 5 && (
                <div className="plants-view-more">
                  <button className="plants-view-more-btn">
                    View All {activeAlerts.length} Alerts
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="plants-sidebar-section">
            <h3>🎯 Quick Actions</h3>
            <div className="plants-quick-actions">
              <button 
                className="plants-action-btn plants-action-primary"
                onClick={() => handleQuickAction('generateReport')}
              >
                <span className="plants-action-icon">📊</span>
                <div className="plants-action-content">
                  <span className="plants-action-title">Generate Report</span>
                  <span className="plants-action-desc">Create performance report</span>
                </div>
              </button>
              
              <button 
                className="plants-action-btn plants-action-warning"
                onClick={() => handleQuickAction('scheduleMaintenance')}
              >
                <span className="plants-action-icon">🔧</span>
                <div className="plants-action-content">
                  <span className="plants-action-title">Schedule Maintenance</span>
                  <span className="plants-action-desc">Plan equipment service</span>
                </div>
              </button>
              
              <button 
                className="plants-action-btn plants-action-info"
                onClick={() => handleQuickAction('adjustTargets')}
              >
                <span className="plants-action-icon">🎯</span>
                <div className="plants-action-content">
                  <span className="plants-action-title">Adjust Targets</span>
                  <span className="plants-action-desc">Modify performance goals</span>
                </div>
              </button>
              
              <button 
                className="plants-action-btn plants-action-secondary"
                onClick={() => handleQuickAction('viewInventory')}
              >
                <span className="plants-action-icon">📦</span>
                <div className="plants-action-content">
                  <span className="plants-action-title">View Inventory</span>
                  <span className="plants-action-desc">Check stock levels</span>
                </div>
              </button>
              
              <button 
                className="plants-action-btn plants-action-success"
                onClick={() => handleQuickAction('teamOverview')}
              >
                <span className="plants-action-icon">👥</span>
                <div className="plants-action-content">
                  <span className="plants-action-title">Team Overview</span>
                  <span className="plants-action-desc">View staff status</span>
                </div>
              </button>
              
              <button 
                className="plants-action-btn plants-action-neutral"
                onClick={() => handleQuickAction('preferences')}
              >
                <span className="plants-action-icon">⚙️</span>
                <div className="plants-action-content">
                  <span className="plants-action-title">Preferences</span>
                  <span className="plants-action-desc">System settings</span>
                </div>
              </button>
            </div>
            
            <div className="plants-quick-stats">
              <div className="plants-quick-stat">
                <span className="plants-stat-value">{plants.length}</span>
                <span className="plants-stat-label">Active Plants</span>
              </div>
              <div className="plants-quick-stat">
                <span className="plants-stat-value">
                  {getEquipmentStatusSummary().operational}
                </span>
                <span className="plants-stat-label">Operational</span>
              </div>
              <div className="plants-quick-stat">
                <span className="plants-stat-value">
                  {getEquipmentStatusSummary().avgEfficiency.toFixed(0)}%
                </span>
                <span className="plants-stat-label">Avg Efficiency</span>
              </div>
            </div>
          </div>

          <div className="plants-sidebar-section">
            <div className="plants-section-header">
              <h3>⚙️ Equipment Status</h3>
              <div className="plants-equipment-filters">
                <select 
                  value={equipmentFilter} 
                  onChange={(e) => setEquipmentFilter(e.target.value)}
                  className="plants-filter-select"
                >
                  <option value="all">All Equipment</option>
                  <option value="operational">Operational</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
            </div>
            
            <div className="plants-equipment-summary">
              <div className="plants-equipment-stat">
                <span className="plants-stat-number" style={{ color: '#27ae60' }}>
                  {getEquipmentStatusSummary().operational}
                </span>
                <span className="plants-stat-label">Operational</span>
              </div>
              <div className="plants-equipment-stat">
                <span className="plants-stat-number" style={{ color: '#f39c12' }}>
                  {getEquipmentStatusSummary().maintenance}
                </span>
                <span className="plants-stat-label">Maintenance</span>
              </div>
              <div className="plants-equipment-stat">
                <span className="plants-stat-number" style={{ color: '#e74c3c' }}>
                  {getEquipmentStatusSummary().offline}
                </span>
                <span className="plants-stat-label">Offline</span>
              </div>
            </div>

            <div className="plants-equipment-status-table">
              <div className="plants-table-header">
                <span>Equipment</span>
                <span>Plant</span>
                <span>Status</span>
                <span>Efficiency</span>
                <span>Actions</span>
              </div>
              
              {getEquipmentByStatus(equipmentFilter)
                .slice(0, 8)
                .map((equip, index) => (
                  <div key={`${equip.plantId}-${equip.name}-${index}`} className="plants-equipment-row">
                    <div className="plants-equip-info">
                      <span className="plants-equip-name">{equip.name}</span>
                      <span className="plants-equip-type">
                        {equip.name.includes('Pasteurizer') ? '🔥' :
                         equip.name.includes('Separator') ? '🌀' :
                         equip.name.includes('Packaging') ? '📦' :
                         equip.name.includes('Cheese') ? '🧀' :
                         equip.name.includes('Aging') ? '⏰' : '⚙️'}
                      </span>
                    </div>
                    
                    <div className="plants-equip-plant">
                      <span className="plants-plant-name">{equip.plantName}</span>
                    </div>
                    
                    <div className="plants-equip-status-badge">
                      <span 
                        className={`plants-status-dot plants-${equip.status}`}
                        style={{ backgroundColor: getStatusColor(equip.status) }}
                      ></span>
                      <span className="plants-status-text">{equip.status}</span>
                    </div>
                    
                    <div className="plants-equip-efficiency-container">
                      <span className="plants-efficiency-text">{equip.efficiency}%</span>
                      <div className="plants-status-bar">
                        <div 
                          className="plants-status-fill" 
                          style={{ 
                            width: `${equip.efficiency}%`,
                            backgroundColor: getStatusColor(equip.status)
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="plants-equip-actions">
                      <button 
                        className="plants-equip-action-btn"
                        onClick={() => {
                          const newStatus = equip.status === 'operational' ? 'maintenance' : 'operational';
                          updateEquipmentStatus(equip.plantId, equip.name, newStatus);
                        }}
                        title={equip.status === 'operational' ? 'Set to Maintenance' : 'Set to Operational'}
                      >
                        {equip.status === 'operational' ? '🔧' : '✅'}
                      </button>
                      
                      <button 
                        className="plants-equip-action-btn"
                        onClick={() => {
                          const plant = plants.find(p => p.id === equip.plantId);
                          addNewAlert(
                            'info',
                            `Manual inspection requested for ${equip.name}`,
                            plant?.name || 'Unknown Plant',
                            equip.name
                          );
                        }}
                        title="Request Inspection"
                      >
                        👁️
                      </button>
                    </div>
                  </div>
                ))
              }
              
              {getEquipmentByStatus(equipmentFilter).length === 0 && (
                <div className="plants-no-equipment">
                  <span>⚙️ No equipment found</span>
                  <p>No equipment matches the selected filter</p>
                </div>
              )}
              
              {getEquipmentByStatus(equipmentFilter).length > 8 && (
                <div className="plants-view-more">
                  <button className="plants-view-more-btn">
                    View All {getEquipmentByStatus(equipmentFilter).length} Equipment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Plant Modal */}
      {showEditForm && editingPlant && (
        <div className="plants-modal-overlay" onClick={() => setShowEditForm(false)}>
          <div className="plants-edit-modal" onClick={e => e.stopPropagation()}>
            <div className="plants-modal-header">
              <h2>✏️ Edit Plant - {editingPlant.name}</h2>
              <button 
                className="plants-close-btn"
                onClick={() => setShowEditForm(false)}
              >
                ✕
              </button>
            </div>

            <div className="plants-modal-content">
              <form className="plants-edit-form" onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
                <div className="plants-form-grid">
                  <div className="plants-form-group">
                    <label className="plants-form-label">Plant Name</label>
                    <input
                      type="text"
                      className="plants-form-input"
                      value={editFormData.name || ''}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                      placeholder="Enter plant name"
                      required
                    />
                  </div>

                  <div className="plants-form-group">
                    <label className="plants-form-label">Location</label>
                    <input
                      type="text"
                      className="plants-form-input"
                      value={editFormData.location || ''}
                      onChange={(e) => handleFormChange('location', e.target.value)}
                      placeholder="Enter location"
                      required
                    />
                  </div>

                  <div className="plants-form-group">
                    <label className="plants-form-label">Capacity (Liters)</label>
                    <input
                      type="number"
                      className="plants-form-input"
                      value={editFormData.capacity || ''}
                      onChange={(e) => handleFormChange('capacity', parseInt(e.target.value))}
                      placeholder="Enter capacity"
                      min="1000"
                      required
                    />
                  </div>

                  <div className="plants-form-group">
                    <label className="plants-form-label">Status</label>
                    <select
                      className="plants-form-select"
                      value={editFormData.status || ''}
                      onChange={(e) => handleFormChange('status', e.target.value)}
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="operational">Operational</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>
                </div>

                <div className="plants-form-actions">
                  <button 
                    type="button" 
                    className="plants-btn plants-btn-secondary"
                    onClick={() => setShowEditForm(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="plants-btn plants-btn-primary"
                  >
                    💾 Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Monitor Plant Modal */}
      {showMonitorModal && monitoringPlant && (
        <div className="plants-modal-overlay" onClick={() => setShowMonitorModal(false)}>
          <div className="plants-monitor-modal" onClick={e => e.stopPropagation()}>
            <div className="plants-modal-header">
              <h2>📊 Monitor Plant - {monitoringPlant.name}</h2>
              <button 
                className="plants-close-btn"
                onClick={() => setShowMonitorModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="plants-modal-content">
              <div className="plants-monitor-dashboard">
                <div className="plants-monitor-stats">
                  <div className="plants-monitor-stat-card">
                    <div className="plants-stat-icon">⚡</div>
                    <div className="plants-stat-info">
                      <h3>Efficiency</h3>
                      <div className="plants-stat-value">{monitoringPlant.efficiency}%</div>
                      <div className="plants-stat-trend">
                        {monitoringPlant.efficiency > 85 ? '📈 Good' : '📉 Needs Attention'}
                      </div>
                    </div>
                  </div>

                  <div className="plants-monitor-stat-card">
                    <div className="plants-stat-icon">🏭</div>
                    <div className="plants-stat-info">
                      <h3>Production</h3>
                      <div className="plants-stat-value">{monitoringPlant.currentProduction.toLocaleString()}L</div>
                      <div className="plants-stat-trend">
                        {((monitoringPlant.currentProduction / monitoringPlant.capacity) * 100).toFixed(1)}% of capacity
                      </div>
                    </div>
                  </div>

                  <div className="plants-monitor-stat-card">
                    <div className="plants-stat-icon">🔧</div>
                    <div className="plants-stat-info">
                      <h3>Equipment Status</h3>
                      <div className="plants-stat-value">
                        {monitoringPlant.equipment.filter(e => e.status === 'operational').length}/{monitoringPlant.equipment.length}
                      </div>
                      <div className="plants-stat-trend">Active Units</div>
                    </div>
                  </div>
                </div>

                <div className="plants-monitor-equipment">
                  <h3>Equipment Details</h3>
                  <div className="plants-equipment-monitor-list">
                    {monitoringPlant.equipment.map((equipment, index) => (
                      <div key={index} className="plants-equipment-monitor-item">
                        <div className="plants-equipment-info">
                          <span className="plants-equipment-name">{equipment.name}</span>
                          <span 
                            className="plants-equipment-status-badge"
                            style={{ 
                              backgroundColor: getStatusColor(equipment.status),
                              color: 'white',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              fontWeight: '500'
                            }}
                          >
                            {equipment.status}
                          </span>
                        </div>
                        <div className="plants-equipment-efficiency-bar">
                          <div className="plants-efficiency-bar-bg">
                            <div 
                              className="plants-efficiency-bar-fill"
                              style={{ 
                                width: `${equipment.efficiency}%`,
                                backgroundColor: getEfficiencyColor(equipment.efficiency)
                              }}
                            ></div>
                          </div>
                          <span className="plants-efficiency-text">{equipment.efficiency}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="plants-monitor-actions">
                  <button 
                    className="plants-btn plants-btn-warning"
                    onClick={() => {
                      showNotification(`🔧 Maintenance scheduled for ${monitoringPlant.name}`, 'warning');
                      setShowMonitorModal(false);
                    }}
                  >
                    🔧 Schedule Maintenance
                  </button>
                  <button 
                    className="plants-btn plants-btn-info"
                    onClick={() => {
                      showNotification(`📊 Generating report for ${monitoringPlant.name}...`, 'info');
                      // Here you would typically generate and download a report
                    }}
                  >
                    📊 Generate Report
                  </button>
                  <button 
                    className="plants-btn plants-btn-success"
                    onClick={() => {
                      showNotification(`🔄 Data refreshed for ${monitoringPlant.name}`, 'success');
                      // Here you would typically refresh the data from API
                    }}
                  >
                    🔄 Refresh Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plant Details Modal */}
      {selectedPlant && (
        <div className="plants-modal-overlay" onClick={() => setSelectedPlant(null)}>
          <div className="plants-plant-details-modal" onClick={e => e.stopPropagation()}>
            <div className="plants-modal-header">
              <h2>📄 {selectedPlant.name} - Details</h2>
              <button 
                className="plants-close-btn"
                onClick={() => setSelectedPlant(null)}
              >
                ✕
              </button>
            </div>

            <div className="plants-modal-content">
              <div className="plants-details-section">
                <h3>Plant Information</h3>
                <div className="plants-info-grid">
                  <div className="plants-info-item">
                    <span className="plants-info-label">Location:</span>
                    <span className="plants-info-value">{selectedPlant.location}</span>
                  </div>
                  <div className="plants-info-item">
                    <span className="plants-info-label">Status:</span>
                    <span className="plants-info-value">{selectedPlant.status}</span>
                  </div>
                  <div className="plants-info-item">
                    <span className="plants-info-label">Capacity:</span>
                    <span className="plants-info-value">{selectedPlant.capacity.toLocaleString()}L</span>
                  </div>
                  <div className="plants-info-item">
                    <span className="plants-info-label">Current Production:</span>
                    <span className="plants-info-value">{selectedPlant.currentProduction.toLocaleString()}L</span>
                  </div>
                </div>
              </div>

              <div className="plants-details-section">
                <h3>Equipment Details</h3>
                <div className="plants-equipment-table">
                  {selectedPlant.equipment.map((equipment, index) => (
                    <div key={index} className="plants-equipment-row">
                      <span className="plants-equipment-name">{equipment.name}</span>
                      <span 
                        className="plants-equipment-status"
                        style={{ color: getStatusColor(equipment.status) }}
                      >
                        {equipment.status}
                      </span>
                      <span className="plants-equipment-efficiency">
                        {equipment.efficiency}% efficiency
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="plants-details-section">
                <h3>Performance Metrics</h3>
                <div className="plants-metrics-grid">
                  <div className="plants-metric-card">
                    <div className="plants-metric-icon">⚡</div>
                    <div className="plants-metric-info">
                      <span className="plants-metric-title">Power Consumption</span>
                      <span className="plants-metric-data">{selectedPlant.metrics.powerConsumption} kWh</span>
                    </div>
                  </div>
                  <div className="plants-metric-card">
                    <div className="plants-metric-icon">💧</div>
                    <div className="plants-metric-info">
                      <span className="plants-metric-title">Water Usage</span>
                      <span className="plants-metric-data">{selectedPlant.metrics.waterUsage} L</span>
                    </div>
                  </div>
                  <div className="plants-metric-card">
                    <div className="plants-metric-icon">🗑️</div>
                    <div className="plants-metric-info">
                      <span className="plants-metric-title">Waste Generated</span>
                      <span className="plants-metric-data">{selectedPlant.metrics.wasteGenerated} kg</span>
                    </div>
                  </div>
                  <div className="plants-metric-card">
                    <div className="plants-metric-icon">⭐</div>
                    <div className="plants-metric-info">
                      <span className="plants-metric-title">Quality Score</span>
                      <span className="plants-metric-data">{selectedPlant.metrics.qualityScore}/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Modal */}
      {showQuickActionModal && selectedQuickAction && (
        <div className="plants-modal-overlay" onClick={() => setShowQuickActionModal(false)}>
          <div className="plants-quick-action-modal" onClick={e => e.stopPropagation()}>
            <div className="plants-modal-header">
              <h2>
                {selectedQuickAction === 'generateReport' && '📊 Generate Report'}
                {selectedQuickAction === 'scheduleMaintenance' && '🔧 Schedule Maintenance'}
                {selectedQuickAction === 'adjustTargets' && '🎯 Adjust Targets'}
                {selectedQuickAction === 'viewInventory' && '📦 View Inventory'}
                {selectedQuickAction === 'teamOverview' && '👥 Team Overview'}
                {selectedQuickAction === 'preferences' && '⚙️ Preferences'}
              </h2>
              <button 
                className="plants-close-btn"
                onClick={() => setShowQuickActionModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="plants-modal-content">
              {selectedQuickAction === 'generateReport' && (
                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  const formData = new FormData(e.target);
                  executeQuickAction('generateReport', {
                    type: formData.get('reportType'),
                    period: formData.get('period'),
                    plants: formData.getAll('plants')
                  });
                }}>
                  <div className="plants-form-group">
                    <label>Report Type</label>
                    <select name="reportType" required>
                      <option value="">Select report type</option>
                      <option value="efficiency">Efficiency Report</option>
                      <option value="production">Production Report</option>
                      <option value="maintenance">Maintenance Report</option>
                      <option value="quality">Quality Report</option>
                    </select>
                  </div>
                  <div className="plants-form-group">
                    <label>Time Period</label>
                    <select name="period" required>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  <div className="plants-form-group">
                    <label>Select Plants</label>
                    <div className="plants-checkbox-group">
                      {plants.map(plant => (
                        <label key={plant.id} className="plants-checkbox-label">
                          <input type="checkbox" name="plants" value={plant.id} />
                          {plant.name}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="plants-form-actions">
                    <button type="button" onClick={() => setShowQuickActionModal(false)}>Cancel</button>
                    <button type="submit" className="plants-btn-primary">Generate Report</button>
                  </div>
                </form>
              )}

              {selectedQuickAction === 'scheduleMaintenance' && (
                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  const formData = new FormData(e.target);
                  executeQuickAction('scheduleMaintenance', {
                    plant: formData.get('plant'),
                    equipment: formData.get('equipment'),
                    date: formData.get('date'),
                    type: formData.get('maintenanceType'),
                    priority: formData.get('priority')
                  });
                }}>
                  <div className="plants-form-group">
                    <label>Select Plant</label>
                    <select name="plant" required>
                      <option value="">Select plant</option>
                      {plants.map(plant => (
                        <option key={plant.id} value={plant.name}>{plant.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="plants-form-group">
                    <label>Equipment</label>
                    <input type="text" name="equipment" placeholder="Enter equipment name" required />
                  </div>
                  <div className="plants-form-group">
                    <label>Maintenance Date</label>
                    <input type="date" name="date" required />
                  </div>
                  <div className="plants-form-group">
                    <label>Maintenance Type</label>
                    <select name="maintenanceType" required>
                      <option value="">Select type</option>
                      <option value="preventive">Preventive</option>
                      <option value="corrective">Corrective</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                  <div className="plants-form-group">
                    <label>Priority</label>
                    <select name="priority" required>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <div className="plants-form-actions">
                    <button type="button" onClick={() => setShowQuickActionModal(false)}>Cancel</button>
                    <button type="submit" className="plants-btn-primary">Schedule Maintenance</button>
                  </div>
                </form>
              )}

              {selectedQuickAction === 'adjustTargets' && (
                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  const formData = new FormData(e.target);
                  executeQuickAction('adjustTargets', {
                    threshold: parseInt(formData.get('threshold')),
                    efficiency: parseInt(formData.get('efficiency')),
                    quality: parseInt(formData.get('quality'))
                  });
                }}>
                  <div className="plants-form-group">
                    <label>Alert Threshold (%)</label>
                    <input 
                      type="number" 
                      name="threshold" 
                      min="70" 
                      max="100" 
                      defaultValue={preferences.alertThreshold}
                      required 
                    />
                  </div>
                  <div className="plants-form-group">
                    <label>Efficiency Target (%)</label>
                    <input type="number" name="efficiency" min="80" max="100" defaultValue="92" required />
                  </div>
                  <div className="plants-form-group">
                    <label>Quality Target (%)</label>
                    <input type="number" name="quality" min="90" max="100" defaultValue="95" required />
                  </div>
                  <div className="plants-form-actions">
                    <button type="button" onClick={() => setShowQuickActionModal(false)}>Cancel</button>
                    <button type="submit" className="plants-btn-primary">Update Targets</button>
                  </div>
                </form>
              )}

              {(selectedQuickAction === 'viewInventory' || 
                selectedQuickAction === 'teamOverview' || 
                selectedQuickAction === 'preferences') && (
                <div className="plants-placeholder-content">
                  <div className="plants-placeholder-icon">
                    {selectedQuickAction === 'viewInventory' && '📦'}
                    {selectedQuickAction === 'teamOverview' && '👥'}
                    {selectedQuickAction === 'preferences' && '⚙️'}
                  </div>
                  <h3>Feature Coming Soon</h3>
                  <p>This feature is currently under development and will be available in a future update.</p>
                  <div className="plants-form-actions">
                    <button onClick={() => setShowQuickActionModal(false)} className="plants-btn-primary">
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Alert Details Modal */}
      {showAlertDetails && selectedAlert && (
        <div className="plants-modal-overlay" onClick={() => setShowAlertDetails(false)}>
          <div className="plants-alert-details-modal" onClick={e => e.stopPropagation()}>
            <div className="plants-modal-header">
              <h2>🚨 Alert Details</h2>
              <button 
                className="plants-close-btn"
                onClick={() => setShowAlertDetails(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="plants-modal-content">
              <div className="plants-alert-detail-section">
                <div className="plants-alert-severity-large">
                  <span 
                    className={`plants-severity-badge plants-${selectedAlert.severity}`}
                    style={{ backgroundColor: getSeverityColor(selectedAlert.severity) }}
                  >
                    {selectedAlert.severity.toUpperCase()}
                  </span>
                </div>
                
                <div className="plants-alert-info-grid">
                  <div className="plants-info-item">
                    <span className="plants-info-label">Message</span>
                    <span className="plants-info-value">{selectedAlert.message}</span>
                  </div>
                  <div className="plants-info-item">
                    <span className="plants-info-label">Plant</span>
                    <span className="plants-info-value">📍 {selectedAlert.plant}</span>
                  </div>
                  <div className="plants-info-item">
                    <span className="plants-info-label">Equipment</span>
                    <span className="plants-info-value">⚙️ {selectedAlert.equipment}</span>
                  </div>
                  <div className="plants-info-item">
                    <span className="plants-info-label">Time</span>
                    <span className="plants-info-value">🕒 {selectedAlert.time}</span>
                  </div>
                  <div className="plants-info-item">
                    <span className="plants-info-label">Action Required</span>
                    <span className={`plants-info-value plants-action-${selectedAlert.action}`}>
                      {selectedAlert.action === 'immediate' ? '🚨 Immediate Action Required' : 
                       selectedAlert.action === 'schedule' ? '📅 Schedule Action' : 
                       selectedAlert.action === 'review' ? '👀 Review Required' : 
                       '✅ No Action Required'}
                    </span>
                  </div>
                  <div className="plants-info-item">
                    <span className="plants-info-label">Status</span>
                    <span className={`plants-info-value ${selectedAlert.resolved ? 'plants-resolved' : 'plants-active'}`}>
                      {selectedAlert.resolved ? '✅ Resolved' : '🔄 Active'}
                    </span>
                  </div>
                </div>
                
                <div className="plants-alert-actions-section">
                  <h4>Available Actions</h4>
                  <div className="plants-alert-action-buttons">
                    {!selectedAlert.resolved && (
                      <button 
                        className="plants-btn-success"
                        onClick={() => {
                          resolveAlert(selectedAlert.id);
                          setShowAlertDetails(false);
                        }}
                      >
                        ✅ Mark as Resolved
                      </button>
                    )}
                    
                    <button 
                      className="plants-btn-warning"
                      onClick={() => {
                        handleQuickAction('scheduleMaintenance');
                        setShowAlertDetails(false);
                      }}
                    >
                      🔧 Schedule Maintenance
                    </button>
                    
                    <button 
                      className="plants-btn-danger"
                      onClick={() => {
                        dismissAlert(selectedAlert.id);
                        setShowAlertDetails(false);
                      }}
                    >
                      🗑️ Dismiss Alert
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Plants;