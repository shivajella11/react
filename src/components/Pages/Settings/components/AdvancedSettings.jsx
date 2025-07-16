import React, { useState } from 'react';
import { useSettings } from '../../../../contexts/SettingsContext';

const AdvancedSettings = () => {
  const { settings, updateSetting } = useSettings();
  const [activeSection, setActiveSection] = useState('equipment');

  const renderEquipmentTab = () => (
    <div className="advanced-section">
      <h4>Equipment Management</h4>
      <div className="settings-form">
        <div className="form-group">
          <label>Maintenance Schedule</label>
          <select
            value={settings.equipment.maintenanceSchedule}
            onChange={(e) => updateSetting('equipment.maintenanceSchedule', e.target.value)}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div className="form-group">
          <label>Calibration Frequency</label>
          <select
            value={settings.equipment.calibrationFrequency}
            onChange={(e) => updateSetting('equipment.calibrationFrequency', e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="biannual">Bi-annual</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div className="form-group">
          <label>Alert Before Maintenance (days)</label>
          <input
            type="number"
            value={settings.equipment.alertBeforeMaintenance}
            onChange={(e) => updateSetting('equipment.alertBeforeMaintenance', parseInt(e.target.value))}
            min="1"
            max="30"
          />
        </div>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="advanced-section">
      <h4>Report Configuration</h4>
      <div className="settings-form">
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.reports.autoGenerate}
              onChange={(e) => updateSetting('reports.autoGenerate', e.target.checked)}
            />
            <span>Auto-generate Reports</span>
          </label>
        </div>
        <div className="form-group">
          <label>Report Frequency</label>
          <select
            value={settings.reports.frequency}
            onChange={(e) => updateSetting('reports.frequency', e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </div>
        <div className="form-group">
          <label>Report Sections</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.reports.includeSections.production}
                onChange={(e) => updateSetting('reports.includeSections.production', e.target.checked)}
              />
              <span>Production Data</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.reports.includeSections.quality}
                onChange={(e) => updateSetting('reports.includeSections.quality', e.target.checked)}
              />
              <span>Quality Metrics</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.reports.includeSections.financial}
                onChange={(e) => updateSetting('reports.includeSections.financial', e.target.checked)}
              />
              <span>Financial Summary</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.reports.includeSections.inventory}
                onChange={(e) => updateSetting('reports.includeSections.inventory', e.target.checked)}
              />
              <span>Inventory Status</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsTab = () => (
    <div className="advanced-section">
      <h4>System Integrations</h4>
      <div className="settings-form">
        <div className="integration-group">
          <h5>ERP Integration</h5>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.integrations.erp.enabled}
                onChange={(e) => updateSetting('integrations.erp.enabled', e.target.checked)}
              />
              <span>Enable ERP Integration</span>
            </label>
          </div>
          <div className="form-group">
            <label>ERP System</label>
            <select
              value={settings.integrations.erp.system}
              onChange={(e) => updateSetting('integrations.erp.system', e.target.value)}
              disabled={!settings.integrations.erp.enabled}
            >
              <option value="">Select ERP System</option>
              <option value="sap">SAP</option>
              <option value="oracle">Oracle</option>
              <option value="microsoft">Microsoft Dynamics</option>
              <option value="odoo">Odoo</option>
            </select>
          </div>
          <div className="form-group">
            <label>Sync Frequency</label>
            <select
              value={settings.integrations.erp.syncFrequency}
              onChange={(e) => updateSetting('integrations.erp.syncFrequency', e.target.value)}
              disabled={!settings.integrations.erp.enabled}
            >
              <option value="real-time">Real-time</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>
        
        <div className="integration-group">
          <h5>IoT Integration</h5>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.integrations.iot.enabled}
                onChange={(e) => updateSetting('integrations.iot.enabled', e.target.checked)}
              />
              <span>Enable IoT Integration</span>
            </label>
          </div>
          <div className="form-group">
            <label>Data Collection</label>
            <select
              value={settings.integrations.iot.dataCollection}
              onChange={(e) => updateSetting('integrations.iot.dataCollection', e.target.value)}
              disabled={!settings.integrations.iot.enabled}
            >
              <option value="real-time">Real-time</option>
              <option value="batch">Batch Processing</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagementTab = () => (
    <div className="advanced-section">
      <h4>User Management</h4>
      <div className="settings-form">
        <div className="form-group">
          <label>Maximum Sessions per User</label>
          <input
            type="number"
            value={settings.userManagement.sessionManagement.maxSessions}
            onChange={(e) => updateSetting('userManagement.sessionManagement.maxSessions', parseInt(e.target.value))}
            min="1"
            max="10"
          />
        </div>
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.userManagement.sessionManagement.forceLogout}
              onChange={(e) => updateSetting('userManagement.sessionManagement.forceLogout', e.target.checked)}
            />
            <span>Force logout on max sessions</span>
          </label>
        </div>
        <div className="roles-section">
          <h5>User Roles</h5>
          <div className="roles-grid">
            {settings.userManagement.roles.map((role, index) => (
              <div key={role} className="role-item">
                <span className="role-name">{role}</span>
                <div className="role-permissions">
                  {settings.userManagement.permissions[role]?.map(permission => (
                    <span key={permission} className="permission-badge">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const sections = [
    { id: 'equipment', label: 'Equipment', component: renderEquipmentTab },
    { id: 'reports', label: 'Reports', component: renderReportsTab },
    { id: 'integrations', label: 'Integrations', component: renderIntegrationsTab },
    { id: 'users', label: 'User Management', component: renderUserManagementTab }
  ];

  return (
    <div className="advanced-settings">
      <h3>Advanced Settings</h3>
      <div className="advanced-tabs">
        {sections.map(section => (
          <button
            key={section.id}
            className={`advanced-tab ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>
      <div className="advanced-content">
        {sections.find(s => s.id === activeSection)?.component()}
      </div>
    </div>
  );
};

export default AdvancedSettings;