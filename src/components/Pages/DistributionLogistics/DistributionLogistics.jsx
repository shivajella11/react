import React, { useState, useEffect } from 'react';
import './DistributionLogistics.css';

function DistributionLogistics() {
  const [activeTab, setActiveTab] = useState('overview');
  const [distributionStats, setDistributionStats] = useState({
    totalVehicles: 0,
    activeRoutes: 0,
    completedDeliveries: 0,
    pendingOrders: 0,
    totalDrivers: 0,
    fuelEfficiency: 0,
    onTimeDelivery: 0,
    customerSatisfaction: 0
  });

  const [realTimeTracking, setRealTimeTracking] = useState([]);
  const [warehouseData, setWarehouseData] = useState([]);
  const [deliveryAnalytics, setDeliveryAnalytics] = useState({});
  const [routeOptimization, setRouteOptimization] = useState({});
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({});

  // Simulate loading comprehensive data
  useEffect(() => {
    const timer = setTimeout(() => {
      setDistributionStats({
        totalVehicles: 45,
        activeRoutes: 12,
        completedDeliveries: 156,
        pendingOrders: 23,
        totalDrivers: 38,
        fuelEfficiency: 85.2,
        onTimeDelivery: 94.7,
        customerSatisfaction: 4.6
      });

      setRealTimeTracking([
        {
          vehicleId: 'DL-001',
          driver: 'Rajesh Kumar',
          location: 'Sector 15, Noida',
          status: 'delivering',
          nextStop: 'Sector 18 Market',
          eta: '15 mins',
          progress: 75,
          fuelLevel: 68,
          temperature: '4°C'
        },
        {
          vehicleId: 'DL-002',
          driver: 'Amit Singh',
          location: 'Connaught Place',
          status: 'returning',
          nextStop: 'Distribution Center',
          eta: '25 mins',
          progress: 90,
          fuelLevel: 45,
          temperature: '3°C'
        },
        {
          vehicleId: 'DL-003',
          driver: 'Suresh Patel',
          location: 'Gurgaon Hub',
          status: 'loading',
          nextStop: 'DLF Phase 1',
          eta: '5 mins',
          progress: 10,
          fuelLevel: 92,
          temperature: '2°C'
        }
      ]);

      setWarehouseData([
        {
          id: 'WH-001',
          name: 'Central Distribution Hub',
          location: 'Sector 63, Noida',
          capacity: '50,000L',
          currentStock: '42,500L',
          utilization: 85,
          temperature: '2-4°C',
          status: 'operational',
          lastUpdated: '2 mins ago'
        },
        {
          id: 'WH-002',
          name: 'South Delhi Center',
          location: 'Nehru Place',
          capacity: '30,000L',
          currentStock: '18,750L',
          utilization: 62.5,
          temperature: '3-5°C',
          status: 'operational',
          lastUpdated: '5 mins ago'
        },
        {
          id: 'WH-003',
          name: 'Gurgaon Facility',
          location: 'Cyber City',
          capacity: '40,000L',
          currentStock: '35,200L',
          utilization: 88,
          temperature: '2-4°C',
          status: 'maintenance',
          lastUpdated: '1 hour ago'
        }
      ]);

      setDeliveryAnalytics({
        todayDeliveries: 156,
        weeklyAverage: 142,
        monthlyTarget: 4500,
        completionRate: 94.7,
        averageDeliveryTime: '28 mins',
        customerRating: 4.6,
        returnRate: 2.3,
        costPerDelivery: '₹45'
      });

      setRouteOptimization({
        totalRoutes: 12,
        optimizedRoutes: 9,
        fuelSaved: '15.2%',
        timeSaved: '22 mins avg',
        distanceReduced: '18.5 km',
        co2Reduction: '12.8 kg',
        costSavings: '₹2,340'
      });

      setEmergencyAlerts([
        {
          id: 'ALT-001',
          type: 'vehicle_breakdown',
          vehicle: 'DL-007',
          location: 'NH-24, Ghaziabad',
          severity: 'high',
          message: 'Vehicle breakdown reported - Backup dispatched',
          timestamp: '10 mins ago',
          status: 'active'
        },
        {
          id: 'ALT-002',
          type: 'temperature_alert',
          vehicle: 'DL-012',
          location: 'Karol Bagh',
          severity: 'medium',
          message: 'Temperature rising above optimal range',
          timestamp: '25 mins ago',
          status: 'resolved'
        }
      ]);

      setPerformanceMetrics({
        driverPerformance: [
          { name: 'Rajesh Kumar', rating: 4.8, deliveries: 23, onTime: 96 },
          { name: 'Amit Singh', rating: 4.6, deliveries: 19, onTime: 94 },
          { name: 'Suresh Patel', rating: 4.9, deliveries: 21, onTime: 98 }
        ],
        vehicleEfficiency: [
          { vehicle: 'DL-001', efficiency: 92, maintenance: 'Good', mileage: '12.5 km/L' },
          { vehicle: 'DL-002', efficiency: 88, maintenance: 'Fair', mileage: '11.8 km/L' },
          { vehicle: 'DL-003', efficiency: 95, maintenance: 'Excellent', mileage: '13.2 km/L' }
        ]
      });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="logistics-overview-container">
            {/* Enhanced Stats Grid */}
            <div className="logistics-stats-grid">
              <div className="logistics-stat-card primary-stat">
                <div className="stat-icon-wrapper">
                  <div className="stat-icon-bg vehicles-bg">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="3" width="15" height="13"></rect>
                      <polygon points="16,8 20,8 23,11 23,16 16,16"></polygon>
                      <circle cx="5.5" cy="18.5" r="2.5"></circle>
                      <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                  </div>
                </div>
                <div className="stat-content-wrapper">
                  <div className="stat-number">{distributionStats.totalVehicles}</div>
                  <div className="stat-label">Fleet Vehicles</div>
                  <div className="stat-trend positive">+2 this month</div>
                </div>
              </div>

              <div className="logistics-stat-card secondary-stat">
                <div className="stat-icon-wrapper">
                  <div className="stat-icon-bg routes-bg">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                </div>
                <div className="stat-content-wrapper">
                  <div className="stat-number">{distributionStats.activeRoutes}</div>
                  <div className="stat-label">Active Routes</div>
                  <div className="stat-trend neutral">Same as yesterday</div>
                </div>
              </div>

              <div className="logistics-stat-card success-stat">
                <div className="stat-icon-wrapper">
                  <div className="stat-icon-bg deliveries-bg">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  </div>
                </div>
                <div className="stat-content-wrapper">
                  <div className="stat-number">{distributionStats.completedDeliveries}</div>
                  <div className="stat-label">Completed Today</div>
                  <div className="stat-trend positive">+12% vs yesterday</div>
                </div>
              </div>

              <div className="logistics-stat-card warning-stat">
                <div className="stat-icon-wrapper">
                  <div className="stat-icon-bg pending-bg">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                  </div>
                </div>
                <div className="stat-content-wrapper">
                  <div className="stat-number">{distributionStats.pendingOrders}</div>
                  <div className="stat-label">Pending Orders</div>
                  <div className="stat-trend negative">-3 from morning</div>
                </div>
              </div>
            </div>

            {/* Performance Metrics Row */}
            <div className="performance-metrics-row">
              <div className="performance-metric-item">
                <div className="metric-icon">👥</div>
                <div className="metric-details">
                  <span className="metric-value">{distributionStats.totalDrivers}</span>
                  <span className="metric-label">Active Drivers</span>
                </div>
              </div>
              <div className="performance-metric-item">
                <div className="metric-icon">⛽</div>
                <div className="metric-details">
                  <span className="metric-value">{distributionStats.fuelEfficiency}%</span>
                  <span className="metric-label">Fuel Efficiency</span>
                </div>
              </div>
              <div className="performance-metric-item">
                <div className="metric-icon">⏰</div>
                <div className="metric-details">
                  <span className="metric-value">{distributionStats.onTimeDelivery}%</span>
                  <span className="metric-label">On-Time Delivery</span>
                </div>
              </div>
              <div className="performance-metric-item">
                <div className="metric-icon">⭐</div>
                <div className="metric-details">
                  <span className="metric-value">{distributionStats.customerSatisfaction}/5</span>
                  <span className="metric-label">Customer Rating</span>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="logistics-main-content">
              {/* Real-Time Tracking */}
              <div className="logistics-content-section">
                <div className="section-header-logistics">
                  <h3>🚛 Real-Time Vehicle Tracking</h3>
                  <button className="refresh-tracking-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="23,4 23,10 17,10"></polyline>
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                    </svg>
                    Refresh
                  </button>
                </div>
                <div className="tracking-vehicles-list">
                  {realTimeTracking.map((vehicle, index) => (
                    <div key={index} className={`tracking-vehicle-card ${vehicle.status}`}>
                      <div className="vehicle-header-info">
                        <div className="vehicle-id-badge">{vehicle.vehicleId}</div>
                        <div className={`vehicle-status-indicator ${vehicle.status}`}>
                          {vehicle.status === 'delivering' && '🚚'}
                          {vehicle.status === 'returning' && '🔄'}
                          {vehicle.status === 'loading' && '📦'}
                        </div>
                      </div>
                      <div className="vehicle-driver-info">
                        <span className="driver-name">{vehicle.driver}</span>
                        <span className="current-location">{vehicle.location}</span>
                      </div>
                      <div className="vehicle-progress-section">
                        <div className="progress-bar-container">
                          <div className="progress-bar-fill" style={{width: `${vehicle.progress}%`}}></div>
                        </div>
                        <span className="progress-percentage">{vehicle.progress}%</span>
                      </div>
                      <div className="vehicle-details-grid">
                        <div className="detail-item">
                          <span className="detail-label">Next Stop:</span>
                          <span className="detail-value">{vehicle.nextStop}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">ETA:</span>
                          <span className="detail-value">{vehicle.eta}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Fuel:</span>
                          <span className="detail-value">{vehicle.fuelLevel}%</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Temp:</span>
                          <span className="detail-value">{vehicle.temperature}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Alerts */}
              <div className="logistics-content-section">
                <div className="section-header-logistics">
                  <h3>🚨 Emergency Alerts</h3>
                  <span className="alerts-count">{emergencyAlerts.length} Active</span>
                </div>
                <div className="emergency-alerts-container">
                  {emergencyAlerts.map((alert, index) => (
                    <div key={index} className={`emergency-alert-card ${alert.severity} ${alert.status}`}>
                      <div className="alert-header-section">
                        <div className="alert-type-icon">
                          {alert.type === 'vehicle_breakdown' && '🔧'}
                          {alert.type === 'temperature_alert' && '🌡️'}
                        </div>
                        <div className="alert-severity-badge">{alert.severity}</div>
                      </div>
                      <div className="alert-content-section">
                        <div className="alert-message">{alert.message}</div>
                        <div className="alert-details">
                          <span className="alert-vehicle">Vehicle: {alert.vehicle}</span>
                          <span className="alert-location">Location: {alert.location}</span>
                        </div>
                        <div className="alert-timestamp">{alert.timestamp}</div>
                      </div>
                      <div className="alert-actions">
                        <button className="alert-action-btn primary">Respond</button>
                        <button className="alert-action-btn secondary">Dismiss</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Distribution Map */}
            <div className="enhanced-distribution-map">
              <div className="map-header-section">
                <h3>🗺️ Live Distribution Network</h3>
                <div className="map-controls">
                  <button className="map-control-btn active">Real-Time</button>
                  <button className="map-control-btn">Routes</button>
                  <button className="map-control-btn">Heatmap</button>
                </div>
              </div>
              <div className="interactive-map-container">
                <svg width="100%" height="300" viewBox="0 0 800 300" className="enhanced-distribution-svg">
                  <defs>
                    <pattern id="enhanced-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                      <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
                    </pattern>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#enhanced-grid)" />
                  
                  {/* Distribution Centers */}
                  <g className="distribution-centers">
                    <circle cx="150" cy="80" r="12" fill="#4CAF50" filter="url(#glow)">
                      <animate attributeName="r" values="12;16;12" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    <text x="150" y="60" textAnchor="middle" fontSize="12" fill="#333" fontWeight="600">Central Hub</text>
                    <text x="150" y="105" textAnchor="middle" fontSize="10" fill="#666">42.5K/50K L</text>
                    
                    <circle cx="400" cy="150" r="12" fill="#2196F3" filter="url(#glow)">
                      <animate attributeName="r" values="12;16;12" dur="3s" repeatCount="indefinite" begin="1s"/>
                    </circle>
                    <text x="400" y="130" textAnchor="middle" fontSize="12" fill="#333" fontWeight="600">South Center</text>
                    <text x="400" y="175" textAnchor="middle" fontSize="10" fill="#666">18.7K/30K L</text>
                    
                    <circle cx="650" cy="100" r="12" fill="#FF9800" filter="url(#glow)">
                      <animate attributeName="r" values="12;16;12" dur="3s" repeatCount="indefinite" begin="2s"/>
                    </circle>
                    <text x="650" y="80" textAnchor="middle" fontSize="12" fill="#333" fontWeight="600">Gurgaon Hub</text>
                    <text x="650" y="125" textAnchor="middle" fontSize="10" fill="#666">35.2K/40K L</text>
                  </g>
                  
                  {/* Active Routes */}
                  <g className="active-routes">
                    <path d="M 150 80 Q 275 65 400 150" stroke="#4CAF50" strokeWidth="3" strokeDasharray="8,4" fill="none" opacity="0.8">
                      <animate attributeName="stroke-dashoffset" values="0;12" dur="2s" repeatCount="indefinite"/>
                    </path>
                    <path d="M 400 150 Q 525 125 650 100" stroke="#2196F3" strokeWidth="3" strokeDasharray="8,4" fill="none" opacity="0.8">
                      <animate attributeName="stroke-dashoffset" values="0;12" dur="2s" repeatCount="indefinite"/>
                    </path>
                  </g>
                  
                  {/* Moving Vehicles */}
                  <g className="moving-vehicles">
                    <circle cx="275" cy="115" r="6" fill="#FF5722">
                      <animateMotion dur="8s" repeatCount="indefinite">
                        <path d="M 150 80 Q 275 65 400 150 Q 525 125 650 100"/>
                      </animateMotion>
                    </circle>
                    <circle cx="525" cy="125" r="6" fill="#9C27B0">
                      <animateMotion dur="6s" repeatCount="indefinite" begin="2s">
                        <path d="M 400 150 Q 525 125 650 100 Q 400 50 150 80"/>
                      </animateMotion>
                    </circle>
                  </g>
                </svg>
                <div className="map-legend">
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: '#4CAF50'}}></div>
                    <span>Distribution Centers</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: '#FF5722'}}></div>
                    <span>Active Vehicles</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: '#2196F3'}}></div>
                    <span>Delivery Routes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'vehicles':
        return (
          <div className="vehicles-management-container">
            {/* Fleet Overview Stats */}
            <div className="fleet-overview-stats">
              <div className="fleet-stat-item operational">
                <div className="fleet-stat-icon">🚛</div>
                <div className="fleet-stat-content">
                  <span className="fleet-stat-number">32</span>
                  <span className="fleet-stat-label">Operational</span>
                </div>
              </div>
              <div className="fleet-stat-item maintenance">
                <div className="fleet-stat-icon">🔧</div>
                <div className="fleet-stat-content">
                  <span className="fleet-stat-number">8</span>
                  <span className="fleet-stat-label">Maintenance</span>
                </div>
              </div>
              <div className="fleet-stat-item idle">
                <div className="fleet-stat-icon">⏸️</div>
                <div className="fleet-stat-content">
                  <span className="fleet-stat-number">5</span>
                  <span className="fleet-stat-label">Idle</span>
                </div>
              </div>
              <div className="fleet-stat-item efficiency">
                <div className="fleet-stat-icon">⚡</div>
                <div className="fleet-stat-content">
                  <span className="fleet-stat-number">87%</span>
                  <span className="fleet-stat-label">Efficiency</span>
                </div>
              </div>
            </div>

            {/* Vehicle Management Controls */}
            <div className="vehicle-management-controls">
              <div className="control-filters">
                <button className="filter-btn active">All Vehicles</button>
                <button className="filter-btn">Active</button>
                <button className="filter-btn">Maintenance</button>
                <button className="filter-btn">Idle</button>
              </div>
              <div className="control-actions">
                <button className="control-action-btn primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  Fleet Report
                </button>
                <button className="control-action-btn secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  Schedule Maintenance
                </button>
              </div>
            </div>

            {/* Enhanced Vehicle Cards Grid */}
            <div className="enhanced-vehicles-grid">
              {/* Active Vehicle 1 */}
              <div className="enhanced-vehicle-card active-vehicle">
                <div className="vehicle-card-header">
                  <div className="vehicle-identification">
                    <span className="vehicle-id-badge">DL-001</span>
                    <div className="vehicle-status-indicator active">
                      <div className="status-dot"></div>
                      <span>Active</span>
                    </div>
                  </div>
                  <div className="vehicle-actions-menu">
                    <button className="action-menu-btn">⋮</button>
                  </div>
                </div>
                
                <div className="vehicle-driver-section">
                  <div className="driver-avatar">👨‍💼</div>
                  <div className="driver-info">
                    <span className="driver-name">Rajesh Kumar</span>
                    <span className="driver-rating">⭐ 4.8</span>
                  </div>
                </div>

                <div className="vehicle-specifications">
                  <div className="spec-item">
                    <span className="spec-label">Model:</span>
                    <span className="spec-value">Tata 407</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Capacity:</span>
                    <span className="spec-value">5,000L</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Year:</span>
                    <span className="spec-value">2022</span>
                  </div>
                </div>

                <div className="vehicle-current-status">
                  <div className="status-row">
                    <span className="status-label">Current Route:</span>
                    <span className="status-value">Sector 15 → Sector 18</span>
                  </div>
                  <div className="status-row">
                    <span className="status-label">Load:</span>
                    <div className="load-indicator">
                      <div className="load-bar">
                        <div className="load-fill" style={{width: '84%'}}></div>
                      </div>
                      <span className="load-percentage">84%</span>
                    </div>
                  </div>
                  <div className="status-row">
                    <span className="status-label">Fuel Level:</span>
                    <div className="fuel-indicator">
                      <div className="fuel-bar">
                        <div className="fuel-fill" style={{width: '68%'}}></div>
                      </div>
                      <span className="fuel-percentage">68%</span>
                    </div>
                  </div>
                </div>

                <div className="vehicle-performance-metrics">
                  <div className="performance-metric">
                    <span className="metric-icon">📍</span>
                    <span className="metric-value">Sector 15, Noida</span>
                  </div>
                  <div className="performance-metric">
                    <span className="metric-icon">🌡️</span>
                    <span className="metric-value">4°C</span>
                  </div>
                  <div className="performance-metric">
                    <span className="metric-icon">⏱️</span>
                    <span className="metric-value">15 min ETA</span>
                  </div>
                </div>

                <div className="vehicle-card-actions">
                  <button className="vehicle-action-btn primary">Track Live</button>
                  <button className="vehicle-action-btn secondary">Contact Driver</button>
                </div>
              </div>

              {/* Maintenance Vehicle */}
              <div className="enhanced-vehicle-card maintenance-vehicle">
                <div className="vehicle-card-header">
                  <div className="vehicle-identification">
                    <span className="vehicle-id-badge">DL-002</span>
                    <div className="vehicle-status-indicator maintenance">
                      <div className="status-dot"></div>
                      <span>Maintenance</span>
                    </div>
                  </div>
                  <div className="vehicle-actions-menu">
                    <button className="action-menu-btn">⋮</button>
                  </div>
                </div>
                
                <div className="vehicle-driver-section">
                  <div className="driver-avatar">🔧</div>
                  <div className="driver-info">
                    <span className="driver-name">Service Center</span>
                    <span className="driver-rating">Scheduled</span>
                  </div>
                </div>

                <div className="vehicle-specifications">
                  <div className="spec-item">
                    <span className="spec-label">Model:</span>
                    <span className="spec-value">Mahindra Bolero</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Capacity:</span>
                    <span className="spec-value">3,000L</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Year:</span>
                    <span className="spec-value">2021</span>
                  </div>
                </div>

                <div className="maintenance-details">
                  <div className="maintenance-item">
                    <span className="maintenance-type">🔧 Engine Service</span>
                    <span className="maintenance-status">In Progress</span>
                  </div>
                  <div className="maintenance-item">
                    <span className="maintenance-type">🛞 Tire Replacement</span>
                    <span className="maintenance-status">Pending</span>
                  </div>
                  <div className="maintenance-progress">
                    <div className="progress-label">Completion:</div>
                    <div className="progress-bar-maintenance">
                      <div className="progress-fill-maintenance" style={{width: '65%'}}></div>
                    </div>
                    <span className="progress-text">65%</span>
                  </div>
                </div>

                <div className="maintenance-timeline">
                  <div className="timeline-item">
                    <span className="timeline-label">Started:</span>
                    <span className="timeline-value">Today 9:00 AM</span>
                  </div>
                  <div className="timeline-item">
                    <span className="timeline-label">Expected:</span>
                    <span className="timeline-value">Tomorrow 2:00 PM</span>
                  </div>
                </div>

                <div className="vehicle-card-actions">
                  <button className="vehicle-action-btn primary">View Details</button>
                  <button className="vehicle-action-btn secondary">Contact Service</button>
                </div>
              </div>

              {/* Idle Vehicle */}
              <div className="enhanced-vehicle-card idle-vehicle">
                <div className="vehicle-card-header">
                  <div className="vehicle-identification">
                    <span className="vehicle-id-badge">DL-003</span>
                    <div className="vehicle-status-indicator idle">
                      <div className="status-dot"></div>
                      <span>Idle</span>
                    </div>
                  </div>
                  <div className="vehicle-actions-menu">
                    <button className="action-menu-btn">⋮</button>
                  </div>
                </div>
                
                <div className="vehicle-driver-section">
                  <div className="driver-avatar">👨‍💼</div>
                  <div className="driver-info">
                    <span className="driver-name">Suresh Patel</span>
                    <span className="driver-rating">⭐ 4.9</span>
                  </div>
                </div>

                <div className="vehicle-specifications">
                  <div className="spec-item">
                    <span className="spec-label">Model:</span>
                    <span className="spec-value">Ashok Leyland</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Capacity:</span>
                    <span className="spec-value">4,000L</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Year:</span>
                    <span className="spec-value">2023</span>
                  </div>
                </div>

                <div className="idle-status-details">
                  <div className="idle-info-row">
                    <span className="idle-label">Location:</span>
                    <span className="idle-value">Distribution Center</span>
                  </div>
                  <div className="idle-info-row">
                    <span className="idle-label">Idle Since:</span>
                    <span className="idle-value">2 hours ago</span>
                  </div>
                  <div className="idle-info-row">
                    <span className="idle-label">Fuel Level:</span>
                    <div className="fuel-indicator">
                      <div className="fuel-bar">
                        <div className="fuel-fill" style={{width: '92%'}}></div>
                      </div>
                      <span className="fuel-percentage">92%</span>
                    </div>
                  </div>
                </div>

                <div className="availability-status">
                  <div className="availability-indicator available">
                    <div className="availability-dot"></div>
                    <span>Available for Assignment</span>
                  </div>
                </div>

                <div className="vehicle-card-actions">
                  <button className="vehicle-action-btn primary">Assign Route</button>
                  <button className="vehicle-action-btn secondary">View History</button>
                </div>
              </div>

              {/* Additional Vehicle Cards */}
              <div className="enhanced-vehicle-card active-vehicle">
                <div className="vehicle-card-header">
                  <div className="vehicle-identification">
                    <span className="vehicle-id-badge">DL-004</span>
                    <div className="vehicle-status-indicator active">
                      <div className="status-dot"></div>
                      <span>Active</span>
                    </div>
                  </div>
                  <div className="vehicle-actions-menu">
                    <button className="action-menu-btn">⋮</button>
                  </div>
                </div>
                
                <div className="vehicle-driver-section">
                  <div className="driver-avatar">👨‍💼</div>
                  <div className="driver-info">
                    <span className="driver-name">Amit Singh</span>
                    <span className="driver-rating">⭐ 4.6</span>
                  </div>
                </div>

                <div className="vehicle-specifications">
                  <div className="spec-item">
                    <span className="spec-label">Model:</span>
                    <span className="spec-value">Eicher Pro</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Capacity:</span>
                    <span className="spec-value">6,000L</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Year:</span>
                    <span className="spec-value">2023</span>
                  </div>
                </div>

                <div className="vehicle-current-status">
                  <div className="status-row">
                    <span className="status-label">Current Route:</span>
                    <span className="status-value">Connaught Place → CP</span>
                  </div>
                  <div className="status-row">
                    <span className="status-label">Load:</span>
                    <div className="load-indicator">
                      <div className="load-bar">
                        <div className="load-fill" style={{width: '76%'}}></div>
                      </div>
                      <span className="load-percentage">76%</span>
                    </div>
                  </div>
                  <div className="status-row">
                    <span className="status-label">Fuel Level:</span>
                    <div className="fuel-indicator">
                      <div className="fuel-bar">
                        <div className="fuel-fill" style={{width: '45%'}}></div>
                      </div>
                      <span className="fuel-percentage">45%</span>
                    </div>
                  </div>
                </div>

                <div className="vehicle-performance-metrics">
                  <div className="performance-metric">
                    <span className="metric-icon">📍</span>
                    <span className="metric-value">Connaught Place</span>
                  </div>
                  <div className="performance-metric">
                    <span className="metric-icon">🌡️</span>
                    <span className="metric-value">3°C</span>
                  </div>
                  <div className="performance-metric">
                    <span className="metric-icon">⏱️</span>
                    <span className="metric-value">25 min ETA</span>
                  </div>
                </div>

                <div className="vehicle-card-actions">
                  <button className="vehicle-action-btn primary">Track Live</button>
                  <button className="vehicle-action-btn secondary">Contact Driver</button>
                </div>
              </div>
            </div>

            {/* Fleet Performance Summary */}
            <div className="fleet-performance-summary">
              <div className="summary-header">
                <h3>📊 Fleet Performance Summary</h3>
                <select className="time-period-selector">
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>
              <div className="performance-summary-grid">
                <div className="summary-metric-card">
                  <div className="summary-metric-icon">🛣️</div>
                  <div className="summary-metric-content">
                    <span className="summary-metric-value">2,847 km</span>
                    <span className="summary-metric-label">Total Distance</span>
                    <span className="summary-metric-change positive">+12%</span>
                  </div>
                </div>
                <div className="summary-metric-card">
                  <div className="summary-metric-icon">⛽</div>
                  <div className="summary-metric-content">
                    <span className="summary-metric-value">₹18,450</span>
                    <span className="summary-metric-label">Fuel Cost</span>
                    <span className="summary-metric-change negative">+8%</span>
                  </div>
                </div>
                <div className="summary-metric-card">
                  <div className="summary-metric-icon">🔧</div>
                  <div className="summary-metric-content">
                    <span className="summary-metric-value">₹5,200</span>
                    <span className="summary-metric-label">Maintenance</span>
                    <span className="summary-metric-change positive">-15%</span>
                  </div>
                </div>
                <div className="summary-metric-card">
                  <div className="summary-metric-icon">⏰</div>
                  <div className="summary-metric-content">
                    <span className="summary-metric-value">94.7%</span>
                    <span className="summary-metric-label">On-Time Rate</span>
                    <span className="summary-metric-change positive">+3%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'routes':
        return (
          <div className="routes-management-container">
            {/* Route Analytics Dashboard */}
            <div className="route-analytics-dashboard">
              <div className="analytics-header">
                <h3>📈 Route Analytics</h3>
                <div className="analytics-controls">
                  <button className="analytics-control-btn active">Live View</button>
                  <button className="analytics-control-btn">Optimization</button>
                  <button className="analytics-control-btn">History</button>
                </div>
              </div>
              <div className="analytics-metrics-row">
                <div className="analytics-metric-item">
                  <div className="metric-icon-circle routes-active">🚛</div>
                  <div className="metric-content">
                    <span className="metric-number">12</span>
                    <span className="metric-label">Active Routes</span>
                    <span className="metric-trend positive">+2 today</span>
                  </div>
                </div>
                <div className="analytics-metric-item">
                  <div className="metric-icon-circle routes-completed">✅</div>
                  <div className="metric-content">
                    <span className="metric-number">156</span>
                    <span className="metric-label">Completed</span>
                    <span className="metric-trend positive">+18% vs yesterday</span>
                  </div>
                </div>
                <div className="analytics-metric-item">
                  <div className="metric-icon-circle routes-efficiency">⚡</div>
                  <div className="metric-content">
                    <span className="metric-number">87.3%</span>
                    <span className="metric-label">Efficiency</span>
                    <span className="metric-trend positive">+5.2%</span>
                  </div>
                </div>
                <div className="analytics-metric-item">
                  <div className="metric-icon-circle routes-savings">💰</div>
                  <div className="metric-content">
                    <span className="metric-number">₹2,340</span>
                    <span className="metric-label">Cost Saved</span>
                    <span className="metric-trend positive">Today</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Route Optimization Panel */}
            <div className="route-optimization-panel">
              <div className="optimization-header">
                <h3>🎯 Smart Route Optimization</h3>
                <button className="optimize-all-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                  </svg>
                  Optimize All Routes
                </button>
              </div>
              <div className="optimization-stats">
                <div className="optimization-stat">
                  <span className="stat-icon">🛣️</span>
                  <span className="stat-value">18.5 km</span>
                  <span className="stat-label">Distance Reduced</span>
                </div>
                <div className="optimization-stat">
                  <span className="stat-icon">⏱️</span>
                  <span className="stat-value">22 min</span>
                  <span className="stat-label">Time Saved</span>
                </div>
                <div className="optimization-stat">
                  <span className="stat-icon">⛽</span>
                  <span className="stat-value">15.2%</span>
                  <span className="stat-label">Fuel Saved</span>
                </div>
                <div className="optimization-stat">
                  <span className="stat-icon">🌱</span>
                  <span className="stat-value">12.8 kg</span>
                  <span className="stat-label">CO₂ Reduced</span>
                </div>
              </div>
            </div>

            {/* Enhanced Routes Grid */}
            <div className="enhanced-routes-grid">
              {/* Active Route 1 */}
              <div className="enhanced-route-card active-route">
                <div className="route-card-header">
                  <div className="route-identification">
                    <span className="route-id-badge">RT-001</span>
                    <div className="route-status-indicator active">
                      <div className="status-pulse"></div>
                      <span>Active</span>
                    </div>
                  </div>
                  <div className="route-priority high">High Priority</div>
                </div>

                <div className="route-title-section">
                  <h4 className="route-title">City Center Express</h4>
                  <span className="route-description">Sector 15 → Sector 18 → CP → Karol Bagh</span>
                </div>

                <div className="route-assignment-info">
                  <div className="assigned-vehicle">
                    <span className="vehicle-icon">🚛</span>
                    <div className="vehicle-details">
                      <span className="vehicle-id">DL-001</span>
                      <span className="driver-name">Rajesh Kumar</span>
                    </div>
                  </div>
                  <div className="route-timing">
                    <span className="start-time">Started: 8:30 AM</span>
                    <span className="eta">ETA: 11:45 AM</span>
                  </div>
                </div>

                <div className="route-progress-section">
                  <div className="progress-header">
                    <span className="progress-label">Route Progress</span>
                    <span className="progress-percentage">65%</span>
                  </div>
                  <div className="route-progress-bar">
                    <div className="progress-track">
                      <div className="progress-fill-route" style={{width: '65%'}}></div>
                    </div>
                  </div>
                  <div className="progress-stops">
                    <div className="stop completed">1</div>
                    <div className="stop completed">2</div>
                    <div className="stop completed">3</div>
                    <div className="stop current">4</div>
                    <div className="stop pending">5</div>
                    <div className="stop pending">6</div>
                    <div className="stop pending">7</div>
                    <div className="stop pending">8</div>
                  </div>
                </div>

                <div className="route-metrics-grid">
                  <div className="route-metric">
                    <span className="metric-icon">📏</span>
                    <div className="metric-info">
                      <span className="metric-value">45 km</span>
                      <span className="metric-label">Distance</span>
                    </div>
                  </div>
                  <div className="route-metric">
                    <span className="metric-icon">⏰</span>
                    <div className="metric-info">
                      <span className="metric-value">2.5 hrs</span>
                      <span className="metric-label">Duration</span>
                    </div>
                  </div>
                  <div className="route-metric">
                    <span className="metric-icon">📦</span>
                    <div className="metric-info">
                      <span className="metric-value">8</span>
                      <span className="metric-label">Stops</span>
                    </div>
                  </div>
                  <div className="route-metric">
                    <span className="metric-icon">⛽</span>
                    <div className="metric-info">
                      <span className="metric-value">68%</span>
                      <span className="metric-label">Fuel</span>
                    </div>
                  </div>
                </div>

                <div className="route-card-actions">
                  <button className="route-action-btn primary">Track Live</button>
                  <button className="route-action-btn secondary">Optimize</button>
                  <button className="route-action-btn tertiary">Details</button>
                </div>
              </div>

              {/* Pending Route */}
              <div className="enhanced-route-card pending-route">
                <div className="route-card-header">
                  <div className="route-identification">
                    <span className="route-id-badge">RT-002</span>
                    <div className="route-status-indicator pending">
                      <div className="status-pulse"></div>
                      <span>Pending</span>
                    </div>
                  </div>
                  <div className="route-priority medium">Medium Priority</div>
                </div>

                <div className="route-title-section">
                  <h4 className="route-title">Industrial Zone Circuit</h4>
                  <span className="route-description">Gurgaon Hub → DLF → Cyber City → Udyog Vihar</span>
                </div>

                <div className="route-assignment-info">
                  <div className="assigned-vehicle">
                    <span className="vehicle-icon">🚛</span>
                    <div className="vehicle-details">
                      <span className="vehicle-id">DL-003</span>
                      <span className="driver-name">Suresh Patel</span>
                    </div>
                  </div>
                  <div className="route-timing">
                    <span className="start-time">Scheduled: 10:00 AM</span>
                    <span className="eta">ETA: 12:30 PM</span>
                  </div>
                </div>

                <div className="route-preparation-status">
                  <div className="preparation-item completed">
                    <span className="prep-icon">✅</span>
                    <span className="prep-text">Vehicle Assigned</span>
                  </div>
                  <div className="preparation-item completed">
                    <span className="prep-icon">✅</span>
                    <span className="prep-text">Route Optimized</span>
                  </div>
                  <div className="preparation-item pending">
                    <span className="prep-icon">⏳</span>
                    <span className="prep-text">Loading in Progress</span>
                  </div>
                </div>

                <div className="route-metrics-grid">
                  <div className="route-metric">
                    <span className="metric-icon">📏</span>
                    <div className="metric-info">
                      <span className="metric-value">32 km</span>
                      <span className="metric-label">Distance</span>
                    </div>
                  </div>
                  <div className="route-metric">
                    <span className="metric-icon">⏰</span>
                    <div className="metric-info">
                      <span className="metric-value">2 hrs</span>
                      <span className="metric-label">Duration</span>
                    </div>
                  </div>
                  <div className="route-metric">
                    <span className="metric-icon">📦</span>
                    <div className="metric-info">
                      <span className="metric-value">6</span>
                      <span className="metric-label">Stops</span>
                    </div>
                  </div>
                  <div className="route-metric">
                    <span className="metric-icon">⛽</span>
                    <div className="metric-info">
                      <span className="metric-value">92%</span>
                      <span className="metric-label">Fuel</span>
                    </div>
                  </div>
                </div>

                <div className="route-card-actions">
                  <button className="route-action-btn primary">Start Route</button>
                  <button className="route-action-btn secondary">Modify</button>
                  <button className="route-action-btn tertiary">Details</button>
                </div>
              </div>

              {/* Completed Route */}
              <div className="enhanced-route-card completed-route">
                <div className="route-card-header">
                  <div className="route-identification">
                    <span className="route-id-badge">RT-003</span>
                    <div className="route-status-indicator completed">
                      <div className="status-pulse"></div>
                      <span>Completed</span>
                    </div>
                  </div>
                  <div className="route-priority low">Low Priority</div>
                </div>

                <div className="route-title-section">
                  <h4 className="route-title">South Delhi Loop</h4>
                  <span className="route-description">Nehru Place → Lajpat Nagar → CR Park → GK</span>
                </div>

                <div className="route-assignment-info">
                  <div className="assigned-vehicle">
                    <span className="vehicle-icon">🚛</span>
                    <div className="vehicle-details">
                      <span className="vehicle-id">DL-002</span>
                      <span className="driver-name">Amit Singh</span>
                    </div>
                  </div>
                  <div className="route-timing">
                    <span className="start-time">Completed: 9:45 AM</span>
                    <span className="eta">Duration: 1h 45m</span>
                  </div>
                </div>

                <div className="completion-summary">
                  <div className="completion-stats">
                    <div className="completion-stat">
                      <span className="stat-icon">✅</span>
                      <span className="stat-value">5/5</span>
                      <span className="stat-label">Stops</span>
                    </div>
                    <div className="completion-stat">
                      <span className="stat-icon">⏰</span>
                      <span className="stat-value">On Time</span>
                      <span className="stat-label">Delivery</span>
                    </div>
                    <div className="completion-stat">
                      <span className="stat-icon">⭐</span>
                      <span className="stat-value">4.8</span>
                      <span className="stat-label">Rating</span>
                    </div>
                  </div>
                </div>

                <div className="route-metrics-grid">
                  <div className="route-metric">
                    <span className="metric-icon">📏</span>
                    <div className="metric-info">
                      <span className="metric-value">28 km</span>
                      <span className="metric-label">Distance</span>
                    </div>
                  </div>
                  <div className="route-metric">
                    <span className="metric-icon">⏰</span>
                    <div className="metric-info">
                      <span className="metric-value">1h 45m</span>
                      <span className="metric-label">Actual</span>
                    </div>
                  </div>
                  <div className="route-metric">
                    <span className="metric-icon">📦</span>
                    <div className="metric-info">
                      <span className="metric-value">5</span>
                      <span className="metric-label">Stops</span>
                    </div>
                  </div>
                  <div className="route-metric">
                    <span className="metric-icon">⛽</span>
                    <div className="metric-info">
                      <span className="metric-value">45%</span>
                      <span className="metric-label">Fuel Used</span>
                    </div>
                  </div>
                </div>

                <div className="route-card-actions">
                  <button className="route-action-btn primary">View Report</button>
                  <button className="route-action-btn secondary">Duplicate</button>
                  <button className="route-action-btn tertiary">Archive</button>
                </div>
              </div>

              {/* Optimized Route */}
              <div className="enhanced-route-card optimized-route">
                <div className="route-card-header">
                  <div className="route-identification">
                    <span className="route-id-badge">RT-004</span>
                    <div className="route-status-indicator optimized">
                      <div className="status-pulse"></div>
                      <span>Optimized</span>
                    </div>
                  </div>
                  <div className="route-priority high">High Priority</div>
                </div>

                <div className="route-title-section">
                  <h4 className="route-title">North Delhi Express</h4>
                  <span className="route-description">Model Town → Civil Lines → Kamla Nagar → GTB Nagar</span>
                </div>

                <div className="optimization-benefits">
                  <div className="benefit-item">
                    <span className="benefit-icon">⚡</span>
                    <span className="benefit-text">15% faster route</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">⛽</span>
                    <span className="benefit-text">12% fuel savings</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🌱</span>
                    <span className="benefit-text">8.5kg CO₂ reduced</span>
                  </div>
                </div>

                <div className="route-assignment-info">
                  <div className="assigned-vehicle">
                    <span className="vehicle-icon">🚛</span>
                    <div className="vehicle-details">
                      <span className="vehicle-id">DL-004</span>
                      <span className="driver-name">Vikram Sharma</span>
                    </div>
                  </div>
                  <div className="route-timing">
                    <span className="start-time">Ready to Start</span>
                    <span className="eta">Optimized ETA: 2h 15m</span>
                  </div>
                </div>

                <div className="route-metrics-grid">
                  <div className="route-metric">
                    <span className="metric-icon">📏</span>
                    <div className="metric-info">
                      <span className="metric-value">38 km</span>
                      <span className="metric-label">Distance</span>
                    </div>
                  </div>
                  <div className="route-metric">
                    <span className="metric-icon">⏰</span>
                    <div className="metric-info">
                      <span className="metric-value">2h 15m</span>
                      <span className="metric-label">Duration</span>
                    </div>
                  </div>
                  <div className="route-metric">
                    <span className="metric-icon">📦</span>
                    <div className="metric-info">
                      <span className="metric-value">7</span>
                      <span className="metric-label">Stops</span>
                    </div>
                  </div>
                  <div className="route-metric">
                    <span className="metric-icon">💰</span>
                    <div className="metric-info">
                      <span className="metric-value">₹180</span>
                      <span className="metric-label">Saved</span>
                    </div>
                  </div>
                </div>

                <div className="route-card-actions">
                  <button className="route-action-btn primary">Start Optimized</button>
                  <button className="route-action-btn secondary">Compare</button>
                  <button className="route-action-btn tertiary">Details</button>
                </div>
              </div>
            </div>

            {/* Route Management Tools */}
            <div className="route-management-tools">
              <div className="tools-header">
                <h3>🛠️ Route Management Tools</h3>
              </div>
              <div className="management-tools-grid">
                <div className="management-tool-card">
                  <div className="tool-icon">📊</div>
                  <div className="tool-content">
                    <h4>Route Analytics</h4>
                    <p>Detailed performance analysis and insights</p>
                    <button className="tool-action-btn">View Analytics</button>
                  </div>
                </div>
                <div className="management-tool-card">
                  <div className="tool-icon">🎯</div>
                  <div className="tool-content">
                    <h4>Bulk Optimization</h4>
                    <p>Optimize multiple routes simultaneously</p>
                    <button className="tool-action-btn">Optimize All</button>
                  </div>
                </div>
                <div className="management-tool-card">
                  <div className="tool-icon">📋</div>
                  <div className="tool-content">
                    <h4>Route Templates</h4>
                    <p>Create and manage reusable route templates</p>
                    <button className="tool-action-btn">Manage Templates</button>
                  </div>
                </div>
                <div className="management-tool-card">
                  <div className="tool-icon">📈</div>
                  <div className="tool-content">
                    <h4>Performance Reports</h4>
                    <p>Generate comprehensive route reports</p>
                    <button className="tool-action-btn">Generate Report</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'warehouses':
        return (
          <div className="warehouses-management-container">
            {/* Warehouse Overview */}
            <div className="warehouse-overview-section">
              <div className="overview-header">
                <h3>🏭 Warehouse Network Overview</h3>
                <div className="overview-controls">
                  <button className="overview-control-btn active">All Facilities</button>
                  <button className="overview-control-btn">Operational</button>
                  <button className="overview-control-btn">Maintenance</button>
                </div>
              </div>
              <div className="warehouse-stats-row">
                <div className="warehouse-stat-item">
                  <div className="stat-icon-circle warehouse-total">🏭</div>
                  <div className="stat-content">
                    <span className="stat-number">3</span>
                    <span className="stat-label">Total Facilities</span>
                  </div>
                </div>
                <div className="warehouse-stat-item">
                  <div className="stat-icon-circle warehouse-capacity">📦</div>
                  <div className="stat-content">
                    <span className="stat-number">120K L</span>
                    <span className="stat-label">Total Capacity</span>
                  </div>
                </div>
                <div className="warehouse-stat-item">
                  <div className="stat-icon-circle warehouse-utilization">📊</div>
                  <div className="stat-content">
                    <span className="stat-number">78.3%</span>
                    <span className="stat-label">Utilization</span>
                  </div>
                </div>
                <div className="warehouse-stat-item">
                  <div className="stat-icon-circle warehouse-temperature">🌡️</div>
                  <div className="stat-content">
                    <span className="stat-number">2-4°C</span>
                    <span className="stat-label">Avg Temp</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Warehouse Cards Grid */}
            <div className="warehouse-cards-grid">
              {warehouseData.map((warehouse, index) => (
                <div key={index} className={`warehouse-card ${warehouse.status}`}>
                  <div className="warehouse-card-header">
                    <div className="warehouse-identification">
                      <span className="warehouse-id-badge">{warehouse.id}</span>
                      <div className={`warehouse-status-indicator ${warehouse.status}`}>
                        <div className="status-dot"></div>
                        <span>{warehouse.status}</span>
                      </div>
                    </div>
                    <div className="warehouse-actions-menu">
                      <button className="action-menu-btn">⋮</button>
                    </div>
                  </div>

                  <div className="warehouse-info-section">
                    <h4 className="warehouse-name">{warehouse.name}</h4>
                    <span className="warehouse-location">{warehouse.location}</span>
                  </div>

                  <div className="warehouse-capacity-section">
                    <div className="capacity-header">
                      <span className="capacity-label">Storage Capacity</span>
                      <span className="capacity-percentage">{warehouse.utilization}%</span>
                    </div>
                    <div className="capacity-bar">
                      <div className="capacity-fill" style={{width: `${warehouse.utilization}%`}}></div>
                    </div>
                    <div className="capacity-details">
                      <span className="current-stock">{warehouse.currentStock}</span>
                      <span className="total-capacity">/ {warehouse.capacity}</span>
                    </div>
                  </div>

                  <div className="warehouse-metrics-grid">
                    <div className="warehouse-metric">
                      <span className="metric-icon">🌡️</span>
                      <div className="metric-info">
                        <span className="metric-value">{warehouse.temperature}</span>
                        <span className="metric-label">Temperature</span>
                      </div>
                    </div>
                    <div className="warehouse-metric">
                      <span className="metric-icon">⏰</span>
                      <div className="metric-info">
                        <span className="metric-value">{warehouse.lastUpdated}</span>
                        <span className="metric-label">Last Updated</span>
                      </div>
                    </div>
                  </div>

                  <div className="warehouse-card-actions">
                    <button className="warehouse-action-btn primary">Monitor</button>
                    <button className="warehouse-action-btn secondary">Details</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Inventory Management */}
            <div className="inventory-management-section">
              <div className="inventory-header">
                <h3>📋 Inventory Management</h3>
                <button className="inventory-refresh-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23,4 23,10 17,10"></polyline>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                  </svg>
                  Refresh Inventory
                </button>
              </div>
              <div className="inventory-summary-cards">
                <div className="inventory-summary-card">
                  <div className="summary-icon">📦</div>
                  <div className="summary-content">
                    <span className="summary-value">96,450 L</span>
                    <span className="summary-label">Total Stock</span>
                    <span className="summary-change positive">+2,340 L today</span>
                  </div>
                </div>
                <div className="inventory-summary-card">
                  <div className="summary-icon">📈</div>
                  <div className="summary-content">
                    <span className="summary-value">18,750 L</span>
                    <span className="summary-label">Incoming</span>
                    <span className="summary-change neutral">Expected today</span>
                  </div>
                </div>
                <div className="inventory-summary-card">
                  <div className="summary-icon">📉</div>
                  <div className="summary-content">
                    <span className="summary-value">22,100 L</span>
                    <span className="summary-label">Outgoing</span>
                    <span className="summary-change negative">Scheduled today</span>
                  </div>
                </div>
                <div className="inventory-summary-card">
                  <div className="summary-icon">⚠️</div>
                  <div className="summary-content">
                    <span className="summary-value">2</span>
                    <span className="summary-label">Low Stock Alerts</span>
                    <span className="summary-change warning">Requires attention</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="analytics-management-container">
            {/* Delivery Analytics Overview */}
            <div className="delivery-analytics-overview">
              <div className="analytics-overview-header">
                <h3>📊 Delivery Performance Analytics</h3>
                <select className="analytics-time-selector">
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Quarter</option>
                </select>
              </div>
              <div className="analytics-overview-grid">
                <div className="analytics-overview-card">
                  <div className="overview-card-icon">🚚</div>
                  <div className="overview-card-content">
                    <span className="overview-card-value">{deliveryAnalytics.todayDeliveries}</span>
                    <span className="overview-card-label">Today's Deliveries</span>
                    <span className="overview-card-trend positive">+12% vs yesterday</span>
                  </div>
                </div>
                <div className="analytics-overview-card">
                  <div className="overview-card-icon">⏰</div>
                  <div className="overview-card-content">
                    <span className="overview-card-value">{deliveryAnalytics.completionRate}%</span>
                    <span className="overview-card-label">On-Time Rate</span>
                    <span className="overview-card-trend positive">+3.2% this week</span>
                  </div>
                </div>
                <div className="analytics-overview-card">
                  <div className="overview-card-icon">⭐</div>
                  <div className="overview-card-content">
                    <span className="overview-card-value">{deliveryAnalytics.customerRating}</span>
                    <span className="overview-card-label">Customer Rating</span>
                    <span className="overview-card-trend positive">+0.2 this month</span>
                  </div>
                </div>
                <div className="analytics-overview-card">
                  <div className="overview-card-icon">💰</div>
                  <div className="overview-card-content">
                    <span className="overview-card-value">{deliveryAnalytics.costPerDelivery}</span>
                    <span className="overview-card-label">Cost per Delivery</span>
                    <span className="overview-card-trend negative">+₹3 vs last week</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics Dashboard */}
            <div className="performance-metrics-dashboard">
              <div className="metrics-dashboard-header">
                <h3>🎯 Key Performance Indicators</h3>
                <div className="dashboard-controls">
                  <button className="dashboard-control-btn active">Real-time</button>
                  <button className="dashboard-control-btn">Historical</button>
                  <button className="dashboard-control-btn">Predictive</button>
                </div>
              </div>
              <div className="kpi-metrics-grid">
                <div className="kpi-metric-card">
                  <div className="kpi-header">
                    <span className="kpi-title">Delivery Efficiency</span>
                    <span className="kpi-value">94.7%</span>
                  </div>
                  <div className="kpi-progress-bar">
                    <div className="kpi-progress-fill" style={{width: '94.7%'}}></div>
                  </div>
                  <div className="kpi-details">
                    <span className="kpi-target">Target: 95%</span>
                    <span className="kpi-trend positive">↗️ +2.3%</span>
                  </div>
                </div>
                <div className="kpi-metric-card">
                  <div className="kpi-header">
                    <span className="kpi-title">Route Optimization</span>
                    <span className="kpi-value">87.3%</span>
                  </div>
                  <div className="kpi-progress-bar">
                    <div className="kpi-progress-fill" style={{width: '87.3%'}}></div>
                  </div>
                  <div className="kpi-details">
                    <span className="kpi-target">Target: 90%</span>
                    <span className="kpi-trend positive">↗️ +5.1%</span>
                  </div>
                </div>
                <div className="kpi-metric-card">
                  <div className="kpi-header">
                    <span className="kpi-title">Fuel Efficiency</span>
                    <span className="kpi-value">85.2%</span>
                  </div>
                  <div className="kpi-progress-bar">
                    <div className="kpi-progress-fill" style={{width: '85.2%'}}></div>
                  </div>
                  <div className="kpi-details">
                    <span className="kpi-target">Target: 88%</span>
                    <span className="kpi-trend negative">↘️ -1.2%</span>
                  </div>
                </div>
                <div className="kpi-metric-card">
                  <div className="kpi-header">
                    <span className="kpi-title">Customer Satisfaction</span>
                    <span className="kpi-value">4.6/5</span>
                  </div>
                  <div className="kpi-progress-bar">
                    <div className="kpi-progress-fill" style={{width: '92%'}}></div>
                  </div>
                  <div className="kpi-details">
                    <span className="kpi-target">Target: 4.5/5</span>
                    <span className="kpi-trend positive">↗️ +0.2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Driver Performance Analysis */}
            <div className="driver-performance-analysis">
              <div className="driver-analysis-header">
                <h3>👨‍💼 Driver Performance Analysis</h3>
                <button className="performance-report-btn">Generate Report</button>
              </div>
              <div className="driver-performance-table">
                <div className="performance-table-header">
                  <span className="table-header-item">Driver</span>
                  <span className="table-header-item">Rating</span>
                  <span className="table-header-item">Deliveries</span>
                  <span className="table-header-item">On-Time %</span>
                  <span className="table-header-item">Actions</span>
                </div>
                {performanceMetrics.driverPerformance?.map((driver, index) => (
                  <div key={index} className="performance-table-row">
                    <div className="driver-info-cell">
                      <div className="driver-avatar">👨‍💼</div>
                      <span className="driver-name">{driver.name}</span>
                    </div>
                    <div className="rating-cell">
                      <span className="rating-stars">⭐</span>
                      <span className="rating-value">{driver.rating}</span>
                    </div>
                    <div className="deliveries-cell">
                      <span className="deliveries-count">{driver.deliveries}</span>
                    </div>
                    <div className="ontime-cell">
                      <div className="ontime-indicator">
                        <div className="ontime-bar">
                          <div className="ontime-fill" style={{width: `${driver.onTime}%`}}></div>
                        </div>
                        <span className="ontime-percentage">{driver.onTime}%</span>
                      </div>
                    </div>
                    <div className="actions-cell">
                      <button className="table-action-btn">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle Efficiency Analysis */}
            <div className="vehicle-efficiency-analysis">
              <div className="efficiency-analysis-header">
                <h3>🚛 Vehicle Efficiency Analysis</h3>
                <button className="efficiency-report-btn">Efficiency Report</button>
              </div>
              <div className="vehicle-efficiency-grid">
                {performanceMetrics.vehicleEfficiency?.map((vehicle, index) => (
                  <div key={index} className="efficiency-card">
                    <div className="efficiency-card-header">
                      <span className="vehicle-id">{vehicle.vehicle}</span>
                      <div className={`efficiency-status ${vehicle.maintenance.toLowerCase()}`}>
                        {vehicle.maintenance}
                      </div>
                    </div>
                    <div className="efficiency-metrics">
                      <div className="efficiency-metric">
                        <span className="metric-label">Efficiency:</span>
                        <div className="efficiency-bar">
                          <div className="efficiency-fill" style={{width: `${vehicle.efficiency}%`}}></div>
                        </div>
                        <span className="metric-value">{vehicle.efficiency}%</span>
                      </div>
                      <div className="efficiency-metric">
                        <span className="metric-label">Mileage:</span>
                        <span className="metric-value">{vehicle.mileage}</span>
                      </div>
                    </div>
                    <div className="efficiency-actions">
                      <button className="efficiency-action-btn">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <div className="logistics-default-content">Content for {activeTab}</div>;
    }
  };

  return (
    <div className="logistics-page-container">
      {/* Enhanced Page Header */}
      <div className="logistics-page-header">
        <div className="header-content-section">
          <div className="header-title-area">
            <h1 className="logistics-main-title">🚛 Distribution & Logistics Hub</h1>
            <p className="logistics-subtitle">Comprehensive management of your milk distribution network, fleet operations, and delivery optimization</p>
          </div>
          <div className="header-actions-area">
            <button className="header-action-btn primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              System Status
            </button>
            <button className="header-action-btn secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
              </svg>
              Generate Report
            </button>
          </div>
        </div>
        
        {/* Quick Stats Bar */}
        <div className="header-quick-stats">
          <div className="quick-stat-item">
            <span className="quick-stat-icon">🚛</span>
            <div className="quick-stat-content">
              <span className="quick-stat-value">{distributionStats.totalVehicles}</span>
              <span className="quick-stat-label">Active Vehicles</span>
            </div>
          </div>
          <div className="quick-stat-item">
            <span className="quick-stat-icon">📍</span>
            <div className="quick-stat-content">
              <span className="quick-stat-value">{distributionStats.activeRoutes}</span>
              <span className="quick-stat-label">Live Routes</span>
            </div>
          </div>
          <div className="quick-stat-item">
            <span className="quick-stat-icon">✅</span>
            <div className="quick-stat-content">
              <span className="quick-stat-value">{distributionStats.completedDeliveries}</span>
              <span className="quick-stat-label">Completed Today</span>
            </div>
          </div>
          <div className="quick-stat-item">
            <span className="quick-stat-icon">⏰</span>
            <div className="quick-stat-content">
              <span className="quick-stat-value">{distributionStats.onTimeDelivery}%</span>
              <span className="quick-stat-label">On-Time Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Tabs */}
      <div className="logistics-navigation-container">
        <div className="logistics-navigation-tabs">
          <button 
            className={`logistics-nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <div className="nav-tab-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <div className="nav-tab-content">
              <span className="nav-tab-title">Overview</span>
              <span className="nav-tab-subtitle">Dashboard & Tracking</span>
            </div>
          </button>
          
          <button 
            className={`logistics-nav-tab ${activeTab === 'vehicles' ? 'active' : ''}`}
            onClick={() => setActiveTab('vehicles')}
          >
            <div className="nav-tab-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16,8 20,8 23,11 23,16 16,16"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
            <div className="nav-tab-content">
              <span className="nav-tab-title">Fleet Management</span>
              <span className="nav-tab-subtitle">Vehicles & Drivers</span>
            </div>
          </button>
          
          <button 
            className={`logistics-nav-tab ${activeTab === 'routes' ? 'active' : ''}`}
            onClick={() => setActiveTab('routes')}
          >
            <div className="nav-tab-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div className="nav-tab-content">
              <span className="nav-tab-title">Route Planning</span>
              <span className="nav-tab-subtitle">Optimization & Tracking</span>
            </div>
          </button>
          
          <button 
            className={`logistics-nav-tab ${activeTab === 'warehouses' ? 'active' : ''}`}
            onClick={() => setActiveTab('warehouses')}
          >
            <div className="nav-tab-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18"></path>
                <path d="M5 21V7l8-4v18"></path>
                <path d="M19 21V11l-6-4"></path>
              </svg>
            </div>
            <div className="nav-tab-content">
              <span className="nav-tab-title">Warehouses</span>
              <span className="nav-tab-subtitle">Storage & Inventory</span>
            </div>
          </button>
          
          <button 
            className={`logistics-nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <div className="nav-tab-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18"></path>
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
              </svg>
            </div>
            <div className="nav-tab-content">
              <span className="nav-tab-title">Analytics</span>
              <span className="nav-tab-subtitle">Performance & Reports</span>
            </div>
          </button>
        </div>
        
        {/* Tab Indicator */}
        <div className="tab-indicator"></div>
      </div>

      {/* Enhanced Content Container */}
      <div className="logistics-content-container">
        <div className="content-wrapper">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default DistributionLogistics;