# Settings Module

A comprehensive settings management system for the plant management application.

## Quick Start

```jsx
import Settings from './components/Pages/Settings';
import { SettingsProvider } from './contexts/SettingsContext';

// Wrap your app with SettingsProvider
<SettingsProvider>
  <Settings />
</SettingsProvider>
```

## Required Data Structure

### Essential Settings Data

```javascript
const requiredSettings = {
  // User Profile - Required for personalization
  profile: {
    name: "string",              // User's full name
    email: "string",             // Primary email
    phone: "string",             // Contact number
    role: "string",              // User role
    department: "string",        // Department
    employeeId: "string"         // Employee ID
  },

  // System Configuration - Core system settings
  system: {
    theme: "light|dark|auto",    // UI theme
    language: "string",          // Interface language
    timezone: "string",          // Time zone
    dateFormat: "string",        // Date display format
    timeFormat: "12h|24h",       // Time format
    currency: "string",          // Base currency
    numberFormat: "string"       // Number formatting
  },

  // Plant Configuration - Critical for operations
  plant: {
    name: "string",              // Plant name
    address: "string",           // Physical address
    capacity: "number",          // Daily capacity (liters)
    operatingHours: {
      start: "string",           // Start time (HH:MM)
      end: "string"              // End time (HH:MM)
    },
    shifts: ["array"],           // Work shifts
    departments: ["array"]       // Organizational units
  },

  // Quality Control - Essential for compliance
  qualityControl: {
    milkParameters: {
      fatContent: { min: "number", max: "number", unit: "%" },
      protein: { min: "number", max: "number", unit: "%" },
      lactose: { min: "number", max: "number", unit: "%" },
      snf: { min: "number", max: "number", unit: "%" },
      density: { min: "number", max: "number", unit: "g/ml" },
      acidity: { min: "number", max: "number", unit: "%" },
      temperature: { min: "number", max: "number", unit: "°C" }
    },
    testFrequency: "string",     // Testing schedule
    certifications: ["array"],   // Quality certifications
    alertThresholds: {
      critical: "number",        // Critical deviation %
      warning: "number"          // Warning deviation %
    }
  },

  // Units Configuration - For consistency
  units: {
    volume: "liters|gallons",    // Volume measurement
    weight: "kg|pounds",         // Weight measurement
    temperature: "celsius|fahrenheit", // Temperature unit
    distance: "km|miles",        // Distance measurement
    area: "hectares|acres"       // Area measurement
  }
};
```

### Optional but Recommended Settings

```javascript
const optionalSettings = {
  // Security Settings
  security: {
    twoFactorAuth: "boolean",
    sessionTimeout: "number",    // Minutes
    passwordExpiry: "number",    // Days
    loginAttempts: "number",
    auditLog: "boolean"
  },

  // Notification Settings
  notifications: {
    email: {
      enabled: "boolean",
      qualityAlerts: "boolean",
      lowStock: "boolean",
      equipmentMaintenance: "boolean",
      milkCollection: "boolean",
      financial: "boolean",
      reports: "boolean"
    },
    push: {
      enabled: "boolean",
      criticalAlerts: "boolean",
      taskReminders: "boolean",
      systemUpdates: "boolean"
    },
    sms: {
      enabled: "boolean",
      emergencyOnly: "boolean"
    }
  },

  // Financial Settings
  financial: {
    baseCurrency: "string",
    taxRate: "number",           // Percentage
    paymentMethods: ["array"],
    creditTerms: "number",       // Days
    invoicePrefix: "string",
    expenseCategories: ["array"],
    budgetPeriod: "string"
  },

  // Equipment Settings
  equipment: {
    maintenanceSchedule: "string",
    calibrationFrequency: "string",
    alertBeforeMaintenance: "number", // Days
    equipmentList: ["array"],
    suppliers: ["array"]
  },

  // Milk Collection Settings
  milkCollection: {
    collectionTimes: ["array"],
    routes: ["array"],
    vehicles: ["array"],
    storageCapacity: "number",   // Liters
    coolingSystem: {
      targetTemp: "number",      // Celsius
      maxTemp: "number"
    },
    paymentTerms: "string",
    qualityBonuses: "boolean"
  },

  // Report Settings
  reports: {
    autoGenerate: "boolean",
    frequency: "string",
    recipients: ["array"],
    formats: ["array"],
    includeSections: {
      production: "boolean",
      quality: "boolean",
      financial: "boolean",
      inventory: "boolean"
    }
  },

  // Integration Settings
  integrations: {
    erp: {
      enabled: "boolean",
      system: "string",
      apiKey: "string",
      syncFrequency: "string"
    },
    accounting: {
      enabled: "boolean",
      system: "string",
      credentials: "object"
    },
    iot: {
      enabled: "boolean",
      sensors: ["array"],
      dataCollection: "string"
    }
  },

  // Data Management
  dataManagement: {
    backupFrequency: "string",
    retentionPeriod: "number",   // Days
    exportFormats: ["array"],
    autoArchive: "boolean",
    archiveAfter: "number"       // Days
  },

  // User Management
  userManagement: {
    roles: ["array"],
    permissions: "object",
    sessionManagement: {
      maxSessions: "number",
      forceLogout: "boolean"
    }
  }
};
```

## Key Features

### 1. 🎯 **Comprehensive Configuration**
- 14 different setting categories
- Over 100 configurable options
- Industry-specific parameters

### 2. 🔐 **Security-First Design**
- Role-based access control
- Two-factor authentication
- Session management
- Audit logging

### 3. 📊 **Quality Control Focus**
- Milk parameter monitoring
- Certification tracking
- Alert thresholds
- Compliance reporting

### 4. 🔄 **System Integration**
- ERP system connectivity
- IoT device management
- Accounting software integration
- Real-time data synchronization

### 5. 💾 **Data Management**
- Automatic backups
- Import/export functionality
- Data retention policies
- Archive management

## Critical Settings for Plant Operations

### Must-Have Settings
1. **Plant Configuration**: Name, capacity, operating hours
2. **Quality Parameters**: Milk testing standards
3. **User Roles**: Access control and permissions
4. **Notification Alerts**: Critical system notifications
5. **Unit Settings**: Measurement consistency

### Industry-Specific Requirements
1. **HACCP Compliance**: Food safety standards
2. **ISO 22000**: Quality management
3. **FSSAI**: Food safety and standards
4. **Traceability**: Product tracking
5. **Cold Chain**: Temperature monitoring

## Integration Requirements

### ERP Systems
- SAP Business One
- Oracle NetSuite
- Microsoft Dynamics 365
- Odoo ERP

### IoT Devices
- Temperature sensors
- Flow meters
- pH meters
- Conductivity sensors

### Accounting Software
- QuickBooks
- Xero
- Sage
- FreshBooks

## Usage Examples

### Basic Setup
```javascript
import { useSettings } from './contexts/SettingsContext';

function PlantConfig() {
  const { settings, updateSetting } = useSettings();
  
  return (
    <div>
      <input
        value={settings.plant.name}
        onChange={(e) => updateSetting('plant.name', e.target.value)}
      />
    </div>
  );
}
```

### Quality Control
```javascript
function QualitySettings() {
  const { settings, updateSetting } = useSettings();
  
  const updateFatContent = (min, max) => {
    updateSetting('qualityControl.milkParameters.fatContent', {
      min,
      max,
      unit: '%'
    });
  };
  
  return (
    <div>
      <input
        type="number"
        value={settings.qualityControl.milkParameters.fatContent.min}
        onChange={(e) => updateFatContent(parseFloat(e.target.value), 
          settings.qualityControl.milkParameters.fatContent.max)}
      />
    </div>
  );
}
```

## File Structure

```
Settings/
├── index.js                    # Export file
├── Settings.jsx                # Main component
├── Settings.css                # Styling
├── components/
│   └── AdvancedSettings.jsx   # Advanced configuration
├── SETTINGS_DOCUMENTATION.md   # Detailed documentation
└── README.md                   # This file
```

## Dependencies

```json
{
  "react": "^18.0.0",
  "react-router-dom": "^6.0.0"
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Follow the existing code structure
2. Add proper validation for new settings
3. Update documentation
4. Test all setting categories
5. Ensure responsive design

## License

This module is part of the Plant Management System and follows the same licensing terms.# Settings Module

A comprehensive settings management system for the plant management application.

## Quick Start

```jsx
import Settings from './components/Pages/Settings';
import { SettingsProvider } from './contexts/SettingsContext';

// Wrap your app with SettingsProvider
<SettingsProvider>
  <Settings />
</SettingsProvider>
```

## Required Data Structure

### Essential Settings Data

```javascript
const requiredSettings = {
  // User Profile - Required for personalization
  profile: {
    name: "string",              // User's full name
    email: "string",             // Primary email
    phone: "string",             // Contact number
    role: "string",              // User role
    department: "string",        // Department
    employeeId: "string"         // Employee ID
  },

  // System Configuration - Core system settings
  system: {
    theme: "light|dark|auto",    // UI theme
    language: "string",          // Interface language
    timezone: "string",          // Time zone
    dateFormat: "string",        // Date display format
    timeFormat: "12h|24h",       // Time format
    currency: "string",          // Base currency
    numberFormat: "string"       // Number formatting
  },

  // Plant Configuration - Critical for operations
  plant: {
    name: "string",              // Plant name
    address: "string",           // Physical address
    capacity: "number",          // Daily capacity (liters)
    operatingHours: {
      start: "string",           // Start time (HH:MM)
      end: "string"              // End time (HH:MM)
    },
    shifts: ["array"],           // Work shifts
    departments: ["array"]       // Organizational units
  },

  // Quality Control - Essential for compliance
  qualityControl: {
    milkParameters: {
      fatContent: { min: "number", max: "number", unit: "%" },
      protein: { min: "number", max: "number", unit: "%" },
      lactose: { min: "number", max: "number", unit: "%" },
      snf: { min: "number", max: "number", unit: "%" },
      density: { min: "number", max: "number", unit: "g/ml" },
      acidity: { min: "number", max: "number", unit: "%" },
      temperature: { min: "number", max: "number", unit: "°C" }
    },
    testFrequency: "string",     // Testing schedule
    certifications: ["array"],   // Quality certifications
    alertThresholds: {
      critical: "number",        // Critical deviation %
      warning: "number"          // Warning deviation %
    }
  },

  // Units Configuration - For consistency
  units: {
    volume: "liters|gallons",    // Volume measurement
    weight: "kg|pounds",         // Weight measurement
    temperature: "celsius|fahrenheit", // Temperature unit
    distance: "km|miles",        // Distance measurement
    area: "hectares|acres"       // Area measurement
  }
};
```

### Optional but Recommended Settings

```javascript
const optionalSettings = {
  // Security Settings
  security: {
    twoFactorAuth: "boolean",
    sessionTimeout: "number",    // Minutes
    passwordExpiry: "number",    // Days
    loginAttempts: "number",
    auditLog: "boolean"
  },

  // Notification Settings
  notifications: {
    email: {
      enabled: "boolean",
      qualityAlerts: "boolean",
      lowStock: "boolean",
      equipmentMaintenance: "boolean",
      milkCollection: "boolean",
      financial: "boolean",
      reports: "boolean"
    },
    push: {
      enabled: "boolean",
      criticalAlerts: "boolean",
      taskReminders: "boolean",
      systemUpdates: "boolean"
    },
    sms: {
      enabled: "boolean",
      emergencyOnly: "boolean"
    }
  },

  // Financial Settings
  financial: {
    baseCurrency: "string",
    taxRate: "number",           // Percentage
    paymentMethods: ["array"],
    creditTerms: "number",       // Days
    invoicePrefix: "string",
    expenseCategories: ["array"],
    budgetPeriod: "string"
  },

  // Equipment Settings
  equipment: {
    maintenanceSchedule: "string",
    calibrationFrequency: "string",
    alertBeforeMaintenance: "number", // Days
    equipmentList: ["array"],
    suppliers: ["array"]
  },

  // Milk Collection Settings
  milkCollection: {
    collectionTimes: ["array"],
    routes: ["array"],
    vehicles: ["array"],
    storageCapacity: "number",   // Liters
    coolingSystem: {
      targetTemp: "number",      // Celsius
      maxTemp: "number"
    },
    paymentTerms: "string",
    qualityBonuses: "boolean"
  },

  // Report Settings
  reports: {
    autoGenerate: "boolean",
    frequency: "string",
    recipients: ["array"],
    formats: ["array"],
    includeSections: {
      production: "boolean",
      quality: "boolean",
      financial: "boolean",
      inventory: "boolean"
    }
  },

  // Integration Settings
  integrations: {
    erp: {
      enabled: "boolean",
      system: "string",
      apiKey: "string",
      syncFrequency: "string"
    },
    accounting: {
      enabled: "boolean",
      system: "string",
      credentials: "object"
    },
    iot: {
      enabled: "boolean",
      sensors: ["array"],
      dataCollection: "string"
    }
  },

  // Data Management
  dataManagement: {
    backupFrequency: "string",
    retentionPeriod: "number",   // Days
    exportFormats: ["array"],
    autoArchive: "boolean",
    archiveAfter: "number"       // Days
  },

  // User Management
  userManagement: {
    roles: ["array"],
    permissions: "object",
    sessionManagement: {
      maxSessions: "number",
      forceLogout: "boolean"
    }
  }
};
```

## Key Features

### 1. 🎯 **Comprehensive Configuration**
- 14 different setting categories
- Over 100 configurable options
- Industry-specific parameters

### 2. 🔐 **Security-First Design**
- Role-based access control
- Two-factor authentication
- Session management
- Audit logging

### 3. 📊 **Quality Control Focus**
- Milk parameter monitoring
- Certification tracking
- Alert thresholds
- Compliance reporting

### 4. 🔄 **System Integration**
- ERP system connectivity
- IoT device management
- Accounting software integration
- Real-time data synchronization

### 5. 💾 **Data Management**
- Automatic backups
- Import/export functionality
- Data retention policies
- Archive management

## Critical Settings for Plant Operations

### Must-Have Settings
1. **Plant Configuration**: Name, capacity, operating hours
2. **Quality Parameters**: Milk testing standards
3. **User Roles**: Access control and permissions
4. **Notification Alerts**: Critical system notifications
5. **Unit Settings**: Measurement consistency

### Industry-Specific Requirements
1. **HACCP Compliance**: Food safety standards
2. **ISO 22000**: Quality management
3. **FSSAI**: Food safety and standards
4. **Traceability**: Product tracking
5. **Cold Chain**: Temperature monitoring

## Integration Requirements

### ERP Systems
- SAP Business One
- Oracle NetSuite
- Microsoft Dynamics 365
- Odoo ERP

### IoT Devices
- Temperature sensors
- Flow meters
- pH meters
- Conductivity sensors

### Accounting Software
- QuickBooks
- Xero
- Sage
- FreshBooks

## Usage Examples

### Basic Setup
```javascript
import { useSettings } from './contexts/SettingsContext';

function PlantConfig() {
  const { settings, updateSetting } = useSettings();
  
  return (
    <div>
      <input
        value={settings.plant.name}
        onChange={(e) => updateSetting('plant.name', e.target.value)}
      />
    </div>
  );
}
```

### Quality Control
```javascript
function QualitySettings() {
  const { settings, updateSetting } = useSettings();
  
  const updateFatContent = (min, max) => {
    updateSetting('qualityControl.milkParameters.fatContent', {
      min,
      max,
      unit: '%'
    });
  };
  
  return (
    <div>
      <input
        type="number"
        value={settings.qualityControl.milkParameters.fatContent.min}
        onChange={(e) => updateFatContent(parseFloat(e.target.value), 
          settings.qualityControl.milkParameters.fatContent.max)}
      />
    </div>
  );
}
```

## File Structure

```
Settings/
├── index.js                    # Export file
├── Settings.jsx                # Main component
├── Settings.css                # Styling
├── components/
│   └── AdvancedSettings.jsx   # Advanced configuration
├── SETTINGS_DOCUMENTATION.md   # Detailed documentation
└── README.md                   # This file
```

## Dependencies

```json
{
  "react": "^18.0.0",
  "react-router-dom": "^6.0.0"
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Follow the existing code structure
2. Add proper validation for new settings
3. Update documentation
4. Test all setting categories
5. Ensure responsive design

## License

This module is part of the Plant Management System and follows the same licensing terms.