import React, { createContext, useContext, useState, useEffect } from 'react';

// Default settings structure
const defaultSettings = {
  // User Profile Settings
  profile: {
    name: 'shiva',
    email: 'shiva@example.com',
    phone: '+91 9876543210',
    role: 'Plant Manager',
    department: 'Operations',
    avatar: null,
    employeeId: 'EMP001'
  },

  // System Preferences
  system: {
    theme: 'light', // light, dark, auto
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    currency: 'USD',
    numberFormat: 'en-US'
  },

  // Notification Settings
  notifications: {
    email: {
      enabled: true,
      qualityAlerts: true,
      lowStock: true,
      equipmentMaintenance: true,
      milkCollection: true,
      financial: true,
      reports: true
    },
    push: {
      enabled: true,
      criticalAlerts: true,
      taskReminders: true,
      systemUpdates: false
    },
    sms: {
      enabled: false,
      emergencyOnly: true
    }
  },

  // Security Settings
  security: {
    twoFactorAuth: false,
    sessionTimeout: 30, // minutes
    passwordExpiry: 90, // days
    loginAttempts: 3,
    ipWhitelist: [],
    auditLog: true
  },

  // Plant Configuration
  plant: {
    name: 'Main Processing Plant',
    address: '123 Dairy Lane, Farm City, FC 12345',
    capacity: 10000, // liters per day
    operatingHours: {
      start: '06:00',
      end: '18:00'
    },
    shifts: ['Morning', 'Afternoon', 'Night'],
    departments: ['Quality Control', 'Processing', 'Packaging', 'Logistics']
  },

  // Unit Settings
  units: {
    volume: 'liters', // liters, gallons
    weight: 'kg', // kg, pounds
    temperature: 'celsius', // celsius, fahrenheit
    distance: 'km', // km, miles
    area: 'hectares' // hectares, acres
  },

  // Quality Control Parameters
  qualityControl: {
    milkParameters: {
      fatContent: { min: 3.0, max: 6.0, unit: '%' },
      protein: { min: 2.8, max: 4.5, unit: '%' },
      lactose: { min: 4.0, max: 5.5, unit: '%' },
      snf: { min: 8.0, max: 10.0, unit: '%' }, // Solid Non-Fat
      density: { min: 1.028, max: 1.035, unit: 'g/ml' },
      acidity: { min: 0.13, max: 0.17, unit: '%' },
      temperature: { min: 2, max: 6, unit: '°C' }
    },
    testFrequency: 'every batch', // every batch, hourly, daily
    certifications: ['ISO 22000', 'HACCP', 'FSSAI'],
    alertThresholds: {
      critical: 10, // percentage deviation
      warning: 5
    }
  },

  // Milk Collection Settings
  milkCollection: {
    collectionTimes: ['06:00', '18:00'],
    routes: [],
    vehicles: [],
    storageCapacity: 50000, // liters
    coolingSystem: {
      targetTemp: 4, // celsius
      maxTemp: 8
    },
    paymentTerms: 'weekly', // daily, weekly, monthly
    qualityBonuses: true
  },

  // Financial Settings
  financial: {
    baseCurrency: 'USD',
    taxRate: 18, // percentage
    paymentMethods: ['Bank Transfer', 'Check', 'Cash'],
    creditTerms: 30, // days
    invoicePrefix: 'INV-',
    expenseCategories: ['Feed', 'Maintenance', 'Utilities', 'Labor', 'Transportation'],
    budgetPeriod: 'monthly'
  },

  // Equipment Settings
  equipment: {
    maintenanceSchedule: 'monthly',
    calibrationFrequency: 'quarterly',
    alertBeforeMaintenance: 7, // days
    equipmentList: [],
    suppliers: []
  },

  // Report Settings
  reports: {
    autoGenerate: true,
    frequency: 'daily',
    recipients: [],
    formats: ['PDF', 'Excel'],
    includeSections: {
      production: true,
      quality: true,
      financial: true,
      inventory: true
    }
  },

  // Integration Settings
  integrations: {
    erp: {
      enabled: false,
      system: '',
      apiKey: '',
      syncFrequency: 'hourly'
    },
    accounting: {
      enabled: false,
      system: '',
      credentials: {}
    },
    iot: {
      enabled: true,
      sensors: [],
      dataCollection: 'real-time'
    }
  },

  // Backup & Data Management
  dataManagement: {
    backupFrequency: 'daily',
    retentionPeriod: 365, // days
    exportFormats: ['CSV', 'JSON', 'XML'],
    autoArchive: true,
    archiveAfter: 90 // days
  },

  // User Management
  userManagement: {
    roles: ['Admin', 'Manager', 'Supervisor', 'Operator', 'Viewer'],
    permissions: {
      'Admin': ['create', 'read', 'update', 'delete', 'manage_users'],
      'Manager': ['create', 'read', 'update', 'delete'],
      'Supervisor': ['create', 'read', 'update'],
      'Operator': ['create', 'read'],
      'Viewer': ['read']
    },
    sessionManagement: {
      maxSessions: 3,
      forceLogout: false
    }
  }
};

// Create Settings Context
const SettingsContext = createContext();

// Custom hook to use settings
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

// Settings Provider Component
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('plantSettings');
    return savedSettings ? { ...defaultSettings, ...JSON.parse(savedSettings) } : defaultSettings;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Save settings to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('plantSettings', JSON.stringify(settings));
  }, [settings]);

  // Update specific setting
  const updateSetting = (path, value) => {
    setSettings(prev => {
      const newSettings = { ...prev };
      const keys = path.split('.');
      let current = newSettings;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in current)) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
  };

  // Reset settings to default
  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('plantSettings');
  };

  // Export settings
  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `plant-settings-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Import settings
  const importSettings = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target.result);
          setSettings({ ...defaultSettings, ...importedSettings });
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  };

  // Get setting by path
  const getSetting = (path) => {
    const keys = path.split('.');
    let current = settings;
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return undefined;
      }
    }
    
    return current;
  };

  const value = {
    settings,
    updateSetting,
    resetSettings,
    exportSettings,
    importSettings,
    getSetting,
    isLoading,
    setIsLoading
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;