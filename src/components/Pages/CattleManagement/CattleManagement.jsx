import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter, FaDownload, FaUpload, FaDog, FaHeart, FaWeight, FaCalendarAlt, FaMapMarkerAlt, FaUserMd, FaChartLine, FaExclamationTriangle, FaCheckCircle, FaTimesCircle, FaBell, FaFileAlt, FaPrint, FaSync, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { GiCow, GiBull, GiMilkCarton } from 'react-icons/gi';
import './CattleManagement.css';

function CattleManagement() {
  // State management
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCattle, setSelectedCattle] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBreed, setFilterBreed] = useState('all');
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Form state for adding/editing cattle
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    breed: '',
    age: '',
    weight: '',
    gender: '',
    status: 'healthy',
    location: '',
    farmerId: '',
    farmerName: '',
    acquisitionDate: '',
    lastCheckup: '',
    nextCheckup: '',
    milkProduction: '',
    pregnancyStatus: '',
    vaccinations: [],
    healthRecords: [],
    notes: ''
  });

  // Sample cattle data
  const [cattleData, setCattleData] = useState([
    {
      id: 'CTL001',
      name: 'Ganga',
      breed: 'Holstein Friesian',
      age: 4,
      weight: 550,
      gender: 'Female',
      status: 'healthy',
      location: 'Barn A-1',
      farmerId: 'FRM001',
      farmerName: 'Rajesh Kumar',
      acquisitionDate: '2020-03-15',
      lastCheckup: '2024-01-10',
      nextCheckup: '2024-02-10',
      milkProduction: 25.5,
      pregnancyStatus: 'Not Pregnant',
      vaccinations: [
        { name: 'FMD Vaccine', date: '2024-01-05', nextDue: '2024-07-05' },
        { name: 'Brucellosis', date: '2023-12-15', nextDue: '2024-12-15' }
      ],
      healthRecords: [
        { date: '2024-01-10', condition: 'Routine Checkup', treatment: 'Vitamins', veterinarian: 'Dr. Sharma' },
        { date: '2023-12-20', condition: 'Minor Fever', treatment: 'Antibiotics', veterinarian: 'Dr. Patel' }
      ],
      notes: 'High milk producer, excellent health record'
    },
    {
      id: 'CTL002',
      name: 'Yamuna',
      breed: 'Jersey',
      age: 3,
      weight: 420,
      gender: 'Female',
      status: 'pregnant',
      location: 'Barn A-2',
      farmerId: 'FRM002',
      farmerName: 'Suresh Patel',
      acquisitionDate: '2021-05-20',
      lastCheckup: '2024-01-12',
      nextCheckup: '2024-01-26',
      milkProduction: 18.2,
      pregnancyStatus: 'Pregnant - 6 months',
      vaccinations: [
        { name: 'FMD Vaccine', date: '2024-01-08', nextDue: '2024-07-08' },
        { name: 'IBR Vaccine', date: '2023-11-20', nextDue: '2024-11-20' }
      ],
      healthRecords: [
        { date: '2024-01-12', condition: 'Pregnancy Checkup', treatment: 'Prenatal vitamins', veterinarian: 'Dr. Sharma' },
        { date: '2023-12-05', condition: 'Routine Checkup', treatment: 'Deworming', veterinarian: 'Dr. Singh' }
      ],
      notes: 'Pregnant cow, requires special care and nutrition'
    },
    {
      id: 'CTL003',
      name: 'Saraswati',
      breed: 'Gir',
      age: 5,
      weight: 480,
      gender: 'Female',
      status: 'sick',
      location: 'Barn B-1',
      farmerId: 'FRM001',
      farmerName: 'Rajesh Kumar',
      acquisitionDate: '2019-08-10',
      lastCheckup: '2024-01-14',
      nextCheckup: '2024-01-21',
      milkProduction: 12.8,
      pregnancyStatus: 'Not Pregnant',
      vaccinations: [
        { name: 'FMD Vaccine', date: '2024-01-02', nextDue: '2024-07-02' },
        { name: 'Anthrax Vaccine', date: '2023-10-15', nextDue: '2024-10-15' }
      ],
      healthRecords: [
        { date: '2024-01-14', condition: 'Mastitis', treatment: 'Antibiotics, Anti-inflammatory', veterinarian: 'Dr. Patel' },
        { date: '2024-01-05', condition: 'Reduced appetite', treatment: 'Appetite stimulant', veterinarian: 'Dr. Sharma' }
      ],
      notes: 'Currently under treatment for mastitis, monitoring closely'
    },
    {
      id: 'CTL004',
      name: 'Nandi',
      breed: 'Sahiwal',
      age: 6,
      weight: 520,
      gender: 'Male',
      status: 'healthy',
      location: 'Barn C-1',
      farmerId: 'FRM003',
      farmerName: 'Mohan Singh',
      acquisitionDate: '2018-12-05',
      lastCheckup: '2024-01-08',
      nextCheckup: '2024-02-08',
      milkProduction: 0,
      pregnancyStatus: 'N/A',
      vaccinations: [
        { name: 'FMD Vaccine', date: '2024-01-03', nextDue: '2024-07-03' },
        { name: 'Blackleg Vaccine', date: '2023-09-20', nextDue: '2024-09-20' }
      ],
      healthRecords: [
        { date: '2024-01-08', condition: 'Routine Checkup', treatment: 'Vitamins', veterinarian: 'Dr. Singh' },
        { date: '2023-11-15', condition: 'Hoof trimming', treatment: 'Hoof care', veterinarian: 'Dr. Sharma' }
      ],
      notes: 'Breeding bull, excellent genetic lineage'
    },
    {
      id: 'CTL005',
      name: 'Lakshmi',
      breed: 'Red Sindhi',
      age: 2,
      weight: 380,
      gender: 'Female',
      status: 'healthy',
      location: 'Barn A-3',
      farmerId: 'FRM002',
      farmerName: 'Suresh Patel',
      acquisitionDate: '2022-04-18',
      lastCheckup: '2024-01-11',
      nextCheckup: '2024-02-11',
      milkProduction: 15.6,
      pregnancyStatus: 'Not Pregnant',
      vaccinations: [
        { name: 'FMD Vaccine', date: '2024-01-06', nextDue: '2024-07-06' },
        { name: 'HS Vaccine', date: '2023-12-10', nextDue: '2024-12-10' }
      ],
      healthRecords: [
        { date: '2024-01-11', condition: 'Routine Checkup', treatment: 'Vitamins', veterinarian: 'Dr. Patel' },
        { date: '2023-12-28', condition: 'Minor cut', treatment: 'Antiseptic dressing', veterinarian: 'Dr. Singh' }
      ],
      notes: 'Young heifer, good potential for milk production'
    }
  ]);

  // Health alerts and notifications
  const [healthAlerts] = useState([
    {
      id: 1,
      cattleId: 'CTL003',
      cattleName: 'Saraswati',
      type: 'medical',
      priority: 'high',
      message: 'Mastitis treatment in progress - requires daily monitoring',
      date: '2024-01-14',
      status: 'active'
    },
    {
      id: 2,
      cattleId: 'CTL002',
      cattleName: 'Yamuna',
      type: 'pregnancy',
      priority: 'medium',
      message: 'Pregnancy checkup due in 2 weeks',
      date: '2024-01-12',
      status: 'active'
    },
    {
      id: 3,
      cattleId: 'CTL001',
      cattleName: 'Ganga',
      type: 'vaccination',
      priority: 'low',
      message: 'Annual vaccination due in 1 month',
      date: '2024-01-10',
      status: 'pending'
    }
  ]);

  // Statistics
  const [statistics] = useState({
    totalCattle: 5,
    healthyCattle: 3,
    sickCattle: 1,
    pregnantCattle: 1,
    totalMilkProduction: 71.1,
    averageAge: 4,
    maleCount: 1,
    femaleCount: 4,
    vaccinationsDue: 3,
    checkupsDue: 2
  });

  // Breeds data
  const breeds = [
    'Holstein Friesian', 'Jersey', 'Gir', 'Sahiwal', 'Red Sindhi', 
    'Tharparkar', 'Rathi', 'Hariana', 'Kankrej', 'Ongole'
  ];

  // Filter and sort cattle data
  const filteredAndSortedCattle = cattleData
    .filter(cattle => {
      const matchesSearch = cattle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cattle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cattle.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cattle.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || cattle.status === filterStatus;
      const matchesBreed = filterBreed === 'all' || cattle.breed === filterBreed;
      return matchesSearch && matchesStatus && matchesBreed;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCattle.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCattle = filteredAndSortedCattle.slice(startIndex, startIndex + itemsPerPage);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (showEditModal) {
      // Update existing cattle
      setCattleData(prev => prev.map(cattle => 
        cattle.id === formData.id ? { ...formData } : cattle
      ));
      setShowEditModal(false);
    } else {
      // Add new cattle
      const newId = `CTL${String(cattleData.length + 1).padStart(3, '0')}`;
      setCattleData(prev => [...prev, { ...formData, id: newId }]);
      setShowAddModal(false);
    }
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      breed: '',
      age: '',
      weight: '',
      gender: '',
      status: 'healthy',
      location: '',
      farmerId: '',
      farmerName: '',
      acquisitionDate: '',
      lastCheckup: '',
      nextCheckup: '',
      milkProduction: '',
      pregnancyStatus: '',
      vaccinations: [],
      healthRecords: [],
      notes: ''
    });
  };

  // Handle edit
  const handleEdit = (cattle) => {
    setFormData(cattle);
    setShowEditModal(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this cattle record?')) {
      setCattleData(prev => prev.filter(cattle => cattle.id !== id));
    }
  };

  // Handle view details
  const handleViewDetails = (cattle) => {
    setSelectedCattle(cattle);
    setShowDetailsModal(true);
  };

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort />;
    return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return '#2ecc71';
      case 'sick': return '#e74c3c';
      case 'pregnant': return '#f39c12';
      case 'quarantine': return '#9b59b6';
      default: return '#95a5a6';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return <FaCheckCircle />;
      case 'sick': return <FaExclamationTriangle />;
      case 'pregnant': return <FaHeart />;
      case 'quarantine': return <FaTimesCircle />;
      default: return <FaCheckCircle />;
    }
  };

  return (
    <div className="page-container cattle-management-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-left">
            <h1><GiCow /> Cattle Management</h1>
            <p>Comprehensive cattle tracking, health monitoring, and management system</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => window.print()}>
              <FaPrint /> Print Report
            </button>
            <button className="btn btn-secondary">
              <FaDownload /> Export Data
            </button>
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
              <FaPlus /> Add Cattle
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="statistics-grid">
        <div className="stat-card total">
          <div className="stat-icon">
            <GiCow />
          </div>
          <div className="stat-content">
            <h3>{statistics.totalCattle}</h3>
            <p>Total Cattle</p>
          </div>
        </div>
        <div className="stat-card healthy">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3>{statistics.healthyCattle}</h3>
            <p>Healthy</p>
          </div>
        </div>
        <div className="stat-card sick">
          <div className="stat-icon">
            <FaExclamationTriangle />
          </div>
          <div className="stat-content">
            <h3>{statistics.sickCattle}</h3>
            <p>Sick</p>
          </div>
        </div>
        <div className="stat-card pregnant">
          <div className="stat-icon">
            <FaHeart />
          </div>
          <div className="stat-content">
            <h3>{statistics.pregnantCattle}</h3>
            <p>Pregnant</p>
          </div>
        </div>
        <div className="stat-card production">
          <div className="stat-icon">
            <GiMilkCarton />
          </div>
          <div className="stat-content">
            <h3>{statistics.totalMilkProduction}L</h3>
            <p>Daily Milk Production</p>
          </div>
        </div>
        <div className="stat-card alerts">
          <div className="stat-icon">
            <FaBell />
          </div>
          <div className="stat-content">
            <h3>{healthAlerts.filter(alert => alert.status === 'active').length}</h3>
            <p>Active Alerts</p>
          </div>
        </div>
      </div>

      {/* Health Alerts */}
      {healthAlerts.filter(alert => alert.status === 'active').length > 0 && (
        <div className="alerts-section">
          <h3><FaBell /> Health Alerts</h3>
          <div className="alerts-list">
            {healthAlerts.filter(alert => alert.status === 'active').map(alert => (
              <div key={alert.id} className={`alert alert-${alert.priority}`}>
                <div className="alert-icon">
                  {alert.type === 'medical' && <FaUserMd />}
                  {alert.type === 'pregnancy' && <FaHeart />}
                  {alert.type === 'vaccination' && <FaCalendarAlt />}
                </div>
                <div className="alert-content">
                  <h4>{alert.cattleName} ({alert.cattleId})</h4>
                  <p>{alert.message}</p>
                  <span className="alert-date">{alert.date}</span>
                </div>
                <div className="alert-actions">
                  <button className="btn btn-sm btn-primary">View Details</button>
                  <button className="btn btn-sm btn-secondary">Mark Resolved</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FaEye /> Overview
          </button>
          <button 
            className={`tab ${activeTab === 'health' ? 'active' : ''}`}
            onClick={() => setActiveTab('health')}
          >
            <FaUserMd /> Health Records
          </button>
          <button 
            className={`tab ${activeTab === 'breeding' ? 'active' : ''}`}
            onClick={() => setActiveTab('breeding')}
          >
            <FaHeart /> Breeding
          </button>
          <button 
            className={`tab ${activeTab === 'production' ? 'active' : ''}`}
            onClick={() => setActiveTab('production')}
          >
            <FaChartLine /> Production
          </button>
          <button 
            className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <FaFileAlt /> Reports
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            {/* Search and Filter Controls */}
            <div className="controls-section">
              <div className="search-controls">
                <div className="search-box">
                  <FaSearch />
                  <input
                    type="text"
                    placeholder="Search cattle by name, ID, breed, or farmer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="filter-controls">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="healthy">Healthy</option>
                    <option value="sick">Sick</option>
                    <option value="pregnant">Pregnant</option>
                    <option value="quarantine">Quarantine</option>
                  </select>
                  <select
                    value={filterBreed}
                    onChange={(e) => setFilterBreed(e.target.value)}
                  >
                    <option value="all">All Breeds</option>
                    {breeds.map(breed => (
                      <option key={breed} value={breed}>{breed}</option>
                    ))}
                  </select>
                  <button className="btn btn-secondary">
                    <FaFilter /> Advanced Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Cattle Table */}
            <div className="table-container">
              <table className="cattle-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('id')}>
                      ID {getSortIcon('id')}
                    </th>
                    <th onClick={() => handleSort('name')}>
                      Name {getSortIcon('name')}
                    </th>
                    <th onClick={() => handleSort('breed')}>
                      Breed {getSortIcon('breed')}
                    </th>
                    <th onClick={() => handleSort('age')}>
                      Age {getSortIcon('age')}
                    </th>
                    <th onClick={() => handleSort('weight')}>
                      Weight {getSortIcon('weight')}
                    </th>
                    <th onClick={() => handleSort('gender')}>
                      Gender {getSortIcon('gender')}
                    </th>
                    <th onClick={() => handleSort('status')}>
                      Status {getSortIcon('status')}
                    </th>
                    <th onClick={() => handleSort('location')}>
                      Location {getSortIcon('location')}
                    </th>
                    <th onClick={() => handleSort('farmerName')}>
                      Farmer {getSortIcon('farmerName')}
                    </th>
                    <th onClick={() => handleSort('milkProduction')}>
                      Milk (L/day) {getSortIcon('milkProduction')}
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCattle.map(cattle => (
                    <tr key={cattle.id}>
                      <td className="cattle-id">{cattle.id}</td>
                      <td className="cattle-name">
                        <div className="name-cell">
                          <FaDog className="cattle-icon" />
                          <span>{cattle.name}</span>
                        </div>
                      </td>
                      <td>{cattle.breed}</td>
                      <td>{cattle.age} years</td>
                      <td><FaWeight /> {cattle.weight} kg</td>
                      <td>{cattle.gender}</td>
                      <td>
                        <span 
                          className="status-badge"
                          style={{ 
                            backgroundColor: getStatusColor(cattle.status),
                            color: 'white'
                          }}
                        >
                          {getStatusIcon(cattle.status)}
                          {cattle.status.charAt(0).toUpperCase() + cattle.status.slice(1)}
                        </span>
                      </td>
                      <td><FaMapMarkerAlt /> {cattle.location}</td>
                      <td>{cattle.farmerName}</td>
                      <td className="milk-production">
                        {cattle.gender === 'Female' ? `${cattle.milkProduction}L` : 'N/A'}
                      </td>
                      <td className="actions">
                        <button 
                          className="btn btn-sm btn-info"
                          onClick={() => handleViewDetails(cattle)}
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="btn btn-sm btn-warning"
                          onClick={() => handleEdit(cattle)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
              <div className="pagination-info">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedCattle.length)} of {filteredAndSortedCattle.length} entries
              </div>
              <div className="pagination-controls">
                <button 
                  className="btn btn-sm btn-secondary"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  className="btn btn-sm btn-secondary"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'health' && (
          <div className="health-tab">
            <div className="health-overview">
              <h3><FaUserMd /> Health Management</h3>
              <div className="health-stats">
                <div className="health-stat">
                  <h4>Vaccination Schedule</h4>
                  <p>{statistics.vaccinationsDue} cattle need vaccination</p>
                </div>
                <div className="health-stat">
                  <h4>Health Checkups</h4>
                  <p>{statistics.checkupsDue} checkups due this week</p>
                </div>
                <div className="health-stat">
                  <h4>Medical Alerts</h4>
                  <p>{healthAlerts.filter(alert => alert.type === 'medical' && alert.status === 'active').length} active medical issues</p>
                </div>
              </div>
            </div>

            {/* Health Records Table */}
            <div className="health-records-table">
              <h4>Recent Health Records</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>Cattle ID</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Condition</th>
                    <th>Treatment</th>
                    <th>Veterinarian</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {cattleData.flatMap(cattle => 
                    cattle.healthRecords.map((record, index) => (
                      <tr key={`${cattle.id}-${index}`}>
                        <td>{cattle.id}</td>
                        <td>{cattle.name}</td>
                        <td>{record.date}</td>
                        <td>{record.condition}</td>
                        <td>{record.treatment}</td>
                        <td>{record.veterinarian}</td>
                        <td>
                          <span className="status-badge completed">Completed</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'breeding' && (
          <div className="breeding-tab">
            <div className="breeding-overview">
              <h3><FaHeart /> Breeding Management</h3>
              <div className="breeding-stats">
                <div className="breeding-stat">
                  <h4>Pregnant Cattle</h4>
                  <p>{statistics.pregnantCattle} currently pregnant</p>
                </div>
                <div className="breeding-stat">
                  <h4>Breeding Bulls</h4>
                  <p>{cattleData.filter(c => c.gender === 'Male').length} available</p>
                </div>
                <div className="breeding-stat">
                  <h4>Expected Calving</h4>
                  <p>2 expected this month</p>
                </div>
              </div>
            </div>

            {/* Breeding Records */}
            <div className="breeding-records">
              <h4>Breeding Records</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>Cattle ID</th>
                    <th>Name</th>
                    <th>Breed</th>
                    <th>Age</th>
                    <th>Pregnancy Status</th>
                    <th>Expected Calving</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cattleData.filter(cattle => cattle.gender === 'Female').map(cattle => (
                    <tr key={cattle.id}>
                      <td>{cattle.id}</td>
                      <td>{cattle.name}</td>
                      <td>{cattle.breed}</td>
                      <td>{cattle.age} years</td>
                      <td>
                        <span className={`status-badge ${cattle.pregnancyStatus.includes('Pregnant') ? 'pregnant' : 'not-pregnant'}`}>
                          {cattle.pregnancyStatus}
                        </span>
                      </td>
                      <td>
                        {cattle.pregnancyStatus.includes('Pregnant') ? 'Mar 2024' : 'N/A'}
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary">Update Status</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'production' && (
          <div className="production-tab">
            <div className="production-overview">
              <h3><FaChartLine /> Milk Production</h3>
              <div className="production-stats">
                <div className="production-stat">
                  <h4>Daily Production</h4>
                  <p>{statistics.totalMilkProduction}L per day</p>
                </div>
                <div className="production-stat">
                  <h4>Average per Cow</h4>
                  <p>{(statistics.totalMilkProduction / statistics.femaleCount).toFixed(1)}L per cow</p>
                </div>
                <div className="production-stat">
                  <h4>Top Producer</h4>
                  <p>Ganga - 25.5L/day</p>
                </div>
              </div>
            </div>

            {/* Production Records */}
            <div className="production-records">
              <h4>Daily Production Records</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>Cattle ID</th>
                    <th>Name</th>
                    <th>Breed</th>
                    <th>Daily Production (L)</th>
                    <th>Weekly Average (L)</th>
                    <th>Monthly Total (L)</th>
                    <th>Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {cattleData.filter(cattle => cattle.gender === 'Female' && cattle.milkProduction > 0).map(cattle => (
                    <tr key={cattle.id}>
                      <td>{cattle.id}</td>
                      <td>{cattle.name}</td>
                      <td>{cattle.breed}</td>
                      <td className="production-value">{cattle.milkProduction}L</td>
                      <td>{(cattle.milkProduction * 7).toFixed(1)}L</td>
                      <td>{(cattle.milkProduction * 30).toFixed(0)}L</td>
                      <td>
                        <span className={`performance-badge ${cattle.milkProduction > 20 ? 'excellent' : cattle.milkProduction > 15 ? 'good' : 'average'}`}>
                          {cattle.milkProduction > 20 ? 'Excellent' : cattle.milkProduction > 15 ? 'Good' : 'Average'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="reports-tab">
            <div className="reports-overview">
              <h3><FaFileAlt /> Reports & Analytics</h3>
              <div className="report-actions">
                <button className="btn btn-primary">
                  <FaDownload /> Generate Monthly Report
                </button>
                <button className="btn btn-secondary">
                  <FaPrint /> Print Summary
                </button>
                <button className="btn btn-secondary">
                  <FaUpload /> Import Data
                </button>
              </div>
            </div>

            {/* Quick Reports */}
            <div className="quick-reports">
              <div className="report-card">
                <h4>Health Summary</h4>
                <p>Complete health overview of all cattle</p>
                <button className="btn btn-outline">Generate</button>
              </div>
              <div className="report-card">
                <h4>Production Report</h4>
                <p>Milk production analysis and trends</p>
                <button className="btn btn-outline">Generate</button>
              </div>
              <div className="report-card">
                <h4>Breeding Report</h4>
                <p>Breeding records and pregnancy tracking</p>
                <button className="btn btn-outline">Generate</button>
              </div>
              <div className="report-card">
                <h4>Financial Summary</h4>
                <p>Cost analysis and revenue tracking</p>
                <button className="btn btn-outline">Generate</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Cattle Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3><FaPlus /> Add New Cattle</h3>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Breed *</label>
                  <select
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Breed</option>
                    {breeds.map(breed => (
                      <option key={breed} value={breed}>{breed}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Age (years) *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="0"
                    max="20"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Weight (kg) *</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="healthy">Healthy</option>
                    <option value="sick">Sick</option>
                    <option value="pregnant">Pregnant</option>
                    <option value="quarantine">Quarantine</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Barn A-1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Farmer Name *</label>
                  <input
                    type="text"
                    name="farmerName"
                    value={formData.farmerName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Acquisition Date</label>
                  <input
                    type="date"
                    name="acquisitionDate"
                    value={formData.acquisitionDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Milk Production (L/day)</label>
                  <input
                    type="number"
                    name="milkProduction"
                    value={formData.milkProduction}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    disabled={formData.gender === 'Male'}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Additional notes about the cattle..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Cattle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Cattle Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3><FaEdit /> Edit Cattle</h3>
              <button className="close-btn" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Breed *</label>
                  <select
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Breed</option>
                    {breeds.map(breed => (
                      <option key={breed} value={breed}>{breed}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Age (years) *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="0"
                    max="20"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Weight (kg) *</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="healthy">Healthy</option>
                    <option value="sick">Sick</option>
                    <option value="pregnant">Pregnant</option>
                    <option value="quarantine">Quarantine</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Barn A-1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Farmer Name *</label>
                  <input
                    type="text"
                    name="farmerName"
                    value={formData.farmerName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Acquisition Date</label>
                  <input
                    type="date"
                    name="acquisitionDate"
                    value={formData.acquisitionDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Milk Production (L/day)</label>
                  <input
                    type="number"
                    name="milkProduction"
                    value={formData.milkProduction}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    disabled={formData.gender === 'Male'}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Additional notes about the cattle..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Cattle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedCattle && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="modal-header">
              <h3><FaEye /> Cattle Details - {selectedCattle.name}</h3>
              <button className="close-btn" onClick={() => setShowDetailsModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="details-grid">
                <div className="details-section">
                  <h4>Basic Information</h4>
                  <div className="details-row">
                    <span className="label">ID:</span>
                    <span className="value">{selectedCattle.id}</span>
                  </div>
                  <div className="details-row">
                    <span className="label">Name:</span>
                    <span className="value">{selectedCattle.name}</span>
                  </div>
                  <div className="details-row">
                    <span className="label">Breed:</span>
                    <span className="value">{selectedCattle.breed}</span>
                  </div>
                  <div className="details-row">
                    <span className="label">Age:</span>
                    <span className="value">{selectedCattle.age} years</span>
                  </div>
                  <div className="details-row">
                    <span className="label">Weight:</span>
                    <span className="value">{selectedCattle.weight} kg</span>
                  </div>
                  <div className="details-row">
                    <span className="label">Gender:</span>
                    <span className="value">{selectedCattle.gender}</span>
                  </div>
                  <div className="details-row">
                    <span className="label">Status:</span>
                    <span className="value">
                      <span 
                        className="status-badge"
                        style={{ 
                          backgroundColor: getStatusColor(selectedCattle.status),
                          color: 'white'
                        }}
                      >
                        {getStatusIcon(selectedCattle.status)}
                        {selectedCattle.status.charAt(0).toUpperCase() + selectedCattle.status.slice(1)}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="details-section">
                  <h4>Location & Ownership</h4>
                  <div className="details-row">
                    <span className="label">Location:</span>
                    <span className="value">{selectedCattle.location}</span>
                  </div>
                  <div className="details-row">
                    <span className="label">Farmer:</span>
                    <span className="value">{selectedCattle.farmerName}</span>
                  </div>
                  <div className="details-row">
                    <span className="label">Farmer ID:</span>
                    <span className="value">{selectedCattle.farmerId}</span>
                  </div>
                  <div className="details-row">
                    <span className="label">Acquisition Date:</span>
                    <span className="value">{selectedCattle.acquisitionDate}</span>
                  </div>
                </div>

                <div className="details-section">
                  <h4>Health & Production</h4>
                  <div className="details-row">
                    <span className="label">Last Checkup:</span>
                    <span className="value">{selectedCattle.lastCheckup}</span>
                  </div>
                  <div className="details-row">
                    <span className="label">Next Checkup:</span>
                    <span className="value">{selectedCattle.nextCheckup}</span>
                  </div>
                  <div className="details-row">
                    <span className="label">Milk Production:</span>
                    <span className="value">
                      {selectedCattle.gender === 'Female' ? `${selectedCattle.milkProduction}L/day` : 'N/A'}
                    </span>
                  </div>
                  <div className="details-row">
                    <span className="label">Pregnancy Status:</span>
                    <span className="value">{selectedCattle.pregnancyStatus}</span>
                  </div>
                </div>

                <div className="details-section full-width">
                  <h4>Vaccination Records</h4>
                  <table className="details-table">
                    <thead>
                      <tr>
                        <th>Vaccine</th>
                        <th>Date Given</th>
                        <th>Next Due</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCattle.vaccinations.map((vaccination, index) => (
                        <tr key={index}>
                          <td>{vaccination.name}</td>
                          <td>{vaccination.date}</td>
                          <td>{vaccination.nextDue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="details-section full-width">
                  <h4>Health Records</h4>
                  <table className="details-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Condition</th>
                        <th>Treatment</th>
                        <th>Veterinarian</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCattle.healthRecords.map((record, index) => (
                        <tr key={index}>
                          <td>{record.date}</td>
                          <td>{record.condition}</td>
                          <td>{record.treatment}</td>
                          <td>{record.veterinarian}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {selectedCattle.notes && (
                  <div className="details-section full-width">
                    <h4>Notes</h4>
                    <p className="notes-text">{selectedCattle.notes}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowDetailsModal(false)}>
                Close
              </button>
              <button className="btn btn-warning" onClick={() => {
                handleEdit(selectedCattle);
                setShowDetailsModal(false);
              }}>
                <FaEdit /> Edit
              </button>
              <button className="btn btn-primary">
                <FaPrint /> Print Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CattleManagement;