import React, { useState, useMemo } from 'react';
import '../css/CustomerReports.css';
// Fixed: Removed FiDownload, FiRefreshCw, FiFilter imports and usage - Updated
import { 
  FiCalendar,
  FiPieChart,
  FiCheckCircle,
  FiXCircle,
  FiStar,
  FiShoppingBag,
  FiDollarSign,
  FiRepeat,
  FiSmartphone,
  FiTrendingUp,
  FiUsers,
  FiAward,
  FiClock,
  FiBarChart2,
  FiTarget,
  FiActivity,
  FiGlobe,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiHeart,
  FiZap,
  FiEye,
  FiAlertTriangle,
  FiMapPin,
  FiCreditCard,
  FiShield,
  FiChevronRight,
  FiShare2,
} from 'react-icons/fi';

function CustomerReports({ customers }) {
  const [dateRange, setDateRange] = useState('30days');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [isLoading] = useState(false);
  const [viewMode, setViewMode] = useState('cards'); // cards, table, chart
  const [filterOptions] = useState({
    status: 'all',
    region: 'all',
    orderRange: 'all'
  });

  // Enhanced data processing with comprehensive analytics
  const getReportData = useMemo(() => {
    const now = new Date();
    const daysAgo = dateRange === '7days' ? 7 : dateRange === '30days' ? 30 : 90;
    const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));

    const previousPeriodCutoff = new Date(now.getTime() - (daysAgo * 2 * 24 * 60 * 60 * 1000));

    // Filter customers based on current filters
    let filteredCustomers = customers;
    if (filterOptions.status !== 'all') {
      filteredCustomers = filteredCustomers.filter(c => c.status === filterOptions.status);
    }

    const recentCustomers = filteredCustomers.filter(c => 
      new Date(c.lastOrderDate) >= cutoffDate
    );
    
    const previousPeriodCustomers = filteredCustomers.filter(c => 
      new Date(c.lastOrderDate) >= previousPeriodCutoff && new Date(c.lastOrderDate) < cutoffDate
    );

    // Basic metrics
    const totalCustomers = filteredCustomers.length;
    const activeCustomers = filteredCustomers.filter(c => c.status === 'active').length;
    const premiumCustomers = filteredCustomers.filter(c => c.status === 'premium').length;
    const inactiveCustomers = filteredCustomers.filter(c => c.status === 'inactive').length;
    const totalRevenue = filteredCustomers.reduce((sum, c) => sum + (c.totalValue || 0), 0);
    const totalOrders = filteredCustomers.reduce((sum, c) => sum + c.totalOrders, 0);
    const avgOrderValue = totalCustomers > 0 ? 
      filteredCustomers.reduce((sum, c) => sum + (c.averageOrderValue || 0), 0) / totalCustomers : 0;

    // Advanced analytics
    const newCustomersThisPeriod = filteredCustomers.filter(c => 
      new Date(c.joinDate) >= cutoffDate
    ).length;
    
    const customerLifetimeValue = avgOrderValue * 6.5; // Estimated CLV
    const churnRate = inactiveCustomers / totalCustomers * 100;
    const retentionRate = 100 - churnRate;
    
    // Revenue analytics
    const monthlyRevenue = totalRevenue / 12;
    const revenueGrowth = previousPeriodCustomers.length > 0 ? 
      ((recentCustomers.length - previousPeriodCustomers.length) / previousPeriodCustomers.length * 100) : 0;
    
    // Geographic distribution (mock data for enhancement)
    const geographicData = [
      { region: 'Mumbai', customers: Math.round(totalCustomers * 0.35), revenue: totalRevenue * 0.38 },
      { region: 'Delhi', customers: Math.round(totalCustomers * 0.28), revenue: totalRevenue * 0.25 },
      { region: 'Bangalore', customers: Math.round(totalCustomers * 0.22), revenue: totalRevenue * 0.24 },
      { region: 'Others', customers: Math.round(totalCustomers * 0.15), revenue: totalRevenue * 0.13 }
    ];

    // Customer satisfaction metrics
    const avgRating = totalCustomers > 0 ?
      filteredCustomers.reduce((sum, c) => {
        const custRating = c.feedback && c.feedback.length > 0 ? 
          c.feedback.reduce((fSum, f) => fSum + f.rating, 0) / c.feedback.length : 0;
        return sum + custRating;
      }, 0) / totalCustomers : 0;

    // Engagement metrics
    const engagementMetrics = {
      emailOpenRate: 42.8,
      clickThroughRate: 18.7,
      appSessionDuration: 8.5,
      pushNotificationRate: 67.3,
      socialMediaEngagement: 34.2
    };

    // Predictive analytics (mock calculations for demonstration)
    const predictiveMetrics = {
      churnRisk: {
        high: Math.round(activeCustomers * 0.08),
        medium: Math.round(activeCustomers * 0.15),
        low: Math.round(activeCustomers * 0.77)
      },
      growthForecast: {
        nextMonth: Math.round(totalCustomers * 1.08),
        nextQuarter: Math.round(totalCustomers * 1.25),
        confidence: 87.3
      },
      revenueProjection: {
        nextMonth: monthlyRevenue * 1.12,
        nextQuarter: monthlyRevenue * 3.4,
        confidence: 91.7
      }
    };

    return {
      // Basic metrics
      totalCustomers,
      activeCustomers,
      premiumCustomers,
      inactiveCustomers,
      recentActivity: recentCustomers.length,
      totalRevenue,
      totalOrders,
      avgOrderValue,
      avgRating,
      
      // Advanced metrics
      newCustomersThisPeriod,
      customerLifetimeValue,
      churnRate,
      retentionRate,
      monthlyRevenue,
      revenueGrowth,
      
      // Segmentation data
      geographicData,
      engagementMetrics,
      predictiveMetrics,
      
      // Trends and comparisons
      trends: {
        customerGrowth: revenueGrowth > 0 ? 'positive' : 'negative',
        revenueGrowth: revenueGrowth,
        engagementTrend: 'positive'
      }
    };
  }, [customers, dateRange, filterOptions]);

  const reportData = getReportData;

  // Enhanced Analytics Cards Section
  const renderEnhancedAnalyticsCards = () => (
    <div className="enhanced-analytics-cards-section">
      <div className="analytics-cards-header">
        <h3 className="analytics-cards-title">
          <FiBarChart2 className="analytics-cards-icon" />
          Advanced Customer Analytics
        </h3>
        <p className="analytics-cards-subtitle">
          Comprehensive insights into customer behavior, value, and performance metrics
        </p>
      </div>
      
      <div className="analytics-cards-grid">
        {/* Customer Lifetime Value Card */}
        <div className="analytics-card clv-card">
          <div className="analytics-card-header">
            <div className="analytics-card-icon clv-icon">
              <FiDollarSign />
            </div>
            <div className="analytics-card-trend positive">
              <FiTrendingUp />
              <span>+12.5%</span>
            </div>
          </div>
          <div className="analytics-card-content">
            <div className="analytics-card-main-value">
              ₹{Math.round(reportData.customerLifetimeValue).toLocaleString()}
            </div>
            <div className="analytics-card-title">Customer Lifetime Value</div>
            <div className="analytics-card-subtitle">
              Average value per customer over their lifecycle
            </div>
            <div className="analytics-card-metrics">
              <div className="metric-item">
                <span className="metric-label">Avg Purchase Frequency:</span>
                <span className="metric-value">2.3x/month</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Customer Lifespan:</span>
                <span className="metric-value">18 months</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Top 20% CLV:</span>
                <span className="metric-value">₹{Math.round(reportData.customerLifetimeValue * 2.8).toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="analytics-card-footer">
            <button 
              className="view-details-btn clv-btn"
              onClick={() => handleViewDetails('clv')}
            >
              <FiEye className="btn-icon" />
              View Details
            </button>
          </div>
        </div>

        {/* Churn Risk Analysis Card */}
        <div className="analytics-card churn-card">
          <div className="analytics-card-header">
            <div className="analytics-card-icon churn-icon">
              <FiAlertTriangle />
            </div>
            <div className="analytics-card-trend negative">
              <FiTrendingUp />
              <span>-3.2%</span>
            </div>
          </div>
          <div className="analytics-card-content">
            <div className="analytics-card-main-value">
              {reportData.churnRate.toFixed(1)}%
            </div>
            <div className="analytics-card-title">Churn Risk Analysis</div>
            <div className="analytics-card-subtitle">
              Customers at risk of churning this quarter
            </div>
            <div className="analytics-card-metrics">
              <div className="metric-item high-risk">
                <span className="metric-label">High Risk:</span>
                <span className="metric-value">{reportData.predictiveMetrics.churnRisk.high} customers</span>
              </div>
              <div className="metric-item medium-risk">
                <span className="metric-label">Medium Risk:</span>
                <span className="metric-value">{reportData.predictiveMetrics.churnRisk.medium} customers</span>
              </div>
              <div className="metric-item low-risk">
                <span className="metric-label">Low Risk:</span>
                <span className="metric-value">{reportData.predictiveMetrics.churnRisk.low} customers</span>
              </div>
            </div>
          </div>
          <div className="analytics-card-footer">
            <button 
              className="view-details-btn churn-btn"
              onClick={() => handleViewDetails('churn')}
            >
              <FiEye className="btn-icon" />
              View Details
            </button>
          </div>
        </div>

        {/* Geographic Performance Card */}
        <div className="analytics-card geographic-card">
          <div className="analytics-card-header">
            <div className="analytics-card-icon geographic-icon">
              <FiMapPin />
            </div>
            <div className="analytics-card-trend positive">
              <FiTrendingUp />
              <span>+8.7%</span>
            </div>
          </div>
          <div className="analytics-card-content">
            <div className="analytics-card-main-value">
              {reportData.geographicData.length}
            </div>
            <div className="analytics-card-title">Geographic Performance</div>
            <div className="analytics-card-subtitle">
              Regional distribution and performance metrics
            </div>
            <div className="analytics-card-metrics">
              {reportData.geographicData.slice(0, 3).map((region, index) => (
                <div key={region.region} className="metric-item">
                  <span className="metric-label">{region.region}:</span>
                  <span className="metric-value">
                    {region.customers} customers (₹{Math.round(region.revenue/1000)}K)
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="analytics-card-footer">
            <button 
              className="view-details-btn geographic-btn"
              onClick={() => handleViewDetails('geographic')}
            >
              <FiEye className="btn-icon" />
              View Details
            </button>
          </div>
        </div>

        {/* Customer Engagement Card */}
        <div className="analytics-card engagement-card">
          <div className="analytics-card-header">
            <div className="analytics-card-icon engagement-icon">
              <FiActivity />
            </div>
            <div className="analytics-card-trend positive">
              <FiTrendingUp />
              <span>+15.3%</span>
            </div>
          </div>
          <div className="analytics-card-content">
            <div className="analytics-card-main-value">
              {reportData.engagementMetrics.emailOpenRate}%
            </div>
            <div className="analytics-card-title">Customer Engagement</div>
            <div className="analytics-card-subtitle">
              Multi-channel engagement and interaction metrics
            </div>
            <div className="analytics-card-metrics">
              <div className="metric-item">
                <span className="metric-label">Email Open Rate:</span>
                <span className="metric-value">{reportData.engagementMetrics.emailOpenRate}%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Click-Through Rate:</span>
                <span className="metric-value">{reportData.engagementMetrics.clickThroughRate}%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">App Session Duration:</span>
                <span className="metric-value">{reportData.engagementMetrics.appSessionDuration} min</span>
              </div>
            </div>
          </div>
          <div className="analytics-card-footer">
            <button 
              className="view-details-btn engagement-btn"
              onClick={() => handleViewDetails('engagement')}
            >
              <FiEye className="btn-icon" />
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Handle View Details functionality
  const handleViewDetails = (cardType) => {
    switch(cardType) {
      case 'clv':
        // Open CLV detailed modal/view
        console.log('Opening Customer Lifetime Value details');
        // You can implement modal opening logic here
        alert(`Opening detailed Customer Lifetime Value analysis:\n\n• Top 10% customers contribute ${Math.round(reportData.totalRevenue * 0.45)}% of revenue\n• Average CLV has increased by 12.5% this quarter\n• Premium customers have 3.2x higher CLV\n• Recommended actions: Focus on customer retention programs`);
        break;
      case 'churn':
        // Open Churn Risk detailed modal/view
        console.log('Opening Churn Risk Analysis details');
        alert(`Opening detailed Churn Risk Analysis:\n\n• ${reportData.predictiveMetrics.churnRisk.high} customers at high risk\n• Main churn indicators: Reduced order frequency, low engagement\n• Retention campaigns can reduce churn by 25%\n• Recommended actions: Implement targeted retention campaigns`);
        break;
      case 'geographic':
        // Open Geographic Performance detailed modal/view
        console.log('Opening Geographic Performance details');
        alert(`Opening detailed Geographic Performance:\n\n• Mumbai leads with ${reportData.geographicData[0].customers} customers\n• Delhi shows highest growth rate at 15.2%\n• Bangalore has highest average order value\n• Recommended actions: Expand to tier-2 cities`);
        break;
      case 'engagement':
        // Open Customer Engagement detailed modal/view
        console.log('Opening Customer Engagement details');
        alert(`Opening detailed Customer Engagement metrics:\n\n• Email campaigns show ${reportData.engagementMetrics.emailOpenRate}% open rate\n• Mobile app engagement up by 15.3%\n• Social media engagement at ${reportData.engagementMetrics.socialMediaEngagement}%\n• Recommended actions: Optimize mobile experience`);
        break;
      default:
        console.log('Unknown card type');
    }
  };

  // Enhanced Overview Report
  const renderEnhancedOverviewReport = () => (
    <div className="enhanced-report-content">
      {renderKPIDashboard()}
      {renderEnhancedAnalyticsCards()}
      {renderBehaviorAnalytics()}
    </div>
  );



  // Enhanced Comprehensive Predictive Analytics Section
  const renderPredictiveAnalytics = () => (
    <div className="enhanced-predictive-analytics-section">
      {/* Main Header with Advanced Controls */}
      <div className="predictive-analytics-header">
        <div className="header-content">
          <div className="title-section">
            <h2 className="predictive-analytics-title">
              <FiTarget className="title-icon" />
              Advanced Predictive Analytics & AI Forecasting
            </h2>
            <p className="predictive-analytics-subtitle">
              AI-powered insights with machine learning algorithms for strategic decision making
            </p>
          </div>
          <div className="header-controls">
            <div className="confidence-indicator">
              <FiShield className="confidence-icon" />
              <span className="confidence-label">Model Accuracy</span>
              <div className="confidence-bar">
                <div 
                  className="confidence-fill" 
                  style={{ width: `${reportData.predictiveMetrics.growthForecast.confidence}%` }}
                ></div>
              </div>
              <span className="confidence-value">{reportData.predictiveMetrics.growthForecast.confidence}%</span>
            </div>
            <button className="refresh-predictions-btn">
              <FiRepeat className="btn-icon" />
              Refresh Predictions
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Forecasting Cards Grid */}
      <div className="advanced-forecasting-grid">
        {/* Customer Growth Prediction */}
        <div className="advanced-prediction-card customer-growth">
          <div className="card-header">
            <div className="card-icon-wrapper">
              <FiUsers className="card-icon" />
              <div className="icon-pulse"></div>
            </div>
            <div className="card-title-section">
              <h3 className="card-title">Customer Growth Forecast</h3>
              <p className="card-subtitle">AI-powered customer acquisition predictions</p>
            </div>
            <div className="card-trend-indicator positive">
              <FiTrendingUp className="trend-icon" />
              <span className="trend-value">+18.7%</span>
            </div>
          </div>
          
          <div className="card-content">
            <div className="primary-metric">
              <span className="metric-value">{reportData.predictiveMetrics.growthForecast.nextMonth.toLocaleString()}</span>
              <span className="metric-label">Projected New Customers (30 days)</span>
            </div>
            
            <div className="forecast-timeline">
              <div className="timeline-item">
                <div className="timeline-period">Next Week</div>
                <div className="timeline-value">+{Math.round(reportData.predictiveMetrics.growthForecast.nextMonth * 0.25)}</div>
                <div className="timeline-confidence">94% confidence</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-period">Next Month</div>
                <div className="timeline-value">+{reportData.predictiveMetrics.growthForecast.nextMonth}</div>
                <div className="timeline-confidence">91% confidence</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-period">Next Quarter</div>
                <div className="timeline-value">+{reportData.predictiveMetrics.growthForecast.nextQuarter}</div>
                <div className="timeline-confidence">87% confidence</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-period">Next Year</div>
                <div className="timeline-value">+{Math.round(reportData.predictiveMetrics.growthForecast.nextQuarter * 3.8)}</div>
                <div className="timeline-confidence">78% confidence</div>
              </div>
            </div>

            <div className="growth-factors">
              <h4 className="factors-title">Key Growth Drivers</h4>
              <div className="factors-list">
                <div className="factor-item high-impact">
                  <span className="factor-label">Digital Marketing ROI</span>
                  <span className="factor-impact">+32% impact</span>
                </div>
                <div className="factor-item medium-impact">
                  <span className="factor-label">Referral Program</span>
                  <span className="factor-impact">+18% impact</span>
                </div>
                <div className="factor-item low-impact">
                  <span className="factor-label">Seasonal Trends</span>
                  <span className="factor-impact">+12% impact</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Forecasting */}
        <div className="advanced-prediction-card revenue-forecast">
          <div className="card-header">
            <div className="card-icon-wrapper">
              <FiDollarSign className="card-icon" />
              <div className="icon-pulse"></div>
            </div>
            <div className="card-title-section">
              <h3 className="card-title">Revenue Forecasting</h3>
              <p className="card-subtitle">Multi-model revenue predictions with scenario analysis</p>
            </div>
            <div className="card-trend-indicator positive">
              <FiTrendingUp className="trend-icon" />
              <span className="trend-value">+24.3%</span>
            </div>
          </div>
          
          <div className="card-content">
            <div className="primary-metric">
              <span className="metric-value">₹{Math.round(reportData.predictiveMetrics.revenueProjection.nextMonth).toLocaleString()}</span>
              <span className="metric-label">Projected Monthly Revenue</span>
            </div>
            
            <div className="scenario-analysis">
              <h4 className="scenario-title">Scenario Analysis</h4>
              <div className="scenario-grid">
                <div className="scenario-item optimistic">
                  <div className="scenario-label">Optimistic</div>
                  <div className="scenario-value">₹{Math.round(reportData.predictiveMetrics.revenueProjection.nextMonth * 1.35).toLocaleString()}</div>
                  <div className="scenario-probability">25% probability</div>
                </div>
                <div className="scenario-item realistic">
                  <div className="scenario-label">Most Likely</div>
                  <div className="scenario-value">₹{Math.round(reportData.predictiveMetrics.revenueProjection.nextMonth).toLocaleString()}</div>
                  <div className="scenario-probability">50% probability</div>
                </div>
                <div className="scenario-item conservative">
                  <div className="scenario-label">Conservative</div>
                  <div className="scenario-value">₹{Math.round(reportData.predictiveMetrics.revenueProjection.nextMonth * 0.78).toLocaleString()}</div>
                  <div className="scenario-probability">25% probability</div>
                </div>
              </div>
            </div>

            <div className="revenue-breakdown">
              <h4 className="breakdown-title">Revenue Stream Forecast</h4>
              <div className="breakdown-items">
                <div className="breakdown-item">
                  <span className="stream-label">Premium Subscriptions</span>
                  <div className="stream-bar">
                    <div className="stream-fill" style={{ width: '68%' }}></div>
                  </div>
                  <span className="stream-value">₹{Math.round(reportData.predictiveMetrics.revenueProjection.nextMonth * 0.68).toLocaleString()}</span>
                </div>
                <div className="breakdown-item">
                  <span className="stream-label">Regular Sales</span>
                  <div className="stream-bar">
                    <div className="stream-fill" style={{ width: '24%' }}></div>
                  </div>
                  <span className="stream-value">₹{Math.round(reportData.predictiveMetrics.revenueProjection.nextMonth * 0.24).toLocaleString()}</span>
                </div>
                <div className="breakdown-item">
                  <span className="stream-label">Add-on Services</span>
                  <div className="stream-bar">
                    <div className="stream-fill" style={{ width: '8%' }}></div>
                  </div>
                  <span className="stream-value">₹{Math.round(reportData.predictiveMetrics.revenueProjection.nextMonth * 0.08).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Churn Prediction & Prevention */}
        <div className="advanced-prediction-card churn-prediction">
          <div className="card-header">
            <div className="card-icon-wrapper">
              <FiAlertTriangle className="card-icon" />
              <div className="icon-pulse warning"></div>
            </div>
            <div className="card-title-section">
              <h3 className="card-title">Churn Prediction & Prevention</h3>
              <p className="card-subtitle">AI-driven customer retention insights</p>
            </div>
            <div className="card-trend-indicator negative">
              <FiTrendingUp className="trend-icon" />
              <span className="trend-value">-3.2%</span>
            </div>
          </div>
          
          <div className="card-content">
            <div className="primary-metric">
              <span className="metric-value">{reportData.predictiveMetrics.churnRisk.high + reportData.predictiveMetrics.churnRisk.medium}</span>
              <span className="metric-label">Customers at Risk (Next 30 Days)</span>
            </div>
            
            <div className="churn-risk-matrix">
              <h4 className="matrix-title">Risk Assessment Matrix</h4>
              <div className="risk-levels">
                <div className="risk-level critical">
                  <div className="risk-indicator"></div>
                  <div className="risk-info">
                    <span className="risk-label">Critical Risk</span>
                    <span className="risk-count">{reportData.predictiveMetrics.churnRisk.high} customers</span>
                    <span className="risk-action">Immediate intervention required</span>
                  </div>
                  <div className="risk-percentage">8.2%</div>
                </div>
                <div className="risk-level high">
                  <div className="risk-indicator"></div>
                  <div className="risk-info">
                    <span className="risk-label">High Risk</span>
                    <span className="risk-count">{reportData.predictiveMetrics.churnRisk.medium} customers</span>
                    <span className="risk-action">Proactive engagement needed</span>
                  </div>
                  <div className="risk-percentage">15.7%</div>
                </div>
                <div className="risk-level moderate">
                  <div className="risk-indicator"></div>
                  <div className="risk-info">
                    <span className="risk-label">Moderate Risk</span>
                    <span className="risk-count">{Math.round(reportData.predictiveMetrics.churnRisk.low * 0.3)} customers</span>
                    <span className="risk-action">Monitor closely</span>
                  </div>
                  <div className="risk-percentage">23.1%</div>
                </div>
                <div className="risk-level low">
                  <div className="risk-indicator"></div>
                  <div className="risk-info">
                    <span className="risk-label">Low Risk</span>
                    <span className="risk-count">{Math.round(reportData.predictiveMetrics.churnRisk.low * 0.7)} customers</span>
                    <span className="risk-action">Maintain satisfaction</span>
                  </div>
                  <div className="risk-percentage">53.0%</div>
                </div>
              </div>
            </div>

            <div className="prevention-strategies">
              <h4 className="strategies-title">AI-Recommended Actions</h4>
              <div className="strategy-items">
                <div className="strategy-item priority-high">
                  <FiPhone className="strategy-icon" />
                  <span className="strategy-text">Personal outreach to {reportData.predictiveMetrics.churnRisk.high} high-risk customers</span>
                  <span className="strategy-impact">Expected retention: 67%</span>
                </div>
                <div className="strategy-item priority-medium">
                  <FiHeart className="strategy-icon" />
                  <span className="strategy-text">Loyalty rewards for {reportData.predictiveMetrics.churnRisk.medium} at-risk customers</span>
                  <span className="strategy-impact">Expected retention: 43%</span>
                </div>
                <div className="strategy-item priority-low">
                  <FiMail className="strategy-icon" />
                  <span className="strategy-text">Automated engagement campaigns</span>
                  <span className="strategy-impact">Expected retention: 28%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Intelligence & Opportunities */}
        <div className="advanced-prediction-card market-intelligence">
          <div className="card-header">
            <div className="card-icon-wrapper">
              <FiGlobe className="card-icon" />
              <div className="icon-pulse"></div>
            </div>
            <div className="card-title-section">
              <h3 className="card-title">Market Intelligence & Opportunities</h3>
              <p className="card-subtitle">Competitive analysis and market expansion insights</p>
            </div>
            <div className="card-trend-indicator positive">
              <FiTrendingUp className="trend-icon" />
              <span className="trend-value">+42.8%</span>
            </div>
          </div>
          
          <div className="card-content">
            <div className="primary-metric">
              <span className="metric-value">₹{Math.round(reportData.totalRevenue * 2.3).toLocaleString()}</span>
              <span className="metric-label">Total Market Opportunity</span>
            </div>
            
            <div className="market-segments">
              <h4 className="segments-title">High-Potential Segments</h4>
              <div className="segment-opportunities">
                <div className="opportunity-segment premium">
                  <div className="segment-header">
                    <FiStar className="segment-icon" />
                    <span className="segment-name">Premium Tier Expansion</span>
                    <span className="segment-potential">₹{Math.round(reportData.totalRevenue * 0.45).toLocaleString()}</span>
                  </div>
                  <div className="segment-details">
                    <div className="detail-item">
                      <span className="detail-label">Target Customers:</span>
                      <span className="detail-value">{Math.round(reportData.activeCustomers * 0.35)} prospects</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Conversion Rate:</span>
                      <span className="detail-value">23.7% expected</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Timeline:</span>
                      <span className="detail-value">6-9 months</span>
                    </div>
                  </div>
                </div>

                <div className="opportunity-segment geographic">
                  <div className="segment-header">
                    <FiMapPin className="segment-icon" />
                    <span className="segment-name">Geographic Expansion</span>
                    <span className="segment-potential">₹{Math.round(reportData.totalRevenue * 0.32).toLocaleString()}</span>
                  </div>
                  <div className="segment-details">
                    <div className="detail-item">
                      <span className="detail-label">New Markets:</span>
                      <span className="detail-value">5 tier-2 cities</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Market Penetration:</span>
                      <span className="detail-value">12.4% achievable</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Investment Required:</span>
                      <span className="detail-value">₹{Math.round(reportData.totalRevenue * 0.08).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="opportunity-segment product">
                  <div className="segment-header">
                    <FiShoppingBag className="segment-icon" />
                    <span className="segment-name">Product Diversification</span>
                    <span className="segment-potential">₹{Math.round(reportData.totalRevenue * 0.28).toLocaleString()}</span>
                  </div>
                  <div className="segment-details">
                    <div className="detail-item">
                      <span className="detail-label">New Product Lines:</span>
                      <span className="detail-value">3 categories</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Cross-sell Potential:</span>
                      <span className="detail-value">67% of existing customers</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Revenue Uplift:</span>
                      <span className="detail-value">+28% per customer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="competitive-analysis">
              <h4 className="analysis-title">Competitive Positioning</h4>
              <div className="competitive-metrics">
                <div className="competitive-item">
                  <span className="competitive-label">Market Share</span>
                  <div className="competitive-bar">
                    <div className="competitive-fill our-share" style={{ width: '34%' }}></div>
                  </div>
                  <span className="competitive-value">34.2%</span>
                </div>
                <div className="competitive-item">
                  <span className="competitive-label">Price Competitiveness</span>
                  <div className="competitive-bar">
                    <div className="competitive-fill price-position" style={{ width: '78%' }}></div>
                  </div>
                  <span className="competitive-value">78% optimal</span>
                </div>
                <div className="competitive-item">
                  <span className="competitive-label">Service Quality</span>
                  <div className="competitive-bar">
                    <div className="competitive-fill quality-score" style={{ width: '91%' }}></div>
                  </div>
                  <span className="competitive-value">91% rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights Summary Panel */}
      <div className="ai-insights-panel">
        <div className="insights-header">
          <h3 className="insights-title">
            <FiZap className="insights-icon" />
            AI-Generated Strategic Insights
          </h3>
          <div className="insights-timestamp">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
        
        <div className="insights-grid">
          <div className="insight-card critical">
            <div className="insight-priority">CRITICAL</div>
            <div className="insight-content">
              <h4 className="insight-title">Immediate Revenue Opportunity</h4>
              <p className="insight-description">
                {reportData.predictiveMetrics.churnRisk.high} high-value customers showing early churn signals. 
                Immediate intervention could prevent ₹{Math.round(reportData.totalRevenue * 0.15).toLocaleString()} revenue loss.
              </p>
              <div className="insight-actions">
                <button className="insight-action-btn primary">Launch Retention Campaign</button>
                <button className="insight-action-btn secondary">View Customer List</button>
              </div>
            </div>
          </div>

          <div className="insight-card high">
            <div className="insight-priority">HIGH</div>
            <div className="insight-content">
              <h4 className="insight-title">Premium Conversion Opportunity</h4>
              <p className="insight-description">
                {Math.round(reportData.activeCustomers * 0.42)} active customers show premium upgrade potential. 
                Expected revenue impact: +₹{Math.round(reportData.totalRevenue * 0.28).toLocaleString()} annually.
              </p>
              <div className="insight-actions">
                <button className="insight-action-btn primary">Create Upgrade Campaign</button>
                <button className="insight-action-btn secondary">Analyze Segments</button>
              </div>
            </div>
          </div>

          <div className="insight-card medium">
            <div className="insight-priority">MEDIUM</div>
            <div className="insight-content">
              <h4 className="insight-title">Market Expansion Readiness</h4>
              <p className="insight-description">
                Current operational capacity supports 35% growth. Optimal timing for geographic expansion 
                to 3 new markets with projected ROI of 187%.
              </p>
              <div className="insight-actions">
                <button className="insight-action-btn primary">Plan Expansion</button>
                <button className="insight-action-btn secondary">Market Analysis</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Predictive Model Performance */}
      <div className="model-performance-panel">
        <div className="performance-header">
          <h3 className="performance-title">
            <FiActivity className="performance-icon" />
            Predictive Model Performance
          </h3>
          <div className="model-status">
            <div className="status-indicator active"></div>
            <span className="status-text">Models Active & Learning</span>
          </div>
        </div>
        
        <div className="performance-metrics">
          <div className="performance-metric">
            <div className="metric-header">
              <span className="metric-name">Customer Growth Model</span>
              <span className="metric-accuracy">94.7% Accuracy</span>
            </div>
            <div className="metric-details">
              <div className="detail-row">
                <span className="detail-label">Last 30 predictions:</span>
                <span className="detail-value">28 correct, 2 within 5% margin</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Model type:</span>
                <span className="detail-value">Ensemble (Random Forest + Neural Network)</span>
              </div>
            </div>
          </div>

          <div className="performance-metric">
            <div className="metric-header">
              <span className="metric-name">Revenue Forecasting Model</span>
              <span className="metric-accuracy">91.3% Accuracy</span>
            </div>
            <div className="metric-details">
              <div className="detail-row">
                <span className="detail-label">Prediction variance:</span>
                <span className="detail-value">±3.2% average deviation</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Model type:</span>
                <span className="detail-value">Time Series LSTM + Regression</span>
              </div>
            </div>
          </div>

          <div className="performance-metric">
            <div className="metric-header">
              <span className="metric-name">Churn Prediction Model</span>
              <span className="metric-accuracy">87.9% Accuracy</span>
            </div>
            <div className="metric-details">
              <div className="detail-row">
                <span className="detail-label">Early detection rate:</span>
                <span className="detail-value">73% at 30-day horizon</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Model type:</span>
                <span className="detail-value">Gradient Boosting + Behavioral Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Real-time KPI Dashboard
  const renderKPIDashboard = () => (
    <div className="report-kpi-dashboard">
      <div className="report-kpi-section-header">
        <h3 className="report-kpi-section-title">
          <FiBarChart2 className="report-kpi-section-icon" />
          Real-time Performance Metrics
        </h3>
      </div>
      <div className="report-kpi-grid">
        <div className="report-kpi-card report-revenue">
          <div className="report-kpi-header">
            <div className="report-kpi-icon">
              <FiDollarSign />
            </div>
            <div className="report-kpi-trend report-positive">
              <FiTrendingUp />
              +{reportData.revenueGrowth.toFixed(1)}%
            </div>
          </div>
          <div className="report-kpi-content">
            <div className="report-kpi-value">₹{reportData.totalRevenue.toLocaleString()}</div>
            <div className="report-kpi-label">Total Revenue</div>
            <div className="report-kpi-subtitle">₹{reportData.monthlyRevenue.toLocaleString()}/month avg</div>
          </div>
        </div>

        <div className="report-kpi-card report-customers">
          <div className="report-kpi-header">
            <div className="report-kpi-icon">
              <FiUsers />
            </div>
            <div className="report-kpi-trend report-positive">
              <FiTrendingUp />
              +{reportData.newCustomersThisPeriod}
            </div>
          </div>
          <div className="report-kpi-content">
            <div className="report-kpi-value">{reportData.totalCustomers.toLocaleString()}</div>
            <div className="report-kpi-label">Total Customers</div>
            <div className="report-kpi-subtitle">{reportData.newCustomersThisPeriod} new this period</div>
          </div>
        </div>

        <div className="report-kpi-card report-orders">
          <div className="report-kpi-header">
            <div className="report-kpi-icon">
              <FiShoppingBag />
            </div>
            <div className="report-kpi-trend report-positive">
              <FiTrendingUp />
              +15%
            </div>
          </div>
          <div className="report-kpi-content">
            <div className="report-kpi-value">{reportData.totalOrders.toLocaleString()}</div>
            <div className="report-kpi-label">Total Orders</div>
            <div className="report-kpi-subtitle">₹{reportData.avgOrderValue.toLocaleString()} avg value</div>
          </div>
        </div>

        <div className="report-kpi-card report-satisfaction">
          <div className="report-kpi-header">
            <div className="report-kpi-icon">
              <FiHeart />
            </div>
            <div className="report-kpi-trend report-positive">
              <FiTrendingUp />
              +0.3
            </div>
          </div>
          <div className="report-kpi-content">
            <div className="report-kpi-value">{reportData.avgRating.toFixed(1)}/5.0</div>
            <div className="report-kpi-label">Customer Satisfaction</div>
            <div className="report-kpi-subtitle">{reportData.retentionRate.toFixed(1)}% retention rate</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Behavior Analytics
  const renderBehaviorAnalytics = () => (
    <div className="report-behavior-section">
      <div className="report-section-header">
        <h3 className="report-section-title">
          <FiActivity className="report-section-icon" />
          Customer Behavior Analytics
        </h3>
        <div className="report-behavior-filters">
          <select 
            className="report-segment-filter"
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
          >
            <option value="all">All Customers</option>
            <option value="active">Active Customers</option>
            <option value="premium">Premium Customers</option>
            <option value="inactive">Inactive Customers</option>
          </select>
        </div>
      </div>

      <div className="report-behavior-cards">
        <div className="report-behavior-card">
          <div className="report-behavior-header">
            <div className="report-behavior-icon report-shopping">
              <FiShoppingBag />
            </div>
            <div className="report-behavior-trend report-positive">
              <FiTrendingUp />
              +12%
            </div>
          </div>
          <div className="report-behavior-value">{reportData.avgOrderValue.toLocaleString()}</div>
          <div className="report-behavior-label">Average Order Value</div>
          <div className="report-behavior-details">
            <div className="report-detail-item">
              <span className="report-detail-label">Peak Order Time:</span>
              <span className="report-detail-value">2:00 PM - 4:00 PM</span>
            </div>
            <div className="report-detail-item">
              <span className="report-detail-label">Preferred Category:</span>
              <span className="report-detail-value">Premium Products</span>
            </div>
          </div>
        </div>

        <div className="behavior-card enhanced">
          <div className="behavior-card-header">
            <div className="behavior-card-icon revenue">
              <FiDollarSign />
            </div>
            <div className="behavior-card-trend positive">
              <FiTrendingUp />
              +8%
            </div>
          </div>
          <div className="behavior-card-value">₹{reportData.customerLifetimeValue.toLocaleString()}</div>
          <div className="behavior-card-label">Customer Lifetime Value</div>
          <div className="behavior-card-details">
            <div className="detail-item">
              <span className="detail-label">Avg. Relationship:</span>
              <span className="detail-value">2.3 years</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Repeat Purchase Rate:</span>
              <span className="detail-value">78%</span>
            </div>
          </div>
        </div>

        <div className="behavior-card enhanced">
          <div className="behavior-card-header">
            <div className="behavior-card-icon retention">
              <FiRepeat />
            </div>
            <div className="behavior-card-trend positive">
              <FiTrendingUp />
              +5%
            </div>
          </div>
          <div className="behavior-card-value">{reportData.retentionRate.toFixed(1)}%</div>
          <div className="behavior-card-label">Customer Retention Rate</div>
          <div className="behavior-card-details">
            <div className="detail-item">
              <span className="detail-label">Churn Risk:</span>
              <span className="detail-value">{reportData.churnRate.toFixed(1)}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Loyalty Program:</span>
              <span className="detail-value">65% enrolled</span>
            </div>
          </div>
        </div>

        <div className="behavior-card enhanced">
          <div className="behavior-card-header">
            <div className="behavior-card-icon mobile">
              <FiSmartphone />
            </div>
            <div className="behavior-card-trend positive">
              <FiTrendingUp />
              +15%
            </div>
          </div>
          <div className="behavior-card-value">{reportData.engagementMetrics.appSessionDuration}</div>
          <div className="behavior-card-label">Avg. Session Duration (min)</div>
          <div className="behavior-card-details">
            <div className="detail-item">
              <span className="detail-label">Mobile Usage:</span>
              <span className="detail-value">82%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Push Notifications:</span>
              <span className="detail-value">{reportData.engagementMetrics.pushNotificationRate}%</span>
            </div>
          </div>
        </div>

        <div className="behavior-card enhanced">
          <div className="behavior-card-header">
            <div className="behavior-card-icon engagement">
              <FiMail />
            </div>
            <div className="behavior-card-trend positive">
              <FiTrendingUp />
              +7%
            </div>
          </div>
          <div className="behavior-card-value">{reportData.engagementMetrics.emailOpenRate}%</div>
          <div className="behavior-card-label">Email Open Rate</div>
          <div className="behavior-card-details">
            <div className="detail-item">
              <span className="detail-label">Click-through Rate:</span>
              <span className="detail-value">{reportData.engagementMetrics.clickThroughRate}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Social Engagement:</span>
              <span className="detail-value">{reportData.engagementMetrics.socialMediaEngagement}%</span>
            </div>
          </div>
        </div>

        <div className="behavior-card enhanced">
          <div className="behavior-card-header">
            <div className="behavior-card-icon payment">
              <FiCreditCard />
            </div>
            <div className="behavior-card-trend positive">
              <FiTrendingUp />
              +3%
            </div>
          </div>
          <div className="behavior-card-value">4.2</div>
          <div className="behavior-card-label">Avg. Payment Methods</div>
          <div className="behavior-card-details">
            <div className="detail-item">
              <span className="detail-label">Digital Payments:</span>
              <span className="detail-value">89%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Payment Success Rate:</span>
              <span className="detail-value">96.8%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Advanced Analytics Section
  const renderAdvancedAnalytics = () => (
    <div className="advanced-analytics-section">
      <div className="section-header">
        <h3>
          <FiActivity className="section-icon" />
          Advanced Business Intelligence
        </h3>
        <div className="section-actions">
          <button className="section-btn">
            <FiEye /> View Details
          </button>
        </div>
      </div>

      <div className="analytics-tab-content">
        {/* Customer Lifetime Value Analysis */}
        <div className="analytics-card clv-analysis">
          <div className="card-header">
            <h4>Customer Lifetime Value</h4>
            <div className="card-value">₹{reportData.customerLifetimeValue.toLocaleString()}</div>
          </div>
          <div className="card-content">
            <div className="clv-breakdown">
              <div className="clv-item">
                <span className="clv-label">Premium Customers:</span>
                <span className="clv-value">₹{(reportData.customerLifetimeValue * 2.1).toLocaleString()}</span>
              </div>
              <div className="clv-item">
                <span className="clv-label">Active Customers:</span>
                <span className="clv-value">₹{reportData.customerLifetimeValue.toLocaleString()}</span>
              </div>
              <div className="clv-item">
                <span className="clv-label">New Customers:</span>
                <span className="clv-value">₹{(reportData.customerLifetimeValue * 0.6).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Churn Risk Analysis */}
        <div className="analytics-card churn-analysis">
          <div className="card-header">
            <h4>Churn Risk Analysis</h4>
            <div className="card-value">{reportData.churnRate.toFixed(1)}%</div>
          </div>
          <div className="card-content">
            <div className="churn-breakdown">
              <div className="risk-item high-risk">
                <FiAlertTriangle className="risk-icon" />
                <span className="risk-label">High Risk:</span>
                <span className="risk-value">{reportData.predictiveMetrics.churnRisk.high}</span>
              </div>
              <div className="risk-item medium-risk">
                <FiActivity className="risk-icon" />
                <span className="risk-label">Medium Risk:</span>
                <span className="risk-value">{reportData.predictiveMetrics.churnRisk.medium}</span>
              </div>
              <div className="risk-item low-risk">
                <FiCheckCircle className="risk-icon" />
                <span className="risk-label">Low Risk:</span>
                <span className="risk-value">{reportData.predictiveMetrics.churnRisk.low}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Geographic Performance */}
        <div className="analytics-card geographic-analysis">
          <div className="card-header">
            <h4>Geographic Performance</h4>
            <div className="card-value">4 Regions</div>
          </div>
          <div className="card-content">
            <div className="geographic-list">
              {reportData.geographicData.map((region, index) => (
                <div key={index} className="geo-item">
                  <div className="geo-info">
                    <FiMapPin className="geo-icon" />
                    <span className="geo-name">{region.region}</span>
                  </div>
                  <div className="geo-stats">
                    <span className="geo-customers">{region.customers} customers</span>
                    <span className="geo-revenue">₹{region.revenue.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Engagement Analytics */}
        <div className="analytics-card engagement-analysis">
          <div className="card-header">
            <h4>Customer Engagement</h4>
            <div className="card-value">{reportData.engagementMetrics.emailOpenRate}%</div>
          </div>
          <div className="card-content">
            <div className="engagement-metrics">
              <div className="engagement-item">
                <FiMail className="engagement-icon" />
                <span className="engagement-label">Email Open Rate:</span>
                <span className="engagement-value">{reportData.engagementMetrics.emailOpenRate}%</span>
              </div>
              <div className="engagement-item">
                <FiMessageSquare className="engagement-icon" />
                <span className="engagement-label">Click-through Rate:</span>
                <span className="engagement-value">{reportData.engagementMetrics.clickThroughRate}%</span>
              </div>
              <div className="engagement-item">
                <FiSmartphone className="engagement-icon" />
                <span className="engagement-label">App Session:</span>
                <span className="engagement-value">{reportData.engagementMetrics.appSessionDuration} min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );



  // Enhanced Behavior Analytics with more insights
  const renderEnhancedBehaviorCards = () => (
    <div className="enhanced-behavior-section">
      <div className="section-header">
        <h3>
          <FiActivity className="section-icon" />
          Customer Behavior Analytics
        </h3>
        <div className="behavior-filters">
          <select 
            value={selectedSegment} 
            onChange={(e) => setSelectedSegment(e.target.value)}
            className="segment-filter"
          >
            <option value="all">All Customers</option>
            <option value="active">Active Only</option>
            <option value="premium">Premium Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      <div className="behavior-analytics-cards">
        <div className="behavior-card enhanced">
          <div className="behavior-card-header">
            <div className="behavior-card-icon shopping">
              <FiShoppingBag />
            </div>
            <div className="behavior-card-trend positive">
              <FiTrendingUp />
              <span>+15%</span>
            </div>
          </div>
          <div className="behavior-card-content">
            <div className="behavior-card-value">
              {Math.round(reportData.totalOrders / reportData.totalCustomers / 12 * 30)}
            </div>
            <div className="behavior-card-label">Average Orders per Month</div>
            <div className="behavior-card-details">
              <div className="detail-item">
                <span className="detail-label">Peak Day:</span>
                <span className="detail-value">Friday</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Peak Time:</span>
                <span className="detail-value">2-4 PM</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="behavior-card enhanced">
          <div className="behavior-card-header">
            <div className="behavior-card-icon revenue">
              <FiDollarSign />
            </div>
            <div className="behavior-card-trend positive">
              <FiTrendingUp />
              <span>+8%</span>
            </div>
          </div>
          <div className="behavior-card-content">
            <div className="behavior-card-value">
              ₹{Math.round(reportData.totalRevenue / reportData.totalCustomers).toLocaleString()}
            </div>
            <div className="behavior-card-label">Revenue per Customer</div>
            <div className="behavior-card-details">
              <div className="detail-item">
                <span className="detail-label">CLV:</span>
                <span className="detail-value">₹{reportData.customerLifetimeValue.toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">AOV:</span>
                <span className="detail-value">₹{reportData.avgOrderValue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="behavior-card enhanced">
          <div className="behavior-card-header">
            <div className="behavior-card-icon retention">
              <FiRepeat />
            </div>
            <div className="behavior-card-trend positive">
              <FiTrendingUp />
              <span>+5%</span>
            </div>
          </div>
          <div className="behavior-card-content">
            <div className="behavior-card-value">{reportData.retentionRate.toFixed(1)}%</div>
            <div className="behavior-card-label">Customer Retention Rate</div>
            <div className="behavior-card-details">
              <div className="detail-item">
                <span className="detail-label">Churn:</span>
                <span className="detail-value">{reportData.churnRate.toFixed(1)}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Repeat:</span>
                <span className="detail-value">64.2%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="behavior-card enhanced">
          <div className="behavior-card-header">
            <div className="behavior-card-icon mobile">
              <FiSmartphone />
            </div>
            <div className="behavior-card-trend positive">
              <FiTrendingUp />
              <span>+12%</span>
            </div>
          </div>
          <div className="behavior-card-content">
            <div className="behavior-card-value">78%</div>
            <div className="behavior-card-label">Mobile App Usage</div>
            <div className="behavior-card-details">
              <div className="detail-item">
                <span className="detail-label">iOS:</span>
                <span className="detail-value">45%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Android:</span>
                <span className="detail-value">55%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="behavior-card enhanced">
          <div className="behavior-card-header">
            <div className="behavior-card-icon engagement">
              <FiHeart />
            </div>
            <div className="behavior-card-trend positive">
              <FiTrendingUp />
              <span>+7%</span>
            </div>
          </div>
          <div className="behavior-card-content">
            <div className="behavior-card-value">{reportData.engagementMetrics.emailOpenRate}%</div>
            <div className="behavior-card-label">Email Engagement</div>
            <div className="behavior-card-details">
              <div className="detail-item">
                <span className="detail-label">CTR:</span>
                <span className="detail-value">{reportData.engagementMetrics.clickThroughRate}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Unsubscribe:</span>
                <span className="detail-value">0.8%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="behavior-card enhanced">
          <div className="behavior-card-header">
            <div className="behavior-card-icon payment">
              <FiCreditCard />
            </div>
            <div className="behavior-card-trend positive">
              <FiTrendingUp />
              <span>+2%</span>
            </div>
          </div>
          <div className="behavior-card-content">
            <div className="behavior-card-value">96.2%</div>
            <div className="behavior-card-label">Payment Success Rate</div>
            <div className="behavior-card-details">
              <div className="detail-item">
                <span className="detail-label">Card:</span>
                <span className="detail-value">78%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">UPI:</span>
                <span className="detail-value">22%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomerSegmentation = () => (
    <div className="refined-segmentation-workspace">
      {/* Clean Header Section */}
      <div className="segmentation-workspace-header">
        <div className="workspace-title-area">
          <div className="title-content">
            <h2 className="workspace-main-title">Customer Segmentation Analytics</h2>
            <p className="workspace-subtitle">Comprehensive insights into customer behavior and market segments</p>
          </div>
          <div className="workspace-controls">
            <div className="filter-controls">
              <select className="refined-select pastel-blue">
                <option value="all">All Segments</option>
                <option value="behavioral">Behavioral Analysis</option>
                <option value="demographic">Demographics</option>
                <option value="geographic">Geographic</option>
              </select>
              <select className="refined-select pastel-green">
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="6months">6 Months</option>
                <option value="1year">Annual View</option>
              </select>
            </div>
            <button className="export-action-btn pastel-orange">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Main Segmentation Grid */}
      <div className="segmentation-main-grid">
        {/* Premium Customers */}
        <div className="segment-card premium-segment soft-yellow">
          <div className="card-header-section">
            <div className="segment-icon-area">
              <div className="icon-container premium-icon">
                <FiAward />
              </div>
              <div className="segment-badge premium-badge">Premium</div>
            </div>
            <div className="trend-indicator positive">
              <span className="trend-arrow">↗</span>
              <span className="trend-percent">+18.5%</span>
            </div>
          </div>
          
          <div className="card-main-content">
            <div className="primary-metric">
              <div className="metric-number">{reportData.premiumCustomers}</div>
              <div className="metric-title">High-Value Customers</div>
              <div className="metric-subtitle">
                {((reportData.premiumCustomers/reportData.totalCustomers)*100).toFixed(1)}% of customer base
              </div>
            </div>
            

            
            <div className="premium-additional-metrics">
              <div className="premium-metric-box">
                <div className="premium-metric-icon-wrapper">
                  <FiTrendingUp />
                </div>
                <div className="premium-metric-details">
                  <span className="premium-metric-label">Avg Order Value</span>
                  <span className="premium-metric-value">₹{Math.round(reportData.avgOrderValue * 2.1).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="premium-metric-box">
                <div className="premium-metric-icon-wrapper">
                  <FiShoppingBag />
                </div>
                <div className="premium-metric-details">
                  <span className="premium-metric-label">Monthly Spend</span>
                  <span className="premium-metric-value">₹{Math.round(reportData.avgOrderValue * 8.8).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="premium-metric-box">
                <div className="premium-metric-icon-wrapper">
                  <FiClock />
                </div>
                <div className="premium-metric-details">
                  <span className="premium-metric-label">Avg Session</span>
                  <span className="premium-metric-value">18.5 min</span>
                </div>
              </div>
              
              <div className="premium-metric-box">
                <div className="premium-metric-icon-wrapper">
                  <FiUsers />
                </div>
                <div className="premium-metric-details">
                  <span className="premium-metric-label">Referrals</span>
                  <span className="premium-metric-value">3.2/customer</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card-footer-section">
            <div className="insights-summary">
              <div className="insight-row">
                <span>Revenue Share:</span>
                <strong>67.3%</strong>
              </div>
              <div className="insight-row">
                <span>Growth Potential:</span>
                <strong>High</strong>
              </div>
            </div>
            <button className="action-button premium-action">
              <FiEye />
              <span>Analyze</span>
            </button>
          </div>
        </div>

        {/* Active Customers */}
        <div className="segment-card active-segment soft-green">
          <div className="card-header-section">
            <div className="segment-icon-area">
              <div className="icon-container active-icon">
                <FiCheckCircle />
              </div>
              <div className="segment-badge active-badge">Active</div>
            </div>
            <div className="trend-indicator positive">
              <span className="trend-arrow">↗</span>
              <span className="trend-percent">+12.3%</span>
            </div>
          </div>
          
          <div className="card-main-content">
            <div className="primary-metric">
              <div className="metric-number">{reportData.activeCustomers}</div>
              <div className="metric-title">Regular Customers</div>
              <div className="metric-subtitle">
                {((reportData.activeCustomers/reportData.totalCustomers)*100).toFixed(1)}% of customer base
              </div>
            </div>
            

            
            <div className="active-additional-metrics">
              <div className="active-metric-box">
                <div className="active-metric-icon-wrapper">
                  <FiRepeat />
                </div>
                <div className="active-metric-details">
                  <span className="active-metric-label">Purchase Freq</span>
                  <span className="active-metric-value">2.8x/month</span>
                </div>
              </div>
              
              <div className="active-metric-box">
                <div className="active-metric-icon-wrapper">
                  <FiStar />
                </div>
                <div className="active-metric-details">
                  <span className="active-metric-label">Loyalty Score</span>
                  <span className="active-metric-value">7.2/10</span>
                </div>
              </div>
              
              <div className="active-metric-box">
                <div className="active-metric-icon-wrapper">
                  <FiTrendingUp />
                </div>
                <div className="active-metric-details">
                  <span className="active-metric-label">Growth Rate</span>
                  <span className="active-metric-value">+14.2%</span>
                </div>
              </div>
              
              <div className="active-metric-box">
                <div className="active-metric-icon-wrapper">
                  <FiShield />
                </div>
                <div className="active-metric-details">
                  <span className="active-metric-label">Retention</span>
                  <span className="active-metric-value">86.3%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card-footer-section">
            <div className="insights-summary">
              <div className="insight-row">
                <span>Conversion Rate:</span>
                <strong>23.7%</strong>
              </div>
              <div className="insight-row">
                <span>Upsell Potential:</span>
                <strong>Medium-High</strong>
              </div>
            </div>
            <button className="action-button active-action">
              <FiTarget />
              <span>Engage</span>
            </button>
          </div>
        </div>

        {/* At-Risk Customers */}
        <div className="segment-card risk-segment soft-red">
          <div className="card-header-section">
            <div className="segment-icon-area">
              <div className="icon-container risk-icon">
                <FiAlertTriangle />
              </div>
              <div className="segment-badge risk-badge">At Risk</div>
            </div>
            <div className="trend-indicator negative">
              <span className="trend-arrow">↘</span>
              <span className="trend-percent">-8.2%</span>
            </div>
          </div>
          
          <div className="card-main-content">
            <div className="primary-metric">
              <div className="metric-number">{reportData.predictiveMetrics.churnRisk.high + reportData.predictiveMetrics.churnRisk.medium}</div>
              <div className="metric-title">At-Risk Customers</div>
              <div className="metric-subtitle">
                {(((reportData.predictiveMetrics.churnRisk.high + reportData.predictiveMetrics.churnRisk.medium)/reportData.totalCustomers)*100).toFixed(1)}% of customer base
              </div>
            </div>
            

            
            <div className="risk-additional-metrics">
              <div className="risk-metric-box">
                <div className="risk-metric-icon-wrapper">
                  <FiBarChart2 />
                </div>
                <div className="risk-metric-details">
                  <span className="risk-metric-label">Order Decline</span>
                  <span className="risk-metric-value">-32.5%</span>
                </div>
              </div>
              
              <div className="risk-metric-box">
                <div className="risk-metric-icon-wrapper">
                  <FiActivity />
                </div>
                <div className="risk-metric-details">
                  <span className="risk-metric-label">Engagement Drop</span>
                  <span className="risk-metric-value">-18.7%</span>
                </div>
              </div>
              
              <div className="risk-metric-box">
                <div className="risk-metric-icon-wrapper">
                  <FiCalendar />
                </div>
                <div className="risk-metric-details">
                  <span className="risk-metric-label">Last Purchase</span>
                  <span className="risk-metric-value">58 days ago</span>
                </div>
              </div>
              
              <div className="risk-metric-box">
                <div className="risk-metric-icon-wrapper">
                  <FiAlertTriangle />
                </div>
                <div className="risk-metric-details">
                  <span className="risk-metric-label">Support Tickets</span>
                  <span className="risk-metric-value">3.2/month</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card-footer-section">
            <div className="insights-summary">
              <div className="insight-row">
                <span>Churn Probability:</span>
                <strong>67.3%</strong>
              </div>
              <div className="insight-row">
                <span>Recovery Rate:</span>
                <strong>43%</strong>
              </div>
            </div>
            <button className="action-button risk-action">
              <FiHeart />
              <span>Retain</span>
            </button>
          </div>
        </div>

        {/* New Customers */}
        <div className="segment-card new-segment soft-blue">
          <div className="card-header-section">
            <div className="segment-icon-area">
              <div className="icon-container new-icon">
                <FiZap />
              </div>
              <div className="segment-badge new-badge">New</div>
            </div>
            <div className="trend-indicator positive">
              <span className="trend-arrow">↗</span>
              <span className="trend-percent">+24.7%</span>
            </div>
          </div>
          
          <div className="card-main-content">
            <div className="primary-metric">
              <div className="metric-number">{reportData.newCustomersThisPeriod}</div>
              <div className="metric-title">New Customers</div>
              <div className="metric-subtitle">
                {((reportData.newCustomersThisPeriod/reportData.totalCustomers)*100).toFixed(1)}% of customer base
              </div>
            </div>
            

            
            <div className="new-additional-metrics">
              <div className="new-metric-box">
                <div className="new-metric-icon-wrapper">
                  <FiActivity />
                </div>
                <div className="new-metric-details">
                  <span className="new-metric-label">Engagement</span>
                  <span className="new-metric-value">6.8/10</span>
                </div>
              </div>
              
              <div className="new-metric-box">
                <div className="new-metric-icon-wrapper">
                  <FiClock />
                </div>
                <div className="new-metric-details">
                  <span className="new-metric-label">Time to Convert</span>
                  <span className="new-metric-value">4.2 days</span>
                </div>
              </div>
              
              <div className="new-metric-box">
                <div className="new-metric-icon-wrapper">
                  <FiStar />
                </div>
                <div className="new-metric-details">
                  <span className="new-metric-label">Satisfaction</span>
                  <span className="new-metric-value">8.1/10</span>
                </div>
              </div>
              
              <div className="new-metric-box">
                <div className="new-metric-icon-wrapper">
                  <FiTarget />
                </div>
                <div className="new-metric-details">
                  <span className="new-metric-label">Conversion Rate</span>
                  <span className="new-metric-value">78.4%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card-footer-section">
            <div className="insights-summary">
              <div className="insight-row">
                <span>Onboarding Rate:</span>
                <strong>87.3%</strong>
              </div>
              <div className="insight-row">
                <span>Conversion Potential:</span>
                <strong>High</strong>
              </div>
            </div>
            <button className="action-button new-action">
              <FiUsers />
              <span>Onboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Analysis Panels */}
      <div className="secondary-analysis-section">
        {/* Behavioral Analysis */}
        <div className="analysis-panel behavioral-panel soft-mint">
          <div className="panel-header-clean">
            <div className="panel-title-area">
              <div className="panel-icon-simple">
                <FiActivity />
              </div>
              <div className="panel-text">
                <h3 className="panel-title-clean">Behavioral Patterns</h3>
                <p className="panel-desc">Customer behavior and engagement analysis</p>
              </div>
            </div>
            <div className="panel-tabs">
              <button className="tab-btn active">Purchase</button>
              <button className="tab-btn">Engagement</button>
              <button className="tab-btn">Usage</button>
            </div>
          </div>
          
          <div className="behavior-segments-clean">
            <div className="behavior-item frequent">
              <div className="behavior-header">
                <div className="behavior-icon-simple">
                  <FiRepeat />
                </div>
                <div className="behavior-info">
                  <h4>Frequent Buyers</h4>
                  <span className="behavior-count">{Math.round(reportData.activeCustomers * 0.35)}</span>
                </div>
              </div>
              <div className="behavior-stats">
                <div className="stat-item">
                  <span className="stat-label">AOV</span>
                  <span className="stat-value">₹{Math.round(reportData.avgOrderValue * 1.4).toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Retention</span>
                  <span className="stat-value">92%</span>
                </div>
              </div>
            </div>
            
            <div className="behavior-item occasional">
              <div className="behavior-header">
                <div className="behavior-icon-simple">
                  <FiShoppingBag />
                </div>
                <div className="behavior-info">
                  <h4>Occasional Buyers</h4>
                  <span className="behavior-count">{Math.round(reportData.activeCustomers * 0.45)}</span>
                </div>
              </div>
              <div className="behavior-stats">
                <div className="stat-item">
                  <span className="stat-label">AOV</span>
                  <span className="stat-value">₹{Math.round(reportData.avgOrderValue).toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Retention</span>
                  <span className="stat-value">76%</span>
                </div>
              </div>
            </div>
            
            <div className="behavior-item browsers">
              <div className="behavior-header">
                <div className="behavior-icon-simple">
                  <FiEye />
                </div>
                <div className="behavior-info">
                  <h4>Browsers</h4>
                  <span className="behavior-count">{Math.round(reportData.totalCustomers * 0.25)}</span>
                </div>
              </div>
              <div className="behavior-stats">
                <div className="stat-item">
                  <span className="stat-label">Sessions</span>
                  <span className="stat-value">8.5/mo</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Conversion</span>
                  <span className="stat-value">12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Geographic Analysis */}
        <div className="analysis-panel geographic-panel soft-lavender">
          <div className="panel-header-clean">
            <div className="panel-title-area">
              <div className="panel-icon-simple">
                <FiMapPin />
              </div>
              <div className="panel-text">
                <h3 className="panel-title-clean">Geographic Distribution</h3>
                <p className="panel-desc">Regional performance and market penetration</p>
              </div>
            </div>
            <div className="panel-tabs">
              <button className="tab-btn active">Revenue</button>
              <button className="tab-btn">Growth</button>
              <button className="tab-btn">Potential</button>
            </div>
          </div>
          
          <div className="geographic-segments-clean">
            {reportData.geographicData.map((region, index) => (
              <div key={region.region} className="geographic-item">
                <div className="geo-header">
                  <div className="geo-name">{region.region}</div>
                  <div className="geo-rank">#{index + 1}</div>
                </div>
                <div className="geo-metrics-clean">
                  <div className="geo-stat">
                    <FiUsers className="geo-icon" />
                    <div className="geo-data">
                      <span className="geo-value">{region.customers}</span>
                      <span className="geo-label">Customers</span>
                    </div>
                  </div>
                  <div className="geo-stat">
                    <FiDollarSign className="geo-icon" />
                    <div className="geo-data">
                      <span className="geo-value">₹{Math.round(region.revenue/1000)}K</span>
                      <span className="geo-label">Revenue</span>
                    </div>
                  </div>
                  <div className="geo-stat">
                    <FiTrendingUp className="geo-icon" />
                    <div className="geo-data">
                      <span className="geo-value">+{(12 + index * 3).toFixed(1)}%</span>
                      <span className="geo-label">Growth</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="insights-recommendations-panel soft-rose">
        <div className="insights-header-clean">
          <div className="insights-title-area">
            <div className="insights-icon-simple">
              <FiTarget />
            </div>
            <div className="insights-text">
              <h3 className="insights-title-clean">Strategic Insights & Recommendations</h3>
              <p className="insights-desc">AI-powered recommendations based on segmentation analysis</p>
            </div>
          </div>
        </div>
        
        <div className="recommendations-grid">
          <div className="recommendation-card high-impact">
            <div className="rec-header">
              <div className="priority-badge high">HIGH IMPACT</div>
              <div className="impact-value">+₹{Math.round(reportData.totalRevenue * 0.15).toLocaleString()}</div>
            </div>
            <div className="rec-content">
              <h4>Premium Customer Expansion</h4>
              <p>{Math.round(reportData.activeCustomers * 0.4)} active customers show premium upgrade potential based on behavior patterns.</p>
              <div className="rec-actions">
                <button className="primary-rec-btn">Launch Campaign</button>
                <button className="secondary-rec-btn">View Targets</button>
              </div>
            </div>
          </div>

          <div className="recommendation-card medium-impact">
            <div className="rec-header">
              <div className="priority-badge medium">MEDIUM IMPACT</div>
              <div className="impact-value">+{Math.round(reportData.predictiveMetrics.churnRisk.medium * 0.6)} retained</div>
            </div>
            <div className="rec-content">
              <h4>At-Risk Customer Recovery</h4>
              <p>Implement retention campaigns for {reportData.predictiveMetrics.churnRisk.medium} medium-risk customers.</p>
              <div className="rec-actions">
                <button className="primary-rec-btn">Start Retention</button>
                <button className="secondary-rec-btn">Analyze Risks</button>
              </div>
            </div>
          </div>

          <div className="recommendation-card optimization">
            <div className="rec-header">
              <div className="priority-badge optimize">OPTIMIZATION</div>
              <div className="impact-value">+12% conversion</div>
            </div>
            <div className="rec-content">
              <h4>New Customer Onboarding</h4>
              <p>Optimize onboarding flow for {reportData.newCustomersThisPeriod} new customers to improve conversion.</p>
              <div className="rec-actions">
                <button className="primary-rec-btn">Optimize Flow</button>
                <button className="secondary-rec-btn">A/B Test</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderKeyMetrics = () => (
    <div className="metrics-section">
      <div className="section-header">
        <FiTrendingUp className="section-icon" />
        <h4>Key Performance Metrics</h4>
      </div>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-icon">📊</span>
            <h5>Customer Acquisition</h5>
          </div>
          <div className="metric-content">
            <div className="metric-row">
              <span className="metric-label">New Customers (30d):</span>
              <span className="metric-value">
                {Math.round(reportData.totalCustomers * 0.15)}
              </span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Signup to First Order:</span>
              <span className="metric-value">2.3 days</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Acquisition Cost:</span>
              <span className="metric-value">
                ₹{Math.round(reportData.totalRevenue * 0.08 / reportData.totalCustomers).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-icon">🔄</span>
            <h5>Engagement</h5>
          </div>
          <div className="metric-content">
            <div className="metric-row">
              <span className="metric-label">Monthly Active Users:</span>
              <span className="metric-value positive">
                {Math.round(reportData.activeCustomers * 0.85)}
              </span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Avg Session Duration:</span>
              <span className="metric-value">12.3 min</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Feature Adoption:</span>
              <span className="metric-value positive">72.4%</span>
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-icon">💰</span>
            <h5>Revenue</h5>
          </div>
          <div className="metric-content">
            <div className="metric-row">
              <span className="metric-label">Monthly Revenue:</span>
              <span className="metric-value">
                ₹{Math.round(reportData.totalRevenue / 12).toLocaleString()}
              </span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Avg Order Value:</span>
              <span className="metric-value">
                ₹{Math.round(reportData.avgOrderValue || 0).toLocaleString()}
              </span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Customer Lifetime Value:</span>
              <span className="metric-value">
                ₹{Math.round(reportData.avgOrderValue * 6.5).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-icon">🏆</span>
            <h5>Retention</h5>
          </div>
          <div className="metric-content">
            <div className="metric-row">
              <span className="metric-label">12-Month Retention:</span>
              <span className="metric-value positive">73.8%</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Repeat Purchase Rate:</span>
              <span className="metric-value positive">64.2%</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Churn Rate:</span>
              <span className="metric-value warning">4.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomerJourney = () => (
    <div className="enhanced-journey-section">
      {/* Journey Header */}
      <div className="journey-header">
        <div className="journey-title-area">
          <div className="journey-icon-wrapper">
            <FiClock className="journey-main-icon" />
          </div>
          <div className="journey-title-content">
            <h2 className="journey-main-title">Customer Journey Analytics</h2>
            <p className="journey-subtitle">Complete lifecycle analysis from acquisition to advocacy</p>
          </div>
        </div>
        <div className="journey-controls">
          <select className="journey-filter">
            <option value="all">All Customers</option>
            <option value="new">New Customers</option>
            <option value="returning">Returning Customers</option>
            <option value="premium">Premium Customers</option>
          </select>
          <select className="journey-timeframe">
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Journey Overview Stats */}
      <div className="journey-overview-stats">
        <div className="journey-stat-card total-customers">
          <div className="stat-icon-wrapper">
            <FiUsers className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{reportData.totalCustomers.toLocaleString()}</div>
            <div className="stat-label">Total Customers</div>
            <div className="stat-change positive">+12.5% vs last period</div>
          </div>
        </div>
        
        <div className="journey-stat-card avg-journey-time">
          <div className="stat-icon-wrapper">
            <FiClock className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">18.4 days</div>
            <div className="stat-label">Avg Journey Time</div>
            <div className="stat-change negative">-2.1 days vs last period</div>
          </div>
        </div>
        
        <div className="journey-stat-card conversion-rate">
          <div className="stat-icon-wrapper">
            <FiTarget className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">78.5%</div>
            <div className="stat-label">Overall Conversion</div>
            <div className="stat-change positive">+5.2% vs last period</div>
          </div>
        </div>
        
        <div className="journey-stat-card customer-value">
          <div className="stat-icon-wrapper">
            <FiDollarSign className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">₹{Math.round(reportData.customerLifetimeValue).toLocaleString()}</div>
            <div className="stat-label">Avg Customer Value</div>
            <div className="stat-change positive">+8.7% vs last period</div>
          </div>
        </div>
      </div>

      {/* Enhanced Journey Flow */}
      <div className="journey-flow-container">
        <div className="journey-flow-header">
          <h3 className="flow-title">Customer Journey Flow</h3>
          <p className="flow-subtitle">Interactive visualization of customer progression through each stage</p>
        </div>
        
        <div className="journey-flow">
          {/* Stage 1: Awareness */}
          <div className="journey-stage awareness">
            <div className="stage-header">
              <div className="stage-icon-wrapper awareness-icon">
                <FiEye className="stage-icon" />
              </div>
              <div className="stage-title">Awareness</div>
              <div className="stage-subtitle">Discovery & Interest</div>
            </div>
            <div className="stage-metrics">
              <div className="metric-item">
                <span className="metric-label">Website Visitors</span>
                <span className="metric-value">{Math.round(reportData.totalCustomers * 4.2).toLocaleString()}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Social Media Reach</span>
                <span className="metric-value">{Math.round(reportData.totalCustomers * 2.8).toLocaleString()}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Ad Impressions</span>
                <span className="metric-value">{Math.round(reportData.totalCustomers * 12.5).toLocaleString()}</span>
              </div>
            </div>
            <div className="stage-conversion">
              <div className="conversion-rate">24.3% → Interest</div>
              <div className="conversion-bar">
                <div className="conversion-fill" style={{width: '24.3%'}}></div>
              </div>
            </div>
          </div>

          {/* Flow Arrow */}
          <div className="journey-arrow">
            <FiChevronRight className="arrow-icon" />
          </div>

          {/* Stage 2: Interest */}
          <div className="journey-stage interest">
            <div className="stage-header">
              <div className="stage-icon-wrapper interest-icon">
                <FiHeart className="stage-icon" />
              </div>
              <div className="stage-title">Interest</div>
              <div className="stage-subtitle">Engagement & Consideration</div>
            </div>
            <div className="stage-metrics">
              <div className="metric-item">
                <span className="metric-label">Email Signups</span>
                <span className="metric-value">{Math.round(reportData.totalCustomers * 1.8).toLocaleString()}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Product Views</span>
                <span className="metric-value">{Math.round(reportData.totalCustomers * 3.2).toLocaleString()}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Wishlist Adds</span>
                <span className="metric-value">{Math.round(reportData.totalCustomers * 0.9).toLocaleString()}</span>
              </div>
            </div>
            <div className="stage-conversion">
              <div className="conversion-rate">67.8% → Purchase</div>
              <div className="conversion-bar">
                <div className="conversion-fill" style={{width: '67.8%'}}></div>
              </div>
            </div>
          </div>

          {/* Flow Arrow */}
          <div className="journey-arrow">
            <FiChevronRight className="arrow-icon" />
          </div>

          {/* Stage 3: Purchase */}
          <div className="journey-stage purchase">
            <div className="stage-header">
              <div className="stage-icon-wrapper purchase-icon">
                <FiShoppingBag className="stage-icon" />
              </div>
              <div className="stage-title">First Purchase</div>
              <div className="stage-subtitle">Conversion & Onboarding</div>
            </div>
            <div className="stage-metrics">
              <div className="metric-item">
                <span className="metric-label">New Customers</span>
                <span className="metric-value">{Math.round(reportData.totalCustomers * 0.15).toLocaleString()}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Avg Order Value</span>
                <span className="metric-value">₹{Math.round(reportData.avgOrderValue).toLocaleString()}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Time to Purchase</span>
                <span className="metric-value">2.3 days</span>
              </div>
            </div>
            <div className="stage-conversion">
              <div className="conversion-rate">64.2% → Repeat</div>
              <div className="conversion-bar">
                <div className="conversion-fill" style={{width: '64.2%'}}></div>
              </div>
            </div>
          </div>

          {/* Flow Arrow */}
          <div className="journey-arrow">
            <FiChevronRight className="arrow-icon" />
          </div>

          {/* Stage 4: Retention */}
          <div className="journey-stage retention">
            <div className="stage-header">
              <div className="stage-icon-wrapper retention-icon">
                <FiRepeat className="stage-icon" />
              </div>
              <div className="stage-title">Retention</div>
              <div className="stage-subtitle">Repeat Purchases & Loyalty</div>
            </div>
            <div className="stage-metrics">
              <div className="metric-item">
                <span className="metric-label">Repeat Customers</span>
                <span className="metric-value">{Math.round(reportData.activeCustomers * 0.642).toLocaleString()}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Avg Repeat Orders</span>
                <span className="metric-value">3.8</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Retention Rate</span>
                <span className="metric-value">{reportData.retentionRate.toFixed(1)}%</span>
              </div>
            </div>
            <div className="stage-conversion">
              <div className="conversion-rate">42.8% → Loyalty</div>
              <div className="conversion-bar">
                <div className="conversion-fill" style={{width: '42.8%'}}></div>
              </div>
            </div>
          </div>

          {/* Flow Arrow */}
          <div className="journey-arrow">
            <FiChevronRight className="arrow-icon" />
          </div>

          {/* Stage 5: Advocacy */}
          <div className="journey-stage advocacy">
            <div className="stage-header">
              <div className="stage-icon-wrapper advocacy-icon">
                <FiAward className="stage-icon" />
              </div>
              <div className="stage-title">Advocacy</div>
              <div className="stage-subtitle">Referrals & Brand Ambassadors</div>
            </div>
            <div className="stage-metrics">
              <div className="metric-item">
                <span className="metric-label">Brand Advocates</span>
                <span className="metric-value">{Math.round(reportData.totalCustomers * 0.284).toLocaleString()}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Referral Rate</span>
                <span className="metric-value">28.4%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">NPS Score</span>
                <span className="metric-value">68</span>
              </div>
            </div>
            <div className="stage-conversion">
              <div className="conversion-rate">91.3% Satisfaction</div>
              <div className="conversion-bar">
                <div className="conversion-fill" style={{width: '91.3%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Insights */}
      <div className="journey-insights">
        <div className="insights-header">
          <h3 className="insights-title">Journey Insights & Optimization</h3>
          <p className="insights-subtitle">Key findings and recommendations for improving customer experience</p>
        </div>
        
        <div className="insights-grid">
          <div className="insight-card critical-insight">
            <div className="insight-header">
              <div className="insight-icon critical">
                <FiAlertTriangle />
              </div>
              <div className="insight-priority">CRITICAL</div>
            </div>
            <div className="insight-content">
              <h4 className="insight-title">Interest to Purchase Drop-off</h4>
              <p className="insight-description">
                32.2% of interested customers don't complete their first purchase. 
                Main barriers: complex checkout process and limited payment options.
              </p>
              <div className="insight-metrics">
                <div className="metric">
                  <span className="metric-label">Potential Revenue Impact:</span>
                  <span className="metric-value">+₹{Math.round(reportData.totalRevenue * 0.18).toLocaleString()}</span>
                </div>
              </div>
              <div className="insight-actions">
                <button className="insight-action-btn primary">Optimize Checkout</button>
                <button className="insight-action-btn secondary">View Details</button>
              </div>
            </div>
          </div>

          <div className="insight-card high-insight">
            <div className="insight-header">
              <div className="insight-icon high">
                <FiTrendingUp />
              </div>
              <div className="insight-priority">HIGH IMPACT</div>
            </div>
            <div className="insight-content">
              <h4 className="insight-title">Retention Opportunity</h4>
              <p className="insight-description">
                Customers who make a second purchase within 30 days have 85% higher lifetime value. 
                Current 30-day repeat rate: 64.2%.
              </p>
              <div className="insight-metrics">
                <div className="metric">
                  <span className="metric-label">Target Improvement:</span>
                  <span className="metric-value">+15% repeat rate</span>
                </div>
              </div>
              <div className="insight-actions">
                <button className="insight-action-btn primary">Launch Retention Campaign</button>
                <button className="insight-action-btn secondary">Analyze Patterns</button>
              </div>
            </div>
          </div>

          <div className="insight-card medium-insight">
            <div className="insight-header">
              <div className="insight-icon medium">
                <FiUsers />
              </div>
              <div className="insight-priority">MEDIUM</div>
            </div>
            <div className="insight-content">
              <h4 className="insight-title">Advocacy Program Expansion</h4>
              <p className="insight-description">
                Current advocates generate 3.2x more referrals than average. 
                Opportunity to expand advocacy program to increase referral rate.
              </p>
              <div className="insight-metrics">
                <div className="metric">
                  <span className="metric-label">Potential New Advocates:</span>
                  <span className="metric-value">{Math.round(reportData.activeCustomers * 0.23).toLocaleString()}</span>
                </div>
              </div>
              <div className="insight-actions">
                <button className="insight-action-btn primary">Expand Program</button>
                <button className="insight-action-btn secondary">Identify Candidates</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Performance Metrics */}
      <div className="journey-performance">
        <div className="performance-header">
          <h3 className="performance-title">Journey Performance Metrics</h3>
          <div className="performance-controls">
            <button className="performance-btn active">Overview</button>
            <button className="performance-btn">Detailed</button>
            <button className="performance-btn">Comparison</button>
          </div>
        </div>
        
        <div className="performance-grid">
          <div className="performance-card acquisition-performance">
            <div className="performance-card-header">
              <h4>Acquisition Performance</h4>
              <div className="performance-trend positive">
                <FiTrendingUp />
                <span>+12.5%</span>
              </div>
            </div>
            <div className="performance-metrics">
              <div className="performance-metric">
                <span className="metric-label">Cost per Acquisition:</span>
                <span className="metric-value">₹{Math.round(reportData.totalRevenue * 0.08 / reportData.totalCustomers)}</span>
              </div>
              <div className="performance-metric">
                <span className="metric-label">Conversion Rate:</span>
                <span className="metric-value">24.3%</span>
              </div>
              <div className="performance-metric">
                <span className="metric-label">Time to Interest:</span>
                <span className="metric-value">1.2 days</span>
              </div>
            </div>
          </div>

          <div className="performance-card engagement-performance">
            <div className="performance-card-header">
              <h4>Engagement Performance</h4>
              <div className="performance-trend positive">
                <FiTrendingUp />
                <span>+8.7%</span>
              </div>
            </div>
            <div className="performance-metrics">
              <div className="performance-metric">
                <span className="metric-label">Email Open Rate:</span>
                <span className="metric-value">{reportData.engagementMetrics.emailOpenRate}%</span>
              </div>
              <div className="performance-metric">
                <span className="metric-label">Click-through Rate:</span>
                <span className="metric-value">{reportData.engagementMetrics.clickThroughRate}%</span>
              </div>
              <div className="performance-metric">
                <span className="metric-label">App Session Duration:</span>
                <span className="metric-value">{reportData.engagementMetrics.appSessionDuration} min</span>
              </div>
            </div>
          </div>

          <div className="performance-card retention-performance">
            <div className="performance-card-header">
              <h4>Retention Performance</h4>
              <div className="performance-trend positive">
                <FiTrendingUp />
                <span>+5.2%</span>
              </div>
            </div>
            <div className="performance-metrics">
              <div className="performance-metric">
                <span className="metric-label">12-Month Retention:</span>
                <span className="metric-value">{reportData.retentionRate.toFixed(1)}%</span>
              </div>
              <div className="performance-metric">
                <span className="metric-label">Churn Rate:</span>
                <span className="metric-value">{reportData.churnRate.toFixed(1)}%</span>
              </div>
              <div className="performance-metric">
                <span className="metric-label">Repeat Purchase Rate:</span>
                <span className="metric-value">64.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeedback = () => (
    <div className="enhanced-feedback-satisfaction-section">
      {/* Enhanced Header with Real-time Stats */}
      <div className="feedback-section-header">
        <div className="header-content">
          <div className="title-section">
            <h2 className="feedback-main-title">
              <FiStar className="title-icon" />
              Customer Feedback & Satisfaction Analytics
            </h2>
            <p className="feedback-subtitle">
              Comprehensive insights into customer sentiment, reviews, and satisfaction metrics
            </p>
          </div>
          <div className="header-controls">
            <div className="satisfaction-score-badge">
              <div className="score-circle">
                <span className="score-value">{(reportData.avgRating * 20).toFixed(0)}</span>
                <span className="score-label">CSAT</span>
              </div>
            </div>
            <div className="time-filter-controls">
              <select className="time-filter-select">
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="1year">Last Year</option>
              </select>
              <button className="refresh-feedback-btn">
                <FiRepeat className="btn-icon" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced KPI Dashboard */}
      <div className="feedback-kpi-dashboard">
        <div className="kpi-card overall-satisfaction">
          <div className="kpi-header">
            <div className="kpi-icon-wrapper satisfaction-icon">
              <FiHeart className="kpi-icon" />
            </div>
            <div className="kpi-trend positive">
              <FiTrendingUp className="trend-icon" />
              <span>+2.3%</span>
            </div>
          </div>
          <div className="kpi-content">
            <div className="kpi-main-value">{reportData.avgRating.toFixed(1)}/5.0</div>
            <div className="kpi-label">Overall Satisfaction</div>
            <div className="kpi-subtitle">Based on {(reportData.totalCustomers * 0.73).toFixed(0)} reviews</div>
            <div className="satisfaction-stars">
              {[1, 2, 3, 4, 5].map(star => (
                <FiStar 
                  key={star} 
                  className={`star ${star <= Math.round(reportData.avgRating) ? 'filled' : 'empty'}`} 
                />
              ))}
            </div>
          </div>
        </div>

        <div className="kpi-card nps-score">
          <div className="kpi-header">
            <div className="kpi-icon-wrapper nps-icon">
              <FiTarget className="kpi-icon" />
            </div>
            <div className="kpi-trend positive">
              <FiTrendingUp className="trend-icon" />
              <span>+8.7</span>
            </div>
          </div>
          <div className="kpi-content">
            <div className="kpi-main-value">68</div>
            <div className="kpi-label">Net Promoter Score</div>
            <div className="kpi-subtitle">Industry benchmark: 52</div>
            <div className="nps-breakdown">
              <div className="nps-segment promoters">
                <span className="segment-label">Promoters</span>
                <span className="segment-value">42%</span>
              </div>
              <div className="nps-segment passives">
                <span className="segment-label">Passives</span>
                <span className="segment-value">34%</span>
              </div>
              <div className="nps-segment detractors">
                <span className="segment-label">Detractors</span>
                <span className="segment-value">24%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="kpi-card response-rate">
          <div className="kpi-header">
            <div className="kpi-icon-wrapper response-icon">
              <FiMessageSquare className="kpi-icon" />
            </div>
            <div className="kpi-trend positive">
              <FiTrendingUp className="trend-icon" />
              <span>+5.2%</span>
            </div>
          </div>
          <div className="kpi-content">
            <div className="kpi-main-value">92.1%</div>
            <div className="kpi-label">Response Rate</div>
            <div className="kpi-subtitle">Survey participation</div>
            <div className="response-channels">
              <div className="channel-item">
                <span className="channel-label">Email</span>
                <span className="channel-value">89%</span>
              </div>
              <div className="channel-item">
                <span className="channel-label">SMS</span>
                <span className="channel-value">95%</span>
              </div>
              <div className="channel-item">
                <span className="channel-label">App</span>
                <span className="channel-value">97%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="kpi-card resolution-time">
          <div className="kpi-header">
            <div className="kpi-icon-wrapper resolution-icon">
              <FiClock className="kpi-icon" />
            </div>
            <div className="kpi-trend negative">
              <FiTrendingUp className="trend-icon" />
              <span>-18min</span>
            </div>
          </div>
          <div className="kpi-content">
            <div className="kpi-main-value">2.4h</div>
            <div className="kpi-label">Avg Resolution Time</div>
            <div className="kpi-subtitle">Issue response time</div>
            <div className="resolution-breakdown">
              <div className="resolution-item">
                <span className="resolution-label">Critical</span>
                <span className="resolution-value">45min</span>
              </div>
              <div className="resolution-item">
                <span className="resolution-label">Standard</span>
                <span className="resolution-value">2.4h</span>
              </div>
              <div className="resolution-item">
                <span className="resolution-label">Low Priority</span>
                <span className="resolution-value">8.2h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Distribution Analysis */}
      <div className="rating-distribution-section">
        <div className="section-title">
          <h3>Rating Distribution Analysis</h3>
          <p>Detailed breakdown of customer ratings and sentiment analysis</p>
        </div>
        
        <div className="rating-distribution-grid">
          <div className="rating-chart-container">
            <div className="chart-header">
              <h4>Rating Breakdown</h4>
              <div className="chart-total">Total: {(reportData.totalCustomers * 0.73).toFixed(0)} reviews</div>
            </div>
            <div className="rating-bars">
              {[5, 4, 3, 2, 1].map(rating => {
                const percentage = rating === 5 ? 45 : rating === 4 ? 32 : rating === 3 ? 15 : rating === 2 ? 5 : 3;
                const count = Math.round((reportData.totalCustomers * 0.73 * percentage) / 100);
                return (
                  <div key={rating} className="rating-bar-item">
                    <div className="rating-info">
                      <div className="rating-stars">
                        {[1, 2, 3, 4, 5].map(star => (
                          <FiStar key={star} className={star <= rating ? 'star filled' : 'star empty'} />
                        ))}
                      </div>
                      <span className="rating-count">({count})</span>
                    </div>
                    <div className="rating-bar">
                      <div 
                        className={`rating-fill rating-${rating}`} 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="rating-percentage">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sentiment-analysis-container">
            <div className="sentiment-header">
              <h4>Sentiment Analysis</h4>
              <div className="sentiment-score">
                <span className="sentiment-value positive">87.3%</span>
                <span className="sentiment-label">Positive Sentiment</span>
              </div>
            </div>
            <div className="sentiment-breakdown">
              <div className="sentiment-item positive">
                <div className="sentiment-icon">😊</div>
                <div className="sentiment-details">
                  <span className="sentiment-type">Positive</span>
                  <span className="sentiment-percent">87.3%</span>
                  <div className="sentiment-bar">
                    <div className="sentiment-fill positive" style={{ width: '87.3%' }}></div>
                  </div>
                </div>
              </div>
              <div className="sentiment-item neutral">
                <div className="sentiment-icon">😐</div>
                <div className="sentiment-details">
                  <span className="sentiment-type">Neutral</span>
                  <span className="sentiment-percent">8.9%</span>
                  <div className="sentiment-bar">
                    <div className="sentiment-fill neutral" style={{ width: '8.9%' }}></div>
                  </div>
                </div>
              </div>
              <div className="sentiment-item negative">
                <div className="sentiment-icon">😞</div>
                <div className="sentiment-details">
                  <span className="sentiment-type">Negative</span>
                  <span className="sentiment-percent">3.8%</span>
                  <div className="sentiment-bar">
                    <div className="sentiment-fill negative" style={{ width: '3.8%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Categories & Topics */}
      <div className="feedback-categories-section">
        <div className="section-title">
          <h3>Feedback Categories & Key Topics</h3>
          <p>Most discussed topics and categorized feedback analysis</p>
        </div>
        
        <div className="categories-grid">
          <div className="category-card product-quality">
            <div className="category-header">
              <div className="category-icon">
                <FiAward className="icon" />
              </div>
              <div className="category-info">
                <h4>Product Quality</h4>
                <span className="category-mentions">1,247 mentions</span>
              </div>
              <div className="category-sentiment positive">
                <span className="sentiment-score">94.2%</span>
                <span className="sentiment-label">Positive</span>
              </div>
            </div>
            <div className="category-content">
              <div className="top-keywords">
                <div className="keyword-item positive">
                  <span className="keyword">Excellent Quality</span>
                  <span className="keyword-count">342</span>
                </div>
                <div className="keyword-item positive">
                  <span className="keyword">Fresh Products</span>
                  <span className="keyword-count">289</span>
                </div>
                <div className="keyword-item positive">
                  <span className="keyword">Premium Grade</span>
                  <span className="keyword-count">156</span>
                </div>
              </div>
              <div className="category-trend">
                <FiTrendingUp className="trend-icon positive" />
                <span className="trend-text">+12% improvement this month</span>
              </div>
            </div>
          </div>

          <div className="category-card delivery-service">
            <div className="category-header">
              <div className="category-icon">
                <FiZap className="icon" />
              </div>
              <div className="category-info">
                <h4>Delivery & Service</h4>
                <span className="category-mentions">892 mentions</span>
              </div>
              <div className="category-sentiment mixed">
                <span className="sentiment-score">78.5%</span>
                <span className="sentiment-label">Mixed</span>
              </div>
            </div>
            <div className="category-content">
              <div className="top-keywords">
                <div className="keyword-item positive">
                  <span className="keyword">Fast Delivery</span>
                  <span className="keyword-count">234</span>
                </div>
                <div className="keyword-item negative">
                  <span className="keyword">Late Delivery</span>
                  <span className="keyword-count">156</span>
                </div>
                <div className="keyword-item positive">
                  <span className="keyword">Helpful Staff</span>
                  <span className="keyword-count">198</span>
                </div>
              </div>
              <div className="category-trend">
                <FiTrendingUp className="trend-icon positive" />
                <span className="trend-text">+5% improvement this month</span>
              </div>
            </div>
          </div>

          <div className="category-card customer-support">
            <div className="category-header">
              <div className="category-icon">
                <FiPhone className="icon" />
              </div>
              <div className="category-info">
                <h4>Customer Support</h4>
                <span className="category-mentions">567 mentions</span>
              </div>
              <div className="category-sentiment positive">
                <span className="sentiment-score">91.8%</span>
                <span className="sentiment-label">Positive</span>
              </div>
            </div>
            <div className="category-content">
              <div className="top-keywords">
                <div className="keyword-item positive">
                  <span className="keyword">Helpful Support</span>
                  <span className="keyword-count">189</span>
                </div>
                <div className="keyword-item positive">
                  <span className="keyword">Quick Response</span>
                  <span className="keyword-count">145</span>
                </div>
                <div className="keyword-item positive">
                  <span className="keyword">Professional</span>
                  <span className="keyword-count">123</span>
                </div>
              </div>
              <div className="category-trend">
                <FiTrendingUp className="trend-icon positive" />
                <span className="trend-text">+8% improvement this month</span>
              </div>
            </div>
          </div>

          <div className="category-card pricing-value">
            <div className="category-header">
              <div className="category-icon">
                <FiDollarSign className="icon" />
              </div>
              <div className="category-info">
                <h4>Pricing & Value</h4>
                <span className="category-mentions">423 mentions</span>
              </div>
              <div className="category-sentiment mixed">
                <span className="sentiment-score">72.1%</span>
                <span className="sentiment-label">Mixed</span>
              </div>
            </div>
            <div className="category-content">
              <div className="top-keywords">
                <div className="keyword-item positive">
                  <span className="keyword">Good Value</span>
                  <span className="keyword-count">134</span>
                </div>
                <div className="keyword-item negative">
                  <span className="keyword">Expensive</span>
                  <span className="keyword-count">89</span>
                </div>
                <div className="keyword-item positive">
                  <span className="keyword">Fair Price</span>
                  <span className="keyword-count">112</span>
                </div>
              </div>
              <div className="category-trend">
                <FiTrendingUp className="trend-icon negative" />
                <span className="trend-text">-2% decline this month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reviews & Testimonials */}
      <div className="recent-reviews-section">
        <div className="section-title">
          <h3>Recent Reviews & Customer Testimonials</h3>
          <p>Latest customer feedback and detailed reviews</p>
        </div>
        
        <div className="reviews-container">
          <div className="review-filters">
            <button className="filter-btn active">All Reviews</button>
            <button className="filter-btn">5 Stars</button>
            <button className="filter-btn">4 Stars</button>
            <button className="filter-btn">Critical</button>
            <button className="filter-btn">Recent</button>
          </div>
          
          <div className="reviews-grid">
            {[
              {
                id: 1,
                customer: "Rajesh Kumar",
                rating: 5,
                date: "2 hours ago",
                review: "Exceptional service! The milk quality is outstanding and delivery is always on time. The customer support team is very responsive and helpful.",
                category: "Product Quality",
                verified: true,
                helpful: 12
              },
              {
                id: 2,
                customer: "Priya Sharma",
                rating: 4,
                date: "1 day ago",
                review: "Good quality products and reasonable prices. Sometimes delivery gets delayed but overall satisfied with the service.",
                category: "Delivery Service",
                verified: true,
                helpful: 8
              },
              {
                id: 3,
                customer: "Amit Patel",
                rating: 5,
                date: "2 days ago",
                review: "Been using their service for 6 months now. Consistent quality and excellent customer service. Highly recommended!",
                category: "Overall Experience",
                verified: true,
                helpful: 15
              },
              {
                id: 4,
                customer: "Sunita Devi",
                rating: 3,
                date: "3 days ago",
                review: "Product quality is good but pricing could be more competitive. Also, would like more variety in products.",
                category: "Pricing & Value",
                verified: true,
                helpful: 5
              }
            ].map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.customer.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="reviewer-details">
                      <div className="reviewer-name">
                        {review.customer}
                        {review.verified && <FiCheckCircle className="verified-badge" />}
                      </div>
                      <div className="review-meta">
                        <div className="review-rating">
                          {[1, 2, 3, 4, 5].map(star => (
                            <FiStar key={star} className={star <= review.rating ? 'star filled' : 'star empty'} />
                          ))}
                        </div>
                        <span className="review-date">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="review-category">
                    <span className="category-tag">{review.category}</span>
                  </div>
                </div>
                <div className="review-content">
                  <p className="review-text">{review.review}</p>
                </div>
                <div className="review-footer">
                  <div className="review-actions">
                    <button className="action-btn helpful">
                      <FiHeart className="action-icon" />
                      Helpful ({review.helpful})
                    </button>
                    <button className="action-btn reply">
                      <FiMessageSquare className="action-icon" />
                      Reply
                    </button>
                    <button className="action-btn share">
                      <FiShare2 className="action-icon" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="reviews-pagination">
            <button className="pagination-btn">Load More Reviews</button>
            <span className="pagination-info">Showing 4 of 2,847 reviews</span>
          </div>
        </div>
      </div>

      {/* Action Items & Recommendations */}
      <div className="feedback-actions-section">
        <div className="section-title">
          <h3>Action Items & Recommendations</h3>
          <p>AI-powered insights and recommended actions based on customer feedback</p>
        </div>
        
        <div className="actions-grid">
          <div className="action-card critical">
            <div className="action-header">
              <div className="action-priority critical">CRITICAL</div>
              <div className="action-impact">High Impact</div>
            </div>
            <div className="action-content">
              <h4>Address Delivery Consistency Issues</h4>
              <p>15% of customers mentioned delivery delays. Implementing route optimization could improve satisfaction by 12%.</p>
              <div className="action-metrics">
                <div className="metric">
                  <span className="metric-label">Affected Customers:</span>
                  <span className="metric-value">156 customers</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Potential Impact:</span>
                  <span className="metric-value">+12% satisfaction</span>
                </div>
              </div>
            </div>
            <div className="action-footer">
              <button className="action-btn primary">Take Action</button>
              <button className="action-btn secondary">View Details</button>
            </div>
          </div>

          <div className="action-card high">
            <div className="action-header">
              <div className="action-priority high">HIGH</div>
              <div className="action-impact">Medium Impact</div>
            </div>
            <div className="action-content">
              <h4>Expand Payment Options</h4>
              <p>9% of feedback requests more payment methods. Adding digital wallets could increase conversion by 8%.</p>
              <div className="action-metrics">
                <div className="metric">
                  <span className="metric-label">Requests:</span>
                  <span className="metric-value">89 mentions</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Expected Conversion:</span>
                  <span className="metric-value">+8% increase</span>
                </div>
              </div>
            </div>
            <div className="action-footer">
              <button className="action-btn primary">Plan Implementation</button>
              <button className="action-btn secondary">Research Options</button>
            </div>
          </div>

          <div className="action-card medium">
            <div className="action-header">
              <div className="action-priority medium">MEDIUM</div>
              <div className="action-impact">Low Impact</div>
            </div>
            <div className="action-content">
              <h4>Enhance Product Variety</h4>
              <p>7% of customers want more product options. Market research shows potential for 3 new product lines.</p>
              <div className="action-metrics">
                <div className="metric">
                  <span className="metric-label">Customer Interest:</span>
                  <span className="metric-value">67 requests</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Market Opportunity:</span>
                  <span className="metric-value">3 new products</span>
                </div>
              </div>
            </div>
            <div className="action-footer">
              <button className="action-btn primary">Research Market</button>
              <button className="action-btn secondary">Customer Survey</button>
            </div>
          </div>
        </div>
      </div>

      {/* Satisfaction Trends & Benchmarks */}
      <div className="satisfaction-trends-section">
        <div className="section-title">
          <h3>Satisfaction Trends & Industry Benchmarks</h3>
          <p>Historical trends and competitive analysis</p>
        </div>
        
        <div className="trends-container">
          <div className="trends-chart">
            <div className="chart-header">
              <h4>Satisfaction Score Trends</h4>
              <div className="chart-controls">
                <button className="chart-btn active">6M</button>
                <button className="chart-btn">1Y</button>
                <button className="chart-btn">2Y</button>
              </div>
            </div>
            <div className="trend-visualization">
              <div className="trend-line">
                {[
                  { month: 'Jan', score: 4.1, benchmark: 3.8 },
                  { month: 'Feb', score: 4.2, benchmark: 3.9 },
                  { month: 'Mar', score: 4.0, benchmark: 3.8 },
                  { month: 'Apr', score: 4.3, benchmark: 4.0 },
                  { month: 'May', score: 4.4, benchmark: 4.1 },
                  { month: 'Jun', score: 4.5, benchmark: 4.0 }
                ].map((data, index) => (
                  <div key={data.month} className="trend-point">
                    <div className="point-data">
                      <div className="our-score" style={{ height: `${data.score * 20}%` }}></div>
                      <div className="benchmark-score" style={{ height: `${data.benchmark * 20}%` }}></div>
                    </div>
                    <span className="point-label">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="trend-legend">
                <div className="legend-item">
                  <div className="legend-color our-score"></div>
                  <span>Our Score</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color benchmark"></div>
                  <span>Industry Benchmark</span>
                </div>
              </div>
            </div>
          </div>

          <div className="benchmarks-comparison">
            <div className="benchmark-header">
              <h4>Industry Benchmarks</h4>
              <span className="benchmark-date">Updated: June 2024</span>
            </div>
            <div className="benchmark-items">
              <div className="benchmark-item">
                <div className="benchmark-metric">
                  <span className="metric-name">Customer Satisfaction</span>
                  <div className="metric-comparison">
                    <div className="our-metric">
                      <span className="metric-label">Our Score</span>
                      <span className="metric-value our">{reportData.avgRating.toFixed(1)}/5.0</span>
                    </div>
                    <div className="industry-metric">
                      <span className="metric-label">Industry Avg</span>
                      <span className="metric-value industry">3.8/5.0</span>
                    </div>
                  </div>
                  <div className="performance-indicator positive">
                    <FiTrendingUp className="indicator-icon" />
                    <span>18% above industry</span>
                  </div>
                </div>
              </div>

              <div className="benchmark-item">
                <div className="benchmark-metric">
                  <span className="metric-name">Response Rate</span>
                  <div className="metric-comparison">
                    <div className="our-metric">
                      <span className="metric-label">Our Rate</span>
                      <span className="metric-value our">92.1%</span>
                    </div>
                    <div className="industry-metric">
                      <span className="metric-label">Industry Avg</span>
                      <span className="metric-value industry">67.3%</span>
                    </div>
                  </div>
                  <div className="performance-indicator positive">
                    <FiTrendingUp className="indicator-icon" />
                    <span>37% above industry</span>
                  </div>
                </div>
              </div>

              <div className="benchmark-item">
                <div className="benchmark-metric">
                  <span className="metric-name">Resolution Time</span>
                  <div className="metric-comparison">
                    <div className="our-metric">
                      <span className="metric-label">Our Time</span>
                      <span className="metric-value our">2.4h</span>
                    </div>
                    <div className="industry-metric">
                      <span className="metric-label">Industry Avg</span>
                      <span className="metric-value industry">4.2h</span>
                    </div>
                  </div>
                  <div className="performance-indicator positive">
                    <FiTrendingUp className="indicator-icon" />
                    <span>43% faster than industry</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Comprehensive Action Center
  const renderActionCenter = () => (
    <div className="enhanced-action-center-section">
      {/* Enhanced Header with Controls */}
      <div className="action-center-header">
        <div className="header-content">
          <div className="title-section">
            <h2 className="action-center-main-title">
              <FiZap className="title-icon" />
              Action Center & Smart Recommendations
            </h2>
            <p className="action-center-subtitle">
              AI-powered insights and quick actions to optimize customer relationships and business performance
            </p>
          </div>
          <div className="header-controls">
            <div className="action-stats-badge">
              <div className="stats-item">
                <span className="stats-value">12</span>
                <span className="stats-label">Pending Actions</span>
              </div>
              <div className="stats-divider"></div>
              <div className="stats-item">
                <span className="stats-value">8</span>
                <span className="stats-label">High Priority</span>
              </div>
            </div>
            <div className="header-action-buttons">
              <button className="header-btn secondary">
                <FiActivity className="btn-icon" />
                View All Tasks
              </button>
              <button className="header-btn primary">
                <FiTarget className="btn-icon" />
                Create Custom Action
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Dashboard */}
      <div className="quick-actions-dashboard">
        <div className="dashboard-header">
          <h3 className="dashboard-title">
            <FiZap className="dashboard-icon" />
            Quick Actions Dashboard
          </h3>
          <div className="dashboard-filters">
            <button className="filter-chip active">All Categories</button>
            <button className="filter-chip">High Impact</button>
            <button className="filter-chip">Urgent</button>
            <button className="filter-chip">Automated</button>
          </div>
        </div>

        <div className="action-categories-grid">
          {/* Marketing & Campaigns Category */}
          <div className="action-category-card marketing-category">
            <div className="category-header">
              <div className="category-icon-wrapper marketing-icon">
                <FiMail className="category-icon" />
              </div>
              <div className="category-info">
                <h4 className="category-title">Marketing & Campaigns</h4>
                <p className="category-description">Customer engagement and promotional activities</p>
              </div>
              <div className="category-status">
                <span className="status-badge active">6 Active</span>
                <span className="status-indicator"></span>
              </div>
            </div>
            
            <div className="category-metrics">
              <div className="metric-item">
                <span className="metric-label">Target Audience:</span>
                <span className="metric-value">{reportData.activeCustomers.toLocaleString()} customers</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Potential Reach:</span>
                <span className="metric-value">78% mobile users</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Expected ROI:</span>
                <span className="metric-value positive">+245%</span>
              </div>
            </div>

            <div className="action-buttons-container">
              <button className="enhanced-action-btn primary marketing-btn">
                <div className="btn-content">
                  <div className="btn-icon-wrapper">
                    <FiMail className="btn-icon" />
                  </div>
                  <div className="btn-text">
                    <span className="btn-title">Launch Email Campaign</span>
                    <small className="btn-subtitle">Target {reportData.activeCustomers} active customers</small>
                  </div>
                  <div className="btn-impact">
                    <span className="impact-value">High Impact</span>
                  </div>
                </div>
                <div className="btn-progress">
                  <div className="progress-bar" style={{ width: '0%' }}></div>
                </div>
              </button>

              <button className="enhanced-action-btn secondary marketing-btn">
                <div className="btn-content">
                  <div className="btn-icon-wrapper">
                    <FiMessageSquare className="btn-icon" />
                  </div>
                  <div className="btn-text">
                    <span className="btn-title">SMS Promotion</span>
                    <small className="btn-subtitle">Instant mobile engagement</small>
                  </div>
                  <div className="btn-impact">
                    <span className="impact-value">Medium Impact</span>
                  </div>
                </div>
                <div className="btn-progress">
                  <div className="progress-bar" style={{ width: '0%' }}></div>
                </div>
              </button>

              <button className="enhanced-action-btn secondary marketing-btn">
                <div className="btn-content">
                  <div className="btn-icon-wrapper">
                    <FiTarget className="btn-icon" />
                  </div>
                  <div className="btn-text">
                    <span className="btn-title">Retargeting Campaign</span>
                    <small className="btn-subtitle">{reportData.inactiveCustomers} inactive customers</small>
                  </div>
                  <div className="btn-impact">
                    <span className="impact-value">High Impact</span>
                  </div>
                </div>
                <div className="btn-progress">
                  <div className="progress-bar" style={{ width: '0%' }}></div>
                </div>
              </button>

              <button className="enhanced-action-btn tertiary marketing-btn">
                <div className="btn-content">
                  <div className="btn-icon-wrapper">
                    <FiGlobe className="btn-icon" />
                  </div>
                  <div className="btn-text">
                    <span className="btn-title">Social Media Campaign</span>
                    <small className="btn-subtitle">Multi-platform engagement</small>
                  </div>
                  <div className="btn-impact">
                    <span className="impact-value">Medium Impact</span>
                  </div>
                </div>
                <div className="btn-progress">
                  <div className="progress-bar" style={{ width: '0%' }}></div>
                </div>
              </button>
            </div>

            <div className="category-footer">
              <button className="view-all-btn">
                <FiChevronRight className="btn-icon" />
                View All Marketing Actions
              </button>
            </div>
          </div>

          {/* Analytics & Insights Category */}
          <div className="action-category-card analytics-category">
            <div className="category-header">
              <div className="category-icon-wrapper analytics-icon">
                <FiBarChart2 className="category-icon" />
              </div>
              <div className="category-info">
                <h4 className="category-title">Analytics & Insights</h4>
                <p className="category-description">Data analysis and business intelligence</p>
              </div>
              <div className="category-status">
                <span className="status-badge processing">4 Processing</span>
                <span className="status-indicator processing"></span>
              </div>
            </div>
            
            <div className="category-metrics">
              <div className="metric-item">
                <span className="metric-label">Data Points:</span>
                <span className="metric-value">{(reportData.totalCustomers * 15).toLocaleString()}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Report Accuracy:</span>
                <span className="metric-value">97.8%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Processing Time:</span>
                <span className="metric-value">2.3 min avg</span>
              </div>
            </div>

            <div className="action-buttons-container">
              <button className="enhanced-action-btn primary analytics-btn">
                <div className="btn-content">
                  <div className="btn-icon-wrapper">
                    <FiBarChart2 className="btn-icon" />
                  </div>
                  <div className="btn-text">
                    <span className="btn-title">Generate Deep Report</span>
                    <small className="btn-subtitle">Comprehensive customer analysis</small>
                  </div>
                  <div className="btn-impact">
                    <span className="impact-value">Critical</span>
                  </div>
                </div>
                <div className="btn-progress">
                  <div className="progress-bar" style={{ width: '0%' }}></div>
                </div>
              </button>

              <button className="enhanced-action-btn secondary analytics-btn">
                <div className="btn-content">
                  <div className="btn-icon-wrapper">
                    <FiActivity className="btn-icon" />
                  </div>
                  <div className="btn-text">
                    <span className="btn-title">Real-time Dashboard</span>
                    <small className="btn-subtitle">Live monitoring & alerts</small>
                  </div>
                  <div className="btn-impact">
                    <span className="impact-value">High Impact</span>
                  </div>
                </div>
                <div className="btn-progress">
                  <div className="progress-bar" style={{ width: '0%' }}></div>
                </div>
              </button>

              <button className="enhanced-action-btn secondary analytics-btn">
                <div className="btn-content">
                  <div className="btn-icon-wrapper">
                    <FiPieChart className="btn-icon" />
                  </div>
                  <div className="btn-text">
                    <span className="btn-title">Predictive Analysis</span>
                    <small className="btn-subtitle">AI-powered forecasting</small>
                  </div>
                  <div className="btn-impact">
                    <span className="impact-value">High Impact</span>
                  </div>
                </div>
                <div className="btn-progress">
                  <div className="progress-bar" style={{ width: '0%' }}></div>
                </div>
              </button>

              <button className="enhanced-action-btn tertiary analytics-btn">
                <div className="btn-content">
                  <div className="btn-icon-wrapper">
                    <FiTrendingUp className="btn-icon" />
                  </div>
                  <div className="btn-text">
                    <span className="btn-title">Trend Analysis</span>
                    <small className="btn-subtitle">Market trend insights</small>
                  </div>
                  <div className="btn-impact">
                    <span className="impact-value">Medium Impact</span>
                  </div>
                </div>
                <div className="btn-progress">
                  <div className="progress-bar" style={{ width: '0%' }}></div>
                </div>
              </button>
            </div>

            <div className="category-footer">
              <button className="view-all-btn">
                <FiChevronRight className="btn-icon" />
                View All Analytics Actions
              </button>
            </div>
          </div>

          {/* Customer Care & Support Category */}
          <div className="action-category-card customer-care-category">
            <div className="category-header">
              <div className="category-icon-wrapper customer-care-icon">
                <FiUsers className="category-icon" />
              </div>
              <div className="category-info">
                <h4 className="category-title">Customer Care & Support</h4>
                <p className="category-description">Customer service and relationship management</p>
              </div>
              <div className="category-status">
                <span className="status-badge urgent">3 Urgent</span>
                <span className="status-indicator urgent"></span>
              </div>
            </div>
            
            <div className="category-metrics">
              <div className="metric-item">
                <span className="metric-label">High-Risk Customers:</span>
                <span className="metric-value warning">{reportData.predictiveMetrics.churnRisk.high}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Response Time:</span>
                <span className="metric-value">2.4h avg</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Satisfaction Rate:</span>
                <span className="metric-value positive">94.2%</span>
              </div>
            </div>

            <div className="action-buttons-container">
              <button className="enhanced-action-btn primary customer-care-btn">
                <div className="btn-content">
                  <div className="btn-icon-wrapper">
                    <FiPhone className="btn-icon" />
                  </div>
                  <div className="btn-text">
                    <span className="btn-title">Schedule Follow-ups</span>
                    <small className="btn-subtitle">{reportData.predictiveMetrics.churnRisk.high} high-risk customers</small>
                  </div>
                  <div className="btn-impact">
                    <span className="impact-value urgent">Urgent</span>
                  </div>
                </div>
                <div className="btn-progress">
                  <div className="progress-bar" style={{ width: '0%' }}></div>
                </div>
              </button>

              <button className="enhanced-action-btn secondary customer-care-btn">
                <div className="btn-content">
                  <div className="btn-icon-wrapper">
                    <FiHeart className="btn-icon" />
                  </div>
                  <div className="btn-text">
                    <span className="btn-title">Loyalty Program</span>
                    <small className="btn-subtitle">Reward top {reportData.premiumCustomers} customers</small>
                  </div>
                  <div className="btn-impact">
                    <span className="impact-value">High Impact</span>
                  </div>
                </div>
                <div className="btn-progress">
                  <div className="progress-bar" style={{ width: '0%' }}></div>
                </div>
              </button>

              <button className="enhanced-action-btn secondary customer-care-btn">
                <div className="btn-content">
                  <div className="btn-icon-wrapper">
                    <FiShield className="btn-icon" />
                  </div>
                  <div className="btn-text">
                    <span className="btn-title">Churn Prevention</span>
                    <small className="btn-subtitle">Proactive retention strategy</small>
                  </div>
                  <div className="btn-impact">
                    <span className="impact-value">Critical</span>
                  </div>
                </div>
                <div className="btn-progress">
                  <div className="progress-bar" style={{ width: '0%' }}></div>
                </div>
              </button>

              <button className="enhanced-action-btn tertiary customer-care-btn">
                <div className="btn-content">
                  <div className="btn-icon-wrapper">
                    <FiAward className="btn-icon" />
                  </div>
                  <div className="btn-text">
                    <span className="btn-title">VIP Customer Program</span>
                    <small className="btn-subtitle">Exclusive premium services</small>
                  </div>
                  <div className="btn-impact">
                    <span className="impact-value">Medium Impact</span>
                  </div>
                </div>
                <div className="btn-progress">
                  <div className="progress-bar" style={{ width: '0%' }}></div>
                </div>
              </button>
            </div>

            <div className="category-footer">
              <button className="view-all-btn">
                <FiChevronRight className="btn-icon" />
                View All Customer Care Actions
              </button>
            </div>
          </div>

          {/* Operations & Automation Category */}
          <div className="action-category-card operations-category">
            <div className="category-header">
              <div className="category-icon-wrapper operations-icon">
                <FiZap className="category-icon" />
              </div>
              <div className="category-info">
                <h4 className="category-title">Operations & Automation</h4>
                <p className="category-description">Process optimization and workflow automation</p>
              </div>
              <div className="category-status">
                <span className="status-badge automated">5 Automated</span>
                <span className="status-indicator automated"></span>
              </div>
            </div>
            
            <div className="category-metrics">
              <div className="metric-item">
                <span className="metric-label">Automation Rate:</span>
                <span className="metric-value">87.3%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Time Saved:</span>
                <span className="metric-value positive">24.5h/week</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Error Reduction:</span>
                <span className="metric-value positive">-68%</span>
              </div>
            </div>

            <div className="action-buttons-container">
              <button className="enhanced-action-btn primary operations-btn">
                <div className="btn-content">
                  <div className="btn-icon-wrapper">
                    <FiZap className="btn-icon" />
                  </div>
                  <div className="btn-text">
                    <span className="btn-title">Automate Workflows</span>
                    <small className="btn-subtitle">Streamline repetitive tasks</small>
                  </div>
                  <div className="btn-impact">
                    <span className="impact-value">High Impact</span>
                  </div>
                </div>
                <div className="btn-progress">
                  <div className="progress-bar" style={{ width: '0%' }}></div>
                </div>
              </button>

              <button className="enhanced-action-btn secondary operations-btn">
                <div className="btn-content">
                  <div className="btn-icon-wrapper">
                    <FiClock className="btn-icon" />
                  </div>
                  <div className="btn-text">
                    <span className="btn-title">Schedule Reports</span>
                    <small className="btn-subtitle">Automated report generation</small>
                  </div>
                  <div className="btn-impact">
                    <span className="impact-value">Medium Impact</span>
                  </div>
                </div>
                <div className="btn-progress">
                  <div className="progress-bar" style={{ width: '0%' }}></div>
                </div>
              </button>

              <button className="enhanced-action-btn secondary operations-btn">
                <div className="btn-content">
                  <div className="btn-icon-wrapper">
                    <FiAlertTriangle className="btn-icon" />
                  </div>
                  <div className="btn-text">
                    <span className="btn-title">Alert Management</span>
                    <small className="btn-subtitle">Smart notification system</small>
                  </div>
                  <div className="btn-impact">
                    <span className="impact-value">Medium Impact</span>
                  </div>
                </div>
                <div className="btn-progress">
                  <div className="progress-bar" style={{ width: '0%' }}></div>
                </div>
              </button>

              <button className="enhanced-action-btn tertiary operations-btn">
                <div className="btn-content">
                  <div className="btn-icon-wrapper">
                    <FiShield className="btn-icon" />
                  </div>
                  <div className="btn-text">
                    <span className="btn-title">Security Audit</span>
                    <small className="btn-subtitle">System security check</small>
                  </div>
                  <div className="btn-impact">
                    <span className="impact-value">Critical</span>
                  </div>
                </div>
                <div className="btn-progress">
                  <div className="progress-bar" style={{ width: '0%' }}></div>
                </div>
              </button>
            </div>

            <div className="category-footer">
              <button className="view-all-btn">
                <FiChevronRight className="btn-icon" />
                View All Operations Actions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI-Powered Recommendations Panel */}
      <div className="enhanced-recommendations-panel">
        <div className="recommendations-header">
          <div className="header-left">
            <h3 className="recommendations-title">
              <FiTarget className="recommendations-icon" />
              Smart Business Recommendations
            </h3>
            <p className="recommendations-subtitle">
              Data-driven insights and strategic recommendations based on customer analytics and business intelligence
            </p>
          </div>
          <div className="header-right">
            <button className="refresh-recommendations-btn">
              <FiRepeat className="btn-icon" />
              Refresh Insights
            </button>
          </div>
        </div>

        <div className="recommendations-grid">
          <div className="recommendation-card priority-critical">
            <div className="recommendation-header">
              <div className="priority-badge critical">
                <FiAlertTriangle className="priority-icon" />
                CRITICAL
              </div>
              <div className="recommendation-impact">
                <span className="impact-label">Revenue Impact</span>
                <span className="impact-value positive">+₹{(reportData.totalRevenue * 0.25).toLocaleString()}</span>
              </div>
            </div>
            
            <div className="recommendation-content">
              <h4 className="recommendation-title">Focus on Premium Customer Conversion</h4>
              <p className="recommendation-description">
                Our AI analysis identifies {Math.round(reportData.activeCustomers * 0.4)} active customers with high conversion potential to premium tier. 
                Implementing targeted premium campaigns could increase revenue by 25%.
              </p>
              
              <div className="recommendation-metrics">
                <div className="metric-row">
                  <div className="metric-item">
                    <span className="metric-label">Target Customers:</span>
                    <span className="metric-value">{Math.round(reportData.activeCustomers * 0.4)}</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Conversion Rate:</span>
                    <span className="metric-value">68%</span>
                  </div>
                </div>
                <div className="metric-row">
                  <div className="metric-item">
                    <span className="metric-label">Timeline:</span>
                    <span className="metric-value">2-3 weeks</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Success Probability:</span>
                    <span className="metric-value positive">87%</span>
                  </div>
                </div>
              </div>

              <div className="recommendation-insights">
                <h5>Key Insights:</h5>
                <ul className="insights-list">
                  <li>Premium customers show 3.2x higher lifetime value</li>
                  <li>Current premium conversion rate is below industry average</li>
                  <li>Optimal timing: End of month promotional campaigns</li>
                </ul>
              </div>
            </div>

            <div className="recommendation-actions">
              <button className="rec-action-btn primary">
                <FiZap className="btn-icon" />
                Execute Strategy
              </button>
              <button className="rec-action-btn secondary">
                <FiEye className="btn-icon" />
                View Details
              </button>
              <button className="rec-action-btn tertiary">
                <FiCalendar className="btn-icon" />
                Schedule Later
              </button>
            </div>
          </div>

          <div className="recommendation-card priority-high">
            <div className="recommendation-header">
              <div className="priority-badge high">
                <FiTrendingUp className="priority-icon" />
                HIGH
              </div>
              <div className="recommendation-impact">
                <span className="impact-label">Customer Growth</span>
                <span className="impact-value positive">+{Math.round(reportData.totalCustomers * 0.15)}</span>
              </div>
            </div>
            
            <div className="recommendation-content">
              <h4 className="recommendation-title">Expand Geographic Presence</h4>
              <p className="recommendation-description">
                Market analysis reveals untapped potential in 3 tier-2 cities. Strategic expansion could capture 
                {Math.round(reportData.totalCustomers * 0.15)} new customers within 6 months.
              </p>
              
              <div className="recommendation-metrics">
                <div className="metric-row">
                  <div className="metric-item">
                    <span className="metric-label">Target Cities:</span>
                    <span className="metric-value">3 locations</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Market Size:</span>
                    <span className="metric-value">2.4M potential</span>
                  </div>
                </div>
                <div className="metric-row">
                  <div className="metric-item">
                    <span className="metric-label">Investment:</span>
                    <span className="metric-value">₹12.5L</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">ROI Timeline:</span>
                    <span className="metric-value">8-10 months</span>
                  </div>
                </div>
              </div>

              <div className="recommendation-insights">
                <h5>Market Opportunities:</h5>
                <ul className="insights-list">
                  <li>Low competition in target markets</li>
                  <li>High demand for premium dairy products</li>
                  <li>Strong local distribution network available</li>
                </ul>
              </div>
            </div>

            <div className="recommendation-actions">
              <button className="rec-action-btn primary">
                <FiMapPin className="btn-icon" />
                Plan Expansion
              </button>
              <button className="rec-action-btn secondary">
                <FiBarChart2 className="btn-icon" />
                Market Research
              </button>
              <button className="rec-action-btn tertiary">
                <FiUsers className="btn-icon" />
                Team Meeting
              </button>
            </div>
          </div>

          <div className="recommendation-card priority-medium">
            <div className="recommendation-header">
              <div className="priority-badge medium">
                <FiSmartphone className="priority-icon" />
                MEDIUM
              </div>
              <div className="recommendation-impact">
                <span className="impact-label">Retention Improvement</span>
                <span className="impact-value positive">+12%</span>
              </div>
            </div>
            
            <div className="recommendation-content">
              <h4 className="recommendation-title">Enhance Mobile Experience</h4>
              <p className="recommendation-description">
                User behavior analysis shows mobile app improvements could increase customer engagement by 15% 
                and reduce churn rate by 12%.
              </p>
              
              <div className="recommendation-metrics">
                <div className="metric-row">
                  <div className="metric-item">
                    <span className="metric-label">Mobile Users:</span>
                    <span className="metric-value">78% of base</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">App Rating:</span>
                    <span className="metric-value">4.2/5.0</span>
                  </div>
                </div>
                <div className="metric-row">
                  <div className="metric-item">
                    <span className="metric-label">Development Time:</span>
                    <span className="metric-value">6-8 weeks</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">User Impact:</span>
                    <span className="metric-value">{Math.round(reportData.totalCustomers * 0.78)} users</span>
                  </div>
                </div>
              </div>

              <div className="recommendation-insights">
                <h5>Enhancement Areas:</h5>
                <ul className="insights-list">
                  <li>Streamlined checkout process</li>
                  <li>Personalized product recommendations</li>
                  <li>Push notification optimization</li>
                </ul>
              </div>
            </div>

            <div className="recommendation-actions">
              <button className="rec-action-btn primary">
                <FiSmartphone className="btn-icon" />
                Start Development
              </button>
              <button className="rec-action-btn secondary">
                <FiUsers className="btn-icon" />
                User Research
              </button>
              <button className="rec-action-btn tertiary">
                <FiActivity className="btn-icon" />
                A/B Testing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Timeline & Progress Tracker */}
      <div className="action-timeline-section">
        <div className="timeline-header">
          <h3 className="timeline-title">
            <FiClock className="timeline-icon" />
            Action Timeline & Progress Tracker
          </h3>
          <div className="timeline-controls">
            <select className="timeline-dropdown">
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
        </div>

        <div className="timeline-container">
          <div className="timeline-track">
            <div className="timeline-item completed">
              <div className="timeline-marker completed">
                <FiCheckCircle className="marker-icon" />
              </div>
              <div className="timeline-content">
                <div className="timeline-date">2 days ago</div>
                <h4 className="timeline-title">Email Campaign Launched</h4>
                <p className="timeline-description">Successfully launched premium conversion campaign</p>
                <div className="timeline-metrics">
                  <span className="metric">Open Rate: 42.3%</span>
                  <span className="metric">Click Rate: 18.7%</span>
                </div>
              </div>
            </div>

            <div className="timeline-item in-progress">
              <div className="timeline-marker in-progress">
                <FiClock className="marker-icon" />
              </div>
              <div className="timeline-content">
                <div className="timeline-date">In Progress</div>
                <h4 className="timeline-title">Customer Follow-up Calls</h4>
                <p className="timeline-description">Contacting high-risk customers for retention</p>
                <div className="timeline-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '67%' }}></div>
                  </div>
                  <span className="progress-text">67% Complete</span>
                </div>
              </div>
            </div>

            <div className="timeline-item pending">
              <div className="timeline-marker pending">
                <FiCalendar className="marker-icon" />
              </div>
              <div className="timeline-content">
                <div className="timeline-date">Tomorrow</div>
                <h4 className="timeline-title">Analytics Report Generation</h4>
                <p className="timeline-description">Scheduled comprehensive customer analysis</p>
                <div className="timeline-actions">
                  <button className="timeline-btn">Reschedule</button>
                  <button className="timeline-btn primary">Start Now</button>
                </div>
              </div>
            </div>

            <div className="timeline-item scheduled">
              <div className="timeline-marker scheduled">
                <FiZap className="marker-icon" />
              </div>
              <div className="timeline-content">
                <div className="timeline-date">Next Week</div>
                <h4 className="timeline-title">Mobile App Enhancement</h4>
                <p className="timeline-description">Begin development of new mobile features</p>
                <div className="timeline-team">
                  <span className="team-label">Assigned to:</span>
                  <span className="team-members">Development Team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );







  return (
    <div className="customer-reports enhanced">
      <div className="enhanced-report-tabs">
        <button 
          className={`enhanced-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FiBarChart2 className="tab-icon" />
          <span>Complete Overview</span>
          <small>All metrics & insights</small>
        </button>
        <button 
          className={`enhanced-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <FiActivity className="tab-icon" />
          <span>Advanced Analytics</span>
          <small>Deep insights & predictions</small>
        </button>
        <button 
          className={`enhanced-tab-btn ${activeTab === 'segmentation' ? 'active' : ''}`}
          onClick={() => setActiveTab('segmentation')}
        >
          <FiUsers className="tab-icon" />
          <span>Customer Segments</span>
          <small>Detailed segmentation</small>
        </button>
        <button 
          className={`enhanced-tab-btn ${activeTab === 'journey' ? 'active' : ''}`}
          onClick={() => setActiveTab('journey')}
        >
          <FiClock className="tab-icon" />
          <span>Customer Journey</span>
          <small>Lifecycle analysis</small>
        </button>
        <button 
          className={`enhanced-tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
          onClick={() => setActiveTab('feedback')}
        >
          <FiStar className="tab-icon" />
          <span>Feedback & Reviews</span>
          <small>Customer satisfaction</small>
        </button>
        <button 
          className={`enhanced-tab-btn ${activeTab === 'actions' ? 'active' : ''}`}
          onClick={() => setActiveTab('actions')}
        >
          <FiZap className="tab-icon" />
          <span>Action Center</span>
          <small>Quick actions & recommendations</small>
        </button>
      </div>

      <div className="enhanced-report-body">
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner">⟳</div>
            <span>Loading analytics...</span>
          </div>
        )}
        
        {activeTab === 'overview' && renderEnhancedOverviewReport()}
        {activeTab === 'analytics' && (
          <div className="analytics-focused">
            {renderPredictiveAnalytics()}
          </div>
        )}
        {activeTab === 'segmentation' && renderCustomerSegmentation()}
        {activeTab === 'journey' && renderCustomerJourney()}
        {activeTab === 'feedback' && renderFeedback()}
        {activeTab === 'actions' && renderActionCenter()}
      </div>


    </div>
  );
}

export default CustomerReports;