// API service for communicating with the backend
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_API_URL || 'http://localhost:5000'
  : '';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}/api${endpoint}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Milk collection methods
  async getMilkCollections(page = 1, limit = 10) {
    return this.get(`/milk/collections?page=${page}&limit=${limit}`);
  }

  async getMilkCollection(id) {
    return this.get(`/milk/collections/${id}`);
  }

  async createMilkCollection(collectionData) {
    return this.post('/milk/collections', collectionData);
  }

  async updateMilkCollection(id, collectionData) {
    return this.put(`/milk/collections/${id}`, collectionData);
  }

  async deleteMilkCollection(id) {
    return this.delete(`/milk/collections/${id}`);
  }

  async getMilkStats() {
    return this.get('/milk/stats');
  }

  // Enhanced Reports and Analytics API Methods
  async getReportData(type, dateRange = 'month') {
    return this.get(`/reports/${type}?range=${dateRange}`);
  }

  async getAnalyticsData(metrics, dateRange = 'month') {
    return this.post('/analytics/data', { metrics, dateRange });
  }

  async getProductionAnalytics(dateRange = 'month') {
    return this.get(`/analytics/production?range=${dateRange}`);
  }

  async getCattleAnalytics(dateRange = 'month') {
    return this.get(`/analytics/cattle?range=${dateRange}`);
  }

  async getFinancialAnalytics(dateRange = 'month') {
    return this.get(`/analytics/financial?range=${dateRange}`);
  }

  async getQualityMetrics(dateRange = 'month') {
    return this.get(`/analytics/quality?range=${dateRange}`);
  }

  async getEfficiencyMetrics(dateRange = 'month') {
    return this.get(`/analytics/efficiency?range=${dateRange}`);
  }

  async getPredictiveInsights() {
    return this.get('/analytics/predictions');
  }

  async getKPIData() {
    return this.get('/analytics/kpi');
  }

  async generateReport(config) {
    return this.post('/reports/generate', config);
  }

  async exportReport(type, format = 'pdf', dateRange = 'month') {
    return this.post('/reports/export', { type, format, dateRange });
  }

  async getCustomReportPreview(config) {
    return this.post('/reports/preview', config);
  }

  async saveCustomReport(config) {
    return this.post('/reports/custom/save', config);
  }

  async getCustomReports() {
    return this.get('/reports/custom');
  }

  async deleteCustomReport(id) {
    return this.delete(`/reports/custom/${id}`);
  }

  async getReportHistory() {
    return this.get('/reports/history');
  }

  async scheduleReport(config) {
    return this.post('/reports/schedule', config);
  }

  async getScheduledReports() {
    return this.get('/reports/scheduled');
  }

  async updateScheduledReport(id, config) {
    return this.put(`/reports/scheduled/${id}`, config);
  }

  async deleteScheduledReport(id) {
    return this.delete(`/reports/scheduled/${id}`);
  }

  async getTrendAnalysis(metric, period = '6months') {
    return this.get(`/analytics/trends/${metric}?period=${period}`);
  }

  async getComparativeAnalysis(metrics, periods) {
    return this.post('/analytics/compare', { metrics, periods });
  }

  async getForecastData(metric, horizon = '3months') {
    return this.get(`/analytics/forecast/${metric}?horizon=${horizon}`);
  }

  async getAnomalyDetection(metric, sensitivity = 'medium') {
    return this.get(`/analytics/anomalies/${metric}?sensitivity=${sensitivity}`);
  }

  async getCorrelationAnalysis(metrics) {
    return this.post('/analytics/correlation', { metrics });
  }

  async getBenchmarkData(category) {
    return this.get(`/analytics/benchmarks/${category}`);
  }

  async getSeasonalAnalysis(metric) {
    return this.get(`/analytics/seasonal/${metric}`);
  }

  async getPerformanceMetrics(category, dateRange = 'month') {
    return this.get(`/analytics/performance/${category}?range=${dateRange}`);
  }

  async getAlertConfiguration() {
    return this.get('/analytics/alerts/config');
  }

  async updateAlertConfiguration(config) {
    return this.put('/analytics/alerts/config', config);
  }

  async getActiveAlerts() {
    return this.get('/analytics/alerts/active');
  }

  async acknowledgeAlert(alertId) {
    return this.put(`/analytics/alerts/${alertId}/acknowledge`);
  }

  async dismissAlert(alertId) {
    return this.delete(`/analytics/alerts/${alertId}`);
  }

  async exportAnalyticsData(config) {
    return this.post('/analytics/export', config);
  }

  async importAnalyticsData(data) {
    return this.post('/analytics/import', data);
  }

  async syncExternalData(source, config) {
    return this.post(`/analytics/sync/${source}`, config);
  }

  async getDataSources() {
    return this.get('/analytics/sources');
  }

  async validateDataIntegrity(dataset) {
    return this.post('/analytics/validate', { dataset });
  }

  // Health check
  async healthCheck() {
    return this.get('/health');
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;