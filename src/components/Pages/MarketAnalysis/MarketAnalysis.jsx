// Enhanced MarketAnalysis.jsx with unique classes and real-time features
import React, { useState, useEffect, useMemo } from 'react';
import './MarketAnalysis.css';

const MarketAnalysis = () => {
  // State with unique prefixes to avoid conflicts
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
    marketTrend: (ma_realTimeData.priceChange || 3.35) > 0 ? 'bullish' : 'bearish',
    volume: ma_realTimeData.volume || 12500,
    averageQuality: 4.2,
    marketVolatility: ma_realTimeData.marketVolatility || 8.5,
    demandIndex: 78.5,
    supplyIndex: 82.3,
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

      {/* Market Overview Cards */}
      <div className="ma-overview-grid">
        <div className="ma-overview-card ma-price-card">
          <div className="ma-card-header">
            <h3 className="ma-card-title">Current Price</h3>
            <span className={`ma-trend-badge ma-trend-${ma_marketData.marketTrend}`}>
              {ma_marketData.marketTrend === 'bullish' ? '📈' : '📉'}
            </span>
          </div>
          <div className="ma-card-content">
            <div className="ma-price-display">
              <span className="ma-price-value">₹{ma_marketData.currentPrice.toFixed(2)}</span>
              <span className="ma-price-unit">/liter</span>
            </div>
            <div className="ma-price-change">
              <span className={`ma-change ${ma_marketData.priceChange > 0 ? 'ma-positive' : 'ma-negative'}`}>
                {ma_marketData.priceChange > 0 ? '+' : ''}{ma_marketData.priceChange.toFixed(2)}%
              </span>
              <span className="ma-change-text">today</span>
            </div>
            <div className="ma-price-range">
              <span className="ma-range-label">Range:</span>
              <span className="ma-range-value">{ma_marketData.tradingRange}</span>
            </div>
          </div>
        </div>

        <div className="ma-overview-card ma-volume-card">
          <div className="ma-card-header">
            <h3 className="ma-card-title">Trading Volume</h3>
            <span className="ma-volume-icon">📦</span>
          </div>
          <div className="ma-card-content">
            <div className="ma-volume-display">
              <span className="ma-volume-value">{ma_marketData.volume.toLocaleString()}</span>
              <span className="ma-volume-unit">liters</span>
            </div>
            <div className="ma-volume-avg">
              <span className="ma-avg-label">Avg Volume:</span>
              <span className="ma-avg-value">{ma_marketData.avgVolume.toLocaleString()}L</span>
            </div>
          </div>
        </div>

        <div className="ma-overview-card ma-quality-card">
          <div className="ma-card-header">
            <h3 className="ma-card-title">Quality Score</h3>
            <span className="ma-quality-icon">⭐</span>
          </div>
          <div className="ma-card-content">
            <div className="ma-quality-display">
              <span className="ma-quality-value">{ma_marketData.averageQuality}</span>
              <span className="ma-quality-unit">/ 5.0</span>
            </div>
            <div className="ma-quality-status">
              <span className="ma-status-label">Status:</span>
              <span className="ma-status-value ma-excellent">Excellent</span>
            </div>
          </div>
        </div>

        <div className="ma-overview-card ma-volatility-card">
          <div className="ma-card-header">
            <h3 className="ma-card-title">Market Volatility</h3>
            <span className="ma-volatility-icon">📊</span>
          </div>
          <div className="ma-card-content">
            <div className="ma-volatility-display">
              <span className="ma-volatility-value">{ma_marketData.marketVolatility.toFixed(1)}%</span>
            </div>
            <div className="ma-volatility-status">
              <span className="ma-status-label">Level:</span>
              <span className="ma-status-value ma-moderate">Moderate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="ma-tabs">
        <button 
          className={`ma-tab ${ma_activeTab === 'overview' ? 'ma-tab-active' : ''}`}
          onClick={() => setMaActiveTab('overview')}
        >
          <span className="ma-tab-icon">📊</span>
          Overview
        </button>
        <button 
          className={`ma-tab ${ma_activeTab === 'trading' ? 'ma-tab-active' : ''}`}
          onClick={() => setMaActiveTab('trading')}
        >
          <span className="ma-tab-icon">💹</span>
          Trading
        </button>
        <button 
          className={`ma-tab ${ma_activeTab === 'competitors' ? 'ma-tab-active' : ''}`}
          onClick={() => setMaActiveTab('competitors')}
        >
          <span className="ma-tab-icon">🏆</span>
          Competitors
        </button>
        <button 
          className={`ma-tab ${ma_activeTab === 'forecast' ? 'ma-tab-active' : ''}`}
          onClick={() => setMaActiveTab('forecast')}
        >
          <span className="ma-tab-icon">🔮</span>
          Forecast
        </button>
        <button 
          className={`ma-tab ${ma_activeTab === 'regional' ? 'ma-tab-active' : ''}`}
          onClick={() => setMaActiveTab('regional')}
        >
          <span className="ma-tab-icon">🌍</span>
          Regional
        </button>
      </div>

      {/* Content Area */}
      <div className="ma-content">
        {ma_activeTab === 'overview' && (
          <div className="ma-tab-content">
            {/* Price Chart */}
            <div className="ma-chart-section">
              <div className="ma-chart-card">
                <div className="ma-chart-header">
                  <h3 className="ma-chart-title">Price Trend Analysis</h3>
                  <div className="ma-chart-legend">
                    <div className="ma-legend-item">
                      <span className="ma-legend-color ma-price-color"></span>
                      <span>Price</span>
                    </div>
                    <div className="ma-legend-item">
                      <span className="ma-legend-color ma-volume-color"></span>
                      <span>Volume</span>
                    </div>
                  </div>
                </div>
                <div className="ma-chart-container">
                  <div className="ma-price-chart">
                    {ma_priceHistory.map((data, index) => (
                      <div key={index} className="ma-chart-bar">
                        <div 
                          className="ma-price-bar" 
                          style={{ height: `${(data.price / 55) * 100}%` }}
                          title={`₹${data.price.toFixed(2)} - ${data.date}`}
                        ></div>
                        <div 
                          className="ma-volume-bar" 
                          style={{ height: `${(data.volume / 13000) * 60}%` }}
                          title={`${data.volume}L - ${data.date}`}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="ma-chart-labels">
                    {ma_priceHistory.map((data, index) => (
                      <span key={index} className="ma-chart-label">
                        {new Date(data.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Indicators */}
            <div className="ma-indicators-section">
              <div className="ma-indicators-card">
                <div className="ma-indicators-header">
                  <h3 className="ma-indicators-title">Technical Indicators</h3>
                </div>
                <div className="ma-indicators-grid">
                  <div className="ma-indicator-item">
                    <span className="ma-indicator-name">RSI</span>
                    <span className="ma-indicator-value">{ma_indicators.rsi}</span>
                    <span className="ma-indicator-status ma-overbought">Overbought</span>
                  </div>
                  <div className="ma-indicator-item">
                    <span className="ma-indicator-name">MACD</span>
                    <span className="ma-indicator-value">{ma_indicators.macd}</span>
                    <span className="ma-indicator-status ma-bullish">Bullish</span>
                  </div>
                  <div className="ma-indicator-item">
                    <span className="ma-indicator-name">MA-5</span>
                    <span className="ma-indicator-value">₹{ma_indicators.movingAverage.ma5}</span>
                    <span className="ma-indicator-status ma-above">Above</span>
                  </div>
                  <div className="ma-indicator-item">
                    <span className="ma-indicator-name">MA-20</span>
                    <span className="ma-indicator-value">₹{ma_indicators.movingAverage.ma20}</span>
                    <span className="ma-indicator-status ma-above">Above</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Metrics */}
            <div className="ma-quality-section">
              <div className="ma-quality-card">
                <div className="ma-quality-header">
                  <h3 className="ma-quality-title">Quality Metrics</h3>
                  <div className="ma-quality-score">
                    <span className="ma-score-label">Overall Score:</span>
                    <span className="ma-score-value">92%</span>
                  </div>
                </div>
                <div className="ma-quality-metrics">
                  {ma_qualityMetrics.map((metric, index) => (
                    <div key={index} className="ma-metric-item">
                      <div className="ma-metric-info">
                        <span className="ma-metric-name">{metric.parameter}</span>
                        <span className="ma-metric-values">
                          {metric.current} / {metric.benchmark}
                        </span>
                      </div>
                      <div className="ma-metric-progress">
                        <div 
                          className={`ma-progress-bar ma-${metric.status}`}
                          style={{ width: `${Math.min((metric.current / metric.benchmark) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className={`ma-metric-status ma-${metric.status}`}>
                        {metric.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {ma_activeTab === 'trading' && (
          <div className="ma-tab-content">
            <div className="ma-trading-session">
              <h3 className="ma-section-title">Trading Sessions</h3>
              <div className="ma-sessions-grid">
                <div className="ma-session-card">
                  <h4 className="ma-session-title">Pre-Market</h4>
                  <div className="ma-session-price">₹{ma_tradingSession.preMarket.price}</div>
                  <div className="ma-session-change ma-negative">
                    {ma_tradingSession.preMarket.change}%
                  </div>
                  <div className="ma-session-volume">
                    Vol: {ma_tradingSession.preMarket.volume}L
                  </div>
                </div>
                <div className="ma-session-card ma-session-active">
                  <h4 className="ma-session-title">Regular Market</h4>
                  <div className="ma-session-price">₹{ma_tradingSession.regular.price.toFixed(2)}</div>
                  <div className={`ma-session-change ${ma_tradingSession.regular.change > 0 ? 'ma-positive' : 'ma-negative'}`}>
                    {ma_tradingSession.regular.change > 0 ? '+' : ''}{ma_tradingSession.regular.change.toFixed(2)}%
                  </div>
                  <div className="ma-session-volume">
                    Vol: {ma_tradingSession.regular.volume.toLocaleString()}L
                  </div>
                </div>
                <div className="ma-session-card">
                  <h4 className="ma-session-title">Post-Market</h4>
                  <div className="ma-session-price">₹{ma_tradingSession.postMarket.price}</div>
                  <div className="ma-session-change ma-positive">
                    +{ma_tradingSession.postMarket.change}%
                  </div>
                  <div className="ma-session-volume">
                    Vol: {ma_tradingSession.postMarket.volume}L
                  </div>
                </div>
              </div>
            </div>

            <div className="ma-support-resistance">
              <h3 className="ma-section-title">Support & Resistance</h3>
              <div className="ma-levels-chart">
                <div className="ma-level ma-resistance">
                  <span className="ma-level-label">Resistance</span>
                  <span className="ma-level-value">₹{ma_marketData.resistance}</span>
                </div>
                <div className="ma-level ma-current">
                  <span className="ma-level-label">Current</span>
                  <span className="ma-level-value">₹{ma_marketData.currentPrice.toFixed(2)}</span>
                </div>
                <div className="ma-level ma-support">
                  <span className="ma-level-label">Support</span>
                  <span className="ma-level-value">₹{ma_marketData.support}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {ma_activeTab === 'competitors' && (
          <div className="ma-tab-content">
            <div className="ma-competitors-section">
              <h3 className="ma-section-title">Competitor Analysis</h3>
              <div className="ma-competitors-table">
                <table className="ma-table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Price (₹/L)</th>
                      <th>Market Share</th>
                      <th>Volume</th>
                      <th>Growth</th>
                      <th>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ma_competitorData.map((competitor, index) => (
                      <tr key={index}>
                        <td className="ma-company-name">{competitor.name}</td>
                        <td className="ma-price">₹{competitor.price}</td>
                        <td className="ma-market-share">{competitor.marketShare}%</td>
                        <td className="ma-volume">{competitor.volume.toLocaleString()}L</td>
                        <td className={`ma-growth ${competitor.growth > 0 ? 'ma-positive' : 'ma-negative'}`}>
                          {competitor.growth > 0 ? '+' : ''}{competitor.growth}%
                        </td>
                        <td className={`ma-trend ma-${competitor.trend}`}>
                          {competitor.trend === 'rising' ? '↗️' : 
                           competitor.trend === 'falling' ? '↘️' : 
                           competitor.trend === 'stable' ? '➡️' : '🔄'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {ma_activeTab === 'forecast' && (
          <div className="ma-tab-content">
            <div className="ma-forecast-section">
              <h3 className="ma-section-title">Demand & Supply Forecast</h3>
              <div className="ma-forecast-chart">
                {ma_demandForecast.map((data, index) => (
                  <div key={index} className="ma-forecast-item">
                    <div className="ma-forecast-bars">
                      <div 
                        className="ma-demand-bar" 
                        style={{ height: `${(data.demand / 180000) * 100}%` }}
                        title={`Demand: ${data.demand.toLocaleString()}L`}
                      ></div>
                      <div 
                        className="ma-supply-bar" 
                        style={{ height: `${(data.supply / 180000) * 100}%` }}
                        title={`Supply: ${data.supply.toLocaleString()}L`}
                      ></div>
                    </div>
                    <div className="ma-forecast-details">
                      <span className="ma-forecast-month">{data.month}</span>
                      <span className="ma-forecast-price">₹{data.price}</span>
                      <span className="ma-forecast-confidence">{data.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="ma-forecast-legend">
                <div className="ma-legend-item">
                  <span className="ma-legend-color ma-demand-color"></span>
                  <span>Demand</span>
                </div>
                <div className="ma-legend-item">
                  <span className="ma-legend-color ma-supply-color"></span>
                  <span>Supply</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {ma_activeTab === 'regional' && (
          <div className="ma-tab-content">
            <div className="ma-regional-section">
              <h3 className="ma-section-title">Regional Market Analysis</h3>
              <div className="ma-regional-grid">
                {ma_regionalData.map((region, index) => (
                  <div key={index} className="ma-regional-card">
                    <div className="ma-regional-header">
                      <h4 className="ma-regional-name">{region.region}</h4>
                      <span className="ma-regional-growth">+{region.growth}%</span>
                    </div>
                    <div className="ma-regional-stats">
                      <div className="ma-regional-stat">
                        <span className="ma-stat-label">Price:</span>
                        <span className="ma-stat-value">₹{region.price}</span>
                      </div>
                      <div className="ma-regional-stat">
                        <span className="ma-stat-label">Demand:</span>
                        <span className="ma-stat-value">{region.demand}%</span>
                      </div>
                      <div className="ma-regional-stat">
                        <span className="ma-stat-label">Supply:</span>
                        <span className="ma-stat-value">{region.supply}%</span>
                      </div>
                    </div>
                    <div className="ma-regional-balance">
                      <div className="ma-balance-bar">
                        <div 
                          className="ma-demand-portion" 
                          style={{ width: `${(region.demand / (region.demand + region.supply)) * 100}%` }}
                        ></div>
                      </div>
                      <span className="ma-balance-label">
                        {region.demand > region.supply ? 'Demand > Supply' : 'Supply > Demand'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="ma-footer">
        <div className="ma-footer-info">
          <span className="ma-update-time">
            Last updated: {ma_lastUpdate.toLocaleString()}
          </span>
          <span className="ma-data-source">
            Data source: Real-time market feeds
          </span>
        </div>
        <div className="ma-footer-actions">
          <button className="ma-export-btn">📊 Export Data</button>
          <button className="ma-alert-btn">🔔 Set Alert</button>
          <button className="ma-share-btn">📤 Share</button>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;