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
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [activeTab, setActiveTab] = useState('collections');

  // Sample data for collections
  const [collections, setCollections] = useState([
    {
      id: 1,
      location: 'Farm A - North Wing',
      cowId: 'COW001',
      cowName: 'Bella',
      quantity: 18.5,
      time: '06:30 AM',
      quality: 'A+',
      temperature: 4.2,
      fat: 3.8,
      protein: 3.2,
      status: 'approved'
    },
    {
      id: 2,
      location: 'Farm A - South Wing',
      cowId: 'COW002',
      cowName: 'Daisy',
      quantity: 16.2,
      time: '06:45 AM',
      quality: 'A',
      temperature: 4.1,
      fat: 3.6,
      protein: 3.1,
      status: 'approved'
    },
    {
      id: 3,
      location: 'Farm B - East Section',
      cowId: 'COW003',
      cowName: 'Luna',
      quantity: 14.8,
      time: '07:00 AM',
      quality: 'B+',
      temperature: 4.5,
      fat: 3.4,
      protein: 2.9,
      status: 'pending'
    },
    {
      id: 4,
      location: 'Farm B - West Section',
      cowId: 'COW004',
      cowName: 'Rosie',
      quantity: 20.1,
      time: '07:15 AM',
      quality: 'A+',
      temperature: 4.0,
      fat: 4.0,
      protein: 3.4,
      status: 'approved'
    },
    {
      id: 5,
      location: 'Farm C - Central Area',
      cowId: 'COW005',
      cowName: 'Moo-nificent',
      quantity: 12.3,
      time: '07:30 AM',
      quality: 'B',
      temperature: 4.8,
      fat: 3.2,
      protein: 2.8,
      status: 'rejected'
    }
  ]);

  const [newCollection, setNewCollection] = useState({
    location: '',
    cowId: '',
    cowName: '',
    quantity: '',
    quality: '',
    temperature: '',
    fat: '',
    protein: ''
  });

  const locations = [
    'Farm A - North Wing',
    'Farm A - South Wing',
    'Farm B - East Section',
    'Farm B - West Section',
    'Farm C - Central Area'
  ];

  // Additional data for enhanced content
  const [productionTrends] = useState([
    { day: 'Monday', production: 450, quality: 'A+', avgTemp: 4.2 },
    { day: 'Tuesday', production: 478, quality: 'A', avgTemp: 4.1 },
    { day: 'Wednesday', production: 492, quality: 'A+', avgTemp: 4.0 },
    { day: 'Thursday', production: 465, quality: 'A', avgTemp: 4.3 },
    { day: 'Friday', production: 510, quality: 'A+', avgTemp: 4.1 },
    { day: 'Saturday', production: 445, quality: 'A', avgTemp: 4.2 },
    { day: 'Sunday', production: 423, quality: 'B+', avgTemp: 4.4 }
  ]);

  const [equipmentStatus] = useState([
    { id: 1, name: 'Milking Machine A1', status: 'Active', lastMaintenance: '2024-01-15', nextMaintenance: '2024-02-15' },
    { id: 2, name: 'Cooling Tank B2', status: 'Active', lastMaintenance: '2024-01-20', nextMaintenance: '2024-02-20' },
    { id: 3, name: 'Quality Tester C3', status: 'Maintenance', lastMaintenance: '2024-01-10', nextMaintenance: '2024-02-10' },
    { id: 4, name: 'Storage Unit D4', status: 'Active', lastMaintenance: '2024-01-25', nextMaintenance: '2024-02-25' }
  ]);

  const [alerts] = useState([
    { id: 1, type: 'warning', message: 'Temperature slightly high in Farm B - East Section', time: '10:30 AM', severity: 'medium' },
    { id: 2, type: 'info', message: 'Quality test completed for morning batch', time: '09:45 AM', severity: 'low' },
    { id: 3, type: 'error', message: 'Equipment C3 requires immediate maintenance', time: '08:15 AM', severity: 'high' },
    { id: 4, type: 'success', message: 'Daily production target achieved', time: '07:30 AM', severity: 'low' }
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

  // Calculate stats
  const todayStats = {
    totalQuantity: collections.reduce((sum, col) => sum + col.quantity, 0),
    totalCows: collections.length,
    avgPerCow: collections.length > 0 ? (collections.reduce((sum, col) => sum + col.quantity, 0) / collections.length).toFixed(1) : 0,
    qualityGrade: 'A+'
  };

  const handleAddCollection = () => {
    if (newCollection.location && newCollection.cowId && newCollection.quantity) {
      const collection = {
        id: Date.now(),
        ...newCollection,
        quantity: parseFloat(newCollection.quantity),
        temperature: parseFloat(newCollection.temperature),
        fat: parseFloat(newCollection.fat),
        protein: parseFloat(newCollection.protein),
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        status: 'pending'
      };
      setCollections([...collections, collection]);
      setNewCollection({
        location: '',
        cowId: '',
        cowName: '',
        quantity: '',
        quality: '',
        temperature: '',
        fat: '',
        protein: ''
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
      case 'approved': return '#28a745';
      case 'pending': return '#ffc107';
      case 'rejected': return '#dc3545';
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

  return (
    <div className="milk-collection">
      {/* Header Section */}
       <div className="milk-collection"></div>
      <div className="page-header">
        <div className="header-content">
          <div className="header-title">
            <h1>🥛 Milk Collection Management</h1>
            <p>Track and manage daily milk collection operations</p>
          </div>
          <div className="header-actions">
            <div className="date-time-display">
              <span className="current-date">{currentDate.toLocaleDateString()}</span>
              <span className="current-time">{currentDate.toLocaleTimeString()}</span>
            </div>
            <button className="btn-primary" onClick={() => setShowAddModal(true)}>
              <span className="btn-icon">➕</span>
              Record Collection
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats-bar">
        <div className="quick-stat">
          <span className="stat-number">{todayStats.totalQuantity.toFixed(1)}L</span>
          <span className="stat-label">Today's Collection</span>
        </div>
        <div className="quick-stat">
          <span className="stat-number">{todayStats.totalCows}</span>
          <span className="stat-label">Cows Milked</span>
        </div>
        <div className="quick-stat">
          <span className="stat-number">{todayStats.avgPerCow}L</span>
          <span className="stat-label">Avg per Cow</span>
        </div>
        <div className="quick-stat">
          <span className="stat-number">{todayStats.qualityGrade}</span>
          <span className="stat-label">Quality Grade</span>
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

      {/* Navigation Tabs */}
      <div className="content-tabs">
        <button 
          className={`tab-btn ${activeTab === 'collections' ? 'active' : ''}`}
          onClick={() => setActiveTab('collections')}
        >
          📊 Collection Records
        </button>
        <button 
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📈 Analytics & Trends
        </button>
        <button 
          className={`tab-btn ${activeTab === 'equipment' ? 'active' : ''}`}
          onClick={() => setActiveTab('equipment')}
        >
          ⚙️ Equipment Status
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          📋 Reports & Alerts
        </button>
      </div>

      {/* Collection Records Tab */}
      {activeTab === 'collections' && (
        <div className="main-content">
          <div className="content-card">
            <h2>Collection Records</h2>
          <div className="collection-table">
            <div className="table-header">
              <div className="table-row">
                <div className="table-cell">Location</div>
                <div className="table-cell">Cow ID</div>
                <div className="table-cell">Cow Name</div>
                <div className="table-cell">Quantity (L)</div>
                <div className="table-cell">Time</div>
                <div className="table-cell">Quality</div>
                <div className="table-cell">Temperature</div>
                <div className="table-cell">Status</div>
                <div className="table-cell">Actions</div>
              </div>
            </div>
            <div className="table-body">
              {filteredCollections.length === 0 ? (
                <div className="no-data">No collections found for selected filters</div>
              ) : (
                filteredCollections.map(collection => (
                  <div key={collection.id} className="table-row">
                    <div className="table-cell" data-label="Location">{collection.location}</div>
                    <div className="table-cell" data-label="Cow ID">{collection.cowId}</div>
                    <div className="table-cell" data-label="Cow Name">{collection.cowName}</div>
                    <div className="table-cell" data-label="Quantity">{collection.quantity}L</div>
                    <div className="table-cell" data-label="Time">{collection.time}</div>
                    <div className="table-cell" data-label="Quality">
                      <span 
                        className="quality-badge"
                        style={{backgroundColor: getQualityColor(collection.quality)}}
                      >
                        {collection.quality}
                      </span>
                    </div>
                    <div className="table-cell" data-label="Temperature">{collection.temperature}°C</div>
                    <div className="table-cell" data-label="Status">
                      <span 
                        className="status-badge"
                        style={{backgroundColor: getStatusColor(collection.status)}}
                      >
                        {collection.status}
                      </span>
                    </div>
                    <div className="table-cell" data-label="Actions">
                      <button 
                        className="btn-action"
                        onClick={() => handleQualityCheck(collection)}
                      >
                        Quality Check
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Analytics & Trends Tab */}
      {activeTab === 'analytics' && (
        <div className="main-content">
          <div className="content-card">
            <h2>Production Trends & Analytics</h2>
            <div className="analytics-grid">
              <div className="trend-chart">
                <h3>Weekly Production Overview</h3>
                <div className="chart-container">
                  {productionTrends.map((trend, index) => (
                    <div key={index} className="chart-bar">
                      <div className="bar-container">
                        <div 
                          className="bar" 
                          style={{ height: `${(trend.production / 600) * 100}%` }}
                          title={`${trend.production}L`}
                        ></div>
                      </div>
                      <span className="bar-label">{trend.day.slice(0, 3)}</span>
                      <span className="bar-value">{trend.production}L</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="quality-analysis">
                <h3>Quality Distribution</h3>
                <div className="quality-stats">
                  <div className="quality-item">
                    <span className="quality-grade grade-a-plus">A+</span>
                    <span className="quality-percent">45%</span>
                    <div className="quality-bar">
                      <div className="quality-fill" style={{ width: '45%', backgroundColor: '#28a745' }}></div>
                    </div>
                  </div>
                  <div className="quality-item">
                    <span className="quality-grade grade-a">A</span>
                    <span className="quality-percent">35%</span>
                    <div className="quality-bar">
                      <div className="quality-fill" style={{ width: '35%', backgroundColor: '#17a2b8' }}></div>
                    </div>
                  </div>
                  <div className="quality-item">
                    <span className="quality-grade grade-b-plus">B+</span>
                    <span className="quality-percent">15%</span>
                    <div className="quality-bar">
                      <div className="quality-fill" style={{ width: '15%', backgroundColor: '#ffc107' }}></div>
                    </div>
                  </div>
                  <div className="quality-item">
                    <span className="quality-grade grade-b">B</span>
                    <span className="quality-percent">5%</span>
                    <div className="quality-bar">
                      <div className="quality-fill" style={{ width: '5%', backgroundColor: '#fd7e14' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="temperature-monitoring">
                <h3>Temperature Monitoring</h3>
                <div className="temp-stats">
                  <div className="temp-item optimal">
                    <span className="temp-icon">❄️</span>
                    <div className="temp-info">
                      <span className="temp-label">Optimal Range</span>
                      <span className="temp-value">2-4°C</span>
                      <span className="temp-count">85% of collections</span>
                    </div>
                  </div>
                  <div className="temp-item warning">
                    <span className="temp-icon">⚠️</span>
                    <div className="temp-info">
                      <span className="temp-label">Above Optimal</span>
                      <span className="temp-value">4-6°C</span>
                      <span className="temp-count">12% of collections</span>
                    </div>
                  </div>
                  <div className="temp-item critical">
                    <span className="temp-icon">🔥</span>
                    <div className="temp-info">
                      <span className="temp-label">Critical</span>
                      <span className="temp-value">6°C</span>
                      <span className="temp-count">3% of collections</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Equipment Status Tab */}
      {activeTab === 'equipment' && (
        <div className="main-content">
          <div className="content-card">
            <h2>Equipment Status & Maintenance</h2>
            <div className="equipment-grid">
              {equipmentStatus.map(equipment => (
                <div key={equipment.id} className={`equipment-card ${equipment.status.toLowerCase()}`}>
                  <div className="equipment-header">
                    <h3>{equipment.name}</h3>
                    <span className={`status-indicator ${equipment.status.toLowerCase()}`}>
                      {equipment.status}
                    </span>
                  </div>
                  <div className="equipment-details">
                    <div className="detail-item">
                      <span className="detail-label">Last Maintenance:</span>
                      <span className="detail-value">{equipment.lastMaintenance}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Next Maintenance:</span>
                      <span className="detail-value">{equipment.nextMaintenance}</span>
                    </div>
                  </div>
                  <div className="equipment-actions">
                    <button className="btn-secondary" onClick={() => setShowEquipmentModal(true)}>
                      View Details
                    </button>
                    {equipment.status === 'Maintenance' && (
                      <button className="btn-warning">Schedule Repair</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reports & Alerts Tab */}
      {activeTab === 'reports' && (
        <div className="main-content">
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
      )}

      {/* Add Collection Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
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
                  placeholder="3.2"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleAddCollection}>
                Add Collection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quality Check Modal */}
      {showQualityModal && selectedRecord && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Quality Check - {selectedRecord.cowName}</h3>
              <button className="close-btn" onClick={() => setShowQualityModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="quality-details">
                <div className="quality-info">
                  <h4>Collection Details</h4>
                  <p><strong>Location:</strong> {selectedRecord.location}</p>
                  <p><strong>Cow ID:</strong> {selectedRecord.cowId}</p>
                  <p><strong>Quantity:</strong> {selectedRecord.quantity}L</p>
                  <p><strong>Collection Time:</strong> {selectedRecord.time}</p>
                </div>
                <div className="quality-metrics">
                  <h4>Quality Metrics</h4>
                  <div className="metric">
                    <span>Quality Grade:</span>
                    <span className="quality-badge" style={{backgroundColor: getQualityColor(selectedRecord.quality)}}>
                      {selectedRecord.quality}
                    </span>
                  </div>
                  <div className="metric">
                    <span>Temperature:</span>
                    <span className={selectedRecord.temperature <= 4.5 ? 'metric-good' : 'metric-warning'}>
                      {selectedRecord.temperature}°C
                    </span>
                  </div>
                  <div className="metric">
                    <span>Fat Content:</span>
                    <span className={selectedRecord.fat >= 3.5 ? 'metric-good' : 'metric-warning'}>
                      {selectedRecord.fat}%
                    </span>
                  </div>
                  <div className="metric">
                    <span>Protein Content:</span>
                    <span className={selectedRecord.protein >= 3.0 ? 'metric-good' : 'metric-warning'}>
                      {selectedRecord.protein}%
                    </span>
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
    </div>
  );
}

export default MilkCollection;