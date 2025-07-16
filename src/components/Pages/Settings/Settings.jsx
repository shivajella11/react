import React, { useState, useRef } from 'react';
import { useSettings } from '../../../contexts/SettingsContext';
import AdvancedSettings from './components/AdvancedSettings';
import './Settings.css';

const Settings = () => {
  const { 
    settings, 
    updateSetting, 
    resetSettings, 
    exportSettings, 
    importSettings, 
    getSetting 
  } = useSettings();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');
  const fileInputRef = useRef(null);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'system', label: 'System', icon: '⚙️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'plant', label: 'Plant Config', icon: '🏭' },
    { id: 'units', label: 'Units', icon: '📏' },
    { id: 'quality', label: 'Quality Control', icon: '✅' },
    { id: 'collection', label: 'Milk Collection', icon: '🥛' },
    { id: 'financial', label: 'Financial', icon: '💰' },
    { id: 'equipment', label: 'Equipment', icon: '🔧' },
    { id: 'reports', label: 'Reports', icon: '📊' },
    { id: 'integrations', label: 'Integrations', icon: '🔗' },
    { id: 'data', label: 'Data Management', icon: '💾' },
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'advanced', label: 'Advanced', icon: '⚡' }
  ];

  const handleSave = () => {
    setSaveMessage('Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleReset = () => {
    resetSettings();
    setShowConfirmReset(false);
    setSaveMessage('Settings reset to default values!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleImport = async () => {
    if (importFile) {
      try {
        await importSettings(importFile);
        setShowImportDialog(false);
        setImportFile(null);
        setSaveMessage('Settings imported successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } catch (error) {
        setSaveMessage('Error importing settings: ' + error.message);
        setTimeout(() => setSaveMessage(''), 3000);
      }
    }
  };

  const renderProfileTab = () => (
    <div className="settings-section">
      <h3>User Profile</h3>
      <div className="settings-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={settings.profile.name}
            onChange={(e) => updateSetting('profile.name', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={settings.profile.email}
            onChange={(e) => updateSetting('profile.email', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            value={settings.profile.phone}
            onChange={(e) => updateSetting('profile.phone', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select
            value={settings.profile.role}
            onChange={(e) => updateSetting('profile.role', e.target.value)}
          >
            <option value="Plant Manager">Plant Manager</option>
            <option value="Quality Supervisor">Quality Supervisor</option>
            <option value="Production Manager">Production Manager</option>
            <option value="Logistics Manager">Logistics Manager</option>
            <option value="Administrator">Administrator</option>
          </select>
        </div>
        <div className="form-group">
          <label>Department</label>
          <select
            value={settings.profile.department}
            onChange={(e) => updateSetting('profile.department', e.target.value)}
          >
            <option value="Operations">Operations</option>
            <option value="Quality Control">Quality Control</option>
            <option value="Production">Production</option>
            <option value="Logistics">Logistics</option>
            <option value="Administration">Administration</option>
          </select>
        </div>
        <div className="form-group">
          <label>Employee ID</label>
          <input
            type="text"
            value={settings.profile.employeeId}
            onChange={(e) => updateSetting('profile.employeeId', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderSystemTab = () => (
    <div className="settings-section">
      <h3>System Preferences</h3>
      <div className="settings-form">
        <div className="form-group">
          <label>Theme</label>
          <select
            value={settings.system.theme}
            onChange={(e) => updateSetting('system.theme', e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
        <div className="form-group">
          <label>Language</label>
          <select
            value={settings.system.language}
            onChange={(e) => updateSetting('system.language', e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="hi">Hindi</option>
          </select>
        </div>
        <div className="form-group">
          <label>Timezone</label>
          <select
            value={settings.system.timezone}
            onChange={(e) => updateSetting('system.timezone', e.target.value)}
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="Asia/Kolkata">India Standard Time</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date Format</label>
          <select
            value={settings.system.dateFormat}
            onChange={(e) => updateSetting('system.dateFormat', e.target.value)}
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
        <div className="form-group">
          <label>Time Format</label>
          <select
            value={settings.system.timeFormat}
            onChange={(e) => updateSetting('system.timeFormat', e.target.value)}
          >
            <option value="24h">24 Hour</option>
            <option value="12h">12 Hour</option>
          </select>
        </div>
        <div className="form-group">
          <label>Currency</label>
          <select
            value={settings.system.currency}
            onChange={(e) => updateSetting('system.currency', e.target.value)}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="INR">INR (₹)</option>
            <option value="JPY">JPY (¥)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="settings-section">
      <h3>Notification Settings</h3>
      <div className="settings-form">
        <div className="notification-group">
          <h4>Email Notifications</h4>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.notifications.email.enabled}
                onChange={(e) => updateSetting('notifications.email.enabled', e.target.checked)}
              />
              <span>Enable Email Notifications</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.notifications.email.qualityAlerts}
                onChange={(e) => updateSetting('notifications.email.qualityAlerts', e.target.checked)}
              />
              <span>Quality Alerts</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.notifications.email.lowStock}
                onChange={(e) => updateSetting('notifications.email.lowStock', e.target.checked)}
              />
              <span>Low Stock Alerts</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.notifications.email.equipmentMaintenance}
                onChange={(e) => updateSetting('notifications.email.equipmentMaintenance', e.target.checked)}
              />
              <span>Equipment Maintenance</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.notifications.email.milkCollection}
                onChange={(e) => updateSetting('notifications.email.milkCollection', e.target.checked)}
              />
              <span>Milk Collection Updates</span>
            </label>
          </div>
        </div>
        
        <div className="notification-group">
          <h4>Push Notifications</h4>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.notifications.push.enabled}
                onChange={(e) => updateSetting('notifications.push.enabled', e.target.checked)}
              />
              <span>Enable Push Notifications</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.notifications.push.criticalAlerts}
                onChange={(e) => updateSetting('notifications.push.criticalAlerts', e.target.checked)}
              />
              <span>Critical Alerts</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.notifications.push.taskReminders}
                onChange={(e) => updateSetting('notifications.push.taskReminders', e.target.checked)}
              />
              <span>Task Reminders</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="settings-section">
      <h3>Security Settings</h3>
      <div className="settings-form">
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={(e) => updateSetting('security.twoFactorAuth', e.target.checked)}
            />
            <span>Enable Two-Factor Authentication</span>
          </label>
        </div>
        <div className="form-group">
          <label>Session Timeout (minutes)</label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => updateSetting('security.sessionTimeout', parseInt(e.target.value))}
            min="5"
            max="480"
          />
        </div>
        <div className="form-group">
          <label>Password Expiry (days)</label>
          <input
            type="number"
            value={settings.security.passwordExpiry}
            onChange={(e) => updateSetting('security.passwordExpiry', parseInt(e.target.value))}
            min="30"
            max="365"
          />
        </div>
        <div className="form-group">
          <label>Maximum Login Attempts</label>
          <input
            type="number"
            value={settings.security.loginAttempts}
            onChange={(e) => updateSetting('security.loginAttempts', parseInt(e.target.value))}
            min="1"
            max="10"
          />
        </div>
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.security.auditLog}
              onChange={(e) => updateSetting('security.auditLog', e.target.checked)}
            />
            <span>Enable Audit Logging</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderPlantTab = () => (
    <div className="settings-section">
      <h3>Plant Configuration</h3>
      <div className="settings-form">
        <div className="form-group">
          <label>Plant Name</label>
          <input
            type="text"
            value={settings.plant.name}
            onChange={(e) => updateSetting('plant.name', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            value={settings.plant.address}
            onChange={(e) => updateSetting('plant.address', e.target.value)}
            rows="3"
          />
        </div>
        <div className="form-group">
          <label>Daily Capacity (liters)</label>
          <input
            type="number"
            value={settings.plant.capacity}
            onChange={(e) => updateSetting('plant.capacity', parseInt(e.target.value))}
            min="1000"
          />
        </div>
        <div className="form-group-inline">
          <div className="form-group">
            <label>Operating Hours - Start</label>
            <input
              type="time"
              value={settings.plant.operatingHours.start}
              onChange={(e) => updateSetting('plant.operatingHours.start', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Operating Hours - End</label>
            <input
              type="time"
              value={settings.plant.operatingHours.end}
              onChange={(e) => updateSetting('plant.operatingHours.end', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderUnitsTab = () => (
    <div className="settings-section">
      <h3>Unit Settings</h3>
      <div className="settings-form">
        <div className="form-group">
          <label>Volume Unit</label>
          <select
            value={settings.units.volume}
            onChange={(e) => updateSetting('units.volume', e.target.value)}
          >
            <option value="liters">Liters</option>
            <option value="gallons">Gallons</option>
          </select>
        </div>
        <div className="form-group">
          <label>Weight Unit</label>
          <select
            value={settings.units.weight}
            onChange={(e) => updateSetting('units.weight', e.target.value)}
          >
            <option value="kg">Kilograms</option>
            <option value="pounds">Pounds</option>
          </select>
        </div>
        <div className="form-group">
          <label>Temperature Unit</label>
          <select
            value={settings.units.temperature}
            onChange={(e) => updateSetting('units.temperature', e.target.value)}
          >
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
          </select>
        </div>
        <div className="form-group">
          <label>Distance Unit</label>
          <select
            value={settings.units.distance}
            onChange={(e) => updateSetting('units.distance', e.target.value)}
          >
            <option value="km">Kilometers</option>
            <option value="miles">Miles</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderQualityTab = () => (
    <div className="settings-section">
      <h3>Quality Control Parameters</h3>
      <div className="settings-form">
        <div className="quality-parameters">
          <div className="parameter-group">
            <h4>Fat Content (%)</h4>
            <div className="form-group-inline">
              <div className="form-group">
                <label>Min</label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.qualityControl.milkParameters.fatContent.min}
                  onChange={(e) => updateSetting('qualityControl.milkParameters.fatContent.min', parseFloat(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label>Max</label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.qualityControl.milkParameters.fatContent.max}
                  onChange={(e) => updateSetting('qualityControl.milkParameters.fatContent.max', parseFloat(e.target.value))}
                />
              </div>
            </div>
          </div>
          
          <div className="parameter-group">
            <h4>Protein (%)</h4>
            <div className="form-group-inline">
              <div className="form-group">
                <label>Min</label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.qualityControl.milkParameters.protein.min}
                  onChange={(e) => updateSetting('qualityControl.milkParameters.protein.min', parseFloat(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label>Max</label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.qualityControl.milkParameters.protein.max}
                  onChange={(e) => updateSetting('qualityControl.milkParameters.protein.max', parseFloat(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label>Test Frequency</label>
          <select
            value={settings.qualityControl.testFrequency}
            onChange={(e) => updateSetting('qualityControl.testFrequency', e.target.value)}
          >
            <option value="every batch">Every Batch</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderCollectionTab = () => (
    <div className="settings-section">
      <h3>Milk Collection Settings</h3>
      <div className="settings-form">
        <div className="form-group">
          <label>Storage Capacity (liters)</label>
          <input
            type="number"
            value={settings.milkCollection.storageCapacity}
            onChange={(e) => updateSetting('milkCollection.storageCapacity', parseInt(e.target.value))}
            min="1000"
          />
        </div>
        <div className="form-group">
          <label>Target Cooling Temperature (°C)</label>
          <input
            type="number"
            value={settings.milkCollection.coolingSystem.targetTemp}
            onChange={(e) => updateSetting('milkCollection.coolingSystem.targetTemp', parseInt(e.target.value))}
            min="0"
            max="10"
          />
        </div>
        <div className="form-group">
          <label>Maximum Temperature (°C)</label>
          <input
            type="number"
            value={settings.milkCollection.coolingSystem.maxTemp}
            onChange={(e) => updateSetting('milkCollection.coolingSystem.maxTemp', parseInt(e.target.value))}
            min="0"
            max="15"
          />
        </div>
        <div className="form-group">
          <label>Payment Terms</label>
          <select
            value={settings.milkCollection.paymentTerms}
            onChange={(e) => updateSetting('milkCollection.paymentTerms', e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.milkCollection.qualityBonuses}
              onChange={(e) => updateSetting('milkCollection.qualityBonuses', e.target.checked)}
            />
            <span>Enable Quality Bonuses</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderFinancialTab = () => (
    <div className="settings-section">
      <h3>Financial Settings</h3>
      <div className="settings-form">
        <div className="form-group">
          <label>Base Currency</label>
          <select
            value={settings.financial.baseCurrency}
            onChange={(e) => updateSetting('financial.baseCurrency', e.target.value)}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="INR">INR (₹)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Tax Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={settings.financial.taxRate}
            onChange={(e) => updateSetting('financial.taxRate', parseFloat(e.target.value))}
            min="0"
            max="100"
          />
        </div>
        <div className="form-group">
          <label>Credit Terms (days)</label>
          <input
            type="number"
            value={settings.financial.creditTerms}
            onChange={(e) => updateSetting('financial.creditTerms', parseInt(e.target.value))}
            min="0"
            max="365"
          />
        </div>
        <div className="form-group">
          <label>Invoice Prefix</label>
          <input
            type="text"
            value={settings.financial.invoicePrefix}
            onChange={(e) => updateSetting('financial.invoicePrefix', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderDataTab = () => (
    <div className="settings-section">
      <h3>Data Management</h3>
      <div className="settings-form">
        <div className="form-group">
          <label>Backup Frequency</label>
          <select
            value={settings.dataManagement.backupFrequency}
            onChange={(e) => updateSetting('dataManagement.backupFrequency', e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="form-group">
          <label>Data Retention Period (days)</label>
          <input
            type="number"
            value={settings.dataManagement.retentionPeriod}
            onChange={(e) => updateSetting('dataManagement.retentionPeriod', parseInt(e.target.value))}
            min="30"
            max="3650"
          />
        </div>
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.dataManagement.autoArchive}
              onChange={(e) => updateSetting('dataManagement.autoArchive', e.target.checked)}
            />
            <span>Enable Auto Archive</span>
          </label>
        </div>
        <div className="import-export-section">
          <h4>Import/Export Settings</h4>
          <div className="button-group">
            <button 
              className="btn btn-secondary"
              onClick={exportSettings}
            >
              Export Settings
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowImportDialog(true)}
            >
              Import Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch(activeTab) {
      case 'profile': return renderProfileTab();
      case 'system': return renderSystemTab();
      case 'notifications': return renderNotificationsTab();
      case 'security': return renderSecurityTab();
      case 'plant': return renderPlantTab();
      case 'units': return renderUnitsTab();
      case 'quality': return renderQualityTab();
      case 'collection': return renderCollectionTab();
      case 'financial': return renderFinancialTab();
      case 'data': return renderDataTab();
      case 'advanced': return <AdvancedSettings />;
      default:
        return <div>Select a tab to view settings</div>;
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Configure your plant management system</p>
      </div>

      <div className="settings-content">
        <div className="settings-sidebar">
          <div className="settings-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="settings-main">
          {renderActiveTab()}
          
          <div className="settings-actions">
            <button 
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save Settings
            </button>
            <button 
              className="btn btn-danger"
              onClick={() => setShowConfirmReset(true)}
            >
              Reset to Default
            </button>
          </div>
        </div>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className="save-message">
          {saveMessage}
        </div>
      )}

      {/* Confirm Reset Dialog */}
      {showConfirmReset && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Reset</h3>
            <p>Are you sure you want to reset all settings to default values? This action cannot be undone.</p>
            <div className="modal-actions">
              <button 
                className="btn btn-danger"
                onClick={handleReset}
              >
                Reset
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowConfirmReset(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Dialog */}
      {showImportDialog && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Import Settings</h3>
            <p>Select a settings file to import:</p>
            <input
              type="file"
              accept=".json"
              onChange={(e) => setImportFile(e.target.files[0])}
              ref={fileInputRef}
            />
            <div className="modal-actions">
              <button 
                className="btn btn-primary"
                onClick={handleImport}
                disabled={!importFile}
              >
                Import
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setShowImportDialog(false);
                  setImportFile(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;