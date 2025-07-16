// MarketAnalysis.jsx
import React, { useState, useEffect, useMemo } from 'react';
import './MarketAnalysis.css';

const MarketAnalysis = () => {
  const [ma_selectedPeriod, setMaSelectedPeriod] = useState('7days');
  const [ma_selectedChart, setMaSelectedChart] = useState('price');
  const [ma_activeTab, setMaActiveTab] = useState('overview');
  const [ma_loading, setMaLoading] = useState(false);
  const [ma_lastUpdate, setMaLastUpdate] = useState(new Date());
  const [ma_realTimeData, setMaRealTimeData] = useState({});
  const [ma_alerts, setMaAlerts] = useState([]);

  // Real-time data simulation
  useEffect(() => {
    const ma_interval = setInterval(() => {
      setMaLastUpdate(new Date());
      
      // Simulate real-time price fluctuations
      setMaRealTimeData(prev => ({
        ...prev,
        currentPrice: 52.5 + (Math.random() - 0.5) * 2,
        volume: 12500 + Math.floor(Math.random() * 1000),
        priceChange: (Math.random() - 0.5) * 6,
        marketVolatility: Math.random() * 15
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(ma_interval);
  }, []);

  // Generate alerts based on market conditions
  useEffect(() => {
    const ma_checkAlerts = () => {
      const ma_newAlerts = [];
      
      if (ma_realTimeData.currentPrice > 54) {
        ma_newAlerts.push({
          id: Date.now(),
          type: 'price',
          severity: 'high',
          message: 'Price exceeded upper threshold of ₹54/L',
          timestamp: new Date()
        });
      }
      
      if (ma_realTimeData.volume < 11000) {
        ma_newAlerts.push({
          id: Date.now() + 1,
          type: 'volume',
          severity: 'medium',
          message: 'Trading volume below average',
          timestamp: new Date()
        });
      }
      
      if (ma_realTimeData.marketVolatility > 12) {
        ma_newAlerts.push({
          id: Date.now() + 2,
          type: 'volatility',
          severity: 'high',
          message: 'High market volatility detected',
          timestamp: new Date()
        });
      }
      
      setMaAlerts(ma_newAlerts);
    };

    if (Object.keys(ma_realTimeData).length > 0) {
      ma_checkAlerts();
    }
  }, [ma_realTimeData]);

  // Enhanced market data with real-time updates
  const ma_marketData = useMemo(() => ({
    currentPrice: ma_realTimeData.currentPrice || 52.5,
    previousPrice: 50.8,
    priceChange: ma_realTimeData.priceChange || 3.35,
    marketTrend: ma_realTimeData.priceChange > 0 ? 'bullish' : 'bearish',
    volume: ma_realTimeData.volume || 12500,
    averageQuality: 4.2,
    marketVolatility: ma_realTimeData.marketVolatility || 8.5,
    demandIndex: 78.5,
    supplyIndex: 82.3,
    priceVolatility: 'moderate',
    marketCap: 45.2,
    dayHigh: 53.8,
    dayLow: 51.2,
    openPrice: 52.0,
    closePrice: 52.5,
    avgVolume: 12800,
    tradingRange: '51.2 - 53.8',
    resistance: 54.0,
    support: 50.5
  }), [ma_realTimeData]);

  // Enhanced price history with more data points
  const ma_priceHistory = useMemo(() => [
    { date: '2024-01-08', price: 48.5, volume: 11200, high: 49.1, low: 48.2, volatility: 5.2 },
    { date: '2024-01-09', price: 49.2, volume: 11800, high: 49.8, low: 48.9, volatility: 4.8 },
    { date: '2024-01-10', price: 50.1, volume: 12100, high: 50.5, low: 49.7, volatility: 6.1 },
    { date: '2024-01-11', price: 50.8, volume: 12000, high: 51.2, low: 50.4, volatility: 5.9 },
    { date: '2024-01-12', price: 51.2, volume: 12300, high: 51.8, low: 50.9, volatility: 7.3 },
    { date: '2024-01-13', price: 52.0, volume: 12400, high: 52.5, low: 51.6, volatility: 6.8 },
    { date: '2024-01-14', price: ma_marketData.currentPrice, volume: ma_marketData.volume, high: ma_marketData.dayHigh, low: ma_marketData.dayLow, volatility: ma_marketData.marketVolatility }
  ], [ma_marketData]);

  // Enhanced competitor data
  const ma_competitorData = [
    { name: 'Dairy Fresh Co.', price: 51.8, marketShare: 25, trend: 'stable', volume: 8500, growth: 2.1 },
    { name: 'Pure Milk Ltd.', price: 53.2, marketShare: 22, trend: 'rising', volume: 7200, growth: 5.8 },
    { name: 'Farm Valley', price: 50.5, marketShare: 18, trend: 'falling', volume: 6100, growth: -1.2 },
    { name: 'Golden Dairy', price: 52.0, marketShare: 15, trend: 'stable', volume: 5800, growth: 0.5 },
    { name: 'Others', price: 51.5, marketShare: 20, trend: 'mixed', volume: 4200, growth: 1.8 }
  ];

  // Enhanced demand forecast
  const ma_demandForecast = [
    { month: 'Feb', demand: 145000, supply: 142000, price: 52.8, confidence: 85 },
    { month: 'Mar', demand: 152000, supply: 148000, price: 53.5, confidence: 82 },
    { month: 'Apr', demand: 158000, supply: 155000, price: 54.2, confidence: 78 },
    { month: 'May', demand: 165000, supply: 162000, price: 54.8, confidence: 75 },
    { month: 'Jun', demand: 172000, supply: 168000, price: 55.5, confidence: 72 }
  ];

  // Enhanced quality metrics
  const ma_qualityMetrics = [
    { parameter: 'Fat Content', current: 4.2, benchmark: 4.0, status: 'excellent', trend: 'up' },
    { parameter: 'Protein', current: 3.8, benchmark: 3.5, status: 'excellent', trend: 'stable' },
    { parameter: 'Lactose', current: 4.9, benchmark: 4.8, status: 'good', trend: 'up' },
    { parameter: 'Minerals', current: 0.7, benchmark: 0.7, status: 'average', trend: 'stable' },
    { parameter: 'SCC (Somatic Cell Count)', current: 195000, benchmark: 200000, status: 'good', trend: 'down' },
    { parameter: 'Bacteria Count', current: 15000, benchmark: 20000, status: 'excellent', trend: 'down' }
  ];

  // Regional market data
  const ma_regionalData = [
    { region: 'North India', demand: 35, supply: 32, price: 51.2, growth: 3.2 },
    { region: 'South India', demand: 42, supply: 45, price: 52.8, growth: 4.1 },
    { region: 'East India', demand: 28, supply: 26, price: 50.5, growth: 2.8 },
    { region: 'West India', demand: 38, supply: 35, price: 53.5, growth: 3.8 },
    { region: 'Central India', demand: 25, supply: 28, price: 49.8, growth: 2.1 }
  ];

  // Trading session data
  const ma_tradingSession = {
    preMarket: { price: 51.8, volume: 1200, change: -0.4 },
    regular: { price: ma_marketData.currentPrice, volume: ma_marketData.volume, change: ma_marketData.priceChange },
    postMarket: { price: 52.3, volume: 800, change: 0.2 }
  };

  // Market indicators
  const ma_indicators = {
    rsi: 68.5,
    macd: 0.85,
    bollinger: { upper: 54.2, middle: 52.5, lower: 50.8 },
    movingAverage: { ma5: 52.1, ma10: 51.8, ma20: 51.2 },
    stochastic: 72.3,
    momentum: 5.2
  };

  // Refresh function
  const ma_handleRefresh = () => {
    setMaLoading(true);
    setTimeout(() => {
      setMaLastUpdate(new Date());
      setMaLoading(false);
    }, 1000);
  };

  return (
    <div className="ma-container">
      {/* Real-time alerts */}
      {ma_alerts.length > 0 && (
        <div className="ma-alerts-bar">
          {ma_alerts.map(alert => (
            <div key={alert.id} className={`ma-alert ma-alert-${alert.severity}`}>
              <span className="ma-alert-icon">⚠️</span>
              <span className="ma-alert-message">{alert.message}</span>
              <span className="ma-alert-time">{alert.timestamp.toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="ma-header">
        <div className="ma-header-left">
          <h1 className="ma-title">
            <span className="ma-icon">📊</span>
            Milk Market Analysis
          </h1>
          <p className="ma-subtitle">Real-time market intelligence & analytics</p>
        </div>
        
        <div className="ma-header-right">
          <div className="ma-live-indicator">
            <span className="ma-live-dot"></span>
            <span className="ma-live-text">LIVE</span>
          </div>
          
          <div className="ma-controls">
            <div className="ma-period-selector">
              <label className="ma-label">Period:</label>
              <select 
                value={ma_selectedPeriod} 
                onChange={(e) => setMaSelectedPeriod(e.target.value)}
                className="ma-select"
              >
                <option value="1day">1 Day</option>
                <option value="7days">7 Days</option>
                <option value="30days">30 Days</option>
                <option value="3months">3 Months</option>
                <option value="1year">1 Year</option>
              </select>
            </div>

            <div className="ma-chart-selector">
              <label className="ma-label">Chart:</label>
              <div className="ma-chart-buttons">
                <button 
                  className={`ma-chart-btn ${ma_selectedChart === 'price' ? 'ma-active' : ''}`}
                  onClick={() => setMaSelectedChart('price')}
                >
                  💰 Price
                </button>
                <button 
                  className={`ma-chart-btn ${ma_selectedChart === 'volume' ? 'ma-active' : ''}`}
                  onClick={() => setMaSelectedChart('volume')}
                >
                  📊 Volume
                </button>
                <button 
                  className={`ma-chart-btn ${ma_selectedChart === 'volatility' ? 'ma-active' : ''}`}
                  onClick={() => setMaSelectedChart('volatility')}
                >
                  📈 Volatility
                </button>
              </div>
            </div>

            <button 
              className="ma-refresh-btn"
              onClick={ma_handleRefresh}
              disabled={ma_loading}
            >
              <span className={`ma-refresh-icon ${ma_loading ? 'ma-spinning' : ''}`}>🔄</span>
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="analysis-controls">
        <div className="period-selector">
          <label>Time Period:</label>
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-select"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="3months">Last 3 Months</option>
            <option value="1year">Last Year</option>
          </select>
        </div>

        <div className="chart-selector">
          <label>Chart Type:</label>
          <div className="chart-buttons">
            <button 
              className={`chart-btn ${selectedChart === 'price' ? 'active' : ''}`}
              onClick={() => setSelectedChart('price')}
            >
              💰 Price
            </button>
            <button 
              className={`chart-btn ${selectedChart === 'volume' ? 'active' : ''}`}
              onClick={() => setSelectedChart('volume')}
            >
              📊 Volume
            </button>
            <button 
              className={`chart-btn ${selectedChart === 'quality' ? 'active' : ''}`}
              onClick={() => setSelectedChart('quality')}
            >
              ⭐ Quality
            </button>
          </div>
        </div>
      </div>

      <div className="market-overview">
        <div className="overview-card current-price">
          <div className="card-header">
            <h3>Current Market Price</h3>
            <span className={`trend-icon ${marketData.marketTrend}`}>
              {marketData.marketTrend === 'bullish' ? '📈' : '📉'}
            </span>
          </div>
          <div className="price-display">
            <span className="price">₹{marketData.currentPrice}</span>
            <span className="price-unit">per liter</span>
          </div>
          <div className="price-change">
            <span className={`change ${marketData.priceChange > 0 ? 'positive' : 'negative'}`}>
              {marketData.priceChange > 0 ? '+' : ''}{marketData.priceChange}%
            </span>
            <span className="change-text">from yesterday</span>
          </div>
        </div>

        <div className="overview-card market-volume">
          <div className="card-header">
            <h3>Market Volume</h3>
            <span className="volume-icon">📦</span>
          </div>
          <div className="volume-display">
            <span className="volume">{marketData.volume.toLocaleString()}</span>
            <span className="volume-unit">liters</span>
          </div>
          <div className="volume-info">
            <span className="info-text">Daily average volume</span>
          </div>
        </div>

        <div className="overview-card quality-score">
          <div className="card-header">
            <h3>Average Quality</h3>
            <span className="quality-icon">🏆</span>
          </div>
          <div className="quality-display">
            <span className="quality">{marketData.averageQuality}</span>
            <span className="quality-unit">/ 5.0</span>
          </div>
          <div className="quality-info">
            <span className="info-text">Industry standard</span>
          </div>
        </div>
      </div>

      <div className="analysis-content">
        <div className="chart-section">
          <div className="chart-card">
            <div className="chart-header">
              <h3>Price Trend Analysis</h3>
              <div className="chart-legend">
                <span className="legend-item price">Price</span>
                <span className="legend-item volume">Volume</span>
              </div>
            </div>
            <div className="chart-container">
              <div className="price-chart">
                {priceHistory.map((data, index) => (
                  <div key={index} className="chart-bar">
                    <div 
                      className="price-bar" 
                      style={{ height: `${(data.price / 55) * 100}%` }}
                      title={`₹${data.price} - ${data.date}`}
                    ></div>
                    <div 
                      className="volume-bar" 
                      style={{ height: `${(data.volume / 13000) * 60}%` }}
                      title={`${data.volume}L - ${data.date}`}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="chart-labels">
                {priceHistory.map((data, index) => (
                  <span key={index} className="chart-label">
                    {new Date(data.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="competitor-section">
          <div className="competitor-card">
            <div className="card-header">
              <h3>Competitor Analysis</h3>
              <button className="refresh-btn">🔄 Refresh</button>
            </div>
            <div className="competitor-list">
              {competitorData.map((competitor, index) => (
                <div key={index} className="competitor-item">
                  <div className="competitor-info">
                    <span className="competitor-name">{competitor.name}</span>
                    <span className="market-share">{competitor.marketShare}% market share</span>
                  </div>
                  <div className="competitor-price">
                    <span className="price">₹{competitor.price}</span>
                    <span className={`trend ${competitor.trend}`}>
                      {competitor.trend === 'rising' ? '↗️' : 
                       competitor.trend === 'falling' ? '↘️' : '➡️'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="forecast-section">
        <div className="forecast-card">
          <div className="card-header">
            <h3>Demand Forecast</h3>
            <span className="forecast-period">Next 5 Months</span>
          </div>
          <div className="forecast-chart">
            {demandForecast.map((data, index) => (
              <div key={index} className="forecast-item">
                <div className="forecast-bars">
                  <div 
                    className="demand-bar" 
                    style={{ height: `${(data.demand / 180000) * 100}%` }}
                    title={`Demand: ${data.demand.toLocaleString()}L`}
                  ></div>
                  <div 
                    className="supply-bar" 
                    style={{ height: `${(data.supply / 180000) * 100}%` }}
                    title={`Supply: ${data.supply.toLocaleString()}L`}
                  ></div>
                </div>
                <span className="forecast-month">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="forecast-legend">
            <span className="legend-item demand">Demand</span>
            <span className="legend-item supply">Supply</span>
          </div>
        </div>

        <div className="quality-metrics-card">
          <div className="card-header">
            <h3>Quality Metrics</h3>
            <span className="benchmark-text">vs Industry Benchmark</span>
          </div>
          <div className="metrics-list">
            {qualityMetrics.map((metric, index) => (
              <div key={index} className="metric-item">
                <div className="metric-info">
                  <span className="metric-name">{metric.parameter}</span>
                  <span className="metric-values">
                    {metric.current} / {metric.benchmark}
                  </span>
                </div>
                <div className="metric-bar">
                  <div 
                    className={`metric-progress ${metric.status}`}
                    style={{ width: `${(metric.current / metric.benchmark) * 100}%` }}
                  ></div>
                </div>
                <span className={`metric-status ${metric.status}`}>
                  {metric.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketAnalysis;
// MarketAnalysis.jsx
import React, { useState } from 'react';
import './MarketAnalysis.css';

const MarketAnalysis = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data
  const marketData = {
    currentPrice: 42.75,
    priceChange: 2.3,
    demandChange: 5.8,
    inventoryTurnover: 4.2,
    productionRatio: 0.92,
    regionalDemand: [
      { region: 'South', value: 52, trend: 'up' },
      { region: 'North', value: 30, trend: 'down' },
      { region: 'East', value: 22, trend: 'up' },
      { region: 'West', value: 18, trend: 'neutral' },
      { region: 'Metro', value: 65, trend: 'up' }
    ],
    priceTrends: [
      { month: 'Jan', price: 38.2 },
      { month: 'Feb', price: 39.5 },
      { month: 'Mar', price: 40.1 },
      { month: 'Apr', price: 41.8 },
      { month: 'May', price: 42.3 },
      { month: 'Jun', price: 42.75 }
    ],
    productPerformance: [
      { product: 'Milk', sales: 580, growth: 12 },
      { product: 'Curd', sales: 420, growth: 8 },
      { product: 'Ghee', sales: 310, growth: 15 },
      { product: 'Paneer', sales: 220, growth: 5 },
      { product: 'Cheese', sales: 180, growth: 20 }
    ],
    qualityMetrics: [
      { parameter: 'Fat Content', value: 4.2, target: 4.0, status: 'exceeds' },
      { parameter: 'Protein', value: 3.8, target: 3.5, status: 'exceeds' },
      { parameter: 'Shelf Life', value: 7, target: 8, status: 'below' },
      { parameter: 'Purity', value: 99.8, target: 99.5, status: 'exceeds' }
    ]
  };

  return (
    <div className="market-dashboard">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>
            <span className="dairy-icon">🥛</span>
            Dairy Market Intelligence
          </h1>
          <p className="subtitle">Real-time analytics & market insights</p>
        </div>
        
        <div className="dashboard-controls">
          <div className="time-range-selector">
            <button 
              className={timeRange === 'week' ? 'active' : ''}
              onClick={() => setTimeRange('week')}
            >
              Weekly
            </button>
            <button 
              className={timeRange === 'month' ? 'active' : ''}
              onClick={() => setTimeRange('month')}
            >
              Monthly
            </button>
            <button 
              className={timeRange === 'quarter' ? 'active' : ''}
              onClick={() => setTimeRange('quarter')}
            >
              Quarterly
            </button>
          </div>
          
          <div className="data-freshness">
            <span className="sync-icon">🔄</span>
            Updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'pricing' ? 'active' : ''}
          onClick={() => setActiveTab('pricing')}
        >
          Pricing
        </button>
        <button 
          className={activeTab === 'demand' ? 'active' : ''}
          onClick={() => setActiveTab('demand')}
        >
          Demand
        </button>
        <button 
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button 
          className={activeTab === 'quality' ? 'active' : ''}
          onClick={() => setActiveTab('quality')}
        >
          Quality
        </button>
      </nav>

      {/* Key Metrics Section */}
      <section className="key-metrics">
        <div className="metric-card highlight">
          <div className="metric-header">
            <h3>Current Milk Price</h3>
            <span className="metric-trend up">↑ 2.3%</span>
          </div>
          <div className="metric-value">
            ₹{marketData.currentPrice}
            <span className="metric-unit">/liter</span>
          </div>
          <div className="metric-comparison">
            vs. industry avg: ₹40.20 (+6.3%)
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-header">
            <h3>Demand Growth</h3>
            <span className="metric-trend up">↑ {marketData.demandChange}%</span>
          </div>
          <div className="metric-value">
            {marketData.demandChange}%
          </div>
          <div className="metric-comparison">
            vs. last {timeRange}
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-header">
            <h3>Inventory Turnover</h3>
            <span className="metric-trend neutral">→</span>
          </div>
          <div className="metric-value">
            {marketData.inventoryTurnover}x
          </div>
          <div className="metric-comparison">
            Industry benchmark: 4.0x
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-header">
            <h3>Production Ratio</h3>
            <span className="metric-trend down">↓ 0.08</span>
          </div>
          <div className="metric-value">
            {marketData.productionRatio}
          </div>
          <div className="metric-comparison">
            Optimal range: 0.95-1.05
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="dashboard-content">
        {/* Price Trends Section */}
        <section className="content-section">
          <div className="section-header">
            <h2>Price Trends & Forecast</h2>
            <div className="section-actions">
              <button className="action-btn">Export Data</button>
              <button className="action-btn">Add Alert</button>
            </div>
          </div>
          
          <div className="chart-container">
            <div className="price-chart">
              {/* This would be replaced with actual chart component */}
              <div className="chart-placeholder">
                <p>Price trend visualization for {timeRange} data</p>
                <div className="trend-line"></div>
              </div>
            </div>
            
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color price"></span>
                <span>Your Price</span>
              </div>
              <div className="legend-item">
                <span className="legend-color market"></span>
                <span>Market Average</span>
              </div>
            </div>
          </div>
          
          <div className="insights-panel">
            <div className="insight-card">
              <h4>Key Insight</h4>
              <p>
                Prices are trending upward due to increased seasonal demand and 
                reduced production in northern regions.
              </p>
            </div>
            <div className="insight-card">
              <h4>Recommendation</h4>
              <p>
                Consider increasing production by 8-10% to capitalize on favorable 
                market conditions.
              </p>
            </div>
          </div>
        </section>

        {/* Regional Demand Section */}
        <section className="content-section">
          <div className="section-header">
            <h2>Regional Demand Analysis</h2>
            <div className="view-toggle">
              <button className="active">Map View</button>
              <button>Table View</button>
            </div>
          </div>
          
          <div className="demand-grid">
            <div className="demand-map">
              {/* This would be replaced with actual map visualization */}
              <div className="map-placeholder">
                <div className="region north">North: 30%</div>
                <div className="region south">South: 52%</div>
                <div className="region east">East: 22%</div>
                <div className="region west">West: 18%</div>
                <div className="region metro">Metro: 65%</div>
              </div>
            </div>
            
            <div className="demand-details">
              <h3>Demand Growth by Region</h3>
              <ul className="demand-list">
                {marketData.regionalDemand.map((region, index) => (
                  <li key={index}>
                    <span className="region-name">{region.region}</span>
                    <span className="demand-value">{region.value}%</span>
                    <span className={`demand-trend ${region.trend}`}>
                      {region.trend === 'up' ? '↑' : region.trend === 'down' ? '↓' : '→'}
                    </span>
                  </li>
                ))}
              </ul>
              
              <div className="demand-summary">
                <h4>Summary</h4>
                <p>
                  Metro areas show strongest demand growth (+8.2% MoM), while 
                  northern regions are experiencing a slight decline (-1.5% MoM).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Performance Section */}
        <section className="content-section">
          <div className="section-header">
            <h2>Product Performance</h2>
            <div className="product-filter">
              <select>
                <option>All Products</option>
                <option>Milk</option>
                <option>Curd</option>
                <option>Ghee</option>
                <option>Paneer</option>
                <option>Cheese</option>
              </select>
            </div>
          </div>
          
          <div className="product-performance">
            <div className="product-chart">
              {/* This would be replaced with actual chart component */}
              <div className="chart-placeholder">
                <p>Product performance visualization</p>
                <div className="product-bars">
                  {marketData.productPerformance.map((product, index) => (
                    <div 
                      key={index} 
                      className="product-bar" 
                      style={{ height: `${product.sales / 6}px` }}
                      title={`${product.product}: ₹${product.sales}K (+${product.growth}%)`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="product-table">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Sales (₹K)</th>
                    <th>Growth</th>
                    <th>Market Share</th>
                  </tr>
                </thead>
                <tbody>
                  {marketData.productPerformance.map((product, index) => (
                    <tr key={index}>
                      <td>{product.product}</td>
                      <td>{product.sales}</td>
                      <td className={product.growth >= 10 ? 'positive' : product.growth < 5 ? 'negative' : ''}>
                        {product.growth}%
                      </td>
                      <td>
                        {Math.round((product.sales / marketData.productPerformance.reduce((acc, curr) => acc + curr.sales, 0)) * 100}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* Quality Metrics Section */}
      <section className="quality-section">
        <div className="section-header">
          <h2>Quality Metrics</h2>
          <div className="quality-target">
            Target Compliance: 92%
          </div>
        </div>
        
        <div className="quality-metrics">
          {marketData.qualityMetrics.map((metric, index) => (
            <div key={index} className="quality-card">
              <div className="metric-info">
                <h4>{metric.parameter}</h4>
                <div className="metric-values">
                  <span className="current-value">{metric.value}</span>
                  <span className="target-value">/ {metric.target}</span>
                </div>
              </div>
              <div className="progress-bar">
                <div 
                  className={`progress-fill ${metric.status}`}
                  style={{ width: `${(metric.value / metric.target) * 100}%` }}
                ></div>
              </div>
              <div className={`status-indicator ${metric.status}`}>
                {metric.status === 'exceeds' ? 'Exceeds Target' : 'Below Target'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>Data refreshed every 15 minutes | Last full update: {new Date().toLocaleString()}</p>
        <div className="footer-links">
          <a href="#">Download Report</a>
          <a href="#">Share Dashboard</a>
          <a href="#">Request Features</a>
        </div>
      </footer>
    </div>
  );
};

export default MarketAnalysis;